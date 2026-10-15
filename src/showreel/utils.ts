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

// ── Easing Functions ────────────────────────────────────────────────────
export const easeOutExpo = (t: number) =>
	t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

export const easeInExpo = (t: number) =>
	t === 0 ? 0 : Math.pow(2, 10 * t - 10);

export const easeOutBack = (t: number, s = 1.70158) => {
	const c3 = s + 1;
	return 1 + c3 * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
};

export const easeOutElastic = (t: number) => {
	if (t === 0 || t === 1) return t;
	return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
};

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const easeInOutCubic = (t: number) =>
	t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

// ── Math Helpers ────────────────────────────────────────────────────────
export const clamp = (v: number, lo: number, hi: number) =>
	Math.max(lo, Math.min(hi, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const progress = (frame: number, start: number, end: number) =>
	clamp((frame - start) / (end - start), 0, 1);

// ── Timecode Formatter ──────────────────────────────────────────────────
export function formatTimecode(frame: number, fps: number): string {
	const totalSec = frame / fps;
	const h = Math.floor(totalSec / 3600);
	const m = Math.floor((totalSec % 3600) / 60);
	const s = Math.floor(totalSec % 60);
	const f = Math.floor(frame % fps);
	return [h, m, s, f].map((v) => String(v).padStart(2, '0')).join(':');
}

// ── Fibonacci Sphere ────────────────────────────────────────────────────
export function fibonacciSphere(n: number): [number, number, number][] {
	const pts: [number, number, number][] = [];
	const goldenRatio = (1 + Math.sqrt(5)) / 2;
	for (let i = 0; i < n; i++) {
		const theta = (2 * Math.PI * i) / goldenRatio;
		const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
		pts.push([
			Math.cos(theta) * Math.sin(phi),
			Math.sin(theta) * Math.sin(phi),
			Math.cos(phi),
		]);
	}
	return pts;
}
