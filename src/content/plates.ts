import type { Localized } from '../i18n/locale';

/** § I — Selected work. Each plate is a shipped mechanism, drawn at reduced scale. */

/** Keys the plate to its engraved figure in `components/figures`. */
export type FigureId =
  | 'enterprise'
  | 'translation'
  | 'photographic'
  | 'reference'
  | 'cada'
  | 'humanize'
  | 'pangolin';

export type PlateGroup = 'commercial' | 'workshop';

export interface Plate {
  readonly group: PlateGroup;
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
    group: 'commercial',
    figure: 'enterprise',
    reference: {
      en: 'Enterprise Commission · Commercial Platform',
      pl: 'Wdrożenie enterprise · Platforma usług',
    },
    figureCaption: {
      en: 'Fig. 1 — The AI intelligence engine in service procurement',
      pl: 'Ryc. 1 — Integracja silnika AI w procesie zakupu usług',
    },
    title: {
      en: 'Services Intelligence Platform',
      pl: 'Platforma zakupu usług — Enterprise AI',
    },
    summary: {
      en: 'An enterprise-grade platform integrating language models and semantic evaluation pipelines directly into service discovery and purchasing flows. The system automates inquiry routing, validates matching criteria in real time, and interfaces directly with core business operations.',
      pl: 'Zintegrowana platforma klasy enterprise wspierająca proces doboru i zakupu usług z wykorzystaniem modeli językowych oraz algorytmów rekomendacji. System automatyzuje kwalifikację zapytań, weryfikuje kryteria dopasowania w czasie rzeczywistym i łączy się bezpośrednio z procesami biznesowymi klienta.',
    },
    metrics: {
      en: 'Enterprise scale · real-time inference · automated routing',
      pl: 'Skala enterprise · wnioskowanie w czasie rzeczywistym · automatyzacja decyzji',
    },
    stack: ['Python', 'FastAPI', 'LLM Integration', 'PostgreSQL', 'Docker'],
  },
  {
    group: 'commercial',
    figure: 'translation',
    reference: { en: 'Notebook I · Leaves 3–18', pl: 'Zeszyt I · Karty 3–18' },
    figureCaption: {
      en: 'Fig. 2 — The three-stage QA circuit',
      pl: 'Ryc. 2 — Trzystopniowy obwód kontroli',
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
    group: 'commercial',
    figure: 'photographic',
    reference: { en: 'Notebook II · Leaves 23–27', pl: 'Zeszyt II · Karty 23–27' },
    figureCaption: {
      en: 'Fig. 3 — Subject lifted, ground restored',
      pl: 'Ryc. 3 — Przedmiot wyjęty, tło domalowane',
    },
    title: { en: 'The Photographic Apparatus', pl: 'Aparat fotograficzny' },
    summary: {
      en: 'A product-photography pipeline that lifts subjects with a fine-tuned YOLO segmentation model and restores the vacated background with LaMa inpainting. Replaces painstaking manual retouching with automated batch processing — over 50,000 images brought to catalogue standard in a fraction of the time.',
      pl: 'Potok do zdjęć produktowych: dostrojony model YOLO wycina przedmiot z kadru, a LaMa domalowuje opuszczone tło. Zastępuje żmudny retusz ręczny automatyczną obróbką wsadową — ponad 50 000 fotografii doprowadzonych do katalogowego porządku w ułamku dotychczasowego czasu.',
    },
    metrics: {
      en: '≈50,000 images · YOLOv8-seg masks · LaMa infill',
      pl: '≈50 000 zdjęć · maski YOLOv8-seg · domalowanie LaMa',
    },
    stack: ['PyTorch', 'YOLOv8-seg', 'LaMa', 'OpenCV'],
  },
  {
    group: 'commercial',
    figure: 'reference',
    reference: { en: 'Notebook III · Leaves 41–55', pl: 'Zeszyt III · Karty 41–55' },
    figureCaption: {
      en: 'Fig. 4 — The reference library, wired',
      pl: 'Ryc. 4 — Księgozbiór podręczny, okablowany',
    },
    title: { en: 'The Reference Library', pl: 'Księgozbiór podręczny' },
    summary: {
      en: 'Retrieval-augmented answering over a private corpus of 2,000 documents — LangGraph orchestrates the flow, and llama.cpp runs local CPU inference on modest hardware. Answers cite their source leaves, and nothing leaves the infrastructure.',
      pl: 'Odpowiedzi budowane na prywatnym indeksie ponad 2 000 dokumentów — LangGraph prowadzi orkiestrację, a llama.cpp odpowiada lokalnie na procesorze. Każda odpowiedź wskazuje kartę źródłową, a żadne dane nie opuszczają infrastruktury.',
    },
    metrics: {
      en: '≈2,000 documents · local inference · CPU-honest',
      pl: '≈2 000 dokumentów · wnioskowanie lokalne · bez GPU',
    },
    stack: ['LangGraph', 'llama.cpp', 'FAISS', 'Docker'],
  },
  {
    group: 'workshop',
    figure: 'cada',
    reference: { en: 'GitHub · empios/CaDa', pl: 'GitHub · empios/CaDa' },
    figureCaption: {
      en: 'Fig. 5 — The virtual drive, indexed',
      pl: 'Ryc. 5 — Dysk wirtualny, zaindeksowany',
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
    group: 'workshop',
    figure: 'humanize',
    reference: { en: 'GitHub · empios/humanize-pl', pl: 'GitHub · empios/humanize-pl' },
    figureCaption: {
      en: 'Fig. 6 — Candidates at the gates',
      pl: 'Ryc. 6 — Kandydaci u bram',
    },
    title: { en: "The Corrector's Press — humanize-pl", pl: 'Prasa korektorska — humanize-pl' },
    summary: {
      en: 'A deterministic engine that redacts AI-drafted Polish legal prose — no generative model in the loop. Rule-generated candidates pass layered validators that guard normativity, parties, amounts and dates; Stanza syntax and a semantic filter stand as optional gates, and every decision is logged to a JSON report.',
      pl: 'Deterministyczny redaktor polskich tekstów prawniczych pisanych przez AI — bez modelu generatywnego w pętli. Warianty tworzone regułami przechodzą przez kolejne walidatory, które pilnują normatywności, stron, kwot i dat; składnia Stanza i filtr semantyczny stoją jako bramy dodatkowe, a każda decyzja trafia do raportu JSON.',
    },
    metrics: {
      en: 'High precision profile · validator gates · legal entity guard',
      pl: 'Wysoki profil trafności · bramy walidatorów · ochrona encji prawnych',
    },
    stack: ['Python', 'Stanza', 'sentence-transformers', 'DOCX'],
    source: 'https://github.com/empios/humanize-pl',
  },
  {
    group: 'workshop',
    figure: 'pangolin',
    reference: { en: 'GitHub · empios/Pangolin', pl: 'GitHub · empios/Pangolin' },
    figureCaption: { en: 'Fig. 7 — Specimens of the system', pl: 'Ryc. 7 — Okazy systemu' },
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
