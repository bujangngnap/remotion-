import { interpolate, spring } from "remotion";

// ============================================================
//  Helper animasi — semua gerakan berbasis spring() & interpolate()
// ============================================================

export type SpringCfg = {
  damping?: number;
  stiffness?: number;
  mass?: number;
  overshootClamping?: boolean;
};

/** Memantul kuat — untuk pop-in stiker, angka, ikon */
export const BOUNCY: SpringCfg = { damping: 9, stiffness: 170, mass: 0.6 };
/** Cepat & sedikit overshoot — untuk teks dan kartu */
export const SNAPPY: SpringCfg = { damping: 15, stiffness: 190, mass: 0.7 };
/** Lembut tanpa banyak pantulan — untuk gerakan besar */
export const SOFT: SpringCfg = { damping: 22, stiffness: 90, mass: 1 };

export const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** spring() yang dimulai pada frame `delay` */
export const springAt = (
  frame: number,
  fps: number,
  delay = 0,
  config: SpringCfg = SNAPPY,
  durationInFrames?: number,
) => spring({ frame: frame - delay, fps, config, durationInFrames });

/** Gerakan melayang sinus (dalam px / derajat) */
export const wave = (frame: number, periodFrames = 60, amplitude = 10, phase = 0) =>
  Math.sin((frame / periodFrames) * Math.PI * 2 + phase) * amplitude;

/** Pulsa singkat 0 → 1 → 0 di sekitar frame `at` (untuk efek tekan tombol / flash) */
export const bump = (frame: number, at: number, attack = 3, release = 10) =>
  interpolate(frame, [at, at + attack, at + attack + release], [0, 1, 0], CLAMP);

/** Format angka gaya Indonesia: 2750 → "2.750" */
export const formatID = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
