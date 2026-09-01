'use client';

import type { Hotel } from '@/content/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function todayISO(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export function BookingWidget({ hotels }: { hotels: Hotel[] }) {
  const router = useRouter();
  const [property, setProperty] = useState(hotels[0]?.slug ?? '');
  const [checkIn, setCheckIn] = useState(todayISO(0));
  const [checkOut, setCheckOut] = useState(todayISO(1));
  const [guests, setGuests] = useState(2);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams({ property, checkIn, checkOut, guests: String(guests) });
    router.push(`/enquiry?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-xl sm:flex-row sm:items-end sm:gap-0 sm:divide-x sm:divide-forest/10 sm:p-0"
    >
      <label className="flex-1 px-4 py-2 sm:py-3">
        <span className="block text-xs uppercase tracking-wider text-ink/50">Select Property</span>
        <select
          value={property}
          onChange={(e) => setProperty(e.target.value)}
          className="mt-1 w-full text-sm text-ink outline-none"
        >
          {hotels.map((hotel) => (
            <option key={hotel.slug} value={hotel.slug}>
              {hotel.name}
            </option>
          ))}
        </select>
      </label>

      <label className="px-4 py-2 sm:py-3">
        <span className="block text-xs uppercase tracking-wider text-ink/50">Check In</span>
        <input
          type="date"
          value={checkIn}
          min={todayISO(0)}
          onChange={(e) => setCheckIn(e.target.value)}
          className="mt-1 text-sm text-ink outline-none"
        />
      </label>

      <label className="px-4 py-2 sm:py-3">
        <span className="block text-xs uppercase tracking-wider text-ink/50">Check Out</span>
        <input
          type="date"
          value={checkOut}
          min={checkIn}
          onChange={(e) => setCheckOut(e.target.value)}
          className="mt-1 text-sm text-ink outline-none"
        />
      </label>

      <label className="px-4 py-2 sm:py-3">
        <span className="block text-xs uppercase tracking-wider text-ink/50">Guests</span>
        <input
          type="number"
          min={1}
          max={20}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="mt-1 w-16 text-sm text-ink outline-none"
        />
      </label>

      <button
        type="submit"
        className="mx-4 my-2 rounded bg-forest px-8 py-3 text-sm uppercase tracking-wider text-cream transition hover:bg-forest-dark sm:mx-0 sm:my-0 sm:h-full sm:rounded-none"
      >
        Search
      </button>
    </form>
  );
}
