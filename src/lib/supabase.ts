"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// A single browser client, created lazily so that a missing env var during
// build (static prerender) never throws — pages that need data call this at
// runtime in the browser.

let cached: SupabaseClient | null = null;

export const MEDIA_BUCKET = "media-assets";

export function sbConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SB_URL && process.env.NEXT_PUBLIC_SB_ANON_KEY,
  );
}

export function getClient(): SupabaseClient | null {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SB_URL;
  const key = process.env.NEXT_PUBLIC_SB_ANON_KEY;
  if (!url || !key) return null;
  cached = createClient(url, key, {
    auth: { persistSession: false },
  });
  return cached;
}

// Public URL for an object living in the media bucket.
export function publicAssetUrl(path: string): string | null {
  const client = getClient();
  if (!client) return null;
  const { data } = client.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return data.publicUrl ?? null;
}
