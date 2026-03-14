'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { siteConfig } from '@/content/site';

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="header-brand">
          <Image
            src="/images/001.png"
            alt="RJ N'shei Chabad"
            width={64}
            height={64}
            className="header-logo"
          />
          <div className="header-brand-copy">
            <span className="header-kicker">Russian Junior</span>
            <span className="header-name">N&apos;shei Chabad</span>
          </div>
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`header-nav-link ${pathname === item.href ? 'header-nav-active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="header-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '\u2715' : '\u2630'}
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-nav-link ${pathname === item.href ? 'header-nav-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
