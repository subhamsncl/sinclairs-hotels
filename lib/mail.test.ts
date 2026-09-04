import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const originalApiKey = process.env.RESEND_API_KEY;

describe('sendMail', () => {
  beforeEach(() => {
    vi.resetModules();
    // process.env coerces `= undefined` to the string "undefined", which would
    // make lib/mail.ts's `if (RESEND_API_KEY)` check truthy — delete is the only
    // way to actually unset it.
    // biome-ignore lint/performance/noDelete: process.env stringifies assignments; delete is required here
    delete process.env.RESEND_API_KEY;
  });

  afterEach(() => {
    if (originalApiKey === undefined) {
      // biome-ignore lint/performance/noDelete: process.env stringifies assignments; delete is required here
      delete process.env.RESEND_API_KEY;
    } else {
      process.env.RESEND_API_KEY = originalApiKey;
    }
  });

  it('resolves without making a network call when RESEND_API_KEY is unset', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const { sendMail } = await import('./mail');

    await expect(
      sendMail({ to: 'guest@example.com', subject: 'Test', html: '<p>Hi</p>' }),
    ).resolves.toBeUndefined();

    expect(logSpy).toHaveBeenCalledWith(
      '[mail:dev-fallback]',
      expect.objectContaining({ to: 'guest@example.com', subject: 'Test' }),
    );

    logSpy.mockRestore();
  });
});
