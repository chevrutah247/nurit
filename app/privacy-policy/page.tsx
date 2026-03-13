import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for visitors and form submissions."
};

export default function PrivacyPolicyPage() {
  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">Privacy Policy</p>
        <h1>Privacy information will be placed here before launch.</h1>
        <p>
          This page should explain what visitor data is collected, how forms are
          handled, and who can be contacted about privacy questions.
        </p>
      </section>
    </div>
  );
}
