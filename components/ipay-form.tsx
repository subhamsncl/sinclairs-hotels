'use client';

import { type IpayFormState, initiatePayment } from '@/app/(site)/ipay/actions';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import type { Hotel } from '@/content/types';
import { useActionState, useEffect, useRef, useState } from 'react';

const CCAVENUE_URL =
  'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction';

const initialState: IpayFormState = { status: 'idle' };

export function IpayForm({ hotels }: { hotels: Hotel[] }) {
  const [state, formAction, pending] = useActionState(initiatePayment, initialState);
  const [hotelSlug, setHotelSlug] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const redirectFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'redirecting' && redirectFormRef.current) {
      redirectFormRef.current.submit();
    }
  }, [state]);

  if (state.status === 'redirecting') {
    return (
      <div className="rounded-lg border border-forest/20 bg-forest/5 p-8 text-center">
        <p className="font-display text-xl text-forest">Redirecting to secure payment…</p>
        <p className="mt-2 text-sm text-ink/70">Please do not close this window.</p>
        <form ref={redirectFormRef} method="post" action={CCAVENUE_URL} className="hidden">
          <input type="hidden" name="encRequest" value={state.encRequest} />
          <input type="hidden" name="access_code" value={state.accessCode} />
        </form>
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
        <Field label="Hotel" name="hotelSlug" error={fieldError('hotelSlug')}>
          <input type="hidden" name="hotelSlug" value={hotelSlug} />
          <div className="input">
            <Select value={hotelSlug} onValueChange={setHotelSlug}>
              <SelectTrigger id="hotelSlug" placeholder="Select a hotel" />
              <SelectContent>
                {hotels.map((hotel) => (
                  <SelectItem key={hotel.slug} value={hotel.slug}>
                    {hotel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Field>
        <Field label="Amount (₹)" name="amount" error={fieldError('amount')}>
          <input
            id="amount"
            type="number"
            name="amount"
            min={1}
            step="0.01"
            required
            className="input"
            aria-invalid={Boolean(fieldError('amount'))}
          />
        </Field>
        <Field label="Full Name" name="guestName" error={fieldError('guestName')}>
          <input
            id="guestName"
            type="text"
            name="guestName"
            required
            className="input"
            aria-invalid={Boolean(fieldError('guestName'))}
          />
        </Field>
        <Field label="Email" name="guestEmail" error={fieldError('guestEmail')}>
          <input
            id="guestEmail"
            type="email"
            name="guestEmail"
            required
            className="input"
            aria-invalid={Boolean(fieldError('guestEmail'))}
          />
        </Field>
        <Field label="Mobile Number" name="guestPhone" error={fieldError('guestPhone')}>
          <input
            id="guestPhone"
            type="tel"
            name="guestPhone"
            required
            className="input"
            aria-invalid={Boolean(fieldError('guestPhone'))}
          />
        </Field>
        <Field label="Reservation No. (if any)" name="reservationNo">
          <input id="reservationNo" type="text" name="reservationNo" className="input" />
        </Field>
        <Field label="Check-in" name="checkIn">
          <input type="hidden" name="checkIn" value={checkIn} />
          <div className="input">
            <DatePicker value={checkIn} onChange={setCheckIn} placeholder="Select date" />
          </div>
        </Field>
        <Field label="Check-out" name="checkOut">
          <input type="hidden" name="checkOut" value={checkOut} />
          <div className="input">
            <DatePicker
              value={checkOut}
              onChange={setCheckOut}
              min={checkIn}
              placeholder="Select date"
            />
          </div>
        </Field>
      </div>

      <Field label="Address" name="billingAddress">
        <textarea id="billingAddress" name="billingAddress" rows={2} className="input" />
      </Field>

      <Field label="Remark" name="remark">
        <textarea
          id="remark"
          name="remark"
          rows={2}
          placeholder="Special instructions..."
          className="input"
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
        className="w-full rounded bg-gold px-6 py-3 text-sm uppercase tracking-wider text-forest transition hover:bg-gold-light disabled:opacity-60 sm:w-auto"
      >
        {pending ? 'Processing…' : 'Proceed to Pay'}
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
