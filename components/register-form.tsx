'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useLanguage } from '@/components/language-provider';

export function RegisterForm() {
  const { copy, language } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hebrewBirthday, setHebrewBirthday] = useState('');
  const [hebrewBirthdayHeb, setHebrewBirthdayHeb] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [birthTiming, setBirthTiming] = useState<'before_sunset' | 'after_sunset'>('before_sunset');

  const isRtl = language === 'heb';

  useEffect(() => {
    if (!birthday) {
      setHebrewBirthday('');
      setHebrewBirthdayHeb('');
      return;
    }

    const controller = new AbortController();

    async function previewHebrewBirthday() {
      try {
        const response = await fetch(
          `/api/hebrew-birthday?birthday=${encodeURIComponent(birthday)}&birthTiming=${encodeURIComponent(birthTiming)}`,
          { signal: controller.signal }
        );

        const data = await response.json();
        if (!response.ok) return;

        setHebrewBirthday(data.hebrewBirthday || '');
        setHebrewBirthdayHeb(data.hebrewBirthdayHeb || '');
      } catch {}
    }

    previewHebrewBirthday();
    return () => controller.abort();
  }, [birthday, birthTiming]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(formatPhone(raw));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: phone.replace(/\D/g, ''),
      address: formData.get('address') as string,
      birthday: formData.get('birthday') as string,
      birthTiming,
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
    padding: '16px 20px',
    fontSize: '1.25rem',
    border: '1px solid #d4c9bc',
    borderRadius: '10px',
    backgroundColor: '#fff',
    color: '#2d2017',
    outline: 'none',
    direction: isRtl ? 'rtl' : 'ltr',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#6b5a4e',
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: '24px',
  };

  if (status === 'success') {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        backgroundColor: '#f5edd8',
        borderRadius: '12px',
        direction: isRtl ? 'rtl' : 'ltr',
      }}>
        <p style={{ fontSize: '1.3rem', color: '#2d2017', marginBottom: '20px', fontWeight: 600 }}>
          {copy.register.successMessage}
        </p>
        {hebrewBirthday && (
          <div style={{
            padding: '20px',
            backgroundColor: '#faf6f0',
            borderRadius: '10px',
            border: '1px solid #d4c9bc',
          }}>
            <p style={{ fontSize: '1.1rem', color: '#6b5a4e', marginBottom: '8px' }}>
              {copy.register.hebrewBirthdayLabel}
            </p>
            <p style={{ fontSize: '1.5rem', color: '#8c4a6b', fontWeight: 700 }}>
              {hebrewBirthday}
            </p>
            {hebrewBirthdayHeb && (
              <p style={{ fontSize: '1.4rem', color: '#9e7c3d', direction: 'rtl', marginTop: '8px', fontWeight: 600 }}>
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
          placeholder={language === 'rus' ? 'Имя и Фамилия' : language === 'heb' ? 'שם מלא' : 'Full Name'}
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
          placeholder="email@example.com"
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>{language === 'rus' ? 'Телефон' : language === 'heb' ? 'טלפון' : 'Phone'}</label>
        <input
          type="tel"
          name="phone"
          required
          autoComplete="tel"
          value={phone}
          onChange={handlePhoneChange}
          style={inputStyle}
          placeholder="(347) 555-1234"
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>{copy.register.addressLabel}</label>
        <input
          type="text"
          name="address"
          autoComplete="street-address"
          style={inputStyle}
          placeholder={language === 'rus' ? 'Ваш адрес' : language === 'heb' ? 'הכתובת שלך' : 'Your address'}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>{copy.register.birthdayLabel}</label>
        <input
          type="date"
          name="birthday"
          required
          value={birthday}
          onChange={(event) => setBirthday(event.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>{copy.register.birthTimingLabel}</label>
        <div className="birth-timing-group">
          <label className="birth-timing-option">
            <input
              type="radio"
              name="birthTiming"
              checked={birthTiming === 'before_sunset'}
              onChange={() => setBirthTiming('before_sunset')}
            />
            <span>{copy.register.beforeSunset}</span>
          </label>
          <label className="birth-timing-option">
            <input
              type="radio"
              name="birthTiming"
              checked={birthTiming === 'after_sunset'}
              onChange={() => setBirthTiming('after_sunset')}
            />
            <span>{copy.register.afterSunset}</span>
          </label>
        </div>
      </div>

      {hebrewBirthday ? (
        <div className="birthday-preview">
          <p>{copy.register.hebrewBirthdayLabel}</p>
          <strong>{hebrewBirthday}</strong>
          {hebrewBirthdayHeb ? <div className="birthday-preview-hebrew">{hebrewBirthdayHeb}</div> : null}
        </div>
      ) : null}

      {status === 'error' && (
        <p style={{ color: '#c0392b', fontSize: '1.1rem', marginBottom: '16px' }}>
          {copy.register.errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          width: '100%',
          padding: '18px',
          fontSize: '1.3rem',
          fontWeight: 700,
          color: '#faf6f0',
          backgroundColor: status === 'loading' ? '#b89aab' : '#8c4a6b',
          border: 'none',
          borderRadius: '10px',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
          letterSpacing: '0.5px',
        }}
      >
        {status === 'loading' ? '...' : copy.register.submitButton}
      </button>
    </form>
  );
}
