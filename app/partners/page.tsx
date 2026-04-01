'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useLanguage } from '@/components/language-provider';

export default function PartnersPage() {
  const { copy, language } = useLanguage();
  const isRu = language === 'rus';
  const isHebrew = language === 'heb';

  const heroTitle = isRu
    ? 'Chabad of Ridgewood'
    : isHebrew
      ? 'Chabad of Ridgewood'
      : 'Chabad of Ridgewood';

  const heroText = isRu
    ? 'Теплый партнерский центр Хабад, который поддерживает еврейскую жизнь, обучение, праздники и семейные программы для общины.'
    : isHebrew
      ? 'מרכז חב״ד שותף וחם התומך בחיים יהודיים, לימוד, חגים ותכניות משפחתיות לקהילה.'
      : 'A warm Chabad partner center supporting Jewish life, learning, holidays, and family programs for the community.';

  const heroButton = isRu
    ? 'Перейти на chabadofridgewood.com'
    : isHebrew
      ? 'מעבר ל-chabadofridgewood.com'
      : 'Visit chabadofridgewood.com';

  return (
    <div className="subpage">
      <h1>{copy.partners.title}</h1>

      <section className="page-panel partners-hero">
        <div className="partners-hero-copy">
          <p className="eyebrow">{copy.partners.title}</p>
          <h2>{heroTitle}</h2>
          <p>{heroText}</p>
        </div>
        <div className="partners-brand-card">
          <span style={{ fontSize: 80, lineHeight: 1 }}>✡️</span>
          <Link
            href="https://www.chabadofridgewood.com/"
            className="button button-secondary"
            target="_blank"
            rel="noreferrer"
          >
            {heroButton}
          </Link>
        </div>
      </section>

      {/* Additional Partners */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        {/* Education On The Go */}
        <a
          href="https://edonthego.org"
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
          <Image
            src="/images/edonthego-logo.png"
            alt="Education On The Go"
            width={220}
            height={88}
            className="partners-brand-logo"
          />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gold, #d4a853)', textAlign: 'center' }}>
            Education On The Go
          </h3>
          <p style={{ color: '#6a5a4a', fontSize: 14, textAlign: 'center' }}>
            {copy.partners.introText}
          </p>
          <span style={{ color: '#8a7a5a', fontSize: 13, fontWeight: 600 }}>
            edonthego.org →
          </span>
        </a>

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

        {/* Get A Shidduch */}
        <a
          href="https://www.getashidduch.org/"
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
          <span style={{ fontSize: 48 }}>💍</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--gold, #d4a853)', textAlign: 'center' }}>
            Get A Shidduch
          </h3>
          <p style={{ color: '#6a5a4a', fontSize: 14, textAlign: 'center' }}>
            {isRu
              ? 'Еврейский проект знакомств и шидухов'
              : isHebrew
                ? 'מיזם יהודי לשידוכים והיכרויות'
                : 'A Jewish matchmaking and shidduch platform'}
          </p>
          <span style={{ color: '#8a7a5a', fontSize: 13, fontWeight: 600 }}>
            getashidduch.org →
          </span>
        </a>

      </div>
    </div>
  );
}
