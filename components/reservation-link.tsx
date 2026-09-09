'use client';

import { reservationUrl } from '@/content/site';
import { pushDataLayerEvent } from '@/lib/analytics';
import type { ReactNode } from 'react';

// Every "Book Now" / "Check Availability" CTA across the site sends guests
// to the same external Staah URL — centralizing the click here means the
// begin_checkout event and its shape stay consistent regardless of how each
// page styles or labels its own CTA (design/copy is entirely the caller's).
export function ReservationLink({
  source,
  params,
  className,
  children,
}: {
  source: string;
  params?: Record<string, string>;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={reservationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => pushDataLayerEvent('begin_checkout', { source, ...params })}
    >
      {children}
    </a>
  );
}
