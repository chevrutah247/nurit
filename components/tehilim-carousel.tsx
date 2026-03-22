'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/language-provider';

const list1 = [
  { chapters: '1-10', name: 'Рахель Фейгин' },
  { chapters: '20', name: 'Таня Федоровский' },
  { chapters: '11-19', name: 'Эстер Фридман' },
  { chapters: '21-25', name: 'Мазаль Бам' },
  { chapters: '26-35', name: 'Хана Фаерштейн' },
  { chapters: '36', name: 'Таня Малоховский' },
  { chapters: '37-41', name: 'Марина Сагинор' },
  { chapters: '42-46', name: 'Лиза Мовсикова' },
  { chapters: '47-50', name: 'Сара Шафит' },
  { chapters: '51-56', name: 'Нурит Сарычев' },
  { chapters: '57-66', name: 'Римма Фельдман' },
  { chapters: '67-71', name: 'Малка Динерман' },
  { chapters: '72-74', name: 'Ривка Сидоров' },
  { chapters: '75-79', name: 'Роза Бухман' },
  { chapters: '80-84', name: 'Гилит Гольдштейн' },
  { chapters: '85-90', name: 'Геула Кофман' },
  { chapters: '91-99', name: 'Эстер Гедзберг' },
  { chapters: '100-109', name: 'Адина Якубов' },
  { chapters: '110-111', name: 'Хая Явич' },
  { chapters: '112', name: 'Егудис-Х. Товштейн' },
  { chapters: '113-118', name: 'Хана Волков' },
  { chapters: '119', name: 'Шейндл Сирота' },
  { chapters: '120-125', name: 'Нурит Сарычев' },
  { chapters: '126', name: 'Егудис-Х. Товштейн' },
  { chapters: '127-129', name: 'Лена Дубинский' },
  { chapters: '130-145', name: 'Зива Гавриелов' },
  { chapters: '146-150', name: 'Х.-Р. Духовный' },
];

const list2 = [...list1]; // Same as list 1 for Shabbat Mevorchim

const list3 = [
  { chapters: '1-5', name: 'Хана Вайсер' },
  { chapters: '6-10', name: 'Шейна Прус' },
  { chapters: '11-13', name: 'Брурия Баташ' },
  { chapters: '14-15', name: 'Вера Товштейн' },
  { chapters: '16-18', name: 'Дина Вишневский' },
  { chapters: '19-23', name: 'Рейзл Гафт' },
  { chapters: '24-30', name: 'Клара Ландсман' },
  { chapters: '31-37', name: 'Ривка Торенгейм' },
  { chapters: '38-47', name: 'Йохевед Борухов' },
  { chapters: '48', name: 'Штерна Сирота' },
  { chapters: '49-50', name: 'Рина Шакаров' },
  { chapters: '51-57', name: 'Лея-Б. Кокин' },
  { chapters: '58-67', name: 'Хана Комаровский' },
  { chapters: '68', name: 'Рина Шакаров' },
  { chapters: '69-71', name: 'Лиора Койфман' },
  { chapters: '72-81', name: 'Шуламис Блох' },
  { chapters: '82-89', name: 'Сарра Сирота' },
  { chapters: '90-99', name: 'Ривка Парнас' },
  { chapters: '100-109', name: 'Зива Эйндзваг' },
  { chapters: '110-118', name: 'Лея Гольдштейн' },
  { chapters: '119', name: 'Нехама Цацкес' },
  { chapters: '120-124', name: 'Мейрав Товитоу' },
  { chapters: '125-127', name: 'М. Белинский' },
  { chapters: '128-132', name: 'Таня Цвик' },
  { chapters: '133-149', name: 'Эти Борухов' },
  { chapters: '150', name: 'Ривко Тиферет' },
];

const monthNamesRu: Record<string, string> = {
  Nisan: 'Нисан', Iyyar: 'Ияр', Sivan: 'Сиван', Tamuz: 'Тамуз',
  Av: 'Ав', Elul: 'Элуль', Tishrei: 'Тишрей', Cheshvan: 'Хешван',
  Kislev: 'Кислев', Tevet: 'Тевет', "Sh'vat": 'Шват', Shvat: 'Шват',
  Adar: 'Адар', 'Adar I': 'Адар I', 'Adar II': 'Адар II',
};

interface ListData {
  title: string;
  titleEn: string;
  items: typeof list1;
}

