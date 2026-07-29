import type { Localized } from '../i18n/locale';

/**
 * § II — Cursus honorum. Six years drawn as an orrery: formation at the
 * centre, each engagement in its own orbit. Order is load-bearing — index 0
 * is the central body, and every later index is the next orbit outward.
 */

export interface Chapter {
  /** Two-digit enumeration, as engraved. */
  readonly num: string;
  /** Short name for the register list. Employers keep their own names. */
  readonly name: Localized<string>;
  readonly dates: Localized<string>;
  /** Read out over the instrument on hover or selection. */
  readonly label: Localized<string>;
  readonly title: Localized<string>;
  readonly summary: Localized<string>;
  readonly stack: readonly string[];
}

/** Typed as non-empty so `chapterAt` always has something to fall back to. */
export const CHAPTERS: readonly [Chapter, ...Chapter[]] = [
  {
    num: '00',
    name: { en: 'Formation', pl: 'Nauki' },
    dates: { en: '2017 — 2023', pl: '2017 — 2023' },
    label: { en: '00 · Formation — the academies', pl: '00 · Nauki — uczelnie' },
    title: { en: 'BEng & MSc, Computer Science', pl: 'Inż. i mgr informatyki' },
    summary: {
      en: 'Bachelor of Engineering at the Polish Naval Academy, Gdynia (2017–2021) — web programming and DevOps. Master of Science at WSB Gdańsk (2021–2023) — front-end specialisation, completed while already in service.',
      pl: 'Inżynier na Akademii Marynarki Wojennej w Gdyni (2017–2021) — programowanie webowe i DevOps. Magister w WSB Gdańsk (2021–2023) — specjalność front-end, kończony już na etacie.',
    },
    stack: ['Web', 'DevOps', 'Front-end'],
  },
  {
    num: '01',
    name: { en: 'KS Sport', pl: 'KS Sport' },
    dates: { en: '2020 — 2021', pl: '2020 — 2021' },
    label: {
      en: '01 · KS Sport — junior web developer',
      pl: '01 · KS Sport — młodszy programista webowy',
    },
    title: {
      en: 'Junior Web Developer — KS Sport',
      pl: 'Młodszy programista webowy — KS Sport',
    },
    summary: {
      en: 'First post. JavaScript and PHP solutions designed and built from scratch, with an SQL database kept in good order.',
      pl: 'Pierwsza posada. Rozwiązania w JavaScripcie i PHP — projektowane i pisane od zera, przy bazie SQL trzymanej w porządku.',
    },
    stack: ['JavaScript', 'PHP', 'SQL'],
  },
  {
    num: '02',
    name: { en: 'Softwarebay', pl: 'Softwarebay' },
    dates: { en: '2021', pl: '2021' },
    label: {
      en: '02 · Softwarebay — junior full-stack developer',
      pl: '02 · Softwarebay — młodszy programista full-stack',
    },
    title: {
      en: 'Junior Full-Stack Developer — Softwarebay',
      pl: 'Młodszy programista full-stack — Softwarebay',
    },
    summary: {
      en: 'React and Next.js at the front, a Laravel back-end maintained in PHP — the first full-stack commission.',
      pl: 'React i Next.js od frontu, zaplecze w Laravelu utrzymywane w PHP — pierwsze zlecenie full-stack.',
    },
    stack: ['React', 'Next.js', 'Laravel', 'PHP'],
  },
  {
    num: '03',
    name: { en: 'WEUPCODE', pl: 'WEUPCODE' },
    dates: { en: '2021 — 2023', pl: '2021 — 2023' },
    label: { en: '03 · WEUPCODE — React developer', pl: '03 · WEUPCODE — programista React' },
    title: { en: 'React Developer — WEUPCODE', pl: 'Programista React — WEUPCODE' },
    summary: {
      en: 'Sixteen months of steady React craftsmanship: TypeScript, Redux and Tailwind against REST services, shipping features week over week.',
      pl: 'Szesnaście miesięcy spokojnego rzemiosła w React: TypeScript, Redux i Tailwind przy usługach REST — funkcja za funkcją, tydzień po tygodniu.',
    },
    stack: ['TypeScript', 'Redux', 'Tailwind', 'REST'],
  },
  {
    num: '04',
    name: { en: 'Ecohedge', pl: 'Ecohedge' },
    dates: { en: '2023 — 2024', pl: '2023 — 2024' },
    label: {
      en: '04 · Ecohedge — full-stack developer',
      pl: '04 · Ecohedge — programista full-stack',
    },
    title: { en: 'Full-Stack Developer — Ecohedge', pl: 'Programista full-stack — Ecohedge' },
    summary: {
      en: 'Data visualisation in React and React-Table; Auth0, Mailgun, Codat and OpenAI integrations over MongoDB — the first commercial brush with LLM APIs.',
      pl: 'Wizualizacja danych w React i React-Table; integracje z Auth0, Mailgun, Codat i OpenAI na MongoDB — pierwsze komercyjne zetknięcie z API modeli językowych.',
    },
    stack: ['Next.js', 'Jotai', 'MongoDB', 'Auth0', 'OpenAI'],
  },
  {
    num: '05',
    name: { en: 'TME', pl: 'TME' },
    dates: { en: '2024 — present', pl: '2024 — obecnie' },
    label: {
      en: '05 · TME — backend developer, the current commission',
      pl: '05 · TME — programista backendu, zlecenie bieżące',
    },
    title: { en: 'Backend Developer — TME', pl: 'Programista backendu — TME' },
    summary: {
      en: 'APIs, search algorithms and PostgreSQL on the platform side; Python, LangGraph, LangChain and Ollama bringing local LLM inference into production. The current commission.',
      pl: 'API, algorytmy wyszukiwania i PostgreSQL po stronie platformy; Python, LangGraph, LangChain i Ollama, którymi lokalne wnioskowanie trafia na produkcję. Zlecenie bieżące.',
    },
    stack: ['TypeScript', 'PostgreSQL', 'Python', 'LangGraph', 'Ollama'],
  },
];

/** The current commission is the body the instrument opens on. */
export const DEFAULT_CHAPTER = CHAPTERS.length - 1;

/** Bodies on the instrument map to chapters by index; out of range reads as formation. */
export function chapterAt(index: number): Chapter {
  return CHAPTERS[index] ?? CHAPTERS[0];
}
