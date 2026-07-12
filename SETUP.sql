-- ============================================================================
-- BB Medical — full Supabase setup
-- Paste this whole file into the Supabase SQL Editor and run it.
-- It is idempotent: safe to run again after edits (drops-then-creates every
-- policy/trigger, upserts the storage bucket).
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Tables
-- ---------------------------------------------------------------------------

-- Contact messages from the Visit Us page
create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text,
  reason      text,
  message     text not null,
  status      text not null default 'new'
              check (status in ('new','read','replied','archived'))
);

-- Quote requests (from catalog + contact page)
create table if not exists public.quote_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text,
  product     text,
  details     text,
  status      text not null default 'new'
              check (status in ('new','read','replied','archived'))
);

-- Newsletter signups (footer)
create table if not exists public.newsletter_signups (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null unique,
  source      text
);

-- Key/value settings — stores image slot -> storage object path
-- (keys look like 'image:hero', 'image:logo', 'image:product-transit-lite', …)
create table if not exists public.site_settings (
  key         text primary key,
  value       text,
  updated_at  timestamptz not null default now()
);

-- keep site_settings.updated_at fresh
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_settings_touch on public.site_settings;
create trigger trg_site_settings_touch
  before update on public.site_settings
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- 2. Row Level Security
-- ---------------------------------------------------------------------------
alter table public.inquiries          enable row level security;
alter table public.quote_requests     enable row level security;
alter table public.newsletter_signups enable row level security;
alter table public.site_settings      enable row level security;

-- Public visitors (anon) may submit forms --------------------------------------
drop policy if exists "anon insert inquiries" on public.inquiries;
create policy "anon insert inquiries"
  on public.inquiries for insert to anon with check (true);

drop policy if exists "anon insert quotes" on public.quote_requests;
create policy "anon insert quotes"
  on public.quote_requests for insert to anon with check (true);

drop policy if exists "anon insert newsletter" on public.newsletter_signups;
create policy "anon insert newsletter"
  on public.newsletter_signups for insert to anon with check (true);

-- Image slot values must be readable by every visitor so the public site can
-- render managed images.
drop policy if exists "anon read settings" on public.site_settings;
create policy "anon read settings"
  on public.site_settings for select to anon using (true);

-- NOTE ON THE ADMIN CONSOLE:
-- The /console area is a client-side password gate that uses the same anon key
-- (there is no Supabase Auth in this simple build). For the Submissions inbox
-- and Image manager to function, anon must be able to read/update submissions
-- and manage settings. The policies below grant that. If you need to lock this
-- down, add Supabase Auth and scope these policies to authenticated users.

drop policy if exists "console read inquiries" on public.inquiries;
create policy "console read inquiries"
  on public.inquiries for select to anon using (true);

drop policy if exists "console update inquiries" on public.inquiries;
create policy "console update inquiries"
  on public.inquiries for update to anon using (true) with check (true);

drop policy if exists "console read quotes" on public.quote_requests;
create policy "console read quotes"
  on public.quote_requests for select to anon using (true);

drop policy if exists "console update quotes" on public.quote_requests;
create policy "console update quotes"
  on public.quote_requests for update to anon using (true) with check (true);

drop policy if exists "console write settings" on public.site_settings;
create policy "console write settings"
  on public.site_settings for insert to anon with check (true);

drop policy if exists "console update settings" on public.site_settings;
create policy "console update settings"
  on public.site_settings for update to anon using (true) with check (true);

drop policy if exists "console delete settings" on public.site_settings;
create policy "console delete settings"
  on public.site_settings for delete to anon using (true);

-- ---------------------------------------------------------------------------
-- 3. Storage bucket for site images
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media-assets',
  'media-assets',
  true,
  5242880, -- 5 MB
  array['image/png','image/jpeg','image/jpg','image/webp','image/gif','image/svg+xml']
)
on conflict (id) do update set
  public             = excluded.public,
  file_size_limit    = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Storage policies: public read, anon manage (client-side console) -------------
drop policy if exists "media public read" on storage.objects;
create policy "media public read"
  on storage.objects for select
  using (bucket_id = 'media-assets');

drop policy if exists "media anon insert" on storage.objects;
create policy "media anon insert"
  on storage.objects for insert to anon
  with check (bucket_id = 'media-assets');

drop policy if exists "media anon update" on storage.objects;
create policy "media anon update"
  on storage.objects for update to anon
  using (bucket_id = 'media-assets')
  with check (bucket_id = 'media-assets');

drop policy if exists "media anon delete" on storage.objects;
create policy "media anon delete"
  on storage.objects for delete to anon
  using (bucket_id = 'media-assets');

-- Done. --------------------------------------------------------------------
