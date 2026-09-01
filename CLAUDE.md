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
  the old WordPress site.
- **Forms write to Postgres via Prisma**, validated server-side (zod) before insert.
  Never trust client input. Rate-limit the enquiry endpoint.
- **Security**: this rebuild exists partly *because* the WordPress install was found
  compromised (a webshell backdoor was discovered and quarantined during migration
  research — see `PLAN.md` → Background). Treat all form input, all env vars, and all
  dependencies with real scrutiny. No secrets in the repo, ever — use `.env.local`
  (gitignored) and Vercel env vars in production.

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
  `pnpm test:e2e` (Playwright). CI (GitHub Actions) runs both plus `pnpm lint`
  and `pnpm build` on every PR.

## Commands

Populated once the scaffold exists (see `PLAN.md` Phase 0). Expect the usual:
`pnpm dev`, `pnpm build`, `pnpm lint` (Biome), `pnpm test` (Vitest),
`pnpm test:e2e` (Playwright), `pnpm prisma migrate dev`.

## Source content

Reference material lives outside this repo, on the local machine only (never commit
it): `~/Desktop/sinclairs-wp-backup/` — the old WordPress files, uploads, and a DB
dump, used only as a one-time source to port real copy/images into `content/`.
