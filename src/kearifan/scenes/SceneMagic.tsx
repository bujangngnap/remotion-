import React, { useMemo } from 'react';
import {
	AbsoluteFill,
	Img,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { Embers } from '../components/Embers';
import { KineticText } from '../components/KineticText';
import { GoldRule, SceneLabel } from '../components/UI';
import { C, IMG } from '../constants';
import { FONT_DISPLAY, FONT_SERIF, FONT_UI } from '../fonts';
import { catmullRomSpline, clamp, easeInOutCubic, easeOutQuint } from '../utils';

const fmtId = (v: number) =>
	String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// The golden flight route: Sumatra → Java → Kalimantan → Sulawesi → Papua
const ROUTE_POINTS: [number, number][] = [
	[210, 470],
	[540, 650],
	[700, 772],
	[880, 450],
	[1060, 540],
	[1700, 660],
];

interface Fact {
	v: number;
	suffix: string;
	label: string;
}
const FACTS: Fact[] = [
	{ v: 17000, suffix: '+', label: 'PULAU' },
	{ v: 1340, suffix: '', label: 'SUKU BANGSA' },
	{ v: 700, suffix: '+', label: 'BAHASA LOKAL' },
];

/**
 * [0.0 – 3.0 s] 01 / THE MAGIC OF INDONESIA
 * Aerial archipelago emerging from darkness, a glowing golden line
 * traces the islands, kinetic "INDONESIA" + "A LIVING WISDOM.".
 */
export const SceneMagic: React.FC = () => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();

	const route = useMemo(() => catmullRomSpline(ROUTE_POINTS), []);
	const drawP = easeInOutCubic(clamp((f - 8) / 40, 0, 1));
	const head = route.at(drawP);

	// slow cinematic push-in
	const scale = interpolate(f, [0, 90], [1.12, 1.24]);
	const tx = interpolate(f, [0, 90], [-24, 26]);
	const ty = interpolate(f, [0, 90], [-12, 18]);

	// stats counting
	const factsP = easeOutQuint(clamp((f - 28) / 32, 0, 1));

	// shimmer sweep on the serif line
	const serifS = spring({
		frame: f - 58,
		fps,
		config: { damping: 15, stiffness: 110 },
		durationInFrames: 30,
	});
	const shimmer = interpolate(f, [58, 84], [0, 100], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// exit push
	const exitE = easeInOutCubic(clamp((f - 80) / 10, 0, 1));

	return (
		<AbsoluteFill
			style={{
				overflow: 'hidden',
				transform: `scale(${1 + exitE * 0.07})`,
			}}
		>
			{/* ── aerial photo with cinematic push ── */}
			<Img
				src={staticFile(IMG.archipelago)}
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
				}}
			/>
			{/* grade */}
			<AbsoluteFill
				style={{
					background:
						'linear-gradient(180deg, rgba(8,10,20,0.66) 0%, rgba(8,10,20,0.2) 36%, rgba(8,10,20,0.28) 62%, rgba(8,10,20,0.74) 100%)',
				}}
			/>
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(58% 46% at 50% 56%, rgba(233,180,76,0.16), transparent 70%)',
				}}
			/>

			<Embers count={34} seed={11} />

			{/* ── glowing golden route across the archipelago ── */}
			<svg
				viewBox="0 0 1920 1080"
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
				}}
				fill="none"
			>
				<path
					d={route.d}
					stroke={C.gold}
					strokeWidth={9}
					strokeLinecap="round"
					pathLength={1}
					strokeDasharray={1}
					strokeDashoffset={1 - drawP}
					opacity={0.4}
					style={{ filter: 'blur(9px)' }}
				/>
				<path
					d={route.d}
					stroke={C.goldBright}
					strokeWidth={3.2}
					strokeLinecap="round"
					pathLength={1}
					strokeDasharray={1}
					strokeDashoffset={1 - drawP}
				/>

				{/* comet head */}
				{drawP > 0.001 && drawP < 0.999
					? (() => {
							const [hx, hy] = head;
							const [t1x, t1y] = route.at(Math.max(0, drawP - 0.02));
							const [t2x, t2y] = route.at(Math.max(0, drawP - 0.045));
							return (
								<g>
									<circle
										cx={hx}
										cy={hy}
										r={16}
										fill="rgba(247,217,138,0.35)"
										style={{ filter: 'blur(6px)' }}
									/>
									<circle cx={hx} cy={hy} r={7} fill={C.goldPale} />
									<circle cx={t1x} cy={t1y} r={4.5} fill={C.goldBright} opacity={0.8} />
									<circle cx={t2x} cy={t2y} r={3} fill={C.goldBright} opacity={0.5} />
								</g>
							);
						})()
					: null}

				{/* waypoint markers pop as the line reaches them */}
				{[1, 2, 3, 4, 5].map((k) => {
					const t = k / 5;
					const arrive = 8 + 40 * t;
					const s = spring({
						frame: f - arrive,
						fps,
						config: { damping: 12, stiffness: 190 },
						durationInFrames: 16,
					});
					if (s <= 0.001) return null;
					const [x, y] = route.at(t);
					const pulse = (f * 0.035 + k * 0.37) % 1;
					return (
						<g key={k} opacity={s}>
							<circle
								cx={x}
								cy={y}
								r={9 + pulse * 26}
								stroke={C.gold}
								strokeWidth={2}
								opacity={(1 - pulse) * 0.6}
								fill="none"
							/>
							<circle
								cx={x}
								cy={y}
								r={12}
								stroke="rgba(233,180,76,0.5)"
								strokeWidth={1.5}
								fill="none"
							/>
							<circle cx={x} cy={y} r={5} fill={C.goldBright} />
						</g>
					);
				})}
			</svg>

			{/* ── kinetic typography ── */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 300,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<KineticText
					text="INDONESIA"
					start={24}
					stagger={2}
					springDuration={30}
					damping={16}
					stiffness={120}
					fontFamily={FONT_DISPLAY}
					fontSize={206}
					color={C.cream}
					letterSpacing="0.05em"
					blur={10}
					glow="0 12px 70px rgba(233,180,76,0.5)"
					style={{ justifyContent: 'center' }}
				/>
				<GoldRule start={44} width={470} style={{ marginTop: 10 }} />
				<KineticText
					text="MORE THAN A CULTURE."
					per="word"
					start={50}
					stagger={3}
					springDuration={22}
					fontFamily={FONT_DISPLAY}
					fontSize={40}
					color={C.cream}
					letterSpacing="0.34em"
					style={{ justifyContent: 'center', marginTop: 28, opacity: 0.95 }}
				/>
				<div
					style={{
						marginTop: 18,
						fontFamily: FONT_SERIF,
						fontStyle: 'italic',
						fontSize: 84,
						letterSpacing: '0.02em',
						transform: `translateY(${(1 - serifS) * 70}px)`,
						opacity: serifS,
						background: `linear-gradient(100deg, ${C.gold} 0%, ${C.goldBright} 25%, ${C.goldPale} 50%, ${C.goldBright} 75%, ${C.gold} 100%)`,
						backgroundSize: '220% 100%',
						backgroundPosition: `${shimmer}% 0%`,
						WebkitBackgroundClip: 'text',
						backgroundClip: 'text',
						color: 'transparent',
						filter: 'drop-shadow(0 8px 34px rgba(233,180,76,0.4))',
					}}
				>
					A LIVING WISDOM.
				</div>
			</div>

			{/* ── facts bar ── */}
			<div
				style={{
					position: 'absolute',
					left: 110,
					bottom: 84,
					display: 'flex',
					alignItems: 'flex-end',
					gap: 42,
					opacity: clamp((f - 26) / 10, 0, 1),
				}}
			>
				{FACTS.map((item, i) => (
					<React.Fragment key={item.label}>
						{i > 0 ? (
							<div
								style={{
									width: 1,
									height: 58,
									background: 'rgba(233,180,76,0.28)',
								}}
							/>
						) : null}
						<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
							<div
								style={{
									fontFamily: FONT_DISPLAY,
									fontSize: 58,
									color: C.cream,
									lineHeight: 1,
								}}
							>
								{fmtId(item.v * factsP)}
								{item.suffix ? (
									<span
										style={{
											color: C.gold,
											opacity: clamp((factsP - 0.85) / 0.15, 0, 1),
										}}
									>
										{item.suffix}
									</span>
								) : null}
							</div>
							<div
								style={{
									fontFamily: FONT_UI,
									fontWeight: 700,
									fontSize: 13,
									letterSpacing: '0.3em',
									color: 'rgba(233,180,76,0.85)',
								}}
							>
								{item.label}
							</div>
						</div>
					</React.Fragment>
				))}
			</div>

			<SceneLabel index="01" title="THE MAGIC OF INDONESIA" start={4} />

			{/* exit darkening */}
			<AbsoluteFill
				style={{
					backgroundColor: '#05070E',
					opacity: exitE * 0.55,
					pointerEvents: 'none',
				}}
			/>
		</AbsoluteFill>
	);
};
