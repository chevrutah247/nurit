'use client';

import Link from 'next/link';

import { useLanguage } from '@/components/language-provider';
import { RegisterForm } from '@/components/register-form';

export default function RegisterPage() {
  const { copy, language } = useLanguage();
  const manageLabel =
    language === 'rus'
      ? 'Изменить мои данные'
      : language === 'heb'
        ? 'עדכון הפרטים שלי'
        : 'Update my details';

  return (
    <div className="subpage">
      <h1>{copy.register.title}</h1>

      <div className="register-layout">
        <section className="page-panel">
          <h2>{copy.register.panelTitle}</h2>
          <p>{copy.register.text}</p>
          <ul style={{ lineHeight: 2 }}>
            {copy.register.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p style={{ marginTop: 18 }}>
            <Link href="/manage-profile" className="button button-secondary">
              {manageLabel}
            </Link>
          </p>
        </section>

        <section className="page-panel">
          <RegisterForm />
        </section>
      </div>
    </div>
  );
}
