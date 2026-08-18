import type { Localized } from '../i18n/locale';

export interface CaseStudy {
  readonly id: string;
  readonly title: Localized<string>;
  readonly clientContext: Localized<string>;
  readonly problem: Localized<string>;
  readonly solution: Localized<string>;
  readonly resultMetric: Localized<string>;
  readonly stack: readonly string[];
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: 'enterprise-ai',
    title: {
      en: 'Enterprise AI & Document Automation (Insurance / Financial)',
      pl: 'Wdrożenie AI w sektorze Enterprise (Ubezpieczenia / Finanse)',
    },
    clientContext: {
      en: 'Context: Enterprise Insurance & Financial Sector | Scale: [DO UZUPEŁNIENIA: skala klientów / liczba dokumentów]',
      pl: 'Kontekst: Sektor Enterprise (Ubezpieczenia / Finanse) | Skala: [DO UZUPEŁNIENIA: skala klientów / liczba dokumentów]',
    },
    problem: {
      en: 'Time-consuming manual document analysis and claim validation coupled with strict 100% data privacy and compliance policies (no public cloud).',
      pl: 'Czasochłonna, manualna analiza i weryfikacja dokumentacji ubezpieczeniowej przy rygorystycznym wymogu 100% prywatności danych offline (brak chmury publicznej).',
    },
    solution: {
      en: 'On-premise architecture using local LLMs (Ollama) and agentic orchestration (LangGraph) running entirely within private enterprise infrastructure.',
      pl: 'Architektura lokalnych modeli AI (Ollama) i orkiestracji agentowej (LangGraph) działająca w 100% wewnątrz prywatnej infrastruktury klienta (on-premise).',
    },
    resultMetric: {
      en: 'RESULT: [DO UZUPEŁNIENIA: % przyspieszenia / liczba godzin] reduction in verification time with 100% offline data compliance',
      pl: 'WYNIK: [DO UZUPEŁNIENIA: % przyspieszenia / liczba godzin] skrócenia czasu weryfikacji przy 100% zachowaniu prywatności danych offline',
    },
    stack: ['Python', 'LangGraph', 'Ollama', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'ecommerce-automation',
    title: {
      en: 'Automated E-Commerce & B2B Catalogue Processing (CodeWorks)',
      pl: 'Automatyzacja procesów e-commerce i hurtowni B2B (CodeWorks)',
    },
    clientContext: {
      en: 'Context: E-commerce & B2B Wholesale / Distribution | Scale: [DO UZUPEŁNIENIA: liczba SKU / produktów w katalogu]',
      pl: 'Kontekst: Dystrybucja i Hurtownie B2B / E-Commerce | Skala: [DO UZUPEŁNIENIA: liczba SKU / produktów w katalogu]',
    },
    problem: {
      en: 'High operational costs and long cycle times for manual product categorization, attribute extraction, and cross-border catalogue translations.',
      pl: 'Wysokie koszty operacyjne i długi czas wprowadzania asortymentu wynikające z ręcznej kategoryzacji, ekstrakcji atrybutów i tłumaczeń katalogów produktów.',
    },
    solution: {
      en: 'Automated batch ML pipeline built with FastAPI and CTranslate2, combining LLM extraction with multi-stage rule validation and automated quality checks.',
      pl: 'Wsadowy potok uczenia maszynowego (FastAPI, CTranslate2) łączący ekstrakcję LLM z wielostopniową walidacją regułową i kontrolą spójności danych.',
    },
    resultMetric: {
      en: 'RESULT: [DO UZUPEŁNIENIA: % / godziny] reduction in time-to-market and [DO UZUPEŁNIENIA: PLN] operational savings',
      pl: 'WYNIK: [DO UZUPEŁNIENIA: % / godziny] skrócenia czasu wdrażania produktów oraz [DO UZUPEŁNIENIA: PLN] oszczędności operacyjnych',
    },
    stack: ['Python', 'FastAPI', 'CTranslate2', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'visual-ai-pipeline',
    title: {
      en: 'Computer Vision & Product Media Pipeline',
      pl: 'Automatyzacja przetwarzania obrazu i mediów produktowych',
    },
    clientContext: {
      en: 'Context: E-Commerce & Media | Scale: [DO UZUPEŁNIENIA: liczba przetworzonych obrazów / zasobów graficznych]',
      pl: 'Kontekst: E-Commerce i Media | Skala: [DO UZUPEŁNIENIA: liczba przetworzonych obrazów / zasobów graficznych]',
    },
    problem: {
      en: 'Labor-intensive manual retouching of product photos and strict visual consistency requirements across large catalogues.',
      pl: 'Pracochłonna ręczna obróbka zdjęć produktowych oraz wymóg zachowania jednolitego standardu wizualnego w całym asortymencie.',
    },
    solution: {
      en: 'Computer vision pipeline utilizing fine-tuned YOLOv8-seg models for precise object masking and background reconstruction without designer intervention.',
      pl: 'Potok wizji komputerowej wykorzystujący modele YOLOv8-seg do precyzyjnego wycinania obiektów oraz automatyczną rekonstrukcję tła bez udziału grafika.',
    },
    resultMetric: {
      en: 'RESULT: [DO UZUPEŁNIENIA: %] of catalogue images processed automatically maintaining studio quality',
      pl: 'WYNIK: Automatyczna obróbka [DO UZUPEŁNIENIA: %] zdjęć katalogowych w czasie rzeczywistym z zachowaniem jakości studyjnej',
    },
    stack: ['PyTorch', 'YOLOv8', 'OpenCV', 'Python'],
  },
  {
    id: 'local-rag-agent',
    title: {
      en: 'Offline Knowledge Retrieval & Local RAG System',
      pl: 'Systemy lokalnego wyszukiwania wiedzy (RAG) i dysku wirtualnego',
    },
    clientContext: {
      en: 'Context: Enterprise Internal Knowledge Systems | Scale: [DO UZUPEŁNIENIA: liczba dokumentów / rozmiar bazy wiedzy]',
      pl: 'Kontekst: Narzędzia wewnętrzne Enterprise | Skala: [DO UZUPEŁNIENIA: liczba dokumentów / rozmiar bazy wiedzy]',
    },
    problem: {
      en: 'Fragmented corporate documentation and slow retrieval of critical operational records under strict air-gapped security policies.',
      pl: 'Rozproszona wiedza firmowa i utrudniony dostęp do archiwalnych dokumentów w warunkach całkowitego braku zgody na chmurę zewnętrzną.',
    },
    solution: {
      en: 'Hybrid search architecture (FTS5 + FAISS vector search) integrated into a desktop agent (Rust/Tauri) with local LLM verification.',
      pl: 'Architektura hybrydowa (wyszukiwanie słowne FTS5 + wektorowe FAISS) zintegrowana w agencie desktopowym (Rust/Tauri) z weryfikacją lokalnym LLM.',
    },
    resultMetric: {
      en: 'RESULT: Instant answers with citation accuracy in < [DO UZUPEŁNIENIA: sek/ms] operating fully air-gapped',
      pl: 'WYNIK: Błyskawiczne odpowiedzi z cytowaniem źródeł w czasie < [DO UZUPEŁNIENIA: sek/ms] w środowisku odciętym od internetu',
    },
    stack: ['Rust', 'Tauri', 'LangGraph', 'FAISS', 'SQLite'],
  },
];
