'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/language-provider';

interface OmerData {
  dayNumber: number;
  hebrewCount: string;
  weeks: number;
  days: number;
  sefira: string;
  totalDays: 49;
}

// Hebrew number words for Omer count
const hebrewNumbers: Record<number, string> = {
  1: 'יום אחד', 2: 'שני ימים', 3: 'שלשה ימים', 4: 'ארבעה ימים',
  5: 'חמשה ימים', 6: 'ששה ימים', 7: 'שבעה ימים', 8: 'שמונה ימים',
  9: 'תשעה ימים', 10: 'עשרה ימים', 11: 'אחד עשר יום', 12: 'שנים עשר יום',
  13: 'שלשה עשר יום', 14: 'ארבעה עשר יום', 15: 'חמשה עשר יום',
  16: 'ששה עשר יום', 17: 'שבעה עשר יום', 18: 'שמונה עשר יום',
  19: 'תשעה עשר יום', 20: 'עשרים יום', 21: 'אחד ועשרים יום',
  22: 'שנים ועשרים יום', 23: 'שלשה ועשרים יום', 24: 'ארבעה ועשרים יום',
  25: 'חמשה ועשרים יום', 26: 'ששה ועשרים יום', 27: 'שבעה ועשרים יום',
  28: 'שמונה ועשרים יום', 29: 'תשעה ועשרים יום', 30: 'שלשים יום',
  31: 'אחד ושלשים יום', 32: 'שנים ושלשים יום', 33: 'שלשה ושלשים יום',
  34: 'ארבעה ושלשים יום', 35: 'חמשה ושלשים יום', 36: 'ששה ושלשים יום',
  37: 'שבעה ושלשים יום', 38: 'שמונה ושלשים יום', 39: 'תשעה ושלשים יום',
  40: 'ארבעים יום', 41: 'אחד וארבעים יום', 42: 'שנים וארבעים יום',
  43: 'שלשה וארבעים יום', 44: 'ארבעה וארבעים יום', 45: 'חמשה וארבעים יום',
  46: 'ששה וארבעים יום', 47: 'שבעה וארבעים יום', 48: 'שמונה וארבעים יום',
  49: 'תשעה וארבעים יום',
};

// Sefirot combinations
const sefirot: string[][] = [
  // Week 1: Chesed
  ['חסד שבחסד', 'גבורה שבחסד', 'תפארת שבחסד', 'נצח שבחסד', 'הוד שבחסד', 'יסוד שבחסד', 'מלכות שבחסד'],
  // Week 2: Gevurah
  ['חסד שבגבורה', 'גבורה שבגבורה', 'תפארת שבגבורה', 'נצח שבגבורה', 'הוד שבגבורה', 'יסוד שבגבורה', 'מלכות שבגבורה'],
  // Week 3: Tiferet
  ['חסד שבתפארת', 'גבורה שבתפארת', 'תפארת שבתפארת', 'נצח שבתפארת', 'הוד שבתפארת', 'יסוד שבתפארת', 'מלכות שבתפארת'],
  // Week 4: Netzach
  ['חסד שבנצח', 'גבורה שבנצח', 'תפארת שבנצח', 'נצח שבנצח', 'הוד שבנצח', 'יסוד שבנצח', 'מלכות שבנצח'],
  // Week 5: Hod
  ['חסד שבהוד', 'גבורה שבהוד', 'תפארת שבהוד', 'נצח שבהוד', 'הוד שבהוד', 'יסוד שבהוד', 'מלכות שבהוד'],
  // Week 6: Yesod
  ['חסד שביסוד', 'גבורה שביסוד', 'תפארת שביסוד', 'נצח שביסוד', 'הוד שביסוד', 'יסוד שביסוד', 'מלכות שביסוד'],
  // Week 7: Malchut
  ['חסד שבמלכות', 'גבורה שבמלכות', 'תפארת שבמלכות', 'נצח שבמלכות', 'הוד שבמלכות', 'יסוד שבמלכות', 'מלכות שבמלכות'],
];

const sefirotRu: string[][] = [
  ['Хесед в Хеседе', 'Гвура в Хеседе', 'Тиферет в Хеседе', 'Нецах в Хеседе', 'Ход в Хеседе', 'Йесод в Хеседе', 'Малхут в Хеседе'],
  ['Хесед в Гвуре', 'Гвура в Гвуре', 'Тиферет в Гвуре', 'Нецах в Гвуре', 'Ход в Гвуре', 'Йесод в Гвуре', 'Малхут в Гвуре'],
  ['Хесед в Тиферет', 'Гвура в Тиферет', 'Тиферет в Тиферет', 'Нецах в Тиферет', 'Ход в Тиферет', 'Йесод в Тиферет', 'Малхут в Тиферет'],
  ['Хесед в Нецахе', 'Гвура в Нецахе', 'Тиферет в Нецахе', 'Нецах в Нецахе', 'Ход в Нецахе', 'Йесод в Нецахе', 'Малхут в Нецахе'],
  ['Хесед в Ходе', 'Гвура в Ходе', 'Тиферет в Ходе', 'Нецах в Ходе', 'Ход в Ходе', 'Йесод в Ходе', 'Малхут в Ходе'],
  ['Хесед в Йесоде', 'Гвура в Йесоде', 'Тиферет в Йесоде', 'Нецах в Йесоде', 'Ход в Йесоде', 'Йесод в Йесоде', 'Малхут в Йесоде'],
  ['Хесед в Малхут', 'Гвура в Малхут', 'Тиферет в Малхут', 'Нецах в Малхут', 'Ход в Малхут', 'Йесод в Малхут', 'Малхут в Малхут'],
];

