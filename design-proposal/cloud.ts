/**
 * The hero's signature: the body of work plotted as an embedding space.
 *
 * Every point belongs to a project cluster (or to the scatter of everything
 * else); the reader's cursor acts as a query vector, and the nearest points
 * answer it with lines — retrieval, drawn. Plain canvas 2D, no dependencies.
 */

export interface CloudCluster {
  readonly id: string;
  readonly label: string;
}

export interface CloudHandle {
  setLabels(labels: readonly string[]): void;
  destroy(): void;
}

interface Point {
  x: number;
  y: number;
  z: number;
  readonly cluster: number; // -1 = scatter
  readonly size: number;
}

interface Projected {
  sx: number;
  sy: number;
  depth: number; // 0 (far) … 1 (near)
  scale: number;
}

/** Viridis, sampled at the cluster count. */
const VIRIDIS = ['#440154', '#46327e', '#365c8d', '#277f8e', '#1fa187', '#4ac16d', '#a0da39'];
const SCATTER = '#8a90a0';
const K_NEAREST = 7;
const QUERY_RADIUS = 170;

/** Deterministic, so the cloud is the same shape on every visit. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function gaussian(rand: () => number) {
  const u = Math.max(rand(), 1e-9);
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function mountCloud(
  host: HTMLElement,
  labelLayer: HTMLElement,
  clusters: readonly CloudCluster[],
  onPick: (id: string) => void,
  /** Labels left of this x (host pixels) would sit on the headline: hide them. */
  getAvoidX: () => number = () => 0,
): CloudHandle {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Build the space ------------------------------------------------
  const rand = rng(1997);
  const points: Point[] = [];
  const centres = clusters.map((_, i) => {
    // Spread cluster centres over a sphere with a golden-angle spiral.
    const t = (i + 0.5) / clusters.length;
    const phi = Math.acos(1 - 2 * t);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return {
      x: Math.sin(phi) * Math.cos(theta) * 0.78,
      y: Math.cos(phi) * 0.7,
      z: Math.sin(phi) * Math.sin(theta) * 0.78,
    };
  });

  centres.forEach((c, i) => {
    const count = 34 + Math.floor(rand() * 14);
    for (let n = 0; n < count; n += 1) {
      points.push({
        x: c.x + gaussian(rand) * 0.15,
        y: c.y + gaussian(rand) * 0.15,
        z: c.z + gaussian(rand) * 0.15,
        cluster: i,
        size: 1.3 + rand() * 1.5,
      });
    }
  });

  for (let n = 0; n < 170; n += 1) {
    const r = 1.2 * Math.cbrt(rand());
    const phi = Math.acos(2 * rand() - 1);
    const theta = rand() * Math.PI * 2;
    points.push({
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.cos(phi) * 0.85,
      z: r * Math.sin(phi) * Math.sin(theta),
      cluster: -1,
      size: 0.8 + rand() * 1.1,
    });
  }

  // Within each cluster, join every point to its nearest neighbour: a constellation.
  const edges: Array<[number, number]> = [];
  points.forEach((p, i) => {
    if (p.cluster < 0) return;
    let best = -1;
    let bestD = Infinity;
    points.forEach((q, j) => {
      if (i === j || q.cluster !== p.cluster) return;
      const d = (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2;
      if (d < bestD) {
        bestD = d;
        best = j;
      }
    });
    if (best >= 0) edges.push([i, best]);
  });

  const colours = points.map((p) => hexToRgb(p.cluster < 0 ? SCATTER : VIRIDIS[p.cluster % VIRIDIS.length]!));

  // ---- Labels are real buttons, so the clusters are reachable by keyboard ----
  const buttons = clusters.map((cluster, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lt-cloudLabel';
    button.style.setProperty('--c', VIRIDIS[i % VIRIDIS.length]!);
    button.textContent = cluster.label;
    button.addEventListener('click', () => onPick(cluster.id));
    button.addEventListener('pointerenter', () => (hoverCluster = i));
    button.addEventListener('pointerleave', () => (hoverCluster = -1));
    button.addEventListener('focus', () => (hoverCluster = i));
    button.addEventListener('blur', () => (hoverCluster = -1));
    labelLayer.appendChild(button);
    return button;
  });

  // ---- State ----------------------------------------------------------
  let width = 1;
  let height = 1;
  let dpr = 1;
  let cx = 0;
  let cy = 0;
  let radius = 1;
  let narrow = false;
  let avoidX = 0;
  let yaw = 0.4;
  let tiltX = 0;
  let tiltY = 0;
  let targetTiltX = 0;
  let targetTiltY = 0;
  let pointer: { x: number; y: number } | null = null;
  let hoverCluster = -1;
  let frame = 0;
  let last = performance.now();
  const projected: Projected[] = points.map(() => ({ sx: 0, sy: 0, depth: 0, scale: 1 }));
  const centroid = clusters.map(() => ({ sx: 0, sy: 0, depth: 0 }));

  function resize() {
    const rect = host.getBoundingClientRect();
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    narrow = width < 900;
    // Wide: the cloud owns the right of the leaf, clear of the headline.
    // Narrow: it floats in a band above the text instead of behind it.
    cx = narrow ? width * 0.5 : width * 0.745;
    cy = narrow ? Math.min(170, height * 0.2) : height * 0.5;
    radius = narrow ? Math.min(width * 0.36, 150) : Math.min(width * 0.185, height * 0.36);
    avoidX = getAvoidX();
    labelLayer.toggleAttribute('hidden', narrow);
    draw();
  }

  function project() {
    const cosY = Math.cos(yaw + tiltY);
    const sinY = Math.sin(yaw + tiltY);
    const cosX = Math.cos(0.32 + tiltX);
    const sinX = Math.sin(0.32 + tiltX);
    const camera = 3.4;

    const toScreen = (x: number, y: number, z: number, out: { sx: number; sy: number; depth: number }) => {
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const f = camera / (camera + z2);
      out.sx = cx + x1 * radius * f;
      out.sy = cy + y1 * radius * f;
      out.depth = Math.min(1, Math.max(0, (1.6 - z2) / 3.2));
      return f;
    };

    points.forEach((p, i) => {
      const out = projected[i]!;
      out.scale = toScreen(p.x, p.y, p.z, out);
    });
    centres.forEach((c, i) => toScreen(c.x, c.y, c.z, centroid[i]!));
  }

  /** The query: the K nearest points to the cursor, in screen space. */
  function nearest(): number[] {
    if (!pointer) return [];
    const scored: Array<[number, number]> = [];
    projected.forEach((p, i) => {
      const d = Math.hypot(p.sx - pointer!.x, p.sy - pointer!.y);
      if (d < QUERY_RADIUS) scored.push([d, i]);
    });
    scored.sort((a, b) => a[0] - b[0]);
    return scored.slice(0, K_NEAREST).map(([, i]) => i);
  }

  function draw() {
    if (!ctx) return;
    project();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const hits = nearest();
    const votes = new Map<number, number>();
    hits.forEach((i) => {
      const c = points[i]!.cluster;
      if (c >= 0) votes.set(c, (votes.get(c) ?? 0) + 1);
    });
    let queried = hoverCluster;
    if (queried < 0 && votes.size) {
      queried = [...votes.entries()].sort((a, b) => b[1] - a[1])[0]![0];
    }

    // Constellation edges.
    ctx.lineWidth = 1;
    for (const [a, b] of edges) {
      const p = projected[a]!;
      const q = projected[b]!;
      const cluster = points[a]!.cluster;
      const lit = cluster === queried;
      const [r, g, bl] = colours[a]!;
      ctx.strokeStyle = `rgba(${r},${g},${bl},${(lit ? 0.5 : 0.14) * (0.4 + p.depth * 0.6)})`;
      ctx.beginPath();
      ctx.moveTo(p.sx, p.sy);
      ctx.lineTo(q.sx, q.sy);
      ctx.stroke();
    }

    // Points, far to near.
    const order = projected.map((_, i) => i).sort((a, b) => projected[a]!.depth - projected[b]!.depth);
    for (const i of order) {
      const p = projected[i]!;
      const pt = points[i]!;
      const [r, g, b] = colours[i]!;
      const dim = queried >= 0 && pt.cluster !== queried ? 0.45 : 1;
      const alpha = (pt.cluster < 0 ? 0.35 : 0.85) * (0.25 + p.depth * 0.75) * dim;
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.beginPath();
      ctx.arc(p.sx, p.sy, pt.size * p.scale * (narrow ? 0.9 : 1.15), 0, Math.PI * 2);
      ctx.fill();
    }

    // The query and its answers.
    if (pointer && hits.length) {
      hits.forEach((i, rank) => {
        const p = projected[i]!;
        const [r, g, b] = colours[i]!;
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.75 - rank * 0.08})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pointer!.x, pointer!.y);
        ctx.lineTo(p.sx, p.sy);
        ctx.stroke();
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, 3.2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.strokeStyle = 'rgba(11,13,18,0.55)';
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.font = '500 11px "Geist Mono Variable", ui-monospace, monospace';
      ctx.fillStyle = 'rgba(11,13,18,0.55)';
      ctx.fillText(`k=${hits.length}`, pointer.x + 10, pointer.y - 8);
    }

    // Labels follow their cluster's centre. Nearer labels win: a farther one
    // that would collide with a nearer one, or with the headline, steps out.
    const placed: Array<{ l: number; r: number; t: number; b: number }> = [];
    const byDepth = buttons.map((_, i) => i).sort((a, b) => centroid[b]!.depth - centroid[a]!.depth);
    for (const i of byDepth) {
      const button = buttons[i]!;
      const c = centroid[i]!;
      const w = button.offsetWidth;
      const h = button.offsetHeight;
      const box = { l: c.sx - w / 2 - 4, r: c.sx + w / 2 + 4, t: c.sy - h / 2 - 3, b: c.sy + h / 2 + 3 };
      const collides = placed.some((o) => box.l < o.r && box.r > o.l && box.t < o.b && box.b > o.t);
      const clear = box.l > avoidX && (!collides || i === queried);
      if (clear) placed.push(box);
      button.style.transform = `translate(${c.sx}px, ${c.sy}px) translate(-50%, -50%)`;
      button.style.opacity = clear ? String(0.4 + c.depth * 0.6) : '0';
      button.style.pointerEvents = clear ? '' : 'none';
      button.style.zIndex = String(Math.round(c.depth * 10));
      button.tabIndex = clear ? 0 : -1;
      button.toggleAttribute('data-active', i === queried);
    }
  }

  function tick(now: number) {
    frame = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    yaw += dt * 0.07;
    tiltX += (targetTiltX - tiltX) * 0.05;
    tiltY += (targetTiltY - tiltY) * 0.05;
    draw();
  }

  function start() {
    if (frame || still) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  }

  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
  }

  const onPointer = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    const rect = host.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    pointer = inside && !narrow ? { x, y } : null;
    targetTiltY = ((event.clientX / window.innerWidth) * 2 - 1) * 0.35;
    targetTiltX = ((event.clientY / window.innerHeight) * 2 - 1) * 0.2;
    if (still) draw();
  };
  const onLeave = () => {
    pointer = null;
    if (still) draw();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const io = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting) start();
    else stop();
  });
  io.observe(host);
  window.addEventListener('pointermove', onPointer, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  resize();
  start();

  return {
    setLabels(labels) {
      buttons.forEach((button, i) => {
        button.textContent = labels[i] ?? '';
      });
    },
    destroy() {
      stop();
      io.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      buttons.forEach((button) => button.remove());
      canvas.remove();
    },
  };
}
