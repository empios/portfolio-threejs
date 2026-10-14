import type { Localized } from '../i18n/locale';
import type { FigureId } from '../content/plates';

/**
 * All visible copy for the proposal. Kept short and plain on purpose:
 * one idea per line, no dashes doing the work of sentences.
 */
export const COPY = {
  nav: {
    work: { en: 'Work', pl: 'Projekty' },
    about: { en: 'About', pl: 'O mnie' },
    services: { en: 'CodeWorks', pl: 'CodeWorks' },
    skills: { en: 'Stack', pl: 'Technologie' },
    ask: { en: 'Search', pl: 'Szukaj' },
    cta: { en: 'Contact', pl: 'Kontakt' },
  },
  hero: {
    status: { en: 'Available for new projects', pl: 'Przyjmuję nowe projekty' },
    titleBefore: { en: 'I put AI into ', pl: 'Wdrażam AI ' },
    titleEm: { en: 'production', pl: 'na produkcję' },
    titleAfter: { en: '.', pl: '.' },
    lead: {
      en: 'Full-stack and ML engineer from Poland. Six years in the job, and I run a small software house.',
      pl: 'Full-stack i ML engineer z Polski. Sześć lat w zawodzie, prowadzę też mały software house.',
    },
    primary: { en: 'See my work', pl: 'Zobacz projekty' },
    secondary: { en: 'Email me', pl: 'Napisz' },
    now: { en: 'Currently at TME, running local LLMs', pl: 'Obecnie w TME, wdrażam lokalne LLM-y' },
    hint: {
      en: 'Move your mouse around. Click a label to open the project.',
      pl: 'Porusz myszką. Kliknij etykietę, żeby zobaczyć projekt.',
    },
  },
  work: {
    title: { en: 'Selected projects', pl: 'Wybrane projekty' },
    intro: { en: 'Some for clients, some just for me.', pl: 'Część dla klientów, część dla siebie.' },
    client: { en: 'For clients', pl: 'Dla klientów' },
    workshop: { en: 'Side projects', pl: 'Po godzinach' },
    source: { en: 'GitHub', pl: 'GitHub' },
  },
  about: {
    title: { en: 'Hi, I’m Paweł.', pl: 'Cześć, jestem Paweł.' },
    text: {
      en: 'I studied at the Naval Academy in Gdynia and did my master’s at WSB Gdańsk. I started out building websites and slowly moved into backend and machine learning.',
      pl: 'Studiowałem w Akademii Marynarki Wojennej w Gdyni, magisterkę zrobiłem w WSB Gdańsk. Zaczynałem od stron internetowych, potem przeszedłem na backend i uczenie maszynowe.',
    },
    photo: { en: 'Your photo · 4:5', pl: 'Twoje zdjęcie · 4:5' },
  },
  services: {
    title: { en: 'CodeWorks, my software house', pl: 'CodeWorks, mój software house' },
    lead: {
      en: 'We build AI tools, automations and B2B systems for online stores and wholesalers.',
      pl: 'Robimy narzędzia AI, automatyzacje i systemy B2B dla sklepów i hurtowni.',
    },
    cta: { en: 'codeworks-it.pl', pl: 'codeworks-it.pl' },
  },
  skills: {
    title: { en: 'What I work with', pl: 'Z czym pracuję' },
    groups: [
      { en: 'Backend', pl: 'Backend' },
      { en: 'Frontend', pl: 'Frontend' },
      { en: 'ML & infra', pl: 'ML i infrastruktura' },
    ],
  },
  contact: {
    title: { en: 'Let’s talk.', pl: 'Porozmawiajmy.' },
    copy: { en: 'Copy', pl: 'Kopiuj' },
    copied: { en: 'Copied', pl: 'Skopiowano' },
    terms: { en: 'I usually reply the same day.', pl: 'Zwykle odpisuję tego samego dnia.' },
  },
  ask: {
    label: { en: 'Search my notes', pl: 'Szukaj w notatkach' },
    placeholder: { en: 'e.g. local models', pl: 'np. lokalne modele' },
    hint: { en: 'Try one of these:', pl: 'Spróbuj:' },
    none: { en: 'Nothing found.', pl: 'Nic nie znaleziono.' },
  },
} as const;

/** Short names the cloud labels its clusters with. */
export const CLUSTER_LABELS: Readonly<Record<FigureId, Localized<string>>> = {
  enterprise: { en: 'Services platform', pl: 'Platforma usług' },
  translation: { en: 'Translation', pl: 'Tłumaczenia' },
  photographic: { en: 'Photo cleanup', pl: 'Obróbka zdjęć' },
  reference: { en: 'Document search', pl: 'Wyszukiwarka' },
  cada: { en: 'CADA', pl: 'CADA' },
  humanize: { en: 'humanize-pl', pl: 'humanize-pl' },
  pangolin: { en: 'Pangolin', pl: 'Pangolin' },
};

