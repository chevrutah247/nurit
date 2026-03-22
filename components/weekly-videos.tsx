'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/language-provider';
import { taharasVideos, sichaByParsha, maimarByParsha, roshChodeshVideos, specialDates } from '@/content/video-data';

interface VideoBlockProps {
  title: string;
  subtitle?: string;
  videoId: string | null;
}

function VideoBlock({ title, subtitle, videoId }: VideoBlockProps) {
  if (!videoId) return null;
  return (
    <div style={{ flex: 1, minWidth: 200 }}>
      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--gold, #d4a853)',
        textAlign: 'center', marginBottom: 4, fontWeight: 700,
      }}>
        {title}
      </h3>
      <p style={{ textAlign: 'center', color: '#8a7a5a', fontSize: 12, marginBottom: 6, minHeight: 18 }}>
        {subtitle || '\u00A0'}
      </p>
      <div style={{
        borderRadius: 12, overflow: 'hidden',
        border: '1px solid rgba(212,168,83,0.2)',
        aspectRatio: '16/9',
        position: 'relative',
      }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    </div>
  );
}

// Map hebcal parsha names to our keys
const parshaAliases: Record<string, string> = {
  'Bereishit': 'Bereishit', 'Noach': 'Noach', 'Lech-Lecha': 'Lech-Lecha',
  'Vayera': 'Vayera', 'Chayei Sarah': 'Chayei Sarah', 'Toldot': 'Toldot',
  'Vayetzei': 'Vayetzei', 'Vayishlach': 'Vayishlach', 'Vayeshev': 'Vayeshev',
  'Miketz': 'Miketz', 'Vayigash': 'Vayigash', 'Vayechi': 'Vayechi',
  'Shemot': 'Shemot', 'Vaera': 'Vaera', 'Bo': 'Bo',
  'Beshalach': 'Beshalach', 'Yitro': 'Yitro', 'Mishpatim': 'Mishpatim',
  'Terumah': 'Terumah', 'Tetzaveh': 'Tetzaveh', 'Ki Tisa': 'Ki Tisa',
  'Vayakhel': 'Vayakhel', 'Pekudei': 'Pekudei',
  'Vayikra': 'Vayikra', 'Tzav': 'Tzav', 'Shmini': 'Shmini',
  'Tazria': 'Tazria', 'Metzora': 'Metzora',
  'Achrei Mot': 'Achrei Mot', 'Kedoshim': 'Kedoshim',
  'Emor': 'Emor', 'Behar': 'Behar', 'Bechukotai': 'Bechukotai',
  'Bamidbar': 'Bamidbar', 'Nasso': 'Nasso',
  "Beha'alotcha": "Beha'alotcha", "Sh'lach": "Sh'lach",
  'Korach': 'Korach', 'Chukat': 'Chukat', 'Balak': 'Balak',
  'Pinchas': 'Pinchas', 'Matot': 'Matot', 'Masei': 'Masei',
  'Devarim': 'Devarim', 'Vaetchanan': 'Vaetchanan', 'Eikev': 'Eikev',
  "Re'eh": "Re'eh", 'Shoftim': 'Shoftim',
  'Ki Teitzei': 'Ki Teitzei', 'Ki Tavo': 'Ki Tavo',
  'Nitzavim': 'Nitzavim', 'Vayeilech': 'Vayeilech',
  "Ha'azinu": "Ha'azinu", 'Vezot Habracha': 'Vezot Habracha',
};

const monthNamesRu: Record<string, string> = {
  Nisan: 'Нисан', Iyyar: 'Ияр', Sivan: 'Сиван', Tamuz: 'Тамуз',
  Av: 'Ав', Elul: 'Элуль', Tishrei: 'Тишрей', Cheshvan: 'Хешван',
  Kislev: 'Кислев', Tevet: 'Тевет', "Sh'vat": 'Шват', Shvat: 'Шват',
  Adar: 'Адар',
};

