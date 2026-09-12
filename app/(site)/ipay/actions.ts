'use server';

import crypto from 'node:crypto';
import { prisma } from '@/lib/db';
import { callInitiateSale, iciciConfig, iciciTimestamp, initiateSaleAccepted } from '@/lib/icici';
import { errorFields, log } from '@/lib/log';
import { clientIp, isRateLimited } from '@/lib/rate-limit';
import { ipaySchema } from '@/lib/validation';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export type IpayFormState = {
  status: 'idle' | 'error';
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

// Mirrors the legacy site's transaction-number shape (YYMMDD + random suffix,
// e.g. "260905ZJGQ8618") purely so a guest comparing an old and new receipt
// isn't confused by a totally different format — the gateway itself doesn't
// require this exact shape, any unique reference works.
function generateOrderId(): string {
  const datePart = new Date()
    .toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit' })
    .split('/')
    .reverse()
    .join('');
  const suffix = crypto.randomBytes(6).toString('hex').toUpperCase().slice(0, 10);
  return `${datePart}${suffix}`;
}

export async function initiatePayment(
  _prevState: IpayFormState,
  formData: FormData,
): Promise<IpayFormState> {
  const headerList = await headers();
  const ip = clientIp(headerList);

  if (isRateLimited(`ipay:${ip}`)) {
    return { status: 'error', message: 'Too many requests. Please try again in a minute.' };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = ipaySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.company) {
    return { status: 'error', message: 'Something went wrong. Please try again.' };
  }

  const {
    hotelSlug,
    amount,
    guestName,
    guestEmail,
    guestPhone,
    billingAddress,
    remark,
    reservationNo,
    checkIn,
    checkOut,
  } = parsed.data;

  const { merchantId, aggregatorID, hmacKey, baseUrl: iciciBaseUrl } = iciciConfig();

  if (!merchantId || !hmacKey) {
    log.error('ipay.misconfigured', { reason: 'ICICI merchant credentials not set' });
    return {
      status: 'error',
      message: 'Online payment is temporarily unavailable. Please contact the hotel directly.',
    };
  }

  const orderId = generateOrderId();
  // Protocol can't be hardcoded to https: local dev serves plain http, and a
  // hardcoded https:// returnURL sent to ICICI sends the post-payment
  // redirect to a URL local dev can't actually serve (ERR_SSL_PROTOCOL_ERROR)
  // — x-forwarded-proto (set by Vercel) gives the real scheme in production;
  // localhost is the only case without that header. See vouchers/page.tsx
  // for the same pattern.
  const host = headerList.get('host') ?? '';
  const protocol =
    headerList.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const baseUrl = `${protocol}://${host}`;

  await prisma.payment.create({
    data: {
      orderId,
      hotelSlug,
      amount,
      guestName,
      guestEmail,
      guestPhone,
      billingAddress: billingAddress || null,
      remark: remark || null,
      reservationNo: reservationNo || null,
      checkIn: checkIn ? new Date(checkIn) : null,
      checkOut: checkOut ? new Date(checkOut) : null,
      userIp: ip,
    },
  });

  // Server-side counterpart of the client's add_payment_info: the denominator
  // for payment abandonment, and unlike the client event it cannot be lost to a
  // blocked tag.
  log.info('ipay.initiated', { order_id: orderId, hotel: hotelSlug, amount });

  let saleResponse: Awaited<ReturnType<typeof callInitiateSale>>;
  try {
    saleResponse = await callInitiateSale(
      {
        merchantId,
        aggregatorID,
        merchantTxnNo: orderId,
        amount: amount.toFixed(2),
        currencyCode: '356',
        payType: '0',
        customerEmailID: guestEmail,
        transactionType: 'SALE',
        returnURL: `${baseUrl}/api/ipay/callback`,
        txnDate: iciciTimestamp(),
        customerMobileNo: guestPhone,
        customerName: guestName,
      },
      hmacKey,
      iciciBaseUrl,
    );
  } catch (err) {
    log.error('ipay.gateway_unreachable', { order_id: orderId, ...errorFields(err) });
    await prisma.payment.update({
      where: { orderId },
      data: { status: 'FAILURE', failureMessage: 'initiateSale request failed' },
    });
    return {
      status: 'error',
      message: 'We could not reach the payment gateway. Please try again shortly.',
    };
  }

  if (!initiateSaleAccepted(saleResponse)) {
    log.error('ipay.gateway_rejected', {
      order_id: orderId,
      response_code: saleResponse.responseCode ?? null,
      response_message: saleResponse.responseDescription ?? null,
    });
    await prisma.payment.update({
      where: { orderId },
      data: {
        status: 'FAILURE',
        failureMessage: saleResponse.responseDescription || saleResponse.responseCode,
      },
    });
    return {
      status: 'error',
      message: 'The payment gateway declined this request. Please try again.',
    };
  }

  // Standard mode: ICICI's own domain collects payment details, so this is a
  // plain browser redirect — no client-side form POST involved.
  redirect(`${saleResponse.redirectURI}?tranCtx=${encodeURIComponent(saleResponse.tranCtx ?? '')}`);
}
