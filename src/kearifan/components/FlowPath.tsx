import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { catmullRomSpline, Pt, smoothstep } from '../utils';

/**
 * A flowing golden/emerald water line: the path draws itself,
 * then droplets travel along it forever. Used over the Subak
 * terraces and along the archipelago flight route.
 */
export const FlowPath: React.FC<{
	points: Pt[];
	width?: number;
	color?: string;
	glowColor?: string;
	start?: number;
	drawDur?: number;
	droplets?: number;
	flowSpeed?: number;
	dropletColor?: string;
	dropletR?: number;
	opacity?: number;
}> = ({
	points,
	width = 5,
	color = '#3FBF8F',
	glowColor,
	start = 0,
	drawDur = 18,
	droplets = 5,
	flowSpeed = 0.012,
	dropletColor = '#F7D98A',
	dropletR = 4,
	opacity = 0.9,
}) => {
	const f = useCurrentFrame();
	const spline = useMemo(() => catmullRomSpline(points), [points]);
	const p = Math.max(0, Math.min(1, (f - start) / drawDur));
	const e = 1 - Math.pow(1 - p, 3);

	return (
		<svg
			style={{
				position: 'absolute',
				inset: 0,
				width: '100%',
				height: '100%',
				overflow: 'visible',
			}}
			viewBox="0 0 1920 1080"
			fill="none"
		>
			{/* soft glow under the line */}
			<path
				d={spline.d}
				stroke={glowColor ?? color}
				strokeWidth={width * 2.6}
				strokeLinecap="round"
				pathLength={1}
				strokeDasharray={1}
				strokeDashoffset={1 - e}
				opacity={0.4}
				style={{ filter: 'blur(7px)' }}
			/>
			{/* crisp core line */}
			<path
				d={spline.d}
				stroke={color}
				strokeWidth={width}
				strokeLinecap="round"
				pathLength={1}
				strokeDasharray={1}
				strokeDashoffset={1 - e}
				opacity={opacity}
			/>
			{/* travelling droplets */}
			{Array.from({ length: droplets }, (_, i) => {
				const t = (((f - start) * flowSpeed + i / droplets) % 1 + 1) % 1;
				if (p < 0.999 && t > p) return null;
				const [x, y] = spline.at(t);
				const edgeFade = smoothstep(0, 0.06, t) * (1 - smoothstep(0.94, 1, t));
				const appear = t <= e ? 1 : 0;
				if (appear === 0) return null;
				return (
					<circle
						key={i}
						cx={x}
						cy={y}
						r={dropletR}
						fill={dropletColor}
						opacity={opacity * edgeFade}
						style={{ filter: 'drop-shadow(0 0 6px rgba(247,217,138,0.8))' }}
					/>
				);
			})}
		</svg>
	);
};
