# Sinclairs Hotels — Next.js

Marketing website for Sinclairs Hotels & Resorts (Burdwan, Darjeeling, Dooars,
Gangtok, Kalimpong, Ooty, Port Blair, Siliguri, Udaipur), rebuilt in Next.js +
TypeScript. Replaces the previous WordPress + Elementor site.

## Stack

- Next.js (App Router), TypeScript (strict), Tailwind CSS
- pnpm, Biome (lint + format)
- Prisma + PostgreSQL (enquiry form submissions)
- Vitest + React Testing Library, Playwright (e2e smoke)
- Deployed on Vercel

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in DATABASE_URL and any secrets
pnpm prisma migrate dev
pnpm dev
```

Open http://localhost:3000.

## Project structure

```
app/                  routes (App Router)
components/           shared UI components
content/              typed site content (hotels, pages copy) — the "CMS"
lib/                  server-side helpers (db client, validation, email)
prisma/               schema + migrations
public/images/        hotel photography, exported once from the old WP site
```

## Scripts

- `pnpm dev` — local dev server
- `pnpm build` / `pnpm start` — production build
- `pnpm lint` — Biome check
- `pnpm test` — Vitest unit/component tests
- `pnpm test:e2e` — Playwright smoke suite
- `pnpm prisma studio` — inspect the enquiries table locally

See `PLAN.md` for the full migration/execution plan and `CLAUDE.md` for
project conventions.
