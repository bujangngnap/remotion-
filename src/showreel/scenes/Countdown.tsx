import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { C } from '../constants';
import { FONT_SERIF } from '../fonts';
import { createRng } from '../utils';

/**
 * [0.8–2.4s] COUNTDOWN
 * Full orange → giant italic "2" with overshoot → hard cut →
 * black + glitching "1" bar with RGB split.
 */
export const Countdown: React.FC = () => {
	const f = useCurrentFrame(); // 0‥95
	const { fps } = useVideoConfig();

	const isTwo = f < 48;

	if (isTwo) {
		// ── "2" on full orange ──
		const s = spring({
			frame: f,
			fps,
			config: { damping: 8, stiffness: 180, mass: 0.6, overshootClamping: false },
			durationInFrames: 30,
		});

		const exitOp = interpolate(f, [38, 48], [1, 0], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});

		return (
			<AbsoluteFill style={{ backgroundColor: C.hotOrange }}>
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: `translate(-50%, -50%) scale(${s})`,
						fontFamily: FONT_SERIF,
						fontStyle: 'italic',
						fontSize: 500,
						fontWeight: 400,
						color: C.inkBlack,
						lineHeight: 1,
						opacity: exitOp,
					}}
				>
					2
				</div>
			</AbsoluteFill>
		);
	}

	// ── "1" on black with RGB glitch ──
	const localF = f - 48; // 0‥47
	const rng = createRng(localF * 137);

	const barH = interpolate(localF, [0, 8], [0, 600], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});

	const glitchActive = localF % 4 < 2;
	const gx1 = glitchActive ? (rng() - 0.5) * 8 : 0;
	const gx2 = glitchActive ? (rng() - 0.5) * 8 : 0;

	const exitOp = interpolate(localF, [38, 48], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Noise slivers
	const slivers = Array.from({ length: 6 }, (_, i) => {
		const r = createRng(localF * 31 + i * 97);
		return {
			y: r() * 600 - 300,
			w: r() * 60 + 10,
			h: r() * 4 + 1,
			color: i % 3 === 0 ? '#ff3333' : i % 3 === 1 ? '#33ff33' : '#3333ff',
			op: r() * 0.6 + 0.1,
		};
	});

	return (
		<AbsoluteFill style={{ backgroundColor: C.inkBlack, opacity: exitOp }}>
			{/* Main white bar ("1") */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					width: 80,
					height: barH,
					background: C.offWhite,
					transform: `translate(-50%, -50%) translateX(${gx1}px)`,
				}}
			/>

			{/* RGB split slivers */}
			{slivers.map((sl, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						top: `calc(50% + ${sl.y}px)`,
						left: `calc(50% + ${gx2 * (i + 1) * 0.5}px)`,
						width: sl.w,
						height: sl.h,
						background: sl.color,
						opacity: glitchActive ? sl.op : 0,
						mixBlendMode: 'screen',
						transform: 'translateX(-50%)',
					}}
				/>
			))}

			{/* Serif "1" ghost */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(-50%, -50%) translateX(${gx1 * 2}px)`,
					fontFamily: FONT_SERIF,
					fontStyle: 'italic',
					fontSize: 500,
					fontWeight: 400,
					color: C.offWhite,
					lineHeight: 1,
					opacity: glitchActive ? 0.04 : 0,
					mixBlendMode: 'difference',
				}}
			>
				1
			</div>
		</AbsoluteFill>
	);
};
