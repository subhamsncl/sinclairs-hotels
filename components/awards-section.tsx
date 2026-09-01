import type { Award } from '@/content/awards';
import Image from 'next/image';

export function AwardsSection({ awards }: { awards: Award[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {awards.map((award) => (
        <div
          key={award.propertySlug}
          className="group w-36 overflow-hidden rounded-xl border border-forest/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl sm:w-40"
        >
          <div className="h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />
          <div className="relative aspect-[4/5] p-4">
            <Image
              src={award.badgeImage}
              alt={`${award.propertyName} — Tripadvisor Travellers' Choice 2026`}
              fill
              sizes="160px"
              className="object-contain p-2 transition duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
