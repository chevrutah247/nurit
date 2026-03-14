import Link from 'next/link';

import { HeroSlideshow } from '@/components/hero-slideshow';

export default function HomePage() {
  return (
    <div className="page-stack">
      <HeroSlideshow />

      {/* Welcome */}
      <section className="welcome-section">
        <div className="welcome-inner">
          <h2>Welcome to Our Community</h2>
          <p>
            We are a warm and close-knit community of Russian-speaking Jewish women
            in Brooklyn. We organize gatherings, holiday celebrations, learning programs,
            and support one another as a family.
          </p>
        </div>
      </section>

      {/* Quick actions — 3 large cards */}
      <section className="actions-section">
        <div className="actions-inner">
          <div className="actions-grid">
            <Link href="/register" className="action-card">
              <div className="action-icon">&#9997;</div>
              <h3>Register</h3>
              <p>Join our community — simple and quick registration</p>
            </Link>
            <Link href="/annual-event" className="action-card">
              <div className="action-icon">&#127881;</div>
              <h3>Annual Event</h3>
              <p>Our annual women&apos;s gathering — see details and program</p>
            </Link>
            <Link href="/donate" className="action-card">
              <div className="action-icon">&#10084;</div>
              <h3>Donate</h3>
              <p>Support our community programs and events</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="programs-section">
        <div className="programs-inner">
          <h2>Our Programs</h2>
          <div className="programs-grid">
            <div className="program-item">
              <div className="program-icon">&#127867;</div>
              <div>
                <h3>Community Gatherings</h3>
                <p>Regular women&apos;s farbrengens with food, talks, and togetherness</p>
              </div>
            </div>
            <div className="program-item">
              <div className="program-icon">&#128218;</div>
              <div>
                <h3>Learning Programs</h3>
                <p>Torah classes, holiday preparation, and inspirational talks</p>
              </div>
            </div>
            <div className="program-item">
              <div className="program-icon">&#127881;</div>
              <div>
                <h3>Annual Farbrengen</h3>
                <p>Our biggest event of the year — a grand celebration for all women</p>
              </div>
            </div>
            <div className="program-item">
              <div className="program-icon">&#129309;</div>
              <div>
                <h3>Volunteer Support</h3>
                <p>Community outreach, helping families, and supporting those in need</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2>Join Us Today</h2>
          <p>
            Become part of a warm and welcoming community.
            Registration is simple and takes just a minute.
          </p>
          <div className="cta-buttons">
            <Link href="/register" className="button button-light button-large">
              Register Now
            </Link>
            <Link href="/contact" className="button button-light button-large">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
