import type { MetadataRoute } from "next";
import { SITE } from "@/lib/productions-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
  ];
}
