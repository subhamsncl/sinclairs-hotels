'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function RoomImageCarousel({
  images,
  alt,
  aspectClassName = 'aspect-[4/3]',
}: {
  images: string[];
  alt: string;
  aspectClassName?: string;
}) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || hovering) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images.length, hovering]);

  const src = images[index] ?? images[0];
  if (!src) return null;

  const go = (delta: number) => {
    setIndex((i) => (i + delta + images.length) % images.length);
  };

  return (
    <div
      className={`group/carousel relative overflow-hidden ${aspectClassName}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Image
        key={src}
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="animate-fade-up object-cover transition duration-500 group-hover:scale-105"
      />
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-forest-dark/40 text-cream opacity-0 backdrop-blur-sm transition hover:bg-forest-dark/70 group-hover/carousel:opacity-100"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-forest-dark/40 text-cream opacity-0 backdrop-blur-sm transition hover:bg-forest-dark/70 group-hover/carousel:opacity-100"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                aria-label={`Show photo ${i + 1} of ${images.length}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-4 bg-cream' : 'w-1.5 bg-cream/50 hover:bg-cream/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
