import React from "react";
import { C } from "../theme";

/** Stiker pita coquette (SVG) */
export const Bow: React.FC<{ width: number; style?: React.CSSProperties }> = ({ width, style }) => (
  <svg viewBox="0 0 200 165" width={width} height={(width * 165) / 200} style={{ overflow: "visible", ...style }}>
    <defs>
      <linearGradient id="bowGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFB3CF" />
        <stop offset="100%" stopColor={C.pink} />
      </linearGradient>
    </defs>
    {/* Ekor pita */}
    <path d="M94 70 C84 98 70 122 52 152 L74 149 L82 162 C94 128 100 100 104 74Z" fill="url(#bowGrad)" stroke={C.pinkDeep} strokeWidth={3} strokeLinejoin="round" />
    <path d="M106 70 C116 98 130 122 148 152 L126 149 L118 162 C106 128 100 100 96 74Z" fill="url(#bowGrad)" stroke={C.pinkDeep} strokeWidth={3} strokeLinejoin="round" />
    {/* Simpul kiri & kanan */}
    <path d="M100 60 C70 18 16 12 18 52 C20 90 70 88 100 64Z" fill="url(#bowGrad)" stroke={C.pinkDeep} strokeWidth={3} strokeLinejoin="round" />
    <path d="M100 60 C130 18 184 12 182 52 C180 90 130 88 100 64Z" fill="url(#bowGrad)" stroke={C.pinkDeep} strokeWidth={3} strokeLinejoin="round" />
    {/* Lipatan */}
    <path d="M96 60 C78 44 52 38 40 48" stroke={C.pinkDeep} strokeWidth={2.5} fill="none" opacity={0.45} strokeLinecap="round" />
    <path d="M104 60 C122 44 148 38 160 48" stroke={C.pinkDeep} strokeWidth={2.5} fill="none" opacity={0.45} strokeLinecap="round" />
    {/* Kilau */}
    <ellipse cx={46} cy={40} rx={10} ry={5} fill="#fff" opacity={0.6} transform="rotate(-20 46 40)" />
    <ellipse cx={152} cy={40} rx={10} ry={5} fill="#fff" opacity={0.6} transform="rotate(20 152 40)" />
    {/* Simpul tengah */}
    <rect x={86} y={46} width={28} height={32} rx={11} fill={C.pink} stroke={C.pinkDeep} strokeWidth={3} />
  </svg>
);
