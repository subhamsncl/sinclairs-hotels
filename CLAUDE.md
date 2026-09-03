# Sinclairs Hotels — Next.js Rebuild

Guidance for Claude Code (and any contributor) working in this repo.

## What this project is

A ground-up rebuild of the Sinclairs Hotels & Resorts marketing site
(currently WordPress + Elementor + MotoPress Hotel Booking, at `sinclairshotels.com`)
as a standalone Next.js application. Content and images are sourced once from the
WordPress export and become static/code-owned content in this repo — **this app has
no runtime dependency on WordPress**. See `PLAN.md` for the full execution plan and
current phase.

## Stack

- **Next.js (App Router) + TypeScript**, strict mode on (see `tsconfig.json` —
  `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride` all on)
- **pnpm** as the package manager — never `npm`/`yarn`. Commit `pnpm-lock.yaml`.
- **Biome** for linting + formatting (replaces ESLint + Prettier). One tool,
  one config (`biome.json`), fast, no plugin sprawl.
- **Tailwind CSS** for styling
- **Prisma + PostgreSQL** for the one piece of real state: enquiry / contact form submissions
- **Vitest + React Testing Library** for unit/component tests; **Playwright**
  for a small e2e smoke suite (nav, hotel page render, enquiry form submit).
  See "Testing" below.
- Deployed on **Vercel**; Postgres hosted separately (Neon/Supabase — see `PLAN.md`)
- Pages are statically generated (SSG) with **ISR** where content may change without a redeploy (e.g. an admin-curated "offers" banner, if added later). Everything else is plain SSG.

## Ground rules

- **Simplicity over cleverness.** This app is content + a few forms. Resist adding
  state managers, GraphQL layers, CMS integrations, or abstractions "for later."
  A hotel is a typed object in `content/hotels/*.ts`, not a database table, unless a
  concrete requirement says otherwise.
- **No comments explaining what code does.** Only comment non-obvious *why*.
- **All content lives in code** (`content/`), typed via a shared `Hotel`, `Page`, etc.
  interface in `content/types.ts`. Editing a hotel's copy means editing a `.ts` file
  and opening a PR — there is no admin CMS in this phase.
