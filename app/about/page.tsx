import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the mission, history, and community role of NURIT."
};

export default function AboutPage() {
  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">About Us</p>
        <h1>A trusted women’s community presented with warmth and clarity.</h1>
        <p>
          This page is designed for the organization story, mission, and history.
          It should build trust quickly and remain easy to read for every age.
        </p>
      </section>

      <section className="page-grid">
        <article className="page-panel">
          <h2>Mission</h2>
          <p>
            Support, inspire, and connect women through meaningful events,
            education, and community care.
          </p>
        </article>

        <article className="page-panel">
          <h2>Why this format works</h2>
          <p>
            The new layout removes clutter, enlarges the content, and keeps every
            important action visible.
          </p>
        </article>
      </section>
    </div>
  );
}
