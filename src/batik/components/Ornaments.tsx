// ── Ornaments: ultra-lush royal Javanese batik decorative stage frame ───────
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { C, FPS, ANIM } from '../config';

/**
 * Ultra-lush Batik Corner Rosette with multi-tiered petals,
 * extensive lung-lungan vines, golden canting beads, and cascading leaves.
 */
const LushCornerBatik: React.FC<{ size: number; mirrored?: boolean }> = ({
  size,
  mirrored,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 360 360"
    style={{
      transform: mirrored ? 'scaleX(-1)' : undefined,
      overflow: 'visible',
    }}
  >
    <defs>
      <filter id={`lushShadow${mirrored ? 'M' : ''}`} x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx={mirrored ? -5 : 5} dy="8" stdDeviation="12" floodColor="#2B1A14" floodOpacity="0.38" />
      </filter>
    </defs>

    <g filter={`url(#lushShadow${mirrored ? 'M' : ''})`}>
      {/* ── Main horizontal sweeping vine along bottom border ── */}
      <path
        d="M20,330 C90,315 180,320 260,285 C310,260 335,225 350,165"
        fill="none"
        stroke={C.blackBrown}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* Secondary vine curling upward along side border */}
      <path
        d="M20,330 C38,260 32,170 65,105 C90,60 125,35 180,18"
        fill="none"
        stroke={C.blackBrown}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Decorative inner spiral tendrils */}
      <path
        d="M160,265 C195,240 210,195 185,160 C160,125 110,135 105,170 C100,205 135,230 160,205"
        fill="none"
        stroke={C.darkBrown}
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity={0.9}
      />
      <path
        d="M65,195 C90,160 135,165 160,125 C175,95 160,55 125,45"
        fill="none"
        stroke={C.copper}
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity={0.92}
      />
      {/* Third inward sweeping vine */}
      <path
        d="M230,290 C290,290 330,260 345,210"
        fill="none"
        stroke={C.rustOrange}
        strokeWidth="3"
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* ── Lush Leaves along horizontal run ── */}
      <ellipse cx={135} cy={305} rx={32} ry={13} fill={C.rustOrange}
        transform="rotate(-25 135 305)" opacity={0.92} />
      <ellipse cx={205} cy={292} rx={29} ry={12} fill={C.darkBrown}
        transform="rotate(-15 205 292)" opacity={0.88} />
      <ellipse cx={275} cy={252} rx={27} ry={11} fill={C.copper}
        transform="rotate(35 275 252)" opacity={0.92} />
      <ellipse cx={325} cy={195} rx={24} ry={10} fill={C.rustOrange}
        transform="rotate(65 325 195)" opacity={0.88} />

      {/* ── Lush Leaves along vertical upward run ── */}
      <ellipse cx={48} cy={255} rx={29} ry={12} fill={C.copper}
        transform="rotate(-75 48 255)" opacity={0.92} />
      <ellipse cx={52} cy={170} rx={30} ry={13} fill={C.darkBrown}
        transform="rotate(-60 52 170)" opacity={0.88} />
      <ellipse cx={82} cy={105} rx={26} ry={11} fill={C.rustOrange}
        transform="rotate(-35 82 105)" opacity={0.92} />
      <ellipse cx={140} cy={48} rx={24} ry={10} fill={C.copper}
        transform="rotate(-15 140 48)" opacity={0.88} />

      {/* Golden spiraling canting beads / jasmine buds */}
      {[
        [180, 18, 8], [350, 165, 8], [125, 45, 6], [160, 205, 6],
        [240, 145, 7], [95, 295, 6], [300, 220, 5], [210, 80, 6],
      ].map(([bx, by, br], idx) => (
        <g key={idx}>
          <circle cx={bx} cy={by} r={br} fill={C.copper} />
          <circle cx={bx} cy={by} r={Number(br) * 0.52} fill={C.cream} />
          <circle cx={bx} cy={by} r={Number(br) * 0.22} fill={C.darkBrown} />
        </g>
      ))}

      {/* ── Main Multi-tiered Royal Batik Rosette Flower ── */}
      <g transform="translate(110, 230)">
        {/* Tier 1: Outer 12 pointed dark petals */}
        {Array.from({ length: 12 }, (_, i) => i * 30).map((angle) => (
          <g key={`t1-${angle}`} transform={`rotate(${angle})`}>
            <path
              d="M0,0 C-18,-24 -22,-62 0,-76 C22,-62 18,-24 0,0 Z"
              fill={C.blackBrown}
            />
            <line x1={0} y1={-15} x2={0} y2={-62} stroke={C.copper} strokeWidth="2.2" opacity={0.9} />
            <circle cx={0} cy={-62} r={3} fill={C.cream} />
            <circle cx={0} cy={-76} r={2} fill={C.rustOrange} />
          </g>
        ))}

        {/* Tier 2: Mid 12 rounded rust orange petals */}
        {Array.from({ length: 12 }, (_, i) => i * 30 + 15).map((angle) => (
          <ellipse
            key={`t2-${angle}`}
            cx={0}
            cy={-38}
            rx={11}
            ry={24}
            fill={C.rustOrange}
            transform={`rotate(${angle})`}
            opacity={0.95}
          />
        ))}

        {/* Tier 3: Inner dark rosettes */}
        {Array.from({ length: 8 }, (_, i) => i * 45).map((angle) => (
          <circle
            key={`t3-${angle}`}
            cx={0}
            cy={-22}
            r={7.5}
            fill={C.darkBrown}
            transform={`rotate(${angle})`}
          />
        ))}

        {/* Center core: cream and copper gold rings */}
        <circle cx={0} cy={0} r={26} fill={C.cream} stroke={C.copper} strokeWidth="3.5" />
        <circle cx={0} cy={0} r={18} fill={C.copper} />
        <circle cx={0} cy={0} r={11} fill={C.cream} />
        <circle cx={0} cy={0} r={5.5} fill={C.blackBrown} />
      </g>
    </g>
  </svg>
);

