import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Handshake, Recycle, Users } from "lucide-react";
import { ManagedImage } from "@/components/managed-image";
import { Reveal } from "@/components/reveal";
import { brand } from "@/lib/config";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How BB Medical started, what we value, and the people behind the counter.",
};

const values = [
  {
    icon: Compass,
    title: "Fit before features",
    body: "A spec sheet doesn't sit in a chair all day. We start with the person and work backward to the product.",
  },
  {
    icon: Handshake,
    title: "Plain answers",
    body: "Real prices, real timelines, real trade-offs. If something won't work for you, we'll say so.",
  },
  {
    icon: Recycle,
    title: "Built to last, easy to service",
    body: "We favor equipment we can repair locally, and we keep parts on hand for the things we sell.",
  },
  {
    icon: Users,
    title: "Rooted in the neighborhood",
    body: "We live where our customers live. That's the whole reason the reputation matters to us.",
  },
];

const timeline = [
  {
    year: "2008",
    title: "A counter and a van",
    body: "Founded by the Barrett family after struggling to equip their own grandmother's home. One storefront, one delivery van.",
  },
  {
    year: "2013",
    title: "Fitting room added",
    body: "We built a proper fitting space so customers could try mobility equipment before committing.",
  },
  {
    year: "2019",
    title: "In-home service team",
    body: "Delivery grew into full setup and servicing — assembly, adjustment, and repairs at the kitchen table.",
  },
  {
    year: "2026",
    title: "Same values, wider reach",
    body: "Now serving the greater North Bay, still turning down products we wouldn't use ourselves.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="frame grid items-center gap-12 pb-16 pt-14 md:grid-cols-2 md:pt-20">
        <div>
          <span className="overline">Our story</span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            It started with one grandmother and one bad wheelchair.
          </h1>
          <p className="mt-5 max-w-reading font-body text-lg leading-relaxed text-inkSoft">
            In 2008 the Barrett family went looking for equipment to keep their
            grandmother comfortable at home — and found a maze of catalogs,
            hold music, and gear that didn't fit. BB Medical is the shop we
            wished we'd found: small, honest, and close by.
          </p>
        </div>
        <Reveal delay={0.1}>
          <ManagedImage
            slot="about"
            alt="The BB Medical storefront and team"
            className="aspect-[4/3] w-full"
            rounded="rounded-[2rem]"
          />
        </Reveal>
      </section>

      {/* Mission */}
      <section className="border-y border-line bg-shell">
        <div className="frame py-16 md:py-20">
          <p className="mx-auto max-w-3xl text-center font-display text-2xl leading-relaxed text-ink sm:text-[1.75rem]">
            “Our job isn't to move product. It's to make a hard season a little
            easier — and to still be here, answering the phone, when you call
            back.”
          </p>
          <p className="mt-6 text-center font-body text-sm uppercase tracking-label text-muted">
            The Barrett family · Founders
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="frame py-20 md:py-24">
        <div className="max-w-2xl">
          <span className="overline">What we value</span>
          <h2 className="section-title mt-4">
            Four things we won't compromise on.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="paper-card flex h-full gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-note bg-sageWash text-sage">
                  <v.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink">{v.title}</h3>
                  <p className="mt-1.5 font-body text-sm leading-relaxed text-inkSoft">
                    {v.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-line bg-paperDeep/40">
        <div className="frame py-20 md:py-24">
          <div className="max-w-2xl">
            <span className="overline">The road here</span>
            <h2 className="section-title mt-4">Eighteen years, one counter.</h2>
          </div>
          <ol className="mt-12 space-y-8 border-l-2 border-line pl-6 sm:pl-8">
            {timeline.map((t) => (
              <Reveal key={t.year}>
                <li className="relative">
                  <span className="absolute -left-[calc(1.5rem+7px)] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-clay bg-paper sm:-left-[calc(2rem+7px)]" />
                  <p className="font-display text-xl text-clay">{t.year}</p>
                  <h3 className="mt-1 font-display text-lg text-ink">
                    {t.title}
                  </h3>
                  <p className="mt-1.5 max-w-reading font-body text-sm leading-relaxed text-inkSoft">
                    {t.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="frame py-16 text-center md:py-20">
        <h2 className="section-title">Come by, or let us come to you.</h2>
        <p className="mx-auto mt-3 max-w-reading font-body text-inkSoft">
          The kettle's usually on. Visit the shop in {brand.address.city}, or
          book an in-home consultation and we'll bring the catalog to your
          living room.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-clay">
            Get in touch
          </Link>
          <Link href="/catalog" className="btn-outline">
            Browse the catalog
          </Link>
        </div>
      </section>
    </>
  );
}
