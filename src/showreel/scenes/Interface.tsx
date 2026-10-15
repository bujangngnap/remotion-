import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import { C } from '../constants';
import { FONT_HEAVY, FONT_SERIF, FONT_MONO } from '../fonts';
import { easeOutCubic, progress as prog } from '../utils';

/**
 * [10.0–12.0s] 05 / INTERFACE
 * Bento grid of animated UI cards + fake cursor interaction.
 */
export const Interface: React.FC = () => {
	const f = useCurrentFrame(); // 0‥119
	const { fps } = useVideoConfig();

	const cardBase: React.CSSProperties = {
		borderRadius: 36,
		padding: 44,
		position: 'relative',
		overflow: 'hidden',
		boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
	};

	return (
		<AbsoluteFill
			style={{
				backgroundColor: C.offWhite,
				background: `radial-gradient(ellipse at center, ${C.offWhite}, #ddd9d0)`,
			}}
		>
			{/* ── Full Size Bento Grid ── */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					display: 'grid',
					width: 1808,
					height: 940,
					gridTemplateColumns: '600px 600px 560px',
					gridTemplateRows: '480px 436px',
					gap: 24,
				}}
			>
				{/* ─── Card 1: Engagement (white) ─── */}
				<CardSpring f={f} fps={fps} delay={0}>
					<div style={{ ...cardBase, background: '#fff', height: '100%' }}>
						<Label>ENGAGEMENT</Label>
						<Counter f={f} />
						<MiniChart f={f} />
					</div>
				</CardSpring>

				{/* ─── Card 2: Motion System (orange) ─── */}
				<CardSpring f={f} fps={fps} delay={4}>
					<div style={{ ...cardBase, background: C.hotOrange, height: '100%' }}>
						<div
							style={{
								fontFamily: FONT_HEAVY,
								fontSize: 44,
								fontWeight: 900,
								color: C.inkBlack,
								marginBottom: 36,
								letterSpacing: '-0.02em',
							}}
						>
							Motion system
						</div>
						<Toggle f={f} />
						<div style={{ display: 'flex', gap: 28, marginTop: 44 }}>
							{['EASING', 'TIMING', 'RHYTHM'].map((t) => (
								<span
									key={t}
									style={{
										fontFamily: FONT_MONO,
										fontSize: 14,
										letterSpacing: '0.14em',
										color: C.inkBlack,
										opacity: 0.65,
										fontWeight: 700,
									}}
								>
									{t}
								</span>
							))}
						</div>
					</div>
				</CardSpring>

				{/* ─── Card 3: Smoothness (black) ─── */}
				<CardSpring f={f} fps={fps} delay={8}>
					<div
						style={{
							...cardBase,
							background: C.inkBlack,
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<ProgressRing f={f} />
						<div
							style={{
								fontFamily: FONT_MONO,
								fontSize: 15,
								color: C.offWhite,
								opacity: 0.55,
								marginTop: 24,
								letterSpacing: '0.2em',
								fontWeight: 600,
							}}
						>
							SMOOTHNESS
						</div>
					</div>
				</CardSpring>

				{/* ─── Card 4: Equalizer (lime) ─── */}
				<CardSpring f={f} fps={fps} delay={6}>
					<div
						style={{
							...cardBase,
							background: C.acidLime,
							height: '100%',
							display: 'flex',
							alignItems: 'flex-end',
							justifyContent: 'center',
							gap: 12,
							paddingBottom: 60,
						}}
					>
						<Equalizer f={f} />
					</div>
				</CardSpring>

				{/* ─── Card 5: Keyframes (periwinkle, wide spanning 2 columns) ─── */}
				<CardSpring f={f} fps={fps} delay={10} gridColumn="span 2">
					<div
						style={{
							...cardBase,
							background: C.periwinkle,
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						<div>
							<div
								style={{
									fontFamily: FONT_SERIF,
									fontStyle: 'italic',
									fontSize: 52,
									color: C.offWhite,
									marginBottom: 32,
									letterSpacing: '-0.01em',
								}}
							>
								Keyframes are a language.
							</div>
							<KeyframeTimeline f={f} />
						</div>
						<div>
							<RenderButton f={f} />
						</div>
					</div>
				</CardSpring>
			</div>

			{/* ── Fake cursor ── */}
			<FakeCursor f={f} />
		</AbsoluteFill>
	);
};

// ── Card entrance with staggered spring ──
const CardSpring: React.FC<{
	f: number;
	fps: number;
	delay: number;
	gridColumn?: string;
	children: React.ReactNode;
}> = ({ f, fps, delay, gridColumn, children }) => {
	const s = spring({
		frame: Math.max(0, f - delay),
		fps,
		config: { damping: 12, stiffness: 140, mass: 0.5, overshootClamping: false },
		durationInFrames: 25,
	});

	return (
		<div
			style={{
				gridColumn,
				transform: `translateY(${(1 - s) * 70}px) scale(${0.88 + s * 0.12})`,
				opacity: s,
				height: '100%',
			}}
		>
			{children}
		</div>
	);
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<div
		style={{
			fontFamily: FONT_MONO,
			fontSize: 15,
			letterSpacing: '0.18em',
			color: '#888',
			marginBottom: 14,
			textTransform: 'uppercase',
			fontWeight: 600,
		}}
	>
		{children}
	</div>
);

// ── Counter +0% → +248% ──
const Counter: React.FC<{ f: number }> = ({ f }) => {
	const val = Math.min(248, Math.floor(easeOutCubic(prog(f, 10, 80)) * 248));

	return (
		<div
			style={{
				fontFamily: FONT_HEAVY,
				fontSize: 104,
				fontWeight: 900,
				color: C.inkBlack,
				lineHeight: 1,
				fontVariantNumeric: 'tabular-nums',
				letterSpacing: '-0.03em',
			}}
		>
			+{val}%
		</div>
	);
};

// ── Mini line chart ──
const MiniChart: React.FC<{ f: number }> = ({ f }) => {
	const drawT = prog(f, 15, 90);
	const pts = [0, 12, 8, 30, 25, 55, 48, 80, 65, 100];
	const h = 180;
	const w = 510;

	const pathD = pts
		.map((v, i) => {
			const x = (i / (pts.length - 1)) * w;
			const y = h - (v / 100) * (h - 15) - 8;
			return i === 0 ? `M${x},${y}` : `L${x},${y}`;
		})
		.join(' ');

	return (
		<svg
			width={w}
			height={h}
			style={{ position: 'absolute', bottom: 44, left: 45 }}
		>
			{/* Gradient area */}
			<defs>
				<linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor={C.hotOrange} stopOpacity={0.35} />
					<stop offset="100%" stopColor={C.hotOrange} stopOpacity={0} />
				</linearGradient>
				<clipPath id="chartClip">
					<rect x={0} y={0} width={w * drawT} height={h} />
				</clipPath>
			</defs>
			<g clipPath="url(#chartClip)">
				<path
					d={`${pathD} L${w},${h} L0,${h} Z`}
					fill="url(#chartGrad)"
				/>
				<path d={pathD} fill="none" stroke={C.hotOrange} strokeWidth={4} />
			</g>
			{/* Riding dot */}
			{drawT > 0.05 && (
				<circle
					cx={(drawT * (pts.length - 1)) < pts.length ? (Math.floor(drawT * (pts.length - 1)) / (pts.length - 1)) * w : w}
					cy={h - (pts[Math.min(Math.floor(drawT * (pts.length - 1)), pts.length - 1)] / 100) * (h - 15) - 8}
					r={7}
					fill={C.hotOrange}
				/>
			)}
		</svg>
	);
};

// ── Toggle switch ──
const Toggle: React.FC<{ f: number }> = ({ f }) => {
	const on = f > 50;
	const t = on ? easeOutCubic(prog(f, 50, 62)) : 0;

	return (
		<div
			style={{
				width: 104,
				height: 56,
				borderRadius: 28,
				background: on ? C.acidLime : 'rgba(0,0,0,0.22)',
				position: 'relative',
				transition: 'none',
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: 5,
					left: 5 + t * 48,
					width: 46,
					height: 46,
					borderRadius: '50%',
					background: '#fff',
					boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
				}}
			/>
		</div>
	);
};

// ── Circular progress ring ──
const ProgressRing: React.FC<{ f: number }> = ({ f }) => {
	const val = Math.min(99, Math.floor(easeOutCubic(prog(f, 15, 100)) * 99));
	const r = 95;
	const circ = 2 * Math.PI * r;
	const offset = circ - (val / 100) * circ;
	const svgDim = r * 2 + 28;

	return (
		<div style={{ position: 'relative', width: svgDim, height: svgDim }}>
			<svg width={svgDim} height={svgDim}>
				{/* bg ring */}
				<circle
					cx={r + 14}
					cy={r + 14}
					r={r}
					fill="none"
					stroke="rgba(255,255,255,0.08)"
					strokeWidth={14}
				/>
				{/* progress ring */}
				<circle
					cx={r + 14}
					cy={r + 14}
					r={r}
					fill="none"
					stroke={C.hotOrange}
					strokeWidth={14}
					strokeDasharray={circ}
					strokeDashoffset={offset}
					strokeLinecap="round"
					transform={`rotate(-90 ${r + 14} ${r + 14})`}
				/>
			</svg>
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					fontFamily: FONT_HEAVY,
					fontSize: 58,
					fontWeight: 900,
					color: C.offWhite,
					fontVariantNumeric: 'tabular-nums',
				}}
			>
				{val}%
			</div>
		</div>
	);
};

// ── Equalizer bars ──
const Equalizer: React.FC<{ f: number }> = ({ f }) => {
	const bars = 14;
	return (
		<>
			{Array.from({ length: bars }, (_, i) => {
				const h = 40 + Math.abs(Math.sin(f * 0.12 + i * 0.75)) * 170;
				return (
					<div
						key={i}
						style={{
							width: 22,
							height: h,
							borderRadius: 11,
							background: C.inkBlack,
							opacity: 0.75,
						}}
					/>
				);
			})}
		</>
	);
};

// ── Keyframe timeline ──
const KeyframeTimeline: React.FC<{ f: number }> = ({ f }) => {
	const playheadX = prog(f, 20, 100) * 100;

	return (
		<div style={{ position: 'relative', height: 80, marginBottom: 20 }}>
			{/* Rows of keyframe diamonds */}
			{[0, 1, 2].map((row) => (
				<div
					key={row}
					style={{
						display: 'flex',
						gap: 52,
						marginBottom: 10,
						paddingLeft: row * 40,
					}}
				>
					{Array.from({ length: 16 }, (_, i) => (
						<div
							key={i}
							style={{
								width: 14,
								height: 14,
								background: C.acidLime,
								transform: 'rotate(45deg)',
								opacity: 0.85,
							}}
						/>
					))}
				</div>
			))}
			{/* Red playhead */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: `${playheadX}%`,
					width: 3,
					height: '100%',
					background: '#ff3344',
					opacity: 0.95,
				}}
			/>
		</div>
	);
};

