"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-shell header">
      <div className="brand-block">
        <p className="eyebrow">Welcoming women with clarity and warmth</p>
        <Link href="/" className="brand-link">
          {siteConfig.name}
        </Link>
        <p className="brand-subtitle">{siteConfig.organization}</p>
      </div>

      <nav aria-label="Main navigation" className="main-nav">
        {siteConfig.navigation.map((item) => {
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
