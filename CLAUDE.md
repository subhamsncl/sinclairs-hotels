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

- **Next.js (App Router) + TypeScript**, strict mode on
- **Tailwind CSS** for styling
- **Prisma + PostgreSQL** for the one piece of real state: enquiry / contact form submissions
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

## Commands

Populated once the scaffold exists (see `PLAN.md` Phase 0). Expect the usual:
`npm run dev`, `npm run build`, `npm run lint`, `npx prisma migrate dev`.

## Source content

Reference material lives outside this repo, on the local machine only (never commit
it): `~/Desktop/sinclairs-wp-backup/` — the old WordPress files, uploads, and a DB
dump, used only as a one-time source to port real copy/images into `content/`.
