# BB Medical

Marketing site + lightweight content console for a family-run medical-equipment
supplier. Clean, clinical design, statically served, backed by Supabase.

## What's inside

- **Home / Catalog / Our Story / Visit Us** — four public pages, fully static.
- **`/console`** — passphrase-gated admin with an **Image manager** (upload,
  replace, delete every site image by slot) and a **Submissions inbox**
  (messages + quote requests with a status workflow).
- **Supabase** — Postgres tables for inquiries, quote requests, newsletter
  signups, and a settings KV; a public storage bucket for images.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
lucide-react · Supabase (Postgres + Storage). Fonts: Fraunces + Hanken Grotesk.

## Running it

```bash
cp .env.example .env.local   # add your Supabase + console keys
npm install
npm run dev
```

Full backend + deploy instructions live in **[SETUP.md](./SETUP.md)**.

## How it stays cheap

- `images.unoptimized` is on — images stream straight from Supabase's CDN, so
  Vercel Image Optimization is never invoked.
- Every route prerenders to static HTML; all data access happens client-side
  with the Supabase anon key, so no per-request serverless functions run.
- Security headers and `poweredByHeader: false` are set in `next.config.mjs`.

## Project layout

```
src/
  app/            route segments (home, catalog, about, contact, console)
  components/     header, footer, forms, managed image, console tools
  lib/            brand config, catalog data, image slots, supabase client,
                  asset store (image-slot resolver)
SETUP.sql         one-paste Supabase schema + policies + bucket
SETUP.md          step-by-step deploy guide
```
