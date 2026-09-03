'use client';

import type { Experience } from '@/content/experiences';
import Image from 'next/image';
import { useRef } from 'react';

export function ExperiencesCarousel({ experiences }: { experiences: Experience[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    const amount = (card?.offsetWidth ?? 320) + 24;
    track.scrollBy({ left: amount * direction, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {experiences.map((experience) => (
          <div
            key={experience.title}
            data-card
            className="group w-[280px] flex-none snap-start overflow-hidden rounded-lg border border-forest/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[340px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                sizes="340px"
                className="transform-gpu object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg text-forest">{experience.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{experience.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        aria-label="Previous experience"
        className="absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 rounded-full border border-forest/20 bg-white p-2 shadow-md sm:block"
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        aria-label="Next experience"
        className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-4 rounded-full border border-forest/20 bg-white p-2 shadow-md sm:block"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
