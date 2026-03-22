'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Article {
  title: Record<string, string>;
  tag: Record<string, string>;
  img: string;
  url: string;
}

export function ShidduchArticles({ lang }: { lang: string }) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('https://www.getashidduch.org/api/articles')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setArticles(data); })
      .catch(() => {});
  }, []);

  if (articles.length === 0) return null;

  const l = lang === 'rus' ? 'ru' : 'en';

  return (
    <section style={{ padding: '56px 16px', background: 'linear-gradient(135deg, #f5edd8 0%, #faf6f0 100%)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 28 }}>💍</span>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#2d2017', margin: 0, fontFamily: 'var(--font-heading)' }}>
            {lang === 'rus' ? 'База знаний о шиддухе' : 'Shidduch Knowledge Hub'}
          </h2>
        </div>
        <p style={{ color: '#6b5a4e', fontSize: 14, marginBottom: 32, marginTop: 4 }}>
          {lang === 'rus' ? 'Статьи и советы от GetAShidduch.org' : 'Articles & advice from GetAShidduch.org'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
          {articles.map((a, i) => (
            <a
              key={i}
              href={a.url?.replace('/ru/', `/${l}/`) || `https://getashidduch.org/${l}/journal`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block', borderRadius: 12, overflow: 'hidden',
                border: '1px solid rgba(158,124,61,0.2)', background: '#fff', textDecoration: 'none',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src={a.img} alt={a.title?.[l] || a.title?.ru || ''} fill style={{ objectFit: 'cover' }} sizes="(max-width: 640px) 50vw, 20vw" />
                <div style={{
                  position: 'absolute', top: 8, left: 8,
                  padding: '2px 8px', borderRadius: 6,
                  fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5,
                  background: 'rgba(140,74,107,0.85)', color: '#fff',
                }}>
                  {a.tag?.[l] || a.tag?.ru || ''}
                </div>
              </div>
              <div style={{ padding: 10 }}>
                <p style={{
                  fontSize: 11, fontWeight: 600, color: '#2d2017',
                  lineHeight: 1.4, margin: 0,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {a.title?.[l] || a.title?.ru || ''}
                </p>
              </div>
            </a>
          ))}
        </div>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <a href={`https://getashidduch.org/${l}/journal`} target="_blank" rel="noopener noreferrer"
            style={{ color: '#9e7c3d', fontSize: 13, textDecoration: 'none' }}>
            💍 GetAShidduch.org — {lang === 'rus' ? 'Еврейская платформа знакомств' : 'Jewish Matchmaking Platform'}
          </a>
        </div>
      </div>
    </section>
  );
}
