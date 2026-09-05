import { getHotelBySlug } from '@/content/hotels';
import { prisma } from '@/lib/db';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function VouchersPage() {
  const vouchers = await prisma.voucher.findMany({
    orderBy: { voucherNo: 'desc' },
    take: 100,
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-display text-2xl text-forest">Vouchers</p>
        <Link
          href="/admin/vouchers/new"
          className="rounded bg-forest px-4 py-2 text-sm uppercase tracking-wider text-cream transition hover:bg-forest-dark"
        >
          New Voucher
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10 text-xs uppercase tracking-wider text-ink/50">
            <tr>
              <th className="px-4 py-3">Voucher #</th>
              <th className="px-4 py-3">Guest</th>
              <th className="px-4 py-3">Hotel</th>
              <th className="px-4 py-3">Check-in</th>
              <th className="px-4 py-3">Check-out</th>
              <th className="px-4 py-3">View Link</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3 font-medium">{voucher.voucherNo}</td>
                <td className="px-4 py-3">{voucher.guestName}</td>
                <td className="px-4 py-3">
                  {getHotelBySlug(voucher.hotelSlug)?.name ?? voucher.hotelSlug}
                </td>
                <td className="px-4 py-3">{voucher.checkIn.toLocaleDateString('en-IN')}</td>
                <td className="px-4 py-3">{voucher.checkOut.toLocaleDateString('en-IN')}</td>
                <td className="px-4 py-3">
                  <a
                    href={`/v/${voucher.viewToken}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest underline"
                  >
                    Open
                  </a>
                </td>
              </tr>
            ))}
            {vouchers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink/50">
                  No vouchers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
