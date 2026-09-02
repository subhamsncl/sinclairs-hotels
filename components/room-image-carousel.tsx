'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function RoomImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || hovering) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images.length, hovering]);

  const src = images[index] ?? images[0];
  if (!src) return null;

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden"
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
      )}
    </div>
  );
}
