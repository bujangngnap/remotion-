// ── Timing helpers for BatikEtiquette ──────────────────────────────────
import { interpolate, spring } from 'remotion';
import { FPS } from '../config';

/**
 * Clamp a value between min and max.
 */
export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/**
 * Shorthand for spring() with our FPS baked in.
 */
export function spr(
  frame: number,
  opts: {
    from?: number;
    to?: number;
    damping?: number;
    stiffness?: number;
    mass?: number;
    delay?: number;
  } = {},
): number {
  return spring({
    fps: FPS,
    frame,
    config: {
      damping: opts.damping ?? 14,
      stiffness: opts.stiffness ?? 120,
      mass: opts.mass ?? 1,
    },
    from: opts.from ?? 0,
    to: opts.to ?? 1,
    delay: opts.delay ?? 0,
  });
}

/**
 * Map a frame within [startFrame, endFrame] to [outputStart, outputEnd].
 * Clamped by default.
 */
export function mapRange(
  frame: number,
  startFrame: number,
  endFrame: number,
  outputStart: number,
  outputEnd: number,
): number {
  return interpolate(frame, [startFrame, endFrame], [outputStart, outputEnd], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

/**
 * Ease-out cubic helper for interpolate options.
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
