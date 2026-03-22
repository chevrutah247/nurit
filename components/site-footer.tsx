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
            src="/images/rjnc-logo.png"
            alt="Junior N'shei Chabad logo"
            width={160}
            height={54}
          />
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/about">{copy.nav.about}</Link>
          <Link href="/contact">{copy.nav.contact}</Link>
          <a href="https://www.paypal.com/donate?hosted_button_id=SWQMA9XCGJKA4" target="_blank" rel="noopener noreferrer">{copy.nav.donate}</a>
          <Link href="/privacy-policy">{copy.nav.privacy}</Link>
        </nav>
      </div>
      <div className="footer-inner" style={{ paddingTop: 16 }}>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} {copy.footer.rights}
        </p>
        <p className="footer-copy footer-developer">
          {copy.footer.developerLabel}{' '}
          <Link href="/developer-contact" className="footer-developer-link">
            Levi Dombrovsky
          </Link>
        </p>
      </div>
    </footer>
  );
}
