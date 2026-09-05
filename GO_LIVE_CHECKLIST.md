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

## i-Pay (CCAvenue payments)

- [ ] Get the real `CCAVENUE_WORKING_KEY` and `CCAVENUE_ACCESS_CODE` from Ravi
      (email drafted, not sent yet) and add to `.env.local` / Vercel env.
      Merchant ID (`2006182`) is already correct — same as legacy.
- [ ] Do at least one real round-trip test against CCAvenue (sandbox if
      available, otherwise a small real transaction) before relying on it for
      guest payments — the integration has never been exercised against the
      real gateway, only against the dev fallback.
- [ ] Confirm the `redirect_url`/`cancel_url` CCAvenue is configured to POST
      back to match the deployed domain (not `localhost`) once live.

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
