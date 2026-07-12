import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { QuoteForm } from "@/components/quote-form";
import { brand, fullAddress } from "@/lib/config";

export const metadata: Metadata = {
  title: "Visit Us",
  description: `Reach BB Medical in ${brand.address.city}, CA — phone, email, hours, and a working contact form.`,
};

const mapQuery = encodeURIComponent(fullAddress);

export default function ContactPage() {
  return (
    <>
      <section className="frame pb-10 pt-14 md:pt-20">
        <span className="overline">Visit us</span>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          A real shop, with real people answering.
        </h1>
        <p className="mt-5 max-w-reading font-body text-lg text-inkSoft">
          Call, email, or send a note below. Whether it's a quick question or a
          full consultation, you'll hear back from someone local within a
          business day.
        </p>
      </section>

      <section className="frame grid gap-10 pb-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Contact form */}
        <div>
          <h2 className="mb-5 font-display text-2xl text-ink">Send us a note</h2>
          <InquiryForm />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="paper-card space-y-5">
            <Detail
              icon={MapPin}
              label="Visit"
              lines={[brand.address.street, `${brand.address.city}, ${brand.address.region} ${brand.address.postal}`]}
            />
            <Detail
              icon={Phone}
              label="Call"
              lines={[brand.phone]}
              href={brand.phoneHref}
            />
            <Detail
              icon={Mail}
              label="Email"
              lines={[brand.email]}
              href={`mailto:${brand.email}`}
            />
          </div>

          <div className="paper-card">
            <h3 className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-label text-muted">
              <Clock className="h-3.5 w-3.5" /> Store hours
            </h3>
            <ul className="mt-4 space-y-2">
              {brand.hours.map((h) => (
                <li
                  key={h.days}
                  className="flex justify-between border-b border-line/70 pb-2 font-body text-sm text-inkSoft last:border-0 last:pb-0"
                >
                  <span>{h.days}</span>
                  <span className="text-muted">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Map area */}
      <section className="frame pb-16">
        <div className="overflow-hidden rounded-panel border border-line shadow-soft">
          <iframe
            title={`Map to ${brand.name}`}
            src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
            className="h-[360px] w-full grayscale-[0.15]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href={`https://maps.google.com/maps?q=${mapQuery}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-clay"
        >
          <Navigation className="h-4 w-4" /> Open in Google Maps
        </a>
      </section>

      {/* Quote request */}
      <section id="quote" className="scroll-mt-24 border-t border-line bg-paperDeep/40">
        <div className="frame grid gap-10 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="overline">Request a quote</span>
            <h2 className="section-title mt-4">
              Tell us what you need. We'll price it honestly.
            </h2>
            <p className="mt-4 max-w-reading font-body text-inkSoft">
              Send the details and we'll come back with a clear quote, including
              what insurance is likely to cover and what it isn't. No obligation,
              no pressure.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}

function Detail({
  icon: Icon,
  label,
  lines,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  lines: string[];
  href?: string;
}) {
  const content = (
    <div className="flex gap-3.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-note bg-clayWash text-clayDeep">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-body text-xs font-semibold uppercase tracking-label text-muted">
          {label}
        </p>
        {lines.map((l) => (
          <p key={l} className="font-body text-sm text-ink">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}
