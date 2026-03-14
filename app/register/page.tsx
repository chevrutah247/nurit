'use client';

import { useLanguage } from '@/components/language-provider';
import { RegisterForm } from '@/components/register-form';

export default function RegisterPage() {
  const { copy } = useLanguage();

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
        </section>

        <section className="page-panel">
          <RegisterForm />
        </section>
      </div>
    </div>
  );
}
