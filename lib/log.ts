// Vercel's log viewer parses a JSON line into queryable fields, so every server
// event goes out as one line of JSON rather than an interpolated string. That is
// what makes "show me every enquiry for gangtok that failed" a filter rather
// than a grep, and it is the server-side record the funnel can be reconciled
// against when GA4 and the database disagree.
//
// Client-side events never reach Vercel's logs — only GA4 sees those. The events
// here are the server half of docs/analytics-events.md, deliberately named after
// the same funnel steps so the two can be lined up.

type Level = 'info' | 'warn' | 'error';

export type LogFields = Record<string, string | number | boolean | null | undefined>;

// Enquiries carry a guest's name, email, phone and free-text message, and none
// of it belongs in a log line that is retained and searchable by anyone with
// dashboard access. Logging an id and a property slug answers the operational
// questions without holding the personal data a second time.
//
// `subject` is on the list because mail subjects embed the guest's name —
// "New Hotel Booking enquiry - gangtok (Jane Doe)" - so logging the subject
// leaks a name that no individual field ever exposed. Mail sends log `kind`
// instead, which says which template ran without naming anyone.
const FORBIDDEN_KEYS =
  /^(name|email|phone|message|subject|ip|userip|to|bcc|cc|reply_to|replyto|password|token|secret|hash)$/i;

function scrub(fields: LogFields): LogFields {
  const safe: LogFields = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined) continue;
    safe[key] = FORBIDDEN_KEYS.test(key) ? '[redacted]' : value;
  }
  return safe;
}

function emit(level: Level, event: string, fields: LogFields): void {
  const line = JSON.stringify({
    level,
    event,
    ts: new Date().toISOString(),
    ...scrub(fields),
  });

  if (level === 'error') console.error(line);
  else if (level === 'warn') console.warn(line);
  else console.log(line);
}

export const log = {
  info: (event: string, fields: LogFields = {}) => emit('info', event, fields),
  warn: (event: string, fields: LogFields = {}) => emit('warn', event, fields),
  error: (event: string, fields: LogFields = {}) => emit('error', event, fields),
};

// Error objects do not survive JSON.stringify — an uncaught one logs as `{}`.
export function errorFields(err: unknown): LogFields {
  if (err instanceof Error) {
    return { error: err.message, error_name: err.name };
  }
  return { error: String(err) };
}
