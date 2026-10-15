import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
} from 'remotion';
import { C } from '../constants';
import { FONT_TITLE, FONT_SERIF, FONT_MONO } from '../fonts';
import { easeOutCubic } from '../utils';
import {
	PucuakRabuang,
	TorajaPaTedong,
	TenunIkatDiamond,
	BatikKawungUnit,
} from '../components/IndonesianPatterns';
import { ParticleField } from '../components/ParticleField';

export const Scene4MosaicDiversity: React.FC = () => {
	const frame = useCurrentFrame(); // 0 to 270 (9.0s @ 30fps)

	// ── ACT 1: RUMAH GADANG — WEST SUMATRA (f0 - f95) ──
	const minangOpacity = interpolate(frame, [0, 12, 85, 95], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const minangScale = interpolate(frame, [0, 95], [1.02, 1.15], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── ACT 2: TORAJA TONGKONAN — SOUTH SULAWESI (f88 - f185) ──
	const torajaOpacity = interpolate(frame, [88, 98, 175, 185], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const torajaScale = interpolate(frame, [90, 180], [1.02, 1.15], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// ── ACT 3: FAST-PACED 4-PANEL KINETIC MOSAIC (f178 - f270) ──
	const mosaicOpacity = interpolate(frame, [178, 188, 262, 270], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Clamped slit panel entrance animations
	const p1Y = interpolate(frame, [180, 204], [-900, 0], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const p2Y = interpolate(frame, [186, 210], [900, 0], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const p3Y = interpolate(frame, [192, 216], [-900, 0], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const p4Y = interpolate(frame, [198, 222], [900, 0], {
		easing: easeOutCubic,
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Staccato typography slams in Act 3
	const slam1 = frame >= 200 && frame < 222;
	const slam2 = frame >= 222 && frame < 244;
	const slam3 = frame >= 244;

	return (
		<AbsoluteFill style={{ backgroundColor: C.obsidian, overflow: 'hidden' }}>
			{/* ════════════════════════════════════════════════════════════════════
			    ACT 1: WEST SUMATRA — RUMAH GADANG (f0 - f95)
			════════════════════════════════════════════════════════════════════ */}
			{frame < 95 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: minangOpacity,
						transform: `scale(${minangScale})`,
						transformOrigin: '50% 60%',
						backgroundColor: '#1E0E0A',
					}}
				>
					{/* Terracotta Sunset Sky Gradient */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							background:
								'radial-gradient(ellipse at 50% 70%, #9C3E1E 0%, #4A1B0C 50%, #150703 100%)',
						}}
					/>

					{/* Minangkabau Pucuak Rabuang Border Pattern on Left & Right */}
					<div
						style={{
							position: 'absolute',
							top: 80,
							left: 45,
							display: 'flex',
							flexDirection: 'column',
							gap: 20,
							opacity: 0.65,
						}}
					>
						<PucuakRabuang size={75} color={C.imperialGold} />
						<PucuakRabuang size={75} color={C.imperialGold} />
						<PucuakRabuang size={75} color={C.imperialGold} />
					</div>

					<div
						style={{
							position: 'absolute',
							top: 80,
							right: 45,
							display: 'flex',
							flexDirection: 'column',
							gap: 20,
							opacity: 0.65,
							transform: 'scaleX(-1)',
						}}
					>
						<PucuakRabuang size={75} color={C.imperialGold} />
						<PucuakRabuang size={75} color={C.imperialGold} />
						<PucuakRabuang size={75} color={C.imperialGold} />
					</div>

					{/* Vector Artwork: Grand Curved Gonjong Architecture of Rumah Gadang */}
					<div
						style={{
							position: 'absolute',
							bottom: 0,
							left: '50%',
							transform: 'translateX(-50%)',
							width: 1400,
							height: 640,
							pointerEvents: 'none',
						}}
					>
						<svg width="1400" height="640" viewBox="0 0 1400 640" fill="none">
							<defs>
								<linearGradient id="roofGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" stopColor={C.imperialGold} />
									<stop offset="60%" stopColor={C.warmAmber} />
									<stop offset="100%" stopColor={C.deepTerracotta} />
								</linearGradient>
								<pattern id="woodCarving" width="40" height="40" patternUnits="userSpaceOnUse">
									<rect width="40" height="40" fill="#250F08" />
									<path d="M0,20 L20,0 L40,20 L20,40 Z" fill="none" stroke={C.imperialGold} strokeWidth="1" opacity="0.35" />
									<circle cx="20" cy="20" r="3" fill={C.imperialGold} opacity="0.4" />
								</pattern>
							</defs>

							{/* Flanking Rangkiang */}
							<g transform="translate(60, 240)">
								<path d="M10,80 C50,150 90,150 130,80 L120,95 C85,155 55,155 20,95 Z" fill="url(#roofGoldGrad)" />
								<line x1="10" y1="80" x2="0" y2="50" stroke={C.imperialGold} strokeWidth="2.5" />
								<line x1="130" y1="80" x2="140" y2="50" stroke={C.imperialGold} strokeWidth="2.5" />
								<rect x="35" y="125" width="70" height="80" fill="#1C0904" stroke={C.terracotta} strokeWidth="2" />
								<rect x="45" y="205" width="8" height="50" fill={C.imperialGold} />
								<rect x="85" y="205" width="8" height="50" fill={C.imperialGold} />
							</g>
							<g transform="translate(1200, 240)">
								<path d="M10,80 C50,150 90,150 130,80 L120,95 C85,155 55,155 20,95 Z" fill="url(#roofGoldGrad)" />
								<line x1="10" y1="80" x2="0" y2="50" stroke={C.imperialGold} strokeWidth="2.5" />
								<line x1="130" y1="80" x2="140" y2="50" stroke={C.imperialGold} strokeWidth="2.5" />
								<rect x="35" y="125" width="70" height="80" fill="#1C0904" stroke={C.terracotta} strokeWidth="2" />
								<rect x="45" y="205" width="8" height="50" fill={C.imperialGold} />
								<rect x="85" y="205" width="8" height="50" fill={C.imperialGold} />
							</g>

							{/* Main Palace Body */}
							<rect x="240" y="380" width="920" height="150" fill="url(#woodCarving)" stroke={C.terracotta} strokeWidth="3" />
							<rect x="240" y="380" width="920" height="20" fill={C.terracotta} stroke={C.imperialGold} strokeWidth="1.5" />
							<rect x="240" y="510" width="920" height="20" fill={C.terracotta} stroke={C.imperialGold} strokeWidth="1.5" />

							{/* Windows */}
							{Array.from({ length: 9 }).map((_, i) => (
								<g key={i} transform={`translate(${270 + i * 98}, 415)`}>
									<rect x="0" y="0" width="54" height="75" fill="#110502" stroke={C.imperialGold} strokeWidth="2" />
									<line x1="27" y1="0" x2="27" y2="75" stroke={C.imperialGold} strokeWidth="1.5" />
									<line x1="0" y1="37" x2="54" y2="37" stroke={C.imperialGold} strokeWidth="1.5" />
									<polygon points="27,10 44,37 27,64 10,37" fill="none" stroke={C.terracotta} strokeWidth="1" />
								</g>
							))}

							{/* Stilts */}
							{Array.from({ length: 11 }).map((_, i) => (
								<g key={i}>
									<rect x="250 + i * 88" y="530" width="18" height="110" fill="#3D180C" stroke={C.imperialGold} strokeWidth="1.5" />
									<rect x="245 + i * 88" y="620" width="28" height="20" fill="#695B56" />
								</g>
							))}

							{/* Stairs */}
							<polygon points="660,530 740,530 760,640 640,640" fill="#250F08" stroke={C.imperialGold} strokeWidth="2" />
							{Array.from({ length: 6 }).map((_, i) => (
								<line key={i} x1="655 - i * 3" y1={545 + i * 16} x2="745 + i * 3" y2={545 + i * 16} stroke={C.imperialGold} strokeWidth="2" />
							))}

							{/* 5 Soaring Buffalo-Horn Roofs */}
							<path d="M120,180 C260,340 380,380 480,290 L460,320 C360,400 240,360 140,210 Z" fill="url(#roofGoldGrad)" />
							<line x1="120" y1="180" x2="80" y2="120" stroke={C.imperialGold} strokeWidth="4.5" strokeLinecap="round" />

							<path d="M480,290 C560,360 640,370 700,320 L685,340 C630,385 550,375 460,320 Z" fill="url(#roofGoldGrad)" />
							<line x1="480" y1="290" x2="480" y2="200" stroke={C.imperialGold} strokeWidth="3.5" strokeLinecap="round" />

							<path d="M700,160 C640,260 620,320 700,320 C780,320 760,260 700,160 Z" fill="url(#roofGoldGrad)" />
							<line x1="700" y1="160" x2="700" y2="85" stroke={C.imperialGold} strokeWidth="5" strokeLinecap="round" />

							<path d="M700,320 C760,370 840,360 920,290 L940,320 C850,375 770,385 715,340 Z" fill="url(#roofGoldGrad)" />
							<line x1="920" y1="290" x2="920" y2="200" stroke={C.imperialGold} strokeWidth="3.5" strokeLinecap="round" />

							<path d="M920,290 C1020,380 1140,340 1280,180 L1260,210 C1160,360 1040,400 940,320 Z" fill="url(#roofGoldGrad)" />
							<line x1="1280" y1="180" x2="1320" y2="120" stroke={C.imperialGold} strokeWidth="4.5" strokeLinecap="round" />

							<polygon points="120,180 300,360 180,360" fill="#250F08" stroke={C.imperialGold} strokeWidth="2" />
							<polygon points="1280,180 1220,360 1100,360" fill="#250F08" stroke={C.imperialGold} strokeWidth="2" />
						</svg>
					</div>

					{/* Kinetic Typography: Minangkabau */}
					<div
						style={{
							position: 'absolute',
							top: 130,
							left: '50%',
							transform: 'translateX(-50%)',
							textAlign: 'center',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							zIndex: 10,
						}}
					>
						<span
							style={{
								fontFamily: FONT_MONO,
								fontSize: 12,
								letterSpacing: '0.3em',
								color: C.imperialGold,
								fontWeight: 700,
							}}
						>
							04.1 // ARSITEKTUR NUSANTARA • WEST SUMATRA
						</span>
						<h2
							style={{
								margin: '6px 0 0',
								fontFamily: FONT_TITLE,
								fontSize: 66,
								fontWeight: 900,
								color: C.pureWhite,
								letterSpacing: '0.04em',
								textShadow: '0 8px 30px rgba(0,0,0,0.95)',
							}}
						>
							RUMAH GADANG
						</h2>
						<span
							style={{
								fontFamily: FONT_SERIF,
								fontSize: 24,
								fontStyle: 'italic',
								color: C.offWhite,
								marginTop: 4,
								textShadow: '0 4px 15px rgba(0,0,0,0.9)',
							}}
						>
							Gonjong reaching the skies — Matriarchal wisdom built to withstand centuries.
						</span>
					</div>
				</div>
			)}

			{/* ════════════════════════════════════════════════════════════════════
			    ACT 2: SOUTH SULAWESI — TORAJA TONGKONAN (f88 - f185)
			════════════════════════════════════════════════════════════════════ */}
			{frame >= 88 && frame < 185 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: torajaOpacity,
						transform: `scale(${torajaScale})`,
						transformOrigin: '50% 60%',
						backgroundColor: '#0A1224',
					}}
				>
					{/* Indigo & Mountain Twilight Sky Gradient */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							background:
								'radial-gradient(ellipse at 50% 65%, #182C54 0%, #0C162E 50%, #050914 100%)',
						}}
					/>

					{/* Pa'tedong Sacred Carving Motifs Rotating on Left & Right */}
					<div
						style={{
							position: 'absolute',
							top: 190,
							left: 70,
							transform: `rotate(${frame * 0.15}deg)`,
							opacity: 0.7,
						}}
					>
						<TorajaPaTedong size={160} color={C.imperialGold} />
					</div>

					<div
						style={{
							position: 'absolute',
							top: 190,
							right: 70,
							transform: `rotate(-${frame * 0.15}deg)`,
							opacity: 0.7,
						}}
					>
						<TorajaPaTedong size={160} color={C.imperialGold} />
					</div>

					{/* Vector Artwork: Majestic Tongkonan Boat-Prow Architecture */}
					<div
						style={{
							position: 'absolute',
							bottom: 0,
							left: '50%',
							transform: 'translateX(-50%)',
							width: 1300,
							height: 640,
							pointerEvents: 'none',
						}}
					>
						<svg width="1300" height="640" viewBox="0 0 1300 640" fill="none">
							<defs>
								<linearGradient id="tongkonanRoofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" stopColor={C.imperialGold} />
									<stop offset="40%" stopColor={C.warmAmber} />
									<stop offset="100%" stopColor="#2A1B14" />
								</linearGradient>
							</defs>

							<path
								d="M60,110 C260,490 650,470 1240,110 C1040,430 260,430 60,110 Z"
								fill="url(#tongkonanRoofGrad)"
								stroke={C.imperialGold}
								strokeWidth="3"
							/>
							<path
								d="M100,160 C280,470 650,455 1200,160 L1170,185 C650,475 300,485 130,185 Z"
								fill={C.terracotta}
							/>

							{Array.from({ length: 18 }).map((_, i) => {
								const t = (i + 1) / 19;
								const lx = 100 + t * 1100;
								return (
									<line
										key={i}
										x1={lx}
										y1={280 + Math.sin(t * Math.PI) * 160}
										x2={lx + 15}
										y2={340 + Math.sin(t * Math.PI) * 120}
										stroke={C.pureWhite}
										strokeWidth="1.5"
										opacity="0.3"
									/>
								);
							})}

							<polygon points="560,440 740,440 650,220" fill="#0C1428" stroke={C.imperialGold} strokeWidth="3" />

							<circle cx="650" cy="285" r="24" fill={C.terracotta} stroke={C.imperialGold} strokeWidth="2.5" />
							<circle cx="650" cy="285" r="8" fill={C.imperialGold} />
							{Array.from({ length: 12 }).map((_, i) => {
								const sang = (i * 30 * Math.PI) / 180;
								return (
									<line
										key={i}
										x1={650 + Math.cos(sang) * 24}
										y1={285 + Math.sin(sang) * 24}
										x2={650 + Math.cos(sang) * 36}
										y2={285 + Math.sin(sang) * 36}
										stroke={C.imperialGold}
										strokeWidth="2"
									/>
								);
							})}

							<polygon points="650,330 670,360 630,360" fill={C.pureWhite} />
							<path d="M625,335 Q650,315 675,335" stroke={C.imperialGold} strokeWidth="3" fill="none" />

							<rect x="640" y="370" width="20" height="270" fill="#4A2A1E" stroke={C.imperialGold} strokeWidth="2" />
							{Array.from({ length: 8 }).map((_, i) => (
								<path
									key={i}
									d={`M605,${385 + i * 28} Q650,${365 + i * 28} 695,${385 + i * 28}`}
									stroke={C.pureWhite}
									strokeWidth="4"
									strokeLinecap="round"
									fill="none"
								/>
							))}

							<rect x="480" y="440" width="340" height="70" fill="#18243C" stroke={C.terracotta} strokeWidth="2.5" />
							{Array.from({ length: 6 }).map((_, i) => (
								<g key={i}>
									<rect x={510 + i * 55} y="510" width="16" height="130" fill="#0C1428" stroke={C.imperialGold} strokeWidth="1.5" />
									<rect x={506 + i * 55} y="625" width="24" height="15" fill="#4B5563" />
								</g>
							))}
						</svg>
					</div>

					{/* Kinetic Typography: Toraja */}
					<div
						style={{
							position: 'absolute',
							top: 130,
							left: '50%',
							transform: 'translateX(-50%)',
							textAlign: 'center',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							zIndex: 10,
						}}
					>
						<span
							style={{
								fontFamily: FONT_MONO,
								fontSize: 12,
								letterSpacing: '0.3em',
								color: C.imperialGold,
								fontWeight: 700,
							}}
						>
							04.2 // SAKRAL & ABADI • SOUTH SULAWESI
						</span>
						<h2
							style={{
								margin: '6px 0 0',
								fontFamily: FONT_TITLE,
								fontSize: 66,
								fontWeight: 900,
								color: C.pureWhite,
								letterSpacing: '0.04em',
								textShadow: '0 8px 30px rgba(0,0,0,0.95)',
							}}
						>
							TONGKONAN TORAJA
						</h2>
						<span
							style={{
								fontFamily: FONT_SERIF,
								fontSize: 24,
								fontStyle: 'italic',
								color: C.offWhite,
								marginTop: 4,
								textShadow: '0 4px 15px rgba(0,0,0,0.9)',
							}}
						>
							Boat-shaped roofs sailing toward ancestral skies — A sacred legacy of devotion.
						</span>
					</div>
				</div>
			)}

			{/* ════════════════════════════════════════════════════════════════════
			    ACT 3: 4-PANEL KINETIC SLIT MOSAIC (f178 - f270)
			════════════════════════════════════════════════════════════════════ */}
			{frame >= 178 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: mosaicOpacity,
						display: 'flex',
					}}
				>
					{/* Slat 1: Terracotta & Minang Songket */}
					<div
						style={{
							flex: 1,
							height: '100%',
							backgroundColor: C.terracotta,
							transform: `translateY(${p1Y}px)`,
							borderRight: '2px solid rgba(0,0,0,0.6)',
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
									'linear-gradient(180deg, rgba(200,90,50,0.95) 0%, rgba(135,51,24,0.98) 100%)',
							}}
						/>
						<div style={{ zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<PucuakRabuang size={100} color={C.imperialGold} />
							<span
								style={{
									marginTop: 22,
									fontFamily: FONT_TITLE,
									fontSize: 24,
									color: C.pureWhite,
									fontWeight: 900,
									letterSpacing: '0.14em',
								}}
							>
								SUMATRA
							</span>
							<span
								style={{
									fontFamily: FONT_MONO,
									fontSize: 11,
									color: C.imperialGold,
									letterSpacing: '0.2em',
									marginTop: 4,
								}}
							>
								RUMAH GADANG
							</span>
						</div>
					</div>

					{/* Slat 2: Emerald Green & Subak Terraces */}
					<div
						style={{
							flex: 1,
							height: '100%',
							backgroundColor: C.emeraldGreen,
							transform: `translateY(${p2Y}px)`,
							borderRight: '2px solid rgba(0,0,0,0.6)',
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
									'linear-gradient(180deg, rgba(13,123,84,0.95) 0%, rgba(6,58,38,0.98) 100%)',
							}}
						/>
						<div style={{ zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<BatikKawungUnit size={120} color={C.imperialGold} strokeWidth={2} />
							<span
								style={{
									marginTop: 22,
									fontFamily: FONT_TITLE,
									fontSize: 24,
									color: C.pureWhite,
									fontWeight: 900,
									letterSpacing: '0.14em',
								}}
							>
								JAWA & BALI
							</span>
							<span
								style={{
									fontFamily: FONT_MONO,
									fontSize: 11,
									color: C.subakWater,
									letterSpacing: '0.2em',
									marginTop: 4,
								}}
							>
								BATIK & SUBAK
							</span>
						</div>
					</div>

					{/* Slat 3: Royal Indigo & Toraja Tongkonan */}
					<div
						style={{
							flex: 1,
							height: '100%',
							backgroundColor: C.royalIndigo,
							transform: `translateY(${p3Y}px)`,
							borderRight: '2px solid rgba(0,0,0,0.6)',
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
									'linear-gradient(180deg, rgba(20,30,56,0.95) 0%, rgba(10,17,32,0.98) 100%)',
							}}
						/>
						<div style={{ zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<TorajaPaTedong size={110} color={C.imperialGold} />
							<span
								style={{
									marginTop: 22,
									fontFamily: FONT_TITLE,
									fontSize: 24,
									color: C.pureWhite,
									fontWeight: 900,
									letterSpacing: '0.14em',
								}}
							>
								SULAWESI
							</span>
							<span
								style={{
									fontFamily: FONT_MONO,
									fontSize: 11,
									color: C.imperialGold,
									letterSpacing: '0.2em',
									marginTop: 4,
								}}
							>
								TONGKONAN
							</span>
						</div>
					</div>

					{/* Slat 4: Imperial Gold & Tenun Sumba */}
					<div
						style={{
							flex: 1,
							height: '100%',
							backgroundColor: C.imperialGold,
							transform: `translateY(${p4Y}px)`,
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
									'linear-gradient(180deg, rgba(255,200,55,0.95) 0%, rgba(230,149,38,0.98) 100%)',
							}}
						/>
						<div style={{ zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
							<TenunIkatDiamond
								width={110}
								height={160}
								color1={C.darkCoffee}
								color2={C.terracotta}
								color3={C.obsidian}
							/>
							<span
								style={{
									marginTop: 12,
									fontFamily: FONT_TITLE,
									fontSize: 24,
									color: C.darkCoffee,
									fontWeight: 900,
									letterSpacing: '0.14em',
								}}
							>
								NUSATENGGARA
							</span>
							<span
								style={{
									fontFamily: FONT_MONO,
									fontSize: 11,
									color: C.deepTerracotta,
									letterSpacing: '0.2em',
									marginTop: 4,
									fontWeight: 700,
								}}
							>
								TENUN IKAT
							</span>
						</div>
					</div>

					{/* Dynamic Staccato Typography Hit across the 4 slats */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							zIndex: 20,
							pointerEvents: 'none',
						}}
					>
						{slam1 && (
							<h1
								style={{
									fontFamily: FONT_TITLE,
									fontSize: 108,
									fontWeight: 900,
									color: C.pureWhite,
									letterSpacing: '0.1em',
									textShadow: '0 10px 40px rgba(0,0,0,0.95)',
								}}
							>
								17,508 ISLANDS
							</h1>
						)}
						{slam2 && (
							<h1
								style={{
									fontFamily: FONT_TITLE,
									fontSize: 108,
									fontWeight: 900,
									color: C.pureWhite,
									letterSpacing: '0.1em',
									textShadow: '0 10px 40px rgba(0,0,0,0.95)',
								}}
							>
								1,340+ CULTURES
							</h1>
						)}
						{slam3 && (
							<h1
								style={{
									fontFamily: FONT_TITLE,
									fontSize: 116,
									fontWeight: 900,
									color: C.pureWhite,
									letterSpacing: '0.14em',
									textShadow: '0 10px 40px rgba(0,0,0,0.95)',
								}}
							>
								ONE SOUL
							</h1>
						)}
					</div>
				</div>
			)}

			{/* Floating Particles */}
			<ParticleField count={60} colorMode="amber" intensity={0.7} />
		</AbsoluteFill>
	);
};
