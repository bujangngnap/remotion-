import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C } from '../constants';
import { FONT_TITLE, FONT_SERIF, FONT_MONO } from '../fonts';

interface KineticTextProps {
	text: string;
	startFrame?: number;
	fontSize?: number;
	color?: string;
	accentGradient?: boolean;
	fontVariant?: 'title' | 'serif' | 'mono';
	letterSpacing?: string;
	style?: React.CSSProperties;
}

export const KineticTitle: React.FC<KineticTextProps> = ({
	text,
	startFrame = 0,
	fontSize = 120,
	color = C.pureWhite,
	accentGradient = true,
	fontVariant = 'title',
	letterSpacing = '0.08em',
	style,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const localFrame = Math.max(0, frame - startFrame);

	// Spring entrance punch
	const spr = spring({
		frame: localFrame,
		fps,
		config: { damping: 13, stiffness: 140, mass: 0.9 },
	});

	const scale = interpolate(spr, [0, 1], [1.4, 1]);
	const opacity = interpolate(localFrame, [0, 8], [0, 1], {
		extrapolateRight: 'clamp',
	});

	// Continuous slow cinematic push in
	const cinematicDrift = interpolate(localFrame, [0, 180], [1, 1.05]);

	const font =
		fontVariant === 'title'
			? FONT_TITLE
			: fontVariant === 'serif'
			? FONT_SERIF
			: FONT_MONO;

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				transform: `scale(${scale * cinematicDrift})`,
				opacity,
				...style,
			}}
		>
			<span
				style={{
					fontFamily: font,
					fontSize,
					fontWeight: fontVariant === 'serif' ? 600 : 900,
					letterSpacing,
					textTransform: fontVariant === 'mono' ? 'uppercase' : undefined,
					color: accentGradient ? undefined : color,
					background: accentGradient
						? `linear-gradient(180deg, #FFFFFF 0%, ${C.imperialGold} 60%, ${C.warmAmber} 100%)`
						: undefined,
					WebkitBackgroundClip: accentGradient ? 'text' : undefined,
					WebkitTextFillColor: accentGradient ? 'transparent' : undefined,
					filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.85)) drop-shadow(0 0 40px rgba(255,200,55,0.35))',
					textAlign: 'center',
					lineHeight: 1.05,
				}}
			>
				{text}
			</span>
		</div>
	);
};
