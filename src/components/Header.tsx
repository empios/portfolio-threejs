import { IDENTITY, NAV } from '../content/site';
import { useT } from '../i18n/LocaleProvider';
import { LanguageSwitch } from './LanguageSwitch';

export function Header() {
  const t = useT();

  return (
    <header className="fo-header">
      <a href="#top" className="fo-mono fo-header__brand">
        {IDENTITY.shortName}
      </a>
      <nav aria-label="Sections" className="fo-header__nav">
        {NAV.map(({ id, numeral, label }) => (
          <a key={id} href={`#${id}`} className="fo-mono fo-header__link">
            {numeral} — {t(label)}
          </a>
        ))}
      </nav>
      <LanguageSwitch />
    </header>
  );
}
