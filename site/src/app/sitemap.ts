import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";
import { services } from "@/data/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/storia", "/certificazioni", "/compliance", "/galleria", "/contatti", "/privacy-policy", ...services.map((s) => `/servizi/${s.slug}`)];
  return routes.map((r) => ({ url: `${siteUrl}${r}`, changeFrequency: "monthly", priority: r === "" ? 1 : 0.7 }));
}
