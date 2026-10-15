import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { C, TOTAL_FRAMES, GEO_DATA } from '../constants';
import { FONT_MONO } from '../fonts';
import { formatTimecode } from '../utils';

export const CinematicLetterbox: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const timecode = formatTimecode(frame, fps);
	const progressPercent = (frame / TOTAL_FRAMES) * 100;

	// Dynamic scene metadata based on frame number (45s @ 30fps = 1350 frames)
	let sceneInfo = 'SCENE 01 // ARCHIPELAGO EMERGENCE';
	let geoCoord: string = GEO_DATA.nusantaraCoordinates;
	if (frame >= 1080) {
		sceneInfo = 'SCENE 05 // THE LIVING LEGACY FINALE';
		geoCoord = 'RESONANCE // BHINNEKA TUNGGAL IKA';
	} else if (frame >= 810) {
		sceneInfo = 'SCENE 04 // MOSAIC OF DIVERSITY • ARCHITECTURE';
		geoCoord = `${GEO_DATA.minangCoordinates} • ${GEO_DATA.torajaCoordinates}`;
	} else if (frame >= 540) {
		sceneInfo = 'SCENE 03 // HARMONY OF LIFE • SUBAK BALI';
		geoCoord = `${GEO_DATA.baliCoordinates} • TRI HITA KARANA`;
	} else if (frame >= 270) {
		sceneInfo = 'SCENE 02 // SACRED TRADITIONS • BATIK & TENUN';
		geoCoord = 'JAVA • BALI • NUSA TENGGARA';
	}

	const BAR_HEIGHT = 44;
	const CORNER_SIZE = 22;

	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				pointerEvents: 'none',
				zIndex: 9990,
			}}
		>
			{/* ── Top Cinematic Letterbox Bar ── */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: BAR_HEIGHT,
					backgroundColor: 'rgba(5, 7, 11, 0.94)',
					borderBottom: '1px solid rgba(255, 200, 55, 0.18)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '0 32px',
					fontFamily: FONT_MONO,
					fontSize: 11,
					letterSpacing: '0.16em',
					color: C.offWhite,
					boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
				}}
			>
				{/* Top Left: Status & Category */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
					<div
						style={{
							width: 7,
							height: 7,
							borderRadius: '50%',
							backgroundColor: '#FF3B30',
							boxShadow: '0 0 8px #FF3B30',
							opacity: Math.sin(frame * 0.15) > 0 ? 1 : 0.4,
						}}
					/>
					<span style={{ color: C.imperialGold, fontWeight: 700 }}>
						INDONESIA ARCHIVE
					</span>
					<span style={{ opacity: 0.35 }}>|</span>
					<span style={{ opacity: 0.75 }}>KEARIFAN LOKAL NUSANTARA</span>
				</div>

				{/* Top Right: Frame & Timecode */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
					<span style={{ opacity: 0.55 }}>FPS: {fps.toFixed(2)}</span>
					<span style={{ opacity: 0.35 }}>|</span>
					<span style={{ color: C.imperialGold, fontWeight: 700 }}>
						TC {timecode}
					</span>
					<span style={{ opacity: 0.55 }}>
						F[{String(frame).padStart(4, '0')}/{TOTAL_FRAMES}]
					</span>
				</div>
			</div>

			{/* ── Bottom Cinematic Letterbox Bar ── */}
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: BAR_HEIGHT,
					backgroundColor: 'rgba(5, 7, 11, 0.94)',
					borderTop: '1px solid rgba(255, 200, 55, 0.18)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '0 32px',
					fontFamily: FONT_MONO,
					fontSize: 11,
					letterSpacing: '0.16em',
					color: C.offWhite,
					boxShadow: '0 -4px 20px rgba(0,0,0,0.6)',
				}}
			>
				{/* Bottom Left: Current Scene Info & Coordinates */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
					<span style={{ color: C.imperialGold, fontWeight: 700 }}>
						{sceneInfo}
					</span>
					<span style={{ opacity: 0.35 }}>|</span>
					<span style={{ opacity: 0.7 }}>{geoCoord}</span>
				</div>

				{/* Bottom Right: Cultural Metrics */}
				<div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
					<span style={{ opacity: 0.7 }}>17,508 ISLANDS</span>
					<span style={{ opacity: 0.35 }}>•</span>
					<span style={{ opacity: 0.7 }}>1,340+ CULTURES</span>
					<span style={{ opacity: 0.35 }}>•</span>
					<span style={{ color: C.imperialGold }}>BHINNEKA TUNGGAL IKA</span>
				</div>
			</div>

			{/* ── Thin Golden Timeline Progress Line ── */}
			<div
				style={{
					position: 'absolute',
					bottom: BAR_HEIGHT,
					left: 0,
					right: 0,
					height: 2,
					backgroundColor: 'rgba(255, 255, 255, 0.08)',
				}}
			>
				<div
					style={{
						height: '100%',
						width: `${progressPercent}%`,
						background: `linear-gradient(90deg, ${C.terracotta}, ${C.imperialGold})`,
						boxShadow: '0 0 10px rgba(255, 200, 55, 0.8)',
					}}
				/>
			</div>

			{/* ── Viewport Corner Crosshairs / Reticles ── */}
			{[
				{ top: BAR_HEIGHT + 18, left: 24, borderTop: 1, borderLeft: 1 },
				{ top: BAR_HEIGHT + 18, right: 24, borderTop: 1, borderRight: 1 },
				{ bottom: BAR_HEIGHT + 18, left: 24, borderBottom: 1, borderLeft: 1 },
				{ bottom: BAR_HEIGHT + 18, right: 24, borderBottom: 1, borderRight: 1 },
			].map((pos, idx) => (
				<div
					key={idx}
					style={{
						position: 'absolute',
						width: CORNER_SIZE,
						height: CORNER_SIZE,
						borderColor: C.imperialGold,
						borderStyle: 'solid',
						borderWidth: 0,
						borderTopWidth: pos.borderTop ? 1.5 : 0,
						borderBottomWidth: pos.borderBottom ? 1.5 : 0,
						borderLeftWidth: pos.borderLeft ? 1.5 : 0,
						borderRightWidth: pos.borderRight ? 1.5 : 0,
						opacity: 0.45,
						...pos,
					}}
				/>
			))}
		</div>
	);
};
