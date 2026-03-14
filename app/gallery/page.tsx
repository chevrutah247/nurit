'use client';

import Image from 'next/image';

import { useLanguage } from '@/components/language-provider';

const photos = [
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

export default function GalleryPage() {
  const { copy } = useLanguage();

  return (
    <div className="subpage">
      <h1>{copy.gallery.title}</h1>

      {/* Video */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '2rem' }}>
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

      <div className="grid-three">
        {photos.map((photo) => (
          <div key={photo.src} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 980px) 100vw, 33vw"
              />
            </div>
            <p style={{ padding: '12px 16px', margin: 0, fontSize: '0.95rem', textAlign: 'center' }}>
              {photo.alt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
