import React from 'react';
import {
	AbsoluteFill,
	Img,
	interpolate,
	staticFile,
	useCurrentFrame,
} from 'remotion';
import { C } from '../constants';
import { FONT_TITLE, FONT_SERIF, FONT_MONO } from '../fonts';
import { easeOutCubic, progress } from '../utils';
import { ParticleField } from '../components/ParticleField';

export const Scene3WisdomLife: React.FC = () => {
	const frame = useCurrentFrame(); // 0 to 270 (9.0s @ 30fps)

	// ── ACT 1: SUBAK BALI TERRACES & FLOWING WATER (f0 - f125) ──
	const subakScale = interpolate(frame, [0, 125], [1.05, 1.22], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const subakPanY = interpolate(frame, [0, 125], [0, -30], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const subakOpacity = interpolate(frame, [0, 15, 115, 125], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Animated flowing water dash offset along canals
	const waterDash = frame * 10;

	// ── ACT 2: GOTONG ROYONG COMMUNITY NETWORK (f115 - f215) ──
	const gotongOpacity = interpolate(frame, [115, 125, 205, 215], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Gotong Royong community nodes
	const communityNodes = [
		{ x: 960, y: 540, label: 'KAMPUNG', size: 14, isCenter: true },
		{ x: 680, y: 420, label: 'PETANI', size: 10 },
		{ x: 1240, y: 440, label: 'PENGRAJIN', size: 10 },
		{ x: 740, y: 680, label: 'TETUA ADAT', size: 10 },
		{ x: 1180, y: 670, label: 'PEMUDA', size: 10 },
		{ x: 520, y: 550, label: 'WARGA', size: 8 },
		{ x: 1400, y: 560, label: 'KELUARGA', size: 8 },
	];

	// Line connections between center and nodes
	const netProgress = progress(frame, 125, 175);

	// ── ACT 3: SACRED HARMONY FINALE (f205 - f270) ──
	const harmonyOpacity = interpolate(frame, [205, 215, 262, 270], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const mandalaScale = interpolate(frame, [205, 270], [0.8, 1.3], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{ backgroundColor: C.obsidian, overflow: 'hidden' }}>
			{/* ════════════════════════════════════════════════════════════════════
			    ACT 1: SUBAK BALI — SACRED TERRACED WATERWAYS (f0 - f125)
			════════════════════════════════════════════════════════════════════ */}
			{frame < 125 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: subakOpacity,
					}}
				>
					{/* Photographic Subak Rice Terraces Background */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							transform: `scale(${subakScale}) translateY(${subakPanY}px)`,
							transformOrigin: '50% 50%',
						}}
					>
						<Img
							src={staticFile('kearifan/subak_terrace.jpg')}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								filter: 'brightness(0.95) contrast(1.12)',
							}}
						/>
						{/* Emerald vignette for cinematic immersion */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'radial-gradient(ellipse at 50% 60%, rgba(13,123,84,0.15) 0%, rgba(5,7,11,0.7) 70%, rgba(5,7,11,0.95) 100%)',
							}}
						/>
					</div>

					{/* Glowing Animated Water Currents Tracing Irrigation Channels */}
					<svg
						style={{
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
							pointerEvents: 'none',
						}}
						viewBox="0 0 1920 1080"
					>
						<defs>
							<filter id="waterGlow" x="-50%" y="-50%" width="200%" height="200%">
								<feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={C.subakWater} floodOpacity="0.8" />
							</filter>
						</defs>

						{/* Main cascading canal down the rice terraces */}
						<path
							d="M960,180 C840,320 890,460 760,620 C680,720 720,860 620,1080"
							stroke={C.subakWater}
							strokeWidth="4"
							strokeLinecap="round"
							fill="none"
							strokeDasharray="20 12"
							strokeDashoffset={-waterDash}
							filter="url(#waterGlow)"
						/>
						{/* Branching secondary canal left */}
						<path
							d="M840,320 C640,360 480,480 320,540"
							stroke={C.subakWater}
							strokeWidth="3"
							strokeLinecap="round"
							fill="none"
							strokeDasharray="16 10"
							strokeDashoffset={-waterDash * 0.8}
							filter="url(#waterGlow)"
							opacity="0.85"
						/>
						{/* Branching secondary canal right */}
						<path
							d="M890,460 C1100,500 1280,620 1460,720"
							stroke={C.subakWater}
							strokeWidth="3"
							strokeLinecap="round"
							fill="none"
							strokeDasharray="16 10"
							strokeDashoffset={-waterDash * 0.8}
							filter="url(#waterGlow)"
							opacity="0.85"
						/>

						{/* Concentric Water Droplet Ripples */}
						{[
							{ cx: 840, cy: 320 },
							{ cx: 760, cy: 620 },
							{ cx: 1100, cy: 500 },
						].map((pt, i) => {
							const rippleAge = (frame * 1.2 + i * 20) % 45;
							const rippleRadius = rippleAge * 2.2;
							const rippleAlpha = 1 - rippleAge / 45;
							return (
								<g key={i}>
									<circle
										cx={pt.cx}
										cy={pt.cy}
										r={rippleRadius}
										fill="none"
										stroke={C.subakWater}
										strokeWidth="1.5"
										opacity={rippleAlpha * 0.8}
									/>
									<circle cx={pt.cx} cy={pt.cy} r={4} fill={C.pureWhite} />
								</g>
							);
						})}
					</svg>

					{/* Kinetic Typography: Subak Bali */}
					<div
						style={{
							position: 'absolute',
							bottom: 80,
							left: 100,
							display: 'flex',
							flexDirection: 'column',
							gap: 6,
						}}
					>
						<span
							style={{
								fontFamily: FONT_MONO,
								fontSize: 12,
								letterSpacing: '0.28em',
								color: C.subakWater,
								fontWeight: 700,
							}}
						>
							03.1 // KEARIFAN TATA KELOLA AIR • BALI
						</span>
						<h2
							style={{
								margin: 0,
								fontFamily: FONT_TITLE,
								fontSize: 72,
								fontWeight: 900,
								color: C.pureWhite,
								letterSpacing: '0.04em',
								textShadow: '0 8px 30px rgba(0,0,0,0.9)',
							}}
						>
							SUBAK: LIVING WATER
						</h2>
						<span
							style={{
								fontFamily: FONT_SERIF,
								fontSize: 26,
								fontStyle: 'italic',
								color: C.paleMint,
							}}
						>
							Tri Hita Karana — Democratic water distribution flowing for over 1,000 years.
						</span>
					</div>
				</div>
			)}

			{/* ════════════════════════════════════════════════════════════════════
			    ACT 2: GOTONG ROYONG — COMMUNITY SYNERGY NETWORK (f115 - f215)
			════════════════════════════════════════════════════════════════════ */}
			{frame >= 115 && frame < 215 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: gotongOpacity,
						backgroundColor: '#09151D',
					}}
				>
					{/* Background Lush Tropical Village Gradient */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							background:
								'radial-gradient(circle at 50% 50%, #0D2D2B 0%, #081B1C 50%, #050E10 100%)',
						}}
					/>

					{/* Village Silhouette Vector Along Bottom */}
					<svg
						style={{
							position: 'absolute',
							bottom: 0,
							left: 0,
							width: '100%',
							height: 280,
							pointerEvents: 'none',
							opacity: 0.6,
						}}
						viewBox="0 0 1920 280"
						preserveAspectRatio="none"
					>
						<path
							d="M0,280 L0,220 Q120,180 240,230 L380,160 L450,220 L580,180 L700,240 Q850,150 960,190 Q1100,140 1240,210 L1380,170 L1520,230 Q1680,180 1800,210 L1920,190 L1920,280 Z"
							fill="#04090A"
						/>
					</svg>

					{/* Gotong Royong Connecting Constellation Nodes */}
					<svg
						style={{
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
						}}
						viewBox="0 0 1920 1080"
					>
						<defs>
							<filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
								<feDropShadow dx="0" dy="0" stdDeviation="8" floodColor={C.imperialGold} floodOpacity="0.9" />
							</filter>
						</defs>

						{/* Connecting Lines between Community Nodes */}
						{communityNodes.slice(1).map((node, i) => {
							const center = communityNodes[0];
							const currentX = interpolate(netProgress, [0, 1], [center.x, node.x], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							});
							const currentY = interpolate(netProgress, [0, 1], [center.y, node.y], {
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							});
							return (
								<g key={i}>
									<line
										x1={center.x}
										y1={center.y}
										x2={currentX}
										y2={currentY}
										stroke={C.imperialGold}
										strokeWidth="2.5"
										strokeDasharray="6 4"
										opacity={0.8}
									/>
									{netProgress >= 0.8 && (
										<circle
											cx={interpolate((frame * 0.04 + i * 0.2) % 1, [0, 1], [center.x, node.x])}
											cy={interpolate((frame * 0.04 + i * 0.2) % 1, [0, 1], [center.y, node.y])}
											r={3.5}
											fill={C.pureWhite}
											filter="url(#nodeGlow)"
										/>
									)}
								</g>
							);
						})}

						{/* Concentric Communal Harmony Rings Pulsing from Center */}
						{Array.from({ length: 3 }).map((_, ri) => {
							const rAge = (frame * 1.0 + ri * 30) % 80;
							const rRadius = 60 + rAge * 4.5;
							const rAlpha = (1 - rAge / 80) * 0.6;
							return (
								<circle
									key={ri}
									cx={communityNodes[0].x}
									cy={communityNodes[0].y}
									r={rRadius}
									fill="none"
									stroke={C.imperialGold}
									strokeWidth="1.5"
									opacity={rAlpha}
								/>
							);
						})}

						{/* Community Node Pins */}
						{communityNodes.map((node, idx) => (
							<g key={idx} transform={`translate(${node.x}, ${node.y})`}>
								<circle
									cx={0}
									cy={0}
									r={node.size * (node.isCenter ? 1.4 : 1)}
									fill={node.isCenter ? C.imperialGold : C.subakWater}
									filter="url(#nodeGlow)"
								/>
								<circle cx={0} cy={0} r={4} fill={C.pureWhite} />
								<text
									x={0}
									y={node.size + 18}
									textAnchor="middle"
									fill={C.pureWhite}
									fontFamily={FONT_MONO}
									fontSize={node.isCenter ? 13 : 11}
									fontWeight="700"
									letterSpacing="0.18em"
								>
									{node.label}
								</text>
							</g>
						))}
					</svg>

					{/* Kinetic Typography: Gotong Royong */}
					<div
						style={{
							position: 'absolute',
							top: 85,
							left: '50%',
							transform: 'translateX(-50%)',
							textAlign: 'center',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<span
							style={{
								fontFamily: FONT_MONO,
								fontSize: 12,
								letterSpacing: '0.32em',
								color: C.imperialGold,
								fontWeight: 700,
							}}
						>
							03.2 // KEHARMONISAN HIDUP • SOLIDARITAS
						</span>
						<h2
							style={{
								margin: '6px 0 0',
								fontFamily: FONT_TITLE,
								fontSize: 66,
								fontWeight: 900,
								color: C.pureWhite,
								letterSpacing: '0.06em',
								textShadow: '0 8px 30px rgba(0,0,0,0.9)',
							}}
						>
							GOTONG ROYONG
						</h2>
						<span
							style={{
								fontFamily: FONT_SERIF,
								fontSize: 24,
								fontStyle: 'italic',
								color: C.offWhite,
								marginTop: 4,
							}}
						>
							“Berat sama dipikul, ringan sama dijinjing” — The collective soul of our villages.
						</span>
					</div>
				</div>
			)}

			{/* ════════════════════════════════════════════════════════════════════
			    ACT 3: SACRED HARMONY FINALE (f205 - f270)
			════════════════════════════════════════════════════════════════════ */}
			{frame >= 205 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: harmonyOpacity,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: C.obsidian,
					}}
				>
					{/* Sacred Geometry Lotus Mandala */}
					<div
						style={{
							transform: `scale(${mandalaScale}) rotate(${frame * 0.25}deg)`,
							opacity: 0.85,
						}}
					>
						<svg width="600" height="600" viewBox="0 0 600 600" fill="none">
							{Array.from({ length: 8 }).map((_, i) => (
								<g key={i} transform={`rotate(${i * 45} 300 300)`}>
									<ellipse
										cx="300"
										cy="180"
										rx="60"
										ry="120"
										stroke={C.subakWater}
										strokeWidth="2"
										fill={C.emeraldGreen}
										fillOpacity="0.1"
									/>
									<circle cx="300" cy="180" r="8" fill={C.imperialGold} />
								</g>
							))}
							<circle cx="300" cy="300" r="140" stroke={C.imperialGold} strokeWidth="3" />
							<circle cx="300" cy="300" r="90" stroke={C.pureWhite} strokeWidth="2" strokeDasharray="6 6" />
						</svg>
					</div>

					{/* Center Typography */}
					<div
						style={{
							position: 'absolute',
							textAlign: 'center',
							pointerEvents: 'none',
						}}
					>
						<span
							style={{
								fontFamily: FONT_MONO,
								fontSize: 12,
								letterSpacing: '0.3em',
								color: C.subakWater,
								fontWeight: 700,
							}}
						>
							HARMONI MANUSIA & ALAM
						</span>
						<h2
							style={{
								margin: '6px 0',
								fontFamily: FONT_TITLE,
								fontSize: 58,
								fontWeight: 900,
								color: C.pureWhite,
							}}
						>
							WISDOM IN ACTION
						</h2>
					</div>
				</div>
			)}

			{/* Emerald & Jade Floating Particles */}
			<ParticleField count={70} colorMode="emerald" intensity={0.7} />
		</AbsoluteFill>
	);
};
