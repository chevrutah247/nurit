'use client';

import { useLanguage } from '@/components/language-provider';

export default function DonatePage() {
  const { copy } = useLanguage();

  return (
    <div className="subpage">
      <h1>{copy.donate.title}</h1>
      <section className="page-panel">
        <h2>{copy.donate.panelTitle}</h2>
        <p>{copy.donate.text}</p>
        <div className="button-row">
          <a href="#" className="button button-primary button-large">
            {copy.donate.amount36}
          </a>
          <a href="#" className="button button-secondary button-large">
            {copy.donate.amount72}
          </a>
          <a href="#" className="button button-gold button-large">
            {copy.donate.amount180}
          </a>
        </div>
      </section>
    </div>
  );
}
