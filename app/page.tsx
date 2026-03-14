'use client';

import Link from 'next/link';

import { useLanguage } from '@/components/language-provider';
import { HeroSlideshow } from '@/components/hero-slideshow';

export default function HomePage() {
  const { copy } = useLanguage();

  return (
    <div className="page-stack">
      <HeroSlideshow />

      <section className="welcome-section">
        <div className="welcome-inner">
          <h2>{copy.home.welcomeTitle}</h2>
          <p>{copy.home.welcomeText}</p>
        </div>
      </section>

      <section className="actions-section">
        <div className="actions-inner">
          <div className="actions-grid">
            <Link href="/register" className="action-card">
              <div className="action-icon">&#9997;</div>
              <h3>{copy.home.registerTitle}</h3>
              <p>{copy.home.registerText}</p>
            </Link>
            <Link href="/annual-event" className="action-card">
              <div className="action-icon">&#127881;</div>
              <h3>{copy.home.annualTitle}</h3>
              <p>{copy.home.annualText}</p>
            </Link>
            <Link href="/donate" className="action-card">
              <div className="action-icon">&#10084;</div>
              <h3>{copy.home.donateTitle}</h3>
              <p>{copy.home.donateText}</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="programs-section">
        <div className="programs-inner">
          <h2>{copy.home.programsTitle}</h2>
          <div className="programs-grid">
            <div className="program-item">
              <div className="program-icon">&#127867;</div>
              <div>
                <h3>{copy.home.gatheringTitle}</h3>
                <p>{copy.home.gatheringText}</p>
              </div>
            </div>
            <div className="program-item">
              <div className="program-icon">&#128218;</div>
              <div>
                <h3>{copy.home.learningTitle}</h3>
                <p>{copy.home.learningText}</p>
              </div>
            </div>
            <div className="program-item">
              <div className="program-icon">&#127881;</div>
              <div>
                <h3>{copy.home.farbrengenTitle}</h3>
                <p>{copy.home.farbrengenText}</p>
              </div>
            </div>
            <div className="program-item">
              <div className="program-icon">&#129309;</div>
              <div>
                <h3>{copy.home.supportTitle}</h3>
                <p>{copy.home.supportText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner">
          <h2>{copy.home.ctaTitle}</h2>
          <p>{copy.home.ctaText}</p>
          <div className="cta-buttons">
            <Link href="/register" className="button button-light button-large">
              {copy.hero.register}
            </Link>
            <Link href="/contact" className="button button-light button-large">
              {copy.home.contact}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
