'use client';

import Link from 'next/link';

import { useLanguage } from '@/components/language-provider';

export default function ThankYouPage() {
  const { copy } = useLanguage();

  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">{copy.thankYou.eyebrow}</p>
        <h1>{copy.thankYou.title}</h1>
        <p>{copy.thankYou.text}</p>
        <div className="button-row">
          <Link href="/" className="button button-secondary">
            {copy.thankYou.returnHome}
          </Link>
        </div>
      </section>
    </div>
  );
}
