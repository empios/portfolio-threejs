import { Group, type Mesh, Raycaster, Vector2 } from 'three';
import {
  bead,
  disposeTree,
  hitIndex,
  hitSphere,
  type InkMaterial,
  inkMaterial,
  ring,
  setHighlight,
  wireBall,
} from './ink';
import type { InkStage, StageContents } from './types';

/**
 * § II drawn as an instrument: formation at the centre, each engagement in
 * its own orbit. The reader may turn it by hand and select a body.
 */

export interface CourseOrreryOptions {
  /** Body to open on. */
  readonly initial: number;
  readonly onSelect: (index: number) => void;
  readonly onHover: (index: number | null) => void;
}

export interface CourseOrrery extends StageContents {
  /** Move the wax to another body. */
  readonly highlight: (index: number) => void;
}

interface Orbit {
  readonly group: Group;
  readonly rate: number;
}

/** Pointer travel, in px, above which a press is a turn rather than a choice. */
const DRAG_SLOP = 8;
const TILT_MIN = 0.45;
const TILT_MAX = 1.35;

// One central body, then five orbits outward.
const RADII = [1.05, 1.46, 1.87, 2.28, 2.7] as const;
const RATES = [1.0, 0.78, 0.62, 0.5, 0.4] as const;
const SIZES = [0.1, 0.11, 0.12, 0.13, 0.16] as const;

export function buildCourseOrrery(
  stage: InkStage,
  { initial, onSelect, onHover }: CourseOrreryOptions,
): CourseOrrery {
  const rig = new Group();
  const bodies: InkMaterial[][] = [];
  const targets: Mesh[] = [];
  const orbits: Orbit[] = [];

  /** Bodies are drawn too finely to be hit directly; each gets a pointer target. */
  const register = <T extends Mesh>(target: T): T => {
    targets.push(target);
    return target;
  };

  // The centre — formation.
  const sunMaterials = [inkMaterial(0.75), inkMaterial(0.4)] as const;
  rig.add(
    wireBall(0.42, 1, sunMaterials[0]),
    ring(0.62, sunMaterials[1], 80),
    register(hitSphere(0.62, 0)),
  );
  bodies.push([...sunMaterials]);

  RADII.forEach((radius, i) => {
    const orbitLine = inkMaterial(0.38);
    const shell = [inkMaterial(0.8), inkMaterial(0.8), inkMaterial(0.6)] as const;
    rig.add(ring(radius, orbitLine, 180));

    const arm = new Group();
    const body = new Group();
    body.add(...bead(SIZES[i] ?? 0.12, shell));
    body.position.x = radius;

    const target = register(hitSphere(0.32, i + 1));
    target.position.x = radius;

    arm.add(body, target);
    arm.rotation.y = i * 1.35 + 0.5;
    rig.add(arm);

    orbits.push({ group: arm, rate: RATES[i] ?? 0.5 });
    bodies.push([orbitLine, ...shell]);
  });

  rig.rotation.x = 0.95;
  stage.scene.add(rig);
  stage.camera.position.set(0, 0, 7.8);

  const highlight = (index: number) => {
    bodies.forEach((materials, i) => setHighlight(materials, i === index));
    if (stage.still) stage.draw();
  };
  highlight(initial);

  /* ---- The hand on the instrument ---------------------------------- */

  const canvas = stage.renderer.domElement;
  canvas.style.touchAction = 'none';
  canvas.style.cursor = 'grab';

  const raycaster = new Raycaster();
  const pointer = new Vector2();
  let dragging = false;
  let travelled = 0;
  let lastX = 0;
  let lastY = 0;

  const pick = (event: PointerEvent): number | null => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, stage.camera);
    const hit = raycaster.intersectObjects(targets, false)[0];
    return hit ? hitIndex(hit.object) : null;
  };

  const onPointerDown = (event: PointerEvent) => {
    dragging = true;
    travelled = 0;
    lastX = event.clientX;
    lastY = event.clientY;
    canvas.style.cursor = 'grabbing';
    canvas.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!dragging) {
      const index = pick(event);
      canvas.style.cursor = index === null ? 'grab' : 'pointer';
      onHover(index);
      return;
    }
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;
    travelled += Math.abs(dx) + Math.abs(dy);
    rig.rotation.y += dx * 0.005;
    rig.rotation.x = Math.min(TILT_MAX, Math.max(TILT_MIN, rig.rotation.x + dy * 0.004));
    if (stage.still) stage.draw();
  };

  const onPointerUp = (event: PointerEvent) => {
    // A press that barely moved was meant to choose, not to turn.
    if (dragging && travelled < DRAG_SLOP) {
      const index = pick(event);
      if (index !== null) onSelect(index);
    }
    dragging = false;
    canvas.style.cursor = 'grab';
  };

  const onPointerLeave = () => {
    if (!dragging) onHover(null);
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointerleave', onPointerLeave);

  return {
    highlight,

    advance(dt) {
      for (const orbit of orbits) orbit.group.rotation.y += dt * 0.16 * orbit.rate;
      // The instrument drifts on its own only while no hand is on it.
      if (!dragging) rig.rotation.y += dt * 0.02;
    },

    fit(width) {
      stage.camera.position.z = width < 560 ? 9.4 : 7.8;
    },

    dispose() {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      disposeTree(rig);
    },
  };
}
