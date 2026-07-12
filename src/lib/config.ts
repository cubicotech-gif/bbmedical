// Central brand + company facts. Single source of truth for copy that
// repeats across pages, metadata, and the footer.

export const brand = {
  name: "BB Medical",
  legalName: "BB Medical Supply Co.",
  tagline: "Care equipment, thoughtfully sourced.",
  domain: "bbmedical.co",
  descriptor:
    "A family-run supplier of home and clinical care equipment — chosen with the patience of people who use it every day.",
  phone: "+1 (415) 555-0182",
  phoneHref: "tel:+14155550182",
  email: "hello@bbmedical.co",
  address: {
    street: "1140 Alder Court, Suite 3",
    city: "Petaluma",
    region: "CA",
    postal: "94952",
  },
  hours: [
    { days: "Monday – Friday", time: "8:00a – 6:00p" },
    { days: "Saturday", time: "9:00a – 2:00p" },
    { days: "Sunday", time: "Closed" },
  ],
  social: {
    // Placeholders — swap for real handles when available.
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
} as const;

export const fullAddress = `${brand.address.street}, ${brand.address.city}, ${brand.address.region} ${brand.address.postal}`;

export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? `https://${brand.domain}`;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Our Story", href: "/about" },
  { label: "Visit Us", href: "/contact" },
] as const;
