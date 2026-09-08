import crypto from 'node:crypto';

// ICICI's Interface Specification Document defines two distinct hash
// schemes. Only 3 of ~18 APIs (Get Card Bin, UserCancel, Get Service
// Charges) explicitly call for "Hash Calculation v2" — every other API,
// initiateSale/refund/status/settlement included, just says "Check Hash
// Calculation for logic", which the doc's own Note 2 defines as defaulting
// to v1. That's why the Standard-mode payment flow below uses v1 throughout;
// v2 is exported for the handful of JSON-only APIs this integration doesn't
// build yet (see CLAUDE.md-adjacent scope note in the callback route).

type IciciEnv = 'uat' | 'production';

const BASE_URL: Record<IciciEnv, string> = {
  uat: 'https://pgpayuat.icicibank.com/tsp/pg',
  production: 'https://pgpay.icicibank.com/pg',
};

export function iciciConfig() {
  const merchantId = process.env.ICICI_MERCHANT_ID;
  const hmacKey = process.env.ICICI_HMAC_KEY;
  const env: IciciEnv = process.env.ICICI_ENV === 'production' ? 'production' : 'uat';
  return { merchantId, hmacKey, env, baseUrl: BASE_URL[env] };
}

// Hash Calculation (v1): concatenate parameter values — skipping null/empty
// — in ascending order of parameter name, then HMAC-SHA256, hex, lowercase.
// Every request/response field must be included except the hash itself,
// even ones outside the published spec (Note 1) — so callers should pass
// the exact object they're about to send/received, with secureHash removed.
export function hashV1(
  fields: Record<string, string | number | null | undefined>,
  key: string,
): string {
  const concatenated = Object.keys(fields)
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
    .map((k) => fields[k])
    .filter((v) => v !== null && v !== undefined && v !== '')
    .join('');

  return crypto.createHmac('sha256', key).update(concatenated, 'utf8').digest('hex').toLowerCase();
}

// Hash Calculation (v2): minified JSON string of the body, HMAC-SHA256, hex,
// lowercase — sent in a `securehash` request header (case-insensitive), per
// the spec. Used only by the JSON-only APIs (Get Card Bin, UserCancel, Get
// Service Charges) this integration doesn't call yet.
export function hashV2(body: Record<string, unknown>, key: string): string {
  const minified = JSON.stringify(body);
  return crypto.createHmac('sha256', key).update(minified, 'utf8').digest('hex').toLowerCase();
}

function timingSafeEqualHex(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyHashV1(
  fields: Record<string, string | number | null | undefined>,
  receivedHash: string,
  key: string,
): boolean {
  const expected = hashV1(fields, key);
  return timingSafeEqualHex(expected, receivedHash.toLowerCase());
}

// YYYYMMDDHHMISS in local (IST) time, the format every ICICI date/time field
// in this spec uses.
export function iciciTimestamp(date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
    `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`
  );
}

export type InitiateSaleRequest = {
  merchantId: string;
  merchantTxnNo: string;
  amount: string;
  currencyCode: '356';
  payType: '0';
  customerEmailID: string;
  transactionType: 'SALE';
  returnURL: string;
  txnDate: string;
  customerMobileNo?: string;
  customerName?: string;
  billingData?: Record<string, unknown>;
};

export type InitiateSaleResponse = {
  responseCode: string;
  responseDescription?: string;
  merchantId: string;
  merchantTxnNo: string;
  redirectURI?: string;
  tranCtx?: string;
  secureHash: string;
};

// R1000 means "request accepted" — for Standard mode this is the expected
// success response (the actual payment outcome arrives later via the
// browser redirect + callback), not a failure.
export function initiateSaleAccepted(res: InitiateSaleResponse): boolean {
  return res.responseCode === 'R1000' && Boolean(res.redirectURI) && Boolean(res.tranCtx);
}

export async function callInitiateSale(
  req: InitiateSaleRequest,
  key: string,
  baseUrl: string,
): Promise<InitiateSaleResponse> {
  const { billingData, ...hashable } = req;
  const secureHash = hashV1(hashable, key);
  const body = { ...req, secureHash };

  const res = await fetch(`${baseUrl}/api/v2/initiateSale`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`ICICI initiateSale HTTP ${res.status}`);
  }

  return (await res.json()) as InitiateSaleResponse;
}

// Posted back (form url-encoded) to returnURL after the browser completes
// authentication/authorization on ICICI's domain. Field naming is
// inconsistent between the spec's Authorize (Ch.6) and Authorization
// Redirect (Ch.7) chapters — paymentID vs txnAuthID for what looks like the
// same value — so both are accepted defensively until this is confirmed
// against a real UAT response.
export type IciciPaymentResponse = {
  responseCode: string;
  respDescription?: string;
  merchantId: string;
  merchantTxnNo: string;
  txnID?: string;
  paymentDateTime?: string;
  paymentID?: string;
  txnAuthID?: string;
  secureHash: string;
};

export function parseIciciPaymentResponse(formData: FormData): IciciPaymentResponse {
  const get = (name: string) => {
    const v = formData.get(name);
    return typeof v === 'string' && v ? v : undefined;
  };

  return {
    responseCode: get('responseCode') ?? '',
    respDescription: get('respDescription'),
    merchantId: get('merchantId') ?? '',
    merchantTxnNo: get('merchantTxnNo') ?? '',
    txnID: get('txnID'),
    paymentDateTime: get('paymentDateTime'),
    paymentID: get('paymentID'),
    txnAuthID: get('txnAuthID'),
    secureHash: get('secureHash') ?? '',
  };
}

// 000 and 0000 both appear in the spec as "Success" depending on chapter.
export function isIciciSuccess(responseCode: string): boolean {
  return responseCode === '000' || responseCode === '0000';
}
