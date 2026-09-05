'use client';

import { subscribeNewsletter } from '@/app/(site)/newsletter/actions';
import { useActionState } from 'react';

const initialState = { status: 'idle' as const };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, initialState);

  if (state.status === 'success') {
    return <p className="text-sm text-gold-light">{state.message ?? 'Thanks for subscribing!'}</p>;
  }

  return (
    <form action={formAction} className="space-y-2">
      {state.status === 'error' && state.message && (
        <p className="text-xs text-red-300">{state.message}</p>
      )}
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="Your email address"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded border border-cream/20 bg-transparent px-3 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-gold-light focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded bg-gold px-4 py-2 text-xs uppercase tracking-wider text-forest-dark transition hover:bg-gold-light disabled:opacity-60"
        >
          {pending ? '…' : 'Subscribe'}
        </button>
      </div>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
    </form>
  );
}
