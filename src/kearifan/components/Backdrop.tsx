import React from 'react';
import { AbsoluteFill } from 'remotion';

/**
 * Base dark backdrop: flat ink color, an optional radial glow
 * and a cinematic vignette. Children render above the glow.
 */
export const Backdrop: React.FC<{
	color?: string;
	glow?: string;
	glowAt?: string;
	glowSize?: number;
	vignette?: number;
	children?: React.ReactNode;
}> = ({
	color = '#0B0E17',
	glow = 'rgba(233,180,76,0.15)',
	glowAt = '50% 42%',
	glowSize = 60,
	vignette = 0.5,
	children,
}) => {
	return (
		<AbsoluteFill style={{ backgroundColor: color }}>
			<AbsoluteFill
				style={{
					background: `radial-gradient(${glowSize}% ${glowSize}% at ${glowAt}, ${glow}, transparent 72%)`,
				}}
			/>
			{children}
			{vignette > 0 ? (
				<AbsoluteFill
					style={{
						background: `radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,${vignette}) 100%)`,
						pointerEvents: 'none',
					}}
				/>
			) : null}
		</AbsoluteFill>
	);
};
