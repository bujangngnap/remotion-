import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { KenangitaProps } from "../config";
import { BOUNCY, SNAPPY, SOFT, springAt, wave } from "../animations";
import { Sparkle, Sticker } from "../components/Decor";
import { PhotoStrip } from "../components/PhotoStrip";
import { Sfx } from "../components/SceneShell";
import { C, fontSans, PHOTO_LIST, SFX } from "../theme";
import { Pill } from "../components/Pill";
import { Bow } from "../components/Bow";

type StripCfg = { x: number; y: number; w: number; rot: number; speed: number; photos: string[]; paper: string; depth: number };

// We adapt the exact STRIPS logic from Fotokita for the rich background
const STRIPS: StripCfg[] = [
  { x: 120, y: 190, w: 170, rot: -9, speed: 7, photos: [PHOTO_LIST[0], PHOTO_LIST[1], PHOTO_LIST[2], PHOTO_LIST[3]], paper: "#fff", depth: 0 },
  { x: 640, y: 160, w: 120, rot: 6, speed: 4.5, photos: [PHOTO_LIST[4], PHOTO_LIST[5], PHOTO_LIST[0], PHOTO_LIST[2]], paper: C.pinkPale, depth: 1 },
  { x: 1060, y: 200, w: 165, rot: 8, speed: 7, photos: [PHOTO_LIST[2], PHOTO_LIST[3], PHOTO_LIST[4], PHOTO_LIST[1]], paper: C.lavenderPale, depth: 0 },
  { x: 1560, y: 150, w: 120, rot: -5, speed: 4.5, photos: [PHOTO_LIST[3], PHOTO_LIST[5], PHOTO_LIST[1], PHOTO_LIST[0]], paper: "#fff", depth: 1 },
  { x: 2050, y: 210, w: 170, rot: -7, speed: 7, photos: [PHOTO_LIST[0], PHOTO_LIST[4], PHOTO_LIST[2], PHOTO_LIST[5]], paper: C.pinkPale, depth: 0 },
  { x: 2450, y: 170, w: 120, rot: 9, speed: 4.5, photos: [PHOTO_LIST[2], PHOTO_LIST[0], PHOTO_LIST[3], PHOTO_LIST[1]], paper: "#fff", depth: 1 },
  { x: 380, y: 900, w: 180, rot: 7, speed: 8.5, photos: [PHOTO_LIST[5], PHOTO_LIST[0], PHOTO_LIST[1], PHOTO_LIST[4]], paper: C.lavenderPale, depth: 0 },
  { x: 880, y: 930, w: 125, rot: -8, speed: 5, photos: [PHOTO_LIST[0], PHOTO_LIST[2], PHOTO_LIST[5], PHOTO_LIST[3]], paper: "#fff", depth: 1 },
  { x: 1340, y: 890, w: 175, rot: -6, speed: 8.5, photos: [PHOTO_LIST[1], PHOTO_LIST[3], PHOTO_LIST[2], PHOTO_LIST[0]], paper: "#fff", depth: 0 },
  { x: 1840, y: 940, w: 125, rot: 6, speed: 5, photos: [PHOTO_LIST[4], PHOTO_LIST[1], PHOTO_LIST[0], PHOTO_LIST[3]], paper: C.pinkPale, depth: 1 },
  { x: 2300, y: 900, w: 180, rot: 8, speed: 8.5, photos: [PHOTO_LIST[0], PHOTO_LIST[5], PHOTO_LIST[2], PHOTO_LIST[4]], paper: C.lavenderPale, depth: 0 },
  { x: 2750, y: 920, w: 125, rot: -7, speed: 5, photos: [PHOTO_LIST[1], PHOTO_LIST[4], PHOTO_LIST[3], PHOTO_LIST[0]], paper: "#fff", depth: 1 },
];

/** Satu baris teks yang naik dari balik mask */
const MaskLine: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(frame, fps, delay, SNAPPY);
  return (
    <div style={{ clipPath: "inset(-50px -100px 0 -100px)", padding: "0px 10px" }}>
      <div style={{ transform: `translateY(${interpolate(p, [0, 1], [115, 0])}%) rotate(${interpolate(p, [0, 1], [6, 0])}deg)` }}>
        {children}
      </div>
    </div>
  );
};

