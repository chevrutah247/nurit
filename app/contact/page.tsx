'use client';

import { useLanguage } from '@/components/language-provider';

export default function ContactPage() {
  const { copy } = useLanguage();

  return (
    <div className="subpage">
      <h1>{copy.contact.title}</h1>

      <section className="page-grid">
        <article className="page-panel">
          <h2>{copy.contact.touchTitle}</h2>
          <p style={{ fontSize: '1.2rem' }}>Phone: (000) 000-0000</p>
          <p style={{ fontSize: '1.2rem' }}>Email: rjnsheichabad@gmail.com</p>
          <p style={{ fontSize: '1.2rem' }}>{copy.contact.location}</p>
        </article>

        <article className="page-panel">
          <h2>{copy.contact.visitTitle}</h2>
          <p>{copy.contact.visitText}</p>
        </article>
      </section>
    </div>
  );
}
