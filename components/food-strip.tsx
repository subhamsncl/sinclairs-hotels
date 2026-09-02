import type { GalleryImage } from '@/content/types';
import Image from 'next/image';

export function FoodStrip({
  eyebrow = 'Culinary Journey',
  title,
  body,
  images,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  images: GalleryImage[];
}) {
  const track = [...images, ...images];

  return (
    <section className="scroll-mt-32 overflow-hidden border-y border-forest/10 bg-forest-dark py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        <h2 className="mt-3 font-display text-2xl text-cream sm:text-3xl">{title}</h2>
        <p className="mt-2 max-w-xl text-sm text-cream/60">{body}</p>
      </div>

      <div className="group/strip relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-forest-dark to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-forest-dark to-transparent sm:w-32" />
        <div className="flex w-max animate-marquee gap-5 px-6 group-hover/strip:[animation-play-state:paused]">
          {track.map((image, i) => (
            <figure
              key={`${image.src}-${i}`}
              className="relative h-64 w-[22rem] shrink-0 overflow-hidden rounded-lg shadow-lg sm:h-72 sm:w-[26rem]"
            >
              <Image src={image.src} alt={image.alt} fill sizes="26rem" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/85 via-forest-dark/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 font-display text-base text-cream sm:text-lg">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
