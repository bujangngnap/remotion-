// ── Fan: folding hand fan (half white lace, half brown batik) with lush rosettes ──
import React from 'react';
import { C } from '../config';

/**
 * A decorative folding hand fan rendered as detailed SVG.
 * Left ribs: white lace-cut ribs with delicate geometric cutouts.
 * Right ribs: dark brown batik fabric with gold/copper accents.
 * Outer arc: fine gold/copper scalloped trim.
 * Aura: golden sunburst halo behind the fan.
 * Side ornaments: ultra-lush batik vines, multi-tier rosettes, and blossoming leaves.
 */
export const Fan: React.FC<{
  size?: number;
  showOrnaments?: boolean;
  ornamentScale?: number;
  openProgress?: number;
}> = ({
  size = 600,
  showOrnaments = false,
  ornamentScale = 1,
  openProgress = 1,
}) => {
  const ribCount = 16;
  const startAngle = -74;
  const endAngle = 74;
  const ribLength = 250;
  const pivotX = 300;
  const pivotY = 410;

  // Dynamic rib angle supporting fan unfolding animation
  const getRibAngle = (index: number) => {
    const target = startAngle + (endAngle - startAngle) * (index / (ribCount - 1));
    if (openProgress >= 0.999) return target;
    // Sequential cascade spread from right/left
    const staggeredP = Math.min(1, Math.max(0, (openProgress - (index / ribCount) * 0.15) / 0.85));
    return target * staggeredP;
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Lace pattern for white ribs */}
        <pattern id="lacePattern" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#FCF9F4" />
          <circle cx="7" cy="7" r="3.2" fill="#E8D5C2" />
          <circle cx="0" cy="0" r="2.2" fill="#E8D5C2" />
          <circle cx="14" cy="0" r="2.2" fill="#E8D5C2" />
          <circle cx="0" cy="14" r="2.2" fill="#E8D5C2" />
          <circle cx="14" cy="14" r="2.2" fill="#E8D5C2" />
          <path d="M7,0 L14,7 L7,14 L0,7 Z" fill="none" stroke="#DFCBB7" strokeWidth="0.8" />
        </pattern>

        {/* Batik pattern for brown ribs */}
        <pattern id="batikPattern" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill={C.darkBrown} />
          {/* Kawung motif */}
          <circle cx="8" cy="8" r="3.5" fill={C.copper} opacity={0.65} />
          <circle cx="8" cy="8" r="1.5" fill={C.cream} />
          <circle cx="0" cy="0" r="2.5" fill={C.rustOrange} opacity={0.5} />
          <circle cx="16" cy="0" r="2.5" fill={C.rustOrange} opacity={0.5} />
          <circle cx="0" cy="16" r="2.5" fill={C.rustOrange} opacity={0.5} />
          <circle cx="16" cy="16" r="2.5" fill={C.rustOrange} opacity={0.5} />
          <path
            d="M0,0 Q8,4 16,0 M0,16 Q8,12 16,16"
            stroke={C.cream}
            strokeWidth="0.6"
            fill="none"
            opacity={0.35}
          />
        </pattern>

        {/* Fan drop shadow filter */}
        <filter id="fanShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="#2B1A14" floodOpacity="0.32" />
        </filter>

        <radialGradient id="fanGlow" cx="50%" cy="65%" r="60%">
          <stop offset="0%" stopColor="#FFF5E4" stopOpacity="0.9" />
          <stop offset="60%" stopColor={C.peach} stopOpacity="0.4" />
          <stop offset="100%" stopColor={C.peach} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Radiant Golden Sunburst Halo behind Fan ── */}
      <circle cx={pivotX} cy={pivotY - 100} r={280} fill="url(#fanGlow)" opacity={openProgress} />
      {Array.from({ length: 24 }, (_, i) => i * 15).map((a) => {
        const rad = (a * Math.PI) / 180;
        const x1 = pivotX + Math.sin(rad) * 160;
        const y1 = pivotY - 100 - Math.cos(rad) * 160;
        const x2 = pivotX + Math.sin(rad) * 260;
        const y2 = pivotY - 100 - Math.cos(rad) * 260;
        return (
          <line
            key={`fanray-${a}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={C.copper}
            strokeWidth="1.6"
            strokeDasharray="6 8"
            opacity={0.35 * openProgress}
          />
        );
      })}

      {/* ── Main Fan Body ── */}
      <g filter="url(#fanShadow)">
        {/* Fan fabric sectors */}
        {Array.from({ length: ribCount }, (_, i) => {
          if (i === ribCount - 1) return null;

          const angle = getRibAngle(i);
          const nextAngle = getRibAngle(i + 1);
          if (Math.abs(nextAngle - angle) < 0.2) return null;

          const isLeftHalf = i < ribCount / 2;
          const fill = isLeftHalf ? 'url(#lacePattern)' : 'url(#batikPattern)';
          const strokeColor = isLeftHalf ? '#C9B39F' : '#3E241B';

          const rad = (angle * Math.PI) / 180;
          const ex = pivotX + Math.sin(rad) * ribLength;
          const ey = pivotY - Math.cos(rad) * ribLength;

          const nextRad = (nextAngle * Math.PI) / 180;
          const nex = pivotX + Math.sin(nextRad) * ribLength;
          const ney = pivotY - Math.cos(nextRad) * ribLength;

          // Inner radius where fabric starts
          const innerR = 75;
          const inX1 = pivotX + Math.sin(rad) * innerR;
          const inY1 = pivotY - Math.cos(rad) * innerR;
          const inX2 = pivotX + Math.sin(nextRad) * innerR;
          const inY2 = pivotY - Math.cos(nextRad) * innerR;

          return (
            <g key={i}>
              {/* Fabric sector with outer arc */}
              <path
                d={`M${inX1},${inY1} L${ex},${ey} A${ribLength},${ribLength} 0 0,1 ${nex},${ney} L${inX2},${inY2} A${innerR},${innerR} 0 0,0 ${inX1},${inY1} Z`}
                fill={fill}
                stroke={strokeColor}
                strokeWidth="1"
              />
              {/* Outer scalloped rim trim */}
              <path
                d={`M${ex},${ey} A${ribLength},${ribLength} 0 0,1 ${nex},${ney}`}
                fill="none"
                stroke={isLeftHalf ? C.copper : C.cream}
                strokeWidth="3.5"
                opacity={0.85}
              />
            </g>
          );
        })}

        {/* Fan rib sticks (bamboo / wood) */}
        {Array.from({ length: ribCount }, (_, i) => {
          const angle = getRibAngle(i);
          const isLeftHalf = i < ribCount / 2;
          const isOuterGuard = i === 0 || i === ribCount - 1;
          const rad = (angle * Math.PI) / 180;
          const ex = pivotX + Math.sin(rad) * ribLength;
          const ey = pivotY - Math.cos(rad) * ribLength;

          return (
            <line
              key={`rib-${i}`}
              x1={pivotX}
              y1={pivotY}
              x2={ex}
              y2={ey}
              stroke={
                isOuterGuard
                  ? C.blackBrown
                  : isLeftHalf
                  ? '#C4AB94'
                  : '#43261C'
              }
              strokeWidth={isOuterGuard ? 5 : 2.5}
              strokeLinecap="round"
              opacity={0.9}
            />
          );
        })}

        {/* Fan pivot rivet / pin (gold & copper) */}
        <circle cx={pivotX} cy={pivotY} r={15} fill={C.darkBrown} stroke={C.copper} strokeWidth="2.8" />
        <circle cx={pivotX} cy={pivotY} r={9} fill={C.copper} />
        <circle cx={pivotX} cy={pivotY} r={4.5} fill={C.cream} />
      </g>

      {/* ── Ultra-Lush Blossoming Side Ornaments ── */}
      {showOrnaments && (
        <g style={{ opacity: Math.min(1, ornamentScale) }}>
          {/* ── Left side blossoming bouquet ── */}
          <g
            transform={`translate(${pivotX - 230}, ${pivotY - 150}) scale(${ornamentScale * 1.3})`}
            filter="drop-shadow(-4px 6px 8px rgba(43,26,20,0.3))"
          >
            {/* Sweeping vine stems */}
            <path
              d="M120,80 C60,55 0,10 -50,25 C-85,32 -110,5 -120,-30"
              fill="none"
              stroke={C.blackBrown}
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M90,70 C50,35 10,-5 -25,-20 C-50,-30 -70,-15 -85,10"
              fill="none"
              stroke={C.copper}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Main Flower Rosette (multi-tiered) */}
            <g transform="translate(-50, 22) rotate(-20)">
              {/* Outer 8 rust orange petals */}
              {Array.from({ length: 8 }, (_, i) => i * 45).map((a) => (
                <ellipse
                  key={`l-out-${a}`}
                  cx={0}
                  cy={-22}
                  rx={8}
                  ry={16}
                  fill={C.rustOrange}
                  transform={`rotate(${a})`}
                />
              ))}
              {/* Inner 8 dark brown petals */}
              {Array.from({ length: 8 }, (_, i) => i * 45 + 22.5).map((a) => (
                <ellipse
                  key={`l-in-${a}`}
                  cx={0}
                  cy={-14}
                  rx={6}
                  ry={12}
                  fill={C.darkBrown}
                  transform={`rotate(${a})`}
                />
              ))}
              <circle cx={0} cy={0} r={11} fill={C.copper} />
              <circle cx={0} cy={0} r={6} fill={C.cream} />
              <circle cx={0} cy={0} r={3} fill={C.blackBrown} />
            </g>

            {/* Secondary Rosette */}
            <g transform="translate(-105, -20) scale(0.65)">
              {Array.from({ length: 6 }, (_, i) => i * 60).map((a) => (
                <circle
                  key={`sec-${a}`}
                  cx={0}
                  cy={-14}
                  r={7}
                  fill={C.copper}
                  transform={`rotate(${a})`}
                />
              ))}
              <circle cx={0} cy={0} r={8} fill={C.darkBrown} />
              <circle cx={0} cy={0} r={4} fill={C.cream} />
            </g>

            {/* Leaves in Rust Orange, Copper, Dark Brown */}
            <ellipse cx={-85} cy={-5} rx={28} ry={12} fill={C.rustOrange} transform="rotate(-35 -85 -5)" opacity={0.9} />
            <ellipse cx={-20} cy={45} rx={24} ry={10} fill={C.copper} transform="rotate(25 -20 45)" opacity={0.88} />
            <ellipse cx={35} cy={68} rx={22} ry={9} fill={C.blackBrown} transform="rotate(-20 35 68)" opacity={0.8} />
            <ellipse cx={-40} cy={-25} rx={20} ry={8} fill={C.copper} transform="rotate(-55 -40 -25)" opacity={0.85} />

            {/* Golden buds */}
            {[[-115, -28], [-125, -36], [-80, 15], [60, 72]].map(([bx, by], idx) => (
              <g key={idx}>
                <circle cx={bx} cy={by} r={4.5} fill={C.copper} />
                <circle cx={bx} cy={by} r={2} fill={C.cream} />
              </g>
            ))}
          </g>

          {/* ── Right side blossoming bouquet (mirrored) ── */}
          <g
            transform={`translate(${pivotX + 230}, ${pivotY - 150}) scale(${ornamentScale * 1.3}) scale(-1, 1)`}
            filter="drop-shadow(4px 6px 8px rgba(43,26,20,0.3))"
          >
            {/* Sweeping vine stems */}
            <path
              d="M120,80 C60,55 0,10 -50,25 C-85,32 -110,5 -120,-30"
              fill="none"
              stroke={C.blackBrown}
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M90,70 C50,35 10,-5 -25,-20 C-50,-30 -70,-15 -85,10"
              fill="none"
              stroke={C.copper}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Main Flower Rosette (multi-tiered) */}
            <g transform="translate(-50, 22) rotate(-20)">
              {Array.from({ length: 8 }, (_, i) => i * 45).map((a) => (
                <ellipse
                  key={`r-out-${a}`}
                  cx={0}
                  cy={-22}
                  rx={8}
                  ry={16}
                  fill={C.rustOrange}
                  transform={`rotate(${a})`}
                />
              ))}
              {Array.from({ length: 8 }, (_, i) => i * 45 + 22.5).map((a) => (
                <ellipse
                  key={`r-in-${a}`}
                  cx={0}
                  cy={-14}
                  rx={6}
                  ry={12}
                  fill={C.darkBrown}
                  transform={`rotate(${a})`}
                />
              ))}
              <circle cx={0} cy={0} r={11} fill={C.copper} />
              <circle cx={0} cy={0} r={6} fill={C.cream} />
              <circle cx={0} cy={0} r={3} fill={C.blackBrown} />
            </g>

            {/* Secondary Rosette */}
            <g transform="translate(-105, -20) scale(0.65)">
              {Array.from({ length: 6 }, (_, i) => i * 60).map((a) => (
                <circle
                  key={`r-sec-${a}`}
                  cx={0}
                  cy={-14}
                  r={7}
                  fill={C.copper}
                  transform={`rotate(${a})`}
                />
              ))}
              <circle cx={0} cy={0} r={8} fill={C.darkBrown} />
              <circle cx={0} cy={0} r={4} fill={C.cream} />
            </g>

            {/* Leaves in Rust Orange, Copper, Dark Brown */}
            <ellipse cx={-85} cy={-5} rx={28} ry={12} fill={C.rustOrange} transform="rotate(-35 -85 -5)" opacity={0.9} />
            <ellipse cx={-20} cy={45} rx={24} ry={10} fill={C.copper} transform="rotate(25 -20 45)" opacity={0.88} />
            <ellipse cx={35} cy={68} rx={22} ry={9} fill={C.blackBrown} transform="rotate(-20 35 68)" opacity={0.8} />
            <ellipse cx={-40} cy={-25} rx={20} ry={8} fill={C.copper} transform="rotate(-55 -40 -25)" opacity={0.85} />

            {/* Golden buds */}
            {[[-115, -28], [-125, -36], [-80, 15], [60, 72]].map(([bx, by], idx) => (
              <g key={idx}>
                <circle cx={bx} cy={by} r={4.5} fill={C.copper} />
                <circle cx={bx} cy={by} r={2} fill={C.cream} />
              </g>
            ))}
          </g>
        </g>
      )}
    </svg>
  );
};
