import { getHotelBySlug } from '@/content/hotels';
import { prisma } from '@/lib/db';
import type { Prisma } from '@prisma/client';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

const PAGE_SIZE = 50;

const statusStyles: Record<string, string> = {
  SUCCESS: 'bg-forest/10 text-forest',
  INITIATED: 'bg-gold/20 text-forest-dark',
  FAILURE: 'bg-red-100 text-red-700',
  ABORTED: 'bg-ink/10 text-ink/60',
};

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page: pageParam } = await searchParams;
  const query = q?.trim() ?? '';
  const page = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);

  const where: Prisma.PaymentWhereInput = query
    ? {
        OR: [
          { guestName: { contains: query, mode: 'insensitive' } },
          { guestEmail: { contains: query, mode: 'insensitive' } },
          { orderId: { contains: query, mode: 'insensitive' } },
        ],
      }
    : {};

  const [payments, total] = await Promise.all([
    prisma.payment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
    prisma.payment.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageLink = (p: number) =>
    `/admin/payments?${new URLSearchParams({ ...(query ? { q: query } : {}), page: String(p) })}`;

  // /ipay/result lives on the public host, not staff.* — proxy.ts redirects any
  // non-/admin path on the staff host, so a relative link would bounce
  // straight back to /admin/payments (same reasoning as the Vouchers page).
  const host = (await headers()).get('host') ?? '';
  const publicHost = host.replace(/^staff\./, '');

  return (
    <div>
      <p className="font-display text-2xl text-forest">Payments</p>
      <p className="mt-1 text-sm text-ink/60">
        i-Pay transactions (ICICI Payment Gateway), newest first.
      </p>

      <form method="get" className="mt-4 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search by guest name, email, or transaction no."
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
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Transaction No.</th>
              <th className="px-4 py-3">Guest</th>
              <th className="px-4 py-3">Hotel</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Gateway Ref.</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-ink/5 align-top last:border-0">
                <td className="whitespace-nowrap px-4 py-3 text-ink/70">
                  {payment.createdAt.toLocaleDateString('en-IN')}
                  <div className="text-xs text-ink/40">
                    {payment.createdAt.toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">
                  <a
                    href={`https://${publicHost}/ipay/result?order=${payment.orderId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest underline"
                  >
                    {payment.orderId}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{payment.guestName}</div>
                  <div className="text-xs text-ink/60">{payment.guestEmail}</div>
                  <div className="text-xs text-ink/60">{payment.guestPhone}</div>
                </td>
                <td className="px-4 py-3">
                  {getHotelBySlug(payment.hotelSlug)?.name ?? payment.hotelSlug}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-ink/70">
                  INR {payment.amount.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[payment.status] ?? 'bg-ink/10 text-ink/60'}`}
                  >
                    {payment.status}
                  </span>
                  {payment.failureMessage && (
                    <div className="mt-1 max-w-[16rem] text-xs text-ink/50">
                      {payment.failureMessage}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-ink/60">
                  {payment.trackingId && <div>Txn: {payment.trackingId}</div>}
                  {payment.bankRefNo && <div>Ref: {payment.bankRefNo}</div>}
                  {!payment.trackingId && !payment.bankRefNo && '—'}
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-ink/50">
                  {query ? `No payments match "${query}".` : 'No payments yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-ink/60">
          <p>
            Page {page} of {totalPages} &middot; {total} payment{total === 1 ? '' : 's'}
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
