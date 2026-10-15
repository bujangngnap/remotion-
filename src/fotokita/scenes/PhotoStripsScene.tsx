import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BOUNCY, SNAPPY, SOFT, springAt, wave } from "../animations";
import { Sparkle, Sticker } from "../components/Decor";
import { PhotoStrip } from "../components/PhotoStrip";
import { Sfx } from "../components/SceneShell";
import { C, fontSans, PHOTOS, SFX } from "../theme";

const P = PHOTOS;

type StripCfg = { x: number; y: number; w: number; rot: number; speed: number; photos: string[]; paper: string; depth: number };

/** Posisi awal strip: band atas & bawah, bergerak kanan → kiri */
const STRIPS: StripCfg[] = [
  { x: 120, y: 190, w: 170, rot: -9, speed: 7, photos: [P.peace, P.heart, P.silly, P.smile], paper: "#fff", depth: 0 },
  { x: 640, y: 160, w: 120, rot: 6, speed: 4.5, photos: [P.smile, P.peace, P.heart, P.silly], paper: C.pinkPale, depth: 1 },
  { x: 1060, y: 200, w: 165, rot: 8, speed: 7, photos: [P.heart, P.silly, P.smile, P.peace], paper: C.lavenderPale, depth: 0 },
  { x: 1560, y: 150, w: 120, rot: -5, speed: 4.5, photos: [P.silly, P.smile, P.peace, P.heart], paper: "#fff", depth: 1 },
  { x: 2050, y: 210, w: 170, rot: -7, speed: 7, photos: [P.peace, P.smile, P.heart, P.silly], paper: C.pinkPale, depth: 0 },
  { x: 2450, y: 170, w: 120, rot: 9, speed: 4.5, photos: [P.heart, P.peace, P.silly, P.smile], paper: "#fff", depth: 1 },
  { x: 380, y: 900, w: 180, rot: 7, speed: 8.5, photos: [P.silly, P.peace, P.smile, P.heart], paper: C.lavenderPale, depth: 0 },
  { x: 880, y: 930, w: 125, rot: -8, speed: 5, photos: [P.peace, P.heart, P.smile, P.silly], paper: "#fff", depth: 1 },
  { x: 1340, y: 890, w: 175, rot: -6, speed: 8.5, photos: [P.smile, P.silly, P.heart, P.peace], paper: "#fff", depth: 0 },
  { x: 1840, y: 940, w: 125, rot: 6, speed: 5, photos: [P.heart, P.smile, P.peace, P.silly], paper: C.pinkPale, depth: 1 },
  { x: 2300, y: 900, w: 180, rot: 8, speed: 8.5, photos: [P.peace, P.silly, P.heart, P.smile], paper: C.lavenderPale, depth: 0 },
  { x: 2750, y: 920, w: 125, rot: -7, speed: 5, photos: [P.smile, P.heart, P.silly, P.peace], paper: "#fff", depth: 1 },
];

/** Satu baris teks yang naik dari balik mask */
const MaskLine: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = springAt(frame, fps, delay, SNAPPY);
  return (
    <div style={{ overflow: "hidden", padding: "6px 24px" }}>
      <div style={{ transform: `translateY(${interpolate(p, [0, 1], [115, 0])}%) rotate(${interpolate(p, [0, 1], [6, 0])}deg)` }}>
        {children}
      </div>
    </div>
  );
};

/** Scene 3 — Photo strip melayang + "capture ur moments everywhere ✨" */
export const PhotoStripsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stripsIn = springAt(frame, fps, 0, SOFT);
  const highlight = springAt(frame, fps, 26, SNAPPY);
  const sparkleEmoji = springAt(frame, fps, 50, BOUNCY);

  const text: React.CSSProperties = { fontFamily: fontSans, fontWeight: 800, fontSize: 150, letterSpacing: -5, lineHeight: 1, color: C.ink, whiteSpace: "nowrap" };

  return (
    <AbsoluteFill>
      {/* Strip melayang */}
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
            <PhotoStrip width={s.w} photos={s.photos} paper={s.paper} />
          </div>
        );
      })}

      {/* Glow putih agar teks terbaca */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 900px 420px at 50% 50%, rgba(255,245,249,0.97) 0%, rgba(255,245,249,0.85) 45%, transparent 100%)" }} />

      {/* Tipografi */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <MaskLine delay={8}>
          <div style={text}>capture ur</div>
        </MaskLine>

        <MaskLine delay={24}>
          <div style={{ position: "relative", padding: "4px 46px 18px", transform: "rotate(-2.5deg)" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 40,
                background: `linear-gradient(100deg, ${C.pink}, #FF6FA5)`,
                boxShadow: "0 24px 60px rgba(255,64,129,0.4)",
                transform: `scaleX(${highlight})`,
                transformOrigin: "left center",
              }}
            />
            <div style={{ ...text, position: "relative", color: "#fff", fontSize: 168 }}>moments</div>
          </div>
        </MaskLine>

        <MaskLine delay={42}>
          <div style={text}>
            everywhere{" "}
            <span
              style={{
                display: "inline-block",
                transform: `scale(${sparkleEmoji}) rotate(${frame * 2}deg) translateY(${wave(frame, 30, 6)}px)`,
              }}
            >
              ✨
            </span>
          </div>
        </MaskLine>
      </AbsoluteFill>

      {/* Stiker & sparkle */}
      <Sticker emoji="💖" x={430} y={420} size={110} delay={34} rotate={-12} />
      <Sticker emoji="🎀" x={1520} y={380} size={120} delay={46} rotate={10} phase={1.3} />
      <Sticker emoji="📸" x={1500} y={720} size={110} delay={58} rotate={-8} phase={2.1} />
      <Sticker emoji="⭐" x={410} y={700} size={90} delay={66} rotate={14} phase={0.7} />
      <Sparkle x={590} y={300} size={60} delay={20} color={C.pink} />
      <Sparkle x={1350} y={270} size={46} delay={30} color={C.purple} phase={1} />
      <Sparkle x={1330} y={820} size={54} delay={52} color={C.yellow} phase={2} />
      <Sparkle x={600} y={800} size={40} delay={60} color={C.pinkSoft} phase={3} />

      <Sfx src={SFX.whoosh} at={0} volume={0.7} />
      <Sfx src={SFX.pop} at={8} />
      <Sfx src={SFX.pop} at={26} />
      <Sfx src={SFX.chime} at={30} volume={0.6} />
      <Sfx src={SFX.pop} at={44} />
    </AbsoluteFill>
  );
};
