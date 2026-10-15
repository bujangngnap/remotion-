// ── Color Palette ──────────────────────────────────────────────────────
export const C = {
	inkBlack: '#0A0A0B',
	hotOrange: '#FF5A1F',
	acidLime: '#C8F52B',
	periwinkle: '#5B5CFF',
	offWhite: '#E9E6DF',
	deepIndigo: '#1B1B4B',
	deepIndigoDark: '#0A0A12',
	darkBrown: '#140C0A',
	white: '#FFFFFF',
} as const;

// ── Global Config ──────────────────────────────────────────────────────
export const FPS = 60;
export const TOTAL_FRAMES = 900; // 15s × 60fps
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const BRAND_NAME = 'CLAUDE';

// ── Scene Timing (frames) ──────────────────────────────────────────────
export const S = {
	boot:        { from: 0,   dur: 48  },  // 0.0 – 0.8 s
	countdown:   { from: 48,  dur: 96  },  // 0.8 – 2.4 s
	kineticType: { from: 144, dur: 96  },  // 2.4 – 4.0 s
	geometry:    { from: 240, dur: 120 },  // 4.0 – 6.0 s
	particles:   { from: 360, dur: 120 },  // 6.0 – 8.0 s
	depth:       { from: 480, dur: 120 },  // 8.0 – 10.0 s
	ui:          { from: 600, dur: 120 },  // 10.0 – 12.0 s
	rhythm:      { from: 720, dur: 60  },  // 12.0 – 13.0 s
	identity:    { from: 780, dur: 120 },  // 13.0 – 15.0 s
} as const;

// ── Scene Labels for HUD ───────────────────────────────────────────────
export interface SceneLabel {
	index: string;
	name: string;
}

export const SCENE_LABELS: { from: number; to: number; label: SceneLabel }[] = [
	{ from: 0,   to: 47,  label: { index: '00', name: 'BOOT' } },
	{ from: 48,  to: 143, label: { index: '00', name: 'COUNTDOWN' } },
	{ from: 144, to: 239, label: { index: '01', name: 'KINETIC TYPE' } },
	{ from: 240, to: 359, label: { index: '02', name: 'GEOMETRY' } },
	{ from: 360, to: 479, label: { index: '03', name: 'PARTICLES' } },
	{ from: 480, to: 599, label: { index: '04', name: 'DEPTH' } },
	{ from: 600, to: 719, label: { index: '05', name: 'INTERFACE' } },
	{ from: 720, to: 779, label: { index: '06', name: 'RHYTHM' } },
	{ from: 780, to: 899, label: { index: '07', name: 'IDENTITY' } },
];

export function getSceneLabel(frame: number): SceneLabel {
	for (const s of SCENE_LABELS) {
		if (frame >= s.from && frame <= s.to) return s.label;
	}
	return { index: '00', name: 'BOOT' };
}
