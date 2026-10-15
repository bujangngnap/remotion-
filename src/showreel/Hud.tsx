import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { C, TOTAL_FRAMES, getSceneLabel } from './constants';
import { FONT_MONO } from './fonts';
import { formatTimecode } from './utils';

/**
 * Persistent HUD overlay rendered on EVERY scene.
 * Renders at the composition root so useCurrentFrame() returns the global frame.
 */
export const Hud: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const scene = getSceneLabel(frame);
	const tc = formatTimecode(frame, fps);
	const pct = (frame / TOTAL_FRAMES) * 100;

	const INSET = 24;
	const BRK = 18; // bracket arm length

	const mono: React.CSSProperties = {
		fontFamily: FONT_MONO,
		fontSize: 10,
		letterSpacing: '0.14em',
		textTransform: 'uppercase',
		color: C.offWhite,
		opacity: 0.45,
		lineHeight: 1,
	};

	const bracket = (
		top: boolean,
		left: boolean,
	): React.CSSProperties => ({
		position: 'absolute',
		width: BRK,
		height: BRK,
		...(top ? { top: INSET } : { bottom: INSET + 14 }),
		...(left ? { left: INSET } : { right: INSET }),
		borderColor: C.offWhite,
		borderStyle: 'solid',
		borderWidth: 0,
		opacity: 0.22,
		...(top && left && { borderTopWidth: 1, borderLeftWidth: 1 }),
		...(top && !left && { borderTopWidth: 1, borderRightWidth: 1 }),
		...(!top && left && { borderBottomWidth: 1, borderLeftWidth: 1 }),
		...(!top && !left && { borderBottomWidth: 1, borderRightWidth: 1 }),
	});

	const TICK_COUNT = 45;

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				pointerEvents: 'none',
				zIndex: 9999,
			}}
		>
			{/* ── Corner brackets ───────────────────────────────── */}
			<div style={bracket(true, true)} />
			<div style={bracket(true, false)} />
			<div style={bracket(false, true)} />
			<div style={bracket(false, false)} />

			{/* ── Top-left: brand ────────────────────────────────── */}
			<div
				style={{
					...mono,
					position: 'absolute',
					top: INSET + 4,
					left: INSET + BRK + 10,
				}}
			>
				CLAUDE / MOTION REEL 2026
			</div>

			{/* ── Top-right: timecode ────────────────────────────── */}
			<div
				style={{
					...mono,
					position: 'absolute',
					top: INSET + 4,
					right: INSET + BRK + 10,
					fontVariantNumeric: 'tabular-nums',
				}}
			>
				TC {tc}
			</div>

			{/* ── Bottom-left: scene label ────────────────────────── */}
			<div
				style={{
					...mono,
					position: 'absolute',
					bottom: INSET + 18,
					left: INSET + BRK + 10,
				}}
			>
				{scene.index} / {scene.name}
			</div>

			{/* ── Bottom-right: resolution ────────────────────────── */}
			<div
				style={{
					...mono,
					position: 'absolute',
					bottom: INSET + 18,
					right: INSET + BRK + 10,
				}}
			>
				1920 × 1080 / 60 FPS
			</div>

			{/* ── Progress bar + ticks ────────────────────────────── */}
			<div
				style={{
					position: 'absolute',
					bottom: INSET,
					left: INSET,
					right: INSET,
					height: 10,
				}}
			>
				{/* Track */}
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: 1,
						background: C.offWhite,
						opacity: 0.15,
					}}
				/>

				{/* Ticks */}
				{Array.from({ length: TICK_COUNT + 1 }, (_, i) => (
					<div
						key={i}
						style={{
							position: 'absolute',
							bottom: 0,
							left: `${(i / TICK_COUNT) * 100}%`,
							width: 1,
							height: i % 5 === 0 ? 6 : 3,
							background: C.offWhite,
							opacity: 0.2,
						}}
					/>
				))}

				{/* Fill */}
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: `${pct}%`,
						height: 1,
						background: C.hotOrange,
						opacity: 0.7,
					}}
				/>

				{/* Playhead dot */}
				<div
					style={{
						position: 'absolute',
						bottom: -2,
						left: `${pct}%`,
						width: 5,
						height: 5,
						borderRadius: '50%',
						background: C.hotOrange,
						transform: 'translateX(-50%)',
						boxShadow: `0 0 6px ${C.hotOrange}`,
					}}
				/>
			</div>
		</div>
	);
};
