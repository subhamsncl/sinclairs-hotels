'use client';

import { submitEnquiry } from '@/app/enquiry/actions';
import type { Hotel } from '@/content/types';
import { useActionState } from 'react';

const initialState = { status: 'idle' as const };

export function EnquiryForm({
  hotels,
  defaultProperty,
  defaultCheckIn,
  defaultCheckOut,
  defaultGuests,
}: {
  hotels: Hotel[];
  defaultProperty?: string;
  defaultCheckIn?: string;
  defaultCheckOut?: string;
  defaultGuests?: string;
}) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  if (state.status === 'success') {
    return (
      <div className="rounded-lg border border-forest/20 bg-forest/5 p-8 text-center">
        <p className="font-display text-xl text-forest">Thank you</p>
        <p className="mt-2 text-sm text-ink/70">
          {state.message ?? 'Our team will be in touch shortly.'}
        </p>
      </div>
    );
  }

  const fieldError = (field: string) => state.fieldErrors?.[field]?.[0];

  return (
    <form action={formAction} className="space-y-5">
      {state.status === 'error' && state.message && (
        <p className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name" name="name" error={fieldError('name')}>
          <input
            id="name"
            type="text"
            name="name"
            required
            className="input"
            aria-invalid={Boolean(fieldError('name'))}
          />
        </Field>
        <Field label="Email" name="email" error={fieldError('email')}>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="input"
            aria-invalid={Boolean(fieldError('email'))}
          />
        </Field>
        <Field label="Phone" name="phone" error={fieldError('phone')}>
          <input
            id="phone"
            type="tel"
            name="phone"
            required
            className="input"
            aria-invalid={Boolean(fieldError('phone'))}
          />
        </Field>
        <Field label="Property" name="property" error={fieldError('property')}>
          <select
            id="property"
            name="property"
            required
            defaultValue={defaultProperty ?? ''}
            className="input"
            aria-invalid={Boolean(fieldError('property'))}
          >
            <option value="" disabled>
              Select a property
            </option>
            {hotels.map((hotel) => (
              <option key={hotel.slug} value={hotel.slug}>
                {hotel.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Check-in" name="checkIn">
          <input
            id="checkIn"
            type="date"
            name="checkIn"
            defaultValue={defaultCheckIn}
            className="input"
          />
        </Field>
        <Field label="Check-out" name="checkOut">
          <input
            id="checkOut"
            type="date"
            name="checkOut"
            defaultValue={defaultCheckOut}
            className="input"
          />
        </Field>
        <Field label="Guests" name="guests">
          <input
            id="guests"
            type="number"
            name="guests"
            min={1}
            max={20}
            defaultValue={defaultGuests}
            className="input"
          />
        </Field>
      </div>

      <Field label="Message" name="message" error={fieldError('message')}>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="input"
          aria-invalid={Boolean(fieldError('message'))}
        />
      </Field>

      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded bg-forest px-6 py-3 text-sm uppercase tracking-wider text-cream transition hover:bg-forest-dark disabled:opacity-60 sm:w-auto"
      >
        {pending ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-wider text-ink/60">
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
