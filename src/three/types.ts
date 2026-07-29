import type { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

/**
 * Type-only, so importing these never pulls three.js into a chunk. The
 * runtime lives in `stage.ts` and the builders, which are loaded on demand.
 */

export interface InkStage {
  readonly scene: Scene;
  readonly camera: PerspectiveCamera;
  readonly renderer: WebGLRenderer;
  /** Draw a single frame now. Needed when motion is suppressed but the view changed. */
  readonly draw: () => void;
  /** True when the reader has asked the machine to hold still. */
  readonly still: boolean;
}

export interface StageContents {
  /** Advance the mechanism by `dt` seconds. Omit for a drawing that does not move. */
  readonly advance?: (dt: number) => void;
  /** Re-fit the view; called on mount and on every resize of the host. */
  readonly fit?: (width: number, height: number) => void;
  /** Release anything held outside the scene graph — listeners, timers. */
  readonly dispose?: () => void;
}

/** A mechanism builder with its options already bound. */
export type StageBuilder<C extends StageContents> = (stage: InkStage) => C;
