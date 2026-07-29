import { useRef } from 'react';
import { CODEX_TITLE, IDENTITY } from '../content/site';
import { UI } from '../content/ui';
import { useT } from '../i18n/LocaleProvider';
import type { InstrumentKind } from '../three/heroInstrument';
import { useInkStage } from '../three/useInkStage';
import { ArmillaryFallback } from './figures';

export interface FrontispieceProps {
  readonly instrument: InstrumentKind;
  /** Multiplier on the instrument's turning, 0–3. */
  readonly rotationSpeed: number;
}

export function Frontispiece({ instrument, rotationSpeed }: FrontispieceProps) {
  const t = useT();
  const hostRef = useRef<HTMLDivElement>(null);

  // Read per frame, so speed can change without rebuilding the instrument.
  const speedRef = useRef(rotationSpeed);
  speedRef.current = rotationSpeed;

  const { supported } = useInkStage({
    hostRef,
    fov: 32,
    load: async () => {
      const { buildHeroInstrument } = await import('../three/heroInstrument');
      return (stage) =>
        buildHeroInstrument(stage, { kind: instrument, getSpeed: () => speedRef.current });
    },
    deps: [instrument],
  });

  return (
    <section id="top" className="fo-hero" aria-label={t(UI.hero.frame)}>
      <div ref={hostRef} className="fo-hero__stage" aria-hidden="true" />

      {!supported && (
        <div className="fo-hero__fallback" aria-hidden="true">
          <ArmillaryFallback />
        </div>
      )}

      <div className="fo-hero__frame" aria-hidden="true">
        <span className="fo-mono fo-hero__frameLabel">{t(UI.hero.frame)}</span>
      </div>

      <div className="fo-hero__inner">
        <div className="fo-hero__copy">
          <p className="fo-mono fo-eyebrow">
            {t(CODEX_TITLE)} · {IDENTITY.year}
          </p>
          <h1 className="fo-hero__name">
            {IDENTITY.nameLines[0]}{' '}
            <br />
            {IDENTITY.nameLines[1]}
          </h1>
          <p className="fo-mono fo-hero__role">{t(UI.hero.role)}</p>
          <p className="fo-hero__lede">{t(UI.hero.lede)}</p>
          <div className="fo-hero__actions">
            <a className="fo-mono fo-btn fo-btn--solid" href="#plates">
              {t(UI.hero.examine)}
            </a>
            <a className="fo-mono fo-btn fo-btn--outline" href="#correspondence">
              {t(UI.hero.letter)}
            </a>
          </div>
        </div>
      </div>

      <p className="fo-mono fo-hero__cue" aria-hidden="true">
        <span>{t(UI.hero.scroll)}</span>
        <span>↓</span>
      </p>
    </section>
  );
}
