import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Confirmation page after a registration is sent."
};

export default function ThankYouPage() {
  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">Thank You</p>
        <h1>Your registration has been received.</h1>
        <p>We can customize this page later with email confirmation details.</p>
        <div className="button-row">
          <Link href="/" className="button button-secondary">
            Return Home
          </Link>
        </div>
      </section>
    </div>
  );
}
