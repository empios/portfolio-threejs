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
    en: 'Looking for a production AI deployment or complex automation? I run software house CodeWorks (codeworks-it.pl) focused on AI deployments, process automation, and B2B systems for e-commerce and wholesale.',
    pl: 'Potrzebujesz wdrożenia produkcyjnego albo złożonej automatyzacji? Prowadzę software house CodeWorks (codeworks-it.pl) skupiony na wdrożeniach sztucznej inteligencji, automatyzacji procesów oraz systemach B2B dla e-commerce i hurtowni.',
  };
  const cta = { en: 'Visit codeworks-it.pl ↗', pl: 'Odwiedź codeworks-it.pl ↗' };

  return (
    <section id="codeworks" className="fo-section fo-section--band" aria-labelledby="codeworks-title">
      <SectionHeading
        numeral="III"
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
