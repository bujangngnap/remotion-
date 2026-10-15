import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface KineticTextProps {
	text: string;
	/** local frame at which the first token starts */
	start?: number;
	per?: 'char' | 'word';
	stagger?: number;
	springDuration?: number;
	damping?: number;
	stiffness?: number;
	mass?: number;
	fontFamily: string;
	fontSize: number;
	fontWeight?: number;
	fontStyle?: React.CSSProperties['fontStyle'];
	color: string;
	letterSpacing?: string | number;
	lineHeight?: number;
	/** how far below it rises from (px) */
	rise?: number;
	/** initial motion blur (px) */
	blur?: number;
	glow?: string;
	style?: React.CSSProperties;
	tokenStyle?: React.CSSProperties;
}

const clampOpt = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/**
 * Kinetic typography — tokens rise out of a mask with a spring,
 * optionally with motion-blur settle. Words or characters.
 */
export const KineticText: React.FC<KineticTextProps> = ({
	text,
	start = 0,
	per = 'char',
	stagger = 1.5,
	springDuration = 26,
	damping = 15,
	stiffness = 130,
	mass = 0.9,
	fontFamily,
	fontSize,
	fontWeight = 400,
	fontStyle,
	color,
	letterSpacing,
	lineHeight = 1,
	rise,
	blur = 0,
	glow,
	style,
	tokenStyle,
}) => {
	const f = useCurrentFrame();
	const { fps } = useVideoConfig();
	const tokens = per === 'word' ? text.split(' ') : text.split('');
	const risePx = rise ?? fontSize * 0.95;

	return (
		<div style={{ display: 'flex', alignItems: 'baseline', ...style }}>
			{tokens.map((t, i) => {
				if (per === 'char' && t === ' ') {
					return (
						<span
							key={`sp-${i}`}
							style={{ display: 'inline-block', width: fontSize * 0.3 }}
						/>
					);
				}
				const s = spring({
					frame: f - start - i * stagger,
					fps,
					config: { damping, stiffness, mass },
					durationInFrames: springDuration,
				});
				const y = interpolate(s, [0, 1], [risePx, 0]);
				const opacity = interpolate(s, [0, 0.4], [0, 1], clampOpt);
				const bl = blur > 0 ? interpolate(s, [0, 0.65], [blur, 0], clampOpt) : 0;
				return (
					<span
						key={`${t}-${i}`}
						style={{
							display: 'inline-block',
							overflow: 'hidden',
							padding: '0.05em 0.06em 0.24em',
							margin: '-0.05em -0.06em -0.24em',
							marginRight:
								per === 'word' && i < tokens.length - 1
									? fontSize * 0.24
									: undefined,
						}}
					>
						<span
							style={{
								display: 'inline-block',
								transform: `translateY(${y}px)`,
								opacity,
								filter: bl > 0.01 ? `blur(${bl}px)` : undefined,
								fontFamily,
								fontSize,
								fontWeight,
								fontStyle,
								color,
								letterSpacing,
								lineHeight,
								textShadow: glow,
								willChange: 'transform',
								...tokenStyle,
							}}
						>
							{t}
						</span>
					</span>
				);
			})}
		</div>
	);
};
