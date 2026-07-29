import { RECORDS, type ArchiveRecord } from '../content/archive';
import type { Locale } from '../i18n/locale';

export interface Hit {
  readonly record: ArchiveRecord;
  /** Score relative to the strongest hit in the same set, in (0, 1]. */
  readonly relevance: number;
}

/** `null` means the reader has not asked anything yet — an empty array means they have, and nothing matched. */
export type SearchResult = readonly Hit[] | null;

const MIN_QUERY_LENGTH = 2;
const MAX_HITS = 4;

/** A tag is worth more than a title, a title more than the body. */
const WEIGHT = { tag: 3, title: 2, text: 1 } as const;

/**
 * Case- and diacritic-insensitive, so 'gdansk' finds 'Gdańsk' and 'sciezka'
 * finds 'ścieżka'. Applied to queries, tags and prose alike.
 */
function fold(value: string): string {
  return value
    .toLowerCase()
    // 'ł' is a letter in its own right, not l plus a mark, so NFD leaves it
    // whole and the tokenizer would split a word in half on it.
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/** Keeps dots, plus and hyphen so 'llama.cpp' and 'YOLOv8-seg' survive intact. */
function tokenize(query: string): string[] {
  return fold(query)
    .split(/[^a-z0-9.+-]+/)
    .filter((token) => token.length > 1);
}

/** Shortest stem worth comparing, so 'da' does not reach 'dane'. */
const MIN_STEM = 4;
/** How many trailing letters two forms of one word may differ by. */
const ENDING_SLACK = 2;

function sharedPrefixLength(a: string, b: string): number {
  const limit = Math.min(a.length, b.length);
  let i = 0;
  while (i < limit && a[i] === b[i]) i += 1;
  return i;
}

/**
 * English inflects by appending, so a prefix test carries it: 'deploy' finds
 * 'deployment' and the reverse. Polish inflects by *changing* the ending —
 * wdrożenie / wdrożenia / wdrożeniu — where neither form is a prefix of the
 * other. So two words also match when they share a long enough stem and part
 * ways only near the end. The slack stays at two letters: 'kontrakt' and
 * 'kontrola' share five, which is not enough to confuse them.
 */
function tagMatches(tags: readonly string[], token: string): boolean {
  return tags.some((tag) => {
    const folded = fold(tag);
    if (folded.startsWith(token) || token.startsWith(folded)) return true;

    const shared = sharedPrefixLength(folded, token);
    if (shared < MIN_STEM) return false;
    return shared >= Math.min(folded.length, token.length) - ENDING_SLACK;
  });
}

function score(record: ArchiveRecord, tokens: readonly string[], locale: Locale): number {
  const title = fold(record.title[locale]);
  const text = fold(record.text[locale]);

  return tokens.reduce((total, token) => {
    let points = 0;
    if (tagMatches(record.tags, token)) points += WEIGHT.tag;
    if (title.includes(token)) points += WEIGHT.title;
    if (text.includes(token)) points += WEIGHT.text;
    return total + points;
  }, 0);
}

/**
 * Ranks the archive against a reader's question. Pure, synchronous and
 * offline by design — no server is consulted.
 *
 * Tags are shared between languages, so a record stays reachable from either;
 * only the prose is scored in the language on screen.
 */
export function searchArchive(
  query: string,
  locale: Locale,
  corpus: readonly ArchiveRecord[] = RECORDS,
): SearchResult {
  if (query.trim().length < MIN_QUERY_LENGTH) return null;

  const tokens = tokenize(query);
  if (tokens.length === 0) return null;

  const scored = corpus
    .map((record) => ({ record, points: score(record, tokens, locale) }))
    .filter((entry) => entry.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, MAX_HITS);

  const best = scored[0]?.points ?? 1;

  return scored.map(({ record, points }) => ({ record, relevance: points / best }));
}
