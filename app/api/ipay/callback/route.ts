import { getHotelBySlug } from '@/content/hotels';
import { prisma } from '@/lib/db';
import { ipayConfirmationHtml } from '@/lib/email-templates/ipay-confirmation';
import {
  iciciConfig,
  isIciciSuccess,
  parseIciciPaymentResponse,
  rawFormFields,
  verifyHashV1,
} from '@/lib/icici';
import { log } from '@/lib/log';
import { STAFF_NOTIFY_EMAIL, sendMail } from '@/lib/mail';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  // Protocol can't be hardcoded to https: local dev serves plain http, and a
  // hardcoded https:// redirect back to localhost fails with
  // ERR_SSL_PROTOCOL_ERROR — x-forwarded-proto (set by Vercel) gives the real
  // scheme in production; localhost is the only case without that header.
  // See vouchers/page.tsx for the same pattern.
  const host = request.headers.get('host') ?? '';
  const protocol =
    request.headers.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const baseUrl = `${protocol}://${host}`;

  const { hmacKey } = iciciConfig();
  if (!hmacKey) {
    log.error('ipay.callback.misconfigured', { reason: 'ICICI_HMAC_KEY not set' });
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=unknown`, 303);
  }

  const formData = await request.formData();
  const resp = parseIciciPaymentResponse(formData);
  const orderId = resp.merchantTxnNo;

  if (!orderId) {
    log.error('ipay.callback.rejected', { reason: 'no_order_id' });
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=unknown`, 303);
  }

  // Only the gateway's own signed response — never a plain redirect query
  // param a guest's browser could otherwise supply — is trusted as proof of
  // what happened to the payment. See lib/icici.ts for why this is hash v1.
  // Verified against every raw field ICICI actually sent (not just the
  // fields this route acts on) — a curated field list caused a real
  // secureHash mismatch in UAT testing, since the response payload varies
  // by payment method (UPI/card/netbanking each include different fields).
  const { secureHash, ...rawFields } = rawFormFields(formData);
  if (!verifyHashV1(rawFields, secureHash ?? '', hmacKey)) {
    // A signature that does not verify is either a tampered response or a
    // forged callback; both are security events, not payment outcomes.
    log.error('ipay.callback.rejected', { order_id: orderId, reason: 'hash_mismatch' });
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=${orderId}`, 303);
  }

  const payment = await prisma.payment.findUnique({ where: { orderId } });
  if (!payment) {
    log.error('ipay.callback.rejected', { order_id: orderId, reason: 'unknown_order' });
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=${orderId}`, 303);
  }

  // Idempotent: the callback (or a guest's back button) can arrive more than
  // once — only the first delivery should update state and send mail.
  if (payment.status !== 'INITIATED') {
    // Expected, not an error: ICICI retries and guests use the back button.
    // Worth a line so a duplicate purchase in GA4 can be traced to a replay.
    log.info('ipay.callback.replayed', { order_id: orderId, status: payment.status });
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=${orderId}`, 303);
  }

  // The gateway's own signed response is trusted for pass/fail, but a
  // reported amount that doesn't match what this order was created for is
  // a tamper/replay signal worth failing closed on, not just recording
  // alongside a SUCCESS — never let a mismatched amount confirm a payment.
  const amountMismatch =
    resp.amount !== undefined && Number(resp.amount) !== Number(payment.amount);
  if (amountMismatch) {
    log.error('ipay.callback.amount_mismatch', {
      order_id: orderId,
      expected: payment.amount.toFixed(2),
      reported: resp.amount ?? null,
    });
  }

  const status: 'SUCCESS' | 'FAILURE' =
    isIciciSuccess(resp.responseCode) && !amountMismatch ? 'SUCCESS' : 'FAILURE';

  const updated = await prisma.payment.update({
    where: { orderId },
    data: {
      status,
      trackingId: resp.txnID || null,
      bankRefNo: resp.paymentID || resp.txnAuthID || null,
      paymentMode: resp.paymentMode || null,
      paymentInstId: resp.paymentInstId || null,
      failureMessage:
        status === 'FAILURE'
          ? amountMismatch
            ? `Amount mismatch: expected ${payment.amount.toFixed(2)}, gateway reported ${resp.amount}`
            : resp.respDescription || resp.responseCode
          : null,
    },
  });

  // The server-side counterpart of the client's purchase / payment_failed
  // event: this line exists for every settled payment, including the ones where
  // the guest closed the tab before /ipay/result ever loaded and GA4 saw nothing.
  log.info('ipay.settled', {
    order_id: orderId,
    status,
    amount: updated.amount.toNumber(),
    hotel: updated.hotelSlug,
    payment_mode: updated.paymentMode,
    response_code: resp.responseCode ?? null,
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
    kind: 'ipay-guest',
    subject,
    html: ipayConfirmationHtml(emailData),
  });

  await sendMail({
    to: STAFF_NOTIFY_EMAIL,
    kind: 'ipay-staff',
    subject: `${subject} — ${hotelName}`,
    html: ipayConfirmationHtml(emailData),
  });

  return NextResponse.redirect(`${baseUrl}/ipay/result?order=${orderId}`, 303);
}
