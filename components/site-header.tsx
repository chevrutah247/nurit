"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-shell compact-header">
      <nav aria-label="Main navigation" className="main-nav main-nav-compact">
        <Link href="/" className="nav-home-link">
          Home
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
                {item.label}
              </Link>
            );
          })}
      </nav>
    </header>
  );
}
