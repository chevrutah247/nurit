'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/components/language-provider';

import { annualPhotos, adarPhotos } from '@/content/gallery-data';

function PhotoGallery({ title, basePath, photos, id }: { title: string; basePath: string; photos: string[]; id: string }) {
  const [showCount, setShowCount] = useState(12);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { language } = useLanguage();
  const isRu = language === 'rus';

  const visible = photos.slice(0, showCount);
  const hasMore = showCount < photos.length;

  return (
    <section id={id} style={{ marginBottom: '3rem' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--gold, #d4a853)', marginBottom: '1rem', textAlign: 'center' }}>
        {title}
      </h2>
      <p style={{ textAlign: 'center', color: '#8a7a5a', marginBottom: '1.5rem', fontSize: 14 }}>
        {photos.length} {isRu ? 'фотографий' : 'photos'}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '0.75rem',
      }}>
        {visible.map((photo, i) => (
          <div
            key={i}
            onClick={() => setLightbox(i)}
            style={{
              position: 'relative',
              aspectRatio: '1',
              borderRadius: 12,
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid rgba(212,168,83,0.15)',
            }}
          >
            <Image
              src={`${basePath}/${photo}`}
              alt={`Photo ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 200px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            onClick={() => setShowCount(s => s + 24)}
            style={{
              padding: '12px 32px',
              borderRadius: 12,
              background: 'var(--gold, #d4a853)',
              color: '#1a1612',
              fontWeight: 600,
              fontSize: 15,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {isRu ? `Показать ещё (${photos.length - showCount})` : `Show more (${photos.length - showCount})`}
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null) }}
            style={{ position: 'absolute', top: 20, right: 20, color: 'white', fontSize: 32, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ✕
          </button>
          {lightbox > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
              style={{ position: 'absolute', left: 20, color: 'white', fontSize: 40, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ‹
            </button>
          )}
          {lightbox < photos.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
              style={{ position: 'absolute', right: 20, color: 'white', fontSize: 40, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ›
            </button>
          )}
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh', width: '100%', height: '100%' }}>
            <Image
              src={`${basePath}/${photos[lightbox]}`}
              alt={`Photo ${lightbox + 1}`}
              fill
              sizes="90vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default function AnnualEventPage() {
  const { copy, language } = useLanguage();
  const isRu = language === 'rus';

  return (
    <div className="subpage">
      <h1>{copy.annual.title}</h1>

      <section className="page-panel" style={{ marginBottom: 24 }}>
        <h2>{copy.annual.detailsTitle}</h2>
        <p style={{ fontSize: '1.2rem' }}><strong>{copy.annual.date}:</strong> {copy.annual.dateValue}</p>
        <p style={{ fontSize: '1.2rem' }}><strong>{copy.annual.location}:</strong> {copy.annual.locationValue}</p>
        <p style={{ fontSize: '1.2rem' }}><strong>{copy.annual.focus}:</strong> {copy.annual.focusValue}</p>
        <div className="button-row">
          <Link href="/register" className="button button-primary button-large">
            {copy.annual.register}
          </Link>
        </div>
      </section>

      <section className="page-grid">
        <article className="page-panel">
          <h2>{copy.annual.expectTitle}</h2>
          <p>{copy.annual.expectText}</p>
        </article>
        <article className="page-panel">
          <h2>{copy.annual.questionsTitle}</h2>
          <p>{copy.annual.questionsText}</p>
        </article>
      </section>

      {/* Reels */}
      <section style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--gold, #d4a853)', textAlign: 'center', marginBottom: '1rem' }}>
          {isRu ? 'Видео' : 'Reels'}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {[1, 2, 3, 4, 5].map(n => (
            <div key={n} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(212,168,83,0.15)' }}>
              <video
                controls
                preload="metadata"
                playsInline
                muted
                style={{ width: '100%', aspectRatio: '9/16', objectFit: 'cover', background: '#1a1612' }}
              >
                <source src={`/reels/Reels_${n}.mp4`} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Galleries */}
      <PhotoGallery
        title={isRu ? '26-й Юбилейный Фарбренген' : '26th Annual Farbrengen'}
        basePath="/gallery/annual-26"
        photos={annualPhotos}
        id="annual-gallery"
      />

      <PhotoGallery
        title={isRu ? 'Адар 2026' : 'Adar 2026'}
        basePath="/gallery/adar-2026"
        photos={adarPhotos}
        id="adar-gallery"
      />
    </div>
  );
}
