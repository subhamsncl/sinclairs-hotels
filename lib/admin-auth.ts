export const ADMIN_COOKIE_NAME = 'admin_session';

const SESSION_TTL_MS = 10 * 60 * 60 * 1000;

async function hmacHex(message: string): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set');

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function constantTimeEqual(a: string, b: string): boolean {
  const maxLength = Math.max(a.length, b.length);
  let mismatch = a.length === b.length ? 0 : 1;
  for (let i = 0; i < maxLength; i++) {
    mismatch |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return mismatch === 0;
}

// Cookie content is "<expiresAtMs>.<hmac-sha256-hex('admin:'+expiresAtMs)>" — nothing
// secret travels to the browser, just a signed, time-bound flag. Forging a valid
// signature requires ADMIN_SESSION_SECRET, which never leaves the server.
export async function createSessionCookieValue(): Promise<string> {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  return `${expiresAt}.${await hmacHex(`admin:${expiresAt}`)}`;
}

export async function verifySessionCookieValue(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;

  const [expiresAtStr, signature] = value.split('.');
  const expiresAt = Number(expiresAtStr);
  if (!expiresAtStr || !signature || Number.isNaN(expiresAt) || Date.now() > expiresAt)
    return false;

  const expected = await hmacHex(`admin:${expiresAt}`);
  return constantTimeEqual(signature, expected);
}

export const ADMIN_SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;
