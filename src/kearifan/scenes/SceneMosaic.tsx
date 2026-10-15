import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { BatikGrid } from '../components/Batik';
import { KineticText } from '../components/KineticText';
import { LocalFlash, SceneLabel } from '../components/UI';
import { C } from '../constants';
import { FONT_DISPLAY, FONT_SERIF, FONT_UI } from '../fonts';
import { RumahGadang } from '../illustrations/RumahGadang';
import { Tenun } from '../illustrations/Tenun';
import { Tongkonan } from '../illustrations/Tongkonan';
import { clamp, easeInOutCubic } from '../utils';

// ── Diagonal speed streaks on card cuts ────────────────────────────────
const Streaks: React.FC<{ at?: number }> = ({ at = 0 }) => {
	const f = useCurrentFrame();
	return (
		<>
			{[
				{ y: 250, d: 0 },
				{ y: 545, d: 2 },
				{ y: 830, d: 4 },
			].map((s, i) => {
				const p = clamp((f - at - s.d) / 9, 0, 1);
				if (p <= 0 || p >= 1) return null;
				const x = interpolate(p, [0, 1], [-1500, 2600]);
				const o = Math.sin(p * Math.PI) * 0.5;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							top: s.y,
							left: 0,
							width: 640,
							height: 3,
							background: '#F7E9C9',
							transform: `translateX(${x}px) rotate(-14deg)`,
							opacity: o,
							filter: 'blur(1px)',
							pointerEvents: 'none',
						}}
					/>
				);
			})}
		</>
	);
};

// ── 0‥10 — title card ──────────────────────────────────────────────────
const IntroCard: React.FC = () => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();
	const s1 = spring({
		frame: f,
		fps,
		config: { damping: 17, stiffness: 110, mass: 0.9 },
		durationInFrames: 20,
	});
	const s2 = spring({
		frame: f - 1,
		fps,
		config: { damping: 17, stiffness: 110, mass: 0.9 },
		durationInFrames: 20,
	});
	return (
		<AbsoluteFill style={{ backgroundColor: C.terracottaDeep }}>
			<BatikGrid
				f={999}
				cols={8}
				rows={5}
				cell={240}
				color={C.cream}
				colorAlt={C.cream}
				strokeWidth={3}
				opacity={0.1}
				style={{ position: 'absolute', left: -90, top: -120 }}
			/>
			<div
				style={{
					position: 'absolute',
					left: 190,
					top: 356,
					opacity: s1,
					transform: `translateX(${(1 - s1) * -860}px) skewX(-8deg)`,
				}}
			>
				<span
					style={{
						fontFamily: FONT_DISPLAY,
						fontSize: 152,
						color: C.cream,
						letterSpacing: '0.02em',
						lineHeight: 1,
					}}
				>
					A MOSAIC
				</span>
			</div>
			<div
				style={{
					position: 'absolute',
					right: 200,
					top: 526,
					opacity: s2,
					transform: `translateX(${(1 - s2) * 860}px) skewX(-8deg)`,
				}}
			>
				<span
					style={{
						fontFamily: FONT_DISPLAY,
						fontSize: 152,
						color: 'transparent',
						WebkitTextStroke: `3px ${C.goldBright}`,
						letterSpacing: '0.02em',
						lineHeight: 1,
					}}
				>
					OF DIVERSITY
				</span>
			</div>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 782,
					textAlign: 'center',
					opacity: clamp((f - 5) / 6, 0, 1),
				}}
			>
				<span
					style={{
						fontFamily: FONT_UI,
						fontWeight: 800,
						fontSize: 16,
						letterSpacing: '0.4em',
						color: 'rgba(243,233,210,0.85)',
					}}
				>
					SUMATERA · JAWA · KALIMANTAN · SULAWESI · PAPUA
				</span>
			</div>
		</AbsoluteFill>
	);
};

