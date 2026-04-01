'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/language-provider';

interface Lesson {
  dayOfWeek: number;
  hour: number;
  minute: number;
  titleRu: string;
  titleEn: string;
  locationRu: string;
  locationEn: string;
  dayRu: string;
  dayEn: string;
  icon: string;
}

const lessons: Lesson[] = [
  {
    dayOfWeek: 1, hour: 21, minute: 0,
    titleRu: 'Тания у Риммы Фельдман',
    titleEn: 'Tanya at Rimma Feldman',
    locationRu: '675 Empire Blvd, apt. 6A',
    locationEn: '675 Empire Blvd, apt. 6A',
    dayRu: 'Понедельник', dayEn: 'Monday',
    icon: '📖',
  },
  {
    dayOfWeek: 2, hour: 10, minute: 0,
    titleRu: 'Хасидус у Нурит Сарычев',
    titleEn: 'Chassidus at Nurit Sarytchev',
    locationRu: '935 Eastern Pkwy №5С',
    locationEn: '935 Eastern Pkwy #5C',
    dayRu: 'Вторник утро', dayEn: 'Tuesday morning',
    icon: '📖',
  },
  {
    dayOfWeek: 2, hour: 21, minute: 0,
    titleRu: 'Маймарим у Леи Гольдштейн',
    titleEn: 'Maamarim at Leah Goldshtein',
    locationRu: '275 Albany Ave, apt. 3A',
    locationEn: '275 Albany Ave, apt. 3A',
    dayRu: 'Вторник вечер', dayEn: 'Tuesday evening',
    icon: '📖',
  },
  {
    dayOfWeek: 6, hour: 18, minute: 30,
    titleRu: 'Хасидус @ F.R.E.E',
    titleEn: 'Chassidus @ F.R.E.E',
    locationRu: 'F.R.E.E',
    locationEn: 'F.R.E.E',
    dayRu: 'Шаббос', dayEn: 'Shabbos',
    icon: '✡️',
  },
];

function formatTime12(h: number, m: number, isRu: boolean): string {
  const period = h >= 12 ? (isRu ? 'вечера' : 'PM') : (isRu ? 'утра' : 'AM');
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
}

function getCountdown(lesson: Lesson): {
  isToday: boolean;
  isBeforeLesson: boolean;
  isWithinStartedWindow: boolean;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date();
  if (now.getDay() !== lesson.dayOfWeek) {
    return {
      isToday: false,
      isBeforeLesson: false,
      isWithinStartedWindow: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const target = new Date(now);
  target.setHours(lesson.hour, lesson.minute, 0, 0);
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    const elapsedMs = now.getTime() - target.getTime();

    return {
      isToday: true,
      isBeforeLesson: false,
      isWithinStartedWindow: elapsedMs < 60 * 60 * 1000,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const s = Math.floor(diff / 1000);
  return {
    isToday: true,
    isBeforeLesson: true,
    isWithinStartedWindow: false,
    hours: Math.floor(s / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export function Schedule() {
  const { language } = useLanguage();
  const isRu = language === 'rus';
  const [, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold, #d4a853)', marginBottom: 8 }}>
          {isRu ? '📅 Расписание уроков по Хасидусу' : '📅 Chassidus Class Schedule'}
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
      }}>
        {lessons.map((lesson, i) => {
          const cd = getCountdown(lesson);
          const isBlink = cd.isToday && cd.isBeforeLesson;

          return (
            <div
              key={i}
              style={{
                padding: '1.5rem',
                borderRadius: 20,
                border: isBlink ? '3px solid var(--gold, #d4a853)' : '2px solid rgba(212,168,83,0.15)',
                background: isBlink ? 'rgba(212,168,83,0.1)' : 'rgba(212,168,83,0.03)',
                animation: isBlink ? 'schedule-pulse 1.5s ease-in-out infinite' : 'none',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: 220,
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 8 }}>{lesson.icon}</div>

              <div style={{ color: 'var(--gold, #d4a853)', fontWeight: 800, fontSize: 18, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
                {isRu ? lesson.dayRu : lesson.dayEn}
              </div>

              <div style={{ color: '#3a2f1f', fontWeight: 800, fontSize: 28, marginBottom: 8 }}>
                {formatTime12(lesson.hour, lesson.minute, isRu)}
              </div>

              <div style={{ color: '#4a3f2f', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                {isRu ? lesson.titleRu : lesson.titleEn}
              </div>

              <div style={{ color: '#8a7a5a', fontSize: 13 }}>
                📍 {isRu ? lesson.locationRu : lesson.locationEn}
              </div>

              {/* Countdown */}
              {cd.isToday && cd.isBeforeLesson && (
                <div style={{
                  marginTop: 12,
                  padding: '10px 20px',
                  borderRadius: 14,
                  background: 'var(--gold, #d4a853)',
                  color: '#1a1612',
                  fontWeight: 800,
                  fontSize: 22,
                  display: 'inline-block',
                  alignSelf: 'center',
                }}>
                  {isRu ? 'ДО УРОКА' : 'STARTS IN'}{' '}
                  {cd.hours > 0 && `${cd.hours}:`}
                  {cd.minutes.toString().padStart(2, '0')}:{cd.seconds.toString().padStart(2, '0')}
                </div>
              )}

              {cd.isToday && cd.isWithinStartedWindow && (
                <div style={{
                  marginTop: 12, padding: '8px 16px', borderRadius: 12,
                  background: 'rgba(34,197,94,0.15)', color: '#166534',
                  fontWeight: 700, fontSize: 16,
                  display: 'inline-block', alignSelf: 'center',
                }}>
                  ✅ {isRu ? 'Урок начался' : 'Class started'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Call to action */}
      <div style={{
        marginTop: '1.5rem', textAlign: 'center', padding: '1.25rem',
        borderRadius: 16, background: 'rgba(212,168,83,0.06)',
        border: '1px solid rgba(212,168,83,0.15)',
      }}>
        <p style={{ color: '#4a3f2f', fontSize: 18, fontWeight: 600, lineHeight: 1.7, fontStyle: 'italic' }}>
          {isRu
            ? 'Приходите, и Хасидус принесёт Вам исцеление души и тела, а также парносу бегашмиюс и берухниюс!'
            : 'Come, and Chassidus will bring you healing of soul and body, as well as parnasa b\'gashmiyus and b\'ruchniyus!'}
        </p>
      </div>

      <style>{`
        @keyframes schedule-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,168,83,0.5); }
          50% { box-shadow: 0 0 24px 8px rgba(212,168,83,0.35); }
        }
      `}</style>
    </div>
  );
}
