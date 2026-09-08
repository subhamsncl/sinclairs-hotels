// The admin dashboard is used exclusively by India-based staff, and its data
// (imported legacy records and new bookings alike) is meaningful in IST — but
// this runs as a Server Component, so `toLocaleDateString()` without an
// explicit timeZone would use whatever timezone the server happens to run in
// (UTC on Vercel), silently showing the wrong calendar day near midnight IST.
const IST_TIMEZONE = 'Asia/Kolkata';

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    timeZone: IST_TIMEZONE,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', {
    timeZone: IST_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 20;

export function parsePageSize(param: string | undefined): number {
  const n = Number.parseInt(param ?? '', 10);
  return (PAGE_SIZE_OPTIONS as readonly number[]).includes(n) ? n : DEFAULT_PAGE_SIZE;
}
