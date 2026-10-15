import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CLAMP, SNAPPY, springAt } from "../animations";
import { Sfx } from "../components/SceneShell";
import { C, fontSans, PHOTOS, SFX } from "../theme";

/** Durasi tiap angka countdown (frame) */
const STEP = 20;
const SCREEN_W = 1124;
const SCREEN_H = 620;

const Corner: React.FC<{ pos: "tl" | "tr" | "bl" | "br" }> = ({ pos }) => {
  const s = 64;
  const t = 6;
  const style: React.CSSProperties = { position: "absolute", width: s, height: s, borderColor: "rgba(255,255,255,0.9)", borderStyle: "solid", borderWidth: 0, borderRadius: 10 };
  if (pos === "tl") Object.assign(style, { top: 32, left: 32, borderTopWidth: t, borderLeftWidth: t });
  if (pos === "tr") Object.assign(style, { top: 32, right: 32, borderTopWidth: t, borderRightWidth: t });
  if (pos === "bl") Object.assign(style, { bottom: 32, left: 32, borderBottomWidth: t, borderLeftWidth: t });
  if (pos === "br") Object.assign(style, { bottom: 32, right: 32, borderBottomWidth: t, borderRightWidth: t });
  return <div style={style} />;
};

/** Scene 1 — Viewfinder photobox + countdown 3 → 2 → 1 */
export const CountdownScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = springAt(frame, fps, 0, SNAPPY);
  const idx = Math.min(2, Math.floor(frame / STEP));
  const local = frame - idx * STEP;
  const num = 3 - idx;

  // Pop-in angka dengan bounce pendek
  const pop = springAt(local, fps, 0, { damping: 8, stiffness: 240, mass: 0.5 });
  const numScale = interpolate(pop, [0, 1], [0.25, 1]);
  const numOpacity = idx < 2 ? interpolate(local, [0, 2, 15, 19], [0, 1, 1, 0], CLAMP) : interpolate(local, [0, 2], [0, 1], CLAMP);
  const ring = interpolate(local, [0, 18], [0, 1], CLAMP);

  const liveZoom = interpolate(frame, [0, 60], [1.06, 1.16]);
  const recOn = Math.floor(frame / 10) % 2 === 0;

  // Flash kamera saat "cekrek"
  const flash = interpolate(frame, [54, 58, 72], [0, 1, 0.6], CLAMP);

  const caption = springAt(frame, fps, 6, SNAPPY);

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 42%, #3B2142 0%, #1C1022 55%, #0F0A13 100%)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 40,
      }}
    >
      {/* Glow pink di belakang device */}
      <div style={{ position: "absolute", width: 1400, height: 900, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}33 0%, transparent 65%)` }} />

      {/* Body photobox */}
      <div
        style={{
          padding: 26,
          paddingBottom: 0,
          borderRadius: 48,
          background: "linear-gradient(165deg, #FFC1D8 0%, #FF8FB8 55%, #FF6FA5 100%)",
          boxShadow: "0 40px 100px rgba(255,64,129,0.35), inset 0 3px 0 rgba(255,255,255,0.5)",
          transform: `scale(${interpolate(enter, [0, 1], [0.9, 1])})`,
          opacity: enter,
        }}
      >
        {/* Layar viewfinder */}
        <div style={{ width: SCREEN_W, height: SCREEN_H, borderRadius: 28, overflow: "hidden", position: "relative", background: C.ink }}>
          <Img
            src={PHOTOS.peace}
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${liveZoom})`, filter: "brightness(0.72) saturate(1.1)" }}
          />
          <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(15,10,19,0.65) 100%)" }} />

          {/* Grid rule of thirds */}
          {[1, 2].map((i) => (
            <React.Fragment key={i}>
              <div style={{ position: "absolute", left: (SCREEN_W / 3) * i, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.16)" }} />
              <div style={{ position: "absolute", top: (SCREEN_H / 3) * i, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.16)" }} />
            </React.Fragment>
          ))}

          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />

          {/* HUD atas */}
          <div style={{ position: "absolute", top: 46, left: 120, display: "flex", alignItems: "center", gap: 12, fontFamily: fontSans, fontWeight: 700, fontSize: 26, color: "#fff", letterSpacing: 2 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.pink, opacity: recOn ? 1 : 0.25, boxShadow: `0 0 16px ${C.pink}` }} />
            REC
            <span style={{ fontWeight: 500, opacity: 0.8, marginLeft: 8 }}>00:0{Math.floor(frame / fps)}</span>
          </div>
          <div style={{ position: "absolute", top: 46, right: 120, display: "flex", alignItems: "center", gap: 14, fontFamily: fontSans, fontWeight: 600, fontSize: 24, color: "#fff" }}>
            4 SHOTS
            <div style={{ width: 46, height: 22, border: "3px solid #fff", borderRadius: 6, padding: 2, boxSizing: "border-box", position: "relative" }}>
              <div style={{ width: "75%", height: "100%", background: C.mint, borderRadius: 2 }} />
            </div>
          </div>

          {/* HUD bawah */}
          <div style={{ position: "absolute", bottom: 48, left: 120, fontFamily: fontSans, fontWeight: 500, fontSize: 22, color: "rgba(255,255,255,0.85)", letterSpacing: 1.5 }}>
            ISO 400 · 1/125 · f/2.8
          </div>
          <div style={{ position: "absolute", bottom: 42, right: 120, padding: "8px 18px", borderRadius: 999, background: "rgba(255,64,129,0.9)", fontFamily: fontSans, fontWeight: 600, fontSize: 22, color: "#fff" }}>
            ✌️ peace terdeteksi
          </div>

          {/* Kotak fokus */}
          <div
            style={{
              position: "absolute",
              left: SCREEN_W / 2 - 170,
              top: SCREEN_H / 2 - 170,
              width: 340,
              height: 340,
              border: `4px solid ${C.pinkSoft}`,
              borderRadius: 40,
              opacity: 0.55,
              transform: `scale(${1 + Math.sin(frame / 5) * 0.015})`,
            }}
          />

          {/* Ring pulse */}
          <div
            style={{
              position: "absolute",
              left: SCREEN_W / 2 - 160,
              top: SCREEN_H / 2 - 160,
              width: 320,
              height: 320,
              borderRadius: "50%",
              border: `8px solid ${C.pink}`,
              transform: `scale(${interpolate(ring, [0, 1], [0.6, 1.9])})`,
              opacity: interpolate(ring, [0, 1], [0.9, 0]),
            }}
          />

          {/* Angka countdown */}
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                fontFamily: fontSans,
                fontWeight: 900,
                fontSize: 320,
                lineHeight: 1,
                color: "#fff",
                textShadow: `0 10px 0 ${C.pink}, 0 20px 60px rgba(255,64,129,0.7)`,
                transform: `scale(${numScale}) rotate(${interpolate(pop, [0, 1], [-14, 0])}deg)`,
                opacity: numOpacity,
              }}
            >
              {num}
            </div>
          </AbsoluteFill>

          {/* Flash */}
          <AbsoluteFill
            style={{
              background: "#fff",
              opacity: flash,
              translate: "0px 21.7px"
            }}
          />
        </div>

        {/* Bezel bawah */}
        <div style={{ height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px" }}>
          <div style={{ fontFamily: fontSans, fontWeight: 800, fontSize: 24, color: "#fff", letterSpacing: 4 }}>KENANGITA · PHOTOBOX</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: i <= idx ? "#fff" : "rgba(255,255,255,0.4)" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Caption */}
      <div
        style={{
          padding: "16px 40px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          border: "2px solid rgba(255,255,255,0.18)",
          fontFamily: fontSans,
          fontWeight: 600,
          fontSize: 44,
          color: "#fff",
          transform: `translateY(${interpolate(caption, [0, 1], [40, 0])}px)`,
          opacity: caption,
        }}
      >
        angkat pose <span style={{ color: C.pinkSoft }}>peace</span> ✌️
      </div>

      {/* Flash memenuhi layar */}
      <AbsoluteFill style={{ background: "#fff", opacity: flash * 0.9, pointerEvents: "none" }} />

      <Sfx src={SFX.beep} at={0} />
      <Sfx src={SFX.beep} at={STEP} />
      <Sfx src={SFX.beepHigh} at={STEP * 2} />
      <Sfx src={SFX.shutter} at={55} />
    </AbsoluteFill>
  );
};
