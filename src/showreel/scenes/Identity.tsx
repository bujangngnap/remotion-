import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { C, BRAND_NAME } from '../constants';
import { FONT_HEAVY, FONT_SERIF, FONT_MONO } from '../fonts';
import { createRng, easeOutCubic, progress as prog } from '../utils';

/**
 * [13.0–15.0s] 06 / IDENTITY (finale)
 * Letters tumble in → settle → orbit ring → branding → collapse to line → black.
 */
export const Identity: React.FC = () => {
	const f = useCurrentFrame(); // 0‥119
	const { fps } = useVideoConfig();
	const letters = BRAND_NAME.split('');

	// ── Per-letter initial states (deterministic) ──
	const letterStates = useMemo(() => {
		const rng = createRng(2026);
		return letters.map(() => ({
			startX: (rng() - 0.5) * 1200,
			startY: (rng() - 0.5) * 800,
			startRot: (rng() - 0.5) * 360,
			bounceDelay: Math.floor(rng() * 15),
		}));
	}, []);

	// ── Collapse at end ──
	const collapseT = prog(f, 108, 118);
	const collapseEased = easeOutCubic(collapseT);
	const blackout = f >= 118 ? 1 : 0;

	// ── Orbit ring ──
	const orbitAngle = f * 0.04;
	const orbitOpacity = interpolate(f, [40, 55, 108, 114], [0, 0.5, 0.5, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── Branding elements ──
	const brandingOp = interpolate(f, [50, 65, 108, 114], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: C.darkBrown,
				background: `radial-gradient(ellipse at 50% 60%, rgba(255,90,31,0.08), ${C.darkBrown} 70%)`,
			}}
		>
			{/* ── Black overlay for final cut ── */}
			{blackout > 0 && (
				<AbsoluteFill style={{ backgroundColor: C.inkBlack, zIndex: 100 }} />
			)}

			{/* ── Tumbling letters ── */}
			<div
				style={{
					position: 'absolute',
					top: '44%',
					left: '50%',
					transform: `translate(-50%, -50%) scaleY(${1 - collapseEased * 0.95})`,
					display: 'flex',
					gap: 6,
				}}
			>
				{letters.map((ch, i) => {
					const st = letterStates[i];
					const s = spring({
						frame: Math.max(0, f - st.bounceDelay),
						fps,
						config: {
							damping: 10,
							stiffness: 120,
							mass: 0.6,
							overshootClamping: false,
						},
						durationInFrames: 35,
					});

					const x = st.startX * (1 - s);
					const y = st.startY * (1 - s);
					const rot = st.startRot * (1 - s);

					return (
						<span
							key={i}
							style={{
								display: 'inline-block',
								fontFamily: FONT_HEAVY,
								fontSize: 160,
								fontWeight: 900,
								color: C.offWhite,
								lineHeight: 1,
								transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
								opacity: interpolate(s, [0, 0.2], [0, 1], {
									extrapolateRight: 'clamp',
								}),
							}}
						>
							{ch}
						</span>
					);
				})}
			</div>

			{/* ── Orange underline ── */}
			<div
				style={{
					position: 'absolute',
					top: '56%',
					left: '50%',
					transform: `translateX(-50%) scaleX(${interpolate(f, [45, 60, 108, 115], [0, 1, 1, 0], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})})`,
					width: 500,
					height: 3,
					background: C.hotOrange,
					opacity: 0.8,
				}}
			/>

			{/* ── Orbit ring ── */}
			<div
				style={{
					position: 'absolute',
					top: '47%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					opacity: orbitOpacity * (1 - collapseEased),
				}}
			>
				<div
					style={{
						width: 700,
						height: 180,
						border: '1px solid rgba(255,255,255,0.12)',
						borderRadius: '50%',
						position: 'relative',
					}}
				>
					{/* Traveling dots */}
					{[0, Math.PI].map((offset, i) => {
						const angle = orbitAngle + offset;
						const x = Math.cos(angle) * 350;
						const y = Math.sin(angle) * 90;
						const color = i === 0 ? C.hotOrange : C.acidLime;
						return (
							<div
								key={i}
								style={{
									position: 'absolute',
									top: '50%',
									left: '50%',
									width: 8,
									height: 8,
									borderRadius: '50%',
									background: color,
									transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
									boxShadow: `0 0 8px ${color}`,
								}}
							/>
						);
					})}
				</div>
			</div>

			{/* ── Branding line ── */}
			<div
				style={{
					position: 'absolute',
					top: '62%',
					left: 0,
					right: 0,
					display: 'flex',
					justifyContent: 'center',
					gap: 60,
					alignItems: 'center',
					opacity: brandingOp * (1 - collapseEased),
				}}
			>
				<span
					style={{
						fontFamily: FONT_MONO,
						fontSize: 11,
						letterSpacing: '0.2em',
						color: C.offWhite,
						opacity: 0.5,
						textTransform: 'uppercase',
					}}
				>
					MOTION DESIGNER
				</span>
				<span
					style={{
						fontFamily: FONT_SERIF,
						fontStyle: 'italic',
						fontSize: 20,
						color: C.offWhite,
						opacity: 0.6,
					}}
				>
					Showreel 2026
				</span>
			</div>

			{/* ── Bottom credit ── */}
			<div
				style={{
					position: 'absolute',
					bottom: 70,
					left: '50%',
					transform: 'translateX(-50%)',
					fontFamily: FONT_MONO,
					fontSize: 9,
					letterSpacing: '0.15em',
					color: C.offWhite,
					opacity: brandingOp * 0.25 * (1 - collapseEased),
					textTransform: 'uppercase',
				}}
			>
				BUILT WITH REMOTION / REACT / TYPESCRIPT
			</div>

			{/* ── Collapse line (at ~14.5s) ── */}
			{collapseEased > 0.1 && (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: interpolate(collapseEased, [0.5, 1], [500, 200], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
						height: 2,
						background: C.hotOrange,
						opacity: interpolate(collapseEased, [0.3, 0.8, 1], [0, 1, 0], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
					}}
				/>
			)}
		</AbsoluteFill>
	);
};
