'use client';

import Link from 'next/link';

import { useLanguage } from '@/components/language-provider';
import { HeroSlideshow } from '@/components/hero-slideshow';
import { MazalTov } from '@/components/mazal-tov';
import { TehilimCarousel } from '@/components/tehilim-carousel';
import { Schedule } from '@/components/schedule';
import { WeeklyVideos } from '@/components/weekly-videos';
import { ShidduchArticles } from '@/components/shidduch-articles';

const TEHILIM_BANNER_HIDE_AT = new Date('2026-05-24T23:59:59-04:00');

export default function HomePage() {
  const { copy, language } = useLanguage();
  const isRu = language === 'rus';
  const isHebrew = language === 'heb';
  const showTehilimBanner = new Date() <= TEHILIM_BANNER_HIDE_AT;

  const tehilimBannerText = isRu
    ? 'Наступающий месяц Сиван благословляем чтением Тегилим в этот Шаббос Меворхим, 24-ого мая.'
    : isHebrew
      ? 'אנו מברכים את חודש סיון הקרב בקריאת תהילים בשבת מברכים זו, ב-24 במאי.'
      : 'We bless the upcoming month of Sivan with Tehilim on this Shabbos Mevarchim, May 24.';

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
          {showTehilimBanner ? (
            <div className="tehilim-announcement" role="status" aria-live="polite">
              <span className="tehilim-announcement-badge">
                {isRu ? 'Важно' : isHebrew ? 'חשוב' : 'Important'}
              </span>
              <p>{tehilimBannerText}</p>
            </div>
          ) : null}

          <div className="actions-grid">
            <div className="action-card" style={{ cursor: 'default', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📖</div>
              <p style={{ color: '#4a3f2f', fontSize: 22, lineHeight: 1.8, fontStyle: 'italic', marginBottom: 16 }}>
                {isRu
                  ? '«Если бы Вы только знали всю силу Тегилим, — сказал 3-ий Любавический Ребе, Цемах Цедек, — то говорили бы их постоянно!»'
                  : '"If you only knew the power of Tehillim," said the 3rd Lubavitcher Rebbe, the Tzemach Tzedek, "you would recite them constantly!"'}
              </p>
              <p style={{ color: '#4a3f2f', fontSize: 20, lineHeight: 1.8, fontStyle: 'italic', marginBottom: 16 }}>
                {isRu
                  ? '«Знайте, что Псалмы рушат все преграды, поднимаются всё выше и выше безо всяких помех, преклоняются перед Господином всех миров и выполняют своё действие с добротой и милосердием.»'
                  : '"Know that the Psalms break through all barriers, rise higher and higher without any hindrance, bow before the Master of all worlds, and accomplish their purpose with kindness and mercy."'}
              </p>
              <p style={{ color: 'var(--gold, #d4a853)', fontSize: 16, fontWeight: 600, letterSpacing: 1 }}>
                {isRu ? '«Гайом-Йом» Ребе Шлита' : 'HaYom Yom — The Rebbe Shlita'}
              </p>
            </div>
            <div className="action-card" style={{ cursor: 'default' }}>
              <TehilimCarousel />
            </div>
            <div className="action-card" style={{ cursor: 'default' }}>
              <MazalTov />
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="programs-section">
        <div className="programs-inner">
          <Schedule />
        </div>
      </section>

      {/* Weekly Videos */}
      <section className="actions-section" style={{ paddingTop: 0 }}>
        <div className="actions-inner">
          <WeeklyVideos />
        </div>
      </section>

      <ShidduchArticles lang={language} />

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
