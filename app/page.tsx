import Link from "next/link";

import { Hero } from "@/components/hero";
import { galleryMoments, homeHighlights, services } from "@/content/site";

export default function HomePage() {
  return (
    <div className="page-stack">
      <Hero />

      <section className="grid-three" aria-label="Homepage highlights">
        {homeHighlights.map((item) => (
          <article key={item.title} className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="page-grid">
        <article className="page-panel">
          <p className="eyebrow">Annual Event</p>
          <h2>Keep the familiar structure, but make it easier to use.</h2>
          <p>
            The new website keeps the same main navigation visitors already know,
            while presenting it in larger, clearer blocks.
          </p>
          <div className="button-row">
            <Link href="/annual-event" className="button button-primary">
              View Event
            </Link>
            <Link href="/about" className="button button-secondary">
              Learn More
            </Link>
          </div>
        </article>

        <article className="page-panel">
          <p className="eyebrow">Programs</p>
          <h2>Community support with a warm and readable presentation.</h2>
          <ul>
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="page-panel">
        <p className="eyebrow">Gallery preview</p>
        <h2>Moments the community will want to revisit.</h2>
        <div className="grid-three">
          {galleryMoments.map((moment) => (
            <article key={moment} className="card">
              <h3>{moment}</h3>
              <p>
                Placeholder content for photography, captions, and future event
                collections.
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
