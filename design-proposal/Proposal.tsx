import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../src/config/contact';
import { SUGGESTIONS } from '../src/content/archive';
import { CHAPTERS } from '../src/content/career';
import { INSTRUMENT_CASES } from '../src/content/instruments';
import { PLATES, type Plate } from '../src/content/plates';
import { IDENTITY, PORTRAIT } from './portrait';
import { FIGURES } from '../src/components/figures';
import { LOCALE_NAMES, LOCALES, type Locale, type Localized } from '../src/i18n/locale';
import { searchArchive } from '../src/lib/searchArchive';
import { CLUSTER_LABELS, COPY, HEADLINE } from './copy';
import { mountCloud, type CloudHandle } from './cloud';

type T = <V>(value: Localized<V>) => V;

const SECTIONS = ['work', 'about', 'services', 'skills'] as const;
const VIRIDIS_OFFERS = ['#3b528b', '#21918c', '#5ec962'];

// ---------------------------------------------------------------------------
// Behaviour
// ---------------------------------------------------------------------------

/** Blur-fade leaves in as they reach the viewport. */
function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.shown = '';
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    root.classList.add('lt-js');
    return () => io.disconnect();
  }, []);
}

/** The section the reader is in, and whether the nav should step aside. */
function useScrollState() {
  const [active, setActive] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const contact = document.getElementById('contact');
      if (contact && contact.getBoundingClientRect().top <= line) current = null;
      setActive(current);
      // Steps aside while reading down, returns the moment you scroll up.
      setHidden(y > 640 && y > lastY + 4);
      if (Math.abs(y - lastY) > 4) lastY = y;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
    };
  }, []);

  return { active, hidden };
}

/** Words of a paragraph rise from grey to ink as it scrolls through view. */
function Scrub({ text }: { readonly text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const spans = Array.from(el.querySelectorAll('span'));
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the paragraph enters at 85% of the viewport, 1 when it reaches 35%.
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.5)));
      const lit = progress * spans.length;
      spans.forEach((span, i) => {
        span.style.setProperty('--o', String(0.16 + Math.min(1, Math.max(0, lit - i)) * 0.84));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
    };
  }, [text]);

  return (
    <p ref={ref} className="lt-scrub" aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          {word}{' '}
        </span>
      ))}
    </p>
  );
}

/** Counts up to the number in `value` once it is seen (after Magic UI's Number Ticker). */
function Ticker({ value, locale }: { readonly value: string; readonly locale: Locale }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  const target = match ? Number(match[2]!.replace(/,/g, '')) : null;
  const fmt = useMemo(() => new Intl.NumberFormat(locale === 'pl' ? 'pl-PL' : 'en-US'), [locale]);
  const final = match && target !== null ? `${match[1]}${fmt.format(target)}${match[3]}` : value;

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || target === null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const run = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = `${match[1]}${fmt.format(Math.round(target * eased))}${match[3]}`;
        if (t < 1) frame = requestAnimationFrame(run);
      };
      frame = requestAnimationFrame(run);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, fmt]);

  return <span ref={ref}>{final}</span>;
}

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------

function Nav({
  t,
  locale,
  setLocale,
  onAsk,
}: {
  readonly t: T;
  readonly locale: Locale;
  readonly setLocale: (l: Locale) => void;
  readonly onAsk: () => void;
}) {
  const { active, hidden } = useScrollState();
  const linksRef = useRef<HTMLDivElement>(null);
  const [chip, setChip] = useState<CSSProperties>({ opacity: 0 });

  useEffect(() => {
    const host = linksRef.current;
    const link = active ? host?.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
    setChip(
      link
        ? { opacity: 1, width: link.offsetWidth, translate: `${link.offsetLeft}px 0` }
        : { opacity: 0 },
    );
  }, [active, locale]);

  const labels: Record<(typeof SECTIONS)[number], Localized<string>> = {
    work: COPY.nav.work,
    about: COPY.nav.about,
    services: COPY.nav.services,
    skills: COPY.nav.skills,
  };

  return (
    <nav className="lt-nav" data-hidden={hidden ? '' : undefined} aria-label="Primary">
      <a className="lt-nav__brand" href="#top" aria-label={IDENTITY.name}>
        {IDENTITY.monogram}
      </a>
      <div className="lt-nav__links" ref={linksRef}>
        <span className="lt-nav__chip" style={chip} aria-hidden="true" />
        {SECTIONS.map((id) => (
          <a
            key={id}
            data-id={id}
            className="lt-nav__link"
            href={`#${id}`}
            aria-current={active === id ? 'true' : undefined}
          >
            {t(labels[id])}
          </a>
        ))}
      </div>
      <button type="button" className="lt-nav__ask" onClick={onAsk}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <span className="lt-nav__askLabel">{t(COPY.nav.ask)}</span>
        <span className="lt-sr">{t(COPY.nav.ask)}</span>
        <kbd className="lt-kbd">⌘K</kbd>
      </button>
      <div className="lt-nav__lang" role="group" aria-label="Language">
        {LOCALES.map((code) => (
          <button key={code} type="button" lang={code} aria-pressed={code === locale} onClick={() => setLocale(code)}>
            {LOCALE_NAMES[code]}
          </button>
        ))}
      </div>
      <a className="lt-btn lt-btn--primary" href="#contact">
        {t(COPY.nav.cta)}
      </a>
    </nav>
  );
}

