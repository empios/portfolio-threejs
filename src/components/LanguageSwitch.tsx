import { UI } from '../content/ui';
import { useLocale, useT } from '../i18n/LocaleProvider';
import { LOCALE_NAMES, LOCALES } from '../i18n/locale';

/** Two stamps in the margin. The pressed one is the language on the page. */
export function LanguageSwitch() {
  const { locale, setLocale } = useLocale();
  const t = useT();

  return (
    <div className="fo-lang" role="group" aria-label={t(UI.language.label)}>
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          className="fo-mono fo-lang__btn"
          aria-pressed={code === locale}
          // Marks the label's own language, so 'EN' is never read as Polish.
          lang={code}
          onClick={() => setLocale(code)}
        >
          {LOCALE_NAMES[code]}
        </button>
      ))}
    </div>
  );
}
