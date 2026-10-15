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
import { MegamendungCloud, BatikKawungUnit } from '../components/IndonesianPatterns';
import { ParticleField } from '../components/ParticleField';

export const Scene1Archipelago: React.FC = () => {
	const frame = useCurrentFrame(); // 0 to 270 (9.0s @ 30fps)
	const { fps } = useVideoConfig();

	// ── Camera Motion (9.0s luxurious drift) ──
	const camScale = interpolate(frame, [0, 270], [1.06, 1.25], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const camPanX = interpolate(frame, [0, 270], [0, -35], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Fade in from dark void
	const bgFade = interpolate(frame, [0, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Exit flash into Scene 2 (f258 - f270)
	const exitFlash = interpolate(frame, [258, 270], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── Golden Tracer Line Animation ──
	// Traces archipelago path from Sabang to Merauke smoothly between f20 and f140
	const lineProgress = progress(frame, 20, 140);
	const linePathLength = 1600;
	const strokeDashoffset = linePathLength * (1 - lineProgress);

	// Pulsed cultural nodes timed naturally
	const nodes = [
		{ name: 'SABANG', x: 260, y: 440, trigger: 30 },
		{ name: 'JAKARTA', x: 580, y: 690, trigger: 58 },
		{ name: 'YOGYAKARTA', x: 670, y: 720, trigger: 78 },
		{ name: 'BALI', x: 820, y: 750, trigger: 98 },
		{ name: 'MAKASSAR', x: 1040, y: 610, trigger: 118 },
		{ name: 'RAJA AMPAT', x: 1420, y: 550, trigger: 138 },
	];

	// ── Kinetic Typography "INDONESIA" ──
	// Enters at f125, stays on screen until f270 (nearly 5 full seconds!)
	const textSpring = spring({
		frame: Math.max(0, frame - 125),
		fps,
		config: { damping: 13, stiffness: 120, mass: 0.9 },
	});
	const textScale = interpolate(textSpring, [0, 1], [1.45, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const textOpacity = interpolate(frame, [125, 140], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const textTracking = interpolate(frame, [125, 270], [0.08, 0.16], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── Subtitle "MORE THAN A CULTURE. A LIVING WISDOM." ──
	const subSpring = spring({
		frame: Math.max(0, frame - 165),
		fps,
		config: { damping: 14, stiffness: 130 },
	});
	const subOpacity = interpolate(frame, [165, 180], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const subY = interpolate(subSpring, [0, 1], [25, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{ backgroundColor: C.obsidian, overflow: 'hidden' }}>
			{/* ═════════ 3D SATELLITE ARCHIPELAGO IMAGE BACKDROP ═════════ */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					transform: `scale(${camScale}) translateX(${camPanX}px)`,
					transformOrigin: 'center center',
					opacity: bgFade,
				}}
			>
				<Img
					src={staticFile('kearifan/archipelago.jpg')}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						filter: 'brightness(0.95) contrast(1.15)',
					}}
				/>
				{/* Dark radial glow overlay for maximum typography readability */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'radial-gradient(ellipse at 50% 55%, rgba(5,7,11,0.45) 0%, rgba(5,7,11,0.85) 75%, rgba(5,7,11,0.98) 100%)',
					}}
				/>
			</div>

			{/* ═════════ FLOATING INDONESIAN ORNAMENTAL PATTERNS ═════════ */}
			{/* Top Left Megamendung Cloud */}
			<div
				style={{
					position: 'absolute',
					top: 60,
					left: 40,
					transform: `translate(${Math.sin(frame * 0.02) * 15}px, ${Math.cos(frame * 0.02) * 8}px)`,
					opacity: interpolate(frame, [15, 50], [0, 0.55], {
						extrapolateRight: 'clamp',
					}),
					filter: 'drop-shadow(0 0 15px rgba(255,200,55,0.4))',
				}}
			>
				<MegamendungCloud width={280} height={120} color={C.imperialGold} />
			</div>

			{/* Bottom Right Megamendung Cloud */}
			<div
				style={{
					position: 'absolute',
					bottom: 70,
					right: 50,
					transform: `scaleX(-1) translate(${Math.sin(frame * 0.025) * 12}px, ${Math.cos(frame * 0.025) * 8}px)`,
					opacity: interpolate(frame, [30, 70], [0, 0.45], {
						extrapolateRight: 'clamp',
					}),
					filter: 'drop-shadow(0 0 15px rgba(255,200,55,0.3))',
				}}
			>
				<MegamendungCloud width={320} height={135} color={C.warmAmber} />
			</div>

			{/* Center Kawung Watermark Lattice */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: `translate(-50%, -50%) rotate(${frame * 0.05}deg)`,
					opacity: interpolate(frame, [25, 90], [0, 0.16], {
						extrapolateRight: 'clamp',
					}),
					pointerEvents: 'none',
				}}
			>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 140px)', gap: 10 }}>
					{Array.from({ length: 9 }).map((_, i) => (
						<BatikKawungUnit key={i} size={140} color={C.imperialGold} strokeWidth={1.5} />
					))}
				</div>
			</div>

			{/* ═════════ GOLDEN TRACER LINE & GEOGRAPHIC NODES ═════════ */}
			<svg
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					pointerEvents: 'none',
					zIndex: 6,
				}}
				viewBox="0 0 1920 1080"
			>
				<defs>
					<filter id="tracerGlow" x="-50%" y="-50%" width="200%" height="200%">
						<feDropShadow dx="0" dy="0" stdDeviation="5" floodColor={C.imperialGold} floodOpacity="0.9" />
						<feDropShadow dx="0" dy="0" stdDeviation="12" floodColor={C.warmAmber} floodOpacity="0.6" />
					</filter>
				</defs>

				{/* Glowing curved trajectory connecting Indonesian archipelago */}
				<path
					d="M260,440 C340,490 440,590 580,690 C620,705 650,715 670,720 C730,735 770,745 820,750 C920,720 980,660 1040,610 C1140,570 1280,590 1420,550 C1560,520 1680,610 1780,690"
					fill="none"
					stroke={C.imperialGold}
					strokeWidth="3.5"
					strokeDasharray={linePathLength}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
					filter="url(#tracerGlow)"
				/>

				{/* Luminous pulsed nodes */}
				{nodes.map((node, idx) => {
					if (frame < node.trigger) return null;
					const nodeAge = frame - node.trigger;
					const ringScale = interpolate(nodeAge, [0, 50], [0.5, 2.5], {
						extrapolateRight: 'clamp',
					});
					const ringOpacity = interpolate(nodeAge, [0, 50], [0.9, 0], {
						extrapolateRight: 'clamp',
					});

					return (
						<g key={idx}>
							{/* Expanding radar pulse */}
							<circle
								cx={node.x}
								cy={node.y}
								r={14 * ringScale}
								fill="none"
								stroke={C.imperialGold}
								strokeWidth="1.5"
								opacity={ringOpacity}
							/>
							{/* Node core */}
							<circle cx={node.x} cy={node.y} r={5} fill={C.pureWhite} filter="url(#tracerGlow)" />
							{/* Node label */}
							<text
								x={node.x}
								y={node.y - 14}
								textAnchor="middle"
								fill={C.imperialGold}
								fontFamily={FONT_MONO}
								fontSize={11}
								letterSpacing="0.14em"
								fontWeight="700"
								opacity={interpolate(nodeAge, [0, 15], [0, 0.9], {
									extrapolateRight: 'clamp',
								})}
							>
								{node.name}
							</text>
						</g>
					);
				})}
			</svg>

			{/* ═════════ PARTICLES: FLOATING GOLDEN STARDUST ═════════ */}
			<ParticleField count={80} colorMode="gold" intensity={0.9} speedMultiplier={0.7} />

			{/* ═════════ BOLD KINETIC TYPOGRAPHY LOCKUP ═════════ */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 20,
					pointerEvents: 'none',
				}}
			>
				{/* Top metadata kicker */}
				<div
					style={{
						fontFamily: FONT_MONO,
						fontSize: 13,
						fontWeight: 700,
						letterSpacing: '0.32em',
						color: C.imperialGold,
						textTransform: 'uppercase',
						marginBottom: 16,
						opacity: interpolate(frame, [80, 110], [0, 0.85], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}),
						transform: `translateY(${interpolate(frame, [80, 110], [12, 0], {
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						})}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<span style={{ width: 30, height: 1.5, backgroundColor: C.imperialGold }} />
					<span>KEMENPAREKRAF // EXPEDITION NUSANTARA</span>
					<span style={{ width: 30, height: 1.5, backgroundColor: C.imperialGold }} />
				</div>

				{/* GIANT "INDONESIA" TITLE */}
				<div
					style={{
						transform: `scale(${textScale})`,
						opacity: textOpacity,
						textAlign: 'center',
					}}
				>
					<h1
						style={{
							margin: 0,
							fontFamily: FONT_TITLE,
							fontSize: 148,
							fontWeight: 900,
							letterSpacing: `${textTracking}em`,
							color: C.pureWhite,
							background: `linear-gradient(180deg, #FFFFFF 15%, ${C.imperialGold} 65%, ${C.warmAmber} 100%)`,
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							filter:
								'drop-shadow(0 15px 35px rgba(0,0,0,0.9)) drop-shadow(0 0 50px rgba(255,200,55,0.4))',
							lineHeight: 0.95,
						}}
					>
						INDONESIA
					</h1>
				</div>

				{/* SUBTITLE: "MORE THAN A CULTURE. A LIVING WISDOM." */}
				<div
					style={{
						marginTop: 22,
						opacity: subOpacity,
						transform: `translateY(${subY}px)`,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<p
						style={{
							margin: 0,
							fontFamily: FONT_SERIF,
							fontStyle: 'italic',
							fontSize: 34,
							fontWeight: 600,
							letterSpacing: '0.12em',
							color: C.offWhite,
							textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 0 20px rgba(255,200,55,0.3)',
						}}
					>
						More Than A Culture. A Living Wisdom.
					</p>

					{/* Coordinates telemetry badge */}
					<div
						style={{
							marginTop: 12,
							fontFamily: FONT_MONO,
							fontSize: 11,
							letterSpacing: '0.22em',
							color: C.imperialGold,
							opacity: 0.7,
						}}
					>
						{GEO_DATA.nusantaraCoordinates} • {GEO_DATA.islandCount} ISLANDS
					</div>
				</div>
			</div>

			{/* ═════════ EXIT FLASH TRANSITION (f258 - f270) ═════════ */}
			{exitFlash > 0 && (
				<AbsoluteFill
					style={{
						backgroundColor: C.pureWhite,
						opacity: exitFlash * 0.85,
						mixBlendMode: 'screen',
						zIndex: 50,
					}}
				/>
			)}
		</AbsoluteFill>
	);
};
