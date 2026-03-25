'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { useLanguage } from '@/components/language-provider';

type BirthTiming = 'before_sunset' | 'after_sunset';

type Profile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  adjusted_birthday?: string;
  birth_timing?: BirthTiming;
  hebrew_birthday?: string;
};

export default function ManageProfilePage() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const isRu = language === 'rus';
  const isHebrew = language === 'heb';

  const [requestEmail, setRequestEmail] = useState('');
  const [requestStatus, setRequestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [profileStatus, setProfileStatus] = useState<'loading' | 'ready' | 'error'>(
    token ? 'loading' : 'ready'
  );
  const [saveStatus, setSaveStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hebrewBirthday, setHebrewBirthday] = useState('');
  const [hebrewBirthdayHeb, setHebrewBirthdayHeb] = useState('');
  const [profile, setProfile] = useState<Profile>({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    birth_timing: 'before_sunset',
  });

  useEffect(() => {
    if (!token) return;

    async function loadProfile() {
      try {
        const response = await fetch(`/api/profile-access?token=${encodeURIComponent(token)}`);
        const data = await response.json();

        if (!response.ok) {
          setProfileStatus('error');
          return;
        }

        setProfile({
          name: data.profile.name || '',
          email: data.profile.email || '',
          phone: data.profile.phone || '',
          address: data.profile.address || '',
          birthday: data.profile.birthday || '',
          birth_timing: (data.profile.birth_timing as BirthTiming) || 'before_sunset',
        });
        setHebrewBirthday(data.profile.hebrew_birthday || '');
        setProfileStatus('ready');
      } catch {
        setProfileStatus('error');
      }
    }

    loadProfile();
  }, [token]);

  useEffect(() => {
    if (!token || !profile.birthday) return;

    async function updatePreview() {
      try {
        const response = await fetch(
          `/api/hebrew-birthday?birthday=${encodeURIComponent(profile.birthday)}&birthTiming=${encodeURIComponent(profile.birth_timing || 'before_sunset')}`
        );
        const data = await response.json();
        if (!response.ok) return;
        setHebrewBirthday(data.hebrewBirthday || '');
        setHebrewBirthdayHeb(data.hebrewBirthdayHeb || '');
      } catch {}
    }

    updatePreview();
  }, [token, profile.birthday, profile.birth_timing]);

  const labels = useMemo(() => ({
    title: isRu ? 'Управление профилем' : isHebrew ? 'ניהול פרופיל' : 'Manage Profile',
    subtitle: isRu
      ? 'Получите ссылку на свой профиль по email или откройте письмо, которое уже пришло вам.'
      : isHebrew
        ? 'קבלי קישור מאובטח לפרופיל דרך האימייל או פתחי את הקישור שנשלח אלייך.'
        : 'Request a secure profile link by email or open the link already sent to you.',
    requestButton: isRu ? 'Отправить ссылку' : isHebrew ? 'שלחי קישור' : 'Send link',
    requestSuccess: isRu
      ? 'Если этот email есть в системе, ссылка на редактирование уже отправлена.'
      : isHebrew
        ? 'אם האימייל קיים במערכת, נשלח אליו קישור לעריכת הפרופיל.'
        : 'If this email exists in the system, an edit link has been sent.',
    requestError: isRu ? 'Не удалось отправить ссылку.' : isHebrew ? 'לא ניתן לשלוח את הקישור.' : 'Failed to send link.',
    saveButton: isRu ? 'Сохранить изменения' : isHebrew ? 'שמרי שינויים' : 'Save changes',
    saveSuccess: isRu ? 'Профиль обновлен.' : isHebrew ? 'הפרופיל עודכן.' : 'Profile updated.',
    saveError: isRu ? 'Не удалось обновить профиль.' : isHebrew ? 'לא ניתן לעדכן את הפרופיל.' : 'Failed to update profile.',
    beforeSunset: isRu ? 'Родилась до захода солнца' : isHebrew ? 'נולדתי לפני שקיעת החמה' : 'Born before sunset',
    afterSunset: isRu ? 'Родилась после захода солнца' : isHebrew ? 'נולדתי אחרי שקיעת החמה' : 'Born after sunset',
    address: isRu ? 'Адрес' : isHebrew ? 'כתובת' : 'Address',
    phone: isRu ? 'Телефон' : isHebrew ? 'טלפון' : 'Phone',
    email: 'Email',
    name: isRu ? 'Имя и фамилия' : isHebrew ? 'שם מלא' : 'Full name',
    birthday: isRu ? 'Дата рождения' : isHebrew ? 'תאריך לידה' : 'Date of birth',
    bornWhen: isRu ? 'Когда вы родились' : isHebrew ? 'מתי נולדת' : 'When were you born',
    hebrewBirthday: isRu ? 'Еврейская дата рождения' : isHebrew ? 'תאריך לידה עברי' : 'Hebrew birthday',
  }), [isRu, isHebrew]);

  async function handleRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestStatus('loading');

    try {
      const response = await fetch('/api/profile-access/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: requestEmail }),
      });

      setRequestStatus(response.ok ? 'success' : 'error');
    } catch {
      setRequestStatus('error');
    }
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveStatus('loading');

    try {
      const response = await fetch('/api/profile-access', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          ...profile,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setSaveStatus('error');
        return;
      }

      setHebrewBirthday(data.hebrewBirthday || hebrewBirthday);
      setHebrewBirthdayHeb(data.hebrewBirthdayHeb || hebrewBirthdayHeb);
      setSaveStatus('success');
    } catch {
      setSaveStatus('error');
    }
  }

  return (
    <div className="subpage">
      <h1>{labels.title}</h1>
      <div className="register-layout">
        <section className="page-panel">
          <h2>{labels.title}</h2>
          <p>{labels.subtitle}</p>

          <form className="register-form" onSubmit={handleRequest}>
            <label>
              {labels.email}
              <input
                type="email"
                value={requestEmail}
                onChange={(event) => setRequestEmail(event.target.value)}
                placeholder="email@example.com"
                required
              />
            </label>

            <button className="button button-primary" type="submit" disabled={requestStatus === 'loading'}>
              {requestStatus === 'loading' ? '...' : labels.requestButton}
            </button>

            {requestStatus === 'success' ? <p>{labels.requestSuccess}</p> : null}
            {requestStatus === 'error' ? <p>{labels.requestError}</p> : null}
          </form>
        </section>

        <section className="page-panel">
          <h2>{labels.title}</h2>

          {token && profileStatus === 'loading' ? <p>...</p> : null}
          {token && profileStatus === 'error' ? <p>{labels.saveError}</p> : null}

          {token && profileStatus === 'ready' ? (
            <form className="register-form" onSubmit={handleSave}>
              <label>
                {labels.name}
                <input
                  type="text"
                  value={profile.name}
                  onChange={(event) => setProfile((prev) => ({ ...prev, name: event.target.value }))}
                  required
                />
              </label>

              <label>
                {labels.email}
                <input
                  type="email"
                  value={profile.email}
                  onChange={(event) => setProfile((prev) => ({ ...prev, email: event.target.value }))}
                  required
                />
              </label>

              <label>
                {labels.phone}
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(event) => setProfile((prev) => ({ ...prev, phone: event.target.value }))}
                />
              </label>

              <label>
                {labels.address}
                <input
                  type="text"
                  value={profile.address}
                  onChange={(event) => setProfile((prev) => ({ ...prev, address: event.target.value }))}
                />
              </label>

              <label>
                {labels.birthday}
                <input
                  type="date"
                  value={profile.birthday}
                  onChange={(event) => setProfile((prev) => ({ ...prev, birthday: event.target.value }))}
                  required
                />
              </label>

              <fieldset className="birth-timing-group">
                <legend>{labels.bornWhen}</legend>
                <label className="birth-timing-option">
                  <input
                    type="radio"
                    name="birth-timing"
                    checked={(profile.birth_timing || 'before_sunset') === 'before_sunset'}
                    onChange={() => setProfile((prev) => ({ ...prev, birth_timing: 'before_sunset' }))}
                  />
                  <span>{labels.beforeSunset}</span>
                </label>
                <label className="birth-timing-option">
                  <input
                    type="radio"
                    name="birth-timing"
                    checked={(profile.birth_timing || 'before_sunset') === 'after_sunset'}
                    onChange={() => setProfile((prev) => ({ ...prev, birth_timing: 'after_sunset' }))}
                  />
                  <span>{labels.afterSunset}</span>
                </label>
              </fieldset>

              {hebrewBirthday ? (
                <div className="birthday-preview">
                  <p>{labels.hebrewBirthday}</p>
                  <strong>{hebrewBirthday}</strong>
                  {hebrewBirthdayHeb ? <div className="birthday-preview-hebrew">{hebrewBirthdayHeb}</div> : null}
                </div>
              ) : null}

              <button className="button button-primary" type="submit" disabled={saveStatus === 'loading'}>
                {saveStatus === 'loading' ? '...' : labels.saveButton}
              </button>

              {saveStatus === 'success' ? <p>{labels.saveSuccess}</p> : null}
              {saveStatus === 'error' ? <p>{labels.saveError}</p> : null}
            </form>
          ) : null}
        </section>
      </div>
    </div>
  );
}
