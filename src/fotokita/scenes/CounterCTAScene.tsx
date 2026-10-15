import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BOUNCY, bump, CLAMP, formatID, SNAPPY, springAt, wave } from "../animations";
import { Sparkle } from "../components/Decor";
import { Sfx } from "../components/SceneShell";
import { C, fontSans, GRADIENT_BRAND, PHOTO_LIST, SFX } from "../theme";

const COUNT_START = 6;
const COUNT_END = 52;
const CTA_IN = 50;
const CLICK = 100;

/** Scene 7 — Counter "Sudah 2.750+ foto" + tombol CTA kapsul hitam */
export const CounterCTAScene: React.FC<{ jumlahFoto: number; teksCta: string }> = ({ jumlahFoto, teksCta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const value = interpolate(frame, [COUNT_START, COUNT_END], [0, jumlahFoto], { ...CLAMP, easing: Easing.out(Easing.cubic) });
  const grow = springAt(frame, fps, 0, { damping: 12, stiffness: 110, mass: 0.8 });
  const finish = bump(frame, COUNT_END, 3, 10);
  const plus = springAt(frame, fps, COUNT_END, BOUNCY);
  const label = springAt(frame, fps, 14, SNAPPY);

  const cta = springAt(frame, fps, CTA_IN, BOUNCY);
  const hover = wave(frame, 36, 7);
  const click = bump(frame, CLICK - 2, 2, 8);
  const ringT = ((Math.max(0, frame - CTA_IN) % 32) / 32);
  const shimmer = interpolate((frame - CTA_IN) % 45, [0, 30], [-120, 520], CLAMP);

  // Kursor masuk lalu klik tombol
  const cursorIn = springAt(frame, fps, 76, SNAPPY);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      {/* Avatar stack */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 26 }}>
        {[...PHOTO_LIST, "more"].map((src, i) => {
          const p = springAt(frame, fps, i * 3, BOUNCY);
          const common: React.CSSProperties = {
            width: 88,
            height: 88,
            borderRadius: "50%",
            border: "5px solid #fff",
            marginLeft: i === 0 ? 0 : -24,
            transform: `scale(${p})`,
            boxShadow: "0 8px 20px rgba(233,30,99,0.18)",
            overflow: "hidden",
            flexShrink: 0,
          };
          return src === "more" ? (
            <div key={i} style={{ ...common, background: C.pink, color: "#fff", fontFamily: fontSans, fontWeight: 800, fontSize: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
              +2k
            </div>
          ) : (
            <div key={i} style={common}>
              <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          );
        })}
      </div>

      <div style={{ fontFamily: fontSans, fontWeight: 600, fontSize: 50, color: C.gray, opacity: label, transform: `translateY(${interpolate(label, [0, 1], [20, 0])}px)` }}>
        Sudah
      </div>

      {/* Angka counter */}
      <div
        style={{
          fontFamily: fontSans,
          fontWeight: 900,
          fontSize: 230,
          lineHeight: 1,
          letterSpacing: -8,
          background: GRADIENT_BRAND,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          padding: "0 20px",
          transform: `scale(${interpolate(grow, [0, 1], [0.45, 1]) + finish * 0.06})`,
          filter: `drop-shadow(0 18px 40px rgba(255,64,129,${0.25 + finish * 0.3}))`,
        }}
      >
        {formatID(value)}
        <span style={{ display: "inline-block", transform: `scale(${plus})` }}>+</span>
      </div>

      <div style={{ fontFamily: fontSans, fontWeight: 700, fontSize: 64, letterSpacing: -1.5, color: C.ink, opacity: label, marginTop: 6 }}>
        foto studio dibuat! 📸
      </div>

      {/* CTA */}
      <div style={{ marginTop: 56, position: "relative", transform: `translateY(${interpolate(cta, [0, 1], [120, 0]) + hover}px) scale(${cta * (1 - click * 0.08)})` }}>
        {/* Ring pulse */}
        {[0, 0.5].map((o) => {
          const t = (ringT + o) % 1;
          return (
            <div
              key={o}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                border: `4px solid ${C.pink}`,
                transform: `scale(${1 + t * 0.3}, ${1 + t * 0.7})`,
                opacity: (1 - t) * 0.6 * cta,
              }}
            />
          );
        })}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "34px 70px",
            borderRadius: 999,
            background: C.ink,
            color: "#fff",
            fontFamily: fontSans,
            fontWeight: 700,
            fontSize: 46,
            whiteSpace: "nowrap",
            boxShadow: "0 30px 60px rgba(23,19,28,0.3), inset 0 2px 0 rgba(255,255,255,0.15)",
          }}
        >
          {teksCta}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: shimmer,
              width: 90,
              background: "linear-gradient(100deg, transparent, rgba(255,255,255,0.28), transparent)",
              transform: "skewX(-20deg)",
            }}
          />
        </div>

        {/* Kursor */}
        <svg
          width={64}
          height={64}
          viewBox="0 0 24 24"
          style={{
            position: "absolute",
            right: 60,
            bottom: -30,
            opacity: cursorIn,
            transform: `translate(${interpolate(cursorIn, [0, 1], [260, 0])}px, ${interpolate(cursorIn, [0, 1], [200, 0])}px) scale(${1 - click * 0.2})`,
            filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.25))",
          }}
        >
          <path d="M4 2 L4 20 L9 15.5 L12.5 22 L15.5 20.5 L12 14 L19 14 Z" fill="#fff" stroke={C.ink} strokeWidth={1.5} strokeLinejoin="round" />
        </svg>
      </div>

      <Sparkle x={460} y={360} size={60} delay={COUNT_END} color={C.pink} />
      <Sparkle x={1470} y={330} size={50} delay={COUNT_END + 4} color={C.purple} phase={1} />
      <Sparkle x={1400} y={760} size={44} delay={CTA_IN + 6} color={C.yellow} phase={2} />
      <Sparkle x={520} y={780} size={40} delay={CTA_IN + 10} color={C.pinkSoft} phase={3} />

      <Sfx src={SFX.whoosh} at={0} volume={0.6} />
      <Sfx src={SFX.chime} at={COUNT_END} volume={0.8} />
      <Sfx src={SFX.pop} at={CTA_IN} />
      <Sfx src={SFX.click} at={CLICK} volume={1.5} />
    </AbsoluteFill>
  );
};
