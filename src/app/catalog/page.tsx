import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { ManagedImage } from "@/components/managed-image";
import { Reveal } from "@/components/reveal";
import { catalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Wheelchairs, mobility aids, diabetic care, and orthopedic braces — a short, carefully chosen catalog from BB Medical.",
};

export default function CatalogPage() {
  return (
    <>
      <section className="frame pb-10 pt-14 md:pt-20">
        <span className="overline">The catalog</span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          A shorter list, so every item earns its place.
        </h1>
        <p className="mt-5 max-w-reading font-body text-lg text-inkSoft">
          We don't try to stock everything. These are the pieces we trust across
          four everyday needs — each one we'd recommend to family.
        </p>

        <nav className="mt-8 flex flex-wrap gap-2">
          {catalog.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-pillish border border-line bg-shell px-4 py-2 font-body text-sm font-medium text-inkSoft transition hover:border-clay hover:text-clay"
            >
              {c.name}
            </a>
          ))}
        </nav>
      </section>

      {catalog.map((cat, ci) => (
        <section
          key={cat.id}
          id={cat.id}
          className={`scroll-mt-24 border-t border-line ${
            ci % 2 === 1 ? "bg-paperDeep/40" : ""
          }`}
        >
          <div className="frame py-16 md:py-20">
            <div className="mb-10 max-w-2xl">
              <p className="font-body text-xs uppercase tracking-label text-clay">
                {cat.kicker}
              </p>
              <h2 className="section-title mt-2">{cat.name}</h2>
              <p className="mt-3 font-body text-inkSoft">{cat.intro}</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {cat.products.map((p, pi) => (
                <Reveal key={p.id} delay={pi * 0.08}>
                  <article className="paper-card flex h-full flex-col gap-6 sm:flex-row">
                    <ManagedImage
                      slot={p.slot}
                      alt={p.name}
                      className="aspect-square w-full shrink-0 sm:w-40"
                      rounded="rounded-note"
                      sizes="(max-width: 640px) 100vw, 160px"
                    />
                    <div className="flex flex-1 flex-col">
                      <h3 className="font-display text-xl text-ink">{p.name}</h3>
                      <p className="mt-2 font-body text-sm leading-relaxed text-inkSoft">
                        {p.blurb}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {p.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 font-body text-sm text-inkSoft"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/contact?product=${encodeURIComponent(
                          p.name,
                        )}#quote`}
                        className="group mt-5 inline-flex items-center gap-1.5 self-start font-body text-sm font-semibold text-clay"
                      >
                        Request a quote
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="frame py-16 text-center md:py-20">
        <h2 className="section-title">Don't see it? We can still source it.</h2>
        <p className="mx-auto mt-3 max-w-reading font-body text-inkSoft">
          Our shelves are short by design, but our supplier network isn't. Tell
          us what you're after and we'll track it down.
        </p>
        <Link href="/contact#quote" className="btn-clay mt-7">
          Ask us to find it
        </Link>
      </section>
    </>
  );
}
