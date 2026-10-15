import React from "react";
import { C } from "../theme";

/** Ilustrasi kamera digital pastel (SVG) */
export const RetroCamera: React.FC<{ width: number; style?: React.CSSProperties }> = ({ width, style }) => (
  <svg viewBox="0 0 220 165" width={width} height={(width * 165) / 220} style={{ overflow: "visible", ...style }}>
    <defs>
      <linearGradient id="camBody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E6DBFF" />
        <stop offset="100%" stopColor={C.lavender} />
      </linearGradient>
      <radialGradient id="camLens" cx="0.35" cy="0.35" r="0.8">
        <stop offset="0%" stopColor="#B7A4FF" />
        <stop offset="55%" stopColor="#4B3A7A" />
        <stop offset="100%" stopColor="#1E1530" />
      </radialGradient>
    </defs>
    {/* Tombol & tonjolan atas */}
    <rect x={36} y={14} width={56} height={28} rx={9} fill="#D8CBFF" stroke="#7E6AC9" strokeWidth={3} />
    <rect x={160} y={18} width={30} height={16} rx={6} fill={C.pink} stroke={C.pinkDeep} strokeWidth={3} />
    {/* Badan */}
    <rect x={8} y={32} width={204} height={124} rx={24} fill="url(#camBody)" stroke="#7E6AC9" strokeWidth={3.5} />
    <rect x={8} y={74} width={204} height={16} fill={C.pinkSoft} opacity={0.85} />
    {/* Flash */}
    <rect x={150} y={46} width={44} height={20} rx={6} fill="#FFFDF4" stroke="#7E6AC9" strokeWidth={3} />
    {/* Lensa */}
    <circle cx={110} cy={96} r={46} fill="#fff" stroke="#7E6AC9" strokeWidth={3.5} />
    <circle cx={110} cy={96} r={36} fill={C.ink} />
    <circle cx={110} cy={96} r={26} fill="url(#camLens)" />
    <circle cx={100} cy={86} r={7} fill="#fff" opacity={0.85} />
    <circle cx={118} cy={104} r={3} fill="#fff" opacity={0.5} />
    {/* Stiker hati */}
    <path d="M34 122 C34 114 44 112 46 119 C48 112 58 114 58 122 C58 130 46 137 46 137 C46 137 34 130 34 122Z" fill={C.pink} />
  </svg>
);
