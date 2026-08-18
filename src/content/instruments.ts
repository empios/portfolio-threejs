import type { Localized } from '../i18n/locale';

/** § IV — A specimen catalogue of the instruments in regular use. */

export interface Specimen {
  /** Tools keep their names in every language. */
  readonly name: string;
  /** Context of commercial application. */
  readonly note: Localized<string>;
}

export interface SpecimenCase {
  readonly title: Localized<string>;
  readonly specimens: readonly Specimen[];
}

export const INSTRUMENT_CASES: readonly SpecimenCase[] = [
  {
    title: { en: 'Backend & Systems Architecture', pl: 'Architektura backendu i systemów' },
    specimens: [
      {
        name: 'Python',
        note: {
          en: 'Core backend language for data pipelines, ML workflows & REST services (since 2017)',
          pl: 'Główny język backendu dla potoków danych, workflow ML i usług REST (od 2017)',
        },
      },
      {
        name: 'FastAPI',
        note: {
          en: 'High-throughput async APIs, ML model wrappers & batch microservices',
          pl: 'Wysokowydajne asynchroniczne API, serwery modeli ML i mikrousługi wsadowe',
        },
      },
      {
        name: 'PostgreSQL',
        note: {
          en: 'Primary relational store, transactional job queues & vector search via pgvector',
          pl: 'Główna relacyjna baza danych, transakcyjne kolejki zadań i wektory pgvector',
        },
      },
      {
        name: 'SQLAlchemy',
        note: {
          en: 'Database ORM & Core expression language for enterprise data access',
          pl: 'ORM i warstwa zapytaniowa Core do bezpiecznego dostępu do danych enterprise',
        },
      },
      {
        name: 'Redis',
        note: {
          en: 'In-memory caching, distributed locks & rate limiting for APIs',
          pl: 'Pamięć podręczna w RAM, rozproszone blokady i limitowanie zapytań API',
        },
      },
      {
        name: 'pytest',
        note: {
          en: 'Automated test suites, integration tests & regression golden-file validation',
          pl: 'Automatyczne zestawy testów, testy integracyjne i weryfikacja plików wzorcowych',
        },
      },
      {
        name: 'Node.js',
        note: {
          en: 'REST endpoints, SSR tooling & microservice bridges',
          pl: 'Punty końcowe REST, narzędzia SSR i mostki mikrousługowe',
        },
      },
    ],
  },
  {
    title: { en: 'Frontend & UI Engineering', pl: 'Frontend i inżynieria interfejsu' },
    specimens: [
      {
        name: 'TypeScript',
        note: {
          en: 'Strict type safety across the entire client and server codebase',
          pl: 'Ścisłe typowanie w całej bazie kodu klienckiego i serwerowego',
        },
      },
      {
        name: 'React',
        note: {
          en: 'Responsive B2B applications, custom design systems & component architecture',
          pl: 'Responsywne aplikacje B2B, autorskie systemy projektowe i architektura komponentowa',
        },
      },
      {
        name: 'Next.js',
        note: {
          en: 'Production web apps, static site generation & server-rendered interfaces',
          pl: 'Aplikacje produkcyjne, generowanie stron statycznych i renderowanie serwerowe',
        },
      },
      {
        name: 'Tailwind CSS',
        note: {
          en: 'Disciplined utility styling, responsive design system tokens',
          pl: 'Dyscyplina stylizowania utility i tokeny responsywnego systemu projektowego',
        },
      },
      {
        name: 'Playwright',
        note: {
          en: 'Automated end-to-end user flow testing & visual regression proofs',
          pl: 'Automatyczne testy end-to-end przepływów użytkownika i regresji wizualnej',
        },
      },
      {
        name: 'Redux · Jotai',
        note: {
          en: 'State management architecture for complex multi-view dashboards',
          pl: 'Architektura zarządzania stanem dla złożonych pulpitów nawigacyjnych',
        },
      },
    ],
  },
  {
    title: { en: 'Applied ML & Infrastructure', pl: 'Applied ML i infrastruktura' },
    specimens: [
      {
        name: 'PyTorch',
        note: {
          en: 'Model fine-tuning, computer vision (YOLOv8) & custom neural networks',
          pl: 'Dostrajanie modeli, wizja komputerowa (YOLOv8) i autorskie sieci neuronowe',
        },
      },
      {
        name: 'CTranslate2',
        note: {
          en: 'High-speed CPU/GPU inference for machine translation pipelines',
          pl: 'Szybkie wnioskowanie CPU/GPU dla potoków tłumaczenia maszynowego',
        },
      },
      {
        name: 'llama.cpp · Ollama',
        note: {
          en: 'On-premise deployment of open LLMs with zero external API dependency',
          pl: 'Wdrażanie otwartych modeli LLM on-premise bez zależności od zewnętrznych API',
        },
      },
      {
        name: 'LangGraph',
        note: {
          en: 'Multi-agent orchestration, stateful workflows & structured tool use',
          pl: 'Orkiestracja wieloagentowa, stanowe workflowy i strukturyzowane narzędzia',
        },
      },
      {
        name: 'FAISS · pgvector',
        note: {
          en: 'Vector index construction & fast nearest-neighbor semantic search',
          pl: 'Budowa indeksów wektorowych i szybkie wyszukiwanie semantyczne najbliższych sąsiadów',
        },
      },
      {
        name: 'Docker',
        note: {
          en: 'Reproducible containerized environments for enterprise and local deployments',
          pl: 'Powtarzalne zkonteneryzowane środowiska dla wdrożeń enterprise i lokalnych',
        },
      },
      {
        name: 'GitHub Actions',
        note: {
          en: 'Continuous Integration, automated testing & deployment crons',
          pl: 'Ciągła integracja CI, automatyczne testy i zadania harmonogramu deployu',
        },
      },
      {
        name: 'Rust · Tauri',
        note: {
          en: 'High-performance desktop systems, virtual drive OS integrations & native agents',
          pl: 'Wydajne systemy desktopowe, integracje dysku wirtualnego z OS i agenci natywni',
        },
      },
    ],
  },
];
