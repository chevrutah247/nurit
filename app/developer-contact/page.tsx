'use client';

import { useState } from 'react';

import { useLanguage } from '@/components/language-provider';

export default function DeveloperContactPage() {
  const { copy } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
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

        {status === 'success' ? (
          <div className="developer-contact-success">{copy.developerContact.success}</div>
        ) : (
          <form onSubmit={handleSubmit} className="developer-contact-form">
            <input
              type="text"
              name="name"
              required
              placeholder={copy.developerContact.name}
            />
            <input
              type="email"
              name="email"
              required
              placeholder={copy.developerContact.email}
            />
            <textarea
              name="message"
              required
              rows={6}
              placeholder={copy.developerContact.message}
            />
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
