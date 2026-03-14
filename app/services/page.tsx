'use client';

import { useLanguage } from '@/components/language-provider';

export default function ServicesPage() {
  const { copy } = useLanguage();

  return (
    <div className="subpage">
      <h1>{copy.services.title}</h1>

      <div className="page-grid">
        <article className="page-panel">
          <h2>{copy.services.gatheringTitle}</h2>
          <p>{copy.services.gatheringText}</p>
        </article>

        <article className="page-panel">
          <h2>{copy.services.learningTitle}</h2>
          <p>{copy.services.learningText}</p>
        </article>

        <article className="page-panel">
          <h2>{copy.services.annualTitle}</h2>
          <p>{copy.services.annualText}</p>
        </article>

        <article className="page-panel">
          <h2>{copy.services.supportTitle}</h2>
          <p>{copy.services.supportText}</p>
        </article>
      </div>
    </div>
  );
}
