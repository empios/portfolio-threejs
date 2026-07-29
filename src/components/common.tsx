import type { ReactNode } from 'react';

/**
 * The marks the folio repeats on every leaf. Each exists because the design
 * uses it in at least three places.
 */

/** A rule broken by a lozenge, closing a section heading. */
export function Rule() {
  return (
    <div className="fo-rule" aria-hidden="true">
      <span className="fo-rule__mark" />
    </div>
  );
}

interface SectionHeadingProps {
  /** Section number, as engraved: `§ I`, `§ II`… */
  readonly numeral: string;
  readonly eyebrow: string;
  readonly title: string;
  /** Id the section's `aria-labelledby` points at. */
  readonly titleId: string;
  readonly children?: ReactNode;
}

export function SectionHeading({
  numeral,
  eyebrow,
  title,
  titleId,
  children,
}: SectionHeadingProps) {
  return (
    <header className="fo-section__head">
      <p className="fo-mono fo-eyebrow">
        § {numeral} — {eyebrow}
      </p>
      <h2 id={titleId} className="fo-title">
        {title}
      </h2>
      <Rule />
      {children ? <p className="fo-section__note">{children}</p> : null}
    </header>
  );
}

/** The stack listed beneath a plate, or against a chapter of service. */
export function Tags({
  items,
  onSurface = false,
}: {
  readonly items: readonly string[];
  readonly onSurface?: boolean;
}) {
  return (
    <ul className="fo-tags">
      {items.map((item) => (
        <li key={item} className={`fo-mono fo-tag${onSurface ? ' fo-tag--onSurface' : ''}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

interface LeaderRowProps {
  /** Enumeration in the left margin. */
  readonly num: string;
  readonly name: string;
  /** Set against the right margin, past the dotted leader. */
  readonly meta: string;
}

/**
 * An entry in a ruled list: number, name, a dotted leader eating the slack,
 * and a note at the right margin. Shared by the register of service and the
 * specimen catalogue — the first is chooseable, the second is not.
 */
export function LeaderRow({ num, name, meta }: LeaderRowProps) {
  return (
    <>
      <span className="fo-mono fo-leader__num">{num}</span>
      <span className="fo-leader__name">{name}</span>
      <span className="fo-leader__dots" aria-hidden="true" />
      <span className="fo-mono fo-leader__meta">{meta}</span>
    </>
  );
}
