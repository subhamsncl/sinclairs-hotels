import type { Hotel } from '@/content/types';
import Image from 'next/image';
import Link from 'next/link';

const FALLBACK_BANQUET_IMAGE: Record<string, { src: string; alt: string }> = {
  burdwan: {
    src: '/images/hotels/burdwan/destination/Lobby.webp',
    alt: 'The lobby lounge at Sinclairs Burdwan',
  },
  siliguri: {
    src: '/images/hotels/siliguri/accommodations/premier-suite/Sinclairs-Siliguri-Premier-Suite.jpg',
    alt: 'The Premier Suite interior at Sinclairs Siliguri',
  },
  udaipur: {
    src: '/images/hotels/udaipur/destination/Courtyard Night view.webp',
    alt: "The palace's central domed courtyard, lit up at night",
  },
};

export function MeetingVenueCard({ hotel }: { hotel: Hotel }) {
  const spaces = hotel.eventSpaces;
  if (!spaces) return null;
  const banquet = hotel.meetings?.gallery?.[0] ?? FALLBACK_BANQUET_IMAGE[hotel.slug];

  return (
    <Link
      href={`/hotels/${hotel.slug}#meetings`}
      className="group block overflow-hidden rounded-xl border border-forest/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="grid grid-cols-2 gap-0.5">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={hotel.thumbnailImage}
            alt={hotel.name}
            fill
            sizes="(min-width: 1024px) 17vw, (min-width: 640px) 25vw, 50vw"
            className="transform-gpu object-cover transition duration-700 group-hover:scale-110"
          />
        </div>
        <div className="relative aspect-square overflow-hidden">
          {banquet && (
            <Image
              src={banquet.src}
              alt={banquet.alt}
              fill
              sizes="(min-width: 1024px) 17vw, (min-width: 640px) 25vw, 50vw"
              className="transform-gpu object-cover transition duration-700 group-hover:scale-110"
            />
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg leading-snug text-forest">{hotel.name}</h3>
        <p className="mt-0.5 text-xs text-ink/50">
          {hotel.location}, {hotel.state}
        </p>
        <p className="mt-2 text-xs uppercase tracking-wider text-gold">
          {spaces.venues.length} {spaces.venues.length === 1 ? 'Room' : 'Rooms'} ·{' '}
          {spaces.totalSqFt.toLocaleString('en-IN')} sq ft · Up to{' '}
          {spaces.maxCapacity.toLocaleString('en-IN')} guests
        </p>
        <ul className="mt-3 divide-y divide-forest/10 text-sm">
          {spaces.venues.slice(0, 3).map((venue) => (
            <li key={venue.name} className="flex items-center justify-between py-2">
              <span className="min-w-0 truncate text-ink/80">{venue.name}</span>
              <span className="shrink-0 text-ink/50">{venue.capacity} guests</span>
            </li>
          ))}
          {spaces.venues.length > 3 && (
            <li className="pt-2 text-ink/40">+{spaces.venues.length - 3} more</li>
          )}
        </ul>
      </div>
    </Link>
  );
}