function Hero({ t, locale }: { readonly t: T; readonly locale: Locale }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<CloudHandle | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const layer = labelsRef.current;
    if (!host || !layer) return;
    const clusters = PLATES.map((plate) => ({ id: plate.figure, label: CLUSTER_LABELS[plate.figure].en }));
    cloudRef.current = mountCloud(host, layer, clusters, (id) => {
      const card = document.getElementById(`project-${id}`);
      if (!card) return;
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.dataset.flash = '';
      window.setTimeout(() => delete card.dataset.flash, 1600);
    }, () => {
      const words = host.parentElement?.querySelectorAll('.lt-hero__title, .lt-hero__lead');
      if (!words?.length) return 0;
      const left = host.getBoundingClientRect().left;
      let right = 0;
      words.forEach((el) => {
        // The rendered text's extent, not its box: measure each line's glyphs.
        const range = document.createRange();
        range.selectNodeContents(el);
        for (const rect of range.getClientRects()) right = Math.max(right, rect.right);
      });
      return right - left + 16;
    });
    return () => cloudRef.current?.destroy();
  }, []);

  useEffect(() => {
    cloudRef.current?.setLabels(PLATES.map((plate) => t(CLUSTER_LABELS[plate.figure])));
  }, [t]);

  return (
    <header id="top" className="lt-hero">
      <div ref={hostRef} className="lt-hero__cloud" />
      <div ref={labelsRef} className="lt-hero__labels" />

      <div className="lt-wrap lt-hero__inner">
        <p className="lt-status lt-enter" style={{ '--i': 0 } as CSSProperties}>
          <span className="lt-status__dot" aria-hidden="true" />
          {t(COPY.hero.status)}
        </p>
        <h1 className="lt-hero__title lt-enter" style={{ '--i': 1 } as CSSProperties}>
          {t(COPY.hero.titleBefore)}
          <em>{t(COPY.hero.titleEm)}</em>
          {t(COPY.hero.titleAfter)}
        </h1>
        <p className="lt-hero__lead lt-enter" style={{ '--i': 2 } as CSSProperties}>
          <strong>{IDENTITY.name}</strong> — {t(COPY.hero.lead)}
        </p>
        <div className="lt-hero__actions lt-enter" style={{ '--i': 3 } as CSSProperties}>
          <a className="lt-btn lt-btn--primary" href="#work">
            {t(COPY.hero.primary)} <span className="lt-btn__arrow" aria-hidden="true">→</span>
          </a>
          <a className="lt-btn lt-btn--ghost" href={`mailto:${CONTACT_EMAIL}`}>
            {t(COPY.hero.secondary)}
          </a>
        </div>
      </div>

      <div className="lt-hero__foot">
        <div className="lt-wrap lt-hero__footRow lt-mono lt-enter" style={{ '--i': 5 } as CSSProperties}>
          <p className="lt-hero__now">{t(COPY.hero.now)}</p>
          <p className="lt-hero__cloudHint" lang={locale}>
            {t(COPY.hero.hint)}
          </p>
        </div>
      </div>
    </header>
  );
}

