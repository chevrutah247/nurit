import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";

const routes = [
  { path: "/", priority: 1, freq: "weekly" as const },
  { path: "/about", priority: 0.9, freq: "monthly" as const },
  { path: "/team", priority: 0.8, freq: "monthly" as const },
  { path: "/gallery", priority: 0.8, freq: "weekly" as const },
  { path: "/partners", priority: 0.7, freq: "monthly" as const },
  { path: "/donate", priority: 0.7, freq: "monthly" as const },
  { path: "/contact", priority: 0.7, freq: "monthly" as const },
  { path: "/register", priority: 0.8, freq: "monthly" as const },
  { path: "/manage-profile", priority: 0.5, freq: "monthly" as const },
  { path: "/services", priority: 0.6, freq: "monthly" as const },
  { path: "/privacy-policy", priority: 0.3, freq: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}
