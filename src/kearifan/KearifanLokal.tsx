import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
} from 'remotion';
import { FilmGrain } from '../showreel/FilmGrain';
import { C } from './constants';
import { KearifanAudio } from './KearifanAudio';
import { SceneFuture } from './scenes/SceneFuture';
import { SceneMagic } from './scenes/SceneMagic';
import { SceneMosaic } from './scenes/SceneMosaic';
import { SceneTraditions } from './scenes/SceneTraditions';
import { SceneWisdom } from './scenes/SceneWisdom';

/** Composition format — 1920×1080 @ 30 fps, 15 seconds. */
export const KEARIFAN30_FPS = 30;
export const KEARIFAN30_FRAMES = 450;

/** Scene timing @ 30 fps — five 3-second acts. */
const S30 = {
	magic: { from: 0, dur: 90 },
	traditions: { from: 90, dur: 90 },
	wisdom: { from: 180, dur: 90 },
	mosaic: { from: 270, dur: 90 },
	future: { from: 360, dur: 90 },
} as const;

/** Hard cut frames — used for the golden flash transitions. */
const CUTS30 = [90, 180, 270, 360] as const;

/** Golden flash on every hard cut between scenes. */
const CutFlash: React.FC = () => {
	const f = useCurrentFrame();
	let o = 0;
	for (const cf of CUTS30) {
		o = Math.max(
			o,
			interpolate(f, [cf - 2, cf, cf + 3], [0, 0.8, 0], {
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
			}),
		);
	}
	if (o <= 0.002) return null;
	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F7E9C9',
				opacity: o,
				pointerEvents: 'none',
				zIndex: 9997,
			}}
		/>
	);
};

/**
 * MENGENAL KEARIFAN LOKAL INDONESIA — 15-second cinematic motion
 * graphics campaign. 1920×1080 @ 30fps, 450 frames.
 *
 * 00 The Magic of Indonesia · 01 Traditions · 02 Wisdom ·
 * 03 Mosaic of Diversity · 04 The Future of Our Heritage
 */
export const KearifanLokal: React.FC = () => {
	return (
		<AbsoluteFill style={{ backgroundColor: C.ink }}>
			{/* ═══════════════════ SCENES ═══════════════════ */}
			<Sequence
				from={S30.magic.from}
				durationInFrames={S30.magic.dur}
				name="01 Magic of Indonesia"
			>
				<SceneMagic />
			</Sequence>

			<Sequence
				from={S30.traditions.from}
				durationInFrames={S30.traditions.dur}
				name="02 Traditions"
			>
				<SceneTraditions />
			</Sequence>

			<Sequence
				from={S30.wisdom.from}
				durationInFrames={S30.wisdom.dur}
				name="03 Wisdom"
			>
				<SceneWisdom />
			</Sequence>

			<Sequence
				from={S30.mosaic.from}
				durationInFrames={S30.mosaic.dur}
				name="04 Mosaic of Diversity"
			>
				<SceneMosaic />
			</Sequence>

			<Sequence
				from={S30.future.from}
				durationInFrames={S30.future.dur}
				name="05 Future of Our Heritage"
			>
				<SceneFuture />
			</Sequence>

			{/* ═══════════════════ OVERLAYS ═══════════════════ */}
			<CutFlash />
			<FilmGrain />
			<KearifanAudio />
		</AbsoluteFill>
	);
};