// ── 10‥33 — Rumah Gadang card ──────────────────────────────────────────
const GadangCard: React.FC = () => {
	const f = useCurrentFrame();
	const textIn = (delay: number, dur = 8) =>
		clamp((f - delay) / dur, 0, 1);
	return (
		<AbsoluteFill style={{ backgroundColor: C.terracotta }}>
			<Streaks at={0} />
			<div style={{ position: 'absolute', left: 120, top: 320 }}>
				<RumahGadang f={f} />
			</div>
			<div style={{ position: 'absolute', left: 830, top: 262 }}>
				<KineticText
					text="RUMAH GADANG"
					start={4}
					stagger={1.6}
					springDuration={26}
					fontFamily={FONT_DISPLAY}
					fontSize={92}
					color={C.cream}
					blur={10}
				/>
				<div
					style={{
						fontFamily: FONT_SERIF,
						fontStyle: 'italic',
						fontSize: 46,
						color: C.goldBright,
						marginTop: 14,
						opacity: textIn(8),
						transform: `translateY(${(1 - textIn(8)) * 30}px)`,
					}}
				>
					Sumatera Barat
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						marginTop: 34,
						opacity: textIn(11),
					}}
				>
					<div style={{ width: 44, height: 2, background: C.gold }} />
					<span
						style={{
							fontFamily: FONT_UI,
							fontWeight: 700,
							fontSize: 14,
							letterSpacing: '0.2em',
							color: 'rgba(243,233,210,0.82)',
						}}
					>
						00°57′ S · 100°21′ E
					</span>
				</div>
				<div
					style={{
						fontFamily: FONT_SERIF,
						fontStyle: 'italic',
						fontSize: 30,
						color: 'rgba(243,233,210,0.9)',
						marginTop: 22,
						opacity: textIn(14),
					}}
				>
					atap gonjong setinggi kebersamaan
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ── 33‥55 — Tongkonan card ─────────────────────────────────────────────
const TongkonanCard: React.FC = () => {
	const f = useCurrentFrame();
	const textIn = (delay: number, dur = 8) =>
		clamp((f - delay) / dur, 0, 1);
	return (
		<AbsoluteFill style={{ backgroundColor: C.indigo }}>
			<Streaks at={0} />
			<div style={{ position: 'absolute', left: 1120, top: 302 }}>
				<Tongkonan f={f} />
			</div>
			<div style={{ position: 'absolute', left: 170, top: 296 }}>
				<KineticText
					text="TONGKONAN"
					start={4}
					stagger={1.6}
					springDuration={26}
					fontFamily={FONT_DISPLAY}
					fontSize={92}
					color={C.cream}
					blur={10}
				/>
				<div
					style={{
						fontFamily: FONT_SERIF,
						fontStyle: 'italic',
						fontSize: 46,
						color: C.goldBright,
						marginTop: 14,
						opacity: textIn(8),
						transform: `translateY(${(1 - textIn(8)) * 30}px)`,
					}}
				>
					Tana Toraja — Sulawesi Selatan
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						marginTop: 34,
						opacity: textIn(11),
					}}
				>
					<div style={{ width: 44, height: 2, background: C.gold }} />
					<span
						style={{
							fontFamily: FONT_UI,
							fontWeight: 700,
							fontSize: 14,
							letterSpacing: '0.2em',
							color: 'rgba(243,233,210,0.82)',
						}}
					>
						02°58′ S · 119°53′ E
					</span>
				</div>
				<div
					style={{
						fontFamily: FONT_SERIF,
						fontStyle: 'italic',
						fontSize: 30,
						color: 'rgba(243,233,210,0.9)',
						marginTop: 22,
						opacity: textIn(14),
					}}
				>
					atap perahu, tanduk kebesaran leluhur
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ── 55‥73 — Tenun card ─────────────────────────────────────────────────
const TenunCard: React.FC = () => {
	const f = useCurrentFrame();
	const textIn = (delay: number, dur = 7) => clamp((f - delay) / dur, 0, 1);
	return (
		<AbsoluteFill style={{ backgroundColor: C.emeraldDeep }}>
			<Streaks at={0} />
			<div style={{ position: 'absolute', left: 150, top: 104 }}>
				<KineticText
					text="TENUN & IKAT"
					start={2}
					stagger={1.4}
					springDuration={24}
					fontFamily={FONT_DISPLAY}
					fontSize={84}
					color={C.cream}
					blur={9}
				/>
				<div
					style={{
						fontFamily: FONT_SERIF,
						fontStyle: 'italic',
						fontSize: 42,
						color: C.goldBright,
						marginTop: 12,
						opacity: textIn(5),
						transform: `translateY(${(1 - textIn(5)) * 28}px)`,
					}}
				>
					Nusantara
				</div>
				<div
					style={{
						fontFamily: FONT_SERIF,
						fontStyle: 'italic',
						fontSize: 28,
						color: 'rgba(243,233,210,0.88)',
						marginTop: 14,
						opacity: textIn(8),
					}}
				>
					benang demi benang, doa demi doa
				</div>
			</div>
			<div style={{ position: 'absolute', left: 380, top: 330 }}>
				<Tenun f={Math.max(0, f - 1)} />
			</div>
		</AbsoluteFill>
	);
};

