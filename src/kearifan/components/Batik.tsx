import React from 'react';
import { ellipsePath } from '../utils';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * A single kawung tile — four ovals rotating around a center, drawn
 * progressively to imitate a canting (batik pen) tracing the pattern.
 */
const KawungTile: React.FC<{
	f: number;
	cx: number;
	cy: number;
	start: number;
	stagger: number;
	drawDur: number;
	color: string;
	strokeWidth: number;
}> = ({ f, cx, cy, start, stagger, drawDur, color, strokeWidth }) => {
	const shapes = [
		ellipsePath(0, -24, 12, 21),
		ellipsePath(0, 24, 12, 21),
		ellipsePath(-24, 0, 21, 12),
		ellipsePath(24, 0, 21, 12),
	];
	const dotP = clamp01((f - start - 7) / 9);
	return (
		<g transform={`translate(${cx} ${cy})`}>
			{shapes.map((d, s) => {
				const p = clamp01((f - start - s * stagger) / drawDur);
				if (p <= 0) return null;
				const e = 1 - Math.pow(1 - p, 2);
				return (
					<path
						key={s}
						d={d}
						stroke={color}
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						fill="none"
						pathLength={1}
						strokeDasharray={1}
						strokeDashoffset={1 - e}
						opacity={0.92}
					/>
				);
			})}
			{dotP > 0 ? <circle r={5} cx={0} cy={0} fill={color} opacity={dotP * 0.95} /> : null}
		</g>
	);
};

/**
 * A wall of kawung tiles that draw themselves in a diagonal wave.
 * Position it with the `style` prop (absolute coordinates).
 */
export const BatikGrid: React.FC<{
	f: number;
	start?: number;
	cols: number;
	rows: number;
	cell?: number;
	wave?: number;
	color?: string;
	colorAlt?: string;
	strokeWidth?: number;
	drawDur?: number;
	opacity?: number;
	style?: React.CSSProperties;
}> = ({
	f,
	start = 0,
	cols,
	rows,
	cell = 120,
	wave = 2.2,
	color = '#E9B44C',
	colorAlt = '#F7D98A',
	strokeWidth = 2.5,
	drawDur = 10,
	opacity = 1,
	style,
}) => {
	const w = cols * cell;
	const h = rows * cell;
	const tiles: React.ReactNode[] = [];
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			tiles.push(
				<KawungTile
					key={`${r}-${c}`}
					f={f}
					cx={c * cell + cell / 2}
					cy={r * cell + cell / 2}
					start={start + (c + r) * wave}
					stagger={1.4}
					drawDur={drawDur}
					color={(c + r) % 2 === 0 ? color : colorAlt}
					strokeWidth={strokeWidth}
				/>,
			);
		}
	}
	return (
		<div style={{ width: w, height: h, opacity, ...style }}>
			<svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
				{tiles}
			</svg>
		</div>
	);
};

/** Ceplok-style eight-point star (two overlaid squares). */
export const CeplokStar: React.FC<{
	size: number;
	color: string;
	strokeWidth?: number;
	opacity?: number;
	rotation?: number;
	style?: React.CSSProperties;
}> = ({ size, color, strokeWidth = 2, opacity = 1, rotation = 0, style }) => {
	const s = size;
	const inset = size * 0.18;
	return (
		<svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} fill="none" style={style}>
			<g opacity={opacity}>
				<rect
					x={inset}
					y={inset}
					width={s - inset * 2}
					height={s - inset * 2}
					stroke={color}
					strokeWidth={strokeWidth}
					transform={`rotate(${rotation} ${s / 2} ${s / 2})`}
				/>
				<rect
					x={inset}
					y={inset}
					width={s - inset * 2}
					height={s - inset * 2}
					stroke={color}
					strokeWidth={strokeWidth}
					transform={`rotate(${rotation + 45} ${s / 2} ${s / 2})`}
				/>
			</g>
		</svg>
	);
};
