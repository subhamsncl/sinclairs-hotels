'use client';

import { refundPayment } from '@/app/admin/(dashboard)/payments/actions';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

const initialState = { status: 'idle' as const };

export type RefundHistoryItem = {
  id: string;
  amount: number;
  status: 'SUCCESS' | 'FAILURE';
  txnID: string | null;
  respDescription: string | null;
  date: string;
  time: string;
};

// Three steps a refund actually goes through against ICICI's synchronous
// /api/command — there's no separate webhook/settlement event to poll for,
// so "processing" only spans the single request this app makes; ICICI's own
// response is the final word on whether the bank accepted it.
function TrackerSteps({ stage }: { stage: 'processing' | 'success' | 'failure' }) {
  const steps = [
    { label: 'Refund requested', done: true },
    { label: 'Sent to bank', done: true, active: stage === 'processing' },
    {
      label: stage === 'failure' ? 'Declined by bank' : 'Completed',
      done: stage !== 'processing',
      failed: stage === 'failure',
    },
  ];

  return (
    <ol className="flex items-center gap-2">
      {steps.map((step, i) => (
        <li key={step.label} className="flex flex-1 items-center gap-2">
          <div className="flex flex-col items-center gap-1 text-center">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                step.failed
                  ? 'bg-red-600 text-white'
                  : step.done
                    ? 'bg-forest text-cream'
                    : 'animate-pulse bg-gold/30 text-forest'
              }`}
            >
              {step.failed ? '✕' : step.done ? '✓' : i + 1}
            </span>
            <span className="max-w-[5.5rem] text-[10px] leading-tight text-ink/60">
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && <div className="mb-4 h-px flex-1 bg-ink/10" />}
        </li>
      ))}
    </ol>
  );
}

function HistoryRow({ refund }: { refund: RefundHistoryItem }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-ink/5 py-2 text-xs last:border-0">
      <div>
        <span className={refund.status === 'SUCCESS' ? 'text-forest' : 'text-red-700'}>
          {refund.status === 'SUCCESS' ? '✓' : '✕'} INR {refund.amount.toFixed(2)}
        </span>
        <span className="ml-1 text-ink/50">
          {refund.status === 'SUCCESS' ? 'completed' : (refund.respDescription ?? 'failed')}
        </span>
        {refund.txnID && <div className="text-ink/40">Gateway Txn: {refund.txnID}</div>}
      </div>
      <div className="whitespace-nowrap text-ink/40">
        {refund.date} {refund.time}
      </div>
    </div>
  );
}

export function RefundForm({
  orderId,
  remaining,
  sourceLabel,
  history,
}: {
  orderId: string;
  remaining: number;
  sourceLabel: string | null;
  history: RefundHistoryItem[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(refundPayment, initialState);

  // /admin/payments is force-dynamic, so there's nothing server-side to
  // revalidate — but this client component's own view (refund history,
  // remaining balance) is still stale until the Server Component re-fetches,
  // which only router.refresh() triggers.
  // biome-ignore lint/correctness/useExhaustiveDependencies: only the success transition itself should trigger a refresh
  useEffect(() => {
    if (state.status === 'success') router.refresh();
  }, [state.status]);

  const stage: 'processing' | 'success' | 'failure' | null = pending
    ? 'processing'
    : state.status === 'success'
      ? 'success'
      : state.status === 'error' && state.message
        ? 'failure'
        : null;

  return (
    <div className="flex flex-col items-start gap-1">
      {history.length > 0 && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-xs text-ink/50 underline"
        >
          {history.length} refund{history.length > 1 ? 's' : ''} (INR{' '}
          {history
            .filter((r) => r.status === 'SUCCESS')
            .reduce((sum, r) => sum + r.amount, 0)
            .toFixed(2)}
          )
        </button>
      )}
      {remaining > 0 && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button type="button" className="text-xs font-medium text-forest underline">
              Refund
            </button>
          </DialogTrigger>
          <DialogContent
            title="Refund Payment"
            description={`Transaction ${orderId} — refundable balance INR ${remaining.toFixed(2)}`}
          >
            <div className="mb-4 rounded-lg bg-forest/5 px-3 py-2 text-sm">
              <span className="text-ink/50">Refunding to: </span>
              <span className="font-medium text-ink">
                {sourceLabel ?? 'Source account not on record for this transaction'}
              </span>
            </div>

            {history.length > 0 && (
              <div className="mb-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink/40">
                  Refund history
                </p>
                {history.map((refund) => (
                  <HistoryRow key={refund.id} refund={refund} />
                ))}
              </div>
            )}

            {stage && (
              <div className="mb-4 rounded-lg border border-ink/10 px-3 py-3">
                <TrackerSteps stage={stage} />
                {state.message && (
                  <p
                    className={`mt-3 text-center text-xs ${state.status === 'success' ? 'text-forest' : 'text-red-700'}`}
                  >
                    {state.message}
                  </p>
                )}
              </div>
            )}

            {state.status !== 'success' && (
              <form action={formAction} className="flex items-center gap-1.5">
                <input type="hidden" name="orderId" value={orderId} />
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  min="0.01"
                  max={remaining}
                  defaultValue={remaining.toFixed(2)}
                  required
                  className="input flex-1 py-1.5 text-sm"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="whitespace-nowrap rounded bg-forest px-3 py-1.5 text-xs font-medium text-cream transition hover:bg-forest-dark disabled:opacity-50"
                >
                  {pending ? 'Processing…' : 'Confirm Refund'}
                </button>
              </form>
            )}

            <DialogClose asChild>
              <button
                type="button"
                className="mt-4 w-full text-center text-xs text-ink/50 underline"
              >
                {state.status === 'success' ? 'Close' : 'Cancel'}
              </button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
