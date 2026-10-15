import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Backdrop } from '../components/Backdrop';
import { BatikGrid } from '../components/Batik';
import { Embers } from '../components/Embers';
import { GoldRule, SceneLabel } from '../components/UI';
import { KineticText } from '../components/KineticText';
import { C } from '../constants';
import { FONT_DISPLAY, FONT_SERIF, FONT_UI } from '../fonts';
import { ArchipelagoDots } from '../illustrations/ArchipelagoDots';
import { clamp } from '../utils';

const SerifRise: React.FC<{ start: number; text: string }> = ({
	start,
	text,
}) => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();
	const s = spring({
		frame: f - start,
		fps,
		config: { damping: 16, stiffness: 100 },
		durationInFrames: 28,
	});
	return (
		<div
			style={{
				marginTop: 18,
				fontFamily: FONT_SERIF,
				fontStyle: 'italic',
				fontSize: 54,
				color: 'rgba(243,233,210,0.92)',
				transform: `translateY(${(1 - s) * 54}px)`,
				opacity: s,
			}}
		>
			{text}
		</div>
	);
};

/**
 * [12.0 – 15.0 s] 05 / THE FUTURE OF OUR HERITAGE
 * Batik-colored dots converge into the Indonesian archipelago, outlines
 * trace themselves, and the final title lockup rises.
 */
export const SceneFuture: React.FC = () => {
	const f = useCurrentFrame();
	const breath = 1 + 0.004 * Math.sin(f * 0.06);

	return (
		<Backdrop color={C.deepIndigo} glow="rgba(233,180,76,0.16)" glowAt="50% 38%">
			{/* faint oversized kawung texture */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					transform: 'rotate(-6deg) scale(1.08)',
					transformOrigin: 'center',
				}}
			>
				<BatikGrid
					f={999}
					cols={7}
					rows={4}
					cell={300}
					color={C.gold}
					colorAlt={C.goldBright}
					strokeWidth={4}
					opacity={0.07}
					style={{ position: 'absolute', left: -80, top: -140 }}
				/>
			</div>

			<Embers count={22} seed={23} speed={0.6} />

			{/* map + title lockup breathe together */}
			<div style={{ position: 'absolute', inset: 0, transform: `scale(${breath})` }}>
				<ArchipelagoDots f={f} />

				<div
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: 548,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<KineticText
						text="KEARIFAN LOKAL"
						start={40}
						stagger={1.6}
						springDuration={30}
						damping={16}
						stiffness={115}
						fontFamily={FONT_DISPLAY}
						fontSize={150}
						color={C.cream}
						letterSpacing="0.03em"
						blur={10}
						glow="0 14px 80px rgba(233,180,76,0.5)"
						style={{ justifyContent: 'center' }}
					/>
					<GoldRule start={54} width={700} style={{ marginTop: 6 }} />
					<KineticText
						text="INDONESIA"
						start={58}
						stagger={2}
						springDuration={24}
						damping={17}
						stiffness={130}
						fontFamily={FONT_DISPLAY}
						fontSize={58}
						color={C.goldBright}
						letterSpacing="0.5em"
						rise={44}
						style={{
							justifyContent: 'center',
							marginTop: 26,
							paddingLeft: '0.5em',
						}}
					/>
					<SerifRise start={64} text="Warisan yang hidup, akar masa depan." />
					<div
						style={{
							marginTop: 26,
							fontFamily: FONT_UI,
							fontWeight: 800,
							fontSize: 15,
							letterSpacing: '0.42em',
							color: 'rgba(243,233,210,0.55)',
							opacity: clamp((f - 72) / 8, 0, 1),
						}}
					>
						MORE THAN A CULTURE. A LIVING WISDOM.
					</div>
				</div>
			</div>

			<SceneLabel index="05" title="THE FUTURE OF OUR HERITAGE" start={2} />
		</Backdrop>
	);
};
