'use client';

import { useEffect, useState } from 'react';

import { useLanguage } from '@/components/language-provider';

const STORAGE = 'https://yvgcxmqgvxlvbxsszqcc.supabase.co/storage/v1/object/public/pdfs/uploads';

const nossiPdfs: Record<number, string> = {
  1: STORAGE + '/Nossi-1-Nissan-1--1773976918697-mpkkpe.pdf',
  2: STORAGE + '/Nosi-Nissan-4-1773977063823-owf7mj.pdf',
  3: STORAGE + '/nossi-nissan-3.pdf',
  4: STORAGE + '/nossi-nissan-4.pdf',
  5: STORAGE + '/nossi-nissan-5.pdf',
  6: STORAGE + '/nossi-nissan-6.pdf',
  8: STORAGE + '/nossi-nissan-8.pdf',
  9: STORAGE + '/nossi-nissan-9.pdf',
  10: STORAGE + '/nossi-nissan-10.pdf',
  11: STORAGE + '/nossi-nissan-11.pdf',
  12: STORAGE + '/nossi-nissan-12.pdf',
};

export function NossiBanner() {
  const { language } = useLanguage();
  const [nossiDay, setNossiDay] = useState<number | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const isRu = language === 'rus';
  const isHebrew = language === 'heb';

  useEffect(() => {
    const today = new Date();
    const seasonalCutoff = new Date(today.getFullYear(), 3, 13, 23, 59, 59);

    if (today > seasonalCutoff) {
      return;
    }

    fetch(
      `https://www.hebcal.com/converter?cfg=json&gy=${today.getFullYear()}&gm=${today.getMonth() + 1}&gd=${today.getDate()}&g2h=1`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.hm === 'Nisan' && data.hd >= 1 && data.hd <= 12) {
          setNossiDay(data.hd);
          setPdfUrl(nossiPdfs[data.hd] ?? 'https://shabbathub.com');
        }
      })
      .catch(() => {});
  }, []);

  if (!nossiDay) return null;

  const title = isRu
    ? `Сегодня читаем Носси ${nossiDay}`
    : isHebrew
      ? `היום קוראים נשיא ${nossiDay}`
      : `Today we read Nossi ${nossiDay}`;

  const description = isRu
    ? 'С 1 по 12 Ниссана каждый день читаем Носси текущего дня.'
    : isHebrew
      ? 'מא׳ עד י״ב ניסן קוראים בכל יום את הנשיא של אותו יום.'
      : 'From 1 to 12 Nissan, we read the Nossi of the day.';

  return (
    <section className="nossi-strip-section">
      <a
        href={pdfUrl ?? 'https://shabbathub.com'}
        target="_blank"
        rel="noreferrer"
        className="nossi-strip"
        role="complementary"
        aria-label={title}
      >
        <div className="nossi-strip-copy">
          <span className="nossi-strip-kicker">Shabbathub.com</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </a>
    </section>
  );
}
