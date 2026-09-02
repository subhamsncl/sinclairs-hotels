'use client';

import { hotels } from '@/content/hotels';
import { primaryNav, reservationUrl } from '@/content/site';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function Nav() {
  const [hotelsOpen, setHotelsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-forest text-cream shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-xl tracking-wide">Sinclairs</span>
          <span className="mt-1 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {primaryNav.map((item) =>
            item.label === 'Hotels' ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setHotelsOpen(true)}
                onMouseLeave={() => setHotelsOpen(false)}
              >
                <Link
                  href={item.href}
                  className="group relative text-sm uppercase tracking-wider transition hover:text-gold-light"
                  aria-expanded={hotelsOpen}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
                {hotelsOpen && (
                  <div className="absolute left-1/2 top-full w-[560px] max-w-[80vw] -translate-x-1/2 pt-3">
                    <div className="animate-fade-up grid grid-cols-2 gap-1 rounded-lg border border-gold/20 bg-forest-dark p-3 shadow-2xl">
                      {hotels.map((hotel) => (
                        <Link
                          key={hotel.slug}
                          href={`/hotels/${hotel.slug}`}
                          className="group/item flex items-center gap-3 rounded-md p-2 transition hover:bg-forest"
                        >
                          <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded">
                            <Image
                              src={hotel.thumbnailImage}
                              alt=""
                              fill
                              sizes="64px"
                              className="object-cover transition duration-500 group-hover/item:scale-110"
                            />
                          </span>
                          <span>
                            <span className="block text-sm text-cream group-hover/item:text-gold-light">
                              {hotel.name}
                            </span>
                            <span className="block text-xs text-cream/50">{hotel.location}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm uppercase tracking-wider transition hover:text-gold-light"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ),
          )}
        </nav>

        <a
          href={reservationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded border border-gold px-5 py-2 text-sm uppercase tracking-wider text-gold-light transition duration-300 hover:bg-gold hover:text-forest hover:shadow-lg md:inline-block"
        >
          Book Now
        </a>

        <button
          type="button"
          className="text-cream md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="animate-fade-up border-t border-gold/20 px-6 pb-6 md:hidden">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-sm uppercase tracking-wider"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-gold/10 pt-2">
            {hotels.map((hotel) => (
              <Link
                key={hotel.slug}
                href={`/hotels/${hotel.slug}`}
                className="block py-2 pl-4 text-sm text-cream/80"
                onClick={() => setMobileOpen(false)}
              >
                {hotel.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
