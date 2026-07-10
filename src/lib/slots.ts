// Every managed image "slot" on the site. The console renders one uploader per
// slot; pages read the current object path for a slot from the site_settings
// table (key = `image:<slot>`). Keep product slots in sync with lib/catalog.ts.

import { catalog } from "./catalog";

export type SlotDef = {
  key: string;
  label: string;
  group: string;
  dimensions: string;
  hint?: string;
};

const brandSlots: SlotDef[] = [
  {
    key: "logo",
    label: "Wordmark / Logo",
    group: "Brand",
    dimensions: "480 × 160 (transparent PNG or SVG)",
    hint: "Shown in the header and footer.",
  },
  {
    key: "favicon",
    label: "Favicon",
    group: "Brand",
    dimensions: "512 × 512 (square PNG)",
    hint: "Browser tab icon.",
  },
  {
    key: "hero",
    label: "Home Hero",
    group: "Home",
    dimensions: "1600 × 1200 (4:3, warm/natural light)",
    hint: "Large image on the homepage hero.",
  },
  {
    key: "why-us",
    label: "Why BB Medical",
    group: "Home",
    dimensions: "1200 × 1200 (square)",
    hint: "Accompanies the reasons-to-choose section.",
  },
  {
    key: "about",
    label: "Our Story",
    group: "About",
    dimensions: "1400 × 1050 (4:3)",
    hint: "Feature image on the About page.",
  },
];

const productSlots: SlotDef[] = catalog.flatMap((cat) =>
  cat.products.map((p) => ({
    key: p.slot,
    label: p.name,
    group: `Catalog · ${cat.name}`,
    dimensions: "1000 × 1000 (square, on paper background)",
  })),
);

export const slots: SlotDef[] = [...brandSlots, ...productSlots];

export function settingKey(slot: string): string {
  return `image:${slot}`;
}
