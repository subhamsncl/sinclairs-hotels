import type { Hotel } from '@/content/types';
import Image from 'next/image';
import Link from 'next/link';

export function VenueTable({ hotel }: { hotel: Hotel }) {
  const spaces = hotel.eventSpaces;
  if (!spaces) return null;

  return (
    <Link
      href={`/hotels/${hotel.slug}`}
      className="group flex overflow-hidden rounded-lg border border-forest/10 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative w-20 shrink-0 overflow-hidden sm:w-32">
        <Image
          src={hotel.thumbnailImage}
          alt=""
          fill
          sizes="130px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1 p-3 sm:p-4">
        <h3 className="font-display text-base text-forest">{hotel.name}</h3>
        <p className="mt-0.5 text-xs uppercase tracking-wider text-gold">
          {spaces.venues.length} {spaces.venues.length === 1 ? 'Room' : 'Rooms'} ·{' '}
          {spaces.totalSqFt.toLocaleString('en-IN')} sq ft · Up to {spaces.maxCapacity} guests
        </p>
        <ul className="mt-2 space-y-0.5 text-xs text-ink/70">
          {spaces.venues.slice(0, 3).map((venue) => (
            <li key={venue.name} className="flex flex-wrap justify-between gap-x-2">
              <span className="min-w-0 truncate">{venue.name}</span>
              <span className="shrink-0 text-ink/50">{venue.capacity} guests</span>
            </li>
          ))}
          {spaces.venues.length > 3 && (
            <li className="text-ink/40">+{spaces.venues.length - 3} more</li>
          )}
        </ul>
      </div>
    </Link>
  );
}
