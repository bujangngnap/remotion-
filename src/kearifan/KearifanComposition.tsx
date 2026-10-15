import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { C, SCENES } from './constants';
import { CinematicLetterbox } from './components/CinematicLetterbox';
import { FilmGrainOverlay } from './components/FilmGrainOverlay';
import { Scene1Archipelago } from './scenes/Scene1Archipelago';
import { Scene2Traditions } from './scenes/Scene2Traditions';
import { Scene3WisdomLife } from './scenes/Scene3WisdomLife';
import { Scene4MosaicDiversity } from './scenes/Scene4MosaicDiversity';
import { Scene5FutureHeritage } from './scenes/Scene5FutureHeritage';
import { KearifanAudio } from './KearifanAudio';

/**
 * MENGENAL KEARIFAN LOKAL INDONESIA
 * (Discovering Indonesia's Local Wisdom)
 *
 * 15-second cinematic motion graphics showreel.
 * 1920×1080 @ 60fps — 900 frames total.
 */
export const KearifanComposition: React.FC = () => {
	const frame = useCurrentFrame();

	// Chromatic glitch pulse on scene cuts (2 frames)
	const cutFrames = [
		SCENES.scene2.from,
		SCENES.scene3.from,
		SCENES.scene4.from,
		SCENES.scene5.from,
	];
	const isNearCut = cutFrames.some((cf) => frame >= cf && frame < cf + 2);

	return (
		<AbsoluteFill style={{ backgroundColor: C.obsidian }}>
			{/* ═══════════════════ SCENES ═══════════════════ */}

			{/* 0–3s: Scene 1 — The Magic of Indonesia */}
			<Sequence
				from={SCENES.scene1.from}
				durationInFrames={SCENES.scene1.dur}
				name="01: The Magic of Indonesia"
			>
				<Scene1Archipelago />
			</Sequence>

			{/* 3–6s: Scene 2 — Traditions That Tell Stories */}
			<Sequence
				from={SCENES.scene2.from}
				durationInFrames={SCENES.scene2.dur}
				name="02: Traditions That Tell Stories"
			>
				<Scene2Traditions />
			</Sequence>

			{/* 6–9s: Scene 3 — Wisdom in Everyday Life */}
			<Sequence
				from={SCENES.scene3.from}
				durationInFrames={SCENES.scene3.dur}
				name="03: Wisdom in Everyday Life"
			>
				<Scene3WisdomLife />
			</Sequence>

			{/* 9–12s: Scene 4 — A Mosaic of Diversity */}
			<Sequence
				from={SCENES.scene4.from}
				durationInFrames={SCENES.scene4.dur}
				name="04: A Mosaic of Diversity"
			>
				<Scene4MosaicDiversity />
			</Sequence>

			{/* 12–15s: Scene 5 — The Future of Our Heritage */}
			<Sequence
				from={SCENES.scene5.from}
				durationInFrames={SCENES.scene5.dur}
				name="05: The Future of Our Heritage"
			>
				<Scene5FutureHeritage />
			</Sequence>

			{/* ═══════════════════ OVERLAYS ═══════════════════ */}

			{/* Chromatic aberration glitch pulse on scene cuts */}
			{isNearCut && (
				<AbsoluteFill
					style={{
						mixBlendMode: 'screen',
						opacity: 0.22,
						pointerEvents: 'none',
						zIndex: 9950,
					}}
				>
					<AbsoluteFill
						style={{
							backgroundColor: '#FF2A00',
							transform: 'translateX(-4px)',
							opacity: 0.4,
						}}
					/>
					<AbsoluteFill
						style={{
							backgroundColor: '#00D4FF',
							transform: 'translateX(4px)',
							opacity: 0.4,
						}}
					/>
				</AbsoluteFill>
			)}

			{/* Persistent Cinematic Letterbox & Telemetry Frame */}
			<CinematicLetterbox />

			{/* 35mm Film Grain + Vignette Overlay */}
			<FilmGrainOverlay />

			{/* Frame-accurate Sound Design & Music Score */}
			<KearifanAudio />
		</AbsoluteFill>
	);
};
