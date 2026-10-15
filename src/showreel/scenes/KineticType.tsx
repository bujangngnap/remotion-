import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { C } from '../constants';
import { FONT_HEAVY, FONT_SERIF } from '../fonts';
import { createRng, easeOutExpo } from '../utils';

/**
 * [2.4–4.0s] 01 / KINETIC TYPE
 * "MAKE" (off-white) → "THINGS" (lime) → "MOVE." (orange) → circle transition.
 */
export const KineticType: React.FC = () => {
	const f = useCurrentFrame(); // 0‥95
	const { fps } = useVideoConfig();

	// ── Each word occupies ~30 frames ──
	const seg = f < 30 ? 0 : f < 60 ? 1 : 2;
	const localF = f - seg * 30;

	const bgs = [C.offWhite, C.acidLime, C.hotOrange];


	const bg = bgs[seg];

	// ── Circle transition at end ──
	const circleScale = interpolate(f, [84, 96], [0, 1.8], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const circleEased = easeOutExpo(Math.min(1, circleScale / 1.8)) * 1.8;

	return (
		<AbsoluteFill style={{ backgroundColor: bg }}>
			{seg === 0 && <WordMake f={localF} fps={fps} />}
			{seg === 1 && <WordThings f={localF} fps={fps} />}
			{seg === 2 && <WordMove f={localF} fps={fps} />}

			{/* Circle transition to next scene */}
			{circleEased > 0 && (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						width: 1600,
						height: 1600,
						borderRadius: '50%',
						background: C.inkBlack,
						transform: `translate(-50%, -50%) scale(${circleEased})`,
					}}
				>
					{/* 3×3 colored dot grid */}
					{circleEased > 1.2 && (
						<div
							style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								display: 'grid',
								gridTemplateColumns: 'repeat(3, 24px)',
								gap: 18,
								opacity: interpolate(circleEased, [1.2, 1.6], [0, 1], {
									extrapolateLeft: 'clamp',
									extrapolateRight: 'clamp',
								}),
							}}
						>
							{[C.offWhite, C.hotOrange, C.acidLime, C.periwinkle, C.offWhite, C.hotOrange, C.acidLime, C.periwinkle, C.offWhite].map(
								(c, i) => (
									<div
										key={i}
										style={{
											width: 24,
											height: 24,
											borderRadius: '50%',
											background: c,
										}}
									/>
								),
							)}
						</div>
					)}
				</div>
			)}
		</AbsoluteFill>
	);
};

// ── "MAKE" with glitch split ──
const WordMake: React.FC<{ f: number; fps: number }> = ({ f, fps }) => {
	const s = spring({ frame: f, fps, config: { damping: 12, stiffness: 200, mass: 0.5 }, durationInFrames: 18 });
	const rng = createRng(f * 71);
	const glitch = f > 2 && f < 8;
	const gx = glitch ? (rng() - 0.5) * 12 : 0;

	return (
		<>
			{/* Glitch clone */}
			{glitch && (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: `translate(calc(-50% + ${-gx}px), -50%)`,
						fontFamily: FONT_HEAVY,
						fontSize: 220,
						fontWeight: 900,
						color: C.hotOrange,
						opacity: 0.3,
						lineHeight: 1,
					}}
				>
					MAKE
				</div>
			)}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(calc(-50% + ${gx}px), -50%) scale(${s})`,
					fontFamily: FONT_HEAVY,
					fontSize: 220,
					fontWeight: 900,
					color: C.inkBlack,
					lineHeight: 1,
				}}
			>
				MAKE
			</div>
		</>
	);
};

// ── "THINGS" with motion blur smear ──
const WordThings: React.FC<{ f: number; fps: number }> = ({ f, fps }) => {
	const arrive = spring({ frame: f, fps, config: { damping: 14, stiffness: 220, mass: 0.4 }, durationInFrames: 16 });
	const blurAmount = interpolate(f, [0, 10], [40, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
	const xOff = interpolate(f, [0, 10], [300, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

	return (
		<>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(calc(-50% + ${xOff}px), -50%)`,
					fontFamily: FONT_HEAVY,
					fontSize: 200,
					fontWeight: 900,
					color: C.inkBlack,
					lineHeight: 1,
					filter: `blur(${blurAmount}px)`,
				}}
			>
				THINGS
			</div>
			{/* Vertical streak lines under text */}
			{Array.from({ length: 5 }, (_, i) => (
				<div
					key={i}
					style={{
						position: 'absolute',
						bottom: `${34 + i * 2}%`,
						left: `${25 + i * 12}%`,
						width: 1,
						height: 60 * arrive,
						background: C.inkBlack,
						opacity: 0.12,
					}}
				/>
			))}
		</>
	);
};

// ── "MOVE." with tilted/rotating letters + "with intent." ──
const WordMove: React.FC<{ f: number; fps: number }> = ({ f, fps }) => {
	const letters = 'MOVE.'.split('');
	return (
		<>
			<div style={{ position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: 4 }}>
				{letters.map((ch, i) => {
					const delay = i * 3;
					const s = spring({
						frame: Math.max(0, f - delay),
						fps,
						config: { damping: 8, stiffness: 160, mass: 0.4, overshootClamping: false },
						durationInFrames: 20,
					});
					const rot = interpolate(s, [0, 1], [(i % 2 === 0 ? 25 : -25), 0]);
					const y = interpolate(s, [0, 1], [80, 0]);
					return (
						<span
							key={i}
							style={{
								display: 'inline-block',
								fontFamily: FONT_HEAVY,
								fontSize: 200,
								fontWeight: 900,
								color: C.inkBlack,
								lineHeight: 1,
								transform: `translateY(${y}px) rotate(${rot}deg)`,
							}}
						>
							{ch}
						</span>
					);
				})}
			</div>
			{/* "with intent." subtitle */}
			<div
				style={{
					position: 'absolute',
					top: '58%',
					left: '50%',
					transform: 'translate(-50%, 0)',
					fontFamily: FONT_SERIF,
					fontStyle: 'italic',
					fontSize: 32,
					color: C.inkBlack,
					opacity: interpolate(f, [8, 16], [0, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
				}}
			>
				with intent.
			</div>
		</>
	);
};
