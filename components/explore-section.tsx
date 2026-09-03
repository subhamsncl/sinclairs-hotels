import { GalleryLightbox } from '@/components/gallery-lightbox';
import { Reveal } from '@/components/reveal';
import type { Hotel } from '@/content/types';

export function ExploreSection({ hotel }: { hotel: Hotel }) {
  if (hotel.sightseeing.length === 0) return null;

  const withImage = hotel.sightseeing.filter((spot) => spot.image);
  const withoutImage = hotel.sightseeing.filter((spot) => !spot.image);

  return (
    <section id="explore" className="scroll-mt-32 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Nearby</p>
          <h2 className="mt-3 font-display text-2xl text-forest sm:text-3xl">
            Explore {hotel.location}
          </h2>
        </Reveal>

        {withImage.length > 0 && (
          <div className="mt-8">
            <GalleryLightbox
              images={withImage.map((spot) => ({ src: spot.image as string, alt: spot.name }))}
            />
          </div>
        )}

        {withoutImage.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {withoutImage.map((spot) => (
              <span
                key={spot.name}
                className="rounded-full border border-forest/15 px-3 py-1.5 text-sm text-ink/80"
              >
                {spot.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
