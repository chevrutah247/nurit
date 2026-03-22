"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/components/language-provider";
import { siteConfig } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const { copy } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLabelByHref: Record<string, string> = {
    "/": copy.nav.home,
    "/about": copy.nav.about,
    "/partners": copy.nav.partners,
    "/team": copy.nav.team,
    "/annual-event": copy.nav.annualEvent,
    "/gallery": copy.nav.gallery,
    "/sponsors": copy.nav.sponsors,
    "/donate": copy.nav.donate,
    "/contact": copy.nav.contact,
    "/register": copy.nav.register,
  };

  const allLinks = [
    { href: "/", label: copy.nav.home },
    ...siteConfig.navigation.filter(item => item.href !== "/").map(item => ({
      href: item.href,
      label: navLabelByHref[item.href] ?? item.label,
    })),
  ];

  return (
    <header className="site-shell compact-header">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 8 }}>
        <LanguageSwitcher />

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="main-nav main-nav-compact" style={{ display: 'var(--desktop-nav-display, flex)' }}>
          {allLinks.map(item => (
            <Link
              key={item.href}
              href={item.href as any}
              className={pathname === item.href ? "nav-link nav-link-active" : "nav-link"}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            display: 'var(--mobile-menu-display, none)',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 28, color: 'var(--accent, #d4a853)', padding: 8,
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          style={{
            display: 'flex', flexDirection: 'column', gap: 4,
            padding: '12px 0', width: '100%',
          }}
        >
          {allLinks.map(item => (
            <Link
              key={item.href}
              href={item.href as any}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '14px 16px',
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 600,
                minHeight: 48,
                color: pathname === item.href ? 'var(--bg, #1a1612)' : 'var(--accent, #d4a853)',
                background: pathname === item.href ? 'var(--accent, #d4a853)' : 'rgba(212,168,83,0.08)',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}

      <style>{`
        @media (min-width: 981px) {
          :root { --desktop-nav-display: flex; --mobile-menu-display: none; }
        }
        @media (max-width: 980px) {
          :root { --desktop-nav-display: none !important; --mobile-menu-display: block; }
          .main-nav-compact { display: none !important; }
        }
      `}</style>
    </header>
  );
}
