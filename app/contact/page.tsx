import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Find contact information and a simple way to reach the organization."
};

export default function ContactPage() {
  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">Contact</p>
        <h1>Every contact option should be easy to notice and easy to tap.</h1>
      </section>

      <section className="page-grid">
        <article className="page-panel">
          <h2>Direct contact</h2>
          <p>Phone: (000) 000-0000</p>
          <p>Email: hello@nurit.org</p>
          <p>Address: Brooklyn, New York</p>
        </article>

        <article className="page-panel">
          <h2>Friendly next step</h2>
          <p>
            This section can later include a contact form, map, WhatsApp, or
            Telegram links.
          </p>
        </article>
      </section>
    </div>
  );
}
