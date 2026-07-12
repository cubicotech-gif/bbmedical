"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getClient, publicAssetUrl } from "./supabase";
import { settingKey } from "./slots";

// Loads all `image:<slot>` rows from site_settings once, resolves each stored
// object path to a public CDN URL, and hands the map to any component that
// needs a managed image. All client-side so pages stay statically served.

type AssetMap = Record<string, string>; // slot -> public url

type StoreValue = {
  ready: boolean;
  urls: AssetMap;
  refresh: () => Promise<void>;
};

const AssetContext = createContext<StoreValue>({
  ready: false,
  urls: {},
  refresh: async () => {},
});

export function AssetProvider({ children }: { children: ReactNode }) {
  const [urls, setUrls] = useState<AssetMap>({});
  const [ready, setReady] = useState(false);

  const refresh = useMemo(
    () => async () => {
      const client = getClient();
      if (!client) {
        setReady(true);
        return;
      }
      try {
        const { data, error } = await client
          .from("site_settings")
          .select("key,value")
          .like("key", "image:%");
        if (error) return;
        const next: AssetMap = {};
        for (const row of data ?? []) {
          const key = String(row.key);
          const path = String(row.value ?? "");
          if (!key.startsWith("image:") || !path) continue;
          const slot = key.slice("image:".length);
          const url = publicAssetUrl(path);
          if (url) next[slot] = url;
        }
        setUrls(next);
      } catch {
        // network / config error — leave placeholders, don't hang
      } finally {
        setReady(true);
      }
    },
    [],
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <AssetContext.Provider value={{ ready, urls, refresh }}>
      {children}
    </AssetContext.Provider>
  );
}

export function useAssets() {
  return useContext(AssetContext);
}

export function useAssetUrl(slot: string): string | null {
  const { urls } = useAssets();
  return urls[slot] ?? null;
}

export { settingKey };
