'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useLanguage } from '@/components/language-provider';
import { annualPhotos, adarPhotos } from '@/content/gallery-data';

const communityPhotos = [
  { src: '/images/q001.jpg', alt: 'Beautifully decorated event hall' },
  { src: '/images/n002.jpg', alt: 'Five friends posing at the event' },
  { src: '/images/q002.jpg', alt: 'Women at the community dinner' },
  { src: '/images/n005.jpg', alt: 'Guest speaker at the microphone' },
  { src: '/images/x000.jpg', alt: 'Women celebrating together' },
  { src: '/images/n003.jpg', alt: 'Women and girls at the festive table' },
  { src: '/images/n001.jpg', alt: 'Two friends smiling at the event' },
  { src: '/images/x001.jpg', alt: 'Our community together' },
  { src: '/images/n007.jpg', alt: 'Three friends at the gathering' },
  { src: '/images/n008.jpg', alt: 'Women enjoying the evening' },
  { src: '/images/n004.jpg', alt: 'Warm moments together' },
  { src: '/images/n006.jpg', alt: 'Community connection' },
  { src: '/images/x0011.jpg', alt: 'Friends at the gathering' },
  { src: '/images/x009.jpg', alt: 'Friends at the event' },
  { src: '/images/x0091.jpg', alt: 'Young volunteers' },
];

type GalleryTab = 'annual' | 'adar' | 'reels' | 'farbrengen-video' | 'journals' | 'community';

