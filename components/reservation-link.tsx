'use client';

import { reservationUrl } from '@/content/site';
import { hotelItem, pushEcommerceEvent } from '@/lib/analytics';
import type { ReactNode } from 'react';

// Every "Book Now" / "Check Availability" CTA across the site sends guests
// to the same external Staah URL — centralizing the click here means the
// begin_checkout event and its shape stay consistent regardless of how each
// page styles or labels its own CTA (design/copy is entirely the caller's).
// This is a handoff, not a checkout we own: the booking itself happens on
// Staah, so begin_checkout is only ever comparable against view_item, never
// against purchase (which is the separate i-Pay payment flow).
// `item` is optional because the global nav's CTA belongs to no single
// property; the hotel content is never imported here so it stays out of the
// client bundle on every page that renders the nav.
export function ReservationLink({
  ctaSource,
  params,
  item,
  className,
  children,
}: {
  ctaSource: string;
  params?: Record<string, string>;
  item?: { slug: string; name: string; variant?: string };
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={reservationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        pushEcommerceEvent(
          'begin_checkout',
          {
            items: item
              ? [
                  hotelItem(
                    item.slug,
                    item.name,
                    item.variant ? { item_variant: item.variant } : {},
                  ),
                ]
              : [],
          },
          { cta_source: ctaSource, ...params },
        )
      }
    >
      {children}
    </a>
  );
}
