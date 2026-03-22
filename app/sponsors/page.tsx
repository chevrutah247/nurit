'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/components/language-provider';

interface Sponsor {
  name: string;
}

interface SponsorTier {
  id: string;
  titleEng: string;
  titleRus: string;
  titleHeb: string;
  subtitle: string;
  gradient: string;
  borderColor: string;
  glowColor: string;
  textColor: string;
  accentColor: string;
  iconColor: string;
  icon: string;
  sponsors: Sponsor[];
}

const tiers: SponsorTier[] = [
  {
    id: 'gold',
    titleEng: 'Gold Sponsors',
    titleRus: 'Золотые спонсоры',
    titleHeb: 'נותני חסות זהב',
    subtitle: '$770 & more',
    gradient: 'linear-gradient(135deg, #1a1400 0%, #2d2000 30%, #3d2b00 60%, #2d2000 100%)',
    borderColor: '#d4a853',
    glowColor: 'rgba(212, 168, 83, 0.3)',
    textColor: '#ffd700',
    accentColor: '#d4a853',
    iconColor: '#ffd700',
    icon: '👑',
    sponsors: [
      { name: 'Клара Ландсман' },
      { name: 'Анонимный спонсор' },
      { name: 'Инна Нисневич' },
      { name: 'Эстер Таль' },
      { name: 'Эстер-Фрейда Гедзберг' },
      { name: 'Лея Гольдштейн' },
      { name: 'Шейна Рот' },
      { name: 'Шушана Ильяева' },
      { name: 'Таня Малаховский' },
      { name: 'Римма Фельдман' },
      { name: 'Пинхос Мовсиков' },
      { name: 'Лика Яковис' },
      { name: 'Хана Комаровский' },
    ],
  },
  {
    id: 'silver',
    titleEng: 'Silver Sponsors',
    titleRus: 'Серебряные спонсоры',
    titleHeb: 'נותני חסות כסף',
    subtitle: '$450 & more',
    gradient: 'linear-gradient(135deg, #1a1a1f 0%, #2a2a30 30%, #35353d 60%, #2a2a30 100%)',
    borderColor: '#b0b0b8',
    glowColor: 'rgba(176, 176, 184, 0.25)',
    textColor: '#e8e8f0',
    accentColor: '#c0c0c8',
    iconColor: '#d0d0d8',
    icon: '🥈',
    sponsors: [
      { name: 'Лея Левин' },
      { name: 'Хана Фаерштейн' },
      { name: 'Эмма Аминов' },
      { name: 'Лиза Мовсиков' },
      { name: 'Мирьям Грош' },
      { name: 'Шейна Маор' },
      { name: 'Милка Горбач' },
      { name: 'Мирьям Белинский' },
    ],
  },
  {
    id: 'bronze',
    titleEng: 'Bronze Sponsors',
    titleRus: 'Бронзовые спонсоры',
    titleHeb: 'נותני חסות ארד',
    subtitle: '$250 & more',
    gradient: 'linear-gradient(135deg, #1a1510 0%, #2d2318 30%, #3d2f20 60%, #2d2318 100%)',
    borderColor: '#cd7f32',
    glowColor: 'rgba(205, 127, 50, 0.25)',
    textColor: '#e8a855',
    accentColor: '#cd7f32',
    iconColor: '#cd7f32',
    icon: '🥉',
    sponsors: [
      { name: 'Лана Шалумов' },
      { name: 'Адина Мушинской' },
      { name: 'Люба-Либа Каган' },
      { name: 'Илона Давидоф' },
      { name: 'Сара Тюбис' },
      { name: 'Сара Шафит' },
      { name: 'Лиэль Куравский' },
      { name: 'Мазал Бам' },
      { name: 'Розалия Бухман' },
      { name: 'Ривка Сидоров' },
      { name: 'Малка Школьник' },
      { name: 'Мирьям Александр' },
      { name: 'Злата Окунёв' },
      { name: 'Фрида Эфрос' },
      { name: 'София Болотина' },
      { name: 'Таня Шнайдер' },
      { name: 'Эстер Изман' },
      { name: 'Сара Сарычев' },
      { name: 'Ноа Бейдерман' },
    ],
  },
  {
    id: 'monthly',
    titleEng: 'Monthly Sponsors',
    titleRus: 'Ежемесячные спонсоры',
    titleHeb: 'תורמים חודשיים',
    subtitle: '',
    gradient: 'linear-gradient(135deg, #0f1a2e 0%, #162040 30%, #1a2850 60%, #162040 100%)',
    borderColor: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.25)',
    textColor: '#a5b4fc',
    accentColor: '#818cf8',
    iconColor: '#818cf8',
    icon: '💎',
    sponsors: [
      { name: 'Лана Шалумов' },
      { name: 'Лиза Мовсиков' },
      { name: 'Сара Тюбис' },
      { name: 'Ривка Сидоров' },
      { name: 'Сара Шафит' },
      { name: 'Римма Фельдман' },
      { name: 'Лея Дашевский' },
      { name: 'Клара Ландсман' },
      { name: 'Таня Малоховский' },
      { name: 'Эстер Фрейда Гедзберг' },
      { name: 'Люба-Либа Каган' },
      { name: 'Малка Школьник' },
      { name: 'Ора Шнайдман' },
      { name: 'Лея Левин' },
      { name: 'Фейга-Фаина Гершкович' },
      { name: 'Хана Комаровской' },
      { name: 'Лея Гольдштейн' },
      { name: 'Шейна Маор' },
    ],
  },
];

