import React from 'react';
import { clamp } from '../utils';

const cl = (v: number) => clamp(v, 0, 1);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Rumah Gadang (West Sumatra) — long stilted house with buffalo-horn
 * roof (gonjong). Every element is drawn / dropped in sequence.
 * Local frames: 0‥22.
 */
export const RumahGadang: React.FC<{
	f: number;
	style?: React.CSSProperties;
}> = ({ f, style }) => {
	// ground line
	const groundP = cl(f / 10);
	// stilts
	// body
	const bodyP = easeOut(cl((f - 6) / 10));
	// roof
	const roofP = easeOut(cl((f - 8) / 14));
	// main horns
	const hornP = (i: number) => easeOut(cl((f - 14 - i * 2) / 8));
	const palmP = cl((f - 16) / 8);

	const stilts = Array.from({ length: 8 }, (_, i) => 96 + i * 56);

	const dash = (p: number) => ({
		pathLength: 1,
		strokeDasharray: 1,
		strokeDashoffset: 1 - p,
	});

	return (
		<svg width={620} height={420} viewBox="0 0 620 420" fill="none" style={style}>
			{/* emerald ground */}
			<path
				d="M 16 392 Q 310 366 604 392"
				stroke="#2F8F6B"
				strokeWidth={6}
				strokeLinecap="round"
				{...dash(groundP)}
			/>

			{/* palm tree */}
			<g opacity={palmP}>
				<path d="M 34 376 C 40 330 36 292 30 262" stroke="#F3E9D2" strokeWidth={5} strokeLinecap="round" {...dash(palmP)} />
				<path d="M 30 262 C 16 234 18 208 34 188" stroke="#F3E9D2" strokeWidth={4} strokeLinecap="round" opacity={0.9} {...dash(cl((f - 18) / 8))} />
				<path d="M 30 262 C 40 232 64 214 92 212" stroke="#F3E9D2" strokeWidth={4} strokeLinecap="round" opacity={0.9} {...dash(cl((f - 19) / 8))} />
				<path d="M 30 262 C 46 246 76 242 100 252" stroke="#F3E9D2" strokeWidth={4} strokeLinecap="round" opacity={0.9} {...dash(cl((f - 20) / 8))} />
			</g>

			{/* stilts */}
			{stilts.map((x, i) => {
				const p = easeOut(cl((f - 3 - i * 1.2) / 8));
				if (p <= 0) return null;
				return (
					<line
						key={i}
						x1={x}
						y1={300 + (1 - p) * -34}
						x2={x}
						y2={372 + (1 - p) * -34}
						stroke="#F3E9D2"
						strokeWidth={5}
						strokeLinecap="round"
						opacity={p}
					/>
				);
			})}

			{/* house body */}
			<g
				opacity={bodyP}
				transform={`translate(0 ${(1 - bodyP) * 44})`}
			>
				<rect
					x={84}
					y={226}
					width={452}
					height={74}
					rx={6}
					fill="rgba(126,54,24,0.78)"
					stroke="#F3E9D2"
					strokeWidth={5}
				/>
				{/* windows + door */}
				{Array.from({ length: 6 }, (_, i) => {
					const p = easeOut(cl((f - 12 - i * 1) / 5));
					if (p <= 0) return null;
					return (
						<rect
							key={i}
							x={116 + i * 68}
							y={240}
							width={40}
							height={46}
							rx={3}
							fill={`rgba(233,180,76,${0.85 * p})`}
							transform={`translate(0 ${(1 - p) * 10})`}
						/>
					);
				})}
				<rect
					x={286}
					y={252}
					width={48}
					height={48}
					rx={4}
					stroke="#E9B44C"
					strokeWidth={4}
					opacity={cl((f - 18) / 5)}
				/>
			</g>

			{/* roof — crescent between eave and ridge, drawn stroke-first */}
			<path
				d="M 28 226 C 130 200 240 190 310 190 C 380 190 490 200 592 226 C 500 112 370 84 310 84 C 250 84 120 112 28 226 Z"
				fill="rgba(126,54,24,0.82)"
				fillOpacity={cl((roofP - 0.45) / 0.55) * 0.95}
				stroke="#F3E9D2"
				strokeWidth={5}
				strokeLinecap="round"
				{...dash(roofP)}
			/>

			{/* gonjong — main buffalo-horn spires */}
			{[
				{ x: 83, y: 196, d: 'M 66 196 C 46 156 40 116 50 74 C 80 106 92 148 100 186' },
				{ x: 537, y: 196, d: 'M 554 196 C 574 156 580 116 570 74 C 540 106 528 148 520 186' },
			].map((h, i) => {
				const p = hornP(i);
				if (p <= 0) return null;
				return (
					<g
						key={i}
						transform={`translate(${h.x} ${h.y}) scale(1 ${p}) translate(${-h.x} ${-h.y})`}
					>
						<path d={h.d} stroke="#E9B44C" strokeWidth={7} strokeLinecap="round" fill="none" />
					</g>
				);
			})}
			{/* small inner horns */}
			{[
				{ x: 156, y: 194, d: 'M 148 194 C 138 166 134 140 140 112 C 156 134 164 162 172 186' },
				{ x: 464, y: 194, d: 'M 472 194 C 482 166 486 140 480 112 C 464 134 456 162 448 186' },
			].map((h, i) => {
				const p = hornP(i + 2);
				if (p <= 0) return null;
				return (
					<g
						key={i}
						transform={`translate(${h.x} ${h.y}) scale(1 ${p}) translate(${-h.x} ${-h.y})`}
					>
						<path d={h.d} stroke="#E9B44C" strokeWidth={5} strokeLinecap="round" fill="none" opacity={0.9} />
					</g>
				);
			})}
		</svg>
	);
};
