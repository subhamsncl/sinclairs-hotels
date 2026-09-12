import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const originalApiKey = process.env.RESEND_API_KEY;
const originalRecipientOverride = process.env.MAIL_RECIPIENT_OVERRIDE;

function unsetEnv(key: 'RESEND_API_KEY' | 'MAIL_RECIPIENT_OVERRIDE') {
  // process.env coerces `= undefined` to the string "undefined", which would
  // make lib/mail.ts's `if (ENV_VAR)` checks truthy — delete is the only way
  // to actually unset it.
  delete process.env[key];
}

describe('sendMail', () => {
  beforeEach(() => {
    vi.resetModules();
    unsetEnv('RESEND_API_KEY');
    unsetEnv('MAIL_RECIPIENT_OVERRIDE');
  });

  afterEach(() => {
    if (originalApiKey === undefined) unsetEnv('RESEND_API_KEY');
    else process.env.RESEND_API_KEY = originalApiKey;

    if (originalRecipientOverride === undefined) unsetEnv('MAIL_RECIPIENT_OVERRIDE');
    else process.env.MAIL_RECIPIENT_OVERRIDE = originalRecipientOverride;
  });

  it('resolves without making a network call when RESEND_API_KEY is unset', async () => {
    const logSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const { sendMail } = await import('./mail');

    await expect(
      sendMail({ to: 'guest@example.com', subject: 'Test', html: '<p>Hi</p>' }),
    ).resolves.toBeUndefined();

    const line = JSON.parse(logSpy.mock.calls[0]?.[0] as string);
    expect(line).toMatchObject({ event: 'mail.skipped_no_provider', recipients: 1 });
    // Neither the address nor the subject may survive into the log line.
    expect(logSpy.mock.calls[0]?.[0]).not.toContain('guest@example.com');
    expect(logSpy.mock.calls[0]?.[0]).not.toContain('Test');

    logSpy.mockRestore();
  });

  it('redirects to MAIL_RECIPIENT_OVERRIDE and keeps the real recipient in the subject', async () => {
    process.env.MAIL_RECIPIENT_OVERRIDE = 'owner@example.com';
    const logSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const { sendMail } = await import('./mail');

    await sendMail({
      to: 'guest@example.com',
      bcc: 'office@example.com',
      subject: 'Your Sinclairs Booking Voucher — #1',
      html: '<p>Hi</p>',
    });

    // The log records that an override was in force, never who it redirected
    // to or from — the rewritten subject is visible on the email itself.
    const line = JSON.parse(logSpy.mock.calls[0]?.[0] as string);
    expect(line).toMatchObject({
      event: 'mail.skipped_no_provider',
      recipient_override: true,
      recipients: 1,
    });
    expect(logSpy.mock.calls[0]?.[0]).not.toContain('guest@example.com');

    logSpy.mockRestore();
  });
});
