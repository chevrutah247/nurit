import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Annual Event",
  description: "See event details, schedule highlights, and a clear registration path."
};

export default function AnnualEventPage() {
  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">Annual Event</p>
        <h1>The yearly event page should feel calm, special, and very easy to use.</h1>
        <p>
          This page is structured for date, time, location, schedule details, and
          frequently asked questions.
        </p>
        <div className="button-row">
          <Link href="/register" className="button button-primary">
            Register Now
          </Link>
        </div>
      </section>

      <section className="page-grid">
        <article className="page-panel">
          <h2>Information block</h2>
          <p>Date, address, special guests, and key program details appear here.</p>
        </article>

        <article className="page-panel">
          <h2>FAQ block</h2>
          <p>Important practical answers can be shown here in a larger, readable format.</p>
        </article>
      </section>
    </div>
  );
}
