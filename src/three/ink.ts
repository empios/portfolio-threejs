import {
  BufferGeometry,
  EdgesGeometry,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  type Object3D,
  SphereGeometry,
  Vector3,
} from 'three';

/**
 * Every instrument in the folio is drawn in one ink, at one weight, as an
 * engraver would. These are the only marks the plates are made of.
 */

/** --pg-aubergine-50 */
export const INK = 0x77216f;
/** --pg-orange-50 — reserved for the body under examination. */
export const WAX = 0xe95420;

/** Opacity is the folio's only tonal control, so each line remembers its own. */
export type InkMaterial = LineBasicMaterial & { userData: { baseOpacity: number } };

export function inkMaterial(opacity: number): InkMaterial {
  const material = new LineBasicMaterial({ color: INK, transparent: true, opacity }) as InkMaterial;
  material.userData.baseOpacity = opacity;
  return material;
}

/** Lifts a set of lines out of the ink and into the wax, or puts them back. */
export function setHighlight(materials: readonly InkMaterial[], on: boolean): void {
  for (const material of materials) {
    material.color.setHex(on ? WAX : INK);
    material.opacity = on
      ? Math.min(1, material.userData.baseOpacity + 0.3)
      : material.userData.baseOpacity;
  }
}

/** A circle struck on the XZ plane — the horizontal every ring is built from. */
export function ringGeometry(radius: number, segments = 160): BufferGeometry {
  const points: Vector3[] = [];
  for (let i = 0; i < segments; i += 1) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }
  return new BufferGeometry().setFromPoints(points);
}

export function ring(radius: number, material: InkMaterial, segments?: number): LineLoop {
  return new LineLoop(ringGeometry(radius, segments), material);
}

/** A small body, drawn as three rings crossed at right angles. */
export function bead(radius: number, materials: readonly [InkMaterial, InkMaterial, InkMaterial]) {
  const [a, b, c] = materials;
  const front = ring(radius, a, 40);
  const side = ring(radius, b, 40);
  side.rotation.x = Math.PI / 2;
  const top = ring(radius, c, 40);
  top.rotation.set(Math.PI / 2, Math.PI / 2, 0);
  return [front, side, top] as const;
}

/** A faceted sphere reduced to its edges — the folio's sun and nucleus. */
export function wireBall(radius: number, detail: number, material: InkMaterial): LineSegments {
  return new LineSegments(new EdgesGeometry(new IcosahedronGeometry(radius, detail)), material);
}

/**
 * An invisible sphere that catches the pointer. Bodies are drawn too finely
 * to be hit directly, so each one carries a generous target.
 */
export function hitSphere(radius: number, index: number): Mesh {
  const mesh = new Mesh(
    new SphereGeometry(radius, 12, 12),
    new MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
  );
  mesh.userData.index = index;
  return mesh;
}

/** Reads the index a `hitSphere` was tagged with. */
export function hitIndex(object: Object3D): number | null {
  const index: unknown = object.userData.index;
  return typeof index === 'number' ? index : null;
}

/** Returns every geometry and material below `root` to the GPU. */
export function disposeTree(root: Object3D): void {
  root.traverse((node) => {
    const { geometry, material } = node as Partial<Mesh>;
    geometry?.dispose();
    if (Array.isArray(material)) material.forEach((m) => m.dispose());
    else material?.dispose();
  });
}
