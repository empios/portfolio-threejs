import type { Localized } from '../i18n/locale';

/**
 * § III — The archive. A card catalogue over the engineer's records.
 * Retrieval runs entirely in the page; see `lib/searchArchive.ts`.
 */

export interface ArchiveRecord {
  readonly title: Localized<string>;
  /** Where the record is filed — notebook leaf, register entry, public repo. */
  readonly source: Localized<string>;
  readonly text: Localized<string>;
  /**
   * Retrieval handles, shared across languages so a Polish and an English
   * reader reach the same record. Matched by prefix in either direction, so
   * 'deploy' finds 'deployment' — and folded, so 'gdansk' finds 'gdańsk'.
   */
  readonly tags: readonly string[];
}

/** Offered to the reader who does not yet know what to ask. */
export const SUGGESTIONS: Localized<readonly string[]> = {
  en: ['career path', 'education', 'cada', 'local llms'],
  pl: ['ścieżka kariery', 'wykształcenie', 'cada', 'lokalne llm'],
};

export const RECORDS: readonly ArchiveRecord[] = [
  {
    title: {
      en: 'On deploying language models without GPUs',
      pl: 'O wdrażaniu modeli językowych bez GPU',
    },
    source: {
      en: 'Notebook III · Infrastructure, Leaf 41',
      pl: 'Zeszyt III · Infrastruktura, karta 41',
    },
    text: {
      en: 'Quantised GGUF weights under llama.cpp make CPU inference honest work: a 7B model answers in seconds on commodity hardware, and the whole deployment is one binary and one model file.',
      pl: 'Skwantyzowane wagi GGUF pod llama.cpp sprawiają, że wnioskowanie na procesorze staje się uczciwą robotą: model 7B odpowiada w kilka sekund na zwykłym sprzęcie, a całe wdrożenie to jeden plik wykonywalny i jeden plik modelu.',
    },
    tags: [
      'deploy', 'deployment', 'local', 'llm', 'llama.cpp', 'llama', 'cpu', 'quantization',
      'quantized', 'gguf', 'inference', 'models',
      'wdrożenie', 'wdrażanie', 'lokalnie', 'lokalne', 'kwantyzacja', 'wnioskowanie', 'modele',
      'procesor',
    ],
  },
  {
    title: {
      en: 'The three-stage QA circuit for machine translation',
      pl: 'Trzystopniowa kontrola tłumaczenia maszynowego',
    },
    source: { en: 'Notebook I · Pipelines, Leaf 12', pl: 'Zeszyt I · Potoki, karta 12' },
    text: {
      en: 'No translation ships on model confidence alone. Stage one applies rule checks — numerals, units, glossary terms; stage two back-translates and compares; stage three samples for human review.',
      pl: 'Żadne tłumaczenie nie idzie dalej na samej pewności modelu. Stopień pierwszy sprawdza regułami — liczby, jednostki, terminy ze słownika; drugi tłumaczy zwrotnie i porównuje; trzeci odkłada próbki do przeglądu przez człowieka.',
    },
    tags: [
      'translation', 'qa', 'quality', 'ctranslate2', 'pipeline', 'review', 'backtranslation',
      'checks',
      'tłumaczenie', 'kontrola', 'jakość', 'potok', 'weryfikacja', 'przegląd',
    ],
  },
  {
    title: { en: 'Why the models stay local', pl: 'Dlaczego modele zostają na miejscu' },
    source: {
      en: 'Notebook III · Infrastructure, Leaf 44',
      pl: 'Zeszyt III · Infrastruktura, karta 44',
    },
    text: {
      en: 'Client data never crosses the wire. Local inference removes the compliance question entirely, the costs are fixed and known, and latency is a LAN round-trip.',
      pl: 'Dane klienta nigdy nie wychodzą na zewnątrz. Lokalne wnioskowanie zdejmuje pytanie o zgodność w całości, koszty są stałe i znane, a opóźnienie mieści się w sieci lokalnej.',
    },
    tags: [
      'local', 'privacy', 'llm', 'cost', 'compliance', 'why', 'data', 'inference',
      'lokalnie', 'lokalne', 'prywatność', 'koszt', 'zgodność', 'dlaczego', 'dane',
    ],
  },
  {
    title: {
      en: 'Feeding a million rows through CTranslate2',
      pl: 'Milion wierszy przez CTranslate2',
    },
    source: { en: 'Notebook I · Pipelines, Leaf 9', pl: 'Zeszyt I · Potoki, karta 9' },
    text: {
      en: 'Postgres keeps the ledger; batches of 512 keep the beam search saturated. A checkpoint column makes every failure resumable — the pipeline has never lost a row.',
      pl: 'Postgres prowadzi rejestr, a partie po 512 nie pozwalają wyszukiwaniu wiązkowemu się nudzić. Kolumna z punktem kontrolnym pozwala podjąć pracę po każdej awarii — potok nie zgubił dotąd ani jednego wiersza.',
    },
    tags: [
      'translation', 'ctranslate2', 'batch', 'postgres', 'throughput', 'rows', 'pipeline',
      'million',
      'tłumaczenie', 'partia', 'wiersze', 'przepustowość', 'potok', 'milion', 'wsad',
    ],
  },
  {
    title: {
      en: 'Lifting subjects with YOLO segmentation',
      pl: 'Wycinanie przedmiotu segmentacją YOLO',
    },
    source: { en: 'Notebook II · Optics, Leaf 23', pl: 'Zeszyt II · Optyka, karta 23' },
    text: {
      en: 'A fine-tuned YOLOv8-seg model draws the product contour; the mask is dilated a few pixels so the inpainting never gnaws at the edge of the subject.',
      pl: 'Dostrojony model YOLOv8-seg obrysowuje produkt; maskę poszerza się o kilka pikseli, żeby domalowywanie nie podgryzało krawędzi przedmiotu.',
    },
    tags: [
      'yolo', 'segmentation', 'mask', 'masks', 'vision', 'photo', 'product', 'image',
      'segmentacja', 'maska', 'maski', 'obraz', 'zdjęcia', 'produkt', 'wizja',
    ],
  },
  {
    title: { en: 'Restoring grounds with LaMa', pl: 'Domalowywanie tła metodą LaMa' },
    source: { en: 'Notebook II · Optics, Leaf 27', pl: 'Zeszyt II · Optyka, karta 27' },
    text: {
      en: 'LaMa inpaints the vacated background convincingly at catalogue resolution; a tiled pass handles the large formats. The eye forgives texture long before it forgives geometry.',
      pl: 'LaMa domalowuje opuszczone tło przekonująco w rozdzielczości katalogowej, a przy dużych formatach pomaga przebieg kafelkowy. Oko wybaczy teksturę o wiele prędzej niż geometrię.',
    },
    tags: [
      'lama', 'inpainting', 'inpaint', 'background', 'backgrounds', 'photo', 'image', 'restore',
      'tło', 'zdjęcia', 'obraz', 'odtwarzanie', 'retusz', 'wypełnianie',
    ],
  },
  {
    title: {
      en: 'On chunking documents for retrieval',
      pl: 'O dzieleniu dokumentów na potrzeby wyszukiwania',
    },
    source: {
      en: 'Notebook III · Infrastructure, Leaf 52',
      pl: 'Zeszyt III · Infrastruktura, karta 52',
    },
    text: {
      en: "Split on structure, not on length: headings, clauses, tables. A chunk that respects the document's own joints retrieves cleanly and cites cleanly.",
      pl: 'Dziel wedle struktury, nie długości: nagłówki, paragrafy, tabele. Fragment, który uszanuje spoiny samego dokumentu, łatwo odnaleźć i łatwo zacytować.',
    },
    tags: [
      'rag', 'chunking', 'retrieval', 'embeddings', 'documents', 'index',
      'fragmentacja', 'wyszukiwanie', 'dokumenty', 'osadzenia', 'indeks', 'dzielenie',
    ],
  },
  {
    title: { en: 'LangGraph topology notes', pl: 'Notatki o topologii LangGraph' },
    source: {
      en: 'Notebook III · Infrastructure, Leaf 55',
      pl: 'Zeszyt III · Infrastruktura, karta 55',
    },
    text: {
      en: 'The agent graph stays small: route, retrieve, draft, verify. Cycles are permitted only through the verifier, so the machine may reconsider but never ramble.',
      pl: 'Graf agenta zostaje mały: skieruj, wyszukaj, zredaguj, sprawdź. Cykl prowadzi wyłącznie przez weryfikator, więc maszyna może się rozmyślić, ale nie rozgadać.',
    },
    tags: [
      'langgraph', 'agents', 'agent', 'orchestration', 'graph', 'rag', 'verify',
      'agenci', 'orkiestracja', 'graf', 'weryfikator', 'topologia',
    ],
  },
  {
    title: { en: 'The shape of a FastAPI service', pl: 'Kształt usługi FastAPI' },
    source: { en: 'Notebook I · Pipelines, Leaf 3', pl: 'Zeszyt I · Potoki, karta 3' },
    text: {
      en: 'Routers thin, services thick, repositories honest. Pydantic stands at the borders and nothing untyped crosses them.',
      pl: 'Routery cienkie, usługi grube, repozytoria uczciwe. Na granicach stoi Pydantic i nic nietypowanego ich nie przekracza.',
    },
    tags: [
      'fastapi', 'python', 'backend', 'architecture', 'api', 'pydantic', 'service',
      'architektura', 'usługa', 'zaplecze',
    ],
  },
  {
    title: { en: 'Testing the unglamorous way', pl: 'Testowanie bez blasku' },
    source: { en: 'Notebook I · Pipelines, Leaf 18', pl: 'Zeszyt I · Potoki, karta 18' },
    text: {
      en: 'Pipelines earn trust through fixtures: golden files for transforms, property tests for parsers, and a nightly run against a frozen sample of production.',
      pl: 'Potoki zdobywają zaufanie danymi testowymi: pliki wzorcowe dla przekształceń, testy własnościowe dla parserów i nocny przebieg na zamrożonej próbce produkcji.',
    },
    tags: [
      'testing', 'tests', 'pytest', 'ci', 'fixtures', 'quality', 'golden',
      'testy', 'testowanie', 'jakość', 'fikstury', 'wzorcowe',
    ],
  },
  {
    title: { en: 'Next.js on purely static ground', pl: 'Next.js na gruncie czysto statycznym' },
    source: { en: 'Notebook IV · The Workshop, Leaf 7', pl: 'Zeszyt IV · Warsztat, karta 7' },
    text: {
      en: 'Static export from Next.js serves from any shelf — GitHub Pages included. Data is baked at build time, interactivity hydrates client-side, and no server sits in the loop.',
      pl: 'Statyczny eksport z Next.js postawisz gdziekolwiek — z GitHub Pages włącznie. Dane zapiekają się przy budowaniu, interaktywność włącza się już w przeglądarce, a po drodze nie stoi żaden serwer aplikacji.',
    },
    tags: [
      'nextjs', 'react', 'static', 'frontend', 'github', 'pages', 'export', 'hosting',
      'statyczny', 'eksport', 'strony', 'hosting',
    ],
  },
  {
    title: { en: 'Postgres as a work queue', pl: 'Postgres jako kolejka zadań' },
    source: { en: 'Notebook I · Pipelines, Leaf 15', pl: 'Zeszyt I · Potoki, karta 15' },
    text: {
      en: 'SELECT … FOR UPDATE SKIP LOCKED is a perfectly fine queue for a million rows: fewer moving parts than a broker, and the ledger is already there.',
      pl: 'SELECT … FOR UPDATE SKIP LOCKED to zupełnie dobra kolejka na milion wierszy: mniej ruchomych części niż w brokerze, a rejestr i tak już stoi.',
    },
    tags: [
      'postgres', 'queue', 'workers', 'locked', 'batch', 'database',
      'kolejka', 'baza', 'danych', 'workery', 'zadania',
    ],
  },
  {
    title: { en: 'The present commission — TME', pl: 'Zlecenie bieżące — TME' },
    source: { en: 'Register of Service · Entry V', pl: 'Rejestr służby · Wpis V' },
    text: {
      en: 'Backend Developer at TME since October 2024: APIs, search algorithms and PostgreSQL on the platform side; Python, LangGraph, LangChain and Ollama bringing local inference into production.',
      pl: 'Programista backendu w TME od października 2024: API, algorytmy wyszukiwania i PostgreSQL po stronie platformy; Python, LangGraph, LangChain i Ollama, którymi lokalne wnioskowanie trafia na produkcję.',
    },
    tags: [
      'tme', 'current', 'role', 'job', 'backend', 'work', 'now', 'position', 'stack',
      'obecna', 'obecnie', 'praca', 'stanowisko', 'rola', 'teraz', 'zlecenie',
    ],
  },
  {
    title: {
      en: 'Six years in service — the career at a glance',
      pl: 'Sześć lat służby — kariera w skrócie',
    },
    source: { en: 'Register of Service · Summary', pl: 'Rejestr służby · Podsumowanie' },
    text: {
      en: 'KS Sport (2020), Softwarebay (2021), WEUPCODE (2021–23), Ecohedge (2023–24), and TME since October 2024 — junior web developer to backend engineer with applied ML.',
      pl: 'KS Sport (2020), Softwarebay (2021), WEUPCODE (2021–23), Ecohedge (2023–24) i TME od października 2024 — od młodszego programisty webowego do inżyniera backendu ze stosowanym uczeniem maszynowym.',
    },
    tags: [
      'career', 'history', 'path', 'experience', 'jobs', 'employers', 'work', 'years', 'cv',
      'previous',
      'kariera', 'historia', 'ścieżka', 'doświadczenie', 'praca', 'pracodawcy', 'lata',
      'przebieg', 'zatrudnienie',
    ],
  },
  {
    title: { en: 'Diplomas of formation', pl: 'Dyplomy' },
    source: { en: 'Register of Formation · Diplomas', pl: 'Rejestr nauk · Dyplomy' },
    text: {
      en: 'Master of Science in Computer Science, WSB Gdańsk (2021–2023, front-end specialisation); Bachelor of Engineering in Computer Science, Polish Naval Academy in Gdynia (2017–2021, web programming and DevOps).',
      pl: 'Magister informatyki, WSB Gdańsk (2021–2023, specjalność front-end); inżynier informatyki, Akademia Marynarki Wojennej w Gdyni (2017–2021, programowanie webowe i DevOps).',
    },
    tags: [
      'education', 'degree', 'degrees', 'msc', 'beng', 'master', 'bachelor', 'university',
      'academy', 'studied', 'school', 'gdansk', 'gdynia',
      'wykształcenie', 'edukacja', 'studia', 'dyplom', 'uczelnia', 'magister', 'inżynier',
      'szkoła', 'gdańsk',
    ],
  },
  {
    title: { en: 'Terms of engagement', pl: 'Warunki współpracy' },
    source: { en: 'Register of Service · Terms', pl: 'Rejestr służby · Warunki' },
    text: {
      en: 'Based in Poland (UTC+2), six years of professional practice, open to contract and remote engagements — particularly AI-adjacent ones. Letters to pawelwlodarczyk97@yahoo.com.',
      pl: 'Polska (UTC+2), sześć lat praktyki zawodowej, otwarty na kontrakt i pracę zdalną — najchętniej w pobliżu AI. Listy na pawelwlodarczyk97@yahoo.com.',
    },
    tags: [
      'available', 'availability', 'remote', 'contract', 'hire', 'hiring', 'location', 'poland',
      'contact', 'email',
      'dostępność', 'zdalnie', 'zdalna', 'kontrakt', 'zatrudnienie', 'lokalizacja', 'polska',
      'kontakt', 'współpraca',
    ],
  },
  {
    title: { en: 'CADA — the context engine', pl: 'CADA — silnik kontekstu' },
    source: {
      en: 'Public Record · github/empios/CaDa',
      pl: 'Rejestr publiczny · github/empios/CaDa',
    },
    text: {
      en: 'A Rust desktop agent that mounts a virtual semantic drive over WinFSP and indexes everything written to it: FTS5 and vector retrieval fused by reciprocal rank, with OCR, CLIP and Whisper — one hundred percent local.',
      pl: 'Agent desktopowy w Rust, który montuje wirtualny dysk semantyczny przez WinFSP i indeksuje wszystko, co na niego trafi: wyszukiwanie FTS5 i wektorowe łączone rangą odwrotną, do tego OCR, CLIP i Whisper — w stu procentach lokalnie.',
    },
    tags: [
      'cada', 'rust', 'desktop', 'agent', 'winfsp', 'local', 'drive', 'search', 'tauri',
      'spotlight',
      'desktopowy', 'pulpit', 'biurkowy', 'dysk', 'wyszukiwanie', 'lokalnie', 'indeks',
    ],
  },
  {
    title: { en: "humanize-pl — the corrector's press", pl: 'humanize-pl — prasa korektorska' },
    source: {
      en: 'Public Record · github/empios/humanize-pl',
      pl: 'Rejestr publiczny · github/empios/humanize-pl',
    },
    text: {
      en: 'A deterministic corrector for AI-drafted Polish legal text: rule-generated candidates pass safety validators that guard normativity, parties, amounts and dates. No generative model in the loop.',
      pl: 'Deterministyczny korektor polskich tekstów prawniczych pisanych przez AI: warianty tworzone regułami przechodzą przez walidatory pilnujące normatywności, stron, kwot i dat. Bez modelu generatywnego w pętli.',
    },
    tags: [
      'humanize', 'polish', 'legal', 'nlp', 'stanza', 'validators', 'deterministic', 'redaction',
      'docx',
      'polski', 'prawny', 'prawnicze', 'walidatory', 'deterministyczny', 'redakcja', 'korektor',
    ],
  },
  {
    title: { en: 'Pangolin — the pattern book', pl: 'Pangolin — wzornik' },
    source: {
      en: 'Public Record · github/empios/Pangolin',
      pl: 'Rejestr publiczny · github/empios/Pangolin',
    },
    text: {
      en: 'The house design system: warm paper, aubergine ink and a sealing-wax accent — tokens, base styles, components and a tweaks panel. This very folio is set in it.',
      pl: 'Domowy system projektowy: ciepły papier, bakłażanowy atrament i akcent w kolorze laku — tokeny, style bazowe, komponenty i panel regulacji. W nim właśnie złożono ten zbiór.',
    },
    tags: [
      'pangolin', 'design', 'system', 'tokens', 'css', 'components', 'ui', 'tweaks',
      'projektowy', 'tokeny', 'komponenty', 'wzornik', 'style',
    ],
  },
];
