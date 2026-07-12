"use client";

import Image from "next/image";
import { useAssetUrl, useAssets } from "@/lib/asset-store";

// Renders a managed image for a given slot, or a warm placeholder while the
// slot is empty / still loading. Parent controls the box via className
// (aspect ratio, radius, etc.); the image covers it.

type Props = {
  slot: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  rounded?: string;
};

export function ManagedImage({
  slot,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  rounded = "rounded-panel",
}: Props) {
  const url = useAssetUrl(slot);
  const { ready } = useAssets();

  return (
    <div
      className={`relative overflow-hidden bg-paperDeep ${rounded} ${className}`}
    >
      {url ? (
        <Image
          src={url}
          alt={alt}
          fill
          unoptimized
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <Placeholder label={alt} ready={ready} />
      )}
    </div>
  );
}

function Placeholder({ label, ready }: { label: string; ready: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_30%_20%,#EAF3EF_0%,#EDF1F5_60%)] px-6 text-center">
      <span className="text-[0.62rem] font-body uppercase tracking-label text-clayDeep/70">
        {ready ? "Image slot" : "Loading"}
      </span>
      <span className="max-w-[22ch] font-display text-base leading-tight text-inkSoft/80">
        {label}
      </span>
    </div>
  );
}
