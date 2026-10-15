import React, { useRef, useEffect } from 'react';
import { useCurrentFrame } from 'remotion';
import { createRng } from './utils';

/**
 * Full-screen film grain + vignette overlay.
 * Uses Canvas2D for deterministic grain seeded by frame number.
 */
export const FilmGrain: React.FC = () => {
	const frame = useCurrentFrame();
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const cvs = canvasRef.current;
		if (!cvs) return;
		const ctx = cvs.getContext('2d');
		if (!ctx) return;

		const W = 480; // render at low res, stretch via CSS
		const H = 270;
		cvs.width = W;
		cvs.height = H;

		const rng = createRng(frame * 7919 + 31);
		const imageData = ctx.createImageData(W, H);
		const d = imageData.data;

		for (let i = 0; i < d.length; i += 4) {
			const v = Math.floor(rng() * 50);
			d[i] = v;
			d[i + 1] = v;
			d[i + 2] = v;
			d[i + 3] = 22; // subtle
		}

		ctx.putImageData(imageData, 0, 0);
	}, [frame]);

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				pointerEvents: 'none',
				zIndex: 9998,
			}}
		>
			{/* Grain layer */}
			<canvas
				ref={canvasRef}
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					mixBlendMode: 'overlay',
					opacity: 0.6,
					imageRendering: 'auto',
				}}
			/>

			{/* Vignette */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)',
				}}
			/>
		</div>
	);
};
