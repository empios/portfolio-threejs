import { useEffect } from 'react';
import { Archive } from './components/Archive';
import { CaseStudies } from './components/CaseStudies';
import { CommercialEngagement } from './components/CommercialEngagement';
import { Colophon, Correspondence } from './components/Correspondence';
import { CourseOfService } from './components/CourseOfService';
import { Frontispiece } from './components/Frontispiece';
import { Header } from './components/Header';
import { Instruments } from './components/Instruments';
import { Plates } from './components/Plates';
import { CODEX_TITLE, IDENTITY } from './content/site';
import { LocaleProvider, useT } from './i18n/LocaleProvider';
import type { InstrumentKind } from './three/heroInstrument';

/**
 * The three dials the folio was designed with. Defaults match the plate as
 * drawn; they are props rather than state because nothing on the page changes
 * them — they are the binding decisions of this edition.
 */
export interface AppProps {
  readonly heroInstrument?: InstrumentKind;
  /** Multiplier on the frontispiece instrument's turning, 0–3. */
  readonly rotationSpeed?: number;
  /** The laid-paper tooth over the whole folio. */
  readonly paperGrain?: boolean;
}

function Folio({ heroInstrument = 'armillary', rotationSpeed = 1, paperGrain = true }: AppProps) {
  const t = useT();

  // The tab carries the title in whatever language the folio is being read in.
  useEffect(() => {
    document.title = `${IDENTITY.name} — ${t(CODEX_TITLE)}`;
  }, [t]);

  return (
    <>
      {paperGrain && <div className="fo-grain" aria-hidden="true" />}
      <Header />
      <main>
        <Frontispiece instrument={heroInstrument} rotationSpeed={rotationSpeed} />
        <CaseStudies />
        <Plates />
        <CourseOfService />
        <CommercialEngagement />
        <Archive />
        <Instruments />
        <Correspondence />
      </main>
      <Colophon />
    </>
  );
}

export function App(props: AppProps) {
  return (
    <LocaleProvider>
      <Folio {...props} />
    </LocaleProvider>
  );
}
