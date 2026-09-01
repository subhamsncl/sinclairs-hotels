# Execution Plan — WordPress → Next.js Rebuild

## Background

The current live site (sinclairshotels.com) runs WordPress + Elementor +
MotoPress Hotel Booking, self-hosted. During migration research a local Docker
copy of the production codebase (`sinclairs-wpcm`) was found to contain a
planted backdoor in `wp-content/cache/` — a fake `wp-config.php` that pulls and
executes remote PHP, plus a Perl webshell. It was quarantined locally
(`~/Desktop/sinclairs-wp-backup/QUARANTINE_backdoors/`), but **the live host
still needs credential rotation and a server-side scan** — that's outside what
this repo or Claude Code can do. This rebuild also removes WordPress as an
attack surface going forward.

Decisions already made (2026-09-01):
- Content is fully static in Next.js — no headless WordPress at runtime.
- DB: PostgreSQL + Prisma, for enquiry/lead submissions only.
- Hosting: Vercel.
- Scope: full site (Home, Hotels listing + per-property pages, Meetings,
  Weddings, Enquiry form, Contact), matching the current nav.
- Repo: `github.com/subhamsncl/sinclairs-hotels` (public).

## Phases

### Phase 0 — Scaffold (foundation, do first, sequential)
- `create-next-app` with TypeScript (strict), App Router, Tailwind, pnpm
- Swap ESLint/Prettier for **Biome** (`biome.json`); wire `pnpm lint`
- Prisma init, `Enquiry` model, local Postgres via Docker Compose for dev
- Test tooling: Vitest + React Testing Library configured, Playwright
  installed with one smoke test as a template
- GitHub Actions CI: lint, unit tests, build on every push/PR
- Base layout: nav (with Hotels dropdown), footer, design tokens (colors,
  type scale) matching Sinclairs' brand (deep green + gold accent, serif
  display type — see current site screenshots)
- `content/types.ts`: `Hotel`, `HotelPage`, `NavItem` interfaces
- Deploy an empty shell to Vercel early, to de-risk hosting/env setup

### Phase 1 — Content extraction (can run in parallel once Phase 0 lands)
- Pull copy + structure from the WP export
  (`~/Desktop/sinclairs-wp-backup/WPCM`, `public_html` as fallback for older
  copy) for: Home, About, each of the 9 properties, Meetings & Events,
  Weddings, Contact
- Export/optimize images from `wp-content/uploads` into `public/images/`
  (re-encode/resize — do not ship the WP originals as-is)
- Write content into typed `content/hotels/*.ts` files

### Phase 2 — Pages (parallelizable across properties once content model is fixed)
- Home page (hero, featured properties, awards, Instagram-style gallery —
  simplified, no third-party embed dependency unless requested)
- Hotels listing page + dropdown nav + 9 individual property pages
  (rooms, dining, facilities, gallery, sightseeing — reuse one template
  component, not 9 bespoke pages)
- Meetings & Events, Weddings — content pages with enquiry CTA
- Contact page

### Phase 3 — Enquiry system
- Prisma `Enquiry` model (name, email, phone, property, dates, message,
  createdAt, status)
- Server action / API route: zod validation, rate limiting, honeypot or
  equivalent spam guard, Prisma insert
- Email notification on submission (transactional email provider — TBD, ask
  before adding a paid dependency)
- Confirmation UI state (success/error), no page reload required

### Phase 4 — Polish & launch readiness
- Accessibility pass (landmarks, alt text, focus states, color contrast)
- SEO: metadata API per page, sitemap.xml, robots.txt, OpenGraph images
- Performance: image optimization, Lighthouse pass, ISR where useful
- Security review: headers (CSP, HSTS via Vercel), dependency audit,
  form abuse protection
- Cross-browser/responsive check in Chrome via claude-in-chrome

## Working agreement

- Commit early and often to `main` (or short-lived branches) on the public
  repo, small reviewable chunks — not one giant PR at the end.
- Each phase's pages get a real visual check (dev server + browser
  screenshot) before being marked done — not just "it compiles."
- Ask before adding any paid/third-party service (email provider, image CDN,
  analytics).
