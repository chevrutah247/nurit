import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support women’s programs and annual events with a simple donation page."
};

export default function DonatePage() {
  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">Donate</p>
        <h1>Give support in a way that feels simple and trustworthy.</h1>
        <p>
          This page will later connect to the real payment provider. For now it
          shows the structure: clear purpose, visible amounts, and no confusion.
        </p>
        <div className="button-row">
          <a href="#" className="button button-primary">
            Donate $36
          </a>
          <a href="#" className="button button-secondary">
            Donate $72
          </a>
          <a href="#" className="button button-secondary">
            Donate $180
          </a>
        </div>
      </section>
    </div>
  );
}
