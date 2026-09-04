import type { Hotel } from '@/content/types';
import type { Voucher } from '@prisma/client';

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatMoney(value: unknown): string {
  return `₹${Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Fields shown to the guest — the "view voucher" page and the guest copy email both
// use this same list, so what's guest-visible is decided in exactly one place.
export function voucherGuestFields(voucher: Voucher, hotel?: Hotel): Array<[string, string]> {
  const fields: Array<[string, string]> = [
    ['Voucher No.', String(voucher.voucherNo)],
    ['Hotel', hotel?.name ?? voucher.hotelSlug],
    ['Guest Name', voucher.guestName],
    ['Phone', voucher.guestPhone],
    ['Email', voucher.guestEmail],
    ['Billing Address', voucher.billingAddress],
  ];

  if (voucher.travelAgentName) fields.push(['Travel Agent', voucher.travelAgentName]);
  if (voucher.travelAgentGstin) {
    fields.push([
      'GSTIN',
      `${voucher.travelAgentGstin}${voucher.travelAgentState ? ` (${voucher.travelAgentState})` : ''}`,
    ]);
  }
  if (voucher.travelAgentPan) fields.push(['PAN', voucher.travelAgentPan]);

  fields.push(
    ['No. of Rooms', String(voucher.rooms)],
    ['Check In', formatDate(voucher.checkIn)],
    ['Check Out', formatDate(voucher.checkOut)],
    ['Rate + GST', `${formatMoney(voucher.rate)} + ${formatMoney(voucher.taxes)}`],
  );

  if (voucher.depositAmount) fields.push(['Deposit Amount', formatMoney(voucher.depositAmount)]);
  if (voucher.depositReceiptNo) fields.push(['Deposit Receipt No.', voucher.depositReceiptNo]);
  if (voucher.depositReceiptDate)
    fields.push(['Receipt Date', formatDate(voucher.depositReceiptDate)]);
  if (voucher.arrivalDetails) fields.push(['Arrival Details', voucher.arrivalDetails]);
  if (voucher.otherServices) fields.push(['Other Services', voucher.otherServices]);

  fields.push(['Booking Office', voucher.bookingOffice], ['Issued By', voucher.issuerName]);

  return fields;
}

// Guest-visible fields plus internal-only billing detail — used by the office/admin
// copy email only, never by anything the guest sees.
export function voucherAdminFields(voucher: Voucher, hotel?: Hotel): Array<[string, string]> {
  const fields = voucherGuestFields(voucher, hotel);

  if (voucher.commissionPct) fields.push(['Commission', `${voucher.commissionPct}%`]);
  if (voucher.tdsPct) fields.push(['TDS', `${voucher.tdsPct}%`]);
  if (voucher.billingInstructions)
    fields.push(['Billing Instructions', voucher.billingInstructions]);
  if (voucher.specialInstructions) fields.push(['Details to Unit', voucher.specialInstructions]);

  return fields;
}