/**
 * Top corner rich orange & copper batik leaf/feather motifs with sweeping tendrils.
 */
const LushTopCornerMotif: React.FC<{ size: number; mirrored?: boolean }> = ({
  size,
  mirrored,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 280 280"
    style={{
      transform: mirrored ? 'scaleX(-1)' : undefined,
      overflow: 'visible',
    }}
  >
    {/* Main sweeping arc spine */}
    <path
      d="M20,20 C90,38 175,85 220,155 C250,200 260,250 255,280"
      fill="none"
      stroke={C.rustOrange}
      strokeWidth="4.5"
      strokeLinecap="round"
      opacity={0.88}
    />
    <path
      d="M20,20 C55,70 115,140 165,195 C200,235 230,265 255,280"
      fill="none"
      stroke={C.copper}
      strokeWidth="3"
      strokeLinecap="round"
      opacity={0.78}
    />

    {/* Feathery leaves & lobes branching out */}
    {[
      { cx: 75, cy: 42, rx: 36, ry: 13, rot: -20, color: C.rustOrange },
      { cx: 125, cy: 62, rx: 38, ry: 14, rot: -5, color: C.copper },
      { cx: 175, cy: 100, rx: 36, ry: 13, rot: 25, color: C.rustOrange },
      { cx: 215, cy: 155, rx: 34, ry: 12, rot: 50, color: C.copper },
      { cx: 235, cy: 210, rx: 30, ry: 11, rot: 75, color: C.rustOrange },
      // Inner lobes
      { cx: 85, cy: 85, rx: 28, ry: 11, rot: 45, color: C.copper },
      { cx: 130, cy: 125, rx: 30, ry: 11, rot: 60, color: C.rustOrange },
      { cx: 165, cy: 175, rx: 27, ry: 10, rot: 75, color: C.copper },
    ].map((l, i) => (
      <ellipse
        key={i}
        cx={l.cx}
        cy={l.cy}
        rx={l.rx}
        ry={l.ry}
        fill={l.color}
        transform={`rotate(${l.rot} ${l.cx} ${l.cy})`}
        opacity={0.82}
      />
    ))}

    {/* Golden buds and canting beads along spine */}
    {[
      [50, 30], [98, 48], [148, 78], [192, 122], [225, 178], [245, 240],
    ].map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r={5} fill={C.copper} />
        <circle cx={x} cy={y} r={2.2} fill={C.cream} />
      </g>
    ))}
  </svg>
);

