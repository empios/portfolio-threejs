import type { Localized } from '../src/i18n/locale';
import type { FigureId } from '../src/content/plates';

/** Interface copy for the proposal. Content proper still comes from src/content. */
export const COPY = {
  nav: {
    work: { en: 'Work', pl: 'Projekty' },
    about: { en: 'About', pl: 'O mnie' },
    services: { en: 'Services', pl: 'Współpraca' },
    skills: { en: 'Skills', pl: 'Umiejętności' },
    ask: { en: 'Ask about my work', pl: 'Zapytaj o projekty' },
    cta: { en: 'Get in touch', pl: 'Napisz do mnie' },
  },
  hero: {
    status: {
      en: 'Open to contract & remote work · Poland, UTC+2',
      pl: 'Otwarty na kontrakt i pracę zdalną · Polska, UTC+2',
    },
    titleBefore: { en: 'I build AI that ', pl: 'Buduję AI, które ' },
    titleEm: { en: 'holds up', pl: 'wytrzymuje' },
    titleAfter: { en: ' in production.', pl: ' produkcję.' },
    lead: {
      en: 'Full-stack & applied ML engineer — six years of commercial work and an MSc in Computer Science. Enterprise LLM platforms, million-row data pipelines, private RAG that never leaves your servers. I also run the software house CodeWorks.',
      pl: 'Full-stack i applied ML engineer — sześć lat komercyjnie, mgr inż. informatyki. Platformy LLM dla enterprise, potoki danych na milion rekordów, prywatny RAG, który nie opuszcza Twoich serwerów. Prowadzę też software house CodeWorks.',
    },
    primary: { en: 'See selected work', pl: 'Zobacz projekty' },
    secondary: { en: 'Email me', pl: 'Napisz maila' },
    now: {
      en: 'Now — backend developer at TME, local LLM inference in production',
      pl: 'Teraz — backend developer w TME, lokalne LLM na produkcji',
    },
    hint: {
      en: 'Each dot is a piece of my work. Move your cursor to query it; pick a label to jump to the project.',
      pl: 'Każdy punkt to fragment mojej pracy. Porusz kursorem, by go odpytać; wybierz etykietę, by przejść do projektu.',
    },
  },
  work: {
    kicker: { en: 'Selected work', pl: 'Wybrane projekty' },
    title: { en: 'Systems that shipped, and stayed shipped.', pl: 'Systemy, które trafiły na produkcję — i na niej zostały.' },
    intro: {
      en: 'Two kinds of work: systems built for clients and kept in production, and tools from my own workshop that test how far local, private AI can go.',
      pl: 'Dwa rodzaje pracy: systemy budowane dla klientów i utrzymywane na produkcji oraz narzędzia z własnego warsztatu, które sprawdzają, jak daleko sięga lokalne, prywatne AI.',
    },
    client: { en: 'Client work', pl: 'Dla klientów' },
    workshop: { en: 'Open source & workshop', pl: 'Open source i warsztat' },
    source: { en: 'Source on GitHub', pl: 'Kod na GitHubie' },
    projects: { en: 'projects', pl: 'projekty' },
  },
  about: {
    kicker: { en: 'About', pl: 'O mnie' },
    title: {
      en: 'Six years, from junior web developer to production AI.',
      pl: 'Sześć lat: od juniora webowego do AI na produkcji.',
    },
    text: {
      en: 'I studied engineering at the Polish Naval Academy in Gdynia and finished an MSc at WSB Gdańsk while already working. Since then: React and Next.js at the front, Python and PostgreSQL behind them — and lately, language models running on hardware my clients own.',
      pl: 'Studiowałem inżynierię na Akademii Marynarki Wojennej w Gdyni, a magisterkę w WSB Gdańsk skończyłem, już pracując. Od tamtej pory: React i Next.js z przodu, Python i PostgreSQL za nimi — a ostatnio modele językowe działające na sprzęcie, który należy do klienta.',
    },
    photo: { en: 'Your portrait goes here · 4:5', pl: 'Tu trafi Twoje zdjęcie · 4:5' },
    now: { en: 'Now', pl: 'Teraz' },
  },
  services: {
    kicker: { en: 'Services', pl: 'Współpraca' },
    title: { en: 'Need it built? That’s CodeWorks.', pl: 'Potrzebujesz wdrożenia? To CodeWorks.' },
    lead: {
      en: 'My software house takes AI and automation from prototype to production for e-commerce and wholesale.',
      pl: 'Mój software house przeprowadza AI i automatyzację od prototypu do produkcji — dla e-commerce i hurtowni.',
    },
    cta: { en: 'Visit codeworks-it.pl', pl: 'Odwiedź codeworks-it.pl' },
    offers: [
      {
        title: { en: 'AI deployments', pl: 'Wdrożenia AI' },
        text: {
          en: 'LLMs, RAG and ML pipelines, built to run on your infrastructure.',
          pl: 'LLM, RAG i potoki ML, zbudowane do pracy na Twojej infrastrukturze.',
        },
      },
      {
        title: { en: 'Process automation', pl: 'Automatyzacja procesów' },
        text: {
          en: 'The repetitive work in your operations, handed to software.',
          pl: 'Powtarzalna praca w Twojej firmie, przekazana oprogramowaniu.',
        },
      },
      {
        title: { en: 'B2B systems', pl: 'Systemy B2B' },
        text: {
          en: 'Platforms for e-commerce and wholesale that hold up under load.',
          pl: 'Platformy dla e-commerce i hurtowni, które wytrzymują obciążenie.',
        },
      },
    ],
  },
  skills: {
    kicker: { en: 'Skills', pl: 'Umiejętności' },
    title: { en: 'Tools I trust in production.', pl: 'Narzędzia, którym ufam na produkcji.' },
  },
  contact: {
    kicker: { en: 'Contact', pl: 'Kontakt' },
    title: { en: 'Have something that needs to ship?', pl: 'Masz coś, co musi trafić na produkcję?' },
    copy: { en: 'Copy', pl: 'Kopiuj' },
    copied: { en: 'Copied', pl: 'Skopiowano' },
    terms: {
      en: 'I reply within a day · Poland, UTC+2 · Contract & remote',
      pl: 'Odpowiadam w ciągu doby · Polska, UTC+2 · Kontrakt i zdalnie',
    },
  },
  ask: {
    label: { en: 'Ask about my work', pl: 'Zapytaj o moją pracę' },
    placeholder: {
      en: 'Ask anything — “how do you deploy local models?”',
      pl: 'Zapytaj — „jak wdrażasz modele lokalnie?”',
    },
    hint: {
      en: 'Searches my records right here in the page — no server involved.',
      pl: 'Przeszukuje moje notatki tutaj, na stronie — bez żadnego serwera.',
    },
    none: { en: 'Nothing matches. Try another word.', pl: 'Nic nie pasuje. Spróbuj innego słowa.' },
    close: { en: 'Close', pl: 'Zamknij' },
  },
} as const;

