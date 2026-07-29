import { useEffect, useRef, useState } from 'react';
import { CHAPTERS, DEFAULT_CHAPTER, chapterAt } from '../content/career';
import { UI } from '../content/ui';
import { useT } from '../i18n/LocaleProvider';
import type { CourseOrrery } from '../three/courseOrrery';
import { useInkStage } from '../three/useInkStage';
import { LeaderRow, SectionHeading, Tags } from './common';

export function CourseOfService() {
  const t = useT();
  const hostRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(DEFAULT_CHAPTER);
  const [hovered, setHovered] = useState<number | null>(null);

  // The instrument is rebuilt if the reader's motion preference changes; it
  // must come back showing whatever is currently selected, not the default.
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  const { contentsRef } = useInkStage<CourseOrrery>({
    hostRef,
    fov: 35,
    load: async () => {
      const { buildCourseOrrery } = await import('../three/courseOrrery');
      return (stage) =>
        buildCourseOrrery(stage, {
          initial: selectedRef.current,
          onSelect: setSelected,
          onHover: setHovered,
        });
    },
  });

  // Selection is owned by React; the instrument follows.
  useEffect(() => {
    contentsRef.current?.highlight(selected);
  }, [selected, contentsRef]);

  const chapter = chapterAt(selected);
  const readout = t(hovered === null ? chapter.label : chapterAt(hovered).label);

  return (
    <section id="course" className="fo-section" aria-labelledby="course-title">
      <SectionHeading
        numeral="II"
        eyebrow={t(UI.course.eyebrow)}
        title={t(UI.course.title)}
        titleId="course-title"
      >
        {t(UI.course.note)}
      </SectionHeading>

      <div className="fo-course">
        <div className="fo-panel fo-course__instrument">
          {/* The canvas is a pointing device only; the register beside it is
              the accessible control, and carries the same selection. */}
          <div ref={hostRef} className="fo-course__stage" aria-hidden="true" />
          <p className="fo-mono fo-course__readout" aria-hidden="true">
            {readout}
          </p>
          <div className="fo-mono fo-course__footer">
            <span>{t(UI.course.figure)}</span>
            <span className="fo-course__hint">{t(UI.course.hint)}</span>
          </div>
        </div>

        <div className="fo-course__register">
          <ul className="fo-list" aria-label={t(UI.course.register)}>
            {CHAPTERS.map((entry, index) => (
              <li key={entry.num}>
                <button
                  type="button"
                  className="fo-leader fo-leader--pick"
                  aria-current={index === selected}
                  onClick={() => setSelected(index)}
                >
                  <LeaderRow num={entry.num} name={t(entry.name)} meta={t(entry.dates)} />
                </button>
              </li>
            ))}
          </ul>

          <div className="fo-course__entry" aria-live="polite">
            <p className="fo-mono fo-course__dates">{t(chapter.dates)}</p>
            <h3 className="fo-course__title">{t(chapter.title)}</h3>
            <p className="fo-prose">{t(chapter.summary)}</p>
            <Tags items={chapter.stack} onSurface />
          </div>
        </div>
      </div>

      {/* The screen shows one chapter at a time, which a printed CV cannot
          do — so print gets the whole register, most recent first. */}
      <ol className="fo-list fo-register">
        {[...CHAPTERS].reverse().map((entry) => (
          <li key={entry.num} className="fo-register__entry">
            <p className="fo-register__head">
              <strong className="fo-register__role">{t(entry.title)}</strong>
              <span className="fo-mono fo-register__dates">{t(entry.dates)}</span>
            </p>
            <p className="fo-register__summary">{t(entry.summary)}</p>
            <p className="fo-mono fo-register__stack">{entry.stack.join(' · ')}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
