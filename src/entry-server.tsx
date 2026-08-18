import { renderToString } from 'react-dom/server';
import { App } from './App';
import type { Locale } from './i18n/locale';

export function render(url: string) {
  const initialLocale: Locale = url.startsWith('/en') ? 'en' : 'pl';
  const html = renderToString(<App initialLocale={initialLocale} />);
  return { html };
}
