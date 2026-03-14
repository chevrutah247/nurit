'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useLanguage } from '@/components/language-provider';
import { SubscribeCard } from '@/components/subscribe-card';

export default function PartnersPage() {
  const { copy } = useLanguage();

  return (
    <div className="subpage">
      <h1>{copy.partners.title}</h1>

      <section className="page-panel partners-hero">
        <div className="partners-hero-copy">
          <p className="eyebrow">{copy.partners.title}</p>
          <h2>{copy.partners.introTitle}</h2>
          <p>{copy.partners.introText}</p>
        </div>
        <div className="partners-brand-card">
          <Image
            src="/images/edonthego-logo.png"
            alt="Education On The Go"
            width={300}
            height={120}
            className="partners-brand-logo"
          />
          <Link
            href="https://edonthego.org"
            className="button button-secondary"
            target="_blank"
            rel="noreferrer"
          >
            {copy.partners.visitSite}
          </Link>
        </div>
      </section>

      <section className="partners-subscribe">
        <div className="partners-subscribe-header">
          <h2>{copy.partners.subscribeTitle}</h2>
          <p>{copy.partners.subscribeText}</p>
        </div>

        <div className="partners-grid">
          <SubscribeCard
            title={copy.partners.russianTitle}
            description={copy.partners.russianText}
            edition="russian"
            buttonText={copy.partners.subscribeButton}
            successText={copy.partners.success}
            errorText={copy.partners.error}
            emailPlaceholder={copy.partners.emailPlaceholder}
            emoji="📰"
          />

          <SubscribeCard
            title={copy.partners.kidsTitle}
            description={copy.partners.kidsText}
            edition="kids"
            buttonText={copy.partners.subscribeButton}
            successText={copy.partners.success}
            errorText={copy.partners.error}
            emailPlaceholder={copy.partners.emailPlaceholder}
            emoji="🌟"
          />
        </div>
      </section>
    </div>
  );
}
