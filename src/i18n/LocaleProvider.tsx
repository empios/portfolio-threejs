import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { LOCALES, type Locale, type Localized } from './locale';

/** Reads one field of a localized value in the active language. */
export type Translate = <T>(value: Localized<T>) => T;

interface LocaleContextValue {
  readonly locale: Locale;
  readonly setLocale: (locale: Locale) => void;
  readonly t: Translate;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = 'codex.locale';

function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** A previous choice wins; otherwise the browser is asked, and English answers for it. */
function readInitialLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;
  return navigator.languages.some((tag) => tag.toLowerCase().startsWith('pl')) ? 'pl' : 'en';
}

export function LocaleProvider({ children }: { readonly children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  // The document must declare its own language for screen readers and hyphenation.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t: (localized) => localized[locale] }),
    [locale, setLocale],
  );

  return <LocaleContext value={value}>{children}</LocaleContext>;
}

function useLocaleContext(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('The folio must be read inside a LocaleProvider.');
  return context;
}

/** The active language, and the means to change it. */
export function useLocale(): Omit<LocaleContextValue, 't'> {
  const { locale, setLocale } = useLocaleContext();
  return { locale, setLocale };
}

/** The reader for localized content: `t(plate.title)`. */
export function useT(): Translate {
  return useLocaleContext().t;
}
