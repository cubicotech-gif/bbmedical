"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { brand, nav } from "@/lib/config";
import { useAssetUrl } from "@/lib/asset-store";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const logo = useAssetUrl("logo");
  const ticking = useRef(false);

  // Attach the scroll listener once via a ref guard — no state in deps.
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        setCondensed(window.scrollY > 12);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        condensed
          ? "border-line bg-paper/90 backdrop-blur-md"
          : "border-transparent bg-paper"
      }`}
    >
      <div className="frame flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label={brand.name}>
          {logo ? (
            <span className="relative block h-8 w-[150px]">
              <Image
                src={logo}
                alt={brand.name}
                fill
                unoptimized
                className="object-contain object-left"
              />
            </span>
          ) : (
            <Wordmark />
          )}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative font-body text-sm font-medium text-inkSoft transition hover:text-ink"
            >
              {item.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-clay transition-all duration-300 ${
                  isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={brand.phoneHref}
            className="hidden items-center gap-2 font-body text-sm font-medium text-ink lg:inline-flex"
          >
            <Phone className="h-4 w-4 text-clay" strokeWidth={2} />
            {brand.phone}
          </a>
          <Link href="/contact" className="btn-clay hidden sm:inline-flex">
            Request a quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-note border border-line text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <nav className="frame flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-note px-3 py-3 font-body text-base font-medium transition ${
                  isActive(item.href)
                    ? "bg-clayWash text-clayDeep"
                    : "text-inkSoft hover:bg-paperDeep"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-clay mt-2 w-full">
              Request a quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Wordmark() {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="font-display text-2xl font-semibold tracking-tight text-ink">
        BB
      </span>
      <span className="font-body text-base font-semibold uppercase tracking-label text-clay">
        Medical
      </span>
    </span>
  );
}
