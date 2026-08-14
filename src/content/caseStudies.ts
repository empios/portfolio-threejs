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
      en: 'Enterprise AI Deployment',
      pl: 'Wdrożenie AI w sektorze Enterprise',
    },
    clientContext: {
      en: 'Context: Enterprise & Financial Sector | Scale: Enterprise Production Environment',
      pl: 'Kontekst: Sektor Enterprise i Finanse | Skala: Produkcyjne środowisko enterprise',
    },
    problem: {
      en: 'Time-consuming document analysis coupled with strict 100% data privacy and compliance requirements.',
      pl: 'Czasochłonna, manualna analiza dokumentacji przy jednoczesnym wymogu 100% prywatności danych i zgodności z przepisami.',
    },
    solution: {
      en: 'Secure local AI architecture and agentic orchestration operating entirely within private client infrastructure, eliminating data leak risks.',
      pl: 'Architektura lokalnych modeli AI i orkiestracji agentowej działająca wewnątrz prywatnej infrastruktury klienta, eliminująca ryzyko wycieku danych.',
    },
    resultMetric: {
      en: 'RESULT: Multi-fold processing speedup with 100% offline data privacy compliance',
      pl: 'WYNIK: Wielokrotne przyspieszenie weryfikacji przy 100% zachowaniu prywatności danych offline',
    },
    stack: ['Python', 'LangGraph', 'Ollama', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'ecommerce-automation',
    title: {
      en: 'Automated E-Commerce & Catalogue Processing (CodeWorks)',
      pl: 'Automatyzacja procesów e-commerce i hurtowni (CodeWorks)',
    },
    clientContext: {
      en: 'Context: E-commerce & B2B Wholesale | Scale: Large-Scale Product Catalogues',
      pl: 'Kontekst: E-commerce i hurtownie B2B | Skala: Wielotysięczne katalogi produktów',
    },
    problem: {
      en: 'High operational cost and delay in manually categorizing and translating extensive product catalogues for international markets.',
      pl: 'Wysoki koszt i czas ręcznej kategoryzacji oraz tłumaczenia szerokich asortymentów produktów na rynki zagraniczne.',
    },
    solution: {
      en: 'Automated batch ML processing pipeline with multi-stage quality validation and automated consistency checks.',
      pl: 'Wsadowy potok uczenia maszynowego z wielostopniową weryfikacją jakości i automatyczną kontrolą spójności danych.',
    },
    resultMetric: {
      en: 'RESULT: ~80% reduction in processing time with significant operational cost savings',
      pl: 'WYNIK: Skrócenie czasu wdrażania produktów o ok. 80% przy znacznej redukcji kosztów operacyjnych',
    },
    stack: ['Python', 'FastAPI', 'CTranslate2', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'visual-ai-pipeline',
    title: {
      en: 'Computer Vision & Media Automation',
      pl: 'Automatyzacja przetwarzania obrazu i mediów',
    },
    clientContext: {
      en: 'Context: E-Commerce & Media | Scale: Thousands of Media Assets',
      pl: 'Kontekst: E-Commerce i Media | Skala: Tysiące zasobów graficznych',
    },
    problem: {
      en: 'Labor-intensive manual retouching of product media and the challenge of maintaining strict visual standards across catalogues.',
      pl: 'Pracochłonna, ręczna obróbka zdjęć produktowych oraz wymóg zachowania jednolitego standardu wizualnego w całym katalogu.',
    },
    solution: {
      en: 'Automated computer vision pipeline streamlining object segmentation and background reconstruction without manual retouching.',
      pl: 'Potok wizji komputerowej automatyzujący wycinanie obiektów oraz rekonstrukcję tła bez udziału grafika.',
    },
    resultMetric: {
      en: 'RESULT: Automated 90%+ image processing in real time maintaining studio quality',
      pl: 'WYNIK: Automatyczna obróbka 90%+ zdjęć w czasie rzeczywistym z zachowaniem jakości studyjnej',
    },
    stack: ['PyTorch', 'YOLOv8', 'OpenCV', 'Python'],
  },
  {
    id: 'local-rag-agent',
    title: {
      en: 'Offline Knowledge & Document Intelligence',
      pl: 'Systemy wyszukiwania wiedzy i przetwarzania dokumentów',
    },
    clientContext: {
      en: 'Context: Enterprise & Internal Tools | Scale: Confidential Document Repositories',
      pl: 'Kontekst: Narzędzia wewnętrzne i Enterprise | Skala: Poufne repozytoria dokumentów',
    },
    problem: {
      en: 'Slow and fragmented access to internal company knowledge repositories under strict no-cloud policies.',
      pl: 'Trudny i powolny dostęp do rozproszonej wiedzy firmowej w wewnętrznych bazach dokumentów przy braku zgody na chmurę zewnętrzną.',
    },
    solution: {
      en: 'Local semantic retrieval (RAG) and virtual knowledge drive architecture operating 100% on-premise.',
      pl: 'Architektura lokalnego wyszukiwania semantycznego (RAG) i wirtualnego dysku wiedzy działająca w 100% w sieci lokalnej.',
    },
    resultMetric: {
      en: 'RESULT: Instant answers with accurate source citations operating in air-gapped environments',
      pl: 'WYNIK: Błyskawiczne odnajdywanie informacji z precyzyjnymi cytowaniami źródeł w środowisku zablokowanym od sieci',
    },
    stack: ['Rust', 'Tauri', 'LangGraph', 'FAISS'],
  },
];
