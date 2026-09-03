'use client';

import type { GalleryImage } from '@/content/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function SpotlightGallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 3200);
    return () => clearInterval(id);
  }, [images.length]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const active = images[index];
  if (!active) return null;

  return (
    <div className="overflow-hidden">
      <div className="relative mx-auto h-52 max-w-6xl overflow-hidden sm:h-72 lg:h-[26rem]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-44 -translate-x-1/2 -translate-y-1/4 rounded-full bg-gold/25 blur-[60px] sm:h-40 sm:w-56 lg:h-52 lg:w-72" />

        {images.map((image, i) => {
          let delta = i - index;
          const half = images.length / 2;
          if (delta > half) delta -= images.length;
          if (delta < -half) delta += images.length;
          const dist = Math.abs(delta);
          if (dist > 2) return null;
          const isActive = delta === 0;
          const scale = isActive ? 1 : dist === 1 ? 0.68 : 0.48;
          const offsetPx =
            dist === 0 ? 0 : dist === 1 ? (isDesktop ? 210 : 125) : isDesktop ? 360 : 215;

          return (
            <button
              key={image.src}
              type="button"
              aria-label={`Show ${image.alt}`}
              onClick={() => setIndex(i)}
              className="absolute left-1/2 top-1/2 h-44 w-36 overflow-hidden rounded-xl shadow-xl transition-all duration-700 ease-out sm:h-60 sm:w-48 lg:h-96 lg:w-72"
              style={{
                transform: `translate(-50%, -50%) translateX(${delta < 0 ? -offsetPx : offsetPx}px) scale(${scale})`,
                opacity: isActive ? 1 : dist === 1 ? 0.55 : 0.28,
                zIndex: 10 - dist,
                filter: isActive ? 'none' : 'saturate(0.5) brightness(0.82)',
                cursor: isActive ? 'default' : 'pointer',
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 380px, 250px"
                className="transform-gpu object-cover"
              />
              {isActive && (
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.18)] ring-1 ring-gold/40" />
              )}
            </button>
          );
        })}
      </div>

      <p
        key={active.src}
        className="animate-fade-up mt-4 text-center font-display text-base text-forest sm:text-lg"
      >
        {active.alt}
      </p>
    </div>
  );
}
