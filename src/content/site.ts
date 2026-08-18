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
  { id: 'cases', numeral: 'I', label: { en: 'Case Studies', pl: 'Wdrożenia' } },
  { id: 'plates', numeral: 'II', label: { en: 'Plates', pl: 'Tablice' } },
  { id: 'course', numeral: 'III', label: { en: 'Course', pl: 'Służba' } },
  { id: 'codeworks', numeral: 'IV', label: { en: 'Commercial', pl: 'Współpraca' } },
  { id: 'archive', numeral: 'V', label: { en: 'Archive', pl: 'Archiwum' } },
  { id: 'correspondence', numeral: 'VI', label: { en: 'Contact', pl: 'Kontakt' } },
];

import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from '../config/contact';

export const CONTACT: readonly ContactLink[] = [
  {
    label: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    variant: 'solid',
  },
  {
    label: 'LinkedIn ↗',
    href: LINKEDIN_URL,
    variant: 'ghost',
    external: true,
  },
  {
    label: 'CodeWorks (codeworks-it.pl) ↗',
    href: 'https://codeworks-it.pl',
    variant: 'ghost',
    external: true,
  },
  { label: 'GitHub ↗', href: GITHUB_URL, variant: 'ghost', external: true },
];
