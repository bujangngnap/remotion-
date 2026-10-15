import React from 'react';
import {
	AbsoluteFill,
	Img,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { FlowPath } from '../components/FlowPath';
import { KineticText } from '../components/KineticText';
import {
	GlassChip,
	IconDrop,
	IconHouse,
	IconPeople,
	SceneLabel,
} from '../components/UI';
import { C, IMG } from '../constants';
import { FONT_DISPLAY, FONT_SERIF, FONT_UI } from '../fonts';
import { clamp, easeInOutCubic, easeOutCubic } from '../utils';

const NODES: [number, number][] = [
	[300, 300],
	[430, 240],
	[560, 320],
	[690, 250],
	[610, 420],
	[750, 368],
	[470, 432],
	[330, 470],
];

const EDGES: [number, number][] = [
	[0, 1],
	[1, 2],
	[2, 3],
	[1, 4],
	[2, 5],
	[4, 5],
	[4, 6],
	[5, 6],
	[0, 7],
	[6, 7],
];

const WATER_A: [number, number][] = [
	[110, 900],
	[420, 812],
	[760, 872],
	[1020, 828],
];
const WATER_B: [number, number][] = [
	[260, 1000],
	[600, 918],
	[980, 972],
	[1340, 912],
];
const WATER_C: [number, number][] = [
	[1180, 790],
	[1420, 726],
	[1690, 790],
	[1880, 752],
];

/**
 * [6.0 – 9.0 s] 03 / WISDOM IN EVERYDAY LIFE
 * Subak terraces with flowing water lines and droplets, a gotong-royong
 * network of connecting nodes, philosophy line, icon chips.
 */
export const SceneWisdom: React.FC = () => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();

	const scale = interpolate(f, [0, 90], [1.16, 1.05]);
	const tx = interpolate(f, [0, 90], [18, -18]);

	const exit = clamp((f - 80) / 10, 0, 1);
	const exitE = easeInOutCubic(exit);

	// leader line to the network cluster
	const leaderP = easeOutCubic(clamp((f - 52) / 8, 0, 1));

	return (
		<AbsoluteFill
			style={{ overflow: 'hidden', transform: `scale(${1 + exitE * 0.1})` }}
		>
			<Img
				src={staticFile(IMG.subak)}
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					transform: `translateX(${tx}px) scale(${scale})`,
					filter: 'saturate(1.06) contrast(1.03) brightness(1.02)',
				}}
			/>
			<AbsoluteFill
				style={{
					background:
						'linear-gradient(180deg, rgba(8,12,16,0.6) 0%, rgba(8,12,16,0.08) 32%, rgba(8,12,16,0.14) 60%, rgba(8,12,16,0.66) 100%)',
				}}
			/>
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(50% 40% at 62% 30%, rgba(233,180,76,0.2), transparent 70%)',
				}}
			/>

			{/* ── flowing subak water ── */}
			<FlowPath
				points={WATER_A}
				start={22}
				width={5}
				color="#43C08C"
				droplets={5}
				flowSpeed={0.011}
				dropletR={4.5}
			/>
			<FlowPath
				points={WATER_B}
				start={30}
				width={4.5}
				color="#43C08C"
				droplets={6}
				flowSpeed={0.013}
				dropletR={4}
				opacity={0.8}
			/>
			<FlowPath
				points={WATER_C}
				start={38}
				width={4.5}
				color="#43C08C"
				droplets={4}
				flowSpeed={0.014}
				dropletR={4}
				opacity={0.8}
			/>

			{/* ── gotong royong network ── */}
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
				{EDGES.map(([a, b], ei) => {
					const p = clamp((f - 34 - ei * 2.2) / 8, 0, 1);
					if (p <= 0) return null;
					const e = easeOutCubic(p);
					return (
						<line
							key={ei}
							x1={NODES[a][0]}
							y1={NODES[a][1]}
							x2={NODES[b][0]}
							y2={NODES[b][1]}
							stroke="rgba(243,233,210,0.42)"
							strokeWidth={2}
							pathLength={1}
							strokeDasharray={1}
							strokeDashoffset={1 - e}
						/>
					);
				})}
				{NODES.map(([x, y], i) => {
					const s = spring({
						frame: f - 36 - i * 2.5,
						fps,
						config: { damping: 13, stiffness: 160 },
						durationInFrames: 18,
					});
					if (s <= 0.001) return null;
					const pulse = (f * 0.03 + i * 0.3) % 1;
					return (
						<g key={i} opacity={s}>
							<circle
								cx={x}
								cy={y}
								r={7 + pulse * 22}
								stroke={C.gold}
								strokeWidth={1.6}
								opacity={(1 - pulse) * 0.5}
								fill="none"
							/>
							<circle cx={x} cy={y} r={5.5} fill={C.goldBright} />
						</g>
					);
				})}
				{/* leader line to label */}
				{leaderP > 0 ? (
					<path
						d="M 750 368 L 900 296 L 1016 296"
						stroke="rgba(233,180,76,0.8)"
						strokeWidth={1.6}
						pathLength={1}
						strokeDasharray={1}
						strokeDashoffset={1 - leaderP}
					/>
				) : null}
			</svg>

			{/* network label */}
			<div
				style={{
					position: 'absolute',
					left: 1028,
					top: 272,
					opacity: clamp((f - 54) / 8, 0, 1),
				}}
			>
				<div
					style={{
						fontFamily: FONT_UI,
						fontWeight: 800,
						fontSize: 15,
						letterSpacing: '0.3em',
						color: C.gold,
					}}
				>
					GOTONG ROYONG
				</div>
				<div
					style={{
						marginTop: 6,
						fontFamily: FONT_SERIF,
						fontStyle: 'italic',
						fontSize: 24,
						color: 'rgba(243,233,210,0.78)',
					}}
				>
					kerja bersama untuk sesama
				</div>
			</div>

			{/* ── headline ── */}
			<div style={{ position: 'absolute', left: 110, top: 196 }}>
				<KineticText
					text="WISDOM IN"
					start={6}
					stagger={1.4}
					springDuration={28}
					damping={16}
					stiffness={120}
					fontFamily={FONT_DISPLAY}
					fontSize={96}
					color={C.cream}
					blur={8}
					glow="0 10px 50px rgba(0,0,0,0.6)"
				/>
				<KineticText
					text="EVERYDAY LIFE"
					start={10}
					stagger={1.4}
					springDuration={28}
					damping={16}
					stiffness={120}
					fontFamily={FONT_DISPLAY}
					fontSize={96}
					color={C.cream}
					blur={8}
					glow="0 10px 50px rgba(0,0,0,0.6)"
				/>
				<div
					style={{
						marginTop: 20,
						fontFamily: FONT_SERIF,
						fontStyle: 'italic',
						fontSize: 40,
						color: C.goldBright,
						opacity: clamp((f - 18) / 10, 0, 1),
						transform: `translateY(${(1 - clamp((f - 18) / 10, 0, 1)) * 26}px)`,
						textShadow: '0 6px 30px rgba(0,0,0,0.6)',
					}}
				>
					Tri Hita Karana — harmoni manusia, alam, dan pencipta.
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						marginTop: 16,
						opacity: clamp((f - 24) / 8, 0, 1),
					}}
				>
					<div style={{ width: 36, height: 2, background: C.gold }} />
					<span
						style={{
							fontFamily: FONT_UI,
							fontWeight: 800,
							fontSize: 13,
							letterSpacing: '0.32em',
							color: 'rgba(243,233,210,0.85)',
						}}
					>
						FILOSOFI BALI
					</span>
				</div>
			</div>

			{/* ── bottom chips ── */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 84,
					display: 'flex',
					justifyContent: 'center',
					gap: 16,
				}}
			>
				<GlassChip start={58} icon={<IconDrop />}>
					SUBAK — irigasi warisan Bali
				</GlassChip>
				<GlassChip start={62} icon={<IconPeople />}>
					GOTONG ROYONG — bersama membangun
				</GlassChip>
				<GlassChip start={66} icon={<IconHouse />}>
					RUMAH ADAT — selaras alam
				</GlassChip>
			</div>

			{/* exit: golden iris ring from the temple */}
			{exit > 0 ? (
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
					<circle
						cx={1382}
						cy={594}
						r={interpolate(exitE, [0, 1], [20, 1600])}
						stroke={C.gold}
						strokeWidth={3}
						opacity={(1 - exit) * 0.85}
					/>
				</svg>
			) : null}
			<AbsoluteFill
				style={{
					backgroundColor: '#05070E',
					opacity: exit * 0.45,
					pointerEvents: 'none',
				}}
			/>

			<SceneLabel index="03" title="WISDOM IN EVERYDAY LIFE" start={2} />
		</AbsoluteFill>
	);
};
