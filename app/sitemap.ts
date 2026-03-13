import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";

const routes = [
  "/",
  "/about",
  "/donate",
  "/annual-event",
  "/services",
  "/gallery",
  "/contact",
  "/register",
  "/privacy-policy"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7
  }));
}
