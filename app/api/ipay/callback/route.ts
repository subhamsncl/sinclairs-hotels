import { getHotelBySlug } from '@/content/hotels';
import { prisma } from '@/lib/db';
import { ipayConfirmationHtml } from '@/lib/email-templates/ipay-confirmation';
import { iciciConfig, isIciciSuccess, parseIciciPaymentResponse, verifyHashV1 } from '@/lib/icici';
import { STAFF_NOTIFY_EMAIL, sendMail } from '@/lib/mail';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const host = request.headers.get('host') ?? '';
  const baseUrl = `https://${host}`;

  const { hmacKey } = iciciConfig();
  if (!hmacKey) {
    console.error('[ipay:callback] ICICI_HMAC_KEY not configured');
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=unknown`, 303);
  }

  const formData = await request.formData();
  const resp = parseIciciPaymentResponse(formData);
  const orderId = resp.merchantTxnNo;

  if (!orderId) {
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=unknown`, 303);
  }

  // Only the gateway's own signed response — never a plain redirect query
  // param a guest's browser could otherwise supply — is trusted as proof of
  // what happened to the payment. See lib/icici.ts for why this is hash v1.
  const { secureHash, ...hashable } = resp;
  if (!verifyHashV1(hashable, secureHash, hmacKey)) {
    console.error('[ipay:callback] secureHash mismatch for order', orderId);
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=${orderId}`, 303);
  }

  const payment = await prisma.payment.findUnique({ where: { orderId } });
  if (!payment) {
    console.error('[ipay:callback] no matching Payment row for order', orderId);
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=${orderId}`, 303);
  }

  // Idempotent: the callback (or a guest's back button) can arrive more than
  // once — only the first delivery should update state and send mail.
  if (payment.status !== 'INITIATED') {
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=${orderId}`, 303);
  }

  const status: 'SUCCESS' | 'FAILURE' = isIciciSuccess(resp.responseCode) ? 'SUCCESS' : 'FAILURE';

  const updated = await prisma.payment.update({
    where: { orderId },
    data: {
      status,
      trackingId: resp.txnID || null,
      bankRefNo: resp.paymentID || resp.txnAuthID || null,
      failureMessage: status === 'FAILURE' ? resp.respDescription || resp.responseCode : null,
    },
  });

  const hotelName = getHotelBySlug(updated.hotelSlug)?.name ?? updated.hotelSlug;
  const emailData = {
    orderId: updated.orderId,
    hotelName,
    amount: updated.amount.toFixed(2),
    guestName: updated.guestName,
    guestEmail: updated.guestEmail,
    guestPhone: updated.guestPhone,
    reservationNo: updated.reservationNo,
    checkIn: updated.checkIn?.toLocaleDateString('en-IN'),
    checkOut: updated.checkOut?.toLocaleDateString('en-IN'),
    status,
    trackingId: updated.trackingId,
    bankRefNo: updated.bankRefNo,
  };

  const subject = `i-Pay [${status === 'SUCCESS' ? 'Success' : 'Failure'}] Transaction: ${updated.orderId}`;

  await sendMail({
    to: updated.guestEmail,
    subject,
    html: ipayConfirmationHtml(emailData),
  });

  await sendMail({
    to: STAFF_NOTIFY_EMAIL,
    subject: `${subject} — ${hotelName}`,
    html: ipayConfirmationHtml(emailData),
  });

  return NextResponse.redirect(`${baseUrl}/ipay/result?order=${orderId}`, 303);
}
