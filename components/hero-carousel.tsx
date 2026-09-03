'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function HeroCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 7500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="h-full w-full animate-hero-zoom-loop">
            <Image
              src={src}
              alt={i === 0 ? alt : ''}
              fill
              priority={i === 0}
              className="object-cover"
              sizes="100vw"
              quality={90}
            />
          </div>
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_6vw_0_rgba(13,33,25,0.35)]" />
      {images.length > 1 && (
        <div className="absolute bottom-6 right-6 z-10 flex gap-2">
          {images.map((src, i) => (
            <span
              key={src}
              className={`h-px rounded-full transition-all duration-700 ${
                i === index
                  ? 'w-8 bg-gold shadow-[0_0_6px_rgba(189,148,85,0.8)]'
                  : 'w-4 bg-cream/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