// ── 73‥90 — recap mosaic strips ────────────────────────────────────────
interface Strip {
	color: string;
	label: string;
	sub: string;
	illu: React.ReactNode;
	scale: number;
	illuW: number;
	illuH: number;
}

const RecapStrips: React.FC = () => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();
	const bgP = clamp(f / 3, 0, 1);
	const exitP = easeInOutCubic(clamp((f - 13) / 4, 0, 1));

	const strips: Strip[] = [
		{
			color: C.terracotta,
			label: 'RUMAH GADANG',
			sub: 'Sumatera Barat',
			illu: <RumahGadang f={80} />,
			scale: 0.4,
			illuW: 620,
			illuH: 420,
		},
		{
			color: C.indigo,
			label: 'TONGKONAN',
			sub: 'Sulawesi Selatan',
			illu: <Tongkonan f={80} />,
			scale: 0.4,
			illuW: 680,
			illuH: 470,
		},
		{
			color: C.emeraldDeep,
			label: 'TENUN & IKAT',
			sub: 'Nusantara',
			illu: <Tenun f={80} />,
			scale: 0.36,
			illuW: 1160,
			illuH: 580,
		},
	];

	return (
		<AbsoluteFill style={{ backgroundColor: `rgba(11,14,23,${0.94 * bgP})` }}>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 116,
					textAlign: 'center',
					opacity: clamp((f - 2) / 8, 0, 1),
				}}
			>
				<span
					style={{
						fontFamily: FONT_SERIF,
						fontStyle: 'italic',
						fontSize: 46,
						color: C.cream,
					}}
				>
					One mosaic. Many stories.
				</span>
			</div>
			{strips.map((s, i) => {
				const sp = spring({
					frame: f - 2 - i * 3,
					fps,
					config: { damping: 16, stiffness: 110 },
					durationInFrames: 24,
				});
				const x = 480 + i * 330;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: x,
							top: 210,
							width: 300,
							height: 560,
							borderRadius: 16,
							backgroundColor: s.color,
							opacity: sp * (1 - exitP),
							transform: `translateY(${(1 - sp) * 140 + exitP * (620 + i * 40)}px)`,
							overflow: 'hidden',
							boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
							border: '1px solid rgba(233,180,76,0.25)',
						}}
					>
						<div
							style={{
								position: 'absolute',
								left: (300 - s.illuW * s.scale) / 2,
								top: 66,
								width: s.illuW,
								height: s.illuH,
								transform: `scale(${s.scale})`,
								transformOrigin: 'top left',
								opacity: 0.95,
							}}
						>
							{s.illu}
						</div>
						<div
							style={{
								position: 'absolute',
								left: 0,
								right: 0,
								bottom: 28,
								textAlign: 'center',
							}}
						>
							<div
								style={{
									fontFamily: FONT_UI,
									fontWeight: 800,
									fontSize: 15,
									letterSpacing: '0.2em',
									color: C.cream,
								}}
							>
								{s.label}
							</div>
							<div
								style={{
									fontFamily: FONT_SERIF,
									fontStyle: 'italic',
									fontSize: 21,
									color: 'rgba(243,233,210,0.82)',
									marginTop: 6,
								}}
							>
								{s.sub}
							</div>
						</div>
					</div>
				);
			})}
		</AbsoluteFill>
	);
};

/**
 * [9.0 – 12.0 s] 04 / A MOSAIC OF DIVERSITY
 * Fast montage: title card → Rumah Gadang → Tongkonan → Tenun → recap.
 */
export const SceneMosaic: React.FC = () => {
	return (
		<AbsoluteFill style={{ overflow: 'hidden' }}>
			<Sequence from={0} durationInFrames={10} name="Intro">
				<IntroCard />
			</Sequence>
			<Sequence from={10} durationInFrames={23} name="Rumah Gadang">
				<GadangCard />
			</Sequence>
			<Sequence from={33} durationInFrames={22} name="Tongkonan">
				<TongkonanCard />
			</Sequence>
			<Sequence from={55} durationInFrames={18} name="Tenun">
				<TenunCard />
			</Sequence>
			<Sequence from={73} durationInFrames={17} name="Recap">
				<RecapStrips />
			</Sequence>
			<LocalFlash at={10} />
			<LocalFlash at={33} />
			<LocalFlash at={55} />
			<SceneLabel index="04" title="A MOSAIC OF DIVERSITY" start={1} />
		</AbsoluteFill>
	);
};
