// ── Background: cream-peach gradient + batik kawung wallpaper + silk streaks + jasmine petals + gold stars ──
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, WIDTH, HEIGHT } from '../config';

/**
 * Super-rich Javanese royal background:
 * - Warm cream-peach gradient base (#F6E7D6 -> #EBCDAF)
 * - Authentic repeating Batik Kawung / Ceplokan pattern wallpaper overlay (10% opacity)
 * - Flowing diagonal silk light streaks (glowing white-gold bands drifting slowly)
 * - Floating golden dust particles with soft halos (48 particles)
 * - Drifting 5-petal royal jasmine blossoms (bunga melati) with natural rotation
 * - Twinkling golden 4-point star sparkles (18 stars)
 * - Continuous traditional batik border trim along top and bottom edges
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow horizontal drift for silk streaks
  const drift = frame * 0.18;

  // 48 deterministic floating golden dust motes
  const motes = React.useMemo(() => {
    return Array.from({ length: 48 }, (_, i) => {
      const seed = i * 73 + 19;
      const x0 = (seed * 197) % WIDTH;
      const y0 = (seed * 311) % HEIGHT;
      const speed = 0.3 + (seed % 45) * 0.01;
      const size = 2 + (seed % 4);
      const swayAmp = 12 + (seed % 18);
      const swayFreq = 0.025 + (seed % 30) * 0.001;
      const isGold = i % 2 === 0;
      return { x0, y0, speed, size, swayAmp, swayFreq, isGold };
    });
  }, []);

  // 16 deterministic drifting Jasmine Blossoms (Bunga Melati)
  const melatiBlossoms = React.useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      const seed = i * 137 + 41;
      const x0 = (seed * 229) % WIDTH;
      const y0 = (seed * 359) % HEIGHT;
      const speed = 0.45 + (seed % 30) * 0.012;
      const size = 16 + (seed % 10); // 16px to 25px
      const rotSpeed = ((seed % 2 === 0 ? 1 : -1) * (0.4 + (seed % 20) * 0.02));
      const swayAmp = 20 + (seed % 25);
      const swayFreq = 0.02 + (seed % 20) * 0.001;
      return { x0, y0, speed, size, rotSpeed, swayAmp, swayFreq };
    });
  }, []);

  // 18 deterministic twinkling golden 4-pointed stars
  const stars = React.useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => {
      const seed = i * 97 + 63;
      const x = 80 + (seed * 179) % (WIDTH - 160);
      const y = 60 + (seed * 283) % (HEIGHT - 120);
      const size = 10 + (seed % 8);
      const phase = (seed % 100) * 0.1;
      const speed = 0.06 + (seed % 20) * 0.002;
      return { x, y, size, phase, speed };
    });
  }, []);

  return (
    <AbsoluteFill>
      {/* ── Base cream-peach gradient ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 90% 80% at 50% 45%, ${C.cream} 0%, #F0DEC8 55%, ${C.peach} 100%)`,
        }}
      />

      {/* ── Repeating Batik Kawung & Ceplokan Pattern Wallpaper Overlay ── */}
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.11, // subtle yet rich authentic textile depth
        }}
      >
        <defs>
          <pattern
            id="royalKawungPattern"
            width="96"
            height="96"
            patternUnits="userSpaceOnUse"
          >
            {/* 4 Intersecting elliptical Kawung petals */}
            <g transform="translate(48, 48)">
              {/* Petal 1: Top */}
              <ellipse cx="0" cy="-24" rx="14" ry="24" fill={C.darkBrown} />
              <ellipse cx="0" cy="-24" rx="8" ry="16" fill={C.copper} />
              <circle cx="0" cy="-24" r="3" fill={C.cream} />

              {/* Petal 2: Bottom */}
              <ellipse cx="0" cy="24" rx="14" ry="24" fill={C.darkBrown} />
              <ellipse cx="0" cy="24" rx="8" ry="16" fill={C.copper} />
              <circle cx="0" cy="24" r="3" fill={C.cream} />

              {/* Petal 3: Left */}
              <ellipse cx="-24" cy="0" rx="24" ry="14" fill={C.darkBrown} />
              <ellipse cx="-24" cy="0" rx="16" ry="8" fill={C.copper} />
              <circle cx="-24" cy="0" r="3" fill={C.cream} />

              {/* Petal 4: Right */}
              <ellipse cx="24" cy="0" rx="24" ry="14" fill={C.darkBrown} />
              <ellipse cx="24" cy="0" rx="16" ry="8" fill={C.copper} />
              <circle cx="24" cy="0" r="3" fill={C.cream} />

              {/* Center diamond & canting dots */}
              <polygon points="0,-8 8,0 0,8 -8,0" fill={C.rustOrange} />
              <circle cx="0" cy="0" r="2.5" fill={C.cream} />

              {/* 4 diagonal corner canting dots (cecek) */}
              <circle cx="-20" cy="-20" r="2.2" fill={C.darkBrown} />
              <circle cx="20" cy="-20" r="2.2" fill={C.darkBrown} />
              <circle cx="-20" cy="20" r="2.2" fill={C.darkBrown} />
              <circle cx="20" cy="20" r="2.2" fill={C.darkBrown} />
            </g>

            {/* Corner Kawung quarters */}
            <g transform="translate(0, 0)">
              <circle cx="0" cy="0" r="14" fill="none" stroke={C.darkBrown} strokeWidth="1.5" />
              <circle cx="0" cy="0" r="4" fill={C.rustOrange} />
            </g>
            <g transform="translate(96, 0)">
              <circle cx="0" cy="0" r="14" fill="none" stroke={C.darkBrown} strokeWidth="1.5" />
              <circle cx="0" cy="0" r="4" fill={C.rustOrange} />
            </g>
            <g transform="translate(0, 96)">
              <circle cx="0" cy="0" r="14" fill="none" stroke={C.darkBrown} strokeWidth="1.5" />
              <circle cx="0" cy="0" r="4" fill={C.rustOrange} />
            </g>
            <g transform="translate(96, 96)">
              <circle cx="0" cy="0" r="14" fill="none" stroke={C.darkBrown} strokeWidth="1.5" />
              <circle cx="0" cy="0" r="4" fill={C.rustOrange} />
            </g>
          </pattern>
        </defs>

        <rect width={WIDTH} height={HEIGHT} fill="url(#royalKawungPattern)" />
      </svg>

      {/* ── Diagonal silk fabric light streaks ── */}
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <filter id="silkGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="95" />
          </filter>
        </defs>

        {/* Streak 1: large diagonal band */}
        <rect
          x={-300 + drift}
          y={-150 + drift * 0.4}
          width={700}
          height={1500}
          transform={`rotate(-36, ${WIDTH / 2}, ${HEIGHT / 2})`}
          fill="#FFF9F0"
          opacity={0.24}
          filter="url(#silkGlow)"
        />

        {/* Streak 2: center luminous wash */}
        <rect
          x={700 + drift * 0.8}
          y={-250 + drift * 0.3}
          width={550}
          height={1700}
          transform={`rotate(-42, ${WIDTH / 2}, ${HEIGHT / 2})`}
          fill="#FFFFFF"
          opacity={0.20}
          filter="url(#silkGlow)"
        />

        {/* Streak 3: right golden accent */}
        <rect
          x={1350 + drift * 0.5}
          y={-200 + drift * 0.5}
          width={450}
          height={1400}
          transform={`rotate(-32, ${WIDTH / 2}, ${HEIGHT / 2})`}
          fill="#FFE8D2"
          opacity={0.26}
          filter="url(#silkGlow)"
        />
      </svg>

      {/* ── Twinkling Golden 4-point Star Sparkles ── */}
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {stars.map((s, idx) => {
          const pulse = 0.35 + 0.55 * Math.sin(frame * s.speed + s.phase);
          const rot = frame * 0.4 + idx * 20;
          return (
            <g
              key={idx}
              transform={`translate(${s.x}, ${s.y}) rotate(${rot}) scale(${pulse})`}
              opacity={pulse * 0.75}
            >
              {/* 4-pointed golden sparkle star */}
              <path
                d={`M0,-${s.size} Q0,0 ${s.size},0 Q0,0 0,${s.size} Q0,0 -${s.size},0 Q0,0 0,-${s.size} Z`}
                fill={C.copper}
              />
              <circle cx="0" cy="0" r={s.size * 0.25} fill={C.cream} />
            </g>
          );
        })}
      </svg>

      {/* ── Drifting Jasmine Blossoms (Bunga Melati) ── */}
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {melatiBlossoms.map((b, idx) => {
          const y = ((b.y0 + frame * b.speed) % (HEIGHT + 60) + (HEIGHT + 60)) % (HEIGHT + 60) - 30;
          const x = b.x0 + Math.sin(frame * b.swayFreq + idx) * b.swayAmp;
          const rot = frame * b.rotSpeed;
          const opacity = 0.45 + 0.25 * Math.sin(frame * 0.05 + idx);

          return (
            <g
              key={idx}
              transform={`translate(${x}, ${y}) rotate(${rot}) scale(${b.size / 24})`}
              opacity={opacity}
            >
              {/* 5 rounded white jasmine petals */}
              {[0, 72, 144, 216, 288].map((angle) => (
                <ellipse
                  key={angle}
                  cx="0"
                  cy="-7"
                  rx="4.2"
                  ry="7.5"
                  fill="#FFFDF8"
                  stroke={C.copper}
                  strokeWidth="0.8"
                  transform={`rotate(${angle})`}
                />
              ))}
              {/* Jasmine golden center stamen */}
              <circle cx="0" cy="0" r="3.2" fill={C.copper} />
              <circle cx="0" cy="0" r="1.5" fill={C.cream} />
            </g>
          );
        })}
      </svg>

      {/* ── Ambient floating golden dust / pollen motes ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {motes.map((m, i) => {
          const y = ((m.y0 - frame * m.speed) % (HEIGHT + 40) + (HEIGHT + 40)) % (HEIGHT + 40) - 20;
          const x = m.x0 + Math.sin(frame * m.swayFreq + i) * m.swayAmp;
          const pulse = 0.4 + 0.4 * Math.sin(frame * 0.08 + i);

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: m.size,
                height: m.size,
                borderRadius: '50%',
                backgroundColor: m.isGold ? C.copper : C.rustOrange,
                opacity: pulse * 0.65,
                boxShadow: m.isGold
                  ? `0 0 8px 2px rgba(200, 112, 47, 0.5)`
                  : `0 0 6px 1px rgba(194, 84, 45, 0.4)`,
              }}
            />
          );
        })}
      </div>

      {/* ── Continuous traditional batik border trim (Top & Bottom) ── */}
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          {/* Top border pattern: continuous tumpal & kawung rim */}
          <pattern id="batikBorderPattern" width="36" height="24" patternUnits="userSpaceOnUse">
            {/* Dark background band */}
            <rect x="0" y="0" width="36" height="24" fill={C.blackBrown} opacity={0.12} />
            {/* Tumpal triangle pointing down */}
            <polygon points="18,22 34,2 2,2" fill={C.rustOrange} opacity={0.8} />
            <polygon points="18,15 29,2 7,2" fill={C.copper} opacity={0.88} />
            <circle cx="18" cy="6" r="2.2" fill={C.cream} />
            {/* Top gold beading */}
            <line x1="0" y1="2" x2="36" y2="2" stroke={C.copper} strokeWidth="2" />
            <line x1="0" y1="23" x2="36" y2="23" stroke={C.darkBrown} strokeWidth="1.2" opacity={0.7} />
            <circle cx="0" cy="2" r="2" fill={C.copper} />
            <circle cx="36" cy="2" r="2" fill={C.copper} />
            <circle cx="18" cy="2" r="1.5" fill={C.cream} />
          </pattern>

          {/* Bottom border pattern: tumpal triangle pointing up */}
          <pattern id="batikBorderPatternBottom" width="36" height="24" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="36" height="24" fill={C.blackBrown} opacity={0.12} />
            <polygon points="18,2 34,22 2,22" fill={C.rustOrange} opacity={0.8} />
            <polygon points="18,9 29,22 7,22" fill={C.copper} opacity={0.88} />
            <circle cx="18" cy="18" r="2.2" fill={C.cream} />
            <line x1="0" y1="22" x2="36" y2="22" stroke={C.copper} strokeWidth="2" />
            <line x1="0" y1="1" x2="36" y2="1" stroke={C.darkBrown} strokeWidth="1.2" opacity={0.7} />
            <circle cx="0" cy="22" r="2" fill={C.copper} />
            <circle cx="36" cy="22" r="2" fill={C.copper} />
            <circle cx="18" cy="22" r="1.5" fill={C.cream} />
          </pattern>
        </defs>

        {/* Top edge border strip */}
        <rect x="0" y="0" width={WIDTH} height="24" fill="url(#batikBorderPattern)" />

        {/* Bottom edge border strip */}
        <rect x="0" y={HEIGHT - 24} width={WIDTH} height="24" fill="url(#batikBorderPatternBottom)" />
      </svg>
    </AbsoluteFill>
  );
};
