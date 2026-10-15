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
import {
	CantingPen,
	BatikParangBlade,
	BatikKawungUnit,
	TenunIkatDiamond,
} from '../components/IndonesianPatterns';
import { ParticleField } from '../components/ParticleField';

export const Scene2Traditions: React.FC = () => {
	const frame = useCurrentFrame(); // 0 to 270 (9.0s @ 30fps)

	// ── 3 Micro-Acts in 9.0 Seconds (90 frames each) ──
	// Act 1: Bali Sacred Ceremony (f0 - f95)
	// Act 2: Batik Canting Stroke-by-Stroke (f88 - f185)
	// Act 3: Tenun Ikat Dynamic Weaving Split Screen (f178 - f270)

	// ── ACT 1: BALI (f0 - f95) ──
	const baliScale = interpolate(frame, [0, 95], [1.05, 1.2], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const baliGateOpen = interpolate(frame, [0, 70], [0, 80], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const baliOpacity = interpolate(frame, [0, 12, 85, 95], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Frangipani flower petal drift
	const petals = React.useMemo(() => {
		return Array.from({ length: 14 }).map((_, i) => ({
			x: 150 + i * 120,
			y: (i * 77) % 700,
			size: 20 + (i % 5) * 6,
			speed: 1.0 + (i % 3) * 0.3,
			rot: (i * 45),
		}));
	}, []);

	// ── ACT 2: BATIK STROKE-BY-STROKE (f88 - f185) ──
	const batikOpacity = interpolate(frame, [88, 98, 175, 185], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Canting drawing coordinates animation
	const cantingProgress = progress(frame, 95, 165);
	const cantingX = interpolate(cantingProgress, [0, 1], [350, 1280], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const cantingY = interpolate(
		cantingProgress,
		[0, 0.35, 0.7, 1],
		[320, 520, 380, 540],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
	);

	// Parang drawing stroke length
	const strokeLength = 1200;
	const strokeOffset = strokeLength * (1 - cantingProgress);

	// ── ACT 3: TENUN IKAT WEAVING SPLIT (f178 - f270) ──
	const tenunOpacity = interpolate(frame, [178, 188, 262, 270], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const splitSlideLeft = interpolate(frame, [180, 205], [-400, 0], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const splitSlideRight = interpolate(frame, [180, 205], [400, 0], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Thread intersection weaving lines progress
	const warpThreadProg = progress(frame, 190, 235);

	return (
		<AbsoluteFill style={{ backgroundColor: C.obsidian, overflow: 'hidden' }}>
			{/* ════════════════════════════════════════════════════════════════════
			    ACT 1: BALINESE SACRED CEREMONY (f0 - f95)
			════════════════════════════════════════════════════════════════════ */}
			{frame < 95 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: baliOpacity,
					}}
				>
					{/* Photographic temple background with gentle zoom */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							transform: `scale(${baliScale})`,
							transformOrigin: '50% 60%',
						}}
					>
						<Img
							src={staticFile('kearifan/bali_ceremony.jpg')}
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover',
								filter: 'brightness(0.9) contrast(1.15)',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'linear-gradient(180deg, rgba(5,7,11,0.5) 0%, rgba(5,7,11,0.2) 50%, rgba(5,7,11,0.85) 100%)',
							}}
						/>
					</div>

					{/* Stylized Candi Bentar (Split Gate) Frame that Parts Open */}
					<div
						style={{
							position: 'absolute',
							top: 0,
							bottom: 0,
							left: 0,
							width: 380,
							transform: `translateX(-${baliGateOpen}px)`,
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<svg width="340" height="1080" viewBox="0 0 340 1080" fill="none">
							<path
								d="M0,0 L180,0 L180,320 L240,320 L240,480 L300,480 L300,680 L220,680 L220,900 L320,900 L320,1080 L0,1080 Z"
								fill="#121824"
								fillOpacity="0.85"
								stroke={C.imperialGold}
								strokeWidth="2"
							/>
							<line x1="180" y1="0" x2="180" y2="1080" stroke={C.warmAmber} strokeWidth="2" strokeDasharray="6 6" />
						</svg>
					</div>

					<div
						style={{
							position: 'absolute',
							top: 0,
							bottom: 0,
							right: 0,
							width: 380,
							transform: `scaleX(-1) translateX(-${baliGateOpen}px)`,
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<svg width="340" height="1080" viewBox="0 0 340 1080" fill="none">
							<path
								d="M0,0 L180,0 L180,320 L240,320 L240,480 L300,480 L300,680 L220,680 L220,900 L320,900 L320,1080 L0,1080 Z"
								fill="#121824"
								fillOpacity="0.85"
								stroke={C.imperialGold}
								strokeWidth="2"
							/>
							<line x1="180" y1="0" x2="180" y2="1080" stroke={C.warmAmber} strokeWidth="2" strokeDasharray="6 6" />
						</svg>
					</div>

					{/* Drifting Sacred Frangipani Petals */}
					{petals.map((pt, i) => {
						const py = (pt.y + frame * pt.speed * 2.5) % 950;
						const px = pt.x + Math.sin(frame * 0.04 + i) * 25;
						const prot = pt.rot + frame * 1.2;
						return (
							<div
								key={i}
								style={{
									position: 'absolute',
									top: py,
									left: px,
									transform: `rotate(${prot}deg)`,
									pointerEvents: 'none',
									filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))',
								}}
							>
								<svg width={pt.size} height={pt.size} viewBox="0 0 60 60">
									<circle cx="30" cy="30" r="10" fill="#FFE57F" />
									{Array.from({ length: 5 }).map((_, pi) => {
										const ang = (pi * 72 * Math.PI) / 180;
										const cx = 30 + Math.cos(ang) * 16;
										const cy = 30 + Math.sin(ang) * 16;
										return (
											<ellipse
												key={pi}
												cx={cx}
												cy={cy}
												rx="11"
												ry="7"
												fill="#FFFDF7"
												transform={`rotate(${pi * 72} ${cx} ${cy})`}
											/>
										);
									})}
									<circle cx="30" cy="30" r="4" fill="#FFC837" />
								</svg>
							</div>
						);
					})}

					{/* Typography Lockup: Bali */}
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
								color: C.imperialGold,
								fontWeight: 700,
							}}
						>
							02.1 // TRADISI YANG BERKATA • BALI
						</span>
						<h2
							style={{
								margin: 0,
								fontFamily: FONT_TITLE,
								fontSize: 68,
								fontWeight: 900,
								color: C.pureWhite,
								letterSpacing: '0.04em',
								textShadow: '0 8px 30px rgba(0,0,0,0.9)',
							}}
						>
							SACRED HARMONY
						</h2>
						<span
							style={{
								fontFamily: FONT_SERIF,
								fontSize: 26,
								fontStyle: 'italic',
								color: C.offWhite,
							}}
						>
							Tri Hita Karana — Balance between humans, nature, and the divine.
						</span>
					</div>
				</div>
			)}

			{/* ════════════════════════════════════════════════════════════════════
			    ACT 2: BATIK MASTERWORK STROKE-BY-STROKE (f88 - f185)
			════════════════════════════════════════════════════════════════════ */}
			{frame >= 88 && frame < 185 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: batikOpacity,
						backgroundColor: C.darkCoffee,
					}}
				>
					{/* Mori Cloth & Sogan Batik Background Texture */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							background:
								'radial-gradient(circle at 60% 50%, #4A2A1E 0%, #2A1710 60%, #150A07 100%)',
						}}
					/>

					{/* Faint Kawung Blueprint Grid in Background */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							display: 'grid',
							gridTemplateColumns: 'repeat(8, 240px)',
							opacity: 0.12,
						}}
					>
						{Array.from({ length: 32 }).map((_, i) => (
							<BatikKawungUnit key={i} size={220} color={C.imperialGold} strokeWidth={1} />
						))}
					</div>

					{/* SVG Canvas where Molten Golden Batik Lines are Drawn */}
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
							<filter id="waxHotGlow" x="-50%" y="-50%" width="200%" height="200%">
								<feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={C.imperialGold} floodOpacity="0.9" />
								<feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#FF6B00" floodOpacity="0.6" />
							</filter>
						</defs>

						{/* Dynamic Parang Blade wave drawing along with Canting pen */}
						<g filter="url(#waxHotGlow)">
							<path
								d="M320,320 C480,240 600,420 780,360 C960,300 1080,500 1300,440"
								stroke={C.imperialGold}
								strokeWidth="6"
								strokeLinecap="round"
								fill="none"
								strokeDasharray={strokeLength}
								strokeDashoffset={strokeOffset}
							/>
							<path
								d="M300,420 C460,340 580,520 760,460 C940,400 1060,600 1280,540"
								stroke={C.warmAmber}
								strokeWidth="4"
								strokeLinecap="round"
								fill="none"
								strokeDasharray={strokeLength}
								strokeDashoffset={strokeOffset}
							/>
						</g>

						{/* Dynamic Parang Motifs popping into life behind the stroke */}
						{cantingProgress > 0.3 && (
							<g transform="translate(540, 240) scale(0.9)" opacity={interpolate(cantingProgress, [0.3, 0.45], [0, 0.9], { extrapolateRight: 'clamp' })}>
								<BatikParangBlade width={220} height={320} color={C.imperialGold} />
							</g>
						)}
						{cantingProgress > 0.65 && (
							<g transform="translate(860, 260) scale(0.9)" opacity={interpolate(cantingProgress, [0.65, 0.8], [0, 0.9], { extrapolateRight: 'clamp' })}>
								<BatikParangBlade width={220} height={320} color={C.imperialGold} />
							</g>
						)}
					</svg>

					{/* The Animated Canting Pen pouring molten wax */}
					<div
						style={{
							position: 'absolute',
							left: cantingX - 20,
							top: cantingY - 120,
							transform: `rotate(${Math.sin(frame * 0.12) * 8}deg)`,
							pointerEvents: 'none',
							zIndex: 15,
						}}
					>
						<CantingPen />
					</div>

					{/* Amber Sparks flying off the canting tip */}
					<div style={{ position: 'absolute', left: cantingX, top: cantingY, pointerEvents: 'none' }}>
						{Array.from({ length: 6 }).map((_, si) => {
							const sparkAge = (frame * 1.5 + si * 7) % 20;
							const sAngle = (si * 60 * Math.PI) / 180;
							const sDist = sparkAge * 2.5;
							const sx = Math.cos(sAngle) * sDist;
							const sy = Math.sin(sAngle) * sDist;
							const sAlpha = 1 - sparkAge / 20;
							return (
								<div
									key={si}
									style={{
										position: 'absolute',
										left: sx,
										top: sy,
										width: 3.5,
										height: 3.5,
										borderRadius: '50%',
										backgroundColor: '#FFD54F',
										boxShadow: '0 0 6px #FF8C00',
										opacity: sAlpha,
									}}
								/>
							);
						})}
					</div>

					{/* Kinetic Typography: Batik */}
					<div
						style={{
							position: 'absolute',
							top: 85,
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
								color: C.moltenWax,
								fontWeight: 700,
							}}
						>
							02.2 // MASTER CRAFT • UNESCO INTANGIBLE HERITAGE
						</span>
						<h2
							style={{
								margin: 0,
								fontFamily: FONT_TITLE,
								fontSize: 72,
								fontWeight: 900,
								color: C.pureWhite,
								letterSpacing: '0.04em',
							}}
						>
							BATIK: AMBA & TITIK
						</h2>
						<span
							style={{
								fontFamily: FONT_SERIF,
								fontSize: 26,
								fontStyle: 'italic',
								color: C.offWhite,
							}}
						>
							Drawing soul into cloth — each stroke an unshakeable prayer of wisdom.
						</span>
					</div>
				</div>
			)}

			{/* ════════════════════════════════════════════════════════════════════
			    ACT 3: TENUN IKAT WEAVING SPLIT SCREEN (f178 - f270)
			════════════════════════════════════════════════════════════════════ */}
			{frame >= 178 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: tenunOpacity,
						display: 'flex',
					}}
				>
					{/* Left Split Panel (Deep Indigo & Sumba Tenun Motif) */}
					<div
						style={{
							flex: 1,
							height: '100%',
							backgroundColor: C.royalIndigo,
							transform: `translateX(${splitSlideLeft}px)`,
							borderRight: `2px solid ${C.imperialGold}`,
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'linear-gradient(135deg, rgba(20,30,56,0.95) 0%, rgba(10,17,32,0.98) 100%)',
							}}
						/>
						<div style={{ display: 'flex', gap: 28, zIndex: 5 }}>
							<TenunIkatDiamond
								width={170}
								height={250}
								color1={C.imperialGold}
								color2={C.terracotta}
								color3={C.subakWater}
							/>
							<TenunIkatDiamond
								width={170}
								height={250}
								color1={C.terracotta}
								color2={C.imperialGold}
								color3={C.offWhite}
							/>
						</div>

						{/* Warp Thread Sliding Lines */}
						<svg
							style={{
								position: 'absolute',
								inset: 0,
								width: '100%',
								height: '100%',
								opacity: 0.35,
							}}
						>
							{Array.from({ length: 16 }).map((_, i) => (
								<line
									key={i}
									x1={i * 60}
									y1={0}
									x2={i * 60}
									y2={1080 * warpThreadProg}
									stroke={C.imperialGold}
									strokeWidth="1.5"
									strokeDasharray="4 4"
								/>
							))}
						</svg>

						{/* Tag */}
						<div
							style={{
								position: 'absolute',
								bottom: 80,
								left: 60,
								zIndex: 10,
							}}
						>
							<span
								style={{
									fontFamily: FONT_MONO,
									fontSize: 11,
									letterSpacing: '0.24em',
									color: C.imperialGold,
								}}
							>
								SUMBA & FLORES • TENUN IKAT
							</span>
							<h3
								style={{
									margin: '4px 0 0',
									fontFamily: FONT_TITLE,
									fontSize: 42,
									color: C.pureWhite,
								}}
							>
								THREAD BY THREAD
							</h3>
						</div>
					</div>

					{/* Right Split Panel (Terracotta & Toraja Weave Geometry) */}
					<div
						style={{
							flex: 1,
							height: '100%',
							backgroundColor: C.terracotta,
							transform: `translateX(${splitSlideRight}px)`,
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'linear-gradient(135deg, rgba(200,90,50,0.95) 0%, rgba(135,51,24,0.98) 100%)',
							}}
						/>
						<div style={{ display: 'flex', gap: 28, zIndex: 5 }}>
							<TenunIkatDiamond
								width={170}
								height={250}
								color1={C.pureWhite}
								color2={C.imperialGold}
								color3={C.darkCoffee}
							/>
							<TenunIkatDiamond
								width={170}
								height={250}
								color1={C.imperialGold}
								color2={C.pureWhite}
								color3={C.soganBatik}
							/>
						</div>

						{/* Weft horizontal thread vectors */}
						<svg
							style={{
								position: 'absolute',
								inset: 0,
								width: '100%',
								height: '100%',
								opacity: 0.35,
							}}
						>
							{Array.from({ length: 16 }).map((_, i) => (
								<line
									key={i}
									x1={0}
									y1={i * 65}
									x2={960 * warpThreadProg}
									y2={i * 65}
									stroke={C.pureWhite}
									strokeWidth="1.5"
									strokeDasharray="4 4"
								/>
							))}
						</svg>

						{/* Tag */}
						<div
							style={{
								position: 'absolute',
								bottom: 80,
								left: 60,
								zIndex: 10,
							}}
						>
							<span
								style={{
									fontFamily: FONT_MONO,
									fontSize: 11,
									letterSpacing: '0.24em',
									color: C.pureWhite,
								}}
							>
								GEOMETRIC RESILIENCE
							</span>
							<h3
								style={{
									margin: '4px 0 0',
									fontFamily: FONT_TITLE,
									fontSize: 42,
									color: C.pureWhite,
								}}
							>
								WOVEN ANCESTRY
							</h3>
						</div>
					</div>
				</div>
			)}

			{/* Ambient Golden Particles */}
			<ParticleField count={60} colorMode="gold" intensity={0.65} />
		</AbsoluteFill>
	);
};
