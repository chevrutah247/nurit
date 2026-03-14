'use client';

import Link from 'next/link';

import { useLanguage } from '@/components/language-provider';

export default function AnnualEventPage() {
  const { copy } = useLanguage();

  return (
    <div className="subpage">
      <h1>{copy.annual.title}</h1>

      <section className="page-panel" style={{ marginBottom: 24 }}>
        <h2>{copy.annual.detailsTitle}</h2>
        <p style={{ fontSize: '1.2rem' }}><strong>{copy.annual.date}:</strong> {copy.annual.dateValue}</p>
        <p style={{ fontSize: '1.2rem' }}><strong>{copy.annual.location}:</strong> {copy.annual.locationValue}</p>
        <p style={{ fontSize: '1.2rem' }}><strong>{copy.annual.focus}:</strong> {copy.annual.focusValue}</p>
        <div className="button-row">
          <Link href="/register" className="button button-primary button-large">
            {copy.annual.register}
          </Link>
        </div>
      </section>

      <section className="page-grid">
        <article className="page-panel">
          <h2>{copy.annual.expectTitle}</h2>
          <p>{copy.annual.expectText}</p>
        </article>

        <article className="page-panel">
          <h2>{copy.annual.questionsTitle}</h2>
          <p>{copy.annual.questionsText}</p>
        </article>
      </section>
    </div>
  );
}
