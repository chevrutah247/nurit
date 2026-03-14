'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
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

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="hero-banner">
      <div className="hero-slides">
        <Link href="/" className="hero-logo-link" aria-label="Go to home page">
          <Image
            src="/images/logo-001-transparent.png"
            alt="Junior N'shei Chabad logo"
            width={320}
            height={108}
            className="hero-corner-logo"
            priority
          />
        </Link>
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`hero-slide ${i === current ? 'hero-slide-active' : ''}`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="hero-slide-img"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
        <div className="hero-overlay">
          <div className="hero-overlay-content">
            <h1>Russian Junior N&apos;shei Chabad</h1>
            <p className="hero-tagline">
              A warm community for women of all ages.
              <br />
              Gatherings, inspiration, and connection.
            </p>
            <div className="hero-buttons">
              <Link href="/register" className="button button-primary button-large">
                Register
              </Link>
              <Link href="/donate" className="button button-light button-large">
                Donate
              </Link>
            </div>
          </div>
        </div>
        <button onClick={prev} className="hero-arrow hero-arrow-left" aria-label="Previous photo">
          &#8249;
        </button>
        <button onClick={next} className="hero-arrow hero-arrow-right" aria-label="Next photo">
          &#8250;
        </button>
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`hero-dot ${i === current ? 'hero-dot-active' : ''}`}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
