"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { brand, fullAddress, nav } from "@/lib/config";
import { NewsletterForm } from "@/components/newsletter-form";

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="mt-24 border-t border-line bg-shell">
      <div className="frame grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <span className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-semibold text-ink">BB</span>
            <span className="font-body text-base font-semibold uppercase tracking-label text-clay">
              Medical
            </span>
          </span>
          <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-inkSoft">
            {brand.descriptor}
          </p>
          <div className="mt-6 space-y-2 font-body text-sm text-inkSoft">
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
              {fullAddress}
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-clay" />
              <a href={brand.phoneHref} className="hover:text-ink">
                {brand.phone}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-clay" />
              <a href={`mailto:${brand.email}`} className="hover:text-ink">
                {brand.email}
              </a>
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-label text-muted">
            Explore
          </h4>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-sm text-inkSoft transition hover:text-clay"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <h4 className="mt-8 flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-label text-muted">
            <Clock className="h-3.5 w-3.5" /> Hours
          </h4>
          <ul className="mt-3 space-y-1.5">
            {brand.hours.map((h) => (
              <li
                key={h.days}
                className="flex justify-between gap-4 font-body text-sm text-inkSoft"
              >
                <span>{h.days}</span>
                <span className="text-muted">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-label text-muted">
            Care notes, now and then
          </h4>
          <p className="mt-4 font-body text-sm leading-relaxed text-inkSoft">
            A short, occasional note on new equipment and home-care tips. No noise.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="frame flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="font-body text-xs text-muted">
            © {year} {brand.legalName}. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted">
            Serving {brand.address.city} and the greater North Bay.
          </p>
        </div>
      </div>
    </footer>
  );
}
