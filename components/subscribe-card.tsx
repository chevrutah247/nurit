'use client';

import { useState } from 'react';

type Edition = 'kids' | 'russian';

type SubscribeCardProps = {
  title: string;
  description: string;
  edition: Edition;
  buttonText: string;
  successText: string;
  errorText: string;
  emailPlaceholder: string;
  emoji: string;
};

export function SubscribeCard({
  title,
  description,
  edition,
  buttonText,
  successText,
  errorText,
  emailPlaceholder,
  emoji,
}: SubscribeCardProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, edition }),
      });

      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="subscribe-card">
      <div className="subscribe-card-header">
        <span className="subscribe-card-emoji">{emoji}</span>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="subscribe-success">{successText}</div>
      ) : (
        <form onSubmit={handleSubmit} className="subscribe-form">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={emailPlaceholder}
            required
          />
          <button type="submit" className="button button-primary" disabled={status === 'loading'}>
            {status === 'loading' ? '...' : buttonText}
          </button>
        </form>
      )}

      {status === 'error' ? <p className="subscribe-error">{errorText}</p> : null}
    </div>
  );
}

