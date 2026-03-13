import Link from "next/link";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Clear navigation. Warm design. Easy registration.</p>
        <h1>A calm, modern website for women who want everything visible at a glance.</h1>
        <p className="lead">
          This first version keeps the familiar menu from the current site while
          making every page larger, cleaner, and easier to use.
        </p>
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
        <p className="hero-card-label">Project focus</p>
        <ul>
          <li>Large text without squinting</li>
          <li>Simple menu with no confusing layers</li>
          <li>Google-friendly technical structure</li>
          <li>Fast deployment on Vercel via GitHub</li>
        </ul>
      </div>
    </section>
  );
}