export interface ProjectCopy {
  readonly title: Localized<string>;
  readonly text: Localized<string>;
  /** The one number a client project is remembered by. */
  readonly stat?: { readonly value: string; readonly label: Localized<string> };
}

export const PROJECTS: Readonly<Record<FigureId, ProjectCopy>> = {
  enterprise: {
    title: { en: 'Services platform', pl: 'Platforma zakupu usług' },
    text: {
      en: 'Language models built into how a large company buys services. Requests are sorted and matched as they come in.',
      pl: 'Modele językowe wpięte w to, jak duża firma kupuje usługi. Zapytania są sortowane i dopasowywane na bieżąco.',
    },
    stat: { value: 'Live', label: { en: 'in production', pl: 'na produkcji' } },
  },
  translation: {
    title: { en: 'Translation pipeline', pl: 'Potok tłumaczeń' },
    text: {
      en: 'Machine translation for a product catalogue. Every row passed automatic checks, and people reviewed samples.',
      pl: 'Tłumaczenie maszynowe katalogu produktów. Każdy wiersz przeszedł automatyczne testy, a ludzie sprawdzali próbki.',
    },
    stat: { value: '~1M', label: { en: 'rows translated', pl: 'przetłumaczonych wierszy' } },
  },
  photographic: {
    title: { en: 'Product photo cleanup', pl: 'Obróbka zdjęć produktów' },
    text: {
      en: 'One model cuts out the product, another fills in the background. It replaced manual retouching.',
      pl: 'Jeden model wycina produkt, drugi uzupełnia tło. Zastąpiło to ręczny retusz.',
    },
    stat: { value: '50,000+', label: { en: 'photos processed', pl: 'obrobionych zdjęć' } },
  },
  reference: {
    title: { en: 'Private document search', pl: 'Prywatna wyszukiwarka dokumentów' },
    text: {
      en: 'Ask about internal documents and get answers with sources. Runs on a regular CPU, and the data never leaves the company.',
      pl: 'Pytasz o wewnętrzne dokumenty, dostajesz odpowiedź ze źródłem. Działa na zwykłym CPU, a dane nie wychodzą z firmy.',
    },
    stat: { value: '2,000', label: { en: 'documents indexed', pl: 'dokumentów w indeksie' } },
  },
  cada: {
    title: { en: 'CADA', pl: 'CADA' },
    text: {
      en: 'A desktop app in Rust that turns your folders into a searchable drive. Works fully offline.',
      pl: 'Aplikacja w Rust, która zamienia foldery w przeszukiwalny dysk. Działa w pełni offline.',
    },
  },
  humanize: {
    title: { en: 'humanize-pl', pl: 'humanize-pl' },
    text: {
      en: 'Rewrites AI-generated Polish legal text using plain rules. No language model involved.',
      pl: 'Poprawia polskie teksty prawnicze pisane przez AI. Same reguły, bez modelu językowego.',
    },
  },
  pangolin: {
    title: { en: 'Pangolin', pl: 'Pangolin' },
    text: {
      en: 'My design system. Tokens, components and a few demos.',
      pl: 'Mój system projektowy. Tokeny, komponenty i kilka przykładów.',
    },
  },
};

/** The career, newest first. */
export const TIMELINE: readonly { readonly dates: Localized<string>; readonly role: Localized<string>; readonly now?: true }[] = [
  { dates: { en: '2024 – now', pl: '2024 – teraz' }, role: { en: 'Backend developer, TME', pl: 'Backend developer, TME' }, now: true },
  { dates: { en: '2023 – 2024', pl: '2023 – 2024' }, role: { en: 'Full-stack developer, Ecohedge', pl: 'Full-stack developer, Ecohedge' } },
  { dates: { en: '2021 – 2023', pl: '2021 – 2023' }, role: { en: 'React developer, WEUPCODE', pl: 'React developer, WEUPCODE' } },
  { dates: { en: '2021', pl: '2021' }, role: { en: 'Junior full-stack developer, Softwarebay', pl: 'Junior full-stack developer, Softwarebay' } },
  { dates: { en: '2020 – 2021', pl: '2020 – 2021' }, role: { en: 'Junior web developer, KS Sport', pl: 'Junior web developer, KS Sport' } },
  { dates: { en: '2017 – 2023', pl: '2017 – 2023' }, role: { en: 'BEng and MSc in Computer Science', pl: 'Inżynier i magister informatyki' } },
];
