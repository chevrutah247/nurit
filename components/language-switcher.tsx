'use client';

import { languageMeta, languages } from '@/lib/i18n';
import { useLanguage } from '@/components/language-provider';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher" aria-label="Language switcher">
      {languages.map((item) => (
        <button
          key={item}
          type="button"
          className={
            item === language ? 'lang-button lang-button-active' : 'lang-button'
          }
          onClick={() => setLanguage(item)}
        >
          {languageMeta[item].label}
        </button>
      ))}
    </div>
  );
}
