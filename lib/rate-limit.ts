const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);

  // Without this, every distinct key this function ever sees (including a
  // spoofed, ever-changing one — see clientIp below) stays in the map
  // forever, growing it unboundedly.
  for (const [k, v] of hits) {
    if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }

  return timestamps.length > MAX_REQUESTS_PER_WINDOW;
}

// Vercel's edge sets x-real-ip and x-forwarded-for from the actual
// connection, not from client-supplied values, so both are safe to trust
// here. x-forwarded-for can still be a multi-hop chain (client, proxy1, ...)
// — using the raw header as the rate-limit key would let a client vary the
// key on every request by changing that chain, defeating the limiter, so
// take only the first (client) entry.
export function clientIp(headers: { get(name: string): string | null }): string {
  const realIp = headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0]?.trim() || 'unknown';

  return 'unknown';
}