function getVideoForTimeSlot(videos: string[], windowStartMs: number, windowEndMs: number, nowMs: number): { videoId: string; partNum: number; totalParts: number } {
  const total = videos.length;
  const windowDuration = windowEndMs - windowStartMs;
  const slotDuration = windowDuration / total;
  const elapsed = nowMs - windowStartMs;
  const idx = Math.min(Math.floor(elapsed / slotDuration), total - 1);
  return { videoId: videos[Math.max(0, idx)], partNum: idx + 1, totalParts: total };
}

export function WeeklyVideos() {
  const { language } = useLanguage();
  const isRu = language === 'rus';

  const [parshaName, setParshaName] = useState('');
  const [taharasVideoId, setTaharasVideoId] = useState<string | null>(null);
  const [taharasPart, setTaharasPart] = useState(1);
  const [sichaVideoId, setSichaVideoId] = useState<string | null>(null);
  const [sichaPart, setSichaPart] = useState({ num: 1, total: 1 });
  const [block3VideoId, setBlock3VideoId] = useState<string | null>(null);
  const [block3Title, setBlock3Title] = useState('');
  const [block3Part, setBlock3Part] = useState({ num: 1, total: 1 });

  useEffect(() => {
    async function load() {
      const now = new Date();

      // 1. Taharas — daily rotation
      const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
      const tIdx = dayOfYear % taharasVideos.length;
      setTaharasVideoId(taharasVideos[tIdx]);
      setTaharasPart(tIdx + 1);

      // 2. Get current parsha from Hebcal
      try {
        const res = await fetch(
          `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=off&min=off&mod=off&nx=off&year=${now.getFullYear()}&month=${now.getMonth() + 1}&ss=off&mf=off&c=off&s=on`
        );
        if (!res.ok) return;
        const data = await res.json();
        const today = new Date(); today.setHours(0, 0, 0, 0);

        const upcoming = data.items
          ?.filter((item: any) => item.category === 'parashat')
          ?.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
          ?.find((item: any) => {
            const d = new Date(item.date); d.setHours(0, 0, 0, 0);
            return d >= today;
          });

        if (upcoming) {
          const name = upcoming.title?.replace('Parashat ', '');
          const key = parshaAliases[name] || name;
          setParshaName(name);

          // Calculate weekly window: Saturday 22:00 to Friday 16:00
          const shabbatDate = new Date(upcoming.date);
          const prevShabbat = new Date(shabbatDate);
          prevShabbat.setDate(prevShabbat.getDate() - 7);
          prevShabbat.setHours(22, 0, 0, 0);
          const fridayEnd = new Date(shabbatDate);
          fridayEnd.setDate(fridayEnd.getDate() - 1);
          fridayEnd.setHours(16, 0, 0, 0);

          const nowMs = now.getTime();
          const startMs = prevShabbat.getTime();
          const endMs = fridayEnd.getTime();

          // Sicha
          const sichaVideos = sichaByParsha[key] || sichaByParsha[name];
          if (sichaVideos && sichaVideos.length > 0) {
            const s = getVideoForTimeSlot(sichaVideos, startMs, endMs, nowMs);
            setSichaVideoId(s.videoId);
            setSichaPart({ num: s.partNum, total: s.totalParts });
          }

          // Block 3: check special dates / rosh chodesh / maimar
          let block3Set = false;

          // Check Hebrew date for special dates & rosh chodesh
          try {
            const dateRes = await fetch(
              `https://www.hebcal.com/converter?cfg=json&gy=${now.getFullYear()}&gm=${now.getMonth() + 1}&gd=${now.getDate()}&g2h=1`
            );
            if (dateRes.ok) {
              const hDate = await dateRes.json();
              const hDay = hDate.hd;
              const hMonth = hDate.hm;

              // Check special dates (3 days before)
              for (const sd of specialDates) {
                if (hMonth === sd.hebrewMonth || monthNamesRu[hMonth] === sd.hebrewMonth) {
                  const daysUntil = sd.hebrewDay - hDay;
                  if (daysUntil >= 0 && daysUntil <= 3) {
                    setBlock3VideoId(sd.videos[0]);
                    setBlock3Title(sd.name);
                    setBlock3Part({ num: 1, total: sd.videos.length });
                    block3Set = true;
                    break;
                  }
                }
              }

              // Check Rosh Chodesh (3 days before = day 27-30 of month)
              if (!block3Set) {
                const daysInMonth = 30; // approximate
                const daysUntilRC = daysInMonth - hDay;
                if (daysUntilRC >= 0 && daysUntilRC <= 3) {
                  // Find next month's videos
                  const monthOrder = ['Tishrei', 'Cheshvan', 'Kislev', 'Tevet', "Sh'vat", 'Adar', 'Nisan', 'Iyyar', 'Sivan', 'Tamuz', 'Av', 'Elul'];
                  const curIdx = monthOrder.indexOf(hMonth);
                  const nextMonth = monthOrder[(curIdx + 1) % 12] || '';
                  // Try matching
                  for (const [rcMonth, rcVideos] of Object.entries(roshChodeshVideos)) {
                    if (nextMonth.includes(rcMonth) || rcMonth.includes(nextMonth) || nextMonth === rcMonth) {
                      const rv = getVideoForTimeSlot(rcVideos, startMs, endMs, nowMs);
                      setBlock3VideoId(rv.videoId);
                      setBlock3Title(`${isRu ? 'Рош Ходеш' : 'Rosh Chodesh'} ${isRu ? (monthNamesRu[nextMonth] || rcMonth) : rcMonth}`);
                      setBlock3Part({ num: rv.partNum, total: rv.totalParts });
                      block3Set = true;
                      break;
                    }
                  }
                }
              }
            }
          } catch {}

          // Default: Maimar
          if (!block3Set) {
            const maimarVideos = maimarByParsha[key] || maimarByParsha[name];
            if (maimarVideos && maimarVideos.length > 0) {
              const m = getVideoForTimeSlot(maimarVideos, startMs, endMs, nowMs);
              setBlock3VideoId(m.videoId);
              setBlock3Title(isRu ? 'Маймер Ребе' : 'Maimar');
              setBlock3Part({ num: m.partNum, total: m.totalParts });
            } else {
              setBlock3Title(isRu ? 'Маймер Ребе' : 'Maimar');
            }
          }
        }
      } catch (err) {
        console.error('WeeklyVideos error:', err);
      }
    }
    load();
  }, [isRu]);

  const hasAnyVideo = taharasVideoId || sichaVideoId || block3VideoId;
  if (!hasAnyVideo) return null;

  return (
    <div>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gold, #d4a853)',
        textAlign: 'center', marginBottom: '1rem',
      }}>
        🎬 {isRu ? 'Видео уроки' : 'Video Lessons'}
      </h2>
      <div style={{
        display: 'flex', gap: '1rem', flexWrap: 'wrap',
      }}>
        <VideoBlock
          title="Taharas Mishpocha"
          subtitle={`${isRu ? 'Часть' : 'Part'} ${taharasPart}/9`}
          videoId={taharasVideoId}
        />
        <VideoBlock
          title={`${isRu ? 'Сиха Ребе' : 'Sicha'}`}
          subtitle={parshaName ? `${parshaName}${sichaPart.total > 1 ? ` (${sichaPart.num}/${sichaPart.total})` : ''}` : undefined}
          videoId={sichaVideoId}
        />
        <VideoBlock
          title={block3Title || (isRu ? 'Маймер Ребе' : 'Maimar')}
          subtitle={parshaName && block3Title === (isRu ? 'Маймер Ребе' : 'Maimar')
            ? `${parshaName}${block3Part.total > 1 ? ` (${block3Part.num}/${block3Part.total})` : ''}`
            : block3Part.total > 1 ? `(${block3Part.num}/${block3Part.total})` : undefined}
          videoId={block3VideoId}
        />
      </div>
    </div>
  );
}
