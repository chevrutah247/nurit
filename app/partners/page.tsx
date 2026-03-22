'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useLanguage } from '@/components/language-provider';

export default function PartnersPage() {
  const { copy, language } = useLanguage();
  const isRu = language === 'rus';

  return (
    <div className="subpage">
      <h1>{copy.partners.title}</h1>

      <section className="page-panel partners-hero">
        <div className="partners-hero-copy">
          <p className="eyebrow">{copy.partners.title}</p>
          <h2>{copy.partners.introTitle}</h2>
          <p>{copy.partners.introText}</p>
        </div>
        <div className="partners-brand-card">
          <Image
            src="/images/edonthego-logo.png"
            alt="Education On The Go"
            width={300}
            height={120}
            className="partners-brand-logo"
          />
          <Link
            href="https://edonthego.org"
            className="button button-secondary"
            target="_blank"
            rel="noreferrer"
          >
            {copy.partners.visitSite}
          </Link>
        </div>
      </section>

      {/* Additional Partners */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        {/* Eli Photography */}
        <a
          href="https://eli.smugmug.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            padding: '2rem', borderRadius: 16,
            background: 'rgba(212,168,83,0.06)',
            border: '1px solid rgba(212,168,83,0.2)',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: 48 }}>📸</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gold, #d4a853)', textAlign: 'center' }}>
            Eli Photography
          </h3>
          <p style={{ color: '#6a5a4a', fontSize: 14, textAlign: 'center' }}>
            {isRu ? 'Профессиональная фотография событий' : 'Professional Event Photography'}
          </p>
          <span style={{ color: '#8a7a5a', fontSize: 13, fontWeight: 600 }}>
            eli.smugmug.com →
          </span>
        </a>

        {/* Chabad of Ridgewood */}
        <a
          href="https://www.chabadofridgewood.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            padding: '2rem', borderRadius: 16,
            background: 'rgba(212,168,83,0.06)',
            border: '1px solid rgba(212,168,83,0.2)',
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: 48 }}>✡️</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gold, #d4a853)', textAlign: 'center' }}>
            Chabad of Ridgewood
          </h3>
          <p style={{ color: '#6a5a4a', fontSize: 14, textAlign: 'center' }}>
            {isRu ? 'Хабад Риджвуд' : 'Chabad of Ridgewood'}
          </p>
          <span style={{ color: '#8a7a5a', fontSize: 13, fontWeight: 600 }}>
            chabadofridgewood.com →
          </span>
        </a>
      </div>
    </div>
  );
}
