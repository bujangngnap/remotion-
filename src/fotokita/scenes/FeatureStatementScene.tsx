import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BOUNCY, CLAMP, SNAPPY, springAt, wave } from "../animations";
import { Bow } from "../components/Bow";
import { Sparkle, Sticker } from "../components/Decor";
import { RetroCamera } from "../components/RetroCamera";
import { Sfx } from "../components/SceneShell";
import { C, fontHand, fontSans, SFX } from "../theme";

type Word = { t: string; style?: "pink" | "marker" };

const LINES: Word[][] = [
  [{ t: "bikin" }, { t: "photo" }, { t: "strip" }, { t: "lucu", style: "pink" }],
  [{ t: "&" }, { t: "aesthetic", style: "marker" }, { t: "di" }, { t: "mana" }, { t: "aja." }],
];

/** Scene 4 — Pernyataan fitur besar di tengah + aksen kamera & pita */
export const FeatureStatementScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cam = springAt(frame, fps, 18, BOUNCY);
  const bow = springAt(frame, fps, 26, BOUNCY);
  const sub = springAt(frame, fps, 44, SNAPPY);
  const chip = springAt(frame, fps, 58, BOUNCY);

  let wordIndex = 0;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      {/* Kamera kiri bawah */}
      <div
        style={{
          position: "absolute",
          left: 110,
          bottom: 110,
          transform: `translateX(${interpolate(cam, [0, 1], [-500, 0])}px) rotate(${-14 + wave(frame, 70, 5)}deg)`,
        }}
      >
        <RetroCamera width={330} />
      </div>

      {/* Pita kanan atas */}
      <div
        style={{
          position: "absolute",
          right: 140,
          top: 90,
          transform: `scale(${bow}) rotate(${14 + wave(frame, 60, 7, 1)}deg)`,
          transformOrigin: "50% 30%",
        }}
      >
        <Bow width={290} />
      </div>

      {/* Teks utama */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        {LINES.map((line, li) => (
          <div key={li} style={{ display: "flex", gap: 30 }}>
            {line.map((w) => {
              const i = wordIndex++;
              const p = springAt(frame, fps, 4 + i * 3.5, BOUNCY);
              const base: React.CSSProperties = {
                fontFamily: fontSans,
                fontWeight: 800,
                fontSize: 112,
                letterSpacing: -3.5,
                lineHeight: 1.1,
                color: C.ink,
                position: "relative",
                display: "inline-block",
                transform: `translateY(${interpolate(p, [0, 1], [70, 0])}px) rotate(${interpolate(p, [0, 1], [i % 2 ? 10 : -10, 0])}deg) scale(${interpolate(p, [0, 1], [0.6, 1])})`,
                opacity: Math.min(1, p * 1.6),
              };

              if (w.style === "pink") {
                const draw = interpolate(frame, [26, 44], [1, 0], CLAMP);
                return (
                  <span key={w.t} style={{ ...base, color: C.pink }}>
                    {w.t}
                    <svg viewBox="0 0 220 30" width="100%" height={30} style={{ position: "absolute", left: 0, bottom: -14, overflow: "visible" }}>
                      <path
                        d="M4 18 Q 30 4 56 18 T 108 18 T 160 18 T 216 16"
                        stroke={C.pink}
                        strokeWidth={8}
                        fill="none"
                        strokeLinecap="round"
                        pathLength={1}
                        strokeDasharray={1}
                        strokeDashoffset={draw}
                      />
                    </svg>
                  </span>
                );
              }
              if (w.style === "marker") {
                const mark = springAt(frame, fps, 30, SNAPPY);
                return (
                  <span key={w.t} style={base}>
                    <span
                      style={{
                        position: "absolute",
                        left: -14,
                        right: -14,
                        top: "48%",
                        height: "44%",
                        borderRadius: 14,
                        background: C.lavender,
                        opacity: 0.75,
                        transform: `scaleX(${mark}) rotate(-1.5deg)`,
                        transformOrigin: "left center",
                      }}
                    />
                    <span style={{ position: "relative" }}>{w.t}</span>
                  </span>
                );
              }
              return (
                <span key={w.t} style={base}>
                  {w.t}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Sub-teks */}
      <div
        style={{
          marginTop: 44,
          fontFamily: fontSans,
          fontWeight: 500,
          fontSize: 46,
          color: C.gray,
          opacity: sub,
          transform: `translateY(${interpolate(sub, [0, 1], [30, 0])}px)`,
        }}
      >
        Tanpa antri atau install aplikasi
      </div>

      <div
        style={{
          marginTop: 30,
          padding: "10px 30px",
          borderRadius: 999,
          background: C.pinkPale,
          border: `2px dashed ${C.pinkSoft}`,
          fontFamily: fontHand,
          fontWeight: 700,
          fontSize: 44,
          color: C.pink,
          transform: `scale(${chip}) rotate(${-3 + wave(frame, 50, 1.5)}deg)`,
        }}
      >
        cukup buka browser, langsung cekrek! 📸
      </div>

      <Sticker emoji="💗" x={250} y={210} size={90} delay={36} rotate={-14} />
      <Sticker emoji="🌷" x={1700} y={850} size={100} delay={48} rotate={10} phase={1.5} />
      <Sparkle x={420} y={150} size={48} delay={30} color={C.purple} />
      <Sparkle x={1500} y={430} size={40} delay={40} color={C.pink} phase={1} />
      <Sparkle x={1580} y={720} size={56} delay={54} color={C.yellow} phase={2} />

      <Sfx src={SFX.whoosh} at={0} volume={0.8} />
      <Sfx src={SFX.pop} at={18} />
      <Sfx src={SFX.pop} at={26} />
      <Sfx src={SFX.chime} at={44} volume={0.6} />
    </AbsoluteFill>
  );
};
