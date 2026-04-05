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
  const [aboutOpen, setAboutOpen] = useState(false);

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

  const aboutMenuItems = [
    { href: "/about", label: copy.nav.about },
    { href: "/partners", label: copy.nav.partners },
    { href: "/contact", label: copy.nav.contact },
  ];

  const allLinks = [
    { href: "/", label: copy.nav.home },
    ...siteConfig.navigation.filter(item => !["/", "/about", "/partners", "/contact"].includes(item.href)).map(item => ({
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
          <div
            className="nav-dropdown"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              type="button"
              className={
                aboutMenuItems.some((item) => pathname === item.href)
                  ? "nav-link nav-link-active nav-dropdown-trigger"
                  : "nav-link nav-dropdown-trigger"
              }
              onClick={() => setAboutOpen((value) => !value)}
              aria-expanded={aboutOpen}
            >
              {copy.nav.about}
              <span className="nav-dropdown-arrow">{aboutOpen ? '▴' : '▾'}</span>
            </button>

            {aboutOpen ? (
              <div className="nav-dropdown-menu">
                {aboutMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href as any}
                    className={pathname === item.href ? "nav-dropdown-link nav-dropdown-link-active" : "nav-dropdown-link"}
                    onClick={() => setAboutOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <button
              type="button"
              onClick={() => setAboutOpen(!aboutOpen)}
              style={{
                padding: '14px 16px',
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 600,
                minHeight: 48,
                color: aboutMenuItems.some((item) => pathname === item.href) ? 'var(--bg, #1a1612)' : 'var(--accent, #d4a853)',
                background: aboutMenuItems.some((item) => pathname === item.href) ? 'var(--accent, #d4a853)' : 'rgba(212,168,83,0.08)',
                border: 'none',
                textAlign: 'center',
                cursor: 'pointer',
              }}
            >
              {copy.nav.about} {aboutOpen ? '▴' : '▾'}
            </button>

            {aboutOpen ? aboutMenuItems.map(item => (
              <Link
                key={item.href}
                href={item.href as any}
                onClick={() => {
                  setAboutOpen(false);
                  setMenuOpen(false);
                }}
                style={{
                  padding: '12px 16px',
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 600,
                  minHeight: 44,
                  color: pathname === item.href ? 'var(--bg, #1a1612)' : 'var(--text, #3a2f1f)',
                  background: pathname === item.href ? 'rgba(212,168,83,0.45)' : 'rgba(212,168,83,0.04)',
                  textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                {item.label}
              </Link>
            )) : null}
          </div>

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
