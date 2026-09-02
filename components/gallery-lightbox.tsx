'use client';

import type { GalleryImage } from '@/content/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === 'ArrowLeft')
        setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIndex, images.length]);

  const current = openIndex === null ? null : images[openIndex];

  return (
    <>
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Open photo: ${image.alt}`}
            onClick={() => setOpenIndex(i)}
            className={`group relative overflow-hidden rounded-lg shadow-sm transition duration-300 hover:shadow-xl ${
              i === 0 ? 'col-span-2 row-span-2' : ''
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/70 via-forest-dark/0 to-forest-dark/0 opacity-0 transition duration-300 group-hover:opacity-100" />
            <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-forest-dark/40 text-cream opacity-0 backdrop-blur-sm transition duration-300 group-hover:opacity-100">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 21h4a2 2 0 0 0 2-2v-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="absolute inset-x-0 bottom-0 translate-y-2 px-3 pb-2.5 text-left text-xs leading-snug text-cream opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 line-clamp-2">
              {image.alt}
            </p>
          </button>
        ))}
      </div>

      {current && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10">
          <button
            type="button"
            aria-label="Close lightbox"
            onClick={() => setOpenIndex(null)}
            className="absolute inset-0 bg-forest-dark/95"
          />

          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={() =>
              setOpenIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))
            }
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20 sm:left-6"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
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
            onClick={() => setOpenIndex((i) => (i === null ? i : (i + 1) % images.length))}
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20 sm:right-6"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative h-full w-full max-w-5xl">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="animate-fade-up object-contain"
            />
          </div>

          <p className="absolute bottom-4 left-1/2 max-w-xl -translate-x-1/2 px-4 text-center text-sm text-cream/80 sm:bottom-6">
            {current.alt}
            <span className="ml-2 text-cream/50">
              {(openIndex ?? 0) + 1} / {images.length}
            </span>
          </p>
        </div>
      )}
    </>
  );
}
