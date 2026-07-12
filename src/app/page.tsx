import Link from "next/link";
import {
  ArrowUpRight,
  HeartHandshake,
  ShieldCheck,
  Truck,
  Sparkles,
  Leaf,
} from "lucide-react";
import { ManagedImage } from "@/components/managed-image";
import { Reveal } from "@/components/reveal";
import { catalog } from "@/lib/catalog";
import { brand } from "@/lib/config";

const stats = [
  { value: "18 yrs", label: "Serving the North Bay" },
  { value: "2,400+", label: "Households equipped" },
  { value: "Same wk", label: "Local delivery & setup" },
  { value: "1:1", label: "Fitting consultations" },
];

const reasons = [
  {
    icon: HeartHandshake,
    title: "Chosen by people who use it",
    body: "Every item on our shelves is one we'd hand to our own family. We test, we return what disappoints, we keep what lasts.",
  },
  {
    icon: Truck,
    title: "Delivered and set up",
    body: "We bring equipment to your door, assemble it, and make sure it fits the person and the room before we leave.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance, sorted",
    body: "We handle the paperwork with most major providers and Medicare, and tell you the real out-of-pocket up front.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — split screen */}
      <section className="frame grid items-center gap-10 pb-16 pt-12 md:grid-cols-[1.05fr_0.95fr] md:gap-14 md:pb-24 md:pt-20">
        <div className="animate-rise">
          <span className="overline">
            <Leaf className="h-3.5 w-3.5" /> {brand.address.city}, California
          </span>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.05] text-ink sm:text-6xl">
            Care equipment,
            <br />
            <span className="italic text-clay">thoughtfully</span> sourced.
          </h1>
          <p className="mt-6 max-w-reading font-body text-lg leading-relaxed text-inkSoft">
            BB Medical is a family-run supplier of home and clinical care
            equipment. We stock less, choose better, and stay close after the
            sale — so the gear fades into the background and life comes forward.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact#quote" className="btn-clay">
              Request a quote
            </Link>
            <Link href="/catalog" className="btn-outline">
              Browse the catalog
            </Link>
          </div>
        </div>

        <Reveal className="relative" y={24}>
          <ManagedImage
            slot="hero"
            alt="A calm, well-lit home care setting"
            priority
            className="aspect-[4/5] w-full"
            rounded="rounded-[2rem]"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          <div className="absolute -bottom-5 -left-5 hidden rounded-panel border border-line bg-shell px-5 py-4 shadow-lift sm:block">
            <p className="font-body text-xs uppercase tracking-label text-muted">
              Free local
            </p>
            <p className="font-display text-xl text-ink">Delivery & fitting</p>
          </div>
        </Reveal>
      </section>

      {/* Stats band */}
      <section className="border-y border-line bg-shell">
        <div className="frame grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl text-clay sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1 font-body text-sm text-inkSoft">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="frame grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <Reveal className="order-2 md:order-1">
          <span className="overline">
            <Sparkles className="h-3.5 w-3.5" /> Why BB Medical
          </span>
          <h2 className="section-title mt-4">
            A supplier that behaves like a neighbor.
          </h2>
          <p className="mt-4 max-w-reading font-body text-inkSoft">
            The big catalogs sell you a box. We'd rather sell you the right thing
            and stand behind it. Here's what that looks like in practice.
          </p>
          <div className="mt-8 space-y-6">
            {reasons.map((r) => (
              <div key={r.title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-note bg-clayWash text-clayDeep">
                  <r.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink">{r.title}</h3>
                  <p className="mt-1 font-body text-sm leading-relaxed text-inkSoft">
                    {r.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="order-1 md:order-2" delay={0.1}>
          <ManagedImage
            slot="why-us"
            alt="A BB Medical specialist fitting equipment"
            className="aspect-square w-full"
            rounded="rounded-[2rem]"
          />
        </Reveal>
      </section>

      {/* Category overview */}
      <section className="border-t border-line bg-paperDeep/40">
        <div className="frame py-20 md:py-28">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="overline">What we carry</span>
              <h2 className="section-title mt-4 max-w-xl">
                Four shelves, stocked with intention.
              </h2>
            </div>
            <Link
              href="/catalog"
              className="group inline-flex items-center gap-1.5 font-body text-sm font-semibold text-clay"
            >
              See the full catalog
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {catalog.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 0.06}>
                <Link
                  href={`/catalog#${cat.id}`}
                  className="paper-card group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <ManagedImage
                    slot={cat.products[0].slot}
                    alt={cat.name}
                    className="aspect-[4/3] w-full"
                    rounded="rounded-note"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <p className="mt-4 font-body text-xs uppercase tracking-label text-clay">
                    {cat.kicker}
                  </p>
                  <h3 className="mt-1 font-display text-xl text-ink">
                    {cat.name}
                  </h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-inkSoft">
                    {cat.intro}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-body text-sm font-semibold text-clay">
                    View products
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="frame py-20 md:py-28">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-14 text-shell sm:px-14">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-clay/30 blur-3xl" />
          <div className="relative max-w-2xl">
            <span className="font-body text-xs font-semibold uppercase tracking-label text-clayWash">
              Free consultation
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              Not sure what you need? Let's talk it through.
            </h2>
            <p className="mt-4 font-body text-shell/75">
              Tell us about the person and the space. We'll recommend equipment
              that fits both — no pressure, no upsell.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact#quote"
                className="rounded-pillish bg-clay px-6 py-3 font-body text-sm font-semibold text-shell transition hover:bg-clayDeep"
              >
                Request a quote
              </Link>
              <a
                href={brand.phoneHref}
                className="rounded-pillish border border-shell/30 px-6 py-3 font-body text-sm font-semibold text-shell transition hover:bg-shell hover:text-ink"
              >
                Call {brand.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
