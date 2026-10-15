import React, { useRef, useEffect } from 'react';
import { useCurrentFrame } from 'remotion';
import { createRng } from '../utils';

export const FilmGrainOverlay: React.FC = () => {
	const frame = useCurrentFrame();
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const cvs = canvasRef.current;
		if (!cvs) return;
		const ctx = cvs.getContext('2d');
		if (!ctx) return;

		const W = 320;
		const H = 180;
		cvs.width = W;
		cvs.height = H;

		const rng = createRng(frame * 6353 + 17);
		const imageData = ctx.createImageData(W, H);
		const d = imageData.data;

		for (let i = 0; i < d.length; i += 4) {
			const v = Math.floor(rng() * 45);
			d[i] = v;
			d[i + 1] = v;
			d[i + 2] = v;
			d[i + 3] = 20; // soft organic grain
		}

		ctx.putImageData(imageData, 0, 0);
	}, [frame]);

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				pointerEvents: 'none',
				zIndex: 9980,
			}}
		>
			{/* Film grain canvas */}
			<canvas
				ref={canvasRef}
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					mixBlendMode: 'overlay',
					opacity: 0.55,
				}}
			/>

			{/* Soft cinematic vignette */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(circle at center, rgba(0,0,0,0) 50%, rgba(5,7,11,0.55) 90%, rgba(2,3,6,0.85) 100%)',
					pointerEvents: 'none',
				}}
			/>
		</div>
	);
};
