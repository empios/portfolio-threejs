import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { SUGGESTIONS } from '../content/archive';
import { UI } from '../content/ui';
import { useLocale, useT } from '../i18n/LocaleProvider';
import { format, pluralize } from '../i18n/locale';
import { searchArchive, type SearchResult } from '../lib/searchArchive';
import { SectionHeading } from './common';

/** Long enough that the drawer is not searched on every keystroke. */
const DEBOUNCE_MS = 160;
/** Records enter in sequence, as they are drawn from the drawer. */
const STAGGER_MS = 70;

export function Archive() {
  const t = useT();
  const { locale } = useLocale();

  const [query, setQuery] = useState('');
  /** The question the records on screen actually answer. */
  const [asked, setAsked] = useState('');
  const [results, setResults] = useState<SearchResult>(null);

  const consult = useCallback(
    (value: string) => {
      setResults(searchArchive(value, locale));
      setAsked(value.trim());
    },
    [locale],
  );

  // Re-runs when the language changes too, so results follow the page.
  useEffect(() => {
    const timer = setTimeout(() => consult(query), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query, consult]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    consult(query);
  };

  const ask = (suggestion: string) => {
    setQuery(suggestion);
    consult(suggestion);
  };

  const [idleFirst, idleSecond] = t(UI.archive.idle);
  const [noneFirst, noneSecond] = t(UI.archive.none);

  return (
    <section id="archive" className="fo-section fo-section--band" aria-labelledby="archive-title">
      <SectionHeading
        numeral="III"
        eyebrow={t(UI.archive.eyebrow)}
        title={t(UI.archive.title)}
        titleId="archive-title"
      >
        {t(UI.archive.note)}
      </SectionHeading>

      <div className="fo-panel fo-drawer">
        <div className="fo-drawer__head">
          <p className="fo-mono fo-drawer__plate">{t(UI.archive.drawer)}</p>
          <div className="fo-drawer__pull" aria-hidden="true" />
        </div>

        <form
          className="fo-search"
          role="search"
          aria-label={t(UI.archive.searchLabel)}
          onSubmit={onSubmit}
        >
          <input
            type="text"
            className="fo-search__input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label={t(UI.archive.askLabel)}
            placeholder={t(UI.archive.placeholder)}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="submit" className="fo-mono fo-btn fo-btn--outline">
            {t(UI.archive.consult)}
          </button>
        </form>

        <div className="fo-chips">
          <span className="fo-mono fo-chips__label">{t(UI.archive.tryLabel)}</span>
          {t(SUGGESTIONS).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="fo-mono fo-chip"
              onClick={() => ask(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="fo-results" aria-live="polite">
          {results === null && (
            <p className="fo-mono fo-results__empty">
              {idleFirst}
              <br />
              {idleSecond}
            </p>
          )}

          {results?.length === 0 && (
            <p className="fo-mono fo-results__empty">
              {noneFirst}
              <br />
              {noneSecond}
            </p>
          )}

          {results && results.length > 0 && (
            <>
              <p className="fo-mono fo-results__status">
                {format(t(UI.archive.status), {
                  count: results.length,
                  noun: pluralize(locale, results.length, t(UI.archive.statusNoun)),
                  query: asked,
                })}
              </p>
              <div className="fo-results__list">
                {results.map(({ record, relevance }, index) => (
                  <article
                    key={record.title.en}
                    className="fo-record"
                    style={{ animationDelay: `${index * STAGGER_MS}ms` }}
                  >
                    <div className="fo-mono fo-record__head">
                      <span>{t(record.source)}</span>
                      <span className="fo-record__rel">
                        {t(UI.archive.relevance)} {relevance.toFixed(2)}
                      </span>
                    </div>
                    <h4 className="fo-record__title">{t(record.title)}</h4>
                    <p className="fo-record__excerpt">{t(record.text)}</p>
                    <p className="fo-mono fo-record__tags">{record.tags.slice(0, 4).join(' · ')}</p>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
