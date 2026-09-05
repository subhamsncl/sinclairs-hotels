import { emailLayout, fieldRowsHtml } from './layout';

type IpayConfirmationData = {
  orderId: string;
  hotelName: string;
  amount: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  reservationNo?: string | null;
  checkIn?: string | null;
  checkOut?: string | null;
  status: 'SUCCESS' | 'FAILURE' | 'ABORTED';
  trackingId?: string | null;
  bankRefNo?: string | null;
};

function statusLabel(status: IpayConfirmationData['status']): string {
  if (status === 'SUCCESS') return 'Success';
  if (status === 'ABORTED') return 'Aborted';
  return 'Failure';
}

function buildFields(data: IpayConfirmationData): Array<[string, string]> {
  const fields: Array<[string, string]> = [
    ['Hotel/Resort', data.hotelName],
    ['Transaction No.', data.orderId],
    ['Payment Status', statusLabel(data.status)],
    ['Amount', `INR ${data.amount}`],
    ['Name', data.guestName],
    ['Email', data.guestEmail],
    ['Mobile No.', data.guestPhone],
  ];
  if (data.reservationNo) fields.push(['Reservation No.', data.reservationNo]);
  if (data.checkIn) fields.push(['Check In Date', data.checkIn]);
  if (data.checkOut) fields.push(['Check Out Date', data.checkOut]);
  if (data.trackingId) fields.push(['Tracking ID', data.trackingId]);
  if (data.bankRefNo) fields.push(['Bank Ref. No.', data.bankRefNo]);
  return fields;
}

export function ipayConfirmationHtml(data: IpayConfirmationData): string {
  const bodyHtml = `
    <p style="font-size:16px; margin:0 0 20px;">Payment Confirmation</p>
    <p style="font-size:14px; margin:0 0 20px;">
      ${data.status === 'SUCCESS' ? 'Your payment has been processed.' : 'Your payment could not be completed.'}
    </p>
    ${fieldRowsHtml(buildFields(data))}
  `;

  return emailLayout({
    title: `i-Pay [${statusLabel(data.status)}] Transaction: ${data.orderId}`,
    bodyHtml,
  });
}
