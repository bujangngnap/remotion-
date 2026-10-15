import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { S, C } from './constants';
import { Hud } from './Hud';
import { FilmGrain } from './FilmGrain';
import { BootIntro } from './scenes/BootIntro';
import { Countdown } from './scenes/Countdown';
import { KineticType } from './scenes/KineticType';
import { Geometry } from './scenes/Geometry';
import { Particles } from './scenes/Particles';
import { Depth } from './scenes/Depth';
import { Interface } from './scenes/Interface';
import { RhythmAlive } from './scenes/RhythmAlive';
import { Identity } from './scenes/Identity';
import { ShowreelAudio } from './ShowreelAudio';

/**
 * SHOWREEL 2026 — 15-second motion graphics résumé.
 * 1920×1080 @ 60fps, 900 frames total.
 */
export const ShowreelComposition: React.FC = () => {
	const frame = useCurrentFrame();

	// Chromatic aberration on scene cuts (1-2 frame glitch)
	const cutFrames = [
		S.countdown.from,
		S.kineticType.from,
		S.geometry.from,
		S.particles.from,
		S.depth.from,
		S.ui.from,
		S.rhythm.from,
		S.identity.from,
	];
	const isNearCut = cutFrames.some(
		(cf) => frame >= cf && frame < cf + 2,
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: C.inkBlack
			}}
		>
			{/* ═══════════════════ SCENES ═══════════════════ */}
			<Sequence from={S.boot.from} durationInFrames={S.boot.dur} name="Boot">
				<BootIntro />
			</Sequence>

			<Sequence from={S.countdown.from} durationInFrames={S.countdown.dur} name="Countdown">
				<Countdown />
			</Sequence>

			<Sequence from={S.kineticType.from} durationInFrames={S.kineticType.dur} name="Kinetic Type">
				<KineticType />
			</Sequence>

			<Sequence from={S.geometry.from} durationInFrames={S.geometry.dur} name="Geometry">
				<Geometry />
			</Sequence>

			<Sequence from={S.particles.from} durationInFrames={S.particles.dur} name="Particles">
				<Particles />
			</Sequence>

			<Sequence from={S.depth.from} durationInFrames={S.depth.dur} name="Depth">
				<Depth />
			</Sequence>

			<Sequence from={S.ui.from} durationInFrames={S.ui.dur} name="Interface">
				<Interface />
			</Sequence>

			<Sequence from={S.rhythm.from} durationInFrames={S.rhythm.dur} name="Rhythm">
				<RhythmAlive />
			</Sequence>

			<Sequence from={S.identity.from} durationInFrames={S.identity.dur} name="Identity">
				<Identity />
			</Sequence>

			{/* ═══════════════════ OVERLAYS ═══════════════════ */}

			{/* Chromatic aberration on cuts */}
			{isNearCut && (
				<AbsoluteFill
					style={{
						mixBlendMode: 'screen',
						opacity: 0.15,
					}}
				>
					<AbsoluteFill
						style={{
							backgroundColor: '#ff0000',
							transform: 'translateX(-3px)',
							opacity: 0.3,
						}}
					/>
					<AbsoluteFill
						style={{
							backgroundColor: '#0000ff',
							transform: 'translateX(3px)',
							opacity: 0.3,
						}}
					/>
				</AbsoluteFill>
			)}

			{/* HUD overlay — always on top, uses absolute frame */}
			<Hud />

			{/* Film grain + vignette — topmost */}
			<FilmGrain />

			{/* ═══════════════════ AUDIO & SFX ═══════════════════ */}
			<ShowreelAudio />
		</AbsoluteFill>
	);
};
