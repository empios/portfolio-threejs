import { INSTRUMENT_CASES } from '../content/instruments';
import { UI } from '../content/ui';
import { useLocale, useT } from '../i18n/LocaleProvider';
import { format, pluralize } from '../i18n/locale';
import { toRoman } from '../lib/roman';
import { LeaderRow, SectionHeading } from './common';

export function Instruments() {
  const t = useT();
  const { locale } = useLocale();

  return (
    <section id="instruments" className="fo-section" aria-labelledby="instruments-title">
      <SectionHeading
        numeral="IV"
        eyebrow={t(UI.instruments.eyebrow)}
        title={t(UI.instruments.title)}
        titleId="instruments-title"
      />

      <div className="fo-catalogue">
        {INSTRUMENT_CASES.map((instrumentCase, caseIndex) => {
          const count = instrumentCase.specimens.length;
          return (
            <section key={instrumentCase.title.en} aria-label={t(instrumentCase.title)}>
              <header className="fo-catalogue__head">
                <h3 className="fo-mono fo-catalogue__title">
                  {toRoman(caseIndex + 1)} — {t(instrumentCase.title)}
                </h3>
                <span className="fo-mono fo-catalogue__count">
                  {format(t(UI.instruments.count), {
                    count,
                    noun: pluralize(locale, count, t(UI.instruments.countNoun)),
                  })}
                </span>
              </header>
              <ul className="fo-list">
                {instrumentCase.specimens.map((specimen, index) => (
                  <li key={specimen.name} className="fo-leader">
                    <LeaderRow
                      num={String(index + 1).padStart(2, '0')}
                      name={specimen.name}
                      meta={t(specimen.note)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
