import { afterEach, describe, expect, it, vi } from 'vitest';
import { errorFields, log } from './log';

function captured(spy: ReturnType<typeof vi.spyOn>) {
  return JSON.parse((spy.mock.calls[0]?.[0] as string) ?? '{}');
}

describe('log', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('emits one line of JSON so Vercel can index the fields', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    log.info('enquiry.created', { enquiry_id: 7, property: 'gangtok' });

    expect(spy).toHaveBeenCalledTimes(1);
    const line = spy.mock.calls[0]?.[0] as string;
    expect(line).not.toContain('\n');
    expect(JSON.parse(line)).toMatchObject({
      level: 'info',
      event: 'enquiry.created',
      enquiry_id: 7,
      property: 'gangtok',
    });
  });

  it('stamps every line with a timestamp', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    log.info('enquiry.created');
    expect(Date.parse(captured(spy).ts)).not.toBeNaN();
  });

  it.each(['name', 'email', 'phone', 'message', 'ip', 'to', 'bcc', 'password', 'token', 'secret'])(
    'redacts %s so guest data is never retained in the log',
    (key) => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
      log.info('enquiry.created', { [key]: 'sensitive-value' });

      expect(spy.mock.calls[0]?.[0]).not.toContain('sensitive-value');
      expect(captured(spy)[key]).toBe('[redacted]');
    },
  );

  it('redacts regardless of the casing the caller used', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    log.info('enquiry.created', { Email: 'guest@example.com', userIp: '1.2.3.4' });

    expect(spy.mock.calls[0]?.[0]).not.toContain('guest@example.com');
    expect(spy.mock.calls[0]?.[0]).not.toContain('1.2.3.4');
  });

  it('keeps operational fields intact', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    log.info('ipay.settled', { order_id: 'SNCL123', amount: 4500, hotel: 'ooty' });

    expect(captured(spy)).toMatchObject({ order_id: 'SNCL123', amount: 4500, hotel: 'ooty' });
  });

  it('drops undefined rather than emitting a null field', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    log.info('ipay.settled', { order_id: 'SNCL123', payment_mode: undefined });

    expect(captured(spy)).not.toHaveProperty('payment_mode');
  });

  it('routes warn and error to the matching console channel', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    log.warn('enquiry.spam_blocked');
    log.error('ipay.callback.rejected');

    expect(JSON.parse(warn.mock.calls[0]?.[0] as string).level).toBe('warn');
    expect(JSON.parse(error.mock.calls[0]?.[0] as string).level).toBe('error');
  });
});

describe('errorFields', () => {
  it('unpacks an Error, which JSON.stringify would flatten to {}', () => {
    expect(errorFields(new TypeError('gateway unreachable'))).toEqual({
      error: 'gateway unreachable',
      error_name: 'TypeError',
    });
  });

  it('handles a thrown non-Error', () => {
    expect(errorFields('socket hang up')).toEqual({ error: 'socket hang up' });
  });
});
