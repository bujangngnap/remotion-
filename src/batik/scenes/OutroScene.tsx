// ── OutroScene: fan exit (frames 990-1130 relative: 0-140) ───────────────
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Easing } from 'remotion';
import { Trail } from '@remotion/motion-blur';
import { FPS } from '../config';
import { Fan } from '../components/Fan';

/**
 * Outro timeline (relative frames, scene starts at 0 = frame 990 global):
 * 0-30   (33:00-34:00): Huge fan sweeps in from bottom-right, shrinks to center (spring + motion blur).
 * 30-90  (34:00-36:00): Fan idles at center with ornaments (same as intro layout), slowly rotating.
 * 90-120 (36:00-37:00): Fan rotates & shifts, center ornament slides out.
 * 120-140 (37:00-37:45): Fan zooms in massively, extreme rotational motion blur, looping back to frame 0!
 */
export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // ── Phase 1: Fan sweeps in from bottom-right (0-30) ──
  const enterSpring = spring({
    fps: FPS,
    frame,
    config: { damping: 18, stiffness: 80, mass: 1.2 },
    from: 0,
    to: 1,
  });

  const enterX = interpolate(enterSpring, [0, 1], [650, 0]);
  const enterY = interpolate(enterSpring, [0, 1], [450, 0]);
  const enterScale = interpolate(enterSpring, [0, 1], [3.2, 1]);
  const enterBlur = interpolate(enterSpring, [0, 1], [22, 0]);
  const enterRotation = interpolate(enterSpring, [0, 1], [90, 0]);

  // ── Phase 2: Idle rotation (30-90) ──
  const idleRotation = interpolate(frame, [30, 90], [0, 20], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── Phase 3: Rotate & shift (90-120) ──
  const shiftProgress = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shiftRotation = interpolate(
    shiftProgress,
    [0, 1],
    [20, 55],
    { easing: Easing.out(Easing.cubic) },
  );
  const shiftX = interpolate(shiftProgress, [0, 1], [0, -60]);

  // ── Phase 4: Massive zoom + extreme blur (120-140) ──
  // Matches opening frame (scale ~3.4x, fast spin, heavy blur) for seamless loop!
  const zoomProgress = interpolate(frame, [120, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const zoomScale = interpolate(
    zoomProgress,
    [0, 1],
    [1, 5.0],
    { easing: Easing.in(Easing.quad) },
  );
  const zoomBlur = interpolate(zoomProgress, [0, 1], [0, 32]);
  const zoomRotation = interpolate(
    zoomProgress,
    [0, 1],
    [0, 720],
    { easing: Easing.in(Easing.cubic) },
  );

  // ── Composite values ──
  let totalScale = 1;
  let totalRotation = 0;
  let totalBlur = 0;
  let translateX = 0;
  let translateY = 0;

  if (frame < 30) {
    totalScale = enterScale;
    totalRotation = enterRotation;
    totalBlur = enterBlur;
    translateX = enterX;
    translateY = enterY;
  } else if (frame < 90) {
    totalRotation = idleRotation;
  } else if (frame < 120) {
    totalRotation = shiftRotation;
    translateX = shiftX;
  } else {
    totalRotation = 55 + zoomRotation;
    totalScale = zoomScale;
    totalBlur = zoomBlur;
    translateX = -60 * (1 - zoomProgress);
  }

  // Side ornaments grow in by frame 30 and stay
  const showOrnaments = frame >= 24;
  const ornamentScale = spring({
    fps: FPS,
    frame: Math.max(0, frame - 24),
    config: { damping: 16, stiffness: 80 },
    from: 0,
    to: 1,
  });

  const fanContent = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translate(${translateX}px, ${translateY}px) rotate(${totalRotation}deg) scale(${totalScale})`,
        filter: totalBlur > 0.5 ? `blur(${totalBlur}px)` : undefined,
        willChange: 'transform, filter',
      }}
    >
      <Fan
        size={600}
        showOrnaments={showOrnaments}
        ornamentScale={ornamentScale}
      />
    </div>
  );

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Use Trail for sweep-in (0-20) and massive zoom (124-140) */}
      {frame < 20 || frame >= 124 ? (
        <Trail layers={4} lagInFrames={0.5} trailOpacity={0.45}>
          {fanContent}
        </Trail>
      ) : (
        fanContent
      )}
    </AbsoluteFill>
  );
};
