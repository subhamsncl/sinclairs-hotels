# Sinclairs Hotels — Next.js

Marketing website for Sinclairs Hotels & Resorts (Burdwan, Darjeeling, Dooars,
Gangtok, Kalimpong, Ooty, Port Blair, Siliguri, Udaipur), rebuilt in Next.js +
TypeScript. Replaces the previous WordPress + Elementor site.

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- Prisma + PostgreSQL (enquiry form submissions)
- Deployed on Vercel

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL and any secrets
npx prisma migrate dev
npm run dev
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

- `npm run dev` — local dev server
- `npm run build` / `npm start` — production build
- `npm run lint` — ESLint
- `npx prisma studio` — inspect the enquiries table locally

See `PLAN.md` for the full migration/execution plan and `CLAUDE.md` for
project conventions.
