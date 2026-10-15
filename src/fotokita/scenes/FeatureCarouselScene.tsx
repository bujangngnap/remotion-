import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CLAMP, SNAPPY, SOFT, springAt, wave } from "../animations";
import { Sfx } from "../components/SceneShell";
import { C, fontSans, SFX } from "../theme";

const CARDS = [
  { emoji: "✌️", title: "Auto Peace Shutter", desc: "Kamera jepret otomatis begitu kamu pose peace.", tag: "AI pose detect", main: C.pink, soft: "#FFC6DA" },
  { emoji: "🎞️", title: "4-Shot Strip", desc: "4 kali cekrek, langsung jadi satu strip foto.", tag: "auto layout", main: C.purple, soft: "#DCD0FF" },
  { emoji: "🎀", title: "Cute Frames", desc: "Bingkai lucu & aesthetic siap pakai.", tag: "coquette vibes", main: "#FF7A59", soft: "#FFD8C9" },
  { emoji: "🔒", title: "100% Free & Local", desc: "Gratis, dan foto diproses di perangkatmu.", tag: "privacy first", main: "#10B981", soft: "#BFF0DA" },
];

/** Frame saat carousel bergeser ke kartu berikutnya */
const STEPS = [42, 82, 122];
const CARD_W = 470;
const CARD_H = 580;
const SPACING = 530;

const MARQUEE = "AUTO PEACE ✦ 4-SHOT STRIP ✦ CUTE FRAMES ✦ 100% FREE ✦ ";

/** Scene 6 — Carousel kartu fitur dengan tilt 3D */
export const FeatureCarouselScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = springAt(frame, fps, 0, SNAPPY);
  const deckIn = springAt(frame, fps, 4, SOFT);
  const active = STEPS.reduce((acc, s) => acc + springAt(frame, fps, s, SNAPPY), 0) - (1 - deckIn) * 2.2;
  const activeIdx = Math.round(Math.max(0, active));

  return (
    <AbsoluteFill>
      {/* Marquee outline di latar */}
      <div
        style={{
          position: "absolute",
          top: 430,
          left: 0,
          whiteSpace: "nowrap",
          fontFamily: fontSans,
          fontWeight: 900,
          fontSize: 200,
          letterSpacing: -4,
          color: "transparent",
          WebkitTextStroke: `3px ${C.pinkLight}`,
          transform: `translateX(${-((frame * 7) % 2600)}px)`,
          opacity: 0.9,
        }}
      >
        {MARQUEE.repeat(3)}
      </div>

      {/* Judul */}
      <div
        style={{
          position: "absolute",
          top: 70,
          width: "100%",
          textAlign: "center",
          opacity: head,
          transform: `translateY(${interpolate(head, [0, 1], [-40, 0])}px)`,
        }}
      >
        <div style={{ fontFamily: fontSans, fontWeight: 700, fontSize: 24, letterSpacing: 4, color: C.pink }}>FITUR UNGGULAN</div>
        <div style={{ fontFamily: fontSans, fontWeight: 800, fontSize: 70, letterSpacing: -2, color: C.ink, marginTop: 4 }}>kenapa harus kenangita? 💖</div>
      </div>

      {/* Deck kartu 3D */}
      <AbsoluteFill style={{ perspective: 1800, alignItems: "center", justifyContent: "center", top: 110 }}>
        {CARDS.map((card, i) => {
          const offset = i - active;
          const abs = Math.abs(offset);
          const isFront = abs < 0.5;
          const tilt = (1 - Math.min(abs, 1)) * wave(frame, 50, 4);
          return (
            <div
              key={card.title}
              style={{
                position: "absolute",
                width: CARD_W,
                height: CARD_H,
                borderRadius: 44,
                background: C.white,
                border: `3px solid ${card.soft}`,
                padding: 44,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                transform: `translateX(${offset * SPACING}px) translateZ(${-Math.min(abs, 2.5) * 140}px) rotateY(${Math.max(-60, Math.min(60, -offset * 28))}deg) rotateX(${tilt}deg) scale(${1 - Math.min(abs, 2) * 0.1})`,
                opacity: interpolate(abs, [0, 2, 2.8], [1, 0.7, 0], CLAMP),
                filter: abs > 0.3 ? `blur(${Math.min(abs, 2) * 1.6}px)` : undefined,
                zIndex: 100 - Math.round(abs * 10),
                boxShadow: isFront ? `0 40px 90px ${card.main}40, 0 10px 24px rgba(23,19,28,0.08)` : "0 20px 40px rgba(23,19,28,0.08)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 40,
                    background: `linear-gradient(145deg, ${card.soft}, ${card.main})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 80,
                    transform: `rotate(${isFront ? wave(frame, 40, 6) : -6}deg)`,
                    boxShadow: `0 16px 34px ${card.main}55`,
                  }}
                >
                  {card.emoji}
                </div>
                <div style={{ fontFamily: fontSans, fontWeight: 900, fontSize: 64, color: card.soft, lineHeight: 1 }}>0{i + 1}</div>
              </div>
              <div style={{ marginTop: 46, fontFamily: fontSans, fontWeight: 800, fontSize: 50, letterSpacing: -1.5, lineHeight: 1.05, color: C.ink }}>{card.title}</div>
              <div style={{ marginTop: 18, fontFamily: fontSans, fontWeight: 400, fontSize: 28, lineHeight: 1.35, color: C.gray }}>{card.desc}</div>
              <div style={{ flex: 1 }} />
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "10px 22px",
                  borderRadius: 999,
                  background: `${card.soft}`,
                  color: card.main,
                  fontFamily: fontSans,
                  fontWeight: 700,
                  fontSize: 22,
                }}
              >
                #{card.tag}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Indikator */}
      <div style={{ position: "absolute", bottom: 54, width: "100%", display: "flex", justifyContent: "center", gap: 14 }}>
        {CARDS.map((card, i) => (
          <div
            key={card.title}
            style={{
              width: i === activeIdx ? 56 : 16,
              height: 16,
              borderRadius: 999,
              background: i === activeIdx ? C.pink : C.pinkLight,
            }}
          />
        ))}
      </div>

      <Sfx src={SFX.whoosh} at={4} volume={0.8} />
      {STEPS.map((s) => (
        <Sfx key={s} src={SFX.whoosh} at={s} volume={0.8} />
      ))}
    </AbsoluteFill>
  );
};
