import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { brand, siteOrigin } from "@/lib/config";
import { AssetProvider } from "@/lib/asset-store";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FaviconSlot } from "@/components/favicon-slot";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.descriptor,
  keywords: [
    "medical equipment",
    "wheelchairs",
    "mobility aids",
    "diabetic care",
    "orthopedic braces",
    "home care supplies",
  ],
  openGraph: {
    type: "website",
    url: siteOrigin,
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.descriptor,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.descriptor,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-paper">
        <AssetProvider>
          <FaviconSlot />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </AssetProvider>
      </body>
    </html>
  );
}
