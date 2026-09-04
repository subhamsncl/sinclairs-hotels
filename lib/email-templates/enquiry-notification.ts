import { emailLayout, fieldRowsHtml } from './layout';

export function enquiryNotificationHtml(data: {
  name: string;
  email: string;
  phone: string;
  property: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  message: string;
}): string {
  const fields: Array<[string, string]> = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.phone],
    ['Property', data.property],
  ];

  if (data.checkIn) fields.push(['Check-in', data.checkIn]);
  if (data.checkOut) fields.push(['Check-out', data.checkOut]);
  if (data.guests) fields.push(['Guests', String(data.guests)]);
  fields.push(['Message', data.message]);

  const bodyHtml = `
    <p style="font-size:14px; margin:0 0 20px;">New enquiry received from the website.</p>
    ${fieldRowsHtml(fields)}
  `;

  return emailLayout({ title: `New enquiry — ${data.property} (${data.name})`, bodyHtml });
}
