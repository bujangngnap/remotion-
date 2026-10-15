// ── ContentScene: ultra-ornate template for all 7 etiquette scenes ─────────
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import {
  SceneData, TYPE, ANIM, FPS, C,
} from '../config';
import { WaveText } from '../components/WaveText';
import { SceneIcon } from '../components/Icons';

/**
 * Grand Multi-Tiered Royal Batik Mandala Pedestal behind the icon.
 * Features:
 * - 24 Radiating flame petals (Lidah Api / Surya Majapahit)
 * - 16 Rounded lotus petals with copper & rust orange fills
 * - Outer and inner beaded gold pearl rings with subtle ambient counter-rotation
 * - Flanking royal batik wings (sayap ukiran) embracing the icon
 * - Luminous radial sunburst disk
 */
const GrandBatikMandala: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const rotEntrance = interpolate(progress, [0, 1], [-60, 0]);
  const scale = interpolate(progress, [0, 1], [0.45, 1]);
  // Ambient slow continuous rotation after entering
  const ambientRot = frame * 0.25;

  return (
    <svg
      width={380}
      height={380}
      viewBox="0 0 380 380"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) rotate(${rotEntrance}deg) scale(${scale})`,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
    >
      <defs>
        <radialGradient id="mandalaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF5E6" stopOpacity="0.95" />
          <stop offset="55%" stopColor={C.cream} stopOpacity="0.8" />
          <stop offset="85%" stopColor={C.peach} stopOpacity="0.45" />
          <stop offset="100%" stopColor={C.peach} stopOpacity="0" />
        </radialGradient>
        <filter id="mandalaShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#2B1A14" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* ── Flanking Royal Wings / Carved Tendrils (Sayap Ukiran) ── */}
      <g filter="url(#mandalaShadow)">
        {/* Left Wing */}
        <g transform="translate(38, 190) scale(-1, 1)">
          <path
            d="M0,0 C35,-30 80,-40 115,-12 C90,4 45,4 0,0 Z"
            fill={C.rustOrange}
            opacity={0.82}
          />
          <path
            d="M0,0 C30,-18 65,-22 92,-6 C70,6 35,6 0,0 Z"
            fill={C.copper}
            opacity={0.9}
          />
          <circle cx="115" cy="-12" r="4" fill={C.darkBrown} />
        </g>
        {/* Right Wing */}
        <g transform="translate(342, 190)">
          <path
            d="M0,0 C35,-30 80,-40 115,-12 C90,4 45,4 0,0 Z"
            fill={C.rustOrange}
            opacity={0.82}
          />
          <path
            d="M0,0 C30,-18 65,-22 92,-6 C70,6 35,6 0,0 Z"
            fill={C.copper}
            opacity={0.9}
          />
          <circle cx="115" cy="-12" r="4" fill={C.darkBrown} />
        </g>
      </g>

      {/* ── Luminous Center Disk ── */}
      <circle cx="190" cy="190" r="160" fill="url(#mandalaGlow)" />

      {/* ── Rotating Mandala Group ── */}
      <g transform={`rotate(${ambientRot} 190 190)`}>
        {/* Tier 1: 24 Radiating Flame Petals (Lidah Api) */}
        {Array.from({ length: 24 }, (_, i) => i * 15).map((a) => (
          <g key={`flame-${a}`} transform={`rotate(${a} 190 190)`}>
            <path
              d="M190,38 C186,60 182,85 190,102 C198,85 194,60 190,38 Z"
              fill={a % 30 === 0 ? C.rustOrange : C.copper}
              opacity={0.85}
            />
            <circle cx="190,38" r="2.5" fill={C.darkBrown} />
          </g>
        ))}

        {/* Outer scalloped ring */}
        <circle
          cx="190"
          cy="190"
          r="142"
          fill="none"
          stroke={C.copper}
          strokeWidth="2"
          strokeDasharray="7 4"
          opacity={0.7}
        />

        {/* Tier 2: 16 Rounded Lotus Petals */}
        {Array.from({ length: 16 }, (_, i) => i * 22.5).map((a) => (
          <g key={`petal-${a}`} transform={`rotate(${a} 190 190)`}>
            <ellipse
              cx="190"
              cy="68"
              rx="12"
              ry="22"
              fill={C.rustOrange}
              stroke={C.darkBrown}
              strokeWidth="1.4"
              opacity={0.92}
            />
            <circle cx="190" cy="68" r="3.8" fill={C.cream} />
          </g>
        ))}
      </g>

      {/* ── Counter-Rotating Beaded Golden Rings ── */}
      <g transform={`rotate(${-ambientRot * 1.2} 190 190)`}>
        <circle
          cx="190"
          cy="190"
          r="110"
          fill="none"
          stroke={C.darkBrown}
          strokeWidth="1.8"
          opacity={0.65}
        />
        {Array.from({ length: 32 }, (_, i) => i * 11.25).map((a) => {
          const rad = (a * Math.PI) / 180;
          const x = 190 + Math.sin(rad) * 110;
          const y = 190 - Math.cos(rad) * 110;
          return (
            <circle
              key={`dot-${a}`}
              cx={x}
              cy={y}
              r={2}
              fill={C.copper}
              opacity={0.9}
            />
          );
        })}

        {/* Inner 8-pointed star rosette */}
        {Array.from({ length: 8 }, (_, i) => i * 45).map((a) => (
          <g key={`star-${a}`} transform={`rotate(${a} 190 190)`}>
            <polygon
              points="190,92 195,106 190,111 185,106"
              fill={C.darkBrown}
            />
          </g>
        ))}
      </g>

      {/* Center inner pedestal disk */}
      <circle cx="190" cy="190" r="90" fill={C.cream} stroke={C.copper} strokeWidth="2.8" opacity={0.95} />
      <circle cx="190" cy="190" r="84" fill="none" stroke={C.darkBrown} strokeWidth="1.2" strokeDasharray="4 3" opacity={0.4} />
    </svg>
  );
};

/**
 * Super-rich Royal Batik Divider Flourish between Heading and Subtitle.
 */
export const RoyalBatikDivider: React.FC<{ progress: number }> = ({ progress }) => {
  const scaleX = Math.min(1, progress * 1.2);
  const opacity = Math.min(1, progress * 1.5);

  return (
    <svg
      width={360}
      height={28}
      viewBox="0 0 360 28"
      style={{
        transform: `scaleX(${scaleX})`,
        opacity,
        willChange: 'transform, opacity',
      }}
    >
      {/* ── Left side curling canting vine & leaves ── */}
      <path
        d="M150,14 C120,14 90,4 60,14 C45,19 30,8 40,2 C58,-6 100,10 145,14"
        fill="none"
        stroke={C.copper}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <ellipse cx="75" cy="9" rx="14" ry="5.5" fill={C.rustOrange} transform="rotate(-15 75 9)" opacity={0.88} />
      <circle cx="38" cy="2" r="3.2" fill={C.darkBrown} />
      <circle cx="38" cy="2" r="1.5" fill={C.cream} />

      {/* Left outer floral tip */}
      <path
        d="M38,2 C20,2 8,12 12,20 C16,24 28,20 32,15"
        fill="none"
        stroke={C.copper}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="20" r="2.5" fill={C.rustOrange} />

      {/* ── Right side curling canting vine & leaves ── */}
      <path
        d="M210,14 C240,14 270,4 300,14 C315,19 330,8 320,2 C302,-6 260,10 215,14"
        fill="none"
        stroke={C.copper}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <ellipse cx="285" cy="9" rx="14" ry="5.5" fill={C.rustOrange} transform="rotate(15 285 9)" opacity={0.88} />
      <circle cx="322" cy="2" r="3.2" fill={C.darkBrown} />
      <circle cx="322" cy="2" r="1.5" fill={C.cream} />

      {/* Right outer floral tip */}
      <path
        d="M322,2 C340,2 352,12 348,20 C344,24 332,20 328,15"
        fill="none"
        stroke={C.copper}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="348" cy="20" r="2.5" fill={C.rustOrange} />

      {/* ── Center Belah Ketupat (Diamond) & Rosette ── */}
      <g transform="translate(180, 14)">
        <polygon points="0,-12 14,0 0,12 -14,0" fill={C.rustOrange} stroke={C.blackBrown} strokeWidth="1.8" />
        <polygon points="0,-7 8,0 0,7 -8,0" fill={C.copper} stroke={C.blackBrown} strokeWidth="1" />
        <circle cx="0" cy="0" r="3.2" fill={C.cream} />
        {/* Flanking golden beads */}
        <circle cx="-20" cy="0" r="2.5" fill={C.copper} />
        <circle cx="20" cy="0" r="2.5" fill={C.copper} />
      </g>
    </svg>
  );
};

/**
 * Scene-specific contextual visual enhancements to make each scene lively:
 * - Scene 1: Pulsing acoustic sound waves + floating music notes
 * - Scene 2: Gentle whisper ripple waves
 * - Scene 3: Stage footlights
 * - Scene 4: Expanding flash strobe rays
 * - Scene 5: Drifting "Z z z" + crescent moon
 * - Scene 6: Stage spotlight beams + applause sparkles
 * - Scene 7: Fluttering confetti ribbons + bursting starbursts
 */
const SceneContextDecorations: React.FC<{ iconId: string; frame: number }> = ({
  iconId,
  frame,
}) => {
  if (iconId === 'phone') {
    // Pulsing acoustic sound waves
    return (
      <svg
        width={380}
        height={380}
        viewBox="0 0 380 380"
        style={{ position: 'absolute', pointerEvents: 'none' }}
      >
        {[1, 2, 3].map((ring) => {
          const p = (frame * 0.04 + ring * 0.33) % 1;
          const r = 110 + p * 65;
          const op = (1 - p) * 0.6;
          return (
            <circle
              key={ring}
              cx="190"
              cy="190"
              r={r}
              fill="none"
              stroke={C.rustOrange}
              strokeWidth="2.5"
              strokeDasharray="10 6"
              opacity={op}
            />
          );
        })}
        {/* Floating musical quarter note 1 */}
        <g transform={`translate(${270 + Math.sin(frame * 0.06) * 10}, ${100 - (frame * 0.4) % 80})`} opacity={0.75}>
          <ellipse cx="0" cy="0" rx="7" ry="5" fill={C.copper} transform="rotate(-20)" />
          <line x1="6" y1="-2" x2="6" y2="-22" stroke={C.copper} strokeWidth="2.5" strokeLinecap="round" />
        </g>
        {/* Floating musical quarter note 2 */}
        <g transform={`translate(${110 + Math.sin(frame * 0.06 + 2) * 10}, ${130 - ((frame + 40) * 0.4) % 80})`} opacity={0.75}>
          <ellipse cx="0" cy="0" rx="7" ry="5" fill={C.copper} transform="rotate(-20)" />
          <line x1="6" y1="-2" x2="6" y2="-22" stroke={C.copper} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  if (iconId === 'quiet') {
    // Gentle curved whisper ripples
    return (
      <svg
        width={380}
        height={380}
        viewBox="0 0 380 380"
        style={{ position: 'absolute', pointerEvents: 'none' }}
      >
        {[-1, 1].map((side) => (
          <g key={side} transform={`translate(190, 190) scale(${side}, 1)`}>
            <path
              d="M100,-40 Q130,0 100,40"
              fill="none"
              stroke={C.copper}
              strokeWidth="2.5"
              strokeDasharray="6 4"
              opacity={0.6 + 0.3 * Math.sin(frame * 0.08)}
            />
            <path
              d="M118,-60 Q155,0 118,60"
              fill="none"
              stroke={C.rustOrange}
              strokeWidth="2"
              opacity={0.4 + 0.3 * Math.cos(frame * 0.08)}
            />
          </g>
        ))}
      </svg>
    );
  }

  if (iconId === 'sleep') {
    // Drifting "Z z z" + crescent moon
    return (
      <svg
        width={380}
        height={380}
        viewBox="0 0 380 380"
        style={{ position: 'absolute', pointerEvents: 'none' }}
      >
        {/* Crescent moon */}
        <path
          d="M260,85 A22,22 0 1,0 285,115 A16,16 0 1,1 260,85 Z"
          fill={C.copper}
          opacity={0.85}
        />
        {/* Floating Z letters */}
        {[
          { size: 28, delay: 0, xOff: 0 },
          { size: 22, delay: 20, xOff: 20 },
          { size: 16, delay: 40, xOff: 40 },
        ].map((z, idx) => {
          const t = (frame + z.delay) % 75;
          const p = t / 75;
          const y = 140 - p * 80;
          const x = 240 + z.xOff + Math.sin(p * Math.PI * 2) * 12;
          const op = (1 - p) * 0.85;

          return (
            <text
              key={idx}
              x={x}
              y={y}
              fontSize={z.size}
              fontFamily="Playfair Display, serif"
              fontStyle="italic"
              fontWeight="bold"
              fill={C.rustOrange}
              opacity={op}
            >
              z
            </text>
          );
        })}
      </svg>
    );
  }

  if (iconId === 'applause') {
    // Exploding confetti ribbons and bursting stars
    return (
      <svg
        width={480}
        height={480}
        viewBox="0 0 480 480"
        style={{ position: 'absolute', pointerEvents: 'none', overflow: 'visible' }}
      >
        {Array.from({ length: 14 }, (_, i) => {
          const angle = (i * 360) / 14 + frame * 0.3;
          const rad = (angle * Math.PI) / 180;
          const dist = 160 + (i % 3) * 25 + Math.sin(frame * 0.1 + i) * 12;
          const cx = 240 + Math.cos(rad) * dist;
          const cy = 240 + Math.sin(rad) * dist;
          const isStar = i % 2 === 0;

          return isStar ? (
            <g key={i} transform={`translate(${cx}, ${cy}) rotate(${frame * 2 + i * 25})`}>
              <path
                d="M0,-8 Q0,0 8,0 Q0,0 0,8 Q0,0 -8,0 Q0,0 0,-8 Z"
                fill={i % 4 === 0 ? C.copper : C.rustOrange}
                opacity={0.85}
              />
            </g>
          ) : (
            <rect
              key={i}
              x={cx}
              y={cy}
              width={10}
              height={5}
              rx={2}
              fill={i % 3 === 0 ? C.darkBrown : C.copper}
              transform={`rotate(${frame * 3 + i * 40} ${cx} ${cy})`}
              opacity={0.8}
            />
          );
        })}
      </svg>
    );
  }

  if (iconId === 'camera') {
    // Camera strobe rays
    return (
      <svg
        width={400}
        height={400}
        viewBox="0 0 400 400"
        style={{ position: 'absolute', pointerEvents: 'none' }}
      >
        {Array.from({ length: 8 }, (_, i) => {
          const angle = i * 45;
          const rad = (angle * Math.PI) / 180;
          const x1 = 200 + Math.cos(rad) * 125;
          const y1 = 200 + Math.sin(rad) * 125;
          const x2 = 200 + Math.cos(rad) * 165;
          const y2 = 200 + Math.sin(rad) * 165;
          const op = 0.4 + 0.4 * Math.sin(frame * 0.15 + i);

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={C.copper}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={op}
            />
          );
        })}
      </svg>
    );
  }

  return null;
};

interface ContentSceneProps {
  scene: SceneData;
  /** Previous scene's icon id, for ghost overlap */
  prevIconId?: string;
}

/**
 * Super-rich per-scene template with royal batik styling:
 * - Icon: pops in at scene start + 6 frames with a Grand Multi-Tiered Batik Mandala.
 * - Flanking royal wings & contextual decorations.
 * - Heading: wave-path entrance at start + 12 frames with flanking golden 4-point stars.
 * - Divider: 360px wide royal batik flourish expands gracefully.
 * - Subtitle: wave entrance at start + 20 frames with scroll accents.
 * - Exit: dissolve blur + opacity + scale 0.96 + dust scatter.
 */
export const ContentScene: React.FC<ContentSceneProps> = ({
  scene,
  prevIconId,
}) => {
  const frame = useCurrentFrame();
  const { dur, heading, subtitle, iconId, highIcon } = scene;

  // ── Icon entrance (start + 6 frames) ──
  const iconSpringProgress = spring({
    fps: FPS,
    frame: Math.max(0, frame - ANIM.iconDelay),
    config: {
      damping: ANIM.iconSpring.damping,
      stiffness: ANIM.iconSpring.stiffness,
      mass: ANIM.iconSpring.mass,
    },
    from: 0,
    to: 1,
  });
  const iconStarted = frame >= ANIM.iconDelay;
  const iconScale = iconStarted ? interpolate(iconSpringProgress, [0, 1], [0.7, 1]) : 0.7;
  const iconOpacity = iconStarted ? Math.min(1, iconSpringProgress * 1.2) : 0;

  // ── Text timing (heading at start+10, subtitle at start+16) ──
  const headingStart = ANIM.iconDelay + 4; // 10 frames
  const subtitleStart = headingStart + 6;  // 16 frames

  // ── Text vertical settling for highIcon scenes (2, 4, 5, 6, 7) ──
  const textSettleProgress = highIcon
    ? spring({
        fps: FPS,
        frame: Math.max(0, frame - headingStart),
        config: { damping: 18, stiffness: 85 },
        from: 0,
        to: 1,
      })
    : 1;
  const textYOffset = highIcon ? (1 - textSettleProgress) * -32 : 0;

  // ── Exit dissolve (last 20 frames) ──
  const exitStart = Math.max(0, dur - ANIM.exitDur);
  const exitProgress = interpolate(
    frame,
    [exitStart, dur],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const exitBlur = exitProgress * 8;
  const exitOpacity = 1 - exitProgress;
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.96]);

  // ── Layout positions ──
  const iconY = highIcon ? TYPE.iconYHigh : TYPE.iconY;

  // ── Deterministic dust particles on exit ──
  const dustParticles = heading.split('').map((_, i) => {
    const seed = i * 11 + 17;
    const angle = (seed * 137.5) % 360;
    const dist = 15 + (seed % 65) * exitProgress;
    return {
      x: Math.cos((angle * Math.PI) / 180) * dist,
      y: Math.sin((angle * Math.PI) / 180) * dist,
      opacity: (1 - exitProgress) * 0.7,
      size: 2 + (seed % 3),
    };
  });

  return (
    <AbsoluteFill
      style={{
        filter: exitProgress > 0 ? `blur(${exitBlur}px)` : undefined,
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
        willChange: 'transform, opacity, filter',
      }}
    >
      {/* ── Previous icon ghost (cross-fade overlap) ── */}
      {prevIconId && frame < 16 && (
        <div
          style={{
            position: 'absolute',
            top: `${iconY * 100}%`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: interpolate(frame, [0, 15], [0.25, 0], {
              extrapolateRight: 'clamp',
            }),
            pointerEvents: 'none',
          }}
        >
          <SceneIcon iconId={prevIconId} />
        </div>
      )}

      {/* ── Main Scene Icon with Grand Batik Mandala & Contextual Elements ── */}
      <div
        style={{
          position: 'absolute',
          top: `${iconY * 100}%`,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 380,
          height: 380,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Grand Multi-tiered circular batik mandala behind glyph */}
        <GrandBatikMandala
          progress={iconStarted ? iconSpringProgress : 0}
          frame={frame}
        />

        {/* Scene-specific visual decorations (sound waves, notes, flash rays, etc.) */}
        <SceneContextDecorations iconId={iconId} frame={frame} />

        {/* Flat solid dark-brown glyph with drop-shadow */}
        <div
          style={{
            transform: `scale(${iconScale})`,
            opacity: iconOpacity,
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 4px 8px rgba(43, 26, 20, 0.22))',
          }}
        >
          <SceneIcon iconId={iconId} frame={frame} />
        </div>
      </div>

      {/* ── Text Block with Royal Batik Flourish Divider ── */}
      <div
        style={{
          position: 'absolute',
          top: `${TYPE.headingY * 100}%`,
          left: '50%',
          transform: `translate(-50%, calc(-50% + ${textYOffset}px))`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          textAlign: 'center',
          width: '100%',
          willChange: 'transform',
        }}
      >
        {/* Heading (~60px, Montserrat ExtraBold uppercase, dark brown) flanked by golden stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Left golden star */}
          <span
            style={{
              fontSize: 22,
              color: C.copper,
              opacity: interpolate(frame, [headingStart, headingStart + 10], [0, 0.85], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `scale(${interpolate(frame, [headingStart, headingStart + 10], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}) rotate(${frame * 0.5}deg)`,
            }}
          >
            ✦
          </span>

          <WaveText
            text={heading}
            startFrame={headingStart}
            variant="heading"
            fontSize={TYPE.headingSize}
          />

          {/* Right golden star */}
          <span
            style={{
              fontSize: 22,
              color: C.copper,
              opacity: interpolate(frame, [headingStart, headingStart + 10], [0, 0.85], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `scale(${interpolate(frame, [headingStart, headingStart + 10], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })}) rotate(${-frame * 0.5}deg)`,
            }}
          >
            ✦
          </span>
        </div>

        {/* Super-rich Royal Batik Divider flourish */}
        <RoyalBatikDivider
          progress={spring({
            fps: FPS,
            frame: Math.max(0, frame - (headingStart + 10)),
            config: { damping: 16, stiffness: 90 },
            from: 0,
            to: 1,
          })}
        />

        {/* Subtitle (~46px, Playfair Display Italic, rust orange) */}
        <WaveText
          text={subtitle}
          startFrame={subtitleStart}
          variant="subtitle"
          fontSize={TYPE.subtitleSize}
        />
      </div>

      {/* ── Exit dust / specks scattering ── */}
      {exitProgress > 0 && (
        <div
          style={{
            position: 'absolute',
            top: `${TYPE.headingY * 100}%`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        >
          {dustParticles.map((p, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                borderRadius: '50%',
                backgroundColor: C.darkBrown,
                opacity: p.opacity,
                transform: `translate(${p.x}px, ${p.y}px)`,
              }}
            />
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};
