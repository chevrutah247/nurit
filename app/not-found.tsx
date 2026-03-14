'use client';

import Link from 'next/link';

import { useLanguage } from '@/components/language-provider';

export default function NotFound() {
  const { copy } = useLanguage();

  return (
    <div className="page-stack">
      <section className="page-panel">
        <p className="eyebrow">{copy.notFound.eyebrow}</p>
        <h1>{copy.notFound.title}</h1>
        <p>{copy.notFound.text}</p>
        <div className="button-row">
          <Link href="/" className="button button-primary">
            {copy.nav.home}
          </Link>
        </div>
      </section>
    </div>
  );
}
