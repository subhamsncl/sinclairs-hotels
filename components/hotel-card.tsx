import type { Hotel } from '@/content/types';
import Image from 'next/image';
import Link from 'next/link';

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Link
      href={`/hotels/${hotel.slug}`}
      className="group block overflow-hidden rounded-lg border border-forest/10 bg-white shadow-sm transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={hotel.thumbnailImage}
          alt={hotel.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-widest text-gold">
          {hotel.location}, {hotel.state}
        </p>
        <h3 className="mt-1 font-display text-xl text-forest">{hotel.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink/70">{hotel.tagline}</p>
        <div className="mt-4 flex gap-4 border-t border-forest/10 pt-3 text-xs text-ink/50">
          <span>
            {hotel.rooms.length} Room {hotel.rooms.length === 1 ? 'Type' : 'Types'}
          </span>
          <span>
            {hotel.dining.length} Dining {hotel.dining.length === 1 ? 'Venue' : 'Venues'}
          </span>
        </div>
      </div>
    </Link>
  );
}
