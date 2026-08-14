import { useT } from '../i18n/LocaleProvider';
import { SectionHeading } from './common';

export function CommercialEngagement() {
  const t = useT();

  const eyebrow = { en: 'Commercial Engagement', pl: 'Współpraca Komercyjna' };
  const title = {
    en: 'Software House CodeWorks (codeworks-it.pl)',
    pl: 'Software House CodeWorks (codeworks-it.pl)',
  };
  const body = {
    en: 'Potrzebujesz dedykowanego zespołu do większego projektu lub złożonej automatyzacji? Prowadzę software house CodeWorks (codeworks-it.pl) skupiony na wdrożeniach sztucznej inteligencji, automatyzacji procesów oraz systemach B2B dla e-commerce i hurtowni.',
    pl: 'Potrzebujesz dedykowanego zespołu do większego projektu lub złożonej automatyzacji? Prowadzę software house CodeWorks (codeworks-it.pl) skupiony na wdrożeniach sztucznej inteligencji, automatyzacji procesów oraz systemach B2B dla e-commerce i hurtowni.',
  };
  const cta = { en: 'Odwiedź codeworks-it.pl ↗', pl: 'Odwiedź codeworks-it.pl ↗' };

  return (
    <section id="codeworks" className="fo-section fo-section--band" aria-labelledby="codeworks-title">
      <SectionHeading
        numeral="IV"
        eyebrow={t(eyebrow)}
        title={t(title)}
        titleId="codeworks-title"
      />
      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
        <p className="fo-prose" style={{ fontSize: '1.05rem', marginBottom: '28px' }}>
          {t(body)}
        </p>
        <a
          className="fo-mono fo-btn fo-btn--solid"
          href="https://codeworks-it.pl"
          target="_blank"
          rel="noreferrer"
        >
          {t(cta)}
        </a>
      </div>
    </section>
  );
}
