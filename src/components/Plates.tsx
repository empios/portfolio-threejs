import { PLATES, type Plate } from '../content/plates';
import { UI } from '../content/ui';
import { useT } from '../i18n/LocaleProvider';
import { format } from '../i18n/locale';
import { toRoman } from '../lib/roman';
import { SectionHeading, Tags } from './common';
import { FIGURES } from './figures';

function PlateCard({ plate, index }: { readonly plate: Plate; readonly index: number }) {
  const t = useT();
  const Figure = FIGURES[plate.figure];
  // Plates alternate hand down the folio, as an engraver alternates the gutter.
  const verso = index % 2 === 1;

  return (
    <article className={`fo-panel fo-plate${verso ? ' fo-plate--verso' : ''}`}>
      <div className="fo-plate__figure">
        <div className="fo-plate__head">
          <span className="fo-mono fo-plate__num">
            {format(t(UI.plates.plate), { numeral: toRoman(index + 1) })}
          </span>
          <span className="fo-mono fo-plate__ref">{t(plate.reference)}</span>
        </div>
        <Figure />
        <p className="fo-mono fo-plate__caption">{t(plate.figureCaption)}</p>
      </div>

      <div className="fo-plate__body">
        <h3 className="fo-plate__title">{t(plate.title)}</h3>
        <p className="fo-prose">{t(plate.summary)}</p>
        <p className="fo-mono fo-plate__metrics">{t(plate.metrics)}</p>
        <Tags items={plate.stack} />
        {plate.source && (
          <a
            className="fo-mono fo-plate__source"
            href={plate.source}
            target="_blank"
            rel="noreferrer"
          >
            {t(UI.plates.viewSource)}
          </a>
        )}
      </div>
    </article>
  );
}

export function Plates() {
  const t = useT();

  const commercialPlates = PLATES.filter((p) => p.group === 'commercial');
  const workshopPlates = PLATES.filter((p) => p.group === 'workshop');

  return (
    <section id="plates" className="fo-section" aria-labelledby="plates-title">
      <SectionHeading
        numeral="I"
        eyebrow={t(UI.plates.eyebrow)}
        title={t(UI.plates.title)}
        titleId="plates-title"
      />
      <p className="fo-prose fo-prose--intro">{t(UI.plates.intro)}</p>

      <div className="fo-plates-groups">
        <div className="fo-plates-group">
          <header className="fo-plates-group__head">
            <p className="fo-mono fo-plates-group__eyebrow">
              {t(UI.plates.commercialSubgroup.eyebrow)}
            </p>
            <h3 className="fo-plates-group__title">
              {t(UI.plates.commercialSubgroup.title)}
            </h3>
          </header>
          <div className="fo-plates">
            {commercialPlates.map((plate) => {
              const index = PLATES.indexOf(plate);
              return <PlateCard key={plate.figure} plate={plate} index={index} />;
            })}
          </div>
        </div>

        <div className="fo-plates-group">
          <header className="fo-plates-group__head">
            <p className="fo-mono fo-plates-group__eyebrow">
              {t(UI.plates.workshopSubgroup.eyebrow)}
            </p>
            <h3 className="fo-plates-group__title">
              {t(UI.plates.workshopSubgroup.title)}
            </h3>
          </header>
          <div className="fo-plates">
            {workshopPlates.map((plate) => {
              const index = PLATES.indexOf(plate);
              return <PlateCard key={plate.figure} plate={plate} index={index} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
