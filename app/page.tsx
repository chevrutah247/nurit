'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useLanguage } from '@/components/language-provider';
import { HeroSlideshow } from '@/components/hero-slideshow';
import { HayomYomCard } from '@/components/hayom-yom-card';
import { MazalTov } from '@/components/mazal-tov';
import { NossiBanner } from '@/components/nossi-banner';
import { TehilimCarousel } from '@/components/tehilim-carousel';
import { Schedule } from '@/components/schedule';
import { WeeklyVideos } from '@/components/weekly-videos';
import { ShidduchArticles } from '@/components/shidduch-articles';
import { DonationTicker } from '@/components/donation-ticker';

const monthNamesRu: Record<string, string> = {
  Nisan: 'Нисан',
  Iyyar: 'Ияр',
  Sivan: 'Сиван',
  Tamuz: 'Тамуз',
  Av: 'Ав',
  Elul: 'Элуль',
  Tishrei: 'Тишрей',
  Cheshvan: 'Хешван',
  Kislev: 'Кислев',
  Tevet: 'Тевет',
  "Sh'vat": 'Шват',
  Shvat: 'Шват',
  Adar: 'Адар',
  'Adar I': 'Адар I',
  'Adar II': 'Адар II',
};

const monthNamesHe: Record<string, string> = {
  Nisan: 'ניסן',
  Iyyar: 'אייר',
  Sivan: 'סיון',
  Tamuz: 'תמוז',
  Av: 'אב',
  Elul: 'אלול',
  Tishrei: 'תשרי',
  Cheshvan: 'חשוון',
  Kislev: 'כסלו',
  Tevet: 'טבת',
  "Sh'vat": 'שבט',
  Shvat: 'שבט',
  Adar: 'אדר',
  'Adar I': 'אדר א׳',
  'Adar II': 'אדר ב׳',
};

export default function HomePage() {
  const { copy, language } = useLanguage();
  const isRu = language === 'rus';
  const isHebrew = language === 'heb';
  const [tehilimBanner, setTehilimBanner] = useState<{
    monthName: string;
    displayDate: string;
  } | null>(null);

  useEffect(() => {
    async function fetchUpcomingMevarchim() {
      try {
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        async function getUpcomingEvent(year: number) {
          const res = await fetch(
            `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=off&min=off&mod=off&nx=off&year=${year}&month=x&ss=off&mf=on&c=off&s=off`
          );

          if (!res.ok) return null;

          const data = await res.json();
          const upcoming = (data.items || [])
            .filter((item: { title?: string; date?: string }) => item.title?.includes('Shabbat Mevarchim'))
            .map((item: { title: string; date: string }) => ({
              title: item.title,
              date: new Date(item.date),
            }))
            .filter((item: { date: Date }) => item.date >= todayStart)
            .sort((a: { date: Date }, b: { date: Date }) => a.date.getTime() - b.date.getTime());

          return upcoming[0] ?? null;
        }

        let nextEvent = await getUpcomingEvent(today.getFullYear());
        if (!nextEvent) {
          nextEvent = await getUpcomingEvent(today.getFullYear() + 1);
        }

        if (!nextEvent) {
          setTehilimBanner(null);
          return;
        }

        const diffMs = nextEvent.date.getTime() - todayStart.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays < 0 || diffDays > 7) {
          setTehilimBanner(null);
          return;
        }

        const rawMonth = nextEvent.title.replace('Shabbat Mevarchim Chodesh ', '').trim();
        const monthName = isRu
          ? monthNamesRu[rawMonth] || rawMonth
          : isHebrew
            ? monthNamesHe[rawMonth] || rawMonth
            : rawMonth;

        const displayDate = nextEvent.date.toLocaleDateString(
          isRu ? 'ru-RU' : isHebrew ? 'he-IL' : 'en-US',
          { day: 'numeric', month: 'long' }
        );

        setTehilimBanner({ monthName, displayDate });
      } catch {
        setTehilimBanner(null);
      }
    }

    fetchUpcomingMevarchim();
  }, [isRu, isHebrew]);

  const tehilimBannerText = tehilimBanner
    ? isRu
      ? `Наступающий месяц ${tehilimBanner.monthName} благословляем чтением Тегилим в этот Шаббос Меворхим, ${tehilimBanner.displayDate}.`
      : isHebrew
        ? `אנו מברכים את חודש ${tehilimBanner.monthName} הקרב בקריאת תהילים בשבת מברכים זו, ${tehilimBanner.displayDate}.`
        : `We bless the upcoming month of ${tehilimBanner.monthName} with Tehilim on this Shabbos Mevarchim, ${tehilimBanner.displayDate}.`
    : '';

  return (
    <div className="page-stack">
      <HeroSlideshow />

      <DonationTicker />

      <section className="welcome-section">
        <div className="welcome-inner">
          <h2>{copy.home.welcomeTitle}</h2>
          <p>{copy.home.welcomeText}</p>
        </div>
      </section>

      <NossiBanner />

      <section className="actions-section">
        <div className="actions-inner">
          {tehilimBanner ? (
            <div className="tehilim-announcement" role="status" aria-live="polite">
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