// ── Render button ──
const RenderButton: React.FC<{ f: number }> = ({ f }) => {
	const done = f > 85;
	return (
		<div
			style={{
				display: 'inline-block',
				padding: '16px 44px',
				borderRadius: 50,
				background: done ? C.acidLime : C.offWhite,
				fontFamily: FONT_MONO,
				fontSize: 16,
				fontWeight: 700,
				letterSpacing: '0.12em',
				color: C.inkBlack,
			}}
		>
			{done ? 'DONE ✓' : 'RENDER'}
		</div>
	);
};

// ── Fake mouse cursor ──
const FakeCursor: React.FC<{ f: number }> = ({ f }) => {
	// Screen coordinates matching new full-size grid layout:
	// Grid starts at left: 56px, top: 70px
	// Card 2 toggle is at approx (770, 235)
	// Card 5 RENDER button is at approx (810, 850)
	const positions = [
		{ x: 380, y: 350, t: 0 },
		{ x: 775, y: 235, t: 40 },
		{ x: 775, y: 235, t: 55 },
		{ x: 810, y: 850, t: 80 },
		{ x: 810, y: 850, t: 95 },
		{ x: 900, y: 880, t: 115 },
	];

	let cx = positions[0].x;
	let cy = positions[0].y;

	for (let i = 0; i < positions.length - 1; i++) {
		const p = positions[i];
		const n = positions[i + 1];
		if (f >= p.t && f < n.t) {
			const t = easeOutCubic((f - p.t) / (n.t - p.t));
			cx = p.x + (n.x - p.x) * t;
			cy = p.y + (n.y - p.y) * t;
			break;
		}
		if (f >= n.t) {
			cx = n.x;
			cy = n.y;
		}
	}

	// Click ripple
	const isClicking = [50, 88].some((ct) => f >= ct && f < ct + 7);

	return (
		<>
			{/* Click ripple */}
			{isClicking && (
				<div
					style={{
						position: 'absolute',
						left: cx - 18,
						top: cy - 18,
						width: 36,
						height: 36,
						borderRadius: '50%',
						border: `3px solid ${C.hotOrange}`,
						opacity: 0.7,
						transform: 'scale(1.6)',
						zIndex: 100,
					}}
				/>
			)}
			{/* Cursor */}
			<div
				style={{
					position: 'absolute',
					left: cx,
					top: cy,
					width: 0,
					height: 0,
					zIndex: 100,
				}}
			>
				<svg width="28" height="34" viewBox="0 0 20 24">
					<path
						d="M0 0 L0 20 L5 15 L10 22 L13 20 L8 13 L15 13 Z"
						fill="#fff"
						stroke="#000"
						strokeWidth="1.5"
					/>
				</svg>
			</div>
		</>
	);
};