export const S3Headline: React.FC<KenangitaProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVert = height > width;

  const stripsIn = springAt(frame, fps, 0, SOFT);
  const sparkleEmoji = springAt(frame, fps, 50, BOUNCY);
  const pillScale = springAt(frame, fps, 24, SNAPPY);

  const textStyle: React.CSSProperties = {
    fontFamily: fontSans,
    fontWeight: 900,
    fontSize: isVert ? 80 : 130,
    letterSpacing: -2,
    lineHeight: 1,
    color: C.ink,
    whiteSpace: "nowrap",
    textTransform: "uppercase"
  };

  return (
    <AbsoluteFill>
      {/* Strip melayang background (scaled for vertical if needed) */}
      <div style={{ position: "absolute", inset: 0, transform: isVert ? "scale(0.8) rotate(90deg)" : "none", transformOrigin: "center" }}>
        {STRIPS.map((s, i) => {
          const x = s.x - frame * s.speed + (1 - stripsIn) * 500;
          const y = s.y + wave(frame, 90, 14, i);
          const rot = s.rot + wave(frame, 120, 4, i * 1.7);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: `translate(-50%, -50%) rotate(${rot}deg)`,
                filter: s.depth ? "blur(2.5px)" : undefined,
                opacity: (s.depth ? 0.7 : 1) * stripsIn,
              }}
            >
              <PhotoStrip width={s.w} photos={s.photos} paper={s.paper} progress={4} />
            </div>
          );
        })}
      </div>

      {/* Glow putih agar teks terbaca */}
      <AbsoluteFill style={{ background: `radial-gradient(ellipse ${isVert ? '600px 800px' : '900px 420px'} at 50% 50%, rgba(255,245,249,0.97) 0%, rgba(255,245,249,0.85) 45%, transparent 100%)` }} />

      {/* Tipografi */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: isVert ? 20 : 10 }}>
        <MaskLine delay={8}>
          <div style={textStyle}>abadikan</div>
        </MaskLine>

        <MaskLine delay={24}>
          <div style={{ position: "relative", transform: "rotate(-2.5deg)" }}>
            <div style={{ transform: `scaleX(${pillScale})`, transformOrigin: "center" }}>
              <Pill text="Setiap" bgColor={C.pinkDeep} textColor="white" style={{ fontSize: isVert ? 60 : 100, padding: "10px 50px" }} />
              <div style={{ position: "absolute", right: isVert ? -20 : -40, top: -20, transform: `scale(${pillScale}) rotate(20deg)` }}>
                <Bow width={isVert ? 60 : 80} />
              </div>
            </div>
          </div>
        </MaskLine>

        <MaskLine delay={42}>
          <div style={{ ...textStyle, position: "relative" }}>
            kenangan
            <span
              style={{
                position: "absolute",
                top: "50%",
                right: isVert ? -40 : -80,
                marginTop: isVert ? -20 : -40,
                transform: `scale(${sparkleEmoji}) rotate(${frame * 2}deg) translateY(${wave(frame, 30, 6)}px)`,
              }}
            >
              ✨
            </span>
          </div>
        </MaskLine>
      </AbsoluteFill>

      {/* Stiker & sparkle - Responsive positions */}
      <Sticker emoji="💖" x={isVert ? 150 : 430} y={isVert ? 350 : 420} size={110} delay={34} rotate={-12} />
      <Sticker emoji="📸" x={isVert ? 900 : 1500} y={isVert ? 1400 : 720} size={110} delay={58} rotate={-8} phase={2.1} />
      <Sticker emoji="⭐" x={isVert ? 150 : 410} y={isVert ? 1600 : 700} size={90} delay={66} rotate={14} phase={0.7} />
      
      <Sparkle x={isVert ? 800 : 1350} y={isVert ? 300 : 270} size={isVert ? 60 : 46} delay={30} color={C.purple} phase={1} />
      <Sparkle x={isVert ? 850 : 1330} y={isVert ? 1500 : 820} size={isVert ? 80 : 54} delay={52} color={C.yellow} phase={2} />
      <Sparkle x={isVert ? 200 : 600} y={isVert ? 1300 : 800} size={40} delay={60} color={C.pinkSoft} phase={3} />

      <Sfx src={SFX.pop} at={8} />
      <Sfx src={SFX.pop} at={26} />
      <Sfx src={SFX.pop} at={44} />
    </AbsoluteFill>
  );
};
