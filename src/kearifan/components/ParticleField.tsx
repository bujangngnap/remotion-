import React, { useRef, useEffect, useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { WIDTH, HEIGHT } from '../constants';
import { createRng } from '../utils';

interface ParticleFieldProps {
	count?: number;
	colorMode?: 'gold' | 'emerald' | 'amber';
	intensity?: number;
	speedMultiplier?: number;
	direction?: 'up' | 'vortex' | 'explode';
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
	count = 80,
	colorMode = 'gold',
	intensity = 0.8,
	speedMultiplier = 1,
	direction = 'up',
}) => {
	const frame = useCurrentFrame();
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Pre-generate deterministic particle initial conditions
	const particles = useMemo(() => {
		const rng = createRng(777);
		return Array.from({ length: count }, () => {
			return {
				x0: rng() * WIDTH,
				y0: rng() * HEIGHT,
				size: 1.5 + rng() * 3.5,
				baseAlpha: 0.2 + rng() * 0.7,
				speedY: (0.4 + rng() * 1.2) * speedMultiplier,
				speedX: (rng() - 0.5) * 0.5,
				swayFreq: 0.02 + rng() * 0.03,
				swayAmp: 10 + rng() * 30,
				phase: rng() * Math.PI * 2,
				isSpecial: rng() > 0.8,
			};
		});
	}, [count, speedMultiplier]);

	useEffect(() => {
		const cvs = canvasRef.current;
		if (!cvs) return;
		const ctx = cvs.getContext('2d');
		if (!ctx) return;

		// Internal resolution: 960x540 for extreme speed, CSS handles full 1920x1080 stretch
		cvs.width = 960;
		cvs.height = 540;
		const scaleX = 960 / WIDTH;
		const scaleY = 540 / HEIGHT;

		ctx.clearRect(0, 0, 960, 540);

		particles.forEach((p) => {
			let currentX = p.x0;
			let currentY = p.y0;

			if (direction === 'up') {
				const totalTravelY = frame * p.speedY;
				currentY = (p.y0 - totalTravelY) % HEIGHT;
				if (currentY < 0) currentY += HEIGHT;
				currentX = p.x0 + Math.sin(frame * p.swayFreq + p.phase) * p.swayAmp;
			} else if (direction === 'vortex') {
				const angle = (frame * 0.015) + p.phase;
				const dist = 100 + (p.x0 % 400) + Math.sin(frame * 0.02) * 40;
				currentX = WIDTH / 2 + Math.cos(angle) * dist;
				currentY = HEIGHT / 2 + Math.sin(angle) * dist * 0.6;
			}

			const sx = currentX * scaleX;
			const sy = currentY * scaleY;
			const sSize = p.size * scaleX * (p.isSpecial ? 1.6 : 1.0);

			// Pulsing alpha
			const pulse = Math.sin(frame * 0.08 + p.phase) * 0.25 + 0.75;
			const alpha = p.baseAlpha * pulse * intensity;

			ctx.save();
			ctx.beginPath();
			ctx.arc(sx, sy, sSize, 0, Math.PI * 2);

			let glowColor = '255, 200, 55'; // gold
			if (colorMode === 'emerald') glowColor = '39, 217, 164';
			if (colorMode === 'amber') glowColor = '255, 140, 0';

			ctx.fillStyle = `rgba(${glowColor}, ${alpha})`;
			if (p.isSpecial) {
				ctx.shadowColor = `rgba(${glowColor}, 0.9)`;
				ctx.shadowBlur = 8;
			}
			ctx.fill();
			ctx.restore();
		});
	}, [frame, particles, colorMode, intensity, direction]);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: 'absolute',
				inset: 0,
				width: '100%',
				height: '100%',
				pointerEvents: 'none',
				mixBlendMode: 'screen',
				zIndex: 8,
			}}
		/>
	);
};