function PhotoGrid({ basePath, photos, isFullPath }: { basePath?: string; photos: string[]; isFullPath?: boolean }) {
  const { language } = useLanguage();
  const isRu = language === 'rus';
  const [showCount, setShowCount] = useState(18);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = photos.slice(0, showCount);
  const hasMore = showCount < photos.length;

  return (
    <>
      <p style={{ textAlign: 'center', color: '#8a7a5a', marginBottom: '1rem', fontSize: 14 }}>
        {photos.length} {isRu ? 'фотографий' : 'photos'}
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '0.75rem',
      }}>
        {visible.map((photo, i) => (
          <div
            key={i}
            onClick={() => setLightbox(i)}
            style={{
              position: 'relative', aspectRatio: '1', borderRadius: 12,
              overflow: 'hidden', cursor: 'pointer',
              border: '1px solid rgba(212,168,83,0.15)',
            }}
          >
            <Image
              src={isFullPath ? photo : `${basePath}/${photo}`}
              alt={`Photo ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, 180px"
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
              padding: '12px 32px', borderRadius: 12,
              background: 'var(--gold, #d4a853)', color: '#1a1612',
              fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer',
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
          <button onClick={(e) => { e.stopPropagation(); setLightbox(null) }}
            style={{ position: 'absolute', top: 20, right: 20, color: 'white', fontSize: 32, background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
          {lightbox > 0 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
              style={{ position: 'absolute', left: 20, color: 'white', fontSize: 40, background: 'none', border: 'none', cursor: 'pointer' }}>‹</button>
          )}
          {lightbox < photos.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
              style={{ position: 'absolute', right: 60, color: 'white', fontSize: 40, background: 'none', border: 'none', cursor: 'pointer' }}>›</button>
          )}
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh', width: '100%', height: '100%' }}>
            <Image
              src={isFullPath ? photos[lightbox] : `${basePath}/${photos[lightbox]}`}
              alt={`Photo ${lightbox + 1}`}
              fill sizes="90vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function GalleryPage() {
  const { copy, language } = useLanguage();
  const isRu = language === 'rus';
  const [tab, setTab] = useState<GalleryTab>('annual');

  const tabs: { key: GalleryTab; label: string }[] = [
    { key: 'annual', label: isRu ? '26-й Фарбренген' : '26th Farbrengen' },
    { key: 'adar', label: isRu ? 'Адар 2026' : 'Adar 2026' },
    { key: 'reels', label: 'Reels' },
    { key: 'farbrengen-video', label: isRu ? '26-й Фарбренген — Видео' : '26th Farbrengen — Video' },
    { key: 'journals', label: isRu ? 'По следам фарбренгена' : 'Farbrengen Journals' },
    { key: 'community', label: isRu ? 'Сообщество' : 'Community' },
  ];

  return (
    <div className="subpage">
      <h1>{copy.gallery.title}</h1>

      {/* Tabs */}
      <div className="gallery-tabs" style={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        gap: 8,
        marginBottom: '2rem',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        paddingBottom: 4,
      }}>
        <style>{`.gallery-tabs::-webkit-scrollbar { display: none; }`}</style>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '8px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
              background: tab === t.key ? 'var(--gold, #d4a853)' : 'rgba(212,168,83,0.1)',
              color: tab === t.key ? '#1a1612' : '#8a7a5a',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'annual' && (
        <PhotoGrid basePath="/gallery/annual-26" photos={annualPhotos} />
      )}

      {tab === 'adar' && (
        <PhotoGrid basePath="/gallery/adar-2026" photos={adarPhotos} />
      )}

      {tab === 'reels' && (
        <div>
          {/* YouTube */}
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(212,168,83,0.15)', marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
              <iframe
                src="https://www.youtube.com/embed/u6TBNSXESMs"
                title="Russian Junior N'shei Chabad"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </div>
          {/* Reels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {[1, 2, 3, 4, 5].map(n => (
              <div key={n} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(212,168,83,0.15)' }}>
                <video
                  controls preload="metadata" playsInline muted
                  style={{ width: '100%', aspectRatio: '9/16', objectFit: 'cover', background: '#1a1612' }}
                >
                  <source src={`/reels/Reels_${n}.mp4`} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'farbrengen-video' && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#6a5a4a', fontSize: 16, marginBottom: '1.5rem' }}>
            {isRu ? 'Выступления с 26-го Юбилейного Фарбренгена' : 'Presentations from the 26th Annual Farbrengen'}
          </p>
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(212,168,83,0.2)', marginBottom: '1.5rem' }}>
            <iframe
              src="https://www.youtube.com/embed/videoseries?list=PL-B5c5vYqUuoyPKEVzwveFb59OBtUoCDZ"
              title="26th Annual Farbrengen Playlist"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', aspectRatio: '16/9', border: 'none' }}
            />
          </div>
          <a
            href="https://youtube.com/playlist?list=PL-B5c5vYqUuoyPKEVzwveFb59OBtUoCDZ"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 12,
              background: '#ff0000', color: 'white',
              fontWeight: 700, fontSize: 16, textDecoration: 'none',
            }}
          >
            ▶ {isRu ? 'Смотреть весь плейлист на YouTube' : 'Watch full playlist on YouTube'}
          </a>
        </div>
      )}

      {tab === 'journals' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: isRu ? 'Нисан 2026' : 'Nisan 2026', file: '/journals/nisan-2026.pdf', preview: '/journals/nisan-2026-preview.jpg' },
            { title: isRu ? 'Адар 2026' : 'Adar 2026', file: '/journals/adar-2026.pdf', preview: '/journals/adar-2026-preview.jpg' },
            { title: isRu ? '26-й Юбилейный Журнал' : '26th Annual Journal', file: '/journals/26th-annual-journal.pdf', preview: '/journals/26th-annual-journal-preview.jpg' },
          ].map((j, i) => (
            <a
              key={i}
              href={j.file}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                borderRadius: 16,
                background: 'rgba(212,168,83,0.06)',
                border: '1px solid rgba(212,168,83,0.2)',
                textDecoration: 'none',
                transition: 'all 0.2s',
                overflow: 'hidden',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,168,83,0.5)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(212,168,83,0.15)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,168,83,0.2)'; (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src={j.preview} alt={j.title} fill style={{ objectFit: 'cover' }} sizes="280px" />
              </div>
              <div style={{ padding: '12px 16px 16px', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gold, #d4a853)', marginBottom: 6 }}>
                  {j.title}
                </h3>
                <span style={{ color: '#8a7a5a', fontSize: 14, fontWeight: 600 }}>
                  {isRu ? 'Открыть PDF →' : 'Open PDF →'}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {tab === 'community' && (
        <PhotoGrid
          photos={communityPhotos.map(p => p.src)}
          isFullPath
        />
      )}
    </div>
  );
}
