import { CASE_STUDIES, type CaseStudy } from '../content/caseStudies';
import { useT } from '../i18n/LocaleProvider';
import { SectionHeading, Tags } from './common';

function CaseCard({ item, index }: { readonly item: CaseStudy; readonly index: number }) {
  const t = useT();

  return (
    <article className="fo-panel fo-plate" style={{ margin: '20px 0' }}>
      <div className="fo-plate__figure" style={{ justifyContent: 'center' }}>
        <div className="fo-plate__head">
          <span className="fo-mono fo-plate__num">CASE STUDY 0{index + 1}</span>
        </div>
        <div style={{ padding: '16px 0' }}>
          <p
            className="fo-mono"
            style={{
              fontSize: '0.75rem',
              color: 'var(--pg-aubergine-50)',
              marginBottom: '8px',
              fontWeight: 600,
            }}
          >
            {t(item.clientContext)}
          </p>
          <div
            className="fo-mono"
            style={{
              fontSize: '0.8125rem',
              color: 'var(--pg-orange-50)',
              fontWeight: 700,
              padding: '8px 12px',
              background: 'var(--fo-well)',
              borderLeft: '3px solid var(--pg-orange-50)',
              borderRadius: '2px',
            }}
          >
            {t(item.resultMetric)}
          </div>
        </div>
      </div>

      <div className="fo-plate__body">
        <h3 className="fo-plate__title">{t(item.title)}</h3>
        <div style={{ marginBottom: '16px' }}>
          <p
            className="fo-mono"
            style={{
              fontSize: '0.6875rem',
              color: 'var(--pg-text-secondary)',
              marginBottom: '4px',
            }}
          >
            PROBLEM:
          </p>
          <p className="fo-prose" style={{ fontSize: '0.9rem', marginBottom: '12px' }}>
            {t(item.problem)}
          </p>
          <p
            className="fo-mono"
            style={{
              fontSize: '0.6875rem',
              color: 'var(--pg-text-secondary)',
              marginBottom: '4px',
            }}
          >
            ROZWIĄZANIE / SOLUTION:
          </p>
          <p className="fo-prose" style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
            {t(item.solution)}
          </p>
        </div>
        <Tags items={item.stack} />
      </div>
    </article>
  );
}

export function CaseStudies() {
  const t = useT();

  const eyebrow = { en: 'Case Studies & Enterprise AI', pl: 'Wdrożenia i Case Studies AI' };
  const title = { en: 'Selected Case Studies', pl: 'Wybrane Wdrożenia Komercyjne' };
  const intro = {
    en: 'High-level overview of commercial engagement areas and AI systems — enterprise deployments, e-commerce process automation, computer vision, and private document intelligence.',
    pl: 'Ogólne ujęcie obszarów wdrożeniowych i projektów komercyjnych — systemy AI dla sektora enterprise, automatyzacja procesów e-commerce, wizja komputerowa oraz prywatne systemy wiedzy.',
  };

  return (
    <section id="cases" className="fo-section" aria-labelledby="cases-title">
      <SectionHeading
        numeral="I"
        eyebrow={t(eyebrow)}
        title={t(title)}
        titleId="cases-title"
      />
      <p className="fo-prose fo-prose--intro">{t(intro)}</p>
      <div className="fo-plates">
        {CASE_STUDIES.map((item, index) => (
          <CaseCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
