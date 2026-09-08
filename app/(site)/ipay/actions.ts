'use server';

import crypto from 'node:crypto';
import { prisma } from '@/lib/db';
import { callInitiateSale, iciciConfig, iciciTimestamp, initiateSaleAccepted } from '@/lib/icici';
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

  const { merchantId, hmacKey, baseUrl: iciciBaseUrl } = iciciConfig();

  if (!merchantId || !hmacKey) {
    console.log('[ipay:dev-fallback] ICICI credentials not configured — cannot process payment');
    return {
      status: 'error',
      message: 'Online payment is temporarily unavailable. Please contact the hotel directly.',
    };
  }

  const orderId = generateOrderId();
  const host = headerList.get('host') ?? '';
  const baseUrl = `https://${host}`;

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

  let saleResponse: Awaited<ReturnType<typeof callInitiateSale>>;
  try {
    saleResponse = await callInitiateSale(
      {
        merchantId,
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
    console.error('[ipay] initiateSale request failed', err);
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
    console.error('[ipay] initiateSale rejected', saleResponse);
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
