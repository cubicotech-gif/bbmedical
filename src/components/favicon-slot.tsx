"use client";

import { useEffect } from "react";
import { useAssetUrl } from "@/lib/asset-store";

// Swaps the browser-tab icon to the uploaded favicon slot, once resolved.
export function FaviconSlot() {
  const url = useAssetUrl("favicon");

  useEffect(() => {
    if (!url) return;
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = url;
  }, [url]);

  return null;
}
