import { getHotelBySlug } from '@/content/hotels';
import { prisma } from '@/lib/db';
import type { Metadata } from 'next';

export const metadata: Metadata = { robots: { index: false, follow: false } };

const statusStyles: Record<string, string> = {
  NEW: 'bg-gold/20 text-forest-dark',
  CONTACTED: 'bg-forest/10 text-forest',
  CLOSED: 'bg-ink/10 text-ink/60',
};

export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return (
    <div>
      <p className="font-display text-2xl text-forest">Enquiries</p>
      <p className="mt-1 text-sm text-ink/60">
        Guest enquiries submitted from the website, newest first.
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10 text-xs uppercase tracking-wider text-ink/50">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Guest</th>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Dates</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id} className="border-b border-ink/5 align-top last:border-0">
                <td className="whitespace-nowrap px-4 py-3 text-ink/70">
                  {enquiry.createdAt.toLocaleDateString('en-IN')}
                  {enquiry.legacyTicket && (
                    <div className="mt-1 text-xs text-ink/40">{enquiry.legacyTicket}</div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{enquiry.name}</div>
                  <div className="text-xs text-ink/60">{enquiry.email}</div>
                  <div className="text-xs text-ink/60">{enquiry.phone}</div>
                </td>
                <td className="px-4 py-3">
                  {getHotelBySlug(enquiry.property)?.name ?? enquiry.property}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-ink/70">
                  {enquiry.checkIn ? enquiry.checkIn.toLocaleDateString('en-IN') : '—'}
                  {' → '}
                  {enquiry.checkOut ? enquiry.checkOut.toLocaleDateString('en-IN') : '—'}
                  {enquiry.guests && (
                    <div className="text-xs text-ink/50">{enquiry.guests} guests</div>
                  )}
                </td>
                <td className="max-w-xs px-4 py-3 text-ink/70">
                  <p className="line-clamp-3 whitespace-pre-line">{enquiry.message}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[enquiry.status] ?? 'bg-ink/10 text-ink/60'}`}
                  >
                    {enquiry.status}
                  </span>
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-ink/50">
                  No enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
