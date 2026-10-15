// ── IntroScene: breathtaking royal Javanese opening (frames 0-120) ──────────
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Easing } from 'remotion';
import { Trail } from '@remotion/motion-blur';
import { FPS, C } from '../config';
import { Fan } from '../components/Fan';
import { WaveText } from '../components/WaveText';
import { RoyalBatikDivider } from './ContentScene';

/**
 * Super-Dazzling Royal Opening:
 * 1. 0:00-0:24: Fan swoops in with spin & Trail blur while unfolding.
 * 2. 0:24-0:30: SNAP! Fan bursts open to full 148° arc; side floral bouquets bloom.
 * 3. 0:24-0:55: Exploding Golden Solar Shockwaves + radial sunbeams + sparkling stardust burst.
 * 4. 0:26-0:90: Grand Royal Presentation Title Card:
 *    - "✦ ROYAL THEATER GUIDE ✦"
 *    - "THEATER ETIQUETTE" (wave-ribbon letter entrance)
 *    - Ornate Royal Batik Divider flourish
 *    - "A Courteous Guide for Every Audience"
 * 5. 0:90-1:20: Cinematic zoom & dissolve forward directly into Scene 1!
 */
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // ── Phase 1: Fan entry & spin deceleration (0-26) ──
  const settleSpring = spring({
    fps: FPS,
    frame,
    config: { damping: 16, stiffness: 85, mass: 1.1 },
    from: 0,
    to: 1,
  });

  const entryScale = interpolate(settleSpring, [0, 1], [3.2, 1]);
  const entryRotation = interpolate(settleSpring, [0, 1], [540, 0]);
  const entryBlur = interpolate(settleSpring, [0, 1], [24, 0]);

  // ── Fan unfolding animation (snaps open at frame 10-24) ──
  const openSpring = spring({
    fps: FPS,
    frame: Math.max(0, frame - 10),
    config: { damping: 13, stiffness: 120 },
    from: 0,
    to: 1,
  });
  const openProgress = frame < 10 ? 0.15 : interpolate(openSpring, [0, 1], [0.15, 1]);

  // ── Side floral bouquets bloom out when fan opens (frame 20+) ──
  const ornamentGrow = spring({
    fps: FPS,
    frame: Math.max(0, frame - 20),
    config: { damping: 14, stiffness: 90 },
    from: 0,
    to: 1,
  });
  const showOrnaments = frame >= 18;

  // ── Golden Solar Shockwaves on snap-open (frames 22-55) ──
  const sw1Progress = interpolate(frame, [22, 52], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sw1Radius = interpolate(sw1Progress, [0, 1], [30, 520], {
    easing: Easing.out(Easing.cubic),
  });
  const sw1Opacity = interpolate(sw1Progress, [0, 0.2, 1], [0, 0.9, 0]);

  const sw2Progress = interpolate(frame, [26, 56], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sw2Radius = interpolate(sw2Progress, [0, 1], [20, 420], {
    easing: Easing.out(Easing.cubic),
  });
  const sw2Opacity = interpolate(sw2Progress, [0, 0.2, 1], [0, 0.75, 0]);

  // ── Burst of 24 sparkling golden particles & jasmine stars ──
  const burstParticles = React.useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const angle = (i * 360) / 24 + ((i * 17) % 15);
      const speed = 7 + (i % 5) * 2.2;
      const size = 12 + (i % 10);
      const isStar = i % 2 === 0;
      return { angle, speed, size, isStar };
    });
  }, []);

  const burstT = Math.max(0, frame - 22);
  const burstProgress = Math.min(1, burstT / 35);
  const burstDecay = Math.pow(1 - burstProgress, 1.8);

  // ── Gentle ambient rotation & breathing during hold (frames 30-90) ──
  const gentleRotation = interpolate(frame, [30, 90], [0, 8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── Phase 3: Scale up & fade out into Scene 1 (frames 90-120) ──
  const exitProgress = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 2.5], {
    easing: Easing.out(Easing.cubic),
  });
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const exitBlur = exitProgress * 10;

  // Composite transform
  const totalScale = frame < 90 ? entryScale : entryScale * exitScale;
  const totalRotation = frame < 30 ? entryRotation : gentleRotation;
  const totalBlur = frame < 30 ? entryBlur : exitBlur;
  const opacity = frame < 90 ? 1 : exitOpacity;

  // Fan vertical placement (at y = 33% for majestic balance)
  const fanY = interpolate(settleSpring, [0, 1], [46, 33]);

  const fanContent = (
    <div
      style={{
        position: 'absolute',
        top: `${fanY}%`,
        left: '50%',
        transform: `translate(-50%, -50%) rotate(${totalRotation}deg) scale(${totalScale})`,
        opacity,
        filter: totalBlur > 0.5 ? `blur(${totalBlur}px)` : undefined,
        willChange: 'transform, opacity, filter',
      }}
    >
      <Fan
        size={540}
        showOrnaments={showOrnaments}
        ornamentScale={ornamentGrow}
        openProgress={openProgress}
      />
    </div>
  );

  // ── Title Card Springs ──
  const preHeaderStart = 20;
  const headingStart = 25;
  const dividerStart = 30;
  const subtitleStart = 33;

  const preHeaderOpacity = interpolate(frame, [preHeaderStart, preHeaderStart + 10], [0, 0.95], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Expanding Golden Solar Shockwaves ── */}
      {frame >= 22 && frame <= 60 && (
        <svg
          viewBox="0 0 1920 960"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {/* Shockwave 1 */}
          <circle
            cx="960"
            cy="317"
            r={sw1Radius}
            fill="none"
            stroke={C.copper}
            strokeWidth="3.5"
            opacity={sw1Opacity}
            strokeDasharray="16 8"
          />
          {/* Shockwave 2 */}
          <circle
            cx="960"
            cy="317"
            r={sw2Radius}
            fill="none"
            stroke={C.rustOrange}
            strokeWidth="2.5"
            opacity={sw2Opacity}
          />
        </svg>
      )}

      {/* ── Exploding Golden Sparkles & Jasmine Burst ── */}
      {frame >= 22 && frame <= 65 && (
        <svg
          viewBox="0 0 1920 960"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {burstParticles.map((p, i) => {
            const rad = (p.angle * Math.PI) / 180;
            const dist = burstProgress * p.speed * 42;
            const px = 960 + Math.cos(rad) * dist;
            const py = 317 + Math.sin(rad) * dist;
            const op = burstDecay * 0.95;
            const rot = frame * 4 + i * 20;

            return p.isStar ? (
              <g
                key={i}
                transform={`translate(${px}, ${py}) rotate(${rot}) scale(${burstDecay})`}
                opacity={op}
              >
                <path
                  d={`M0,-${p.size} Q0,0 ${p.size},0 Q0,0 0,${p.size} Q0,0 -${p.size},0 Q0,0 0,-${p.size} Z`}
                  fill={i % 4 === 0 ? C.copper : C.rustOrange}
                />
                <circle cx="0" cy="0" r={p.size * 0.25} fill={C.cream} />
              </g>
            ) : (
              <circle
                key={i}
                cx={px}
                cy={py}
                r={p.size * 0.35}
                fill={C.copper}
                opacity={op}
              />
            );
          })}
        </svg>
      )}

      {/* ── Fan with Motion Blur Trail during rapid entry ── */}
      {frame < 20 ? (
        <Trail layers={4} lagInFrames={0.5} trailOpacity={0.45}>
          {fanContent}
        </Trail>
      ) : (
        fanContent
      )}

      {/* ── Grand Royal Presentation Title Card ── */}
      {frame >= preHeaderStart && (
        <div
          style={{
            position: 'absolute',
            top: '66%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${totalScale})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            textAlign: 'center',
            width: '100%',
            opacity,
            filter: totalBlur > 0.5 ? `blur(${totalBlur}px)` : undefined,
            willChange: 'transform, opacity, filter',
          }}
        >
          {/* Pre-header tag */}
          <div
            style={{
              letterSpacing: 9,
              fontSize: 16,
              fontWeight: 800,
              color: C.rustOrange,
              textTransform: 'uppercase',
              opacity: preHeaderOpacity,
              textShadow: '0 2px 8px rgba(194, 84, 45, 0.35)',
              transform: `scale(${interpolate(preHeaderOpacity, [0, 0.95], [0.85, 1])})`,
            }}
          >
            ✦ &nbsp; ROYAL THEATER GUIDE &nbsp; ✦
          </div>

          {/* Main Title: THEATER ETIQUETTE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Left golden star sparkle */}
            <span
              style={{
                fontSize: 26,
                color: C.copper,
                opacity: interpolate(frame, [headingStart, headingStart + 8], [0, 0.9], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: `scale(${interpolate(frame, [headingStart, headingStart + 8], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}) rotate(${frame * 0.6}deg)`,
              }}
            >
              ✦
            </span>

            <WaveText
              text="THEATER ETIQUETTE"
              startFrame={headingStart}
              variant="heading"
              fontSize={54}
            />

            {/* Right golden star sparkle */}
            <span
              style={{
                fontSize: 26,
                color: C.copper,
                opacity: interpolate(frame, [headingStart, headingStart + 8], [0, 0.9], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: `scale(${interpolate(frame, [headingStart, headingStart + 8], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })}) rotate(${-frame * 0.6}deg)`,
              }}
            >
              ✦
            </span>
          </div>

          {/* Royal Batik Divider flourish */}
          <RoyalBatikDivider
            progress={spring({
              fps: FPS,
              frame: Math.max(0, frame - dividerStart),
              config: { damping: 16, stiffness: 90 },
              from: 0,
              to: 1,
            })}
          />

          {/* Subtitle with fast, fluid stagger so it holds settled */}
          <WaveText
            text="A Courteous Guide for Every Audience"
            startFrame={subtitleStart}
            variant="subtitle"
            fontSize={33}
            stagger={0.62}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
