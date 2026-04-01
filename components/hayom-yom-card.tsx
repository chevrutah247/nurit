'use client';

import { useEffect, useState } from 'react';

import { useLanguage } from '@/components/language-provider';

type HayomYomData = {
  title: string;
  dateLine: string;
  text: string;
  sourceUrl: string;
};

export function HayomYomCard() {
  const { language } = useLanguage();
  const isRu = language === 'rus';
  const isHebrew = language === 'heb';
  const [data, setData] = useState<HayomYomData | null>(null);

  useEffect(() => {
    let active = true;

    async function loadHayomYom() {
      try {
        const response = await fetch('/api/hayom-yom');
        const payload = await response.json();

        if (!response.ok || !active) return;
        setData(payload);
      } catch {}
    }

    loadHayomYom();
    return () => {
      active = false;
    };
  }, []);

  const title = isRu ? 'Айом Йом' : isHebrew ? 'היום יום' : 'Hayom Yom';
  const sourceLabel = isRu ? 'Источник: Chabad.org' : isHebrew ? 'מקור: Chabad.org' : 'Source: Chabad.org';
  const fallbackText = isRu
    ? 'Ежедневная мысль Айом Йом появится здесь автоматически.'
    : isHebrew
      ? 'קטע היום יום היומי יופיע כאן אוטומטית.'
      : 'The daily Hayom Yom text will appear here automatically.';

  return (
    <div className="hayom-yom-card">
      <div className="hayom-yom-card-header">
        <span className="hayom-yom-card-icon">✦</span>
        <div>
          <h3>{title}</h3>
          {data?.dateLine ? <p>{data.dateLine}</p> : null}
        </div>
      </div>

      <blockquote className="hayom-yom-quote">
        {data?.text || fallbackText}
      </blockquote>

      {data?.sourceUrl ? (
        <a
          href={data.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="hayom-yom-link"
        >
          {sourceLabel}
        </a>
      ) : null}
    </div>
  );
}
