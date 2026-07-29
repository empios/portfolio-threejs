export const LOCALES = ['en', 'pl'] as const;

export type Locale = (typeof LOCALES)[number];

/** A value the folio carries in every language it is set in. */
export type Localized<T> = Readonly<Record<Locale, T>>;

/** Shown on the language switch. */
export const LOCALE_NAMES: Localized<string> = { en: 'EN', pl: 'PL' };

/**
 * Polish takes three plural forms where English takes two. `few` is simply
 * unused in English, which keeps one shape for both dictionaries.
 */
export interface PluralForms {
  readonly one: string;
  readonly few: string;
  readonly many: string;
}

export function pluralize(locale: Locale, count: number, forms: PluralForms): string {
  if (locale !== 'pl') return count === 1 ? forms.one : forms.many;

  if (count === 1) return forms.one;
  const tens = count % 100;
  // 12–14 take the many form despite ending in 2–4: dwanaście zapisów.
  if (tens >= 12 && tens <= 14) return forms.many;
  const units = count % 10;
  return units >= 2 && units <= 4 ? forms.few : forms.many;
}

/** Fills `{name}` placeholders. Keeps punctuation and word order inside the translation. */
export function format(template: string, values: Readonly<Record<string, string | number>>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}
