import type { Hotel } from '@/content/types';
import type { Voucher } from '@prisma/client';
import { voucherAdminFields } from '../voucher-view';
import { emailLayout, fieldRowsHtml } from './layout';

export function voucherAdminHtml({ voucher, hotel }: { voucher: Voucher; hotel?: Hotel }): string {
  const bodyHtml = `
    <p style="font-size:14px; margin:0 0 20px;">Internal office copy — new voucher issued.</p>
    ${fieldRowsHtml(voucherAdminFields(voucher, hotel))}
  `;

  return emailLayout({
    title: `Voucher #${voucher.voucherNo} — ${voucher.guestName}`,
    bodyHtml,
  });
}
