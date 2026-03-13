import type { Route } from "next";

export type NavItem = {
  href: Route;
  label: string;
};

export const siteConfig = {
  name: "NURIT",
  organization: "Russian Junior N'shei Chabad",
  siteUrl: "https://www.rjnsheichabad.com",
  description:
    "A welcoming community website with simple navigation, large text, clear registration, and strong SEO foundations.",
  navigation: [
    { href: "/", label: "Home" },
    { href: "/donate", label: "Donate" },
    { href: "/about", label: "About Us" },
    { href: "/annual-event", label: "Annual Event" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
    { href: "/register", label: "Register" }
  ] satisfies NavItem[]
};

export const homeHighlights = [
  {
    title: "Simple registration",
    description:
      "The registration path is reduced to a few large fields and one clear button."
  },
  {
    title: "Comfortable reading",
    description:
      "Large type, generous spacing, and high contrast help visitors use the site without strain."
  },
  {
    title: "Ready for Google",
    description:
      "Structured metadata, semantic pages, and a fast Next.js setup support SEO from day one."
  }
];

export const services = [
  "Community gatherings and women’s events",
  "Annual Farbrengen planning and registration",
  "Learning programs and inspirational talks",
  "Volunteer support and community outreach"
];

export const galleryMoments = [
  "Annual women’s gathering",
  "Holiday inspiration evenings",
  "Community support moments",
  "Celebrations and shared memories"
];
