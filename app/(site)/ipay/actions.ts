'use server';

import crypto from 'node:crypto';
import { ccavEncrypt } from '@/lib/ccavenue';
import { prisma } from '@/lib/db';
import { clientIp, isRateLimited } from '@/lib/rate-limit';
import { ipaySchema } from '@/lib/validation';
import { headers } from 'next/headers';

export type IpayFormState = {
  status: 'idle' | 'error' | 'redirecting';
  message?: string;
  fieldErrors?: Record<string, string[]>;
  encRequest?: string;
  accessCode?: string;
};

// Mirrors the legacy site's transaction-number shape (YYMMDD + random suffix,
// e.g. "260905ZJGQ8618") purely so a guest comparing an old and new receipt
// isn't confused by a totally different format — CCAvenue itself doesn't
// require this exact shape, any unique order_id works.
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

  const merchantId = process.env.CCAVENUE_MERCHANT_ID || '2006182';
  const workingKey = process.env.CCAVENUE_WORKING_KEY;
  const accessCode = process.env.CCAVENUE_ACCESS_CODE;

  if (!workingKey || !accessCode) {
    console.log('[ipay:dev-fallback] CCAvenue credentials not configured — cannot process payment');
    return {
      status: 'error',
      message: 'Online payment is temporarily unavailable. Please contact the hotel directly.',
    };
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

  const params = new URLSearchParams({
    merchant_id: merchantId,
    order_id: orderId,
    currency: 'INR',
    amount: amount.toFixed(2),
    redirect_url: `${baseUrl}/api/ipay/callback`,
    cancel_url: `${baseUrl}/api/ipay/callback`,
    language: 'EN',
    billing_name: guestName,
    billing_email: guestEmail,
    billing_tel: guestPhone,
    billing_address: billingAddress || '',
    merchant_param1: hotelSlug,
    merchant_param2: remark || '',
    merchant_param3: reservationNo || '',
    merchant_param4: checkIn || '',
    merchant_param5: checkOut || '',
  });

  const encRequest = ccavEncrypt(params.toString(), workingKey);

  return { status: 'redirecting', encRequest, accessCode };
}
