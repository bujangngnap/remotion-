// ── WaveText: letter-by-letter wave-path entrance ───────────────────────
import React from 'react';
import { useCurrentFrame, spring } from 'remotion';
import { FPS, C, ANIM } from '../config';
import { FONTS } from '../fonts';

interface WaveTextProps {
  text: string;
  /** Frame (relative to Scene sequence) when the animation starts */
  startFrame: number;
  /** 'heading' or 'subtitle' */
  variant: 'heading' | 'subtitle';
  /** Font size override */
  fontSize?: number;
  /** Custom stagger per letter in frames */
  stagger?: number;
}

/**
 * Splits text into characters and animates each along a ribbon-like sine-wave path.
 *
 * - Heading: starts ~80px to the right, ~40px above, rotating -25 to +25 deg.
 * - Subtitle: starts ~60px to the left, ~24px above (gentler amplitude).
 * - Offset by sin(i * 0.6 + frame * 0.25) * 14px so the row flows like a ribbon.
 * - Staggers by 1.25-1.5 frames per letter.
 * - Damping 14, stiffness 120 gives a spring overshoot before settling to 1.0.
 * - Final state: perfectly flat, horizontal, centered baseline.
 */
export const WaveText: React.FC<WaveTextProps> = ({
  text,
  startFrame,
  variant,
  fontSize: fontSizeOverride,
  stagger: staggerOverride,
}) => {
  const frame = useCurrentFrame();
  const isHeading = variant === 'heading';

  const lines = text.split('\n');
  const defaultSize = isHeading ? 60 : 46;
  const size = fontSizeOverride ?? defaultSize;

  const color = isHeading ? C.darkBrown : C.rustOrange;
  const fontFamily = isHeading ? FONTS.heading : FONTS.subtitle;
  const fontWeight = isHeading ? 800 : 700;
  const fontStyle = isHeading ? 'normal' : 'italic';
  const letterSpacing = isHeading ? 1 : 0;

  // Direction: heading arrives from right (+1), subtitle from left (-1)
  const dirX = isHeading ? 1 : -1;
  const ampX = isHeading ? 80 : 60;
  const ampY = isHeading ? 40 : 24;
  const waveAmp = isHeading ? 14 : 9;
  const defaultStagger = isHeading ? 1.2 : 0.95;
  const stagger = staggerOverride ?? defaultStagger;

  let globalCharIndex = 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
      }}
    >
      {lines.map((line, lineIdx) => {
        const chars = line.split('');

        return (
          <div
            key={lineIdx}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              flexWrap: 'nowrap',
              whiteSpace: 'pre',
            }}
          >
            {chars.map((char, charIdx) => {
              const i = globalCharIndex++;
              const charDelay = startFrame + i * stagger;
              const localFrame = frame - charDelay;

              // Spring progress
              const sprVal = spring({
                fps: FPS,
                frame: Math.max(0, localFrame),
                config: {
                  damping: ANIM.letterSpring.damping,
                  stiffness: ANIM.letterSpring.stiffness,
                  mass: ANIM.letterSpring.mass,
                },
                from: 0,
                to: 1,
              });

              // Before trigger, keep invisible
              const hasStarted = localFrame >= 0;
              const p = hasStarted ? sprVal : 0;
              // Remaining distance to target (0 when settled)
              const remaining = 1 - p;

              // Wave path: sin(i*0.6 + frame*0.25) * waveAmp
              const wavePhase = i * 0.6 + (hasStarted ? localFrame * 0.25 : 0);
              const waveY = Math.sin(wavePhase) * waveAmp * remaining;

              // Translation
              const tx = remaining * ampX * dirX;
              const ty = remaining * -ampY + waveY;

              // Rotation: -25 to +25 while in flight, goes to 0 as remaining -> 0
              const rotSign = (i % 2 === 0 ? 1 : -1) * (isHeading ? 1 : -0.7);
              const rotation = remaining * 25 * rotSign;

              // Scale: 0.3 -> 1 with spring overshoot (e.g. up to 1.06)
              const scale = 0.3 + p * 0.7;

              // Opacity: smoothly fades in over the first 8-10 frames
              const opacity = hasStarted ? Math.min(1, Math.max(0, p * 1.3)) : 0;

              return (
                <span
                  key={charIdx}
                  style={{
                    display: 'inline-block',
                    fontFamily,
                    fontSize: size,
                    fontWeight,
                    fontStyle,
                    color,
                    letterSpacing,
                    transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${rotation}deg) scale(${scale})`,
                    opacity,
                    minWidth: char === ' ' ? size * 0.32 : undefined,
                    lineHeight: 1.15,
                    textShadow: isHeading
                      ? '0 2px 8px rgba(43, 26, 20, 0.15)'
                      : '0 2px 6px rgba(194, 84, 45, 0.18)',
                    willChange: 'transform, opacity',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
