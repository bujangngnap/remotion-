import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';

/**
 * SHOWREEL AUDIO & SOUND DESIGN (FRAME-ACCURATE PRO SYNC)
 *
 * Meticulously aligned to every visual trigger:
 * - Boot: f0 init, f8 glitch label, f14 orange ruler shoot, f34 orange wipe
 * - Countdown: f48 ("2" spring slam), f96 ("1" RGB glitch bar), f118-f144 (drop riser)
 * - Kinetic Type: f144 ("MAKE" drop), f174 ("THINGS" snap), f204 ("MOVE." tilt), f222 ("with intent." sparkle), f232 (circle expand)
 * - Geometry: f240 (transition), f280 ("Form." crystal chord), f320 (zoom/swirl)
 * - Particles: f360 (stardust entry), f385 (constellation connect), f430 (converge to CLAUDE)
 * - Depth: f480 (submersible slam), f510 (camera shutter), f570 (metaball sweep)
 * - Interface: f600 (full bento drop), f612-f636 (metric ticks), f650 (toggle flip), f685 (button click & confirm chime)
 * - Rhythm: f720 ("RHYTHM"), f735 (rings tunnel), f750 (halftone), f765 ("ALIVE" underline slam)
 * - Identity: f780 (entry), f785-f805 (letters settle), f820 (orbit ring chord), f835 (branding sparkle), f888 (snap collapse to line)
 */