- **Images**: pulled once from the WP `uploads/` export into `public/images/` (or an
  image CDN if size becomes a problem), referenced via `next/image`. Don't hotlink
  the old WordPress site. The WP-era import pipeline (`content/hotels/convert-to-webp.js`)
  caps everything at 1600px wide / WebP quality 65 — fine for cards and thumbnails, but
  that's the real resolution ceiling for most properties' photos, and stretching one
  across a full-bleed hero (`sizes="100vw"`) forces the browser to upscale, which reads
  as soft/hazy on large screens. Only Gangtok (and Darjeeling's room shots) have true
  high-res (6048px) originals from a more recent shoot — check actual pixel dimensions
  with `sips -g pixelWidth` before assuming a "foggy" hero is a code bug rather than a
  source-asset limit. Every full-bleed hero `<Image>` (`journey-hero.tsx`,
  `hero-carousel.tsx`, `closing-cta.tsx`, and the two direct hero images on `/hotels`
  and `/meetings-events`) sets `quality={90}` (declared in `next.config.ts`'s
  `images.qualities`) so Next's own re-encode at serve time doesn't compound the
  source's existing compression loss — it can't add resolution that was never
  captured, only avoid making it worse. A `fill` image's *direct* parent div must have
  a `position` class (`relative`/`absolute`) — Next warns in the server log
  (`"has fill and parent element with invalid position"`) but doesn't fail the build,
  so this is easy to miss; it did creep into `journey-hero.tsx`/`hero-carousel.tsx`
  once already.
- **Forms write to Postgres via Prisma**, validated server-side (zod) before insert.
  Never trust client input. Rate-limit the enquiry endpoint.
- **Security**: this rebuild exists partly *because* the WordPress install was found
  compromised (a webshell backdoor was discovered and quarantined during migration
  research — see `PLAN.md` → Background). Treat all form input, all env vars, and all
  dependencies with real scrutiny. No secrets in the repo, ever — use `.env.local`
  (gitignored) and Vercel env vars in production. `next.config.ts` sets a real
  `Content-Security-Policy` plus the standard hardening headers (HSTS, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy) on every route — CSP is
  scoped to what the site actually uses (`'unsafe-inline'` for style because Radix/
  react-day-picker position via inline `style` attributes, `'unsafe-inline'` for script
  because the App Router streams RSC hydration via its own inline `<script>` tags, and
  `frame-src` limited to the Google Maps embed on hotel pages). If you add a new
  external embed, script, or fetch target, it needs an explicit CSP allowance or it'll
  be silently blocked — check the browser console for `Refused to ...` before assuming
  something else is broken. `lib/rate-limit.ts`'s `clientIp()` helper is the only
  correct way to key the enquiry endpoint's rate limiter — it prefers Vercel's
  platform-set `x-real-ip` and takes just the first hop of `x-forwarded-for`; keying on
  the raw header is a rate-limit bypass, since a client can vary it on every request.

## Design system

The site follows a "5-star heritage hotel" visual language (Taj/Lemon Tree/Oberoi
tier), established across the homepage, `/hotels`, hotel detail pages, `/weddings`,
and `/meetings-events`. New pages/components should match it, not reinvent it.

**Tokens** (`app/globals.css`, exposed as Tailwind utilities): `forest` (#16352a),
`forest-dark` (#0d2119), `gold` (#bd9455), `gold-light` (#dcc08a), `cream` (#faf7f1,
the body background), `ink` (#1c1c1a). `font-display` (Playfair Display) for all
headings, `font-sans`/Inter for body text. Two shared keyframe utilities:
`animate-hero-zoom` (slow 16s Ken Burns zoom on hero images) and `animate-fade-up`
(entrance fade for hero text).

**Hero pattern** (homepage, `/hotels`, `/weddings`, `/meetings-events`, hotel detail):
full-bleed image wrapped in `animate-hero-zoom`, a `bg-gradient-to-t from-forest-dark/95
via-forest-dark/50 to-forest-dark/15` overlay for contrast, eyebrow line in
`text-cream drop-shadow-md` (never `text-gold-light` on a photo — gold-on-gold-toned
images is illegible), and heading/CTA in an `animate-fade-up` block anchored to the
bottom. Do **not** add a second gradient layer to fade the hero into the page
background — a `from-cream` fade band stacked on top of the dark overlay produces a
muddy double-blend wherever anything (a floating stat card, etc.) overlaps it. The
homepage's single-image hero works because nothing overlaps its fade zone; on every
other page just end the hero on the dark overlay.

**Floating stat/booking card**: a white `rounded-xl shadow-2xl` card overlapping the
hero's bottom edge via negative margin (`-mt-8` to `-mt-10`), showing 3–4 computed
stats (room types, dining venues, event spaces — pull these from `content/hotels`
data, never hardcode a count). Leave a full section of plain background between this
card and the next tinted section (see `pt-16` on the Weddings editorial section) —
butting a tinted section directly against the card reads as a layout bug.

**Closing CTA band**: every page ends the same way — a ~36vh image band
(`animate-hero-zoom` + `bg-forest-dark/75` overlay), centered heading + one-line copy
+ a gold `Enquire Now` button linking to `/enquiry` (with `?property=slug` on hotel
pages). Don't embed `<EnquiryForm>` inline on marketing pages (Weddings, Meetings) —
redirect to `/enquiry` instead, consistent with every other closing CTA.

**Cards**: `HotelCard` (tall photography card, name/location/stats overlaid on the
image via gradient — kept compact, aspect `4/3.4`, not `4/5`, so several fit on
screen without zooming out), `VenueTable` (compact horizontal card: thumbnail + top-3
venues + link to the property), `EditorialRow` (`components/editorial-row.tsx` —
alternating image/text block, reused wherever a real photo needs a proper caption
treatment: Weddings, homepage's Cuisine section). All interactive cards get
`shadow-sm transition hover:shadow-lg` (or `-xl`/`-2xl` + a hover lift
`hover:-translate-y-1`) — never a bare `border` with no shadow.

**Form controls — do not use native `<select>` or `<input type="date">`.** Those
open OS-controlled popups that can't be restyled and look out of place next to
everything else. Use `components/ui/select.tsx` and `components/ui/date-picker.tsx`
(Radix Select / Popover + react-day-picker, fully themed) instead — see
`components/booking-widget.tsx` and `components/enquiry-form.tsx` for the pattern
(controlled state + a hidden `<input>` so the value still posts via native FormData
for the server action). The date picker drives its own month/year via controlled
`Select`s — never re-enable react-day-picker's built-in `captionLayout="dropdown"`
alongside custom `classNames`, it renders the month/year twice (once as its own
select, once as a plain-text caption).

**Scroll reveal**: `components/reveal.tsx` — a lightweight IntersectionObserver
fade-up, used sparingly on homepage section intros. Skip it on anything that sits
right below the fold (e.g. the stats strip right under the hero) — it reads as
broken/half-loaded rather than animated when there's no scroll distance to trigger it.

**Icons**: no icon library — small hand-drawn inline SVGs, one file per concern
(`components/service-icons.tsx` for wedding services, `components/amenity-icon.tsx`
with a keyword-matching `getAmenityIcon(label)` for the varied real amenity strings
across all 9 properties). Follow that pattern for new icon needs rather than adding
`lucide-react` or similar.

## SEO

- **The production domain is not live yet.** `sinclairshotels.com` still serves the
  old WordPress site — this rebuild is currently only reachable at
  `sinclairs-hotels.vercel.app`. No on-page SEO work here moves Google rankings for
  the real domain until it's actually cut over. That cutover (DNS change, 301
  redirects from the old WP URL structure to the new one so existing search equity
  transfers, and resubmitting the sitemap in Google Search Console) is a deliberate
  manual step the domain owner is holding until the site is fully built out
  end-to-end — don't treat a live `sinclairshotels.com` pointing here as a bug to fix.
- Every page's metadata should go through `pageMetadata()` in `lib/seo.ts` rather
  than a hand-rolled `Metadata` object — it fills in canonical URL, Open Graph, and
  Twitter Card consistently. `app/layout.tsx`'s root `metadata` covers the homepage
  (it has no metadata export of its own) and sets the site-wide OG/Twitter defaults.
- `app/sitemap.ts` / `app/robots.ts` (Next's native `MetadataRoute` file convention,
  no extra dependency) list every static page and hotel slug — add new top-level
  routes to `sitemap.ts`'s `staticPaths` array.
- `components/json-ld.tsx`'s `JsonLd` component renders schema.org structured data as
  a plain `<script>` child (not `dangerouslySetInnerHTML` — script/style are the only
  elements React lets you pass raw text children to). Root layout renders an
  `Organization` block; each hotel page renders `Hotel` + `BreadcrumbList`. Only ever
  pass it static, developer-authored data (content files, `siteConfig`) — never
  request input.
- Hotel page meta descriptions use `tagline + location`, not the full multi-paragraph
  `description` field — the latter is well past Google's ~160-character display
  limit and just gets truncated anyway.

## Testing

- Every content template component (hotel page, room card, nav dropdown) gets
  a Vitest + RTL render test — it renders with representative data, no crash,
  key content/links present.
- The enquiry form gets thorough coverage: valid submit, server-side
  validation rejects bad input (zod), spam-guard blocks bot submissions, DB
  row is created correctly (test against a real local Postgres, not a mock —
  Prisma's own type safety is not a substitute for testing the actual query).
- Playwright smoke suite covers the golden paths: home → hotel page → enquiry
  form submit end-to-end, nav dropdown works, 404s don't happen on any nav link.
- Run tests locally before every push: `pnpm test` (Vitest) and
  `pnpm test:e2e` (Playwright). CI (GitHub Actions) runs `pnpm lint`, `pnpm typecheck`,
  `pnpm test`, and `pnpm build`, in that order, on every PR and push to `main`.

## Commands

- `pnpm dev` — local dev server (http://localhost:3000)
- `pnpm build` / `pnpm start` — production build / serve
- `pnpm lint` / `pnpm lint:fix` — Biome check / check + write
- `pnpm typecheck` — `next typegen && tsc --noEmit`. The `next typegen` step is load-bearing,
  not decoration: Next's ambient route types (`LayoutProps`, `PageProps`) only exist once
  generated into `.next/types/`, normally by `next build`/`next dev`. CI runs typecheck
  before build on a fresh checkout with no `.next` dir, so plain `tsc --noEmit` failed
  with `Cannot find name 'LayoutProps'` on every CI run once `app/layout.tsx` started
  using it — worked locally only because a leftover `.next` from an earlier build
  masked it.
- `pnpm test` / `pnpm test:watch` — Vitest
- `pnpm test:e2e` — Playwright smoke suite
- `pnpm prisma:generate` / `pnpm prisma:migrate` — Prisma client / migrations

Run `pnpm typecheck && pnpm lint:fix && pnpm test` after any content or component
change, before considering it done — this is the standard verification loop used
throughout this project's history, not optional polish.

Deployed via `vercel deploy` (add `--prod` for production) from
`subham-5497`'s Vercel account, project `sinclairs-hotels` — live at
https://sinclairs-hotels.vercel.app. The GitHub repo (`subhamsncl/sinclairs-hotels`)
is not yet connected for auto-deploy-on-push (`vercel git connect` fails until the
Vercel account has a GitHub login connection — a one-time manual step in the Vercel
dashboard); until then, ship by running `vercel deploy` after pushing.

## Source content

Reference material was meant to live outside this repo, on the local machine only
(never commit it): `~/Desktop/sinclairs-wp-backup/` — the old WordPress files,
uploads, and a DB dump, used only as a one-time source to port real copy/images into
`content/`. **That path no longer exists on disk** (confirmed missing during this
session) — whatever hasn't already been imported into `public/images/` is gone from
this machine. For most properties, the WebP files already in `public/images/hotels/`
(1600px, see the Images note above) are the only surviving copies; there is no local
higher-resolution original to fall back to. If better source photos are needed, they
have to come from wherever the original shoot/export is backed up externally (the
photographer, an old server, cloud storage) — ask before assuming they're retrievable.
