import { describe, expect, it } from 'vitest';
import {
  hashV1,
  hashV2,
  iciciTimestamp,
  initiateSaleAccepted,
  isIciciSuccess,
  parseIciciPaymentResponse,
  verifyHashV1,
} from './icici';

describe('ICICI hash v1 (concatenation)', () => {
  const key = 'test-hmac-key-do-not-use-in-production';

  it('concatenates values in ascending key order, per the spec example', () => {
    // Spec example: name="aa", param1="abc", param2="xyz" -> "aa"+"abc"+"xyz"
    const hash = hashV1({ param2: 'xyz', name: 'aa', param1: 'abc' }, key);
    expect(hash).toBe(hashV1({ name: 'aa', param1: 'abc', param2: 'xyz' }, key));
  });

  it('skips null, undefined, and empty-string values', () => {
    const withGaps = hashV1({ a: '1', b: '', c: undefined, d: null, e: '2' }, key);
    const withoutGaps = hashV1({ a: '1', e: '2' }, key);
    expect(withGaps).toBe(withoutGaps);
  });

  it('is order-independent on input but order-dependent on the resulting value', () => {
    const h1 = hashV1({ z: 'last', a: 'first' }, key);
    const h2 = hashV1({ a: 'different', z: 'last' }, key);
    expect(h1).not.toBe(h2);
  });

  it('produces a lowercase hex string', () => {
    const hash = hashV1({ merchantId: 'T_S00067', amount: '150.00' }, key);
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });

  it('verifyHashV1 accepts a matching hash and rejects a tampered field', () => {
    const fields = { merchantId: 'T_S00067', merchantTxnNo: 'Test1', amount: '100.00' };
    const hash = hashV1(fields, key);

    expect(verifyHashV1(fields, hash, key)).toBe(true);
    expect(verifyHashV1({ ...fields, amount: '999.00' }, hash, key)).toBe(false);
    expect(verifyHashV1(fields, hash, 'a-different-key')).toBe(false);
  });
});

describe('ICICI hash v2 (minified JSON)', () => {
  const key = 'test-hmac-key-do-not-use-in-production';

  it('is sensitive to key order because JSON.stringify preserves insertion order', () => {
    const a = hashV2({ merchantId: 'T_1', amount: 100 }, key);
    const b = hashV2({ amount: 100, merchantId: 'T_1' }, key);
    // v2 hashes the exact minified string, unlike v1 — this is a known trap,
    // not a bug: caller must build the JSON body in the same field order
    // used to compute the hash.
    expect(a).not.toBe(b);
  });

  it('produces a lowercase hex string', () => {
    const hash = hashV2({ merchantId: 'T_1' }, key);
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe('iciciTimestamp', () => {
  it('formats as YYYYMMDDHHMISS', () => {
    const ts = iciciTimestamp(new Date(2026, 8, 8, 14, 5, 9));
    expect(ts).toBe('20260908140509');
  });
});

describe('initiateSaleAccepted', () => {
  it('accepts R1000 with a redirectURI and tranCtx', () => {
    expect(
      initiateSaleAccepted({
        responseCode: 'R1000',
        merchantId: 'T_S00067',
        merchantTxnNo: 'M1',
        redirectURI: 'https://pgpayuat.icicibank.com/tsp/pg/api/v2/authRedirect',
        tranCtx: 'Rabc123',
        secureHash: 'x',
      }),
    ).toBe(true);
  });

  it('rejects a non-R1000 response even with a redirectURI', () => {
    expect(
      initiateSaleAccepted({
        responseCode: 'R1001',
        merchantId: 'T_S00067',
        merchantTxnNo: 'M1',
        redirectURI: 'https://example.com',
        tranCtx: 'x',
        secureHash: 'x',
      }),
    ).toBe(false);
  });
});

describe('isIciciSuccess', () => {
  it('treats both 000 and 0000 as success', () => {
    expect(isIciciSuccess('000')).toBe(true);
    expect(isIciciSuccess('0000')).toBe(true);
    expect(isIciciSuccess('R1000')).toBe(false);
    expect(isIciciSuccess('999')).toBe(false);
  });
});

describe('parseIciciPaymentResponse', () => {
  it('reads the documented form fields and tolerates either paymentID or txnAuthID', () => {
    const form = new FormData();
    form.set('responseCode', '000');
    form.set('respDescription', 'SUCCESS');
    form.set('merchantId', 'T_S00067');
    form.set('merchantTxnNo', 'M99887766');
    form.set('txnID', '7700206371536');
    form.set('paymentDateTime', '20260908140509');
    form.set('txnAuthID', '811069696857');
    form.set('secureHash', 'abc123');

    const parsed = parseIciciPaymentResponse(form);
    expect(parsed).toEqual({
      responseCode: '000',
      respDescription: 'SUCCESS',
      merchantId: 'T_S00067',
      merchantTxnNo: 'M99887766',
      txnID: '7700206371536',
      paymentDateTime: '20260908140509',
      paymentID: undefined,
      txnAuthID: '811069696857',
      secureHash: 'abc123',
    });
  });
});
