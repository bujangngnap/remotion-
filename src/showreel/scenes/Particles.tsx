import React, { useRef, useEffect, useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, BRAND_NAME } from '../constants';
import { FONT_MONO } from '../fonts';
import { createRng, fibonacciSphere, progress as prog, easeOutCubic, lerp } from '../utils';

const NUM_PARTICLES = 3200;
const W = 1920;
const H = 1080;

/**
 * [6.0–8.0s] 03 / PARTICLES
 * Fibonacci sphere rotating in 3D → dissolves → converges to spell BRAND_NAME.
 */
export const Particles: React.FC = () => {
	const f = useCurrentFrame(); // 0‥119
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Pre-compute sphere points and text target positions (stable across frames)
	const { spherePoints, textTargets } = useMemo(() => {
		const pts = fibonacciSphere(NUM_PARTICLES);

		// Generate text target positions by deterministic grid sampling
		const targets: [number, number][] = [];
		const rng = createRng(999);
		// Create a virtual canvas to measure text
		// Since we can't access DOM here, use a mathematical approximation
		const text = BRAND_NAME;
		const charW = 160;
		const totalW = text.length * charW;
		const startX = (W - totalW) / 2;
		const centerY = H / 2;

		for (let i = 0; i < NUM_PARTICLES; i++) {
			const charIdx = Math.floor(rng() * text.length);
			const cx = startX + charIdx * charW + charW / 2;
			const cy = centerY;
			// Scatter within letter bounds
			const offsetX = (rng() - 0.5) * charW * 0.8;
			const offsetY = (rng() - 0.5) * 180;
			// Simple letter mask: reject points outside rough letter shape
			const dist = Math.sqrt((offsetX / (charW * 0.4)) ** 2 + (offsetY / 90) ** 2);
			if (dist < 1) {
				targets.push([cx + offsetX, cy + offsetY]);
			} else {
				targets.push([cx + offsetX * 0.3, cy + offsetY * 0.3]);
			}
		}

		return { spherePoints: pts, textTargets: targets };
	}, []);

	useEffect(() => {
		const cvs = canvasRef.current;
		if (!cvs) return;
		const ctx = cvs.getContext('2d');
		if (!ctx) return;
		cvs.width = W;
		cvs.height = H;

		// Clear
		ctx.fillStyle = 'transparent';
		ctx.clearRect(0, 0, W, H);

		const rng = createRng(42);

		// ── Animation phases ──
		const rotationAngle = f * 0.025; // continuous rotation
		const dissolveT = prog(f, 50, 80);   // sphere dissolves
		const convergeT = prog(f, 70, 110);  // converges to text
		const wireframeT = prog(f, 25, 45);  // wireframe phase
		const wireframeFade = wireframeT > 0 ? (wireframeT < 0.5 ? wireframeT * 2 : 2 - wireframeT * 2) : 0;

		// Noise for dissolve
		const curlNoise = (x: number, y: number, seed: number) => {
			const r = createRng(seed);
			return [(r() - 0.5) * 400, (r() - 0.5) * 400] as const;
		};

		const sphereRadius = 280;
		const cosA = Math.cos(rotationAngle);
		const sinA = Math.sin(rotationAngle);
		const cosB = Math.cos(rotationAngle * 0.7);
		const sinB = Math.sin(rotationAngle * 0.7);

		// Draw wireframe connections during wireframe phase
		if (wireframeFade > 0.1) {
			ctx.strokeStyle = `rgba(255,255,255,${wireframeFade * 0.06})`;
			ctx.lineWidth = 0.5;
			for (let i = 0; i < NUM_PARTICLES; i += 8) {
				const [sx, sy, sz] = spherePoints[i];
				// Rotate Y then X
				const x1 = sx * cosA - sz * sinA;
				const z1 = sx * sinA + sz * cosA;
				const y1 = sy * cosB - z1 * sinB;
				const z2 = sy * sinB + z1 * cosB;

				const scale = 1 / (1 + z2 * 0.3);
				const px = W / 2 + x1 * sphereRadius * scale;
				const py = H / 2 + y1 * sphereRadius * scale;

				// Connect to next neighbor
				const ni = (i + 8) % NUM_PARTICLES;
				const [nx, ny, nz] = spherePoints[ni];
				const nx1 = nx * cosA - nz * sinA;
				const nz1 = nx * sinA + nz * cosA;
				const ny1 = ny * cosB - nz1 * sinB;
				const nz2 = ny * sinB + nz1 * cosB;
				const ns = 1 / (1 + nz2 * 0.3);
				const npx = W / 2 + nx1 * sphereRadius * ns;
				const npy = H / 2 + ny1 * sphereRadius * ns;

				ctx.beginPath();
				ctx.moveTo(px, py);
				ctx.lineTo(npx, npy);
				ctx.stroke();
			}
		}

		// Draw particles
		for (let i = 0; i < NUM_PARTICLES; i++) {
			const [sx, sy, sz] = spherePoints[i];
			const brightness = rng();

			// Rotate sphere point
			const rx = sx * cosA - sz * sinA;
			const rz = sx * sinA + sz * cosA;
			const ry = sy * cosB - rz * sinB;
			const rz2 = sy * sinB + rz * cosB;

			const depthScale = 1 / (1 + rz2 * 0.3);
			const sphereX = W / 2 + rx * sphereRadius * depthScale;
			const sphereY = H / 2 + ry * sphereRadius * depthScale;

			// Dissolve offset
			const [noiseX, noiseY] = curlNoise(sx, sy, i * 37 + f);
			const dissolvedX = sphereX + noiseX * dissolveT;
			const dissolvedY = sphereY + noiseY * dissolveT;

			// Text target
			const [targetX, targetY] = textTargets[i];

			// Final position: blend from dissolved-sphere to text
			const convergeEased = easeOutCubic(convergeT);
			const finalX = lerp(dissolvedX, targetX, convergeEased);
			const finalY = lerp(dissolvedY, targetY, convergeEased);

			// Size & alpha
			const size = lerp(2.5 * depthScale, 2, convergeEased);
			const alpha = lerp(
				(0.3 + brightness * 0.7) * depthScale,
				0.6 + brightness * 0.4,
				convergeEased,
			);

			// Twinkle
			const twinkle = 0.7 + 0.3 * Math.sin(f * 0.15 + i * 0.7);

			// Color: mostly white/pale blue on sphere, transition to white for text
			const blue = lerp(0.95 + brightness * 0.05, 1, convergeEased);

			ctx.beginPath();
			ctx.arc(finalX, finalY, Math.max(0.5, size), 0, Math.PI * 2);
			ctx.fillStyle = `rgba(${Math.floor(240 * blue)},${Math.floor(245 * blue)},255,${alpha * twinkle})`;
			ctx.fill();
		}
	}, [f, spherePoints, textTargets]);

	// ── HUD caption ──
	const rpm = (0.18 + Math.sin(f * 0.05) * 0.02).toFixed(2);

	return (
		<AbsoluteFill
			style={{
				background: `radial-gradient(ellipse at center, ${C.deepIndigo}, ${C.deepIndigoDark})`,
			}}
		>
			<canvas
				ref={canvasRef}
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
				}}
			/>

			{/* Bottom caption */}
			<div
				style={{
					position: 'absolute',
					bottom: 60,
					left: '50%',
					transform: 'translateX(-50%)',
					fontFamily: FONT_MONO,
					fontSize: 10,
					letterSpacing: '0.14em',
					color: C.offWhite,
					opacity: 0.4,
					textTransform: 'uppercase',
				}}
			>
				{NUM_PARTICLES.toLocaleString()} PARTICLES / RPM {rpm}
			</div>
		</AbsoluteFill>
	);
};
