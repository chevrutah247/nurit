'use client';

import { FormEvent, useState } from 'react';
import { useLanguage } from '@/components/language-provider';

export function RegisterForm() {
  const { copy, language } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hebrewBirthday, setHebrewBirthday] = useState('');
  const [hebrewBirthdayHeb, setHebrewBirthdayHeb] = useState('');

  const isRtl = language === 'heb';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      birthday: formData.get('birthday') as string,
    };

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        return;
      }

      setHebrewBirthday(data.hebrewBirthday);
      setHebrewBirthdayHeb(data.hebrewBirthdayHeb);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '1rem',
    border: '1px solid #d4c9bc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#2d2017',
    outline: 'none',
    direction: isRtl ? 'rtl' : 'ltr',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '6px',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#6b5a4e',
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: '20px',
  };

  if (status === 'success') {
    return (
      <div style={{
        padding: '32px',
        textAlign: 'center',
        backgroundColor: '#f5edd8',
        borderRadius: '12px',
        direction: isRtl ? 'rtl' : 'ltr',
      }}>
        <p style={{ fontSize: '1.1rem', color: '#2d2017', marginBottom: '16px' }}>
          {copy.register.successMessage}
        </p>
        {hebrewBirthday && (
          <div style={{
            padding: '16px',
            backgroundColor: '#faf6f0',
            borderRadius: '8px',
            border: '1px solid #d4c9bc',
          }}>
            <p style={{ fontSize: '0.9rem', color: '#6b5a4e', marginBottom: '4px' }}>
              {copy.register.hebrewBirthdayLabel}
            </p>
            <p style={{ fontSize: '1.2rem', color: '#8c4a6b', fontWeight: 600 }}>
              {hebrewBirthday}
            </p>
            {hebrewBirthdayHeb && (
              <p style={{ fontSize: '1.1rem', color: '#9e7c3d', direction: 'rtl', marginTop: '4px' }}>
                {hebrewBirthdayHeb}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
    >
      <div style={fieldStyle}>
        <label style={labelStyle}>{copy.register.nameLabel}</label>
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>{copy.register.emailLabel}</label>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>{copy.register.birthdayLabel}</label>
        <input
          type="date"
          name="birthday"
          required
          style={inputStyle}
        />
      </div>

      {status === 'error' && (
        <p style={{ color: '#c0392b', fontSize: '0.9rem', marginBottom: '16px' }}>
          {copy.register.errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          width: '100%',
          padding: '14px',
          fontSize: '1rem',
          fontWeight: 600,
          color: '#faf6f0',
          backgroundColor: status === 'loading' ? '#b89aab' : '#8c4a6b',
          border: 'none',
          borderRadius: '8px',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
        }}
      >
        {status === 'loading' ? '...' : copy.register.submitButton}
      </button>
    </form>
  );
}
