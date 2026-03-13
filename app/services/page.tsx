import type { Metadata } from "next";

import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Browse the organization’s programs, gatherings, and community support."
};

export default function ServicesPage() {
  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">Services</p>
        <h1>Programs should be visible immediately, with no hidden navigation.</h1>
      </section>

      <section className="grid-three">
        {services.map((service) => (
          <article key={service} className="card">
            <h3>{service}</h3>
            <p>
              This card can later include schedules, descriptions, coordinators,
              and registration links.
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