/**
 * Full Royal Vertical Batik Columns along Left & Right Edges.
 * Extends from top to bottom, filling the side void with climbing vines,
 * rosettes, and golden beads.
 */
const RoyalSideColumn: React.FC<{ mirrored?: boolean; frame: number }> = ({
  mirrored,
  frame,
}) => {
  const sway = Math.sin(frame * 0.04 + (mirrored ? 1.5 : 0)) * 3;

  return (
    <svg
      width={120}
      height={640}
      viewBox="0 0 120 640"
      style={{
        transform: `${mirrored ? 'scaleX(-1)' : ''} translateX(${sway}px)`,
        overflow: 'visible',
      }}
    >
      {/* Vertical undulating vine trunk */}
      <path
        d="M0,20 C45,100 20,200 48,320 C20,440 45,540 0,620"
        fill="none"
        stroke={C.blackBrown}
        strokeWidth="4"
        strokeLinecap="round"
        opacity={0.85}
      />
      <path
        d="M0,50 C28,120 12,220 32,320 C12,420 28,520 0,590"
        fill="none"
        stroke={C.copper}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.75}
      />

      {/* Side Rosette Medallion at Center (y=320) */}
      <g transform="translate(48, 320)">
        <circle cx="0" cy="0" r="32" fill={C.darkBrown} />
        {/* Radiating 12 petals */}
        {Array.from({ length: 12 }, (_, i) => i * 30).map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-24"
            rx="5.5"
            ry="11"
            fill={C.rustOrange}
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx="0" cy="0" r="18" fill={C.copper} />
        <circle cx="0" cy="0" r="10" fill={C.cream} />
        <circle cx="0" cy="0" r="4.5" fill={C.blackBrown} />
      </g>

      {/* Upper Rosette at y=160 */}
      <g transform="translate(26, 160)">
        <circle cx="0" cy="0" r="20" fill={C.darkBrown} />
        <circle cx="0" cy="0" r="12" fill={C.copper} />
        <circle cx="0" cy="0" r="6" fill={C.cream} />
      </g>

      {/* Lower Rosette at y=480 */}
      <g transform="translate(26, 480)">
        <circle cx="0" cy="0" r="20" fill={C.darkBrown} />
        <circle cx="0" cy="0" r="12" fill={C.copper} />
        <circle cx="0" cy="0" r="6" fill={C.cream} />
      </g>

      {/* Branching leaves along vertical spine */}
      {[
        { y: 80, x: 22, rot: 30, color: C.rustOrange },
        { y: 120, x: 34, rot: 45, color: C.copper },
        { y: 220, x: 38, rot: 25, color: C.rustOrange },
        { y: 260, x: 42, rot: -30, color: C.copper },
        { y: 380, x: 42, rot: 30, color: C.copper },
        { y: 420, x: 36, rot: -25, color: C.rustOrange },
        { y: 520, x: 30, rot: 45, color: C.copper },
        { y: 560, x: 20, rot: -30, color: C.rustOrange },
      ].map((l, i) => (
        <ellipse
          key={i}
          cx={l.x}
          cy={l.y}
          rx={20}
          ry={9}
          fill={l.color}
          transform={`rotate(${l.rot} ${l.x} ${l.y})`}
          opacity={0.85}
        />
      ))}

      {/* Golden canting beads */}
      {[60, 190, 290, 350, 450, 580].map((by, idx) => (
        <g key={idx}>
          <circle cx={40} cy={by} r={4.5} fill={C.copper} />
          <circle cx={40} cy={by} r={2} fill={C.cream} />
        </g>
      ))}
    </svg>
  );
};

