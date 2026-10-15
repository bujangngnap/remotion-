import React from 'react';
import { clamp, easeOutBack } from './ease';

const cl = (v: number) => clamp(v, 0, 1);

/**
 * Tenun & Ikat — the loom comes alive: warp threads drop, weft lines
 * sweep across, then ikat diamonds bloom in a wave from the center.
 * Local frames: 0‥18.
 */
export const Tenun: React.FC<{
	f: number;
	style?: React.CSSProperties;
}> = ({ f, style }) => {
	const warps = Array.from({ length: 16 }, (_, i) => 40 + i * 72);
	const wefts = Array.from({ length: 10 }, (_, j) => 26 + j * 58.7);
	const threadColors = ['#E9B44C', '#C25E33', '#F3E9D2'];

	const diamonds: { cx: number; cy: number }[] = [];
	for (let row = 0; row < 2; row++) {
		for (let i = 0; i < 7; i++) {
			diamonds.push({ cx: 148 + i * 144, cy: row === 0 ? 145 : 435 });
		}
	}

	return (
		<svg width={1160} height={580} viewBox="0 0 1160 580" fill="none" style={style}>
			{/* warp — vertical threads dropping in */}
			{warps.map((x, i) => {
				const p = cl((f - i * 0.55) / 7);
				if (p <= 0) return null;
				const e = 1 - Math.pow(1 - p, 3);
				return (
					<line
						key={`warp-${i}`}
						x1={x}
						y1={26}
						x2={x}
						y2={26 + 528 * e}
						stroke="#F3E9D2"
						strokeWidth={i % 2 === 0 ? 4 : 3}
						opacity={0.75}
						strokeLinecap="round"
					/>
				);
			})}

			{/* weft — horizontal threads sweeping with a shuttle dot */}
			{wefts.map((y, j) => {
				const p = cl((f - 3.5 - j * 1) / 6);
				if (p <= 0) return null;
				const e = 1 - Math.pow(1 - p, 3);
				const x2 = 40 + 1080 * e;
				const color = threadColors[j % 3];
				return (
					<g key={`weft-${j}`}>
						<line
							x1={40}
							y1={y}
							x2={x2}
							y2={y}
							stroke={color}
							strokeWidth={4.4}
							strokeLinecap="round"
							opacity={0.95}
						/>
						{e > 0.03 && e < 0.97 ? (
							<circle
								cx={x2}
								cy={y}
								r={6}
								fill="#FFF3C9"
								style={{ filter: 'drop-shadow(0 0 8px rgba(255,243,201,0.9))' }}
							/>
						) : null}
					</g>
				);
			})}

			{/* ikat diamonds blooming center-out */}
			{diamonds.map((d, i) => {
				const delay = 6 + (Math.abs(d.cx - 580) / 580) * 5 + (d.cy > 300 ? 1.2 : 0);
				const p = cl((f - delay) / 6);
				if (p <= 0) return null;
				const e = easeOutBack(p);
				const s = 0.6 + 0.4 * e;
				return (
					<g key={`dia-${i}`} transform={`translate(${d.cx} ${d.cy}) scale(${s})`} opacity={cl(p * 1.4)}>
						<path
							d="M -52 0 L 0 -38 L 52 0 L 0 38 Z"
							stroke="#E9B44C"
							strokeWidth={3.4}
							fill="none"
						/>
						<path
							d="M -20 0 L 0 -14 L 20 0 L 0 14 Z"
							stroke="#F3E9D2"
							strokeWidth={2.6}
							fill="none"
						/>
						<circle r={6} fill="#F7D98A" />
					</g>
				);
			})}
		</svg>
	);
};
