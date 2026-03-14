"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";
import { siteConfig } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const { copy } = useLanguage();

  const navLabelByHref: Record<string, string> = {
    "/": copy.nav.home,
    "/about": copy.nav.about,
    "/partners": copy.nav.partners,
    "/team": copy.nav.team,
    "/annual-event": copy.nav.annualEvent,
    "/gallery": copy.nav.gallery,
    "/donate": copy.nav.donate,
    "/contact": copy.nav.contact,
    "/register": copy.nav.register,
  };

  return (
    <header className="site-shell compact-header">
      <LanguageSwitcher />
      <nav aria-label="Main navigation" className="main-nav main-nav-compact">
        <Link
          href="/"
          className={pathname === "/" ? "nav-link nav-link-active" : "nav-link"}
        >
          {copy.nav.home}
        </Link>
        {siteConfig.navigation
          .filter((item) => item.href !== "/")
          .map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "nav-link nav-link-active" : "nav-link"}
              >
                {navLabelByHref[item.href] ?? item.label}
              </Link>
            );
          })}
      </nav>
    </header>
  );
}
