import React from 'react';
import { Audio, interpolate, Sequence, staticFile } from 'remotion';

const ROOT = 'sfx/';
const SR = 'sfx/showreel/';

interface Cue {
	from: number;
	src: string;
	vol: number;
	dur?: number;
}

/**
 * Sound design, frame-accurate to every visual beat of the 1350-frame film (45s @ 30fps).
 *
 * Scene 1 (f0–f270):
 *   - f0: Opener rise + soft whoosh
 *   - f30, f58, f78, f98, f118, f138: Cultural radar nodes pinging along archipelago
 *   - f125: INDONESIA title drops with cinematic whoosh & deep sub-cannon
 *   - f165: Subtitle reveal with crystal chime & gold shimmer
 *   - f258: Exit riser swell into scene cut
 *
 * Scene 2 (f270–f540):
 *   - f270: Bali Candi Bentar split gates parting with heavy whoosh & drop
 *   - f315: Frangipani petal drift with harmonic chime
 *   - f358: Transition whoosh to Batik
 *   - f365: Molten wax canting pen drawing Parang motifs with swipe & ticks
 *   - f410: Parang motif bloom shimmer
 *   - f445: Transition whoosh to Tenun
 *   - f450: Tenun Ikat split screen sliding in with mechanical swipe
 *   - f480: Weaving warp threads alignment ticks
 *   - f528: Exit riser swell into scene cut
 *
 * Scene 3 (f540–f810):
 *   - f540: Subak rice terraces reveal with crystal chime & water shimmer
 *   - f580: Cascading irrigation streams with harmonic chime
 *   - f645: Deep transition whoosh to community network
 *   - f655: Gotong Royong community network nodes connecting with rhythmic ticks
 *   - f700: Communal solidarity ding
 *   - f745: Sacred harmony lotus mandala spin with crystal chime
 *   - f798: Exit riser swell into scene cut
 *
 * Scene 4 (f810–f1080):
 *   - f810: Rumah Gadang soaring Gonjong architecture with heavy sub-cannon impact
 *   - f855: Pucuak Rabuang ornaments shine with shimmer
 *   - f898: Toraja Tongkonan boat-roof reveal with punch impact
 *   - f945: Pa'tedong sacred sun motifs with harmonic chime
 *   - f988: 4-panel kinetic slit mosaic begins sliding in with heavy whoosh
 *   - f1010: Slam 1 "17,508 ISLANDS" with drop impact & tick
 *   - f1032: Slam 2 "1,340+ CULTURES" with punch impact & tick
 *   - f1054: Slam 3 "ONE SOUL" with sub-cannon impact & max riser
 *   - f1068: Climax transition riser
 *
 * Scene 5 (f1080–f1350):
 *   - f1080: Converging kaleidoscope mandala blooms with cinematic whoosh & drop
 *   - f1120: Golden vortex shimmer
 *   - f1160: GRAND TITLE IMPACT: "MENGENAL KEARIFAN LOKAL INDONESIA" with sub-cannon 2 & punch
 *   - f1190: "Discovering Indonesia's Local Wisdom" subtitle & badge with crystal chime
 *   - f1220: Celestial confirmation bell
 *   - f1260: Grand finale orchestral chime chord
 *   - f1328: Outro blackout snap collapse
 */
