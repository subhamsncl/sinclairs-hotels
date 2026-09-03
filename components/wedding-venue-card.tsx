import type { Hotel } from '@/content/types';
import Image from 'next/image';
import Link from 'next/link';

export function WeddingVenueCard({ hotel }: { hotel: Hotel }) {
  const weddings = hotel.weddings;
  if (!weddings) return null;
  const lead = weddings.gallery[0];

  return (
    <Link
      href={`/hotels/${hotel.slug}#weddings`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-xl shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
    >
      {lead && (
        <Image
          src={lead.src}
          alt={lead.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="transform-gpu object-cover transition duration-700 group-hover:scale-110"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-black/70 via-40% to-transparent to-75%" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
        <h3 className="font-display text-lg leading-snug">{hotel.name}</h3>
        <p className="mt-0.5 text-xs text-cream/70">
          {hotel.location}, {hotel.state}
        </p>
        {hotel.eventSpaces && (
          <p className="mt-2 text-xs uppercase tracking-wider text-gold-light">
            Up to {hotel.eventSpaces.maxCapacity.toLocaleString('en-IN')} guests
          </p>
        )}
      </div>
    </Link>
  );
}
