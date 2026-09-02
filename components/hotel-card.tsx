import type { Hotel } from '@/content/types';
import Image from 'next/image';
import Link from 'next/link';

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Link
      href={`/hotels/${hotel.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden rounded-xl shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl sm:aspect-[3/4]"
    >
      <Image
        src={hotel.thumbnailImage}
        alt={hotel.name}
        fill
        sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark from-10% via-forest-dark/60 via-45% to-transparent to-75%" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-cream sm:p-5">
        <h3 className="font-display text-base leading-snug sm:text-xl">{hotel.name}</h3>
        <p className="mt-0.5 text-[0.65rem] text-cream/70 sm:text-xs">
          {hotel.location}, {hotel.state}
        </p>
        <div className="mt-3 hidden gap-4 border-t border-cream/25 pt-3 text-xs text-cream/80 sm:flex">
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
