import type { Award } from '@/content/awards';
import type { Review } from '@/content/reviews';
import Image from 'next/image';

export function AwardsSection({ awards, reviews }: { awards: Award[]; reviews: Review[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {awards.map((award) => {
        const review = reviews.find((r) => r.propertyName === award.propertyName);
        return (
          <div
            key={award.propertySlug}
            className="group overflow-hidden rounded-xl border border-forest/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
          >
            <div className="h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />
            <div className="flex items-center gap-4 p-4">
              <div className="relative h-20 w-16 shrink-0">
                <Image
                  src={award.badgeImage}
                  alt={`${award.propertyName} — Tripadvisor Travellers' Choice 2026`}
                  fill
                  sizes="64px"
                  className="object-contain transition duration-300 group-hover:scale-105"
                />
              </div>
              <p className="font-display text-sm text-forest">{award.propertyName}</p>
            </div>
            {review && (
              <a
                href={review.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-t border-forest/10 bg-cream/60 p-4 transition hover:bg-cream"
              >
                <div className="flex gap-0.5 text-gold" aria-hidden="true">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static rating dots, never reordered
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="mt-2 text-sm italic leading-relaxed text-ink/80">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-ink/50">
                  {review.author} &middot; {review.source}
                </p>
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
