import { describe, expect, it } from 'vitest';
import { ccavDecrypt, ccavEncrypt, parseCcavResponse } from './ccavenue';

describe('ccavenue crypto', () => {
  const workingKey = 'test-working-key-do-not-use-in-production';

  it('round-trips a plain param string through encrypt then decrypt', () => {
    const plain = 'merchant_id=2006182&order_id=260905ABC12345&amount=1500.00&currency=INR';
    const encrypted = ccavEncrypt(plain, workingKey);

    expect(encrypted).not.toBe(plain);
    expect(encrypted).toMatch(/^[0-9a-f]+$/);

    const decrypted = ccavDecrypt(encrypted, workingKey);
    expect(decrypted).toBe(plain);
  });

  it('fails to decrypt with the wrong working key', () => {
    const encrypted = ccavEncrypt('order_id=123', workingKey);
    expect(() => ccavDecrypt(encrypted, 'a-different-key')).toThrow();
  });

  it('parses a decrypted CCAvenue response into a plain object', () => {
    const decrypted =
      'order_id=260905ABC12345&tracking_id=T1&bank_ref_no=B1&order_status=Success&amount=1500.00';
    const parsed = parseCcavResponse(decrypted);

    expect(parsed).toEqual({
      order_id: '260905ABC12345',
      tracking_id: 'T1',
      bank_ref_no: 'B1',
      order_status: 'Success',
      amount: '1500.00',
    });
  });
});
