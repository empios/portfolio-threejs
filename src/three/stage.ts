import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { disposeTree } from './ink';
import type { InkStage } from './types';

/**
 * The bench an instrument is mounted on. Everything here touches three.js, so
 * this module is only ever reached through a dynamic import.
 */

/** A long first frame after a pause would jolt the mechanism. */
const MAX_FRAME_SECONDS = 0.05;

export interface MountedStage {
  readonly stage: InkStage;
  /** Fit the drawing buffer and the camera to the host. */
  readonly resize: (width: number, height: number) => void;
  /** Seconds since the previous frame, clamped. */
  readonly nextDelta: () => number;
  /** Discard the elapsed pause, so a resumed mechanism does not jump. */
  readonly resetClock: () => void;
  readonly destroy: () => void;
}

/** Returns `null` when WebGL declines — draw the plate by hand instead. */
export function mountStage(host: HTMLElement, fov: number, still: boolean): MountedStage | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return null;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const canvas = renderer.domElement;
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
  host.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(fov, 1, 0.1, 100);
  let lastFrame = performance.now();

  const stage: InkStage = {
    scene,
    camera,
    renderer,
    draw: () => renderer.render(scene, camera),
    still,
  };

  return {
    stage,

    resize(width, height) {
      // `false`: the canvas is sized by CSS, so only the drawing buffer changes.
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    },

    nextDelta() {
      const now = performance.now();
      const seconds = (now - lastFrame) / 1000;
      lastFrame = now;
      return Math.min(seconds, MAX_FRAME_SECONDS);
    },

    resetClock() {
      lastFrame = performance.now();
    },

    destroy() {
      disposeTree(scene);
      renderer.dispose();
      canvas.remove();
    },
  };
}
