import { useEffect, useRef, useState, type RefObject } from 'react';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';
import type { InkStage, StageBuilder, StageContents } from './types';

/**
 * Runs an instrument's whole life: fetch the machinery, mount it, fit it to
 * its host, turn it only while it is on the page, and take it apart again.
 *
 * three.js is reached exclusively through `load`, so the folio's text and
 * plates paint without waiting for a renderer they do not need.
 */

export interface UseInkStageOptions<C extends StageContents> {
  /** A positioned element; the canvas is laid over it. */
  readonly hostRef: RefObject<HTMLElement | null>;
  readonly fov: number;
  /** Resolves the mechanism, with its options already bound. */
  readonly load: () => Promise<StageBuilder<C>>;
  /** Changing any of these rebuilds the mechanism from scratch. */
  readonly deps?: readonly unknown[];
}

export interface InkStageHandle<C> {
  /** False once WebGL, or the chunk carrying it, has declined. */
  readonly supported: boolean;
  readonly stageRef: RefObject<InkStage | null>;
  readonly contentsRef: RefObject<C | null>;
}

export function useInkStage<C extends StageContents>({
  hostRef,
  fov,
  load,
  deps = [],
}: UseInkStageOptions<C>): InkStageHandle<C> {
  const still = usePrefersReducedMotion();
  const [supported, setSupported] = useState(true);
  const stageRef = useRef<InkStage | null>(null);
  const contentsRef = useRef<C | null>(null);

  // Held in a ref so a fresh closure each render does not rebuild the scene.
  const loadRef = useRef(load);
  loadRef.current = load;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let teardown: (() => void) | null = null;

    void (async () => {
      let mountStage: typeof import('./stage').mountStage;
      let build: StageBuilder<C>;
      try {
        [{ mountStage }, build] = await Promise.all([import('./stage'), loadRef.current()]);
      } catch {
        if (!cancelled) setSupported(false);
        return;
      }
      // The reader may have left while the machinery was in the post.
      if (cancelled) return;

      const mounted = mountStage(host, fov, still);
      if (!mounted) {
        setSupported(false);
        return;
      }

      const { stage, resize, nextDelta, resetClock, destroy } = mounted;
      stageRef.current = stage;
      const contents = build(stage);
      contentsRef.current = contents;

      const fit = () => {
        resize(host.clientWidth || 1, host.clientHeight || 1);
        contents.fit?.(host.clientWidth || 1, host.clientHeight || 1);
        stage.draw();
      };

      const resizeObserver = new ResizeObserver(fit);
      resizeObserver.observe(host);
      fit();

      let frame = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        contents.advance?.(nextDelta());
        stage.draw();
      };
      const start = () => {
        if (frame || still || !contents.advance) return;
        resetClock();
        tick();
      };
      const stop = () => {
        if (!frame) return;
        cancelAnimationFrame(frame);
        frame = 0;
      };

      // The instrument turns only while it is on the page.
      const visibility = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) start();
        else stop();
      });
      visibility.observe(host);

      teardown = () => {
        stop();
        visibility.disconnect();
        resizeObserver.disconnect();
        contents.dispose?.();
        destroy();
        stageRef.current = null;
        contentsRef.current = null;
      };
    })();

    return () => {
      cancelled = true;
      teardown?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostRef, fov, still, ...deps]);

  return { supported, stageRef, contentsRef };
}
