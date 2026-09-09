import { describe, expect, it } from 'vitest';
import { maskedInstrument } from './admin-format';

describe('maskedInstrument', () => {
  it('extracts the last 4 digits from a masked card PAN', () => {
    expect(maskedInstrument('Card', '6XXX XXXX XXXX 3677')).toBe('Card ending 3677');
  });

  it('labels a non-Card mode with masked digits using that mode name', () => {
    expect(maskedInstrument('DC', 'XXXXXXXXXXXX3677')).toBe('DC ending 3677');
  });

  it('shows an unmasked value (e.g. a UPI VPA) verbatim, prefixed by mode', () => {
    expect(maskedInstrument('UPI', 'test@ybl')).toBe('UPI: test@ybl');
  });

  it('returns null when there is no instrument on record', () => {
    expect(maskedInstrument('Card', null)).toBeNull();
    expect(maskedInstrument(null, undefined)).toBeNull();
  });

  it('falls back to the raw value when paymentMode is unknown', () => {
    expect(maskedInstrument(null, 'test@ybl')).toBe('test@ybl');
  });
});
