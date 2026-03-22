'use client';

import { useLanguage } from '@/components/language-provider';

export default function AboutPage() {
  const { copy } = useLanguage();

  return (
    <div className="subpage">
      <h1>{copy.about.title}</h1>
      <section className="page-panel" style={{ marginBottom: 24 }}>
        <h2>{copy.about.missionTitle}</h2>
        <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 20, border: '1px solid rgba(212,168,83,0.2)' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
            <iframe
              src="https://www.youtube.com/embed/j5ZpRe4HZXM"
              title="История организации Russian Junior N'shei Chabad"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
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

      <section className="about-inspiration">
        <div className="about-inspiration-header">
          <p className="eyebrow">{copy.about.inspirationEyebrow}</p>
          <h2>{copy.about.inspirationTitle}</h2>
          <p className="about-inspiration-lead">{copy.about.inspirationLead}</p>
        </div>

        <article className="inspiration-quote">
          <p className="inspiration-quote-text">{copy.about.quote}</p>
          <p className="inspiration-quote-source">{copy.about.quoteSource}</p>
        </article>

        <section className="about-pillars-section">
          <h3>{copy.about.pillarsTitle}</h3>
          <div className="about-pillars">
            {copy.about.pillars.map((pillar) => (
              <article key={pillar.title} className="about-pillar">
                <h4>{pillar.title}</h4>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-quotes-section">
          <h3>{copy.about.quotesTitle}</h3>
          <div className="about-quotes">
            {copy.about.quotes.map((quote) => (
              <article key={quote.text} className="about-quote-card">
                <p className="about-quote-text">{quote.text}</p>
                <p className="about-quote-source">{quote.source}</p>
              </article>
            ))}
          </div>
        </section>

        <article className="about-closing-call">
          <h3>{copy.about.closingTitle}</h3>
          <p>{copy.about.closingText}</p>
        </article>
      </section>
    </div>
  );
}
