import type { Localized } from '../i18n/locale';

/** § I — Selected work. Each plate is a shipped mechanism, drawn at reduced scale. */

/** Keys the plate to its engraved figure in `components/figures`. */
export type FigureId =
  | 'translation'
  | 'photographic'
  | 'reference'
  | 'cada'
  | 'humanize'
  | 'pangolin';

export interface Plate {
  readonly figure: FigureId;
  /** Provenance of the drawing — a notebook leaf, or a public repository. */
  readonly reference: Localized<string>;
  readonly figureCaption: Localized<string>;
  readonly title: Localized<string>;
  readonly summary: Localized<string>;
  /** The plate's headline measurements, set in small caps. */
  readonly metrics: Localized<string>;
  /** Tool names travel untranslated. */
  readonly stack: readonly string[];
  readonly source?: string;
}

export const PLATES: readonly Plate[] = [
  {
    figure: 'translation',
    reference: { en: 'Notebook I · Leaves 3–18', pl: 'Zeszyt I · Karty 3–18' },
    figureCaption: {
      en: 'Fig. 1 — The three-stage QA circuit',
      pl: 'Ryc. 1 — Trzystopniowy obwód kontroli',
    },
    title: { en: 'The Translation Engine', pl: 'Maszyna translatorska' },
    summary: {
      en: 'A batch machine-translation pipeline that carried roughly a million catalogue rows across languages. CTranslate2 supplies the throughput; a three-stage QA circuit — rule checks, back-translation, human sampling — decides what ships. Postgres keeps the ledger, and every failure is resumable.',
      pl: 'Wsadowy potok tłumaczenia maszynowego, przez który przeszło blisko milion wierszy katalogu. CTranslate2 daje przepustowość, a o tym, co pójdzie dalej, rozstrzyga trzystopniowa kontrola: reguły, tłumaczenie zwrotne i wyrywkowy przegląd człowieka. Postgres prowadzi rejestr, więc po każdej awarii da się podjąć pracę tam, gdzie stanęła.',
    },
    metrics: {
      en: '≈1,000,000 rows · 3-stage QA · resumable batches',
      pl: '≈1 000 000 wierszy · kontrola trzystopniowa · partie wznawialne',
    },
    stack: ['Python', 'FastAPI', 'CTranslate2', 'PostgreSQL'],
  },
  {
    figure: 'photographic',
    reference: { en: 'Notebook II · Leaves 23–27', pl: 'Zeszyt II · Karty 23–27' },
    figureCaption: {
      en: 'Fig. 2 — Subject lifted, ground restored',
      pl: 'Ryc. 2 — Przedmiot wyjęty, tło domalowane',
    },
    title: { en: 'The Photographic Apparatus', pl: 'Aparat fotograficzny' },
    summary: {
      en: "A product-photography pipeline that lifts subjects with a fine-tuned YOLO segmentation model and restores the vacated background with LaMa inpainting. Thousands of images brought to catalogue standard without a retoucher's hand.",
      pl: 'Potok do zdjęć produktowych: dostrojony model YOLO wycina przedmiot z kadru, a LaMa domalowuje tło, które po nim zostało. Tysiące zdjęć doprowadzonych do katalogowego porządku bez udziału retuszera.',
    },
    metrics: {
      en: 'YOLOv8-seg masks · LaMa infill · catalogue scale',
      pl: 'Maski YOLOv8-seg · domalowanie LaMa · skala katalogowa',
    },
    stack: ['PyTorch', 'YOLOv8-seg', 'LaMa', 'OpenCV'],
  },
  {
    figure: 'reference',
    reference: { en: 'Notebook III · Leaves 41–55', pl: 'Zeszyt III · Karty 41–55' },
    figureCaption: {
      en: 'Fig. 3 — The reference library, wired',
      pl: 'Ryc. 3 — Księgozbiór podręczny, okablowany',
    },
    title: { en: 'The Reference Library', pl: 'Księgozbiór podręczny' },
    summary: {
      en: 'Retrieval-augmented answering over a private document corpus — LangGraph for orchestration, llama.cpp for inference on modest hardware. Answers cite their leaves, and nothing leaves the building.',
      pl: 'Odpowiedzi budowane na prywatnym zbiorze dokumentów — LangGraph prowadzi orkiestrację, llama.cpp liczy na skromnym sprzęcie. Każda odpowiedź wskazuje kartę, z której pochodzi, i nic nie wychodzi poza budynek.',
    },
    metrics: {
      en: 'Local inference · private corpus · CPU-honest',
      pl: 'Wnioskowanie lokalne · zbiór prywatny · bez GPU',
    },
    stack: ['LangGraph', 'llama.cpp', 'FAISS', 'Docker'],
  },
  {
    figure: 'cada',
    reference: { en: 'GitHub · empios/CaDa', pl: 'GitHub · empios/CaDa' },
    figureCaption: {
      en: 'Fig. 4 — The virtual drive, indexed',
      pl: 'Ryc. 4 — Dysk wirtualny, zaindeksowany',
    },
    title: { en: 'The Context Engine — CADA', pl: 'Silnik kontekstu — CADA' },
    summary: {
      en: 'A privacy-first desktop agent in Rust that mounts a virtual semantic drive (X:) over WinFSP and turns static folders into a queryable knowledge network. Keyword and vector retrieval fused by reciprocal rank; OCR, visual and voice search run entirely offline. Its agent mode proposes bulk file operations — a human approves them before anything touches disk.',
      pl: 'Agent desktopowy w Rust, pisany z myślą o prywatności: montuje wirtualny dysk semantyczny (X:) przez WinFSP i zamienia zwykłe foldery w przeszukiwalną sieć wiedzy. Wyszukiwanie słowne i wektorowe łączy rangą odwrotną, a OCR oraz szukanie obrazem i głosem działa bez sieci. W trybie agenta proponuje masowe operacje na plikach — zanim cokolwiek dotknie dysku, zatwierdza je człowiek.',
    },
    metrics: {
      en: '100% local · virtual drive X: · human-in-the-loop',
      pl: '100% lokalnie · dysk wirtualny X: · człowiek zatwierdza',
    },
    stack: ['Rust', 'Tauri', 'WinFSP', 'SQLite FTS5', 'Ollama'],
    source: 'https://github.com/empios/CaDa',
  },
  {
    figure: 'humanize',
    reference: { en: 'GitHub · empios/humanize-pl', pl: 'GitHub · empios/humanize-pl' },
    figureCaption: {
      en: 'Fig. 5 — Candidates at the gates',
      pl: 'Ryc. 5 — Kandydaci u bram',
    },
    title: { en: "The Corrector's Press — humanize-pl", pl: 'Prasa korektorska — humanize-pl' },
    summary: {
      en: 'A deterministic engine that redacts AI-drafted Polish legal prose — no generative model in the loop. Rule-generated candidates pass layered validators that guard normativity, parties, amounts and dates; Stanza syntax and a semantic filter stand as optional gates, and every decision is logged to a JSON report.',
      pl: 'Deterministyczny redaktor polskich tekstów prawniczych pisanych przez AI — bez modelu generatywnego w pętli. Warianty tworzone regułami przechodzą przez kolejne walidatory, które pilnują normatywności, stron, kwot i dat; składnia Stanza i filtr semantyczny stoją jako bramy dodatkowe, a każda decyzja trafia do raportu JSON.',
    },
    metrics: {
      en: 'Deterministic · validator-gated · Polish legal prose',
      pl: 'Deterministycznie · bramy walidatorów · polska proza prawnicza',
    },
    stack: ['Python', 'Stanza', 'sentence-transformers', 'DOCX'],
    source: 'https://github.com/empios/humanize-pl',
  },
  {
    figure: 'pangolin',
    reference: { en: 'GitHub · empios/Pangolin', pl: 'GitHub · empios/Pangolin' },
    figureCaption: { en: 'Fig. 6 — Specimens of the system', pl: 'Ryc. 6 — Okazy systemu' },
    title: { en: 'The Pattern Book — Pangolin', pl: 'Wzornik — Pangolin' },
    summary: {
      en: 'A design system of warm paper, aubergine ink and sealing-wax orange: tokens, base styles, components and a live tweaks panel, with demos for desktop, mobile and dashboard. The very system this folio is set in.',
      pl: 'System projektowy z ciepłego papieru, bakłażanowego atramentu i pomarańczy laku: tokeny, style bazowe, komponenty i panel do regulacji na żywo, z pokazami na desktop, mobile i pulpit. Ten sam system, w którym złożono ten zbiór.',
    },
    metrics: {
      en: 'Tokens · components · tweaks panel · this very folio',
      pl: 'Tokeny · komponenty · panel regulacji · ten właśnie zbiór',
    },
    stack: ['tokens.css', 'base.css', 'components.css', 'tweaks-panel.jsx'],
    source: 'https://github.com/empios/Pangolin',
  },
];
