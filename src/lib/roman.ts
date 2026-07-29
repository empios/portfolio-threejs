const NUMERALS: readonly (readonly [value: number, glyph: string])[] = [
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

/** Roman numeral for a positive integer. The folio never counts past a dozen. */
export function toRoman(n: number): string {
  let rest = Math.trunc(n);
  let out = '';
  for (const [value, glyph] of NUMERALS) {
    while (rest >= value) {
      out += glyph;
      rest -= value;
    }
  }
  return out;
}
