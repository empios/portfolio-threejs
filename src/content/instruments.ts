import type { Localized } from '../i18n/locale';

/** § IV — A specimen catalogue of the instruments in regular use. */

export interface Specimen {
  /** Tools keep their names in every language. */
  readonly name: string;
  /** The hand it is kept for. */
  readonly note: Localized<string>;
}

export interface SpecimenCase {
  readonly title: Localized<string>;
  readonly specimens: readonly Specimen[];
}

export const INSTRUMENT_CASES: readonly SpecimenCase[] = [
  {
    title: { en: 'Backend', pl: 'Backend' },
    specimens: [
      { name: 'Python', note: { en: 'since 2017', pl: 'od 2017' } },
      { name: 'FastAPI', note: { en: 'services & pipelines', pl: 'usługi i potoki' } },
      { name: 'PostgreSQL', note: { en: 'ledger, queue, store', pl: 'rejestr, kolejka, magazyn' } },
      { name: 'SQLAlchemy', note: { en: 'core & ORM', pl: 'rdzeń i ORM' } },
      { name: 'Redis', note: { en: 'cache & locks', pl: 'cache i blokady' } },
      { name: 'pytest', note: { en: 'golden files', pl: 'pliki wzorcowe' } },
      { name: 'Node.js', note: { en: 'Express & REST', pl: 'Express i REST' } },
    ],
  },
  {
    title: { en: 'Frontend', pl: 'Frontend' },
    specimens: [
      { name: 'TypeScript', note: { en: 'strict, always', pl: 'zawsze strict' } },
      { name: 'React', note: { en: 'since the hooks', pl: 'od czasu hooków' } },
      { name: 'Next.js', note: { en: 'static export', pl: 'eksport statyczny' } },
      { name: 'Tailwind CSS', note: { en: 'utility discipline', pl: 'utility z dyscypliną' } },
      { name: 'Playwright', note: { en: 'end-to-end proof', pl: 'dowód od końca do końca' } },
      { name: 'Redux · Jotai', note: { en: 'state, both schools', pl: 'stan, obie szkoły' } },
    ],
  },
  {
    title: { en: 'ML & Infra', pl: 'ML i infrastruktura' },
    specimens: [
      { name: 'PyTorch', note: { en: 'training & finetunes', pl: 'trening i dostrajanie' } },
      { name: 'CTranslate2', note: { en: 'inference at speed', pl: 'szybkie wnioskowanie' } },
      { name: 'llama.cpp · Ollama', note: { en: 'local models', pl: 'modele lokalne' } },
      { name: 'LangGraph', note: { en: 'agent graphs', pl: 'grafy agentów' } },
      { name: 'FAISS · pgvector', note: { en: 'retrieval', pl: 'wyszukiwanie' } },
      { name: 'Docker', note: { en: 'reproducible crates', pl: 'powtarzalne kontenery' } },
      { name: 'GitHub Actions', note: { en: 'CI & cron', pl: 'CI i cron' } },
      { name: 'Rust · Tauri', note: { en: 'desktop systems', pl: 'systemy desktopowe' } },
    ],
  },
];
