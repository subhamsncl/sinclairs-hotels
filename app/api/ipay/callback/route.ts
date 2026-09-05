import { getHotelBySlug } from '@/content/hotels';
import { ccavDecrypt, parseCcavResponse } from '@/lib/ccavenue';
import { prisma } from '@/lib/db';
import { ipayConfirmationHtml } from '@/lib/email-templates/ipay-confirmation';
import { STAFF_NOTIFY_EMAIL, sendMail } from '@/lib/mail';
import { NextResponse } from 'next/server';

function mapOrderStatus(ccavStatus: string | undefined): 'SUCCESS' | 'FAILURE' | 'ABORTED' {
  if (ccavStatus === 'Success') return 'SUCCESS';
  if (ccavStatus === 'Aborted') return 'ABORTED';
  return 'FAILURE';
}

export async function POST(request: Request): Promise<NextResponse> {
  const host = request.headers.get('host') ?? '';
  const baseUrl = `https://${host}`;

  const workingKey = process.env.CCAVENUE_WORKING_KEY;
  if (!workingKey) {
    console.error('[ipay:callback] CCAVENUE_WORKING_KEY not configured');
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=unknown`, 303);
  }

  const formData = await request.formData();
  const encResp = formData.get('encResp');
  if (typeof encResp !== 'string' || !encResp) {
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=unknown`, 303);
  }

  // This decrypted payload — not any plain query param CCAvenue or a guest's
  // browser could otherwise supply — is the only thing trusted as proof of
  // what actually happened to the payment.
  const decrypted = ccavDecrypt(encResp, workingKey);
  const resp = parseCcavResponse(decrypted);
  const orderId = resp.order_id;

  if (!orderId) {
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=unknown`, 303);
  }

  const payment = await prisma.payment.findUnique({ where: { orderId } });
  if (!payment) {
    console.error('[ipay:callback] no matching Payment row for order', orderId);
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=${orderId}`, 303);
  }

  // Idempotent: CCAvenue (or a guest's back button) can deliver this callback
  // more than once — only the first delivery should update state and send mail.
  if (payment.status !== 'INITIATED') {
    return NextResponse.redirect(`${baseUrl}/ipay/result?order=${orderId}`, 303);
  }

  const status = mapOrderStatus(resp.order_status);

  const updated = await prisma.payment.update({
    where: { orderId },
    data: {
      status,
      trackingId: resp.tracking_id || null,
      bankRefNo: resp.bank_ref_no || null,
      failureMessage: resp.failure_message || null,
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

  const subject = `i-Pay [${status === 'SUCCESS' ? 'Success' : status === 'ABORTED' ? 'Aborted' : 'Failure'}] Transaction: ${updated.orderId}`;

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