function SponsorCarousel({ tier }: { tier: SponsorTier }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tier.sponsors.length);
    }, 2500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [tier.sponsors.length]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem 1rem', padding: '1rem 0' }}>
      {tier.sponsors.map((s, i) => {
        const isActive = i === activeIndex;
        return (
          <span
            key={s.name + i}
            style={{
              display: 'inline-block',
              padding: isActive ? '0.4rem 0.9rem' : '0.3rem 0.6rem',
              fontSize: isActive ? '1.15rem' : '0.9rem',
              wordBreak: 'break-word' as const,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? tier.textColor : 'rgba(255,255,255,0.7)',
              background: isActive ? `rgba(255,255,255,0.1)` : 'transparent',
              borderRadius: '12px',
              border: isActive ? `2px solid ${tier.accentColor}` : '2px solid transparent',
              boxShadow: isActive ? `0 0 20px ${tier.glowColor}, 0 0 40px ${tier.glowColor}` : 'none',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isActive ? 'scale(1.15)' : 'scale(1)',
              cursor: 'default',
              fontFamily: 'var(--font-heading)',
              letterSpacing: isActive ? '0.5px' : '0',
            }}
          >
            {s.name}
          </span>
        );
      })}
    </div>
  );
}

export default function SponsorsPage() {
  const { language } = useLanguage();

  const getTitle = (tier: SponsorTier) => {
    if (language === 'rus') return tier.titleRus;
    if (language === 'heb') return tier.titleHeb;
    return tier.titleEng;
  };

  const pageTitle = language === 'rus' ? 'Наши спонсоры' : language === 'heb' ? 'הנותני חסות שלנו' : 'Our Sponsors';
  const pageSubtitle = language === 'rus'
    ? 'Благодарим всех, кто поддерживает нашу организацию!'
    : language === 'heb'
      ? 'תודה לכל מי שתומך בארגון שלנו!'
      : 'Thank you to everyone who supports our organization!';

  return (
    <div className="subpage" style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <style>{`
        @keyframes tier-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .tier-card {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .tier-card:hover {
          transform: translateY(-4px);
        }
        @media (max-width: 640px) {
          .tier-card {
            padding: 1.2rem 0.8rem !important;
            border-radius: 14px !important;
          }
        }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          fontFamily: 'var(--font-heading)',
          color: 'var(--gold, #d4a853)',
          margin: '0 0 0.5rem 0',
        }}>
          {pageTitle}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
          {pageSubtitle}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {tiers.map((tier) => (
          <section
            key={tier.id}
            className="tier-card"
            style={{
              background: tier.gradient,
              borderRadius: '20px',
              border: `2px solid ${tier.borderColor}`,
              padding: '2rem',
              boxShadow: `0 8px 30px ${tier.glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative corner glow */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '150px',
              height: '150px',
              background: `radial-gradient(circle, ${tier.glowColor} 0%, transparent 70%)`,
              animation: 'tier-glow 3s ease-in-out infinite',
              pointerEvents: 'none',
            }} />

            <div style={{ textAlign: 'center', marginBottom: '0.5rem', position: 'relative' }}>
              <span style={{ fontSize: '2.5rem', display: 'inline-block', animation: 'float-icon 3s ease-in-out infinite' }}>
                {tier.icon}
              </span>
              <h2 style={{
                margin: '0.5rem 0 0.25rem 0',
                fontSize: '1.6rem',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                color: tier.textColor,
                letterSpacing: '1px',
              }}>
                {getTitle(tier)}
              </h2>
              {tier.subtitle && (
                <p style={{
                  margin: 0,
                  fontSize: '1rem',
                  color: tier.accentColor,
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}>
                  {tier.subtitle}
                </p>
              )}
            </div>

            <div style={{
              width: '60px',
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${tier.accentColor}, transparent)`,
              margin: '0.75rem auto 0.25rem',
            }} />

            <SponsorCarousel tier={tier} />
          </section>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <a
          href="https://www.paypal.com/donate?hosted_button_id=SWQMA9XCGJKA4"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #d4a853, #f0c674)',
            color: '#1a1612',
            padding: '1rem 2.5rem',
            borderRadius: '30px',
            fontWeight: 700,
            fontSize: '1.1rem',
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(212, 168, 83, 0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
        >
          {language === 'rus' ? '💝 Стать спонсором' : language === 'heb' ? '💝 להפוך לנותן חסות' : '💝 Become a Sponsor'}
        </a>
      </div>
    </div>
  );
}