const CUES: Cue[] = [
	// ── 01 The Magic of Indonesia (f0 – f270) ──
	{ from: 0, src: ROOT + 'rise.wav', vol: 0.38, dur: 40 },
	{ from: 6, src: ROOT + 'whoosh.wav', vol: 0.3, dur: 24 },
	{ from: 30, src: SR + 'ui-tick-crisp.wav', vol: 0.22, dur: 10 },
	{ from: 58, src: SR + 'ui-tick-crisp.wav', vol: 0.22, dur: 10 },
	{ from: 78, src: SR + 'ui-tick-crisp.wav', vol: 0.22, dur: 10 },
	{ from: 98, src: SR + 'ui-tick-crisp.wav', vol: 0.22, dur: 10 },
	{ from: 118, src: SR + 'ui-tick-crisp.wav', vol: 0.22, dur: 10 },
	{ from: 125, src: ROOT + 'whoosh-cinematic.mp3', vol: 0.42, dur: 35 },
	{ from: 125, src: SR + 'impact-sub-cannon-1.mp3', vol: 0.45, dur: 30 },
	{ from: 126, src: SR + 'impact-drop-1.wav', vol: 0.35, dur: 24 },
	{ from: 138, src: SR + 'ui-tick-crisp.wav', vol: 0.22, dur: 10 },
	{ from: 165, src: SR + 'chime-crystal.wav', vol: 0.38, dur: 36 },
	{ from: 168, src: SR + 'sparkle-shimmer-1.mp3', vol: 0.3, dur: 30 },
	{ from: 258, src: SR + 'riser-swell-1.mp3', vol: 0.4, dur: 24 },
	{ from: 264, src: SR + 'whoosh-fast-1.mp3', vol: 0.38, dur: 16 },

	// ── 02 Traditions That Tell Stories (f270 – f540) ──
	{ from: 270, src: SR + 'whoosh-heavy-4.mp3', vol: 0.38, dur: 22 },
	{ from: 271, src: SR + 'impact-drop-2.wav', vol: 0.34, dur: 24 },
	{ from: 315, src: SR + 'chime-harmonic.mp3', vol: 0.3, dur: 32 },
	{ from: 358, src: SR + 'whoosh-air-5.mp3', vol: 0.32, dur: 18 },
	{ from: 365, src: SR + 'ui-swipe-1.wav', vol: 0.28, dur: 16 },
	{ from: 375, src: SR + 'ui-tick-crisp.wav', vol: 0.2, dur: 10 },
	{ from: 410, src: SR + 'sparkle-shimmer-2.mp3', vol: 0.28, dur: 28 },
	{ from: 445, src: SR + 'whoosh-deep-3.mp3', vol: 0.38, dur: 22 },
	{ from: 450, src: SR + 'ui-swipe-2.wav', vol: 0.3, dur: 16 },
	{ from: 452, src: SR + 'whoosh-fast-2.mp3', vol: 0.3, dur: 16 },
	{ from: 480, src: SR + 'ui-tick-soft.wav', vol: 0.22, dur: 10 },
	{ from: 528, src: SR + 'riser-swell-1.mp3', vol: 0.4, dur: 24 },
	{ from: 534, src: SR + 'whoosh-fast-1.mp3', vol: 0.38, dur: 16 },

	// ── 03 Wisdom in Everyday Life (f540 – f810) ──
	{ from: 540, src: SR + 'chime-crystal.wav', vol: 0.36, dur: 34 },
	{ from: 542, src: SR + 'sparkle-shimmer-1.mp3', vol: 0.3, dur: 28 },
	{ from: 580, src: SR + 'chime-harmonic.mp3', vol: 0.32, dur: 32 },
	{ from: 645, src: SR + 'whoosh-deep-3.mp3', vol: 0.38, dur: 22 },
	{ from: 665, src: SR + 'ui-tick-crisp.wav', vol: 0.22, dur: 10 },
	{ from: 680, src: SR + 'ui-tick-soft.wav', vol: 0.2, dur: 10 },
	{ from: 695, src: SR + 'ui-tick-soft.wav', vol: 0.2, dur: 10 },
	{ from: 700, src: ROOT + 'ding.wav', vol: 0.3, dur: 24 },
	{ from: 710, src: SR + 'ui-tick-soft.wav', vol: 0.18, dur: 10 },
	{ from: 745, src: SR + 'chime-crystal.wav', vol: 0.38, dur: 34 },
	{ from: 748, src: SR + 'sparkle-shimmer-2.mp3', vol: 0.3, dur: 28 },
	{ from: 798, src: SR + 'riser-swell-1.mp3', vol: 0.4, dur: 24 },
	{ from: 804, src: SR + 'whoosh-fast-1.mp3', vol: 0.38, dur: 16 },

	// ── 04 A Mosaic of Diversity (f810 – f1080) ──
	{ from: 810, src: SR + 'impact-sub-cannon-1.mp3', vol: 0.46, dur: 28 },
	{ from: 811, src: SR + 'whoosh-heavy-4.mp3', vol: 0.38, dur: 20 },
	{ from: 855, src: SR + 'sparkle-shimmer-1.mp3', vol: 0.28, dur: 26 },
	{ from: 898, src: SR + 'impact-punch-1.mp3', vol: 0.42, dur: 20 },
	{ from: 899, src: SR + 'whoosh-fast-2.mp3', vol: 0.32, dur: 16 },
	{ from: 945, src: SR + 'chime-harmonic.mp3', vol: 0.32, dur: 30 },
	{ from: 988, src: SR + 'whoosh-heavy-4.mp3', vol: 0.4, dur: 20 },
	{ from: 1010, src: SR + 'impact-drop-1.wav', vol: 0.4, dur: 20 },
	{ from: 1011, src: SR + 'ui-tick-crisp.wav', vol: 0.24, dur: 10 },
	{ from: 1032, src: SR + 'impact-punch-3.mp3', vol: 0.42, dur: 20 },
	{ from: 1033, src: SR + 'ui-tick-crisp.wav', vol: 0.24, dur: 10 },
	{ from: 1054, src: SR + 'impact-sub-cannon-2.mp3', vol: 0.48, dur: 28 },
	{ from: 1055, src: SR + 'riser-maximize.wav', vol: 0.38, dur: 26 },
	{ from: 1068, src: SR + 'riser-swell-1.mp3', vol: 0.42, dur: 24 },
	{ from: 1074, src: SR + 'whoosh-fast-1.mp3', vol: 0.4, dur: 16 },

	// ── 05 The Future of Our Heritage (f1080 – f1350) ──
	{ from: 1080, src: ROOT + 'whoosh-cinematic.mp3', vol: 0.44, dur: 32 },
	{ from: 1081, src: SR + 'impact-drop-2.wav', vol: 0.38, dur: 24 },
	{ from: 1120, src: SR + 'sparkle-shimmer-1.mp3', vol: 0.32, dur: 28 },
	{ from: 1160, src: SR + 'impact-sub-cannon-2.mp3', vol: 0.5, dur: 32 },
	{ from: 1161, src: SR + 'impact-punch-1.mp3', vol: 0.42, dur: 22 },
	{ from: 1190, src: SR + 'chime-crystal.wav', vol: 0.4, dur: 36 },
	{ from: 1192, src: SR + 'sparkle-shimmer-2.mp3', vol: 0.32, dur: 28 },
	{ from: 1220, src: SR + 'ui-confirm-bell.wav', vol: 0.34, dur: 24 },
	{ from: 1260, src: SR + 'chime-finale.mp3', vol: 0.5, dur: 45 },
	{ from: 1328, src: SR + 'snap-collapse.wav', vol: 0.42, dur: 22 },
];

export const KearifanAudio: React.FC = () => {
	return (
		<>
			{/* Ambient music bed with smooth fade in & out for 1350 frames (45s) */}
			<Audio
				src={staticFile(
					'musik/siarhei_korbut-chill-out-short-pixabay-316888.mp3',
				)}
				loop
				volume={(f) =>
					interpolate(f, [0, 60, 1260, 1345], [0, 0.32, 0.32, 0], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})
				}
			/>

			{/* Frame-accurate accents across all 5 scenes */}
			{CUES.map((cue, i) => (
				<Sequence
					key={i}
					from={cue.from}
					durationInFrames={cue.dur ?? 30}
					name={`SFX ${cue.from}`}
				>
					<Audio src={staticFile(cue.src)} volume={cue.vol} />
				</Sequence>
			))}
		</>
	);
};

