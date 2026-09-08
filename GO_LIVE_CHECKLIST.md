# Go-Live Checklist

Everything below is a real, currently-open gap between "the app works in dev,
pointed at my own inbox" and "this is safe/correct to put in front of real
guests on sinclairshotels.com." Nothing here is a nice-to-have — each item is
either a security requirement, a data-loss risk, or something that will
silently misbehave (send no email, misroute traffic) if skipped. Check items
off as they're actually done, not just started.

## Email

- [ ] **Verify `sinclairshotels.com` in Resend** (https://resend.com/domains —
      add the domain, add its DNS records, wait for verification). Until this
      is done, all mail sends from `onboarding@resend.dev`, which can only
      deliver to the Resend account's own verified address — see `lib/mail.ts`.
- [ ] Once verified, set `MAIL_FROM_ADDRESS` (Vercel env, production) to a real
      `@sinclairshotels.com` sender, e.g. `Sinclairs Hotels <noreply@sinclairshotels.com>`.
- [ ] Set `STAFF_NOTIFY_EMAIL` (Vercel env, production) to the real staff inbox
      (legacy used `reservations@sinclairshotels.com`) — currently pinned to
      `subham@sncl.in` in `.env.local` for end-to-end testing only.
- [ ] Clear `OWNER_BCC_EMAIL` in production once testing is done, unless the
      business wants every outbound email (including guest-facing i-Pay/voucher
      copies) permanently Bcc'd somewhere.
- [ ] Confirm real staff distribution list for the daily digest (currently
      `raviplanet@gmail.com` + `admin@sinclairshotels.com` Bcc, per legacy).

## i-Pay (ICICI Payment Gateway, Standard mode)

CCAvenue (the legacy gateway) has been retired from the codebase — ICICI is
now the only payment gateway, in Standard/redirect mode (card data is
captured on ICICI's own domain, never on this app, keeping it at PCI-DSS
SAQ-A rather than SAQ-D).

- [ ] Get the real `ICICI_MERCHANT_ID` and `ICICI_HMAC_KEY` from ICICI's
      merchant onboarding and add to `.env.local` / Vercel env. Code is built
      (`lib/icici.ts`, `app/(site)/ipay/actions.ts`, `app/api/ipay/callback/route.ts`)
      but has never run against ICICI's own UAT sandbox — no credentials
      exist yet.
- [ ] Do at least one real round-trip test against `pgpayuat.icicibank.com`
      before relying on it for guest payments.
- [ ] **Resolve the field-naming ambiguity in ICICI's own spec** — Chapter 6
      (Authorize) calls the auth reference `paymentID`, Chapter 7
      (Authorization Redirect) calls the same-looking value `txnAuthID` in
      its sample response. `lib/icici.ts` accepts both defensively, but this
      needs confirming against a real UAT response before launch.
- [ ] Confirm which hash version applies to `initiateSale` — the doc's intro
      calls it "a json request" but never explicitly says "Hash Calculation
      v2" for it (only Get Card Bin / UserCancel / Get Service Charges do).
      Implemented as v1 per the doc's own default rule (Note 2); verify this
      is right against a real sandbox response before trusting it with a
      live transaction.
- [ ] Out of scope so far, deferred until actually needed: Refund/Void,
      Transaction Status, Settlement Summary/Details reconciliation, Generate
      QR, Get Card Bin, Get Service Charges, UserCancel. None of these block
      a guest completing a payment; add them when the business needs
      refunds or settlement reconciliation through the app itself.

## Data

- [ ] Real per-hotel booking-office data (GSTIN, address, phone, email) — the
      legacy `voucher_hotels` MySQL table has this; pulling it was blocked
      earlier this session. Needed before vouchers show fully correct billing
      details.
- [ ] **Historical data migration** — none of this has been imported yet:
  - `voucher_detail` (13,528 rows)
  - `enquiry` (35,829 rows)
  - `newsletter_signup` (row count unconfirmed)

  This needs a one-time `mysqldump` + import script (see
  `/Users/subhamsaha/.claude/plans/encapsulated-swimming-meadow.md`, section E,
  for the full mapping already worked out) — until this runs, the new site has
  no memory of any guest history from before cutover.

## Security

- [ ] **Legacy GoDaddy server**: a webshell/backdoor was found and quarantined
      locally during migration research but **the live host itself was never
      remediated** — credentials need rotating and the box needs a real scan.
      This is independent of the Next.js rebuild and can't be done from here.
- [ ] Admin auth is currently a single shared `ADMIN_PASSWORD` for all staff —
      fine to launch with, but revisit for real per-user accounts once more
      than a couple of people use `/admin`.
- [ ] Generate and set a real `CRON_SECRET` (see below) before the digest cron
      route is reachable in production — without it, the endpoint is unauthenticated.

## Cutover

- [ ] DNS: point `sinclairshotels.com` at Vercel once everything above is done.
- [ ] 301 redirects from the old WordPress URL structure to the new one, so
      existing search equity transfers (see `CLAUDE.md` → SEO).
- [ ] Resubmit `sitemap.xml` in Google Search Console after cutover.
- [ ] Connect the GitHub repo in Vercel for auto-deploy-on-push (currently
      blocked on a one-time manual GitHub login connection in the Vercel
      dashboard) — until then, ship via `vercel deploy --prod`.
- [ ] Decommission the GoDaddy hosting once DNS has fully cut over and the
      historical data import (above) is confirmed complete.
