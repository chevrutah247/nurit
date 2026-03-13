import Link from "next/link";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Clear navigation. Warm design. Easy registration.</p>
        <h1>Everything important should be visible immediately.</h1>
        <p className="lead">
          The new NURIT homepage is being built with one goal in mind: older
          women should be able to read, understand, and use it without effort.
        </p>
        <div className="hero-summary">
          <div className="summary-chip">Large text on every screen</div>
          <div className="summary-chip">Simple menu with no confusion</div>
          <div className="summary-chip">Easy path to register</div>
        </div>
        <div className="hero-actions">
          <Link href="/register" className="button button-primary">
            Register
          </Link>
          <Link href="/donate" className="button button-secondary">
            Donate
          </Link>
        </div>
      </div>

      <div className="hero-card" aria-label="Project goals">
        <p className="hero-card-label">Next community event</p>
        <h2 className="hero-side-title">Annual Women&apos;s Gathering</h2>
        <div className="hero-detail-list">
          <p><strong>Date:</strong> To be announced</p>
          <p><strong>Location:</strong> Brooklyn, New York</p>
          <p><strong>Focus:</strong> Inspiration, connection, and community</p>
        </div>
        <Link href="/annual-event" className="button button-secondary button-full-mobile">
          View Event Details
        </Link>
      </div>
    </section>
  );
}
