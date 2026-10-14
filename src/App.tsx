import { LocaleProvider } from './i18n/LocaleProvider';
import type { Locale } from './i18n/locale';
import { Site } from './site/Site';

export interface AppProps {
  readonly initialLocale?: Locale | undefined;
}

export function App({ initialLocale }: AppProps) {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <Site />
    </LocaleProvider>
  );
}
