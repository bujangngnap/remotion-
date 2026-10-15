import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { wave } from "../animations";
import { C } from "../theme";

/** Background terang pastel: blob gradien yang bergerak pelan + pola titik halus */
export const PastelBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const blobs = [
    { color: C.pinkLight, size: 900, x: 180, y: 120, p: 0 },
    { color: C.lavender, size: 820, x: 1300, y: 40, p: 2 },
    { color: C.peach, size: 760, x: 1150, y: 640, p: 4 },
    { color: C.pinkPale, size: 700, x: 120, y: 620, p: 1 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.blush, overflow: "hidden" }}>
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.x + wave(frame, 240, 60, b.p),
            top: b.y + wave(frame, 300, 50, b.p + 1),
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${b.color} 0%, transparent 68%)`,
            opacity: 0.75,
          }}
        />
      ))}
      {/* Pola titik */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${C.pinkLight} 2px, transparent 2px)`,
          backgroundSize: "40px 40px",
          backgroundPosition: `${frame * 0.4}px ${frame * 0.2}px`,
          opacity: 0.45,
        }}
      />
      {/* Vignette putih lembut di tengah */}
      <AbsoluteFill
        style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, transparent 65%)" }}
      />
    </AbsoluteFill>
  );
};
