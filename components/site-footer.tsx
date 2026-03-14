'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useLanguage } from '@/components/language-provider';

export function SiteFooter() {
  const { copy } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Image
            src="/images/logo-001-transparent.png"
            alt="Junior N'shei Chabad logo"
            width={160}
            height={54}
          />
          <span className="footer-title">{copy.footer.title}</span>
        </div>

        <div className="footer-links">
          <Link href="/about">{copy.nav.about}</Link>
          <Link href="/contact">{copy.nav.contact}</Link>
          <Link href="/donate">{copy.nav.donate}</Link>
          <Link href="/privacy-policy">{copy.nav.privacy}</Link>
        </div>
      </div>
      <div className="footer-inner" style={{ paddingTop: 16 }}>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} {copy.footer.title}. {copy.footer.rights}
        </p>
      </div>
    </footer>
  );
}