export const ShowreelAudio: React.FC = () => {
	return (
		<>
			{/* ═══════════════════ SCENE 00: BOOT (f0 - f47) ═══════════════════ */}
			{/* f0: Subtle system power-on glitch */}
			<Sequence from={0} durationInFrames={12} name="SFX: Boot Power Glitch">
				<Audio src={staticFile('sfx/showreel/glitch-1.wav')} volume={0.3} />
			</Sequence>

			{/* f8: Glitch label C<2F> flickers onto screen */}
			<Sequence from={8} durationInFrames={15} name="SFX: Glitch Label Telemetry">
				<Audio src={staticFile('sfx/showreel/cyber-beep-1.mp3')} volume={0.32} />
			</Sequence>

			{/* f14: Orange laser ruler line shoots across the screen */}
			<Sequence from={14} durationInFrames={16} name="SFX: Ruler Laser Shoot">
				<Audio src={staticFile('sfx/showreel/whoosh-air-5.mp3')} volume={0.4} />
			</Sequence>

			{/* f34: Full-screen hot orange wipe slams down */}
			<Sequence from={34} durationInFrames={16} name="SFX: Orange Wipe Slam">
				<Audio src={staticFile('sfx/showreel/whoosh-fast-1.mp3')} volume={0.45} />
			</Sequence>


			{/* ═══════════════════ SCENE 00: COUNTDOWN (f48 - f143) ═══════════════════ */}
			{/* f48: Giant "2" spring slams into orange screen! */}
			<Sequence from={48} durationInFrames={18} name="SFX: Count 2 Impact">
				<Audio src={staticFile('sfx/showreel/impact-punch-1.mp3')} volume={0.52} />
			</Sequence>
			<Sequence from={48} durationInFrames={15} name="SFX: Count 2 Cyber Pulse">
				<Audio src={staticFile('sfx/showreel/cyber-beep-2.mp3')} volume={0.38} />
			</Sequence>

			{/* f96: Giant "1" RGB glitch bar slams into black screen! */}
			<Sequence from={96} durationInFrames={18} name="SFX: Count 1 Impact">
				<Audio src={staticFile('sfx/showreel/impact-punch-2.mp3')} volume={0.55} />
			</Sequence>
			<Sequence from={96} durationInFrames={14} name="SFX: Count 1 RGB Glitch">
				<Audio src={staticFile('sfx/showreel/glitch-2.wav')} volume={0.42} />
			</Sequence>

			{/* f118 - f144: Tension Riser builds energy right into the drop! */}
			<Sequence from={118} durationInFrames={26} name="SFX: Drop Riser Maximize">
				<Audio src={staticFile('sfx/showreel/riser-maximize.wav')} volume={0.5} />
			</Sequence>
			<Sequence from={124} durationInFrames={20} name="SFX: Drop Swell">
				<Audio src={staticFile('sfx/showreel/riser-swell-1.mp3')} volume={0.48} />
			</Sequence>


			{/* ═══════════════════ SCENE 01: KINETIC TYPE (f144 - f239) ═══════════════════ */}
			{/* f144: THE DROP! "MAKE" slams onto screen with sub-bass cannon slam + heavy air whoosh */}
			<Sequence from={144} durationInFrames={28} name="SFX: Drop Sub Cannon (MAKE)">
				<Audio src={staticFile('sfx/showreel/impact-sub-cannon-1.mp3')} volume={0.7} />
			</Sequence>
			<Sequence from={144} durationInFrames={20} name="SFX: Drop Heavy Whoosh (MAKE)">
				<Audio src={staticFile('sfx/showreel/whoosh-heavy-4.mp3')} volume={0.52} />
			</Sequence>

			{/* f174: "THINGS" zoom snaps onto acid lime screen! */}
			<Sequence from={174} durationInFrames={24} name="SFX: Things Sub Slam (THINGS)">
				<Audio src={staticFile('sfx/showreel/impact-sub-cannon-2.mp3')} volume={0.62} />
			</Sequence>
			<Sequence from={174} durationInFrames={18} name="SFX: Things Whoosh (THINGS)">
				<Audio src={staticFile('sfx/showreel/whoosh-fast-2.mp3')} volume={0.5} />
			</Sequence>

			{/* f204: "MOVE." slams on orange with tilted letters! */}
			<Sequence from={204} durationInFrames={20} name="SFX: Move Punch Slam (MOVE.)">
				<Audio src={staticFile('sfx/showreel/impact-punch-3.mp3')} volume={0.58} />
			</Sequence>
			<Sequence from={204} durationInFrames={18} name="SFX: Move Fast Whoosh (MOVE.)">
				<Audio src={staticFile('sfx/showreel/whoosh-fast-1.mp3')} volume={0.48} />
			</Sequence>

			{/* f222: "with intent." elegant serif subtitle appears with shimmer */}
			<Sequence from={222} durationInFrames={24} name="SFX: Intent Sparkle">
				<Audio src={staticFile('sfx/showreel/sparkle-shimmer-1.mp3')} volume={0.4} />
			</Sequence>

			{/* f232: Black circle transition scales up to swallow screen */}
			<Sequence from={232} durationInFrames={16} name="SFX: Circle Expand Swipe">
				<Audio src={staticFile('sfx/showreel/whoosh-air-5.mp3')} volume={0.42} />
			</Sequence>


			{/* ═══════════════════ SCENE 02: GEOMETRY (f240 - f359) ═══════════════════ */}
			{/* f240: Transition hit into dot matrix */}
			<Sequence from={240} durationInFrames={18} name="SFX: Geometry Entry Drop">
				<Audio src={staticFile('sfx/showreel/impact-drop-1.wav')} volume={0.42} />
			</Sequence>

			{/* f260: Wave ripple through dots */}
			<Sequence from={260} durationInFrames={14} name="SFX: Matrix Wave Swipe">
				<Audio src={staticFile('sfx/showreel/ui-swipe-1.wav')} volume={0.32} />
			</Sequence>

			{/* f280: "Form." appears in difference blend mode — crystal harmonic bell chord */}
			<Sequence from={280} durationInFrames={28} name="SFX: Form Crystal Chime">
				<Audio src={staticFile('sfx/showreel/chime-crystal.wav')} volume={0.5} />
			</Sequence>
			<Sequence from={280} durationInFrames={32} name="SFX: Form Harmonic Accent">
				<Audio src={staticFile('sfx/showreel/chime-harmonic.mp3')} volume={0.42} />
			</Sequence>

			{/* f320: End swirl & zoom outwards */}
			<Sequence from={320} durationInFrames={24} name="SFX: Geometry Swirl Whoosh">
				<Audio src={staticFile('sfx/showreel/whoosh-deep-3.mp3')} volume={0.46} />
			</Sequence>


			{/* ═══════════════════ SCENE 03: PARTICLES (f360 - f479) ═══════════════════ */}
			{/* f360: Atmospheric cosmic transition */}
			<Sequence from={360} durationInFrames={22} name="SFX: Particles Entry Whoosh">
				<Audio src={staticFile('sfx/showreel/whoosh-deep-3.mp3')} volume={0.4} />
			</Sequence>

			{/* f385: Constellation wireframe connects */}
			<Sequence from={385} durationInFrames={26} name="SFX: Constellation Sparkle">
				<Audio src={staticFile('sfx/showreel/sparkle-shimmer-2.mp3')} volume={0.38} />
			</Sequence>

			{/* f430: 3200 particles converge together to spell CLAUDE */}
			<Sequence from={430} durationInFrames={34} name="SFX: Converge Swell">
				<Audio src={staticFile('sfx/showreel/riser-swell-2.mp3')} volume={0.45} />
			</Sequence>
			<Sequence from={445} durationInFrames={28} name="SFX: Converge Crystal Resonance">
				<Audio src={staticFile('sfx/showreel/chime-crystal.wav')} volume={0.45} />
			</Sequence>


			{/* ═══════════════════ SCENE 04: DEPTH (f480 - f599) ═══════════════════ */}
			{/* f480: "DEPTH" spring slams into center */}
			<Sequence from={480} durationInFrames={22} name="SFX: Depth Sub Slam">
				<Audio src={staticFile('sfx/showreel/impact-drop-2.wav')} volume={0.48} />
			</Sequence>
			<Sequence from={480} durationInFrames={18} name="SFX: Depth Fast Whoosh">
				<Audio src={staticFile('sfx/showreel/whoosh-fast-2.mp3')} volume={0.42} />
			</Sequence>

			{/* f510: Mechanical camera aperture snapshot on 3D perspective */}
			<Sequence from={510} durationInFrames={16} name="SFX: Depth Camera Shutter">
				<Audio src={staticFile('sfx/shutter.wav')} volume={0.5} />
			</Sequence>

			{/* f570: Metaball blob merges and sweeps across screen */}
			<Sequence from={570} durationInFrames={30} name="SFX: Metaball Sweep Riser">
				<Audio src={staticFile('sfx/showreel/riser-swell-1.mp3')} volume={0.45} />
			</Sequence>


			{/* ═══════════════════ SCENE 05: INTERFACE (f600 - f719) ═══════════════════ */}
			{/* f600: Full-size bento grid cards drop into place */}
			<Sequence from={600} durationInFrames={18} name="SFX: Bento Grid Entrance Drop">
				<Audio src={staticFile('sfx/showreel/impact-drop-1.wav')} volume={0.46} />
			</Sequence>
			<Sequence from={600} durationInFrames={16} name="SFX: Bento Air Swipe">
				<Audio src={staticFile('sfx/showreel/whoosh-fast-1.mp3')} volume={0.4} />
			</Sequence>

			{/* f612 - f636: Metric counter rapid tactile haptic ticks (+0% → +242%) */}
			{[612, 618, 624, 630, 636].map((f) => (
				<Sequence key={`ui-tick-${f}`} from={f} durationInFrames={8} name="SFX: Metric Crisp Tick">
					<Audio src={staticFile('sfx/showreel/ui-tick-crisp.wav')} volume={0.25} />
				</Sequence>
			))}

			{/* f650: Physical toggle switch flips on Card 2 (Motion System) */}
			<Sequence from={650} durationInFrames={14} name="SFX: Real Toggle Switch Flip">
				<Audio src={staticFile('sfx/showreel/ui-toggle-switch.wav')} volume={0.55} />
			</Sequence>

			{/* f682: Mouse button press down on RENDER */}
			<Sequence from={682} durationInFrames={8} name="SFX: Mouse Click Down">
				<Audio src={staticFile('sfx/showreel/ui-mouse-press.wav')} volume={0.5} />
			</Sequence>

			{/* f685: Button turns green "DONE ✓" — mouse release + modern confirmation chime */}
			<Sequence from={685} durationInFrames={10} name="SFX: Mouse Click Up">
				<Audio src={staticFile('sfx/showreel/ui-mouse-release.wav')} volume={0.45} />
			</Sequence>
			<Sequence from={685} durationInFrames={26} name="SFX: Done Confirmation Chime">
				<Audio src={staticFile('sfx/showreel/ui-confirm-chime.wav')} volume={0.55} />
			</Sequence>
			<Sequence from={685} durationInFrames={20} name="SFX: Done Confirmation Bell">
				<Audio src={staticFile('sfx/showreel/ui-confirm-bell.wav')} volume={0.45} />
			</Sequence>


			{/* ═══════════════════ SCENE 06: RHYTHM / ALIVE (f720 - f779) ═══════════════════ */}
			{/* Cut 1 (f720): "RHYTHM" stripes slam */}
			<Sequence from={720} durationInFrames={15} name="SFX: Rhythm Cut Punch">
				<Audio src={staticFile('sfx/showreel/impact-punch-1.mp3')} volume={0.6} />
			</Sequence>
			<Sequence from={720} durationInFrames={15} name="SFX: Rhythm Whoosh">
				<Audio src={staticFile('sfx/showreel/whoosh-heavy-4.mp3')} volume={0.5} />
			</Sequence>

			{/* Cut 2 (f735): Concentric Rings Tunnel */}
			<Sequence from={735} durationInFrames={14} name="SFX: Rings Glitch Snap">
				<Audio src={staticFile('sfx/showreel/glitch-2.wav')} volume={0.48} />
			</Sequence>
			<Sequence from={735} durationInFrames={14} name="SFX: Rings Fast Air">
				<Audio src={staticFile('sfx/showreel/whoosh-fast-1.mp3')} volume={0.45} />
			</Sequence>

			{/* Cut 3 (f750): Halftone Rings Flash */}
			<Sequence from={750} durationInFrames={14} name="SFX: Halftone Punch Slam">
				<Audio src={staticFile('sfx/showreel/impact-punch-3.mp3')} volume={0.55} />
			</Sequence>

			{/* Cut 4 (f765): "ALIVE" + Hot Orange Underline Slam! */}
			<Sequence from={765} durationInFrames={26} name="SFX: Alive Sub Cannon Slam">
				<Audio src={staticFile('sfx/showreel/impact-sub-cannon-1.mp3')} volume={0.68} />
			</Sequence>
			<Sequence from={765} durationInFrames={16} name="SFX: Alive Deep Whoosh">
				<Audio src={staticFile('sfx/showreel/whoosh-deep-3.mp3')} volume={0.52} />
			</Sequence>


			{/* ═══════════════════ SCENE 07: IDENTITY FINALE (f780 - f900) ═══════════════════ */}
			{/* f780: Whoosh into dark brown-black finale arena */}
			<Sequence from={780} durationInFrames={22} name="SFX: Finale Entry Whoosh">
				<Audio src={staticFile('sfx/showreel/whoosh-deep-3.mp3')} volume={0.48} />
			</Sequence>

			{/* f785 - f805: Letters tumble in and bounce into place */}
			<Sequence from={785} durationInFrames={12} name="SFX: Letter Bounce 1">
				<Audio src={staticFile('sfx/showreel/ui-click-tactile.wav')} volume={0.38} />
			</Sequence>
			<Sequence from={792} durationInFrames={12} name="SFX: Letter Bounce 2">
				<Audio src={staticFile('sfx/showreel/ui-tick-crisp.wav')} volume={0.42} />
			</Sequence>
			<Sequence from={800} durationInFrames={14} name="SFX: Letter Settle Drop">
				<Audio src={staticFile('sfx/showreel/impact-drop-1.wav')} volume={0.44} />
			</Sequence>

			{/* f820: Orbit ring illuminates with orbiting dots — harmonic finale chime */}
			<Sequence from={820} durationInFrames={38} name="SFX: Orbit Ring Chime Chord">
				<Audio src={staticFile('sfx/showreel/chime-finale.mp3')} volume={0.58} />
			</Sequence>
			<Sequence from={820} durationInFrames={30} name="SFX: Orbit Ring Crystal Accent">
				<Audio src={staticFile('sfx/showreel/chime-crystal.wav')} volume={0.48} />
			</Sequence>

			{/* f835: "MOTION DESIGNER" & "Showreel 2026" appear with subtle sparkle */}
			<Sequence from={835} durationInFrames={24} name="SFX: Branding Shimmer">
				<Audio src={staticFile('sfx/showreel/sparkle-shimmer-1.mp3')} volume={0.38} />
			</Sequence>

			{/* f888: Logo snaps and collapses into thin orange line */}
			<Sequence from={888} durationInFrames={16} name="SFX: Final Snap Collapse">
				<Audio src={staticFile('sfx/showreel/snap-collapse.wav')} volume={0.62} />
			</Sequence>
			<Sequence from={888} durationInFrames={14} name="SFX: Final Collapse Whoosh">
				<Audio src={staticFile('sfx/showreel/whoosh-fast-2.mp3')} volume={0.48} />
			</Sequence>
			{/* f898: Hard cut to pitch black — absolute silence */}
		</>
	);
};
