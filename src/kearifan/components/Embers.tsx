import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { createRng } from '../utils';

/**
 * Floating golden ember / dust particles rising slowly upward.
 * Fully deterministic — positions derive from the current frame.
 */
export const Embers: React.FC<{
	count?: number;
	seed?: number;
	color?: string;
	colorAlt?: string;
	minSize?: number;
	maxSize?: number;
	speed?: number;
	glow?: boolean;
}> = ({
	count = 36,
	seed = 7,
	color = '#E9B44C',
	colorAlt = '#F7D98A',
	minSize = 2,
	maxSize = 6,
	speed = 1,
	glow = true,
}) => {
	const f = useCurrentFrame();
	const items = useMemo(() => {
		const rng = createRng(seed);
		return Array.from({ length: count }, () => ({
			x: rng() * 1920,
			size: minSize + rng() * (maxSize - minSize),
			spd: (0.35 + rng() * 1.05) * speed,
			phase: rng() * 1240,
			wob: 8 + rng() * 26,
			tw: 0.02 + rng() * 0.05,
			alt: rng() > 0.55,
		}));
	}, [count, seed, minSize, maxSize, speed]);

	return (
		<AbsoluteFill style={{ pointerEvents: 'none' }}>
			{items.map((it, i) => {
				const y = 1180 - ((f * it.spd + it.phase) % 1240);
				const x = it.x + Math.sin(f * 0.015 + i * 1.7) * it.wob;
				const twinkle = 0.5 + 0.5 * Math.sin(f * it.tw * Math.PI * 2 + i);
				const opacity = 0.12 + 0.6 * twinkle;
				const scale = 1 + 0.25 * Math.sin(f * 0.06 + i * 2.1);
				const c = it.alt ? colorAlt : color;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: x,
							top: y,
							width: it.size,
							height: it.size,
							borderRadius: '50%',
							background: c,
							opacity,
							transform: `scale(${scale})`,
							boxShadow: glow ? `0 0 ${it.size * 3.2}px ${c}` : undefined,
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};
