import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BOUNCY, bump, SNAPPY, SOFT, springAt, wave } from "../animations";
import { Sparkle } from "../components/Decor";
import { LogoIcon } from "../components/LogoIcon";
import { PhotoStrip } from "../components/PhotoStrip";
import { Sfx } from "../components/SceneShell";
import { C, fontHand, fontSans, PHOTOS, SFX } from "../theme";

/** Scene 8 — Outro: logo di tengah diapit dua photo strip */
export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const strips = springAt(frame, fps, 0, SOFT);
  const logo = springAt(frame, fps, 6, BOUNCY);
  const text = springAt(frame, fps, 14, SNAPPY);
  const tagline = springAt(frame, fps, 26, SNAPPY);
  const beat = bump(frame, 50, 4, 10);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {/* Strip kiri & kanan */}
      <div
        style={{
          position: "absolute",
          left: 170,
          top: 540,
          transform: `translate(-50%, -50%) translateX(${interpolate(strips, [0, 1], [-520, 0])}px) translateY(${wave(frame, 80, 14)}px) rotate(${-10 + wave(frame, 100, 3)}deg)`,
        }}
      >
        <PhotoStrip width={250} photos={[PHOTOS.peace, PHOTOS.heart, PHOTOS.silly, PHOTOS.smile]} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 1920 - 170,
          top: 540,
          transform: `translate(-50%, -50%) translateX(${interpolate(strips, [0, 1], [520, 0])}px) translateY(${wave(frame, 80, 14, Math.PI)}px) rotate(${10 + wave(frame, 100, 3, 1)}deg)`,
        }}
      >
        <PhotoStrip width={250} paper={C.pinkPale} photos={[PHOTOS.smile, PHOTOS.silly, PHOTOS.peace, PHOTOS.heart]} />
      </div>

      {/* Logo + nama */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ transform: `scale(${logo * (1 + beat * 0.08)}) rotate(${interpolate(logo, [0, 1], [20, 0])}deg)` }}>
          <LogoIcon size={230} />
        </div>
        <div
          style={{
            marginTop: 36,
            fontFamily: fontSans,
            fontWeight: 800,
            fontSize: 120,
            letterSpacing: -4,
            lineHeight: 1,
            color: C.ink,
            opacity: text,
            transform: `translateY(${interpolate(text, [0, 1], [40, 0])}px)`,
          }}
        >
          kenangita<span style={{ color: C.pink }}>.id</span>
        </div>
        <div
          style={{
            marginTop: 22,
            fontFamily: fontHand,
            fontWeight: 700,
            fontSize: 52,
            color: C.pink,
            opacity: tagline,
            transform: `rotate(-3deg) scale(${interpolate(tagline, [0, 1], [0.8, 1])})`,
          }}
        >
          abadikan setiap kenangan ✨
        </div>
      </div>

      <Sparkle x={640} y={260} size={56} delay={16} color={C.pink} />
      <Sparkle x={1290} y={230} size={44} delay={20} color={C.purple} phase={1} />
      <Sparkle x={1260} y={860} size={50} delay={28} color={C.yellow} phase={2} />
      <Sparkle x={660} y={840} size={38} delay={32} color={C.pinkSoft} phase={3} />

      <Sfx src={SFX.whoosh} at={0} volume={0.7} />
      <Sfx src={SFX.pop} at={6} />
      <Sfx src={SFX.chime} at={26} volume={0.8} />
    </AbsoluteFill>
  );
};
