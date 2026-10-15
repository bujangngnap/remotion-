import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { C } from '../constants';
import { FONT_HEAVY, FONT_MONO } from '../fonts';
import { createRng, easeOutCubic, progress as prog } from '../utils';

const NUM_BALLS = 8;

/**
 * [8.0–10.0s] 04 / DEPTH
 * Dark navy bg, huge "DEPTH" text, floating metaballs with SVG goo filter,
 * merge into blob that sweeps diagonally.
 */
export const Depth: React.FC = () => {
	const f = useCurrentFrame(); // 0‥119
	const { fps } = useVideoConfig();

	// ── Generate ball positions (deterministic) ──
	const balls = useMemo(() => {
		const rng = createRng(777);
		return Array.from({ length: NUM_BALLS }, (_, i) => ({
			startX: rng() * 1600 + 160,
			startY: rng() * 800 + 140,
			size: rng() * 80 + 40,
			speed: rng() * 0.8 + 0.4,
			phase: rng() * Math.PI * 2,
			hue: rng() * 60 + 240, // purple-blue range
		}));
	}, []);

	// ── Text entrance ──
	const textScale = spring({
		frame: f,
		fps,
		config: { damping: 18, stiffness: 120, mass: 0.8 },
		durationInFrames: 25,
	});

	// ── Sweep transition (end) ──
	const sweepT = prog(f, 90, 120);
	const sweepEased = easeOutCubic(sweepT);

	// ── Ball animation ──
	const mergeT = prog(f, 80, 105);

	return (
		<AbsoluteFill style={{ backgroundColor: '#0d0d2a' }}>
			{/* SVG filter for metaball goo effect */}
			<svg style={{ position: 'absolute', width: 0, height: 0 }}>
				<defs>
					<filter id="goo">
						<feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
						<feColorMatrix
							in="blur"
							type="matrix"
							values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
							result="goo"
						/>
						<feBlend in="SourceGraphic" in2="goo" />
					</filter>
				</defs>
			</svg>

			{/* ── "DEPTH" text ── */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(-50%, -50%) scale(${textScale})`,
					fontFamily: FONT_HEAVY,
					fontSize: 280,
					fontWeight: 900,
					color: C.offWhite,
					opacity: interpolate(f, [0, 15, 90, 110], [0, 0.15, 0.15, 0], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					}),
					lineHeight: 1,
					letterSpacing: '-0.02em',
					zIndex: 1,
				}}
			>
				DEPTH
			</div>

			{/* ── Metaballs container ── */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					filter: 'url(#goo)',
					zIndex: 2,
				}}
			>
				{balls.map((ball, i) => {
					const t = f * ball.speed * 0.04;
					const floatX = Math.sin(t + ball.phase) * 120;
					const floatY = Math.cos(t * 0.7 + ball.phase) * 80;
					const floatZ = Math.sin(t * 0.5 + ball.phase * 2) * 0.3 + 1;

					// Merge to center for sweep
					const mergeEased = easeOutCubic(mergeT);
					const targetX = 960 + sweepEased * 1200;
					const targetY = 540 - sweepEased * 600;

					const x = ball.startX + floatX * (1 - mergeEased) + (targetX - ball.startX) * mergeEased;
					const y = ball.startY + floatY * (1 - mergeEased) + (targetY - ball.startY) * mergeEased;
					const size = ball.size * floatZ * (1 + mergeEased * 1.5);

					// Iridescent colors
					const hueShift = Math.sin(t + i) * 30;
					const hue = ball.hue + hueShift;

					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: x - size,
								top: y - size,
								width: size * 2,
								height: size * 2,
								borderRadius: '50%',
								background: `radial-gradient(circle at 35% 35%,
									hsl(${hue + 40}, 80%, 75%),
									hsl(${hue}, 70%, 50%),
									hsl(${hue - 30}, 60%, 30%))`,
								boxShadow: `
									inset -${size * 0.15}px -${size * 0.15}px ${size * 0.4}px rgba(0,0,0,0.3),
									inset ${size * 0.1}px ${size * 0.1}px ${size * 0.3}px rgba(255,255,255,0.15),
									0 0 ${size * 0.5}px rgba(${Math.floor(Math.sin(hue * 0.017) * 50 + 100)}, 80, 200, 0.3)
								`,
							}}
						/>
					);
				})}
			</div>

			{/* ── Diagonal sweep blob (end) ── */}
			{sweepEased > 0.01 && (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						width: 400 + sweepEased * 800,
						height: 300 + sweepEased * 500,
						borderRadius: '50%',
						background: `radial-gradient(circle at 40% 40%,
							hsl(280, 70%, 65%),
							hsl(260, 60%, 40%),
							hsl(240, 50%, 25%))`,
						transform: `translate(${-200 + sweepEased * 1400}px, ${sweepEased * -800}px)`,
						filter: 'blur(20px)',
						opacity: sweepEased * 0.9,
						zIndex: 3,
					}}
				/>
			)}

			{/* ── Caption ── */}
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
					opacity: 0.35,
					textTransform: 'uppercase',
					zIndex: 10,
				}}
			>
				SDF METABALLS / GOOEY FILTER / IRIDESCENT SHADING
			</div>
		</AbsoluteFill>
	);
};
