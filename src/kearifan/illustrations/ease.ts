// Re-export easing helpers used by illustrations (kept tiny for clarity).
export { clamp } from '../utils';

/** Overshooting ease for popping elements. */
export const easeOutBack = (t: number, s = 1.70158) => {
	const c3 = s + 1;
	return 1 + c3 * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
};