function ProjectCard({ plate, t, locale, wide, delay }: {
  readonly plate: Plate;
  readonly t: T;
  readonly locale: Locale;
  readonly wide: boolean;
  readonly delay: number;
}) {
  const Figure = FIGURES[plate.figure];
  const headline = HEADLINE[plate.figure];

  const onMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <article
      id={`project-${plate.figure}`}
      className={`lt-card${wide ? ' lt-card--wide' : ''}`}
      onPointerMove={onMove}
      data-reveal=""
      style={{ '--d': `${delay}ms` } as CSSProperties}
    >
      <div className="lt-card__figure">
        <Figure />
      </div>
      <div className="lt-card__body">
        {headline && (
          <>
            <p className="lt-card__figureValue">
              <Ticker value={headline.value} locale={locale} />
            </p>
            <p className="lt-card__figureLabel">{t(headline.label)}</p>
          </>
        )}
        <h3 className="lt-card__title">{t(plate.title)}</h3>
        <p className="lt-card__text">{t(plate.summary)}</p>
        <div className="lt-card__foot">
          <ul className="lt-stack" aria-label="Stack">
            {plate.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {plate.source && (
            <a className="lt-link" href={plate.source} target="_blank" rel="noreferrer">
              {t(COPY.work.source)} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Work({ t, locale }: { readonly t: T; readonly locale: Locale }) {
  const client = PLATES.filter((p) => p.group === 'commercial');
  const workshop = PLATES.filter((p) => p.group === 'workshop');
  // A gapless 3-column bento: wide, narrow / narrow, wide.
  const wideAt = new Set([0, 3]);

  return (
    <section id="work" className="lt-section" aria-labelledby="work-title">
      <div className="lt-wrap">
        <div className="lt-section__head">
          <div data-reveal="">
            <p className="lt-kicker">{t(COPY.work.kicker)}</p>
            <h2 id="work-title" className="lt-h2">
              {t(COPY.work.title)}
            </h2>
          </div>
          <Scrub text={t(COPY.work.intro)} />
        </div>

        <div className="lt-group" data-reveal="">
          <h3 className="lt-group__title">{t(COPY.work.client)}</h3>
          <span className="lt-mono lt-group__count">
            {client.length} {t(COPY.work.projects)}
          </span>
        </div>
        <div className="lt-bento">
          {client.map((plate, i) => (
            <ProjectCard key={plate.figure} plate={plate} t={t} locale={locale} wide={wideAt.has(i)} delay={(i % 2) * 80} />
          ))}
        </div>

        <div className="lt-group" data-reveal="" style={{ marginTop: 72 }}>
          <h3 className="lt-group__title">{t(COPY.work.workshop)}</h3>
          <span className="lt-mono lt-group__count">
            {workshop.length} {t(COPY.work.projects)}
          </span>
        </div>
        <div className="lt-bento lt-bento--workshop">
          {workshop.map((plate, i) => (
            <ProjectCard key={plate.figure} plate={plate} t={t} locale={locale} wide={false} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ t }: { readonly t: T }) {
  const chapters = [...CHAPTERS].reverse();

  return (
    <section id="about" className="lt-section" aria-labelledby="about-title">
      <div className="lt-wrap lt-about">
        <figure className="lt-portrait" data-reveal="">
          <div className="lt-portrait__frame">
            {PORTRAIT ? (
              <img className="lt-portrait__img" src={PORTRAIT.src} alt={t(PORTRAIT.alt)} width={960} height={1200} />
            ) : (
              <div className="lt-portrait__placeholder" role="img" aria-label={t(COPY.about.photo)}>
                <span className="lt-portrait__monogram">{IDENTITY.monogram}</span>
                <span className="lt-mono">{t(COPY.about.photo)}</span>
              </div>
            )}
          </div>
          <figcaption className="lt-portrait__caption lt-mono">
            <span>{IDENTITY.name}</span>
            <span>PL · UTC+2</span>
          </figcaption>
        </figure>

        <div>
          <div data-reveal="">
            <p className="lt-kicker">{t(COPY.about.kicker)}</p>
            <h2 id="about-title" className="lt-h2">
              {t(COPY.about.title)}
            </h2>
            <p className="lt-about__text">{t(COPY.about.text)}</p>
          </div>
          <ol className="lt-timeline">
            {chapters.map((chapter, i) => (
              <li
                key={chapter.num}
                className="lt-timeline__item"
                data-now={i === 0 ? '' : undefined}
                data-reveal=""
                style={{ '--d': `${i * 50}ms` } as CSSProperties}
              >
                <span className="lt-timeline__dates lt-mono">{t(chapter.dates)}</span>
                <div>
                  <p className="lt-timeline__role">{t(chapter.title)}</p>
                  <p className="lt-timeline__summary">{t(chapter.summary)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Services({ t }: { readonly t: T }) {
  return (
    <section id="services" className="lt-section" aria-labelledby="services-title" style={{ paddingTop: 0 }}>
      <div className="lt-wrap">
        <div className="lt-services" data-reveal="">
          <div className="lt-services__top">
            <div>
              <p className="lt-kicker">{t(COPY.services.kicker)}</p>
              <h2 id="services-title" className="lt-h2">
                {t(COPY.services.title)}
              </h2>
              <p className="lt-services__lead">{t(COPY.services.lead)}</p>
            </div>
            <a className="lt-btn lt-btn--primary" href="https://codeworks-it.pl" target="_blank" rel="noreferrer">
              {t(COPY.services.cta)} <span className="lt-btn__arrow" aria-hidden="true">↗</span>
            </a>
          </div>
          <ul className="lt-offers">
            {COPY.services.offers.map((offer, i) => (
              <li key={offer.title.en} className="lt-offer">
                <span className="lt-offer__swatch" style={{ background: VIRIDIS_OFFERS[i] }} aria-hidden="true" />
                <p className="lt-offer__title">{t(offer.title)}</p>
                <p className="lt-offer__text">{t(offer.text)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Skills({ t }: { readonly t: T }) {
  return (
    <section id="skills" className="lt-section" aria-labelledby="skills-title" style={{ paddingTop: 0 }}>
      <div className="lt-wrap">
        <div className="lt-section__head" data-reveal="">
          <div>
            <p className="lt-kicker">{t(COPY.skills.kicker)}</p>
            <h2 id="skills-title" className="lt-h2">
              {t(COPY.skills.title)}
            </h2>
          </div>
        </div>
        <div className="lt-skills">
          {INSTRUMENT_CASES.map((group, i) => (
            <div key={group.title.en} data-reveal="" style={{ '--d': `${i * 80}ms` } as CSSProperties}>
              <div className="lt-group">
                <h3 className="lt-group__title">{t(group.title)}</h3>
                <span className="lt-mono lt-group__count">{group.specimens.length}</span>
              </div>
              <ul className="lt-skills__list">
                {group.specimens.map((skill) => (
                  <li key={skill.name} className="lt-skill">
                    <p className="lt-skill__name">{skill.name}</p>
                    <p className="lt-skill__note">{t(skill.note)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ t }: { readonly t: T }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <section id="contact" className="lt-contact" aria-labelledby="contact-title">
      <div className="lt-wrap">
        <div data-reveal="">
          <p className="lt-kicker">{t(COPY.contact.kicker)}</p>
          <h2 id="contact-title" className="lt-contact__title">
            {t(COPY.contact.title)}
          </h2>
        </div>
        <div className="lt-contact__mail" data-reveal="" style={{ '--d': '120ms' } as CSSProperties}>
          <a className="lt-contact__address" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <button type="button" className="lt-copy" onClick={copy} aria-live="polite">
            {copied ? `✓ ${t(COPY.contact.copied)}` : t(COPY.contact.copy)}
          </button>
        </div>
        <div className="lt-contact__links" data-reveal="" style={{ '--d': '200ms' } as CSSProperties}>
          <a className="lt-btn lt-btn--ghost" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a className="lt-btn lt-btn--ghost" href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a className="lt-btn lt-btn--ghost" href="https://codeworks-it.pl" target="_blank" rel="noreferrer">
            CodeWorks ↗
          </a>
        </div>
        <p className="lt-contact__terms lt-mono">{t(COPY.contact.terms)}</p>

        <footer className="lt-footer lt-mono">
          <span>© {new Date().getFullYear()} {IDENTITY.name}</span>
          <span>pawelvlodarczyk.pl</span>
        </footer>
      </div>
    </section>
  );
}

function Ask({ t, locale, open, onClose }: {
  readonly t: T;
  readonly locale: Locale;
  readonly open: boolean;
  readonly onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const hits = searchArchive(query, locale);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="lt-ask"
      aria-label={t(COPY.ask.label)}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lt-ask__field">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          className="lt-ask__input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t(COPY.ask.placeholder)}
          aria-label={t(COPY.ask.label)}
          autoFocus
        />
        <kbd className="lt-kbd">esc</kbd>
      </div>
      <div className="lt-ask__body">
        {hits === null ? (
          <>
            <p className="lt-ask__hint">{t(COPY.ask.hint)}</p>
            <div className="lt-ask__chips">
              {t(SUGGESTIONS).map((s) => (
                <button key={s} type="button" className="lt-ask__chip" onClick={() => setQuery(s)}>
                  {s}
                </button>
              ))}
            </div>
          </>
        ) : hits.length === 0 ? (
          <p className="lt-ask__hint">{t(COPY.ask.none)}</p>
        ) : (
          hits.map(({ record }) => (
            <article key={record.title.en} className="lt-hit">
              <p className="lt-hit__title">{t(record.title)}</p>
              <p className="lt-hit__text">{t(record.text)}</p>
            </article>
          ))
        )}
      </div>
    </dialog>
  );
}

// ---------------------------------------------------------------------------

export function Proposal() {
  const [locale, setLocale] = useState<Locale>('en');
  const [asking, setAsking] = useState(false);
  const t = useCallback<T>((value) => value[locale], [locale]);
  useReveal();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setAsking((value) => !value);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Nav t={t} locale={locale} setLocale={setLocale} onAsk={() => setAsking(true)} />
      <Hero t={t} locale={locale} />
      <main>
        <Work t={t} locale={locale} />
        <About t={t} />
        <Services t={t} />
        <Skills t={t} />
      </main>
      <Contact t={t} />
      <Ask t={t} locale={locale} open={asking} onClose={() => setAsking(false)} />
    </>
  );
}
