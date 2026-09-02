import type { Hotel } from '@/content/types';
import Image from 'next/image';
import Link from 'next/link';

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <Link
      href={`/hotels/${hotel.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl sm:aspect-[2/3]"
    >
      <Image
        src={hotel.thumbnailImage}
        alt={hotel.name}
        fill
        sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black from-0% via-black/75 via-35% to-transparent to-70%" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-cream sm:p-5">
        <h3 className="font-display text-sm leading-snug sm:text-lg">{hotel.name}</h3>
        <p className="mt-0.5 text-[0.65rem] text-cream/70 sm:text-xs">
          {hotel.location}, {hotel.state}
        </p>
      </div>
    </Link>
  );
}
