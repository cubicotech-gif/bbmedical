import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/console",
    },
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
