'use client';

import { useLanguage } from '@/components/language-provider';

export default function AboutPage() {
  const { copy } = useLanguage();

  return (
    <div className="subpage">
      <h1>{copy.about.title}</h1>
      <section className="page-panel" style={{ marginBottom: 24 }}>
        <h2>{copy.about.missionTitle}</h2>
        <p>{copy.about.missionText}</p>
      </section>

      <section className="page-grid">
        <article className="page-panel">
          <h2>{copy.about.whatWeDoTitle}</h2>
          <p>{copy.about.whatWeDoText}</p>
        </article>

        <article className="page-panel">
          <h2>{copy.about.whoWeServeTitle}</h2>
          <p>{copy.about.whoWeServeText}</p>
        </article>
      </section>
    </div>
  );
}
