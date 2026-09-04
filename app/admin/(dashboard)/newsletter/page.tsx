import { prisma } from '@/lib/db';
import type { Metadata } from 'next';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function NewsletterSubscribersPage() {
  const subscribers = await prisma.newsletter.findMany({
    orderBy: { subscribedAt: 'desc' },
    take: 200,
  });

  const activeCount = subscribers.filter((s) => !s.unsubscribedAt).length;

  return (
    <div>
      <p className="font-display text-2xl text-forest">Newsletter Subscribers</p>
      <p className="mt-1 text-sm text-ink/60">
        {activeCount} active subscriber{activeCount === 1 ? '' : 's'} of {subscribers.length} total.
      </p>

      <div className="mt-6 overflow-x-auto rounded-lg border border-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink/10 text-xs uppercase tracking-wider text-ink/50">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subscribed</th>
              <th className="px-4 py-3">IP</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="border-b border-ink/5 last:border-0">
                <td className="px-4 py-3 font-medium">{subscriber.email}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink/70">
                  {subscriber.subscribedAt.toLocaleDateString('en-IN')}
                </td>
                <td className="px-4 py-3 text-ink/60">{subscriber.ip ?? '—'}</td>
                <td className="px-4 py-3">
                  {subscriber.unsubscribedAt ? (
                    <span className="rounded-full bg-ink/10 px-2 py-1 text-xs font-medium text-ink/60">
                      Unsubscribed
                    </span>
                  ) : (
                    <span className="rounded-full bg-forest/10 px-2 py-1 text-xs font-medium text-forest">
                      Active
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink/50">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