const sefirotEn: string[][] = [
  ['Chesed of Chesed', 'Gevurah of Chesed', 'Tiferet of Chesed', 'Netzach of Chesed', 'Hod of Chesed', 'Yesod of Chesed', 'Malchut of Chesed'],
  ['Chesed of Gevurah', 'Gevurah of Gevurah', 'Tiferet of Gevurah', 'Netzach of Gevurah', 'Hod of Gevurah', 'Yesod of Gevurah', 'Malchut of Gevurah'],
  ['Chesed of Tiferet', 'Gevurah of Tiferet', 'Tiferet of Tiferet', 'Netzach of Tiferet', 'Hod of Tiferet', 'Yesod of Tiferet', 'Malchut of Tiferet'],
  ['Chesed of Netzach', 'Gevurah of Netzach', 'Tiferet of Netzach', 'Netzach of Netzach', 'Hod of Netzach', 'Yesod of Netzach', 'Malchut of Netzach'],
  ['Chesed of Hod', 'Gevurah of Hod', 'Tiferet of Hod', 'Netzach of Hod', 'Hod of Hod', 'Yesod of Hod', 'Malchut of Hod'],
  ['Chesed of Yesod', 'Gevurah of Yesod', 'Tiferet of Yesod', 'Netzach of Yesod', 'Hod of Yesod', 'Yesod of Yesod', 'Malchut of Yesod'],
  ['Chesed of Malchut', 'Gevurah of Malchut', 'Tiferet of Malchut', 'Netzach of Malchut', 'Hod of Malchut', 'Yesod of Malchut', 'Malchut of Malchut'],
];

async function getOmerDay(): Promise<OmerData | null> {
  try {
    const res = await fetch(
      'https://www.hebcal.com/hebcal?v=1&cfg=json&maj=off&min=off&mod=off&nx=off&year=now&month=x&ss=off&mf=off&c=off&s=off&omer=on'
    );
    if (!res.ok) return null;

    const data = await res.json();
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const omerItem = (data.items || []).find(
      (item: { category?: string; date?: string; omer?: number }) =>
        item.category === 'omer' && item.date === todayStr
    );

    if (!omerItem || !omerItem.omer) return null;

    const day = omerItem.omer;
    const weeks = Math.floor((day - 1) / 7);
    const remainingDays = (day - 1) % 7;
    const weekIndex = Math.floor((day - 1) / 7);
    const dayIndex = (day - 1) % 7;

    return {
      dayNumber: day,
      hebrewCount: hebrewNumbers[day] || `${day}`,
      weeks,
      days: remainingDays,
      sefira: sefirot[weekIndex]?.[dayIndex] || '',
      totalDays: 49,
    };
  } catch {
    return null;
  }
}

export function OmerCounter() {
  const { language } = useLanguage();
  const isRu = language === 'rus';
  const isHe = language === 'heb';
  const [omer, setOmer] = useState<OmerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOmerDay().then((data) => {
      setOmer(data);
      setLoading(false);
    });
  }, []);

  // Don't render anything if not Omer period or still loading
  if (loading || !omer) return null;

  const weekIndex = Math.floor((omer.dayNumber - 1) / 7);
  const dayIndex = (omer.dayNumber - 1) % 7;
  const sefiraHe = sefirot[weekIndex]?.[dayIndex] || '';
  const sefiraRu = sefirotRu[weekIndex]?.[dayIndex] || '';
  const sefiraEn = sefirotEn[weekIndex]?.[dayIndex] || '';

  const weeksText = omer.weeks > 0
    ? isRu
      ? `${omer.weeks} ${omer.weeks === 1 ? 'неделя' : omer.weeks < 5 ? 'недели' : 'недель'}${omer.days > 0 ? ` и ${omer.days} ${omer.days === 1 ? 'день' : omer.days < 5 ? 'дня' : 'дней'}` : ''}`
      : isHe
        ? `${omer.weeks} ${omer.weeks === 1 ? 'שבוע' : 'שבועות'}${omer.days > 0 ? ` ו-${omer.days} ${omer.days === 1 ? 'יום' : 'ימים'}` : ''}`
        : `${omer.weeks} ${omer.weeks === 1 ? 'week' : 'weeks'}${omer.days > 0 ? ` and ${omer.days} ${omer.days === 1 ? 'day' : 'days'}` : ''}`
    : '';

  const progress = (omer.dayNumber / 49) * 100;

  return (
    <section className="omer-section">
      <div className="omer-card">
        {/* Header */}
        <div className="omer-header">
          <span className="omer-icon">🌾</span>
          <h3 className="omer-title">
            {isRu ? 'Сфират аОмер' : isHe ? 'ספירת העומר' : 'Sefirat HaOmer'}
          </h3>
        </div>

        {/* Day number - big */}
        <div className="omer-day-number">{omer.dayNumber}</div>

        {/* Hebrew count */}
        <p className="omer-hebrew-count" dir="rtl">{`הַיּוֹם ${omer.hebrewCount} לָעוֹמֶר`}</p>

        {/* Weeks breakdown */}
        {weeksText && (
          <p className="omer-weeks">{weeksText}</p>
        )}

        {/* Sefira */}
        <div className="omer-sefira">
          <p className="omer-sefira-he" dir="rtl">{sefiraHe}</p>
          <p className="omer-sefira-local">{isRu ? sefiraRu : sefiraEn}</p>
        </div>

        {/* Progress bar */}
        <div className="omer-progress-track">
          <div className="omer-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="omer-progress-label">
          {isRu ? `${omer.dayNumber} из 49 дней` : isHe ? `${omer.dayNumber} מתוך 49 ימים` : `${omer.dayNumber} of 49 days`}
        </p>
      </div>
    </section>
  );
}
