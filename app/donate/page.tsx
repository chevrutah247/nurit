'use client';

import { useLanguage } from '@/components/language-provider';

export default function DonatePage() {
  const { copy, language } = useLanguage();
  const isRu = language === 'rus';

  return (
    <div className="subpage">
      <h1>{copy.donate.title}</h1>
      <section className="page-panel">
        <h2>{copy.donate.panelTitle}</h2>
        <p>{copy.donate.text}</p>

        {/* Quick amount buttons via PayPal */}
        <div className="button-row" style={{ marginBottom: '2rem' }}>
          <a
            href="https://www.paypal.com/donate?hosted_button_id=SWQMA9XCGJKA4&amount=36"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-primary button-large"
          >
            {copy.donate.amount36}
          </a>
          <a
            href="https://www.paypal.com/donate?hosted_button_id=SWQMA9XCGJKA4&amount=72"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary button-large"
          >
            {copy.donate.amount72}
          </a>
          <a
            href="https://www.paypal.com/donate?hosted_button_id=SWQMA9XCGJKA4&amount=180"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-gold button-large"
          >
            {copy.donate.amount180}
          </a>
        </div>

        {/* PayPal Donate Button */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', padding: '2rem', borderRadius: 16, background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)' }}>
          <p style={{ color: '#4a3f2f', fontSize: 18, fontWeight: 600, marginBottom: '1rem' }}>
            {isRu ? 'Пожертвовать любую сумму через PayPal' : 'Donate any amount via PayPal'}
          </p>
          <form action="https://www.paypal.com/donate" method="post" target="_top" style={{ display: 'inline-block' }}>
            <input type="hidden" name="hosted_button_id" value="SWQMA9XCGJKA4" />
            <input
              type="image"
              src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
              name="submit"
              title="PayPal - The safer, easier way to pay online!"
              alt="Donate with PayPal button"
              style={{ border: 0 }}
            />
          </form>
          <p style={{ color: '#8a7a5a', fontSize: 13, marginTop: '1rem' }}>
            {isRu
              ? 'Education On The Go Corp — 501(c)(3) некоммерческая организация. Все пожертвования не облагаются налогом.'
              : 'Education On The Go Corp — 501(c)(3) nonprofit. All donations are tax-deductible.'}
          </p>
        </div>
      </section>
    </div>
  );
}
