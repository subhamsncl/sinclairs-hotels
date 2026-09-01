'use client';

import { hotels } from '@/content/hotels';
import { primaryNav } from '@/content/site';
import Link from 'next/link';
import { useState } from 'react';

export function Nav() {
  const [hotelsOpen, setHotelsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-forest text-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl tracking-wide">
          Sinclairs
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
                  className="text-sm uppercase tracking-wider hover:text-gold-light"
                  aria-expanded={hotelsOpen}
                >
                  {item.label}
                </Link>
                {hotelsOpen && (
                  <div className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3">
                    <ul className="rounded-md border border-gold/20 bg-forest-dark py-2 shadow-xl">
                      {hotels.map((hotel) => (
                        <li key={hotel.slug}>
                          <Link
                            href={`/hotels/${hotel.slug}`}
                            className="block px-4 py-2 text-sm hover:bg-forest hover:text-gold-light"
                          >
                            {hotel.name}
                            <span className="block text-xs text-cream/60">{hotel.location}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-wider hover:text-gold-light"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <Link
          href="/enquiry"
          className="hidden rounded border border-gold px-5 py-2 text-sm uppercase tracking-wider text-gold-light transition hover:bg-gold hover:text-forest md:inline-block"
        >
          Book Now
        </Link>

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
        <nav className="border-t border-gold/20 px-6 pb-6 md:hidden">
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
