import type { Localized, PluralForms } from '../i18n/locale';

/**
 * Every word of the interface itself, each with its translation alongside so a
 * missing one is visible at a glance. Content proper lives in the other
 * modules in this folder.
 *
 * The Polish edition is written, not translated: it keeps the English
 * register — an engraver's folio rather than a product page — but reaches for
 * Polish idiom to get there. Where a figure of speech does not travel, it is
 * replaced by one that does.
 */

export const UI = {
  language: {
    label: { en: 'Language', pl: 'Język' },
  },

  hero: {
    frame: {
      en: 'Plate 0 · Frontispiece · Drawn from life',
      pl: 'Tablica 0 · Frontyspis · Rysowane z natury',
    },
    role: {
      en: 'Full-stack software engineer',
      pl: 'Inżynier oprogramowania full-stack',
    },
    lede: {
      en: "Production systems built with an instrument-maker's care — Python & FastAPI below the waterline, React & Next.js above it, applied machine learning throughout.",
      pl: 'Systemy pisane z pieczołowitością konstruktora przyrządów — takie, które wytrzymują produkcję. Python i FastAPI pod pokładem, React i Next.js na mostku, uczenie maszynowe od dziobu po rufę.',
    },
    examine: { en: 'Examine the plates', pl: 'Obejrzyj tablice' },
    letter: { en: 'Send a letter', pl: 'Wyślij list' },
    scroll: { en: 'Scroll', pl: 'Przewiń' },
  },

  plates: {
    eyebrow: { en: 'Selected work', pl: 'Wybrane prace' },
    title: { en: 'Selected Plates', pl: 'Wybrane tablice' },
    intro: {
      en: 'This folio records systems built for production rather than exhibition. Each plate is a working mechanism — designed, shipped, and kept running — reproduced here at reduced scale, with figures drawn from the originals.',
      pl: 'W tym zbiorze opisano systemy zbudowane do pracy, nie na pokaz. Każda tablica to mechanizm czynny — zaprojektowany, wdrożony i utrzymywany w ruchu — odbity tutaj w zmniejszeniu, a ryciny sporządzono z oryginałów.',
    },
    /** `{numeral}` is the plate's Roman number. */
    plate: { en: 'Plate {numeral}.', pl: 'Tablica {numeral}.' },
    viewSource: { en: 'View the source ↗', pl: 'Zajrzyj do źródeł ↗' },
  },

  course: {
    eyebrow: { en: 'Cursus honorum', pl: 'Cursus honorum' },
    title: { en: 'The Course of Service', pl: 'Przebieg służby' },
    note: {
      en: 'Six years drawn as an orrery — formation at the centre, each engagement in its own orbit. Drag to turn the instrument; select a body to read its entry.',
      pl: 'Sześć lat wykreślonych na planetarium — nauki pośrodku, każda posada na własnej orbicie. Pociągnij, aby obrócić przyrząd; wskaż ciało niebieskie, aby odczytać wpis.',
    },
    figure: {
      en: 'Fig. 7 — The course of service, in orbit',
      pl: 'Ryc. 7 — Przebieg służby, na orbitach',
    },
    hint: { en: 'Drag to turn · select a body', pl: 'Pociągnij · wskaż ciało' },
    register: { en: 'Chapters of service', pl: 'Rozdziały służby' },
  },

  archive: {
    eyebrow: { en: 'The archive', pl: 'Archiwum' },
    title: { en: 'Consult the Archive', pl: 'Zapytaj archiwum' },
    note: {
      en: "A card catalogue over the engineer's records. Retrieval runs entirely within this page — no server is consulted.",
      pl: 'Katalog kartkowy akt inżyniera. Szukanie odbywa się w całości na tej stronie — nie pyta się tu żadnego serwera.',
    },
    drawer: {
      en: 'Records of the engineer · Drawer no. II',
      pl: 'Akta inżyniera · Szuflada nr II',
    },
    searchLabel: { en: 'Search the archive', pl: 'Przeszukaj archiwum' },
    askLabel: { en: 'Ask the records', pl: 'Pytanie do archiwum' },
    placeholder: {
      en: "Ask the records — 'how do you deploy local models?'",
      pl: 'Zapytaj archiwum — „jak wdrażasz modele lokalnie?”',
    },
    consult: { en: 'Consult', pl: 'Szukaj' },
    tryLabel: { en: 'Try —', pl: 'Na przykład —' },
    idle: {
      en: ['The drawer stands open.', 'Ask about deployment, pipelines, retrieval, or testing.'],
      pl: ['Szuflada stoi otworem.', 'Spytaj o wdrożenia, potoki, wyszukiwanie albo testy.'],
    } as Localized<readonly [string, string]>,
    none: {
      en: ['No records match.', "The archive suggests 'quantization', 'inpainting', or 'postgres'."],
      pl: ['Nic nie pasuje.', 'Archiwum podpowiada: „kwantyzacja”, „inpainting”, „postgres”.'],
    } as Localized<readonly [string, string]>,
    /** `{count}` `{noun}` `{query}` */
    status: {
      en: '{count} {noun} for ‘{query}’ — ranked by relevance',
      pl: '{count} {noun} na „{query}” — wedle trafności',
    },
    statusNoun: {
      en: { one: 'record retrieved', few: '', many: 'records retrieved' },
      pl: { one: 'zapis odnaleziony', few: 'zapisy odnalezione', many: 'zapisów odnalezionych' },
    } as Localized<PluralForms>,
    relevance: { en: 'Rel', pl: 'Traf.' },
  },

  instruments: {
    eyebrow: { en: 'Index of instruments', pl: 'Indeks przyrządów' },
    title: { en: 'A Specimen Catalogue', pl: 'Katalog okazów' },
    count: { en: '{count} {noun}', pl: '{count} {noun}' },
    countNoun: {
      en: { one: 'specimen', few: '', many: 'specimens' },
      pl: { one: 'okaz', few: 'okazy', many: 'okazów' },
    } as Localized<PluralForms>,
  },

  correspondence: {
    eyebrow: { en: 'Correspondence', pl: 'Korespondencja' },
    title: { en: 'Correspondence', pl: 'Korespondencja' },
    note: {
      en: 'Letters, commissions, and curious questions are received at any hour. Replies dispatched within the day, wax permitting.',
      pl: 'Listy, zlecenia i osobliwe pytania przyjmuję o każdej porze. Odpowiadam tego samego dnia — o ile lak zdąży zastygnąć.',
    },
    terms: {
      en: 'Poland · UTC+2 · Open to contract & remote',
      pl: 'Polska · UTC+2 · Otwarty na kontrakt i pracę zdalną',
    },
  },

  colophon: {
    typeface: {
      en: 'Set in Cormorant & Ubuntu Sans',
      pl: 'Złożono krojami Cormorant i Ubuntu Sans',
    },
    /** `{year}` is the edition year in Roman numerals. */
    imprint: {
      en: 'Folio I · Entirely static · {year}',
      pl: 'Tom I · W całości statyczny · {year}',
    },
  },
} as const;
