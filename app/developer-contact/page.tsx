'use client';

import { useState, useRef, useEffect } from 'react';

import { useLanguage } from '@/components/language-provider';

export default function DeveloperContactPage() {
  const { copy, language } = useLanguage();
  const isRu = language === 'rus';
  const [status, setStatus] = useState<'idle' | 'sending' | 'verification-sent' | 'error'>(
    'idle'
  );
  const formStartedAtRef = useRef<number>(0);

  // Capture when the form first becomes interactive (defeats instant bot submits)
  useEffect(() => {
    formStartedAtRef.current = Date.now();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      // Honeypot — should always be empty for real users
      website: (form.elements.namedItem('website') as HTMLInputElement)?.value || '',
      formStartedAt: formStartedAtRef.current,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('verification-sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="subpage">
      <div className="developer-contact-shell">
        <h1>{copy.developerContact.title}</h1>
        <p className="developer-contact-subtitle">{copy.developerContact.subtitle}</p>

        {status === 'verification-sent' ? (
          <div className="developer-contact-success">
            <div style={{ fontSize: 48, marginBottom: 12 }}>📧</div>
            <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
              {isRu ? 'Проверьте свою почту' : 'Check your email'}
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#666' }}>
              {isRu
                ? 'Мы отправили вам письмо со ссылкой для подтверждения. Нажмите на ссылку в письме, чтобы ваше сообщение было доставлено в NURIT.'
                : 'We sent you an email with a confirmation link. Click the link in the email to deliver your message to NURIT.'}
            </p>
            <p style={{ fontSize: 13, color: '#999', marginTop: 16 }}>
              {isRu
                ? 'Не видите письмо? Проверьте папку «Спам». Ссылка действительна 1 час.'
                : "Don't see the email? Check your spam folder. The link is valid for 1 hour."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="developer-contact-form">
            <input
              type="text"
              name="name"
              required
              maxLength={100}
              placeholder={copy.developerContact.name}
            />
            <input
              type="email"
              name="email"
              required
              maxLength={200}
              placeholder={copy.developerContact.email}
            />
            <textarea
              name="message"
              required
              rows={6}
              maxLength={5000}
              placeholder={copy.developerContact.message}
            />

            {/* Honeypot — hidden from real users via CSS, attractive to bots */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-9999px',
                width: 1,
                height: 1,
                opacity: 0,
                pointerEvents: 'none',
              }}
            />

            <p style={{ fontSize: 12, color: '#888', margin: '8px 0', lineHeight: 1.5 }}>
              {isRu
                ? '🔒 После отправки мы пришлём ссылку на ваш email для подтверждения. Это защита от спама.'
                : "🔒 After submitting, we'll send a confirmation link to your email. This is to prevent spam."}
            </p>

            {status === 'error' ? (
              <p className="developer-contact-error">{copy.developerContact.error}</p>
            ) : null}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="button button-primary button-full"
            >
              {status === 'sending' ? '...' : copy.developerContact.send}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
