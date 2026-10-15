// ── Seeded PRNG (mulberry32) ────────────────────────────────────────────
export function createRng(seed: number) {
	let s = seed | 0;
	return () => {
		s = (s + 0x6d2b79f5) | 0;
		let t = Math.imul(s ^ (s >>> 15), 1 | s);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

// ── Math Helpers ────────────────────────────────────────────────────────
export const clamp = (v: number, lo: number, hi: number) =>
	Math.max(lo, Math.min(hi, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const progress = (frame: number, start: number, end: number) =>
	clamp((frame - start) / (end - start), 0, 1);

export const smoothstep = (edge0: number, edge1: number, x: number) => {
	const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
	return t * t * (3 - 2 * t);
};

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
export const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
export const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
export const easeInOutCubic = (t: number) =>
	t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const hash01 = (i: number) => {
	const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
};

// ── Colors ──────────────────────────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
	const h = hex.replace('#', '');
	const n = parseInt(
		h.length === 3
			? h
					.split('')
					.map((c) => c + c)
					.join('')
			: h,
		16,
	);
	return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Linear RGB blend between two hex colors. t=0 → a, t=1 → b. */
export function mixHex(a: string, b: string, t: number): string {
	const [r1, g1, b1] = hexToRgb(a);
	const [r2, g2, b2] = hexToRgb(b);
	const r = Math.round(lerp(r1, r2, t));
	const g = Math.round(lerp(g1, g2, t));
	const bl = Math.round(lerp(b1, b2, t));
	return `rgb(${r},${g},${bl})`;
}

// ── Geometry ────────────────────────────────────────────────────────────
export type Pt = [number, number];

export interface Spline {
	d: string;
	at: (t: number) => Pt;
	segments: number;
}

/**
 * Catmull-Rom spline through the given points, converted to cubic beziers.
 * Returns the SVG path plus a point-at-t sampler that matches the path.
 */
export function catmullRomSpline(points: Pt[]): Spline {
	const segs: { p0: Pt; c1: Pt; c2: Pt; p1: Pt }[] = [];
	for (let i = 0; i < points.length - 1; i++) {
		const p0 = points[i];
		const p1 = points[i + 1];
		const pPrev = points[i - 1] ?? p0;
		const pNext = points[i + 2] ?? p1;
		const c1: Pt = [
			p0[0] + (p1[0] - pPrev[0]) / 6,
			p0[1] + (p1[1] - pPrev[1]) / 6,
		];
		const c2: Pt = [
			p1[0] - (pNext[0] - p0[0]) / 6,
			p1[1] - (pNext[1] - p0[1]) / 6,
		];
		segs.push({ p0, c1, c2, p1 });
	}

	const d =
		`M ${points[0][0]} ${points[0][1]}` +
		segs
			.map(
				(s) =>
					` C ${s.c1[0]} ${s.c1[1]}, ${s.c2[0]} ${s.c2[1]}, ${s.p1[0]} ${s.p1[1]}`,
			)
			.join('');

	const cubic = (a: number, b: number, c: number, e: number, t: number) => {
		const mt = 1 - t;
		return (
			mt * mt * mt * a +
			3 * mt * mt * t * b +
			3 * mt * t * t * c +
			t * t * t * e
		);
	};

	const at = (t: number): Pt => {
		const tt = clamp(t, 0, 1) * segs.length;
		const i = Math.min(segs.length - 1, Math.floor(tt));
		const lt = tt - i;
		const s = segs[i];
		return [
			cubic(s.p0[0], s.c1[0], s.c2[0], s.p1[0], lt),
			cubic(s.p0[1], s.c1[1], s.c2[1], s.p1[1], lt),
		];
	};

	return { d, at, segments: segs.length };
}

/** Ray-casting point-in-polygon test. */
export function pointInPolygon([x, y]: Pt, poly: Pt[]): boolean {
	let inside = false;
	for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
		const [xi, yi] = poly[i];
		const [xj, yj] = poly[j];
		const intersect =
			yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
		if (intersect) inside = !inside;
	}
	return inside;
}

export interface DotSpec {
	x: number;
	y: number;
	/** extra random values (0..1) for size / color / phase variation */
	r: number;
	s: number;
}

/**
 * Sample a grid of dots inside the union of the given polygons.
 * Deterministic: the PRNG consumption is the same for every grid cell.
 */
export function sampleDots(
	parts: Pt[][],
	step: number,
	jitter: number,
	seed: number,
): DotSpec[] {
	const rng = createRng(seed);
	const out: DotSpec[] = [];
	for (let gy = 0; gy <= 1 + 1e-9; gy += step) {
		for (let gx = 0; gx <= 1 + 1e-9; gx += step) {
			const jx = gx + (rng() - 0.5) * jitter * step;
			const jy = gy + (rng() - 0.5) * jitter * step;
			const rr = rng();
			const ss = rng();
			for (const p of parts) {
				if (pointInPolygon([jx, jy], p)) {
					out.push({ x: jx, y: jy, r: rr, s: ss });
					break;
				}
			}
		}
	}
	return out;
}

/** Smooth closed path through a polygon's vertices (quadratic midpoints). */
export function roundedPolygonPath(poly: Pt[]): string {
	const n = poly.length;
	if (n < 3) return '';
	let d = '';
	for (let i = 0; i < n; i++) {
		const [x0, y0] = poly[i];
		const [x1, y1] = poly[(i + 1) % n];
		const midX = (x0 + x1) / 2;
		const midY = (y0 + y1) / 2;
		if (i === 0) {
			const [px, py] = poly[n - 1];
			d += `M ${(px + x0) / 2} ${(py + y0) / 2} `;
		}
		d += `Q ${x0} ${y0} ${midX} ${midY} `;
	}
	return d + 'Z';
}

/** Full ellipse as a path (works with pathLength-based stroke draws). */
export function ellipsePath(
	cx: number,
	cy: number,
	rx: number,
	ry: number,
): string {
	return (
		`M ${cx - rx} ${cy} ` +
		`A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} ` +
		`A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`
	);
}

// ── Timecode Formatter ──────────────────────────────────────────────────
export function formatTimecode(frame: number, fps: number): string {
	const totalSec = frame / fps;
	const m = Math.floor((totalSec % 3600) / 60);
	const s = Math.floor(totalSec % 60);
	const f = Math.floor(frame % fps);
	return [m, s, f].map((v) => String(v).padStart(2, '0')).join(':');
}

