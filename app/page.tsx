import Link from "next/link";

import { Hero } from "@/components/hero";
import { galleryMoments, homeHighlights, services } from "@/content/site";

export default function HomePage() {
  return (
    <div className="page-stack">
      <Hero />

      <section className="page-panel home-intro">
        <div>
          <p className="eyebrow">Quick Navigation</p>
          <h2>A more organized homepage starts with fewer choices at a time.</h2>
        </div>
        <div className="action-grid" aria-label="Main actions">
          <Link href="/register" className="action-card action-card-primary">
            <span className="action-card-title">Register</span>
            <span className="action-card-copy">Open the simple registration form</span>
          </Link>
          <Link href="/annual-event" className="action-card">
            <span className="action-card-title">Annual Event</span>
            <span className="action-card-copy">See date, details, and program information</span>
          </Link>
          <Link href="/donate" className="action-card">
            <span className="action-card-title">Donate</span>
            <span className="action-card-copy">Support the women&apos;s community programs</span>
          </Link>
          <Link href="/contact" className="action-card">
            <span className="action-card-title">Contact</span>
            <span className="action-card-copy">Call, email, or send a message</span>
          </Link>
        </div>
      </section>

      <section className="info-band" aria-label="Homepage highlights">
        {homeHighlights.map((item) => (
          <article key={item.title} className="info-band-item">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="page-grid home-feature-grid">
        <article className="page-panel">
          <p className="eyebrow">Annual Event</p>
          <h2>Keep the familiar navigation, but make every next step obvious.</h2>
          <p>
            Visitors should immediately understand where to click for event
            details, registration, donations, or contact information.
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
          <h2>Community programs presented in a calmer, cleaner format.</h2>
          <ul className="structured-list">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="page-grid">
        <article className="page-panel">
          <p className="eyebrow">Why This Layout Works</p>
          <h2>The page now follows a clearer reading order.</h2>
          <div className="structured-list">
            <p>1. The first screen shows the two most important actions.</p>
            <p>2. The next block shows only four large choices.</p>
            <p>3. Information sections are grouped instead of scattered.</p>
            <p>4. The gallery stays lower on the page as secondary content.</p>
          </div>
        </article>

        <article className="page-panel">
          <p className="eyebrow">Gallery Preview</p>
          <h2>Photos should support the page, not compete with navigation.</h2>
          <div className="gallery-preview-list">
            {galleryMoments.map((moment) => (
              <div key={moment} className="gallery-preview-item">
                <strong>{moment}</strong>
                <span>Large images and simple captions can go here.</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="page-panel home-cta">
        <p className="eyebrow">Main Action</p>
        <h2>If someone visits the site for the event, registration should never feel hidden.</h2>
        <p>
          This section keeps one strong call to action visible near the bottom of
          the homepage as well.
        </p>
        <div className="button-row">
          <Link href="/register" className="button button-primary">
            Go to Registration
          </Link>
          <Link href="/contact" className="button button-secondary">
            Ask a Question
          </Link>
        </div>
      </section>
    </div>
  );
}
