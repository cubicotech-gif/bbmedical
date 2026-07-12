"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, Trash2, RefreshCw, Loader2, ImageOff } from "lucide-react";
import { getClient, MEDIA_BUCKET, publicAssetUrl } from "@/lib/supabase";
import { slots, settingKey, type SlotDef } from "@/lib/slots";
import { useAssets } from "@/lib/asset-store";

type PathMap = Record<string, string>; // slot -> object path

export function ImageManager() {
  const { refresh } = useAssets();
  const [paths, setPaths] = useState<PathMap>({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const load = useCallback(async () => {
    const client = getClient();
    if (!client) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await client
        .from("site_settings")
        .select("key,value")
        .like("key", "image:%");
      if (error) {
        setLoadError(error.message);
        return;
      }
      const next: PathMap = {};
      for (const row of data ?? []) {
        const key = String(row.key);
        const val = String(row.value ?? "");
        if (key.startsWith("image:") && val) next[key.slice(6)] = val;
      }
      setPaths(next);
      setLoadError("");
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : "Could not reach Supabase.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function afterChange() {
    await load();
    await refresh();
  }

  // group slots by their `group` field
  const groups = slots.reduce<Record<string, SlotDef[]>>((acc, s) => {
    (acc[s.group] ??= []).push(s);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-12 font-body text-sm text-muted">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading image slots…
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {loadError && (
        <div className="rounded-note border border-clay/40 bg-clayWash/50 p-4 font-body text-sm text-clayDeep">
          Couldn&apos;t load saved images: {loadError}. Check your Supabase keys
          and that <code className="font-mono text-xs">SETUP.sql</code> has been
          run.
        </div>
      )}
      {Object.entries(groups).map(([group, groupSlots]) => (
        <div key={group}>
          <h3 className="mb-4 font-body text-xs font-semibold uppercase tracking-label text-muted">
            {group}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groupSlots.map((slot) => (
              <SlotCard
                key={slot.key}
                slot={slot}
                path={paths[slot.key]}
                onChange={afterChange}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SlotCard({
  slot,
  path,
  onChange,
}: {
  slot: SlotDef;
  path?: string;
  onChange: () => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const url = path ? publicAssetUrl(path) : null;

  async function handleFile(file: File) {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }
    const client = getClient();
    if (!client) {
      setError("Storage is not configured.");
      return;
    }
    setBusy(true);
    const ext = (file.name.split(".").pop() || "png").toLowerCase();
    const objectPath = `${slot.key}/${Date.now()}.${ext}`;

    try {
      const up = await client.storage
        .from(MEDIA_BUCKET)
        .upload(objectPath, file, { cacheControl: "3600", upsert: true });
      if (up.error) {
        setError(up.error.message);
        return;
      }

      const save = await client
        .from("site_settings")
        .upsert(
          { key: settingKey(slot.key), value: objectPath },
          { onConflict: "key" },
        );
      if (save.error) {
        setError(save.error.message);
        return;
      }

      // Remove the previous object if it was different.
      if (path && path !== objectPath) {
        await client.storage.from(MEDIA_BUCKET).remove([path]);
      }
      await onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    const client = getClient();
    if (!client || !path) return;
    setBusy(true);
    try {
      await client.storage.from(MEDIA_BUCKET).remove([path]);
      await client
        .from("site_settings")
        .delete()
        .eq("key", settingKey(slot.key));
      await onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-panel border border-line bg-shell p-4">
      <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-note bg-paperDeep">
        {url ? (
          <Image
            src={url}
            alt={slot.label}
            fill
            unoptimized
            sizes="240px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted">
            <ImageOff className="h-5 w-5" />
            <span className="font-body text-xs">Empty</span>
          </div>
        )}
        {busy && (
          <div className="absolute inset-0 flex items-center justify-center bg-shell/70">
            <Loader2 className="h-5 w-5 animate-spin text-clay" />
          </div>
        )}
      </div>

      <p className="font-display text-base text-ink">{slot.label}</p>
      <p className="mt-0.5 font-body text-xs text-muted">{slot.dimensions}</p>
      {slot.hint && (
        <p className="mt-1 font-body text-xs text-muted/80">{slot.hint}</p>
      )}
      {error && <p className="mt-2 font-body text-xs text-clayDeep">{error}</p>}

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-note bg-clay px-3 py-2 font-body text-xs font-semibold text-shell transition hover:bg-clayDeep disabled:opacity-60"
        >
          {path ? (
            <>
              <RefreshCw className="h-3.5 w-3.5" /> Replace
            </>
          ) : (
            <>
              <UploadCloud className="h-3.5 w-3.5" /> Upload
            </>
          )}
        </button>
        {path && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="inline-flex items-center justify-center rounded-note border border-line px-3 py-2 text-inkSoft transition hover:border-clayDeep hover:text-clayDeep disabled:opacity-60"
            aria-label="Delete image"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
