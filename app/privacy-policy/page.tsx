'use client';

import { useLanguage } from '@/components/language-provider';

export default function PrivacyPolicyPage() {
  const { copy } = useLanguage();

  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">{copy.privacy.eyebrow}</p>
        <h1>{copy.privacy.title}</h1>
        <p>{copy.privacy.text}</p>
      </section>
    </div>
  );
}