export function TehilimCarousel() {
  const { language } = useLanguage();
  const isRu = language === 'rus';
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextMonth, setNextMonth] = useState('');
  const [mevarchimDate, setMevarchimDate] = useState('');

  // Fetch next Hebrew month for Shabbat Mevorchim
  useEffect(() => {
    async function fetchData() {
      try {
        const today = new Date();
        const res = await fetch(
          `https://www.hebcal.com/converter?cfg=json&gy=${today.getFullYear()}&gm=${today.getMonth() + 1}&gd=${today.getDate()}&g2h=1`
        );
        if (!res.ok) return;
        const data = await res.json();

        // Get upcoming Shabbat Mevorchim from hebcal events
        const evRes = await fetch(
          `https://www.hebcal.com/hebcal?v=1&cfg=json&maj=off&min=off&mod=off&nx=off&year=${today.getFullYear()}&month=x&ss=off&mf=on&c=off&s=off`
        );
        if (evRes.ok) {
          const evData = await evRes.json();
          const mevorchim = (evData.items || [])
            .filter((item: any) => item.title?.includes('Shabbat Mevarchim'))
            .map((item: any) => ({ title: item.title, date: item.date }))
            .filter((item: any) => new Date(item.date) >= today)
            .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

          if (mevorchim.length > 0) {
            const m = mevorchim[0];
            const monthName = m.title.replace('Shabbat Mevarchim Chodesh ', '');
            setNextMonth(monthName);
            setMevarchimDate(new Date(m.date).toLocaleDateString(isRu ? 'ru-RU' : 'en-US', {
              day: 'numeric', month: 'long', year: 'numeric',
            }));
          }
        }
      } catch {}
    }
    fetchData();
  }, [isRu]);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(i => (i + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const monthRu = nextMonth ? (monthNamesRu[nextMonth] || nextMonth) : '';
  const lists: ListData[] = [
    {
      title: monthRu ? `שבת מברכים חודש — ${monthRu}` : 'שבת מברכים — Список 1',
      titleEn: nextMonth ? `Shabbat Mevorchim Chodesh ${nextMonth} — List 1` : 'Shabbat Mevorchim — List 1',
      items: list1,
    },
    {
      title: monthRu ? `שבת מברכים חודש — ${monthRu}` : 'שבת מברכים — Список 2',
      titleEn: nextMonth ? `Shabbat Mevorchim Chodesh ${nextMonth} — List 2` : 'Shabbat Mevorchim — List 2',
      items: list2,
    },
    {
      title: monthRu ? `שבת מברכים חודש — ${monthRu}` : 'שבת מברכים — Список 3',
      titleEn: nextMonth ? `Shabbat Mevorchim Chodesh ${nextMonth} — List 3` : 'Shabbat Mevorchim — List 3',
      items: list3,
    },
  ];

  const current = lists[activeIndex];

  return (
    <div style={{
      background: 'var(--bg-alt, rgba(255,255,255,0.04))',
      border: '1px solid rgba(212,168,83,0.2)',
      borderRadius: 16,
      padding: '0.75rem 1rem',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '0.4rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gold, #d4a853)', marginBottom: 2 }}>
          📖 {isRu ? 'Тегилим' : 'Tehilim'}
        </h3>
        <p style={{ color: '#8a7a5a', fontSize: 11, fontWeight: 600 }}>
          {isRu ? current.title : current.titleEn}
        </p>
        {mevarchimDate && (
          <p style={{ color: '#a08a5a', fontSize: 11, marginTop: 2 }}>
            {isRu ? 'Шаббат Мевархим: ' : 'Shabbat Mevorchim: '}{mevarchimDate}
          </p>
        )}
        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 4 }}>
          {[0, 1, 2].map(i => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: i === activeIndex ? 'var(--gold, #d4a853)' : 'rgba(212,168,83,0.2)',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
      </div>

      {/* List */}
      <div style={{
        maxHeight: 500, overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 2,
      }}>
        {current.items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '4px 8px', borderRadius: 6,
            background: i % 2 === 0 ? 'rgba(212,168,83,0.06)' : 'transparent',
          }}>
            <span style={{ color: 'var(--gold, #d4a853)', fontSize: 13, fontWeight: 700, minWidth: 60 }}>
              {item.chapters}
            </span>
            <span style={{ color: '#4a3f2f', fontSize: 13, fontWeight: 500, textAlign: 'right', flex: 1 }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
