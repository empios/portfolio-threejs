import { BufferGeometry, Group, Line, LineSegments, Vector3 } from 'three';
import { bead, disposeTree, inkMaterial, ring, wireBall } from './ink';
import type { InkStage, StageContents } from './types';

/** The frontispiece instrument: an armillary sphere, or a small orrery. */
export type InstrumentKind = 'armillary' | 'orrery';

export interface HeroInstrumentOptions {
  readonly kind: InstrumentKind;
  /** Read every frame, so the speed can be changed without rebuilding. */
  readonly getSpeed: () => number;
}

interface Orbit {
  readonly group: Group;
  readonly rate: number;
}

/**
 * Below this the instrument is framed behind the title rather than beside it.
 * folio.css draws it back at the same threshold — the two are independent
 * concerns (framing and ink weight) that happen to turn on the same width.
 */
const NARROW_WIDTH = 860;
/** The rig stops answering the scroll once the frontispiece is well past. */
const SCROLL_LIMIT = 1400;

function buildArmillary(rig: Group): { spinner: Group; tilt: number } {
  const spinner = new Group();

  // Three meridians, struck through the poles.
  [0, Math.PI / 3, (2 * Math.PI) / 3].forEach((angle, i) => {
    const holder = new Group();
    const meridian = ring(2, inkMaterial(i === 0 ? 0.55 : 0.38));
    meridian.rotation.x = Math.PI / 2;
    holder.add(meridian);
    holder.rotation.y = angle;
    spinner.add(holder);
  });

  // The equatorial band: two rules, graduated between them.
  const above = ring(2.04, inkMaterial(0.8));
  above.position.y = 0.055;
  const below = ring(2.04, inkMaterial(0.8));
  below.position.y = -0.055;
  spinner.add(above, below);

  const ticks: Vector3[] = [];
  for (let i = 0; i < 48; i += 1) {
    const angle = (i / 48) * Math.PI * 2;
    const x = Math.cos(angle) * 2.04;
    const z = Math.sin(angle) * 2.04;
    ticks.push(new Vector3(x, -0.055, z), new Vector3(x, 0.055, z));
  }
  spinner.add(new LineSegments(new BufferGeometry().setFromPoints(ticks), inkMaterial(0.5)));

  // Tropics and polar circles.
  ([
    [35, 0.35],
    [-35, 0.35],
    [66, 0.22],
    [-66, 0.22],
  ] as const).forEach(([degrees, opacity]) => {
    const phi = (degrees * Math.PI) / 180;
    const circle = ring(2 * Math.cos(phi), inkMaterial(opacity));
    circle.position.y = 2 * Math.sin(phi);
    spinner.add(circle);
  });

  const ecliptic = ring(2.2, inkMaterial(0.6));
  ecliptic.rotation.z = 0.41;
  spinner.add(ecliptic);

  // The axis, with a finial at each pole.
  spinner.add(
    new Line(
      new BufferGeometry().setFromPoints([new Vector3(0, -2.75, 0), new Vector3(0, 2.75, 0)]),
      inkMaterial(0.7),
    ),
  );
  [2.75, -2.75].forEach((y) => {
    const finial = ring(0.09, inkMaterial(0.7));
    finial.position.y = y;
    spinner.add(finial);
  });

  spinner.add(wireBall(0.5, 1, inkMaterial(0.5)));

  rig.add(spinner);
  // Two fixed rings outside the turning cage — the stand.
  rig.add(ring(2.55, inkMaterial(0.28)), ring(2.62, inkMaterial(0.18)));
  rig.rotation.z = -0.18;

  return { spinner, tilt: 0.16 };
}

function buildOrrery(rig: Group): { orbits: Orbit[]; tilt: number } {
  const orbits: Orbit[] = [];
  rig.add(wireBall(0.34, 1, inkMaterial(0.8)));

  // radius, angular rate, size of the body
  ([
    [0.85, 1.0, 0.1],
    [1.35, 0.62, 0.09],
    [1.9, 0.4, 0.13],
    [2.45, 0.26, 0.1],
  ] as const).forEach(([radius, rate, size], i) => {
    rig.add(ring(radius, inkMaterial(0.4)));

    const arm = new Group();
    const body = new Group();
    body.add(...bead(size, [inkMaterial(0.75), inkMaterial(0.75), inkMaterial(0.6)]));
    body.position.x = radius;
    arm.add(body);
    arm.rotation.y = i * 1.9 + 0.6;

    // The third body carries a moon of its own.
    if (i === 2) {
      const moonArm = new Group();
      const moon = ring(0.045, inkMaterial(0.7), 24);
      moon.position.x = 0.3;
      moonArm.add(ring(0.3, inkMaterial(0.4)), moon);
      moonArm.position.x = radius;
      arm.add(moonArm);
      orbits.push({ group: moonArm, rate: 2.4 });
    }

    rig.add(arm);
    orbits.push({ group: arm, rate });
  });

  rig.rotation.z = -0.06;
  return { orbits, tilt: 1.05 };
}

export function buildHeroInstrument(
  stage: InkStage,
  { kind, getSpeed }: HeroInstrumentOptions,
): StageContents {
  const rig = new Group();
  const { spinner, orbits, tilt } =
    kind === 'orrery'
      ? { spinner: null, ...buildOrrery(rig) }
      : { orbits: [] as Orbit[], ...buildArmillary(rig) };

  rig.rotation.x = tilt;
  stage.scene.add(rig);
  stage.camera.position.set(0, 0, 9.2);

  // Cached rather than read in the frame loop, which would force layout.
  let scrollY = window.scrollY;
  const onScroll = () => {
    scrollY = window.scrollY;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  return {
    advance(dt) {
      const speed = getSpeed();
      if (spinner) spinner.rotation.y += dt * 0.16 * speed;
      for (const orbit of orbits) orbit.group.rotation.y += dt * 0.5 * orbit.rate * speed;

      // The instrument leans back and rises as the reader descends the page.
      const targetTilt = tilt + Math.min(scrollY, SCROLL_LIMIT) * 0.00035;
      rig.rotation.x += (targetTilt - rig.rotation.x) * 0.06;
      const targetLift = Math.min(scrollY * 0.0009, 1.1);
      rig.position.y += (targetLift - rig.position.y) * 0.08;
    },

    fit(width) {
      const isNarrow = width < NARROW_WIDTH;
      stage.camera.position.z = isNarrow ? 11.5 : 9.2;

      // Set the instrument in the right-hand margin, but never off the leaf.
      const halfWidth =
        Math.tan((stage.camera.fov * Math.PI) / 360) * stage.camera.position.z * stage.camera.aspect;
      rig.position.x = isNarrow ? 0 : Math.min(2.4, Math.max(0, halfWidth - 3.05));
    },

    dispose() {
      window.removeEventListener('scroll', onScroll);
      disposeTree(rig);
    },
  };
}
