import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">Page Not Found</p>
        <h1>This page could not be found.</h1>
        <p>The main navigation is always available to help visitors return easily.</p>
        <div className="button-row">
          <Link href="/" className="button button-primary">
            Go to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
