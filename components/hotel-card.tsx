import type { Hotel } from '@/content/types';
import Image from 'next/image';
import Link from 'next/link';

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Link
      href={`/hotels/${hotel.slug}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
    >
      <div className="relative aspect-[4/3.4] overflow-hidden">
        <Image
          src={hotel.thumbnailImage}
          alt={hotel.name}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-cream">
          <p className="text-[0.65rem] uppercase tracking-widest text-gold-light drop-shadow">
            {hotel.location}, {hotel.state}
          </p>
          <h3 className="mt-0.5 font-display text-lg drop-shadow-md">{hotel.name}</h3>
          <div className="mt-2 flex gap-3 border-t border-cream/20 pt-2 text-[0.7rem] text-cream/70">
            <span>
              {hotel.rooms.length} Room {hotel.rooms.length === 1 ? 'Type' : 'Types'}
            </span>
            <span>
              {hotel.dining.length} Dining {hotel.dining.length === 1 ? 'Venue' : 'Venues'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
