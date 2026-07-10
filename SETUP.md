# BB Medical — Setup & Deploy

Four steps to a live site. Budget ~15 minutes.

---

## 1. Create the Supabase backend

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor → New query**.
3. Paste the entire contents of [`SETUP.sql`](./SETUP.sql) and click **Run**.

That single script creates every table, the `media-assets` storage bucket
(public, 5 MB, images only), and all row-level-security + storage policies.
It's idempotent — re-run it any time you change it.

You now have four tables:

| Table                | Purpose                                   |
| -------------------- | ----------------------------------------- |
| `inquiries`          | Contact-form messages                     |
| `quote_requests`     | Quote requests from catalog / contact     |
| `newsletter_signups` | Footer email signups                      |
| `site_settings`      | Key/value store — maps image slots → files |

Grab your API keys from **Project Settings → API**: the **Project URL** and
the **anon public** key.

---

## 2. Set environment variables in Vercel

Import the repo into Vercel, then under **Settings → Environment Variables**
add these four (see [`.env.example`](./.env.example)):

| Variable                   | Value                                            |
| -------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SB_URL`       | Supabase Project URL                             |
| `NEXT_PUBLIC_SB_ANON_KEY`  | Supabase anon public key                         |
| `NEXT_PUBLIC_CONSOLE_KEY`  | A passphrase to unlock `/console`                |
| `NEXT_PUBLIC_SITE_ORIGIN`  | `https://your-domain.com` (used for OG / sitemap) |

> All keys are `NEXT_PUBLIC_*` on purpose — the site talks to Supabase
> entirely from the browser, so no server functions run per request and the
> whole site stays on the Vercel free tier.

---

## 3. Redeploy

Trigger a redeploy so the environment variables are baked in. Every route
builds as **Static** — confirm in the build log that all routes show `○`.

---

## 4. Upload your images

Open **`https://your-domain.com/console`** and enter the passphrase you set in
`NEXT_PUBLIC_CONSOLE_KEY`. Use the **Images** tab to upload each slot. Empty
slots show a warm placeholder until filled.

### Image slots & recommended sizes

**Brand**
| Slot      | Recommended size                      |
| --------- | ------------------------------------- |
| Logo      | 480 × 160 — transparent PNG or SVG    |
| Favicon   | 512 × 512 — square PNG                |

**Home**
| Slot     | Recommended size            |
| -------- | --------------------------- |
| Hero     | 1600 × 1200 (4:3)           |
| Why-Us   | 1200 × 1200 (square)        |

**About**
| Slot     | Recommended size            |
| -------- | --------------------------- |
| Our Story | 1400 × 1050 (4:3)          |

**Catalog** — one square (1000 × 1000) image per product:
- Alder Transit Lite, Meadow Daily Cruiser (Wheelchairs)
- Harbor Four-Wheel Rollator, Birch Offset Cane (Mobility Aids)
- ClearRead Glucose Kit, Cloudstep Diabetic Socks (Diabetic Care)
- Ridgeline Knee Stabilizer, Willow Wrist Brace (Orthopedic Braces)

The **Submissions** tab shows contact messages and quote requests with a
`new → read → replied → archived` workflow.

---

## Local development

```bash
cp .env.example .env.local   # fill in your keys
npm install
npm run dev                  # http://localhost:3000
```

## A note on security

The `/console` gate is a **client-side passphrase** — good enough to keep the
management UI out of casual sight, but it is not real authentication. Because
the admin tools use the public anon key, the RLS policies in `SETUP.sql` allow
anon reads/updates of submissions. If you need hardened access control, add
[Supabase Auth](https://supabase.com/docs/guides/auth) and scope the console
policies to authenticated users.
