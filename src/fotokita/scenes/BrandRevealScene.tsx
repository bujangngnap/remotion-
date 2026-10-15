import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CLAMP, SNAPPY, springAt } from "../animations";
import { Sparkle } from "../components/Decor";
import { LogoIcon } from "../components/LogoIcon";
import { Sfx } from "../components/SceneShell";
import { C, fontSans, SFX } from "../theme";

const WORD = "kenangita.id";
const SPLIT = 9; // "kenangita" | ".id"
const LOGO = 210;
const TEXT_W = 820;
const GAP = 44;

/** Scene 2 — Logo muncul dari tengah (spring), lalu teks diketik di sampingnya */
export const BrandRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = springAt(frame, fps, 0, { damping: 10, stiffness: 140, mass: 0.7 });
  const shift = springAt(frame, fps, 14, SNAPPY);
  const logoX = interpolate(shift, [0, 1], [(TEXT_W + GAP) / 2, 0]);

  const typed = Math.floor(interpolate(frame, [20, 42], [0, WORD.length], CLAMP));
  const caretOn = frame < 54 && (typed < WORD.length || Math.floor(frame / 8) % 2 === 0);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 46 }}>
      <div style={{ display: "flex", alignItems: "center", gap: GAP, position: "relative" }}>
        <div style={{ transform: `translateX(${logoX}px) scale(${logoIn}) rotate(${interpolate(logoIn, [0, 1], [-25, 0])}deg)`, position: "relative" }}>
          <LogoIcon size={LOGO} />
        </div>

        <div
          style={{
            width: TEXT_W,
            fontFamily: fontSans,
            fontWeight: 800,
            fontSize: 112,
            letterSpacing: -3,
            lineHeight: 1,
            color: C.ink,
            whiteSpace: "nowrap",
            opacity: shift,
            transform: `translateX(${interpolate(shift, [0, 1], [-50, 0])}px)`,
          }}
        >
          {WORD.slice(0, Math.min(typed, SPLIT))}
          <span style={{ color: C.pink }}>{typed > SPLIT ? WORD.slice(SPLIT, typed) : ""}</span>
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 96,
              marginLeft: 8,
              verticalAlign: "-8px",
              borderRadius: 4,
              background: C.pink,
              opacity: caretOn ? 1 : 0,
            }}
          />
        </div>

        {/* Sparkle di sekitar logo */}
        <Sparkle x={-10 + logoX} y={-20} size={56} delay={8} color={C.pink} />
        <Sparkle x={LOGO + 10 + logoX} y={LOGO + 6} size={40} delay={12} color={C.lavender} phase={2} />
        <Sparkle x={LOGO + GAP + TEXT_W - 30} y={-34} size={48} delay={40} color={C.yellow} phase={1} />
      </div>

      <Sfx src={SFX.pop} at={2} />
      <Sfx src={SFX.chime} at={36} volume={0.8} />
    </AbsoluteFill>
  );
};
