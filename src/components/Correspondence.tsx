import { CODEX_TITLE, CONTACT, IDENTITY } from '../content/site';
import { UI } from '../content/ui';
import { useT } from '../i18n/LocaleProvider';
import { format } from '../i18n/locale';

export function Correspondence() {
  const t = useT();

  return (
    <section
      id="correspondence"
      className="fo-correspondence"
      aria-labelledby="correspondence-title"
    >
      <div className="fo-seal" aria-hidden="true">
        <span className="fo-seal__monogram">{IDENTITY.monogram}</span>
      </div>

      <p className="fo-mono fo-eyebrow">§ V — {t(UI.correspondence.eyebrow)}</p>
      <h2 id="correspondence-title" className="fo-title">
        {t(UI.correspondence.title)}
      </h2>
      <p className="fo-correspondence__note">{t(UI.correspondence.note)}</p>

      <div className="fo-correspondence__actions">
        {CONTACT.map(({ label, href, variant, external }) => (
          <a
            key={href}
            href={href}
            className={`fo-mono fo-btn fo-btn--${variant}`}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            {label}
          </a>
        ))}
      </div>

      <p className="fo-mono fo-correspondence__terms">{t(UI.correspondence.terms)}</p>
    </section>
  );
}

export function Colophon() {
  const t = useT();

  const lines = [
    `${IDENTITY.name} — ${t(CODEX_TITLE)}`,
    t(UI.colophon.typeface),
    format(t(UI.colophon.imprint), { year: IDENTITY.year }),
  ];

  return (
    <footer className="fo-mono fo-colophon">
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </footer>
  );
}
