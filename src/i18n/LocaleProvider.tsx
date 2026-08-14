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

function readInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path.startsWith('/en')) {
      return 'en';
    }
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;
  return 'pl';
}

export function LocaleProvider({ children }: { readonly children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  // Sync document lang, title and description
  useEffect(() => {
    document.documentElement.lang = locale;
    const isPl = locale === 'pl';
    document.title = isPl
      ? 'Paweł Włodarczyk — Full-Stack & Applied ML Engineer'
      : 'Paweł Włodarczyk — Full-Stack & Applied ML Engineer';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        isPl
          ? 'Paweł Włodarczyk — Full-Stack Software Engineer & Applied ML (6 lat doświadczenia, MSc CS). Wdrażanie AI dla enterprise i e-commerce. Prowadzę CodeWorks (codeworks-it.pl).'
          : 'Paweł Włodarczyk — Full-Stack Software Engineer & Applied ML (6 years exp, MSc CS). Deploying AI for enterprise & e-commerce. Founder of CodeWorks (codeworks-it.pl).'
      );
    }
  }, [locale]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const isEn = window.location.pathname.startsWith('/en');
      setLocaleState(isEn ? 'en' : 'pl');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const hash = window.location.hash;
      if (next === 'en' && !currentPath.startsWith('/en')) {
        window.history.pushState({}, '', '/en' + (hash || ''));
      } else if (next === 'pl' && currentPath.startsWith('/en')) {
        window.history.pushState({}, '', '/' + (hash || ''));
      }
    }
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
