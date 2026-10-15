import React, { useMemo } from 'react';
import { INDONESIA_ASPECT, INDONESIA_PARTS } from '../geo/indonesia';
import {
	clamp,
	easeOutCubic,
	mixHex,
	roundedPolygonPath,
	sampleDots,
} from '../utils';

/** Batik dye colors — dots start in these hues, then settle into gold. */
const PATTERN_COLORS = ['#C85A32', '#129D6E', '#5C6FD4', '#E69526'] as const;

/** Key landmark markers (normalized map coordinates). */
const MARKERS: [number, number][] = [
	[0.14, 0.42], // Sumatra
	[0.33, 0.75], // Java
	[0.41, 0.39], // Kalimantan
	[0.56, 0.47], // Sulawesi
	[0.91, 0.6], // Papua
];

/**
 * The archipelago re-assembled from batik-colored dots: every dot flies
 * in from a chaotic orbit, lands in its geographic place and settles
 * into gold. Faint outlines and pulsing landmark markers complete the map.
 */
export const ArchipelagoDots: React.FC<{
	f: number;
	width?: number;
	x?: number;
	y?: number;
	convergeStart?: number;
	convergeDur?: number;
	wave?: number;
	outlineStart?: number;
	markerStart?: number;
	gold?: string;
}> = ({
	f,
	width = 1240,
	x = 340,
	y = 64,
	convergeStart = 4,
	convergeDur = 24,
	wave = 12,
	outlineStart = 44,
	markerStart = 54,
	gold = '#F7D98A',
}) => {
	const H = width / INDONESIA_ASPECT;

	const dots = useMemo(
		() => sampleDots(INDONESIA_PARTS, 0.0095, 0.42, 1234),
		[],
	);

	const outlines = useMemo(
		() =>
			INDONESIA_PARTS.map((p) =>
				roundedPolygonPath(
					p.map(([px, py]) => [px * width, py * H] as [number, number]),
				),
			),
		[width, H],
	);

	const outlineP = easeOutCubic(clamp((f - outlineStart) / 30, 0, 1));
	const markerP = clamp((f - markerStart) / 12, 0, 1);

	return (
		<div style={{ position: 'absolute', left: x, top: y, width, height: H }}>
			{/* soft golden halo behind the whole map */}
			<div
				style={{
					position: 'absolute',
					inset: -70,
					background:
						'radial-gradient(50% 55% at 50% 50%, rgba(233,180,76,0.16), transparent 72%)',
				}}
			/>
			<svg
				width={width}
				height={H}
				viewBox={`0 0 ${width} ${H}`}
				fill="none"
				style={{ position: 'relative' }}
			>
				{/* faint island outlines */}
				{outlineP > 0
					? outlines.map((d, i) => (
							<path
								key={`o-${i}`}
								d={d}
								stroke="#E9B44C"
								strokeWidth={1.3}
								pathLength={1}
								strokeDasharray={1}
								strokeDashoffset={1 - outlineP}
								opacity={0.17}
							/>
						))
					: null}

				{/* dots flying into place */}
				{dots.map((d, i) => {
					const cx = d.x * width;
					const cy = d.y * H;
					const delay = convergeStart + (d.x + d.y) * wave;
					const p = clamp((f - delay) / convergeDur, 0, 1);
					const e = easeOutCubic(p);

					const angle = d.s * Math.PI * 2;
					const rad = 420 + d.r * 720;
					const sx = width / 2 + Math.cos(angle) * rad;
					const sy = H / 2 + Math.sin(angle) * rad * 0.8;

					const px = sx + (cx - sx) * e;
					const py = sy + (cy - sy) * e;

					const landed = clamp((f - delay - convergeDur) / 22, 0, 1);
					const pattern = PATTERN_COLORS[Math.floor(d.s * 3.9999)];
					const color =
						landed > 0 ? mixHex(pattern, gold, landed) : pattern;

					const twinkle = 1 + 0.22 * Math.sin(f * 0.3 + i * 2.1) * landed;
					const r = (2.1 + d.r * 2.3) * (0.5 + 0.5 * e) * twinkle;

					return (
						<circle
							key={i}
							cx={px}
							cy={py}
							r={r}
							fill={color}
							opacity={0.28 + 0.72 * e}
						/>
					);
				})}

				{/* landmark markers */}
				{markerP > 0
					? MARKERS.map(([mx, my], i) => {
							const X = mx * width;
							const Y = my * H;
							const q = (f * 0.045 + i * 0.35) % 1;
							return (
								<g key={`m-${i}`} opacity={markerP}>
									<circle
										cx={X}
										cy={Y}
										r={8 + q * 30}
										stroke="#E9B44C"
										strokeWidth={2}
										opacity={(1 - q) * 0.7 * markerP}
										fill="none"
									/>
									<circle
										cx={X}
										cy={Y}
										r={9}
										stroke="rgba(233,180,76,0.4)"
										strokeWidth={1.4}
										fill="none"
									/>
									<circle cx={X} cy={Y} r={4.6} fill="#F7D98A" />
								</g>
							);
						})
					: null}
			</svg>
		</div>
	);
};