/**
 * Royal Javanese Archway Pelmet spanning across the Top.
 * 11 hanging golden tumpal pendants with beaded drop chains and teardrop gems,
 * linked with carved floral scrollwork.
 */
const RoyalTopArch: React.FC<{ frame: number }> = ({ frame }) => {
  const pendantCount = 11;
  const spacing = 100;
  const totalWidth = (pendantCount - 1) * spacing + 120;

  return (
    <svg
      width={totalWidth}
      height={110}
      viewBox={`0 0 ${totalWidth} 110`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="archShadow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#2B1A14" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#archShadow)">
        {/* Horizontal carved pelmet beam */}
        <path
          d={`M0,18 Q${totalWidth / 2},32 ${totalWidth},18 L${totalWidth},26 Q${totalWidth / 2},40 0,26 Z`}
          fill={C.darkBrown}
        />
        <path
          d={`M10,22 Q${totalWidth / 2},35 ${totalWidth - 10},22`}
          fill="none"
          stroke={C.copper}
          strokeWidth="2.5"
        />

        {/* 11 Hanging Pendants with subtle swinging pendulum motion */}
        {Array.from({ length: pendantCount }, (_, i) => {
          const px = 60 + i * spacing;
          const isCenter = i === Math.floor(pendantCount / 2);
          const isMidCenter = Math.abs(i - Math.floor(pendantCount / 2)) <= 2;
          const chainLen = isCenter ? 55 : isMidCenter ? 46 : 38;
          const swingAngle = Math.sin(frame * 0.045 + i * 0.5) * (isCenter ? 4 : 2.5);

          return (
            <g
              key={i}
              transform={`translate(${px}, 24) rotate(${swingAngle})`}
            >
              {/* Beaded golden chain */}
              <line
                x1={0}
                y1={0}
                x2={0}
                y2={chainLen}
                stroke={C.copper}
                strokeWidth="1.8"
                strokeDasharray="3 3"
              />

              {/* Hanging Tumpal triangle pendant */}
              <g transform={`translate(0, ${chainLen})`}>
                <polygon
                  points="0,28 18,0 -18,0"
                  fill={isCenter ? C.rustOrange : C.copper}
                  stroke={C.blackBrown}
                  strokeWidth="2"
                />
                <polygon
                  points="0,20 11,3 -11,3"
                  fill={isCenter ? C.copper : C.rustOrange}
                />
                <circle cx="0" cy="8" r="2.8" fill={C.cream} />

                {/* Teardrop jewel (bandul emas) at bottom tip */}
                <ellipse cx="0" cy="34" rx="3.5" ry="5.5" fill={C.copper} />
                <circle cx="0" cy="34" r="1.5" fill={C.cream} />
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

/**
 * Bottom-center: Royal Diamond Runner with sprawling Garudeya / Sayap Lar wings.
 */
const RoyalBottomRunner: React.FC<{ frame: number }> = ({ frame }) => {
  const breathe = Math.sin(frame * 0.05) * 2;

  return (
    <svg width={640} height={90} viewBox="0 0 640 90" style={{ overflow: 'visible' }}>
      <defs>
        <filter id="bottomShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#2B1A14" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#bottomShadow)" transform={`translate(320, ${45 + breathe})`}>
        {/* ── Left spreading royal wing (Sayap Lar Kiri) ── */}
        <g transform="scale(-1, 1)">
          {/* Main wing feather spine */}
          <path
            d="M36,0 C90,-16 180,-12 250,-38 C265,-45 270,-32 255,-22 C195,14 110,12 36,10"
            fill={C.rustOrange}
            opacity={0.9}
          />
          {/* Secondary inner wing feathers */}
          <path
            d="M36,0 C80,-8 150,-4 210,-24 C222,-28 226,-18 215,-12 C165,12 95,10 36,8"
            fill={C.copper}
            opacity={0.92}
          />
          <path
            d="M36,0 C70,-2 120,2 170,-12 C180,-15 184,-7 175,-3 C135,10 80,8 36,6"
            fill={C.darkBrown}
            opacity={0.8}
          />
          <circle cx="255" cy="-22" r="4.5" fill={C.darkBrown} />
          <circle cx="215" cy="-12" r="3.5" fill={C.copper} />
          <circle cx="175" cy="-3" r="3" fill={C.cream} />
        </g>

        {/* ── Right spreading royal wing (Sayap Lar Kanan) ── */}
        <g>
          <path
            d="M36,0 C90,-16 180,-12 250,-38 C265,-45 270,-32 255,-22 C195,14 110,12 36,10"
            fill={C.rustOrange}
            opacity={0.9}
          />
          <path
            d="M36,0 C80,-8 150,-4 210,-24 C222,-28 226,-18 215,-12 C165,12 95,10 36,8"
            fill={C.copper}
            opacity={0.92}
          />
          <path
            d="M36,0 C70,-2 120,2 170,-12 C180,-15 184,-7 175,-3 C135,10 80,8 36,6"
            fill={C.darkBrown}
            opacity={0.8}
          />
          <circle cx="255" cy="-22" r="4.5" fill={C.darkBrown} />
          <circle cx="215" cy="-12" r="3.5" fill={C.copper} />
          <circle cx="175" cy="-3" r="3" fill={C.cream} />
        </g>

        {/* ── Center Belah Ketupat (Diamond) with concentric rosettes ── */}
        <g>
          {/* Outer diamond */}
          <polygon
            points="0,-36 36,0 0,36 -36,0"
            fill={C.rustOrange}
            stroke={C.blackBrown}
            strokeWidth="3"
          />
          {/* Mid diamond */}
          <polygon
            points="0,-24 24,0 0,24 -24,0"
            fill={C.copper}
            stroke={C.blackBrown}
            strokeWidth="1.8"
          />
          {/* Inner dark core */}
          <polygon
            points="0,-14 14,0 0,14 -14,0"
            fill={C.darkBrown}
          />
          <circle cx="0" cy="0" r="5" fill={C.cream} />

          {/* 4 Corner beads */}
          <circle cx="0" cy="-36" r="3.5" fill={C.darkBrown} />
          <circle cx="36" cy="0" r="3.5" fill={C.darkBrown} />
          <circle cx="0" cy="36" r="3.5" fill={C.darkBrown} />
          <circle cx="-36" cy="0" r="3.5" fill={C.darkBrown} />
        </g>
      </g>
    </svg>
  );
};

/**
 * Center grand royal Gunungan Kayon (Tree of Life) shadow-puppet backdrop.
 * Enhanced opacity (24%), richer inner wayang lace motifs and makara arch.
 */
const GrandGununganKayon: React.FC = () => (
  <svg
    width={880}
    height={940}
    viewBox="0 0 880 940"
    style={{ overflow: 'visible' }}
  >
    {/* Outer Gunungan leaf/mountain silhouette */}
    <path
      d="M440,20
         C550,80 670,200 690,380
         C710,540 640,700 540,790
         C490,840 440,865 440,890
         C440,865 390,840 340,790
         C240,700 170,540 190,380
         C210,200 330,80 440,20 Z"
      fill="none"
      stroke={C.darkBrown}
      strokeWidth="4.5"
    />
    {/* Inner dashed contour */}
    <path
      d="M440,55
         C530,110 630,215 650,380
         C670,520 610,660 520,745
         C475,790 440,815 440,835
         C440,815 405,790 360,745
         C270,660 210,520 230,380
         C250,215 350,110 440,55 Z"
      fill="none"
      stroke={C.darkBrown}
      strokeWidth="2.5"
      strokeDasharray="9 6"
      opacity={0.88}
    />

    {/* Central Tree of Life trunk (Batang Pohon Hayat) */}
    <line x1={440} y1={85} x2={440} y2={840} stroke={C.darkBrown} strokeWidth="3.5" />

    {/* Branching tree limbs & foliage curves */}
    {[
      "M440,200 C500,170 570,190 610,240 C570,260 510,230 440,225",
      "M440,200 C380,170 310,190 270,240 C310,260 370,230 440,225",
      "M440,340 C530,300 610,320 650,400 C600,420 520,380 440,370",
      "M440,340 C350,300 270,320 230,400 C280,420 360,380 440,370",
      "M440,500 C540,470 620,500 640,600 C580,610 510,560 440,540",
      "M440,500 C340,470 260,500 240,600 C300,610 370,560 440,540",
    ].map((d, i) => (
      <path key={`branch-${i}`} d={d} fill={C.darkBrown} opacity={0.42} />
    ))}

    {/* Royal Kawung intersecting 4-petal rosettes */}
    {[
      [440, 270, 50],
      [440, 420, 60],
      [440, 570, 54],
      [440, 700, 46],
      [350, 340, 44],
      [530, 340, 44],
      [330, 480, 48],
      [550, 480, 48],
      [360, 630, 42],
      [520, 630, 42],
    ].map(([cx, cy, r], i) => (
      <g key={`kawung-${i}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.darkBrown} strokeWidth="2.4" />
        <ellipse cx={cx} cy={cy} rx={r * 0.42} ry={r * 0.94} fill="none" stroke={C.darkBrown} strokeWidth="1.8" />
        <ellipse cx={cx} cy={cy} rx={r * 0.94} ry={r * 0.42} fill="none" stroke={C.darkBrown} strokeWidth="1.8" />
        <circle cx={cx} cy={cy} r={r * 0.2} fill={C.darkBrown} />
      </g>
    ))}

    {/* Parang Rusak diagonal swirls */}
    {[
      "M440,140 C480,165 505,200 485,225 C460,250 425,225 440,190",
      "M440,140 C400,165 375,200 395,225 C420,250 455,225 440,190",
      "M290,560 C330,595 355,640 330,675 C305,700 270,675 290,630",
      "M590,560 C550,595 525,640 550,675 C575,700 610,675 590,630",
    ].map((d, i) => (
      <path key={`parang-${i}`} d={d} fill="none" stroke={C.darkBrown} strokeWidth="2.8" strokeLinecap="round" />
    ))}
  </svg>
);

/**
 * Persistent Ornaments Layer:
 * - Royal Archway Pelmet spanning across the entire top edge with swinging golden pendants.
 * - Vertical Batik Pillars running along the left and right edges.
 * - 460px bottom-corner bouquets with lung-lungan spreading along borders.
 * - 360px top-corner feather motifs.
 * - Royal Bottom Runner with Sayap Lar wings.
 * - Grand Gunungan Kayon tree-of-life center backdrop (opacity 24%).
 */
export const Ornaments: React.FC = () => {
  const frame = useCurrentFrame();

  // Corner & framing ornaments slide-in during opening (frame 10-28)
  const slideProgress = spring({
    fps: FPS,
    frame: Math.max(0, frame - 10),
    config: { damping: 18, stiffness: 75 },
  });

  // Breathe: scale 1 -> 1.02 over 4s (120 frames) loop
  const breathePhase = (frame % ANIM.ornamentBreathe) / ANIM.ornamentBreathe;
  const breatheScale = 1 + 0.02 * Math.sin(breathePhase * Math.PI * 2);

  // Corner ornaments fade in during intro
  const cornerOpacity = interpolate(frame, [8, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Center Gunungan: revealed in intro (frames 20-50), slides out in outro (1080-1110)
  const centerIn = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const centerOut = interpolate(frame, [1080, 1110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const centerOpacity = centerIn * (1 - centerOut) * 0.24; // enhanced visibility
  const centerSlideY = centerOut * 130;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {/* ── Center grand royal Gunungan Kayon ── */}
      {centerOpacity > 0.005 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, calc(-50% + ${centerSlideY}px)) scale(${breatheScale})`,
            opacity: centerOpacity,
            willChange: 'transform, opacity',
          }}
        >
          <GrandGununganKayon />
        </div>
      )}

      {/* ── Stable Corner & Border Ornaments Frame ── */}
      {cornerOpacity > 0.01 && (
        <AbsoluteFill style={{ opacity: cornerOpacity }}>
          {/* Top Archway Pelmet spanning across the top */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: `translateX(-50%) translateY(${(1 - slideProgress) * -80}px) scale(${breatheScale})`,
              transformOrigin: 'top center',
              willChange: 'transform',
            }}
          >
            <RoyalTopArch frame={frame} />
          </div>

          {/* Full Vertical Left Side Batik Column */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: `translateY(-50%) translateX(${(1 - slideProgress) * -120}px) scale(${breatheScale})`,
              transformOrigin: 'center left',
              willChange: 'transform',
            }}
          >
            <RoyalSideColumn frame={frame} />
          </div>

          {/* Full Vertical Right Side Batik Column (mirrored) */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: `translateY(-50%) translateX(${(1 - slideProgress) * 120}px) scale(${breatheScale})`,
              transformOrigin: 'center right',
              willChange: 'transform',
            }}
          >
            <RoyalSideColumn mirrored frame={frame} />
          </div>

          {/* Bottom-left: ultra-lush corner flower & lung-lungan vines */}
          <div
            style={{
              position: 'absolute',
              bottom: -15,
              left: -15,
              transform: `translate(${(1 - slideProgress) * -150}px, ${(1 - slideProgress) * 150}px) scale(${breatheScale})`,
              transformOrigin: 'bottom left',
              willChange: 'transform',
            }}
          >
            <LushCornerBatik size={460} />
          </div>

          {/* Bottom-right: mirrored, slightly smaller */}
          <div
            style={{
              position: 'absolute',
              bottom: -15,
              right: -15,
              transform: `translate(${(1 - slideProgress) * 150}px, ${(1 - slideProgress) * 150}px) scale(${breatheScale * 0.94})`,
              transformOrigin: 'bottom right',
              willChange: 'transform',
            }}
          >
            <LushCornerBatik size={460} mirrored />
          </div>

          {/* Top-left: lush faded orange & copper leaf/feather motif */}
          <div
            style={{
              position: 'absolute',
              top: -5,
              left: -5,
              transform: `translate(${(1 - slideProgress) * -110}px, ${(1 - slideProgress) * -110}px) scale(${breatheScale})`,
              transformOrigin: 'top left',
              opacity: 0.75,
              willChange: 'transform',
            }}
          >
            <LushTopCornerMotif size={360} />
          </div>

          {/* Top-right: mirrored leaf motif */}
          <div
            style={{
              position: 'absolute',
              top: -5,
              right: -5,
              transform: `translate(${(1 - slideProgress) * 110}px, ${(1 - slideProgress) * -110}px) scale(${breatheScale})`,
              transformOrigin: 'top right',
              opacity: 0.75,
              willChange: 'transform',
            }}
          >
            <LushTopCornerMotif size={360} mirrored />
          </div>

          {/* Bottom-center: Royal Runner with Sayap Lar wings & Diamond */}
          <div
            style={{
              position: 'absolute',
              bottom: 4,
              left: '50%',
              transform: `translateX(-50%) translateY(${(1 - slideProgress) * 80}px) scale(${breatheScale})`,
              transformOrigin: 'bottom center',
              willChange: 'transform',
            }}
          >
            <RoyalBottomRunner frame={frame} />
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
