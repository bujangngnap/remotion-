import React from "react";
import { Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BOUNCY, CLAMP, springAt } from "../animations";
import { C, fontHand, fontSans, PHOTO_LIST } from "../theme";

type PhotoStripProps = {
  width?: number;
  photos?: string[];
  /** Warna kertas strip */
  paper?: string;
  /** Warna teks footer */
  accent?: string;
  /**
   * Opsional: frame (relatif scene) saat tiap slot terisi foto.
   * Jika tidak diisi, semua slot langsung terisi.
   */
  fillAt?: number[];
  progress?: number;
  label?: string;
  style?: React.CSSProperties;
};

/** Photo strip 4-frame ala photobox, bisa terisi otomatis satu per satu */
export const PhotoStrip: React.FC<PhotoStripProps> = ({
  width = 240,
  photos = PHOTO_LIST,
  paper = C.white,
  accent = C.pink,
  fillAt,
  progress,
  label = "kenangita.id",
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pad = width * 0.07;
  const slotW = width - pad * 2;
  const slotH = slotW * 0.75;
  const gap = pad * 0.55;
  const footer = width * 0.3;

  return (
    <div
      style={{
        width,
        padding: pad,
        paddingBottom: 0,
        background: paper,
        borderRadius: width * 0.035,
        boxShadow: `0 ${width * 0.08}px ${width * 0.2}px rgba(233,30,99,0.18), 0 2px 6px rgba(23,19,28,0.08)`,
        display: "flex",
        flexDirection: "column",
        gap,
        boxSizing: "border-box",
        ...style,
      }}
    >
      {[0, 1, 2, 3].map((i) => {
        const at = fillAt?.[i];
        const filled = at !== undefined ? frame >= at : (progress !== undefined ? i < progress : true);
        const pop = at !== undefined ? springAt(frame, fps, at, BOUNCY) : (progress !== undefined && progress > i ? 1 : (progress === undefined ? 1 : 0));
        const flash = at === undefined ? 0 : interpolate(frame, [at, at + 2, at + 12], [0, 1, 0], CLAMP);

        return (
          <div
            key={i}
            style={{
              width: slotW,
              height: slotH,
              borderRadius: width * 0.02,
              overflow: "hidden",
              position: "relative",
              background: `repeating-linear-gradient(45deg, ${C.pinkPale} 0 10px, ${C.blush} 10px 20px)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!filled && <span style={{ fontSize: slotW * 0.18, opacity: 0.35 }}>📷</span>}
            {filled && (
              <Img
                src={photos[i % photos.length]}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: `scale(${interpolate(pop, [0, 1], [1.35, 1])})`,
                  opacity: Math.min(1, pop * 1.5),
                }}
              />
            )}
            {flash > 0 && <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash }} />}
          </div>
        );
      })}
      <div
        style={{
          height: footer,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
        }}
      >
        <div style={{ fontFamily: fontSans, fontWeight: 800, fontSize: width * 0.085, color: accent, letterSpacing: -0.5 }}>
          {label}
        </div>
        <div style={{ fontFamily: fontHand, fontWeight: 700, fontSize: width * 0.085, color: C.gray, marginTop: width * 0.02 }}>
          07.10.26 ♡
        </div>
      </div>
    </div>
  );
};
