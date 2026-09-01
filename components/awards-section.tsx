import type { Award } from '@/content/awards';
import Image from 'next/image';

export function AwardsSection({ awards }: { awards: Award[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
      {awards.map((award) => (
        <div
          key={award.propertySlug}
          className="overflow-hidden rounded-md border border-forest/10"
        >
          <div className="relative aspect-square">
            <Image
              src={award.badgeImage}
              alt={`${award.propertyName} — Tripadvisor Travellers' Choice 2026`}
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
