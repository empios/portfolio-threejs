import type { Localized } from '../i18n/locale';

/** Identity, navigation and correspondence — the fixed matter of the folio. */

export interface NavEntry {
  /** Section id the entry scrolls to. */
  readonly id: string;
  /** Rendered as `${numeral} — ${label}`. */
  readonly numeral: string;
  readonly label: Localized<string>;
}

export interface ContactLink {
  /** A handle, an address or a service name — the same in every language. */
  readonly label: string;
  readonly href: string;
  readonly variant: 'solid' | 'ghost';
  /** Off-site links open in a new leaf. */
  readonly external?: boolean;
}

/** A name is not translated; nor is a monogram. */
export const IDENTITY = {
  name: 'Paweł Włodarczyk',
  /** Split so the frontispiece can break the line without a <br> in prose. */
  nameLines: ['Paweł', 'Włodarczyk'],
  shortName: 'P. Włodarczyk',
  monogram: 'PW',
  year: 'MMXXVI',
} as const;

/** The title of the edition, used on the frontispiece, the tab and the colophon. */
export const CODEX_TITLE: Localized<string> = {
  en: "The Engineer's Codex",
  pl: 'Kodeks inżyniera',
};

export const NAV: readonly NavEntry[] = [
  { id: 'plates', numeral: 'I', label: { en: 'Plates', pl: 'Tablice' } },
  { id: 'course', numeral: 'II', label: { en: 'Course', pl: 'Służba' } },
  { id: 'archive', numeral: 'III', label: { en: 'Archive', pl: 'Archiwum' } },
  { id: 'instruments', numeral: 'IV', label: { en: 'Instruments', pl: 'Przyrządy' } },
  { id: 'correspondence', numeral: 'V', label: { en: 'Correspondence', pl: 'Korespondencja' } },
];

export const CONTACT: readonly ContactLink[] = [
  {
    label: 'pawelwlodarczyk97@yahoo.com',
    href: 'mailto:pawelwlodarczyk97@yahoo.com',
    variant: 'solid',
  },
  { label: 'GitHub ↗', href: 'https://github.com/empios', variant: 'ghost', external: true },
  {
    label: 'LinkedIn ↗',
    href: 'https://www.linkedin.com/in/pawelvlodarczyk',
    variant: 'ghost',
    external: true,
  },
];
