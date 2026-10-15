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
import { C, GEO_DATA } from '../constants';
import { FONT_TITLE, FONT_SERIF, FONT_MONO } from '../fonts';
import { easeOutCubic, progress } from '../utils';
import { ParticleField } from '../components/ParticleField';

export const Scene5FutureHeritage: React.FC = () => {
	const frame = useCurrentFrame(); // 0 to 270 (9.0s @ 30fps)
	const { fps } = useVideoConfig();

	// ── ACT 1: CONVERGENCE & KALEIDOSCOPE BLOOM (f0 - f95) ──
	const morphProgress = progress(frame, 0, 85);
	const mandalaRotation = frame * 0.35;
	const mandalaScale = interpolate(morphProgress, [0, 1], [0.4, 1.15], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const mandalaOpacity = interpolate(frame, [0, 20, 80, 110], [0, 0.9, 0.9, 0.25], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── ACT 2: GRAND TITLE REVEAL (f80 - f245) ──
	const titleSpring = spring({
		frame: Math.max(0, frame - 80),
		fps,
		config: { damping: 13, stiffness: 125, mass: 0.9 },
	});
	const titleScale = interpolate(titleSpring, [0, 1], [1.35, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const titleOpacity = interpolate(frame, [80, 95], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const titleDrift = interpolate(frame, [80, 270], [1, 1.04], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Subtitle & badge reveal
	const subSpring = spring({
		frame: Math.max(0, frame - 110),
		fps,
		config: { damping: 14, stiffness: 130 },
	});
	const subOpacity = interpolate(frame, [110, 125], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const subY = interpolate(subSpring, [0, 1], [25, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── ACT 3: PRESTIGE CINEMATIC OUTRO (f245 - f270) ──
	const outroFade = interpolate(frame, [248, 270], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{ backgroundColor: C.obsidian, overflow: 'hidden' }}>
			{/* ═════════ BACKGROUND ATMOSPHERE & ARCHIPELAGO WATERMARK ═════════ */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					opacity: 0.35,
					transform: `scale(${interpolate(frame, [0, 270], [1.1, 1.25], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})})`,
					transformOrigin: 'center center',
				}}
			>
				<Img
					src={staticFile('kearifan/archipelago.jpg')}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						filter: 'brightness(0.6) contrast(1.2)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'radial-gradient(circle at center, rgba(5,7,11,0.5) 0%, rgba(5,7,11,0.92) 75%, rgba(5,7,11,1) 100%)',
					}}
				/>
			</div>

			{/* ═════════ ACT 1: CONVERGING KALEIDOSCOPE MANDALA ═════════ */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(-50%, -50%) scale(${mandalaScale}) rotate(${mandalaRotation}deg)`,
					opacity: mandalaOpacity,
					pointerEvents: 'none',
				}}
			>
				<svg width="900" height="900" viewBox="0 0 900 900" fill="none">
					<defs>
						<filter id="mandalaGlow" x="-50%" y="-50%" width="200%" height="200%">
							<feDropShadow dx="0" dy="0" stdDeviation="10" floodColor={C.imperialGold} floodOpacity="0.8" />
						</filter>
					</defs>

					{/* 12 Radiant Petals combining Megamendung, Parang & Songket */}
					{Array.from({ length: 12 }).map((_, i) => (
						<g key={i} transform={`rotate(${i * 30} 450 450)`}>
							<path
								d="M450,150 C410,240 430,320 450,450 C470,320 490,240 450,150 Z"
								stroke={C.imperialGold}
								strokeWidth="2.5"
								fill={i % 2 === 0 ? C.terracotta : C.royalIndigo}
								fillOpacity="0.25"
								filter="url(#mandalaGlow)"
							/>
							<polygon points="450,120 465,150 450,180 435,150" fill={C.imperialGold} />
							<circle cx="450" cy="280" r="5" fill={C.pureWhite} />
						</g>
					))}

					<circle cx="450" cy="450" r="260" stroke={C.imperialGold} strokeWidth="2" strokeDasharray="8 6" />
					<circle cx="450" cy="450" r="180" stroke={C.subakWater} strokeWidth="2.5" />
					<circle cx="450" cy="450" r="100" stroke={C.pureWhite} strokeWidth="1.5" strokeDasharray="4 4" />
				</svg>
			</div>

			{/* ═════════ PARTICLES: GOLDEN VORTEX ═════════ */}
			<ParticleField count={90} colorMode="gold" intensity={0.85} direction="vortex" />

			{/* ═════════ ACT 2: GRAND KINETIC TITLE LOCKUP ═════════ */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 25,
					pointerEvents: 'none',
				}}
			>
				{/* Top National Identity Kicker */}
				<div
					style={{
						fontFamily: FONT_MONO,
						fontSize: 12,
						fontWeight: 700,
						letterSpacing: '0.34em',
						color: C.imperialGold,
						textTransform: 'uppercase',
						marginBottom: 18,
						opacity: interpolate(frame, [60, 85], [0, 0.9], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
						transform: `translateY(${interpolate(frame, [60, 85], [15, 0], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						})}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 16,
					}}
				>
					<span style={{ width: 40, height: 1.5, backgroundColor: C.imperialGold }} />
					<span>REPUBLIK INDONESIA • KARYA AGUNG NUSANTARA</span>
					<span style={{ width: 40, height: 1.5, backgroundColor: C.imperialGold }} />
				</div>

				{/* EPIC MAIN TITLE: "MENGENAL KEARIFAN LOKAL INDONESIA" */}
				<div
					style={{
						transform: `scale(${titleScale * titleDrift})`,
						opacity: titleOpacity,
						textAlign: 'center',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<h2
						style={{
							margin: 0,
							fontFamily: FONT_TITLE,
							fontSize: 54,
							fontWeight: 900,
							letterSpacing: '0.18em',
							color: C.pureWhite,
							textTransform: 'uppercase',
							lineHeight: 1.1,
							textShadow: '0 8px 30px rgba(0,0,0,0.95)',
						}}
					>
						MENGENAL KEARIFAN LOKAL
					</h2>

					<h1
						style={{
							margin: '4px 0 0',
							fontFamily: FONT_TITLE,
							fontSize: 130,
							fontWeight: 900,
							letterSpacing: '0.12em',
							color: C.pureWhite,
							background: `linear-gradient(180deg, #FFFFFF 10%, ${C.imperialGold} 60%, ${C.warmAmber} 100%)`,
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							filter:
								'drop-shadow(0 15px 40px rgba(0,0,0,0.95)) drop-shadow(0 0 55px rgba(255,200,55,0.5))',
							lineHeight: 0.95,
						}}
					>
						INDONESIA
					</h1>
				</div>

				{/* POETIC SUBTITLE & CALL TO ACTION */}
				<div
					style={{
						marginTop: 20,
						opacity: subOpacity,
						transform: `translateY(${subY}px)`,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<p
						style={{
							margin: 0,
							fontFamily: FONT_SERIF,
							fontStyle: 'italic',
							fontSize: 30,
							fontWeight: 600,
							letterSpacing: '0.1em',
							color: C.offWhite,
							textShadow: '0 4px 20px rgba(0,0,0,0.9)',
						}}
					>
						Discovering Indonesia’s Local Wisdom
					</p>

					<div
						style={{
							marginTop: 6,
							padding: '8px 28px',
							borderRadius: 30,
							border: `1.5px solid ${C.imperialGold}`,
							backgroundColor: 'rgba(255, 200, 55, 0.12)',
							boxShadow: '0 0 25px rgba(255, 200, 55, 0.25)',
							display: 'flex',
							alignItems: 'center',
							gap: 12,
						}}
					>
						<span
							style={{
								fontFamily: FONT_MONO,
								fontSize: 12,
								fontWeight: 700,
								letterSpacing: '0.24em',
								color: C.imperialGold,
								textTransform: 'uppercase',
							}}
						>
							LESTARIKAN WARISAN • RAYAKAN MASA DEPAN
						</span>
					</div>

					<div
						style={{
							marginTop: 10,
							fontFamily: FONT_MONO,
							fontSize: 11,
							letterSpacing: '0.26em',
							color: C.offWhite,
							opacity: 0.65,
						}}
					>
						{GEO_DATA.nusantaraCoordinates} • 17,508 ISLANDS • BHINNEKA TUNGGAL IKA
					</div>
				</div>
			</div>

			{/* ═════════ ACT 3: PRESTIGE CINEMATIC BLACKOUT ═════════ */}
			{outroFade > 0 && (
				<AbsoluteFill
					style={{
						backgroundColor: C.obsidian,
						opacity: outroFade,
						zIndex: 60,
					}}
				/>
			)}
		</AbsoluteFill>
	);
};
