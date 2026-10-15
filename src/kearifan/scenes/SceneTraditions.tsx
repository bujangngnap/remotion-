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
import { BatikGrid } from '../components/Batik';
import { KineticText } from '../components/KineticText';
import { GlassChip, SceneLabel } from '../components/UI';
import { C, IMG } from '../constants';
import { FONT_DISPLAY, FONT_SERIF, FONT_UI } from '../fonts';
import { Tenun } from '../illustrations/Tenun';
import { clamp, easeInOutCubic, smoothstep } from '../utils';

const LEFT_W = 1060;
const RIGHT_W = 860;

/**
 * [3.0 – 6.0 s] 02 / TRADITIONS THAT TELL STORIES
 * Split screen: Balinese ceremony photo + a kawung batik wall drawing
 * itself stroke by stroke, a weaving inset, match-cut sweep, chips.
 */
export const SceneTraditions: React.FC = () => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();

	const entrL = spring({
		frame: f,
		fps,
		config: { damping: 17, stiffness: 90 },
		durationInFrames: 28,
	});
	const entrR = spring({
		frame: f - 2,
		fps,
		config: { damping: 17, stiffness: 90 },
		durationInFrames: 28,
	});
	const exit = easeInOutCubic(clamp((f - 80) / 10, 0, 1));
	const leftX = -(1 - entrL) * 90 - exit * (LEFT_W + 120);
	const rightX = (1 - entrR) * 90 + exit * (RIGHT_W + 120);

	// photo slow push
	const photoScale = interpolate(f, [0, 90], [1.06, 1.16]);
	const photoTx = interpolate(f, [0, 90], [-12, 12]);

	// match-cut sweep
	const sweepP = clamp((f - 52) / 12, 0, 1);

	// weaving card
	const cardS = spring({
		frame: f - 42,
		fps,
		config: { damping: 16, stiffness: 130 },
		durationInFrames: 24,
	});

	return (
		<AbsoluteFill style={{ backgroundColor: '#0D1226', overflow: 'hidden' }}>
			{/* ═══ LEFT: ceremony photo panel ═══ */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					width: LEFT_W,
					height: 1080,
					transform: `translateX(${leftX}px)`,
					overflow: 'hidden',
				}}
			>
				<Img
					src={staticFile(IMG.ceremony)}
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						transform: `translateX(${photoTx}px) scale(${photoScale})`,
						filter: 'saturate(0.94) contrast(1.06) brightness(0.95)',
					}}
				/>
				<AbsoluteFill
					style={{
						background:
							'linear-gradient(180deg, rgba(13,18,38,0.4) 0%, rgba(13,18,38,0.04) 38%, rgba(13,18,38,0.3) 66%, rgba(13,18,38,0.8) 100%)',
					}}
				/>
				{/* inner golden frame */}
				<div
					style={{
						position: 'absolute',
						inset: 20,
						border: '1px solid rgba(233,180,76,0.38)',
						opacity: smoothstep(6, 18, f),
						pointerEvents: 'none',
					}}
				/>
				{/* headline */}
				<div style={{ position: 'absolute', left: 96, bottom: 118 }}>
					<KineticText
						text="EVERY PATTERN"
						start={16}
						stagger={1.4}
						springDuration={26}
						fontFamily={FONT_DISPLAY}
						fontSize={82}
						color={C.cream}
						blur={8}
						glow="0 10px 50px rgba(0,0,0,0.6)"
					/>
					<KineticText
						text="TELLS A STORY."
						start={26}
						stagger={1.4}
						springDuration={26}
						fontFamily={FONT_SERIF}
						fontStyle="italic"
						fontSize={74}
						color={C.goldBright}
						rise={62}
						glow="0 8px 40px rgba(0,0,0,0.55)"
						style={{ marginTop: 8 }}
					/>
				</div>
			</div>

			{/* ═══ RIGHT: batik wall panel ═══ */}
			<div
				style={{
					position: 'absolute',
					left: LEFT_W,
					top: 0,
					width: RIGHT_W,
					height: 1080,
					transform: `translateX(${rightX}px)`,
					overflow: 'hidden',
					backgroundColor: '#10173A',
				}}
			>
				<BatikGrid
					f={f}
					start={8}
					cols={7}
					rows={9}
					cell={120}
					wave={2.2}
					color={C.gold}
					colorAlt={C.goldBright}
					strokeWidth={2.5}
					style={{ position: 'absolute', left: 10, top: 0 }}
				/>
				<AbsoluteFill
					style={{
						background:
							'radial-gradient(70% 60% at 50% 45%, transparent 40%, rgba(9,12,24,0.55) 100%)',
					}}
				/>

				{/* weaving inset card */}
				<div
					style={{
						position: 'absolute',
						left: 80,
						top: 84,
						width: 560,
						height: 336,
						background: 'rgba(8,11,20,0.82)',
						border: '1px solid rgba(233,180,76,0.34)',
						borderRadius: 18,
						overflow: 'hidden',
						opacity: cardS,
						transform: `scale(${0.92 + cardS * 0.08})`,
						boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
					}}
				>
					<div
						style={{
							position: 'absolute',
							left: 22,
							top: 14,
							width: 1160,
							height: 580,
							transform: 'scale(0.447)',
							transformOrigin: 'top left',
						}}
					>
						<Tenun f={Math.max(0, f - 44)} />
					</div>
					<div
						style={{
							position: 'absolute',
							left: 24,
							bottom: 16,
							display: 'flex',
							alignItems: 'center',
							gap: 10,
						}}
					>
						<span
							style={{
								width: 7,
								height: 7,
								borderRadius: '50%',
								background: C.gold,
								display: 'inline-block',
							}}
						/>
						<span
							style={{
								fontFamily: FONT_UI,
								fontWeight: 700,
								fontSize: 14,
								letterSpacing: '0.2em',
								color: 'rgba(243,233,210,0.85)',
							}}
						>
							TENUN — BENANG &amp; DOA
						</span>
					</div>
				</div>

				{/* chips */}
				{[
					{ start: 30, text: 'BATIK — titik demi titik' },
					{ start: 35, text: 'UPACARA — Bali' },
					{ start: 40, text: 'TENUN — helai demi helai' },
				].map((chip, i) => {
					const s = spring({
						frame: f - chip.start,
						fps,
						config: { damping: 16, stiffness: 130 },
						durationInFrames: 22,
					});
					return (
						<div
							key={chip.text}
							style={{
								position: 'absolute',
								left: 80,
								top: 472 + i * 68,
								transform: `translateX(${(1 - s) * 80}px)`,
								opacity: s,
							}}
						>
							<GlassChip start={0}>
								<span
									style={{
										width: 7,
										height: 7,
										borderRadius: '50%',
										background: C.goldBright,
										display: 'inline-block',
										marginRight: 4,
									}}
								/>
								{chip.text}
							</GlassChip>
						</div>
					);
				})}
			</div>

			{/* golden divider */}
			<div
				style={{
					position: 'absolute',
					left: LEFT_W - 1,
					top: 0,
					width: 3,
					height: 1080,
					background: `linear-gradient(180deg, transparent, ${C.gold} 30%, ${C.goldBright} 50%, ${C.gold} 70%, transparent)`,
					opacity: smoothstep(4, 16, f) * 0.85,
				}}
			/>

			{/* match-cut sweep */}
			{sweepP > 0 && sweepP < 1 ? (
				<div
					style={{
						position: 'absolute',
						inset: -200,
						background:
							'linear-gradient(100deg, transparent 34%, rgba(247,217,138,0.5) 50%, transparent 66%)',
						transform: `translateX(${interpolate(sweepP, [0, 1], [-1700, 2500])}px) skewX(-12deg)`,
						mixBlendMode: 'screen',
						pointerEvents: 'none',
					}}
				/>
			) : null}

			<SceneLabel index="02" title="TRADITIONS THAT TELL STORIES" start={2} />

			{/* exit darkening */}
			<AbsoluteFill
				style={{
					backgroundColor: '#05070E',
					opacity: exit * 0.5,
					pointerEvents: 'none',
				}}
			/>
		</AbsoluteFill>
	);
};
