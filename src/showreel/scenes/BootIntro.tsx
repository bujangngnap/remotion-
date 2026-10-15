import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { C } from '../constants';
import { FONT_MONO } from '../fonts';
import { easeOutExpo } from '../utils';

/**
 * [0.0–0.8s] BOOT / INTRO
 * Pulsing ring → glitch label → orange ruler line → full-screen orange wipe.
 */
export const BootIntro: React.FC = () => {
	const f = useCurrentFrame(); // 0‥47

	// ── Ring ──
	const ringOp = interpolate(f, [0, 12], [0, 0.3], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
	const ringRadius = interpolate(f, [0, 35], [50, 90], { extrapolateRight: 'clamp' });
	const pulse = 1 + Math.sin(f * 0.5) * 0.06;
	const ringExpand = interpolate(f, [25, 40], [1, 2.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
	const ringFade = interpolate(f, [30, 40], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

	// ── Glitch label ──
	const glitchOp = interpolate(f, [8, 11, 24, 26], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const glitchX = f % 3 === 0 ? (f % 7) - 3 : 0;

	// ── Orange line ──
	const lineT = easeOutExpo(
		Math.max(0, Math.min(1, interpolate(f, [14, 30], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}))),
	);

	// ── Wipe rectangle ──
	const wipeT = easeOutExpo(
		Math.max(0, Math.min(1, interpolate(f, [34, 48], [0, 1], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}))),
	);

	return (
		<AbsoluteFill style={{ backgroundColor: C.inkBlack }}>
			{/* Pulsing ring */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					width: ringRadius * 2,
					height: ringRadius * 2,
					borderRadius: '50%',
					border: `1px solid rgba(255,255,255,${ringOp * ringFade})`,
					transform: `translate(-50%, -50%) scale(${pulse * ringExpand})`,
				}}
			/>

			{/* Center dot */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					width: 4,
					height: 4,
					borderRadius: '50%',
					background: '#fff',
					opacity: ringOp * ringFade,
					transform: 'translate(-50%, -50%)',
				}}
			/>

			{/* Glitch mono label */}
			<div
				style={{
					position: 'absolute',
					top: 'calc(50% + 40px)',
					left: '50%',
					transform: `translate(calc(-50% + ${glitchX}px), 0)`,
					fontFamily: FONT_MONO,
					fontSize: 11,
					color: C.offWhite,
					opacity: glitchOp,
					letterSpacing: '0.2em',
				}}
			>
				C&lt;2F&gt;
			</div>

			{/* Orange horizontal line + tick ruler */}
			{lineT > 0 && (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: `${50 - lineT * 44}%`,
						width: `${lineT * 88}%`,
						transform: 'translateY(-1px)',
					}}
				>
					{/* Ticks above */}
					<div style={{ position: 'relative', height: 10 }}>
						{Array.from({ length: 30 }, (_, i) => (
							<div
								key={i}
								style={{
									position: 'absolute',
									left: `${(i / 29) * 100}%`,
									bottom: 0,
									width: 1,
									height: i % 5 === 0 ? 10 : 4,
									background: C.hotOrange,
									opacity: 0.5,
								}}
							/>
						))}
					</div>
					{/* Main line */}
					<div
						style={{
							height: 2,
							background: C.hotOrange,
							boxShadow: `0 0 12px ${C.hotOrange}`,
						}}
					/>
					{/* Caption */}
					<div
						style={{
							fontFamily: FONT_MONO,
							fontSize: 9,
							color: C.hotOrange,
							opacity: 0.6,
							letterSpacing: '0.12em',
							marginTop: 6,
							textAlign: 'center',
						}}
					>
						LOADING SEQUENCE // 15.0s @ 60FPS
					</div>
				</div>
			)}

			{/* Full-screen orange wipe */}
			{wipeT > 0.01 && (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						width: 2400,
						height: 1400,
						background: C.hotOrange,
						borderRadius: wipeT < 0.7 ? 60 : 0,
						transform: `translate(-50%, -50%) scale(${wipeT})`,
					}}
				/>
			)}
		</AbsoluteFill>
	);
};
