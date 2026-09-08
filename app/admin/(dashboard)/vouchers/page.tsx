import { getHotelBySlug } from '@/content/hotels';
import { prisma } from '@/lib/db';
import type { Prisma } from '@prisma/client';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 50;

export default async function VouchersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page: pageParam } = await searchParams;
  const query = q?.trim() ?? '';
  const page = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);

  // At ~10k vouchers/year, "just show the latest 100" stops being able to find
  // anything issued more than a few days ago — search + pagination is load-bearing
  // here, not a nice-to-have.
  const where: Prisma.VoucherWhereInput = query
    ? {
        OR: [
          { guestName: { contains: query, mode: 'insensitive' } },
          ...(Number.isInteger(Number(query)) ? [{ voucherNo: Number(query) }] : []),
        ],
      }
    : {};

  const [vouchers, total] = await Promise.all([
    prisma.voucher.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
    prisma.voucher.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageLink = (p: number) =>
    `/admin/vouchers?${new URLSearchParams({ ...(query ? { q: query } : {}), page: String(p) })}`;

  // The view page lives on the public host, not staff.* — proxy.ts redirects
  // any non-/admin path on the staff host, so a relative link would bounce
  // straight back to /admin/vouchers.
  const host = (await headers()).get('host') ?? '';
  const publicHost = host.replace(/^staff\./, '');

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

      <form method="get" className="mt-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search by guest name or voucher #"
          className="input max-w-sm"
        />
        <button
          type="submit"
          className="rounded border border-ink/10 px-4 py-2 text-sm text-ink/70 transition hover:border-ink/20"
        >
          Search
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-lg border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10 text-xs uppercase tracking-wider text-ink/50">
            <tr>
              <th className="px-4 py-3">Created</th>
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
                <td className="whitespace-nowrap px-4 py-3 text-ink/70">
                  {voucher.createdAt.toLocaleDateString('en-IN')}
                </td>
                <td className="px-4 py-3 font-medium">{voucher.voucherNo}</td>
                <td className="px-4 py-3">{voucher.guestName}</td>
                <td className="px-4 py-3">
                  {getHotelBySlug(voucher.hotelSlug)?.name ?? voucher.hotelSlug}
                </td>
                <td className="px-4 py-3">{voucher.checkIn.toLocaleDateString('en-IN')}</td>
                <td className="px-4 py-3">{voucher.checkOut.toLocaleDateString('en-IN')}</td>
                <td className="px-4 py-3">
                  <a
                    href={`https://${publicHost}/v/${voucher.viewToken}`}
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
                <td colSpan={7} className="px-4 py-8 text-center text-ink/50">
                  {query ? `No vouchers match "${query}".` : 'No vouchers yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-ink/60">
          <p>
            Page {page} of {totalPages} &middot; {total} voucher{total === 1 ? '' : 's'}
          </p>
          <div className="flex gap-3">
            {page > 1 && (
              <Link href={pageLink(page - 1)} className="text-forest underline">
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link href={pageLink(page + 1)} className="text-forest underline">
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
