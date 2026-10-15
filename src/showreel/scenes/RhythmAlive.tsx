import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { C } from '../constants';
import { FONT_HEAVY } from '../fonts';
import { easeOutExpo } from '../utils';

/**
 * [12.0–13.0s] RHYTHM / ALIVE
 * 4 rapid-fire cuts (~15 frames each) with aggressive visuals.
 */
export const RhythmAlive: React.FC = () => {
	const f = useCurrentFrame(); // 0‥59
	const { fps } = useVideoConfig();

	if (f < 15) return <DiagonalStripes f={f} fps={fps} />;
	if (f < 30) return <ConcentricRings f={f - 15} fps={fps} />;
	if (f < 45) return <HalftoneRings f={f - 30} fps={fps} />;
	return <AliveSlam f={f - 45} fps={fps} />;
};

// ── Orange + black diagonal stripes + "RHYTHM" ──
const DiagonalStripes: React.FC<{ f: number; fps: number }> = ({ f }) => {
	const scroll = f * 15;

	return (
		<AbsoluteFill style={{ backgroundColor: C.hotOrange, overflow: 'hidden' }}>
			{/* Diagonal stripes */}
			{Array.from({ length: 20 }, (_, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						top: -200,
						left: -400 + i * 140 + scroll,
						width: 70,
						height: 1600,
						background: C.inkBlack,
						transform: 'rotate(-35deg)',
					}}
				/>
			))}
			{/* "RHYTHM" */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					fontFamily: FONT_HEAVY,
					fontSize: 200,
					fontWeight: 900,
					color: C.offWhite,
					lineHeight: 1,
					mixBlendMode: 'difference',
					letterSpacing: '-0.02em',
				}}
			>
				RHYTHM
			</div>
		</AbsoluteFill>
	);
};

// ── Lime bg with concentric black rings zooming ──
const ConcentricRings: React.FC<{ f: number; fps: number }> = ({ f }) => {
	const zoom = 1 + f * 0.08;

	return (
		<AbsoluteFill style={{ backgroundColor: C.acidLime }}>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(-50%, -50%) scale(${zoom})`,
				}}
			>
				{Array.from({ length: 12 }, (_, i) => {
					const r = 40 + i * 50;
					const isOrange = i === 5;
					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								width: r * 2,
								height: r * 2,
								borderRadius: '50%',
								border: `${isOrange ? 6 : 4}px solid ${isOrange ? C.hotOrange : C.inkBlack}`,
								transform: 'translate(-50%, -50%)',
								opacity: isOrange ? 1 : 0.8,
							}}
						/>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

// ── Periwinkle bg with halftone dot rings pulsing ──
const HalftoneRings: React.FC<{ f: number; fps: number }> = ({ f }) => {
	const pulse = 1 + Math.sin(f * 0.5) * 0.1;

	return (
		<AbsoluteFill style={{ backgroundColor: C.periwinkle }}>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(-50%, -50%) scale(${pulse})`,
				}}
			>
				{Array.from({ length: 8 }, (_, ring) => {
					const r = 60 + ring * 65;
					const dots = 8 + ring * 6;
					return Array.from({ length: dots }, (_, d) => {
						const angle = (d / dots) * Math.PI * 2;
						const dotSize = 6 + ring * 2;
						return (
							<div
								key={`${ring}-${d}`}
								style={{
									position: 'absolute',
									left: Math.cos(angle) * r - dotSize / 2,
									top: Math.sin(angle) * r - dotSize / 2,
									width: dotSize,
									height: dotSize,
									borderRadius: '50%',
									background: C.inkBlack,
									opacity: 0.7,
								}}
							/>
						);
					});
				})}
			</div>
		</AbsoluteFill>
	);
};

// ── "ALIVE" with slamming orange underline ──
const AliveSlam: React.FC<{ f: number; fps: number }> = ({ f, fps }) => {
	const s = spring({
		frame: f,
		fps,
		config: { damping: 10, stiffness: 300, mass: 0.3, overshootClamping: false },
		durationInFrames: 12,
	});

	const lineW = easeOutExpo(Math.min(1, f / 8)) * 440;

	return (
		<AbsoluteFill style={{ backgroundColor: C.offWhite }}>
			<div
				style={{
					position: 'absolute',
					top: '46%',
					left: '50%',
					transform: `translate(-50%, -50%) scale(${s})`,
					fontFamily: FONT_HEAVY,
					fontSize: 220,
					fontWeight: 900,
					color: C.inkBlack,
					lineHeight: 1,
				}}
			>
				ALIVE
			</div>
			{/* Orange underline */}
			<div
				style={{
					position: 'absolute',
					top: '62%',
					left: '50%',
					transform: 'translateX(-50%)',
					width: lineW,
					height: 6,
					background: C.hotOrange,
					borderRadius: 3,
				}}
			/>
		</AbsoluteFill>
	);
};
