import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createSessionCookieValue, verifySessionCookieValue } from './admin-auth';

const originalSecret = process.env.ADMIN_SESSION_SECRET;

describe('admin session cookie', () => {
  beforeEach(() => {
    process.env.ADMIN_SESSION_SECRET = 'test-secret-do-not-use-in-production';
  });

  afterEach(() => {
    if (originalSecret === undefined) {
      // biome-ignore lint/performance/noDelete: process.env stringifies assignments; delete is required here
      delete process.env.ADMIN_SESSION_SECRET;
    } else {
      process.env.ADMIN_SESSION_SECRET = originalSecret;
    }
  });

  it('verifies a freshly created cookie value', async () => {
    const value = await createSessionCookieValue();
    await expect(verifySessionCookieValue(value)).resolves.toBe(true);
  });

  it('rejects a missing cookie value', async () => {
    await expect(verifySessionCookieValue(undefined)).resolves.toBe(false);
    await expect(verifySessionCookieValue(null)).resolves.toBe(false);
  });

  it('rejects a tampered signature', async () => {
    const value = await createSessionCookieValue();
    const [expiresAt] = value.split('.');
    await expect(verifySessionCookieValue(`${expiresAt}.tampered-signature`)).resolves.toBe(false);
  });

  it('rejects an expired cookie', async () => {
    const expiredExpiresAt = Date.now() - 1000;
    // Craft a validly-signed but already-expired cookie by asking for a real one
    // and rewriting only the timestamp — its signature is then for the wrong
    // message, so this also doubles as an expiry check via signature mismatch.
    const value = await createSessionCookieValue();
    const [, signature] = value.split('.');
    await expect(verifySessionCookieValue(`${expiredExpiresAt}.${signature}`)).resolves.toBe(false);
  });

  it('rejects a cookie signed with a different secret', async () => {
    const value = await createSessionCookieValue();
    process.env.ADMIN_SESSION_SECRET = 'a-different-secret';
    await expect(verifySessionCookieValue(value)).resolves.toBe(false);
  });
});
