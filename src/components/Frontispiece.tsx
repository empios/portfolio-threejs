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
          <p
            className="fo-prose"
            style={{
              fontSize: 'clamp(17px, 1.8vw, 21px)',
              fontWeight: 500,
              lineHeight: 1.45,
              color: 'var(--pg-text-primary)',
              marginBottom: '14px',
            }}
          >
            {t(UI.hero.headline)}
          </p>
          <p className="fo-hero__lede" style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', marginBottom: '18px' }}>
            {t(UI.hero.sublede)}
          </p>
          <p
            className="fo-mono"
            style={{
              fontSize: '0.72rem',
              color: 'var(--pg-aubergine-50)',
              letterSpacing: '0.12em',
              marginBottom: '28px',
              padding: '6px 12px',
              background: 'var(--fo-well)',
              display: 'inline-block',
              borderLeft: '2px solid var(--pg-aubergine-50)',
            }}
          >
            {t(UI.hero.credentials)}
          </p>

          <div className="fo-hero__actions" style={{ marginTop: '12px' }}>
            <a className="fo-mono fo-btn fo-btn--solid" href="#cases">
              {t(UI.hero.examine)}
            </a>
            <a
              className="fo-mono fo-btn fo-btn--outline"
              href="mailto:pawelwlodarczyk97@yahoo.com"
            >
              Email ↗
            </a>
            <a
              className="fo-mono fo-btn fo-btn--outline"
              href="https://www.linkedin.com/in/pawelvlodarczyk"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              className="fo-mono fo-btn fo-btn--outline"
              href="https://codeworks-it.pl"
              target="_blank"
              rel="noreferrer"
            >
              CodeWorks ↗
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