/** Short names the cloud labels its clusters with. */
export const CLUSTER_LABELS: Readonly<Record<FigureId, Localized<string>>> = {
  enterprise: { en: 'Services platform', pl: 'Platforma usług' },
  translation: { en: 'Translation engine', pl: 'Maszyna translatorska' },
  photographic: { en: 'Photo pipeline', pl: 'Potok zdjęć' },
  reference: { en: 'Private RAG', pl: 'Prywatny RAG' },
  cada: { en: 'CADA', pl: 'CADA' },
  humanize: { en: 'humanize-pl', pl: 'humanize-pl' },
  pangolin: { en: 'Pangolin', pl: 'Pangolin' },
};

/** The one number each client project is remembered by. */
export const HEADLINE: Partial<Record<FigureId, { value: string; label: Localized<string> }>> = {
  enterprise: {
    value: 'Live',
    label: {
      en: 'Real-time LLM routing inside an enterprise purchasing flow',
      pl: 'Routing LLM w czasie rzeczywistym w procesie zakupowym enterprise',
    },
  },
  translation: {
    value: '≈1,000,000',
    label: {
      en: 'Catalogue rows translated, every one through 3-stage QA',
      pl: 'Wierszy katalogu, każdy przez trzystopniową kontrolę',
    },
  },
  photographic: {
    value: '50,000+',
    label: {
      en: 'Product photos cut out and retouched automatically',
      pl: 'Zdjęć produktowych wyciętych i obrobionych automatycznie',
    },
  },
  reference: {
    value: '2,000',
    label: {
      en: 'Private documents answerable — none leave the server',
      pl: 'Prywatnych dokumentów — żaden nie opuszcza serwera',
    },
  },
};
