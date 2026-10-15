import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C } from '../constants';
import { FONT_UI } from '../fonts';

// ── Scene index label (top-left) ───────────────────────────────────────
export const SceneLabel: React.FC<{
	index: string;
	title: string;
	start?: number;
	style?: React.CSSProperties;
}> = ({ index, title, start = 0, style }) => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();
	const s = spring({ frame: f - start, fps, config: { damping: 16, stiffness: 120 }, durationInFrames: 24 });
	const x = interpolate(s, [0, 1], [-26, 0]);
	return (
		<div
			style={{
				position: 'absolute',
				top: 62,
				left: 84,
				display: 'flex',
				alignItems: 'center',
				gap: 14,
				opacity: s,
				transform: `translateX(${x}px)`,
				zIndex: 40,
				...style,
			}}
		>
			<span
				style={{
					width: 9,
					height: 9,
					borderRadius: '50%',
					background: C.gold,
					boxShadow: `0 0 12px ${C.gold}`,
					display: 'inline-block',
				}}
			/>
			<span
				style={{
					fontFamily: FONT_UI,
					fontWeight: 800,
					fontSize: 15,
					letterSpacing: '0.32em',
					color: 'rgba(243,233,210,0.88)',
					textTransform: 'uppercase',
					whiteSpace: 'nowrap',
				}}
			>
				{index} / {title}
			</span>
		</div>
	);
};

// ── Glass chip with icon ───────────────────────────────────────────────
export const GlassChip: React.FC<{
	start?: number;
	icon?: React.ReactNode;
	children: React.ReactNode;
	style?: React.CSSProperties;
}> = ({ start = 0, icon, children, style }) => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();
	const s = spring({ frame: f - start, fps, config: { damping: 15, stiffness: 140 }, durationInFrames: 22 });
	const y = interpolate(s, [0, 1], [30, 0]);
	return (
		<div
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: 12,
				padding: '12px 22px',
				borderRadius: 999,
				background: 'rgba(9,12,22,0.68)',
				border: `1px solid rgba(233,180,76,0.35)`,
				boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
				opacity: s,
				transform: `translateY(${y}px)`,
				...style,
			}}
		>
			{icon}
			<span
				style={{
					fontFamily: FONT_UI,
					fontWeight: 700,
					fontSize: 17,
					letterSpacing: '0.06em',
					color: C.cream,
					whiteSpace: 'nowrap',
				}}
			>
				{children}
			</span>
		</div>
	);
};

// ── Gold rule that draws itself from the center ────────────────────────
export const GoldRule: React.FC<{
	start?: number;
	width: number;
	height?: number;
	color?: string;
	duration?: number;
	style?: React.CSSProperties;
}> = ({ start = 0, width, height = 2, color = C.gold, duration = 14, style }) => {
	const f = useCurrentFrame();
	const p = Math.max(0, Math.min(1, (f - start) / duration));
	const e = 1 - Math.pow(1 - p, 3);
	return (
		<div style={{ display: 'flex', justifyContent: 'center', ...style }}>
			<div
				style={{
					width,
					height,
					background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
					transform: `scaleX(${e})`,
					transformOrigin: 'center',
				}}
			/>
		</div>
	);
};

// ── In-scene white flash (for hard cuts) ───────────────────────────────
export const LocalFlash: React.FC<{
	at: number;
	peak?: number;
	color?: string;
}> = ({ at, peak = 0.85, color = '#F7E9C9' }) => {
	const f = useCurrentFrame();
	const o = interpolate(f, [at - 1, at, at + 2], [0, peak, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	if (o <= 0.002) return null;
	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				background: color,
				opacity: o,
				pointerEvents: 'none',
				zIndex: 50,
			}}
		/>
	);
};

// ── Small stroked icons (inherit gold by default) ──────────────────────
const iconStroke = {
	fill: 'none',
	strokeLinecap: 'round',
	strokeLinejoin: 'round',
} as const;

export const IconDrop: React.FC<{ color?: string }> = ({ color = C.gold }) => (
	<svg width={22} height={22} viewBox="0 0 22 22" style={{ flexShrink: 0 }}>
		<path
			d="M11 2.5 C 14 7, 16.8 9.8, 16.8 12.8 a5.8 5.8 0 1 1 -11.6 0 C 5.2 9.8 8 7 11 2.5 Z"
			stroke={color}
			strokeWidth={1.7}
			{...iconStroke}
		/>
		<path d="M8.2 13.4 a2.9 2.9 0 0 0 2.4 2.9" stroke={color} strokeWidth={1.5} {...iconStroke} />
	</svg>
);

export const IconPeople: React.FC<{ color?: string }> = ({ color = C.gold }) => (
	<svg width={22} height={22} viewBox="0 0 22 22" style={{ flexShrink: 0 }}>
		<circle cx={11} cy={5} r={2.6} stroke={color} strokeWidth={1.7} {...iconStroke} />
		<circle cx={5} cy={16} r={2.6} stroke={color} strokeWidth={1.7} {...iconStroke} />
		<circle cx={17} cy={16} r={2.6} stroke={color} strokeWidth={1.7} {...iconStroke} />
		<path d="M9.4 6.9 L6.3 13.9 M12.6 6.9 L15.7 13.9 M7.6 16 L14.4 16" stroke={color} strokeWidth={1.5} {...iconStroke} />
	</svg>
);

export const IconHouse: React.FC<{ color?: string }> = ({ color = C.gold }) => (
	<svg width={22} height={22} viewBox="0 0 22 22" style={{ flexShrink: 0 }}>
		<path d="M3 9.6 L11 4.4 L19 9.6" stroke={color} strokeWidth={1.7} {...iconStroke} />
		<path d="M5.6 7.8 L11 4.2 L16.4 7.8" stroke={color} strokeWidth={1.4} {...iconStroke} />
		<path d="M6.2 11 L6.2 17.5 M15.8 11 L15.8 17.5 M4.4 17.8 L17.6 17.8" stroke={color} strokeWidth={1.5} {...iconStroke} />
	</svg>
);
