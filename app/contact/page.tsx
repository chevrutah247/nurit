'use client';

import { useLanguage } from '@/components/language-provider';

export default function ContactPage() {
  const { copy, language } = useLanguage();
  const isRu = language === 'rus';

  return (
    <div className="subpage">
      <h1>{copy.contact.title}</h1>

      <section className="page-panel" style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: 48 }}>✉️</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ padding: '1.25rem', borderRadius: 12, background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)' }}>
            <p style={{ color: '#8a7a5a', fontSize: 13, marginBottom: 4 }}>
              {isRu ? 'Организация' : 'Organization'}
            </p>
            <p style={{ color: '#3a2f1f', fontSize: 18, fontWeight: 700 }}>
              Russian Junior N&apos;shei Chabad
            </p>
          </div>

          <div style={{ padding: '1.25rem', borderRadius: 12, background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)' }}>
            <p style={{ color: '#8a7a5a', fontSize: 13, marginBottom: 4 }}>
              {isRu ? 'Телефон' : 'Phone'}
            </p>
            <a href="tel:+19173314956" style={{ color: 'var(--gold, #d4a853)', fontSize: 20, fontWeight: 700, textDecoration: 'none' }}>
              (917) 331-4956
            </a>
          </div>

          <div style={{ padding: '1.25rem', borderRadius: 12, background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)' }}>
            <p style={{ color: '#8a7a5a', fontSize: 13, marginBottom: 4 }}>Email</p>
            <a href="mailto:nsarytchev@gmail.com" style={{ color: 'var(--gold, #d4a853)', fontSize: 20, fontWeight: 700, textDecoration: 'none' }}>
              nsarytchev@gmail.com
            </a>
          </div>

          <div style={{ padding: '1.25rem', borderRadius: 12, background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)' }}>
            <p style={{ color: '#8a7a5a', fontSize: 13, marginBottom: 4 }}>
              {isRu ? 'Местоположение' : 'Location'}
            </p>
            <p style={{ color: '#3a2f1f', fontSize: 18, fontWeight: 700 }}>
              Crown Heights, Brooklyn, NY
            </p>
          </div>

          <div style={{ padding: '1.25rem', borderRadius: 12, background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)' }}>
            <p style={{ color: '#8a7a5a', fontSize: 13, marginBottom: 4 }}>
              {isRu ? 'Сайт' : 'Website'}
            </p>
            <a href="https://rjnsheichabad.com" style={{ color: 'var(--gold, #d4a853)', fontSize: 18, fontWeight: 700, textDecoration: 'none' }}>
              rjnsheichabad.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
