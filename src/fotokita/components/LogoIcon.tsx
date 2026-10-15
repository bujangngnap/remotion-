import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C } from "../theme";

/** Ikon logo fotokita: kelinci dengan mata kuning di atas latar hitam (mata berkedip) */
export const LogoIcon: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => {
  const frame = useCurrentFrame();

  // Kedip setiap ~2.5 detik
  const cycle = frame % 75;
  const blink = interpolate(cycle, [66, 69, 72], [1, 0.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pupil sedikit melirik
  const look = Math.sin(frame / 22) * 1.4;

  const eye = (cx: number) => (
    <g transform={`translate(${cx} 58) scale(1 ${blink}) translate(${-cx} -58)`}>
      <circle cx={cx} cy={58} r={8.5} fill={C.yellow} />
      <circle cx={cx + look} cy={59} r={4} fill={C.ink} />
      <circle cx={cx + look + 1.6} cy={56.8} r={1.5} fill="#fff" />
    </g>
  );

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: `linear-gradient(150deg, #2A2431 0%, ${C.ink} 60%, #0B090E 100%)`,
        boxShadow: `0 ${size * 0.1}px ${size * 0.28}px rgba(23,19,28,0.32), inset 0 2px 0 rgba(255,255,255,0.08)`,
        overflow: "hidden",
        flexShrink: 0,
        ...style,
      }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {/* Telinga */}
        <g transform="rotate(-12 36 44)">
          <rect x={29} y={8} width={14} height={38} rx={7} fill="#fff" />
          <rect x={32.5} y={13} width={7} height={27} rx={3.5} fill={C.pinkSoft} />
        </g>
        <g transform="rotate(12 64 44)">
          <rect x={57} y={8} width={14} height={38} rx={7} fill="#fff" />
          <rect x={60.5} y={13} width={7} height={27} rx={3.5} fill={C.pinkSoft} />
        </g>
        {/* Kepala */}
        <ellipse cx={50} cy={62} rx={33} ry={27} fill={C.inkSoft} stroke="#3B3343" strokeWidth={1.5} />
        {eye(38)}
        {eye(62)}
        {/* Pipi */}
        <ellipse cx={28} cy={70} rx={5.5} ry={3.2} fill={C.pink} opacity={0.55} />
        <ellipse cx={72} cy={70} rx={5.5} ry={3.2} fill={C.pink} opacity={0.55} />
        {/* Hidung & mulut */}
        <path d="M47 67.5 Q50 65.5 53 67.5 Q50 71 47 67.5Z" fill={C.pinkSoft} />
        <path d="M45 72 Q47.5 75 50 72 Q52.5 75 55 72" stroke="#fff" strokeWidth={1.6} fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
};
