import React from 'react';
import { catmullRomSpline, clamp } from '../utils';

const cl = (v: number) => clamp(v, 0, 1);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Tongkonan (Tana Toraja) — saddle-shaped boat roof, carved panels,
 * buffalo horns stacked on the leaning simbar pole.
 * Local frames: 0‥22.
 */
export const Tongkonan: React.FC<{
	f: number;
	style?: React.CSSProperties;
}> = ({ f, style }) => {
	const roofP = easeOut(cl(f / 16));
	const bodyP = easeOut(cl((f - 14) / 8));
	const poleP = easeOut(cl((f - 18) / 8));
	const dash = (p: number) => ({
		pathLength: 1,
		strokeDasharray: 1,
		strokeDashoffset: 1 - p,
	});

	// Roof ridge spline + hatch ticks along its normal
	const ROOF = React.useMemo(
		() =>
			catmullRomSpline([
				[70, 120],
				[180, 206],
				[340, 252],
				[500, 206],
				[610, 120],
			]),
		[],
	);

	const hatches = React.useMemo(() => {
		const out: { x: number; y: number; nx: number; ny: number; t: number }[] = [];
		for (let i = 0; i < 16; i++) {
			const t = 0.06 + (i / 15) * 0.88;
			const [x, y] = ROOF.at(t);
			const [x2, y2] = ROOF.at(Math.min(1, t + 0.02));
			const dx = x2 - x;
			const dy = y2 - y;
			const len = Math.hypot(dx, dy) || 1;
			out.push({ x, y, nx: -dy / len, ny: dx / len, t });
		}
		return out;
	}, [ROOF]);

	const hornPairs = [0.78, 0.66, 0.55].map((fr) => {
		const x = 560 + (470 - 560) * fr;
		const y = 430 + (150 - 430) * fr;
		return { x, y };
	});

	return (
		<svg width={680} height={470} viewBox="0 0 680 470" fill="none" style={style}>
			{/* ground */}
			<path d="M 24 436 Q 340 420 656 436" stroke="#2F8F6B" strokeWidth={5} strokeLinecap="round" {...dash(cl(f / 8))} />

			{/* roof ridge */}
			<path
				d={ROOF.d}
				stroke="#E9B44C"
				strokeWidth={17}
				strokeLinecap="round"
				{...dash(roofP)}
			/>

			{/* ridge hatches (center out) */}
			{hatches.map((h, i) => {
				const p = cl((f - 10 - Math.abs(h.t - 0.5) * 20) / 4);
				if (p <= 0) return null;
				const ext = 21 * p;
				return (
					<line
						key={i}
						x1={h.x - h.nx * ext}
						y1={h.y - h.ny * ext}
						x2={h.x + h.nx * ext}
						y2={h.y + h.ny * ext}
						stroke="#E9B44C"
						strokeWidth={3.4}
						strokeLinecap="round"
						opacity={0.9 * p}
					/>
				);
			})}

			{/* body */}
			<g opacity={bodyP} transform={`translate(0 ${(1 - bodyP) * 36})`}>
				<rect
					x={190}
					y={286}
					width={300}
					height={88}
					rx={4}
					fill="rgba(11,14,23,0.55)"
					stroke="#F3E9D2"
					strokeWidth={5}
				/>
				{/* carved panels — diamond relief grid */}
				{Array.from({ length: 6 }, (_, i) => {
					const col = i % 3;
					const row = Math.floor(i / 3);
					const cx = 240 + col * 100;
					const cy = 312 + row * 44;
					const p = easeOut(cl((f - 15 - i * 1.2) / 5));
					if (p <= 0) return null;
					return (
						<g key={i} transform={`translate(${cx} ${cy}) scale(${0.7 + 0.3 * p})`} opacity={p}>
							<path
								d="M -24 0 L 0 -13 L 24 0 L 0 13 Z"
								stroke="#E9B44C"
								strokeWidth={2.6}
								fill="none"
							/>
						</g>
					);
				})}
			</g>

			{/* stilts */}
			{Array.from({ length: 5 }, (_, i) => {
				const x = 210 + i * 65;
				const p = easeOut(cl((f - 16 - i * 1.2) / 6));
				if (p <= 0) return null;
				return (
					<line
						key={i}
						x1={x}
						y1={374 + (1 - p) * -30}
						x2={x}
						y2={430 + (1 - p) * -30}
						stroke="#F3E9D2"
						strokeWidth={5}
						strokeLinecap="round"
						opacity={p}
					/>
				);
			})}

			{/* simbar pole (leaning bamboo bundle) */}
			<g opacity={poleP}>
				<line
					x1={560}
					y1={430 - (1 - poleP) * -40}
					x2={470}
					y2={150 - (1 - poleP) * -40}
					stroke="#F3E9D2"
					strokeWidth={10}
					strokeLinecap="round"
				/>
				{Array.from({ length: 5 }, (_, i) => {
					const fr = 0.28 + i * 0.14;
					const x = 560 + (470 - 560) * fr;
					const y = 430 + (150 - 430) * fr;
					const p = cl((f - 20 - i * 0.8) / 4);
					if (p <= 0) return null;
					return (
						<line
							key={i}
							x1={x - 16}
							y1={y}
							x2={x + 16}
							y2={y}
							stroke="#F3E9D2"
							strokeWidth={4}
							strokeLinecap="round"
							opacity={0.9 * p}
						/>
					);
				})}
				{/* buffalo horns */}
				{hornPairs.map((h, i) => {
					const p = easeOut(cl((f - 19.5 - i * 1.4) / 5));
					if (p <= 0) return null;
					return (
						<g key={i} transform={`translate(${h.x} ${h.y}) scale(${0.6 + 0.4 * p})`} opacity={p}>
							<path
								d="M -6 -2 C -26 -4 -34 -14 -28 -26"
								stroke="#F3E9D2"
								strokeWidth={4.4}
								strokeLinecap="round"
								fill="none"
							/>
							<path
								d="M 6 -2 C 26 -4 34 -14 28 -26"
								stroke="#F3E9D2"
								strokeWidth={4.4}
								strokeLinecap="round"
								fill="none"
							/>
						</g>
					);
				})}
			</g>
		</svg>
	);
};
