import React from "react";
import {
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  COLORS,
  COPY,
  interFont,
  interTightFont,
} from "../constants";

export const ShowcaseCreativeMedia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width: canvasW, height: canvasH } = useVideoConfig();

  const isPortrait = canvasH > canvasW * 1.2;

  // Scene 5 duration = 120 frames (relFrame 0 to 119)
  // Entrance: Card 1 enters at relFrame 0-14, Card 2 enters at relFrame 12-26
  const card1Spring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 180 },
  });
  const card1Blur = interpolate(frame, [0, 8], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const card1Opacity = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const card2Spring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 13, stiffness: 180 },
  });
  const card2Blur = interpolate(frame, [12, 20], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const card2Opacity = interpolate(frame, [12, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit at relFrame 106 - 118:
  // Both cards blur-pop out
  const exitProgress = interpolate(frame, [106, 118], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const exitBlur = interpolate(exitProgress, [0, 1], [0, 16]);

  const combinedOpacity1 = card1Opacity * exitOpacity;
  const combinedBlur1 = Math.max(card1Blur, exitBlur);

  const combinedOpacity2 = card2Opacity * exitOpacity;
  const combinedBlur2 = Math.max(card2Blur, exitBlur);

  // Creative Palette swatches entrance: relFrame 16 to 36
  const swatches = [
    { name: "Primary", hex: "#F97316", bg: COLORS.PRIMARY_ORANGE },
    { name: "Ink", hex: "#0D0D0D", bg: COLORS.INK },
    { name: "Peach", hex: "#FDBA74", bg: COLORS.LIGHT_ORANGE },
    { name: "Growth", hex: "#22C55E", bg: "#22C55E" },
  ];

  // Media visualizer bars bouncing:
  const barHeights = [45, 80, 60, 95, 70, 85, 50, 90, 65, 40];

  const cardWidth = isPortrait ? canvasW * 0.88 : canvasW * 0.82;
  const cardHeight = isPortrait ? 380 : 320;

  return (
    <div
      style={{
        position: "absolute",
        width: canvasW,
        height: canvasH,
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isPortrait ? 24 : 28,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {/* CARD 1: TK Creative (Branding & Identity) */}
      <div
        style={{
          width: cardWidth,
          height: cardHeight,
          borderRadius: 40,
          backgroundColor: "#FFFFFF",
          boxShadow: "0 20px 50px rgba(13, 13, 13, 0.08), 0 4px 12px rgba(13, 13, 13, 0.03)",
          border: "2px solid rgba(249, 115, 22, 0.15)",
          padding: isPortrait ? "24px 28px" : "28px 36px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: isPortrait ? "column" : "row",
          alignItems: isPortrait ? "flex-start" : "center",
          justifyContent: "space-between",
          opacity: combinedOpacity1,
          filter: combinedBlur1 > 0.05 ? `blur(${combinedBlur1.toFixed(2)}px)` : "none",
          transform: `translateY(${interpolate(card1Spring, [0, 1], [30, 0])}px) scale(${0.92 + 0.08 * card1Spring})`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Left side text info */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#FFF2EA",
              padding: "4px 12px",
              borderRadius: 99,
              marginBottom: 12,
            }}
          >
            <Img
              src={staticFile("logos/creative.svg")}
              style={{ width: 20, height: 20 }}
            />
            <span
              style={{
                fontFamily: interFont.fontFamily,
                fontSize: 14,
                fontWeight: 700,
                color: COLORS.PRIMARY_ORANGE,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              01 • BRANDING & DESIGN
            </span>
          </div>

          <h3
            style={{
              fontFamily: interTightFont.fontFamily,
              fontSize: isPortrait ? 36 : 42,
              fontWeight: 700,
              color: COLORS.INK,
              margin: "0 0 6px 0",
              letterSpacing: "-0.02em",
            }}
          >
            {COPY.SHOWCASE1_TITLE_CREATIVE}
          </h3>

          <p
            style={{
              fontFamily: interFont.fontFamily,
              fontSize: isPortrait ? 18 : 20,
              fontWeight: 500,
              color: COLORS.SECONDARY_TEXT,
              margin: 0,
              maxWidth: 420,
            }}
          >
            {COPY.SHOWCASE1_DESC_CREATIVE}
          </p>
        </div>

        {/* Right side: Palette Swatches popping in */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: isPortrait ? 16 : 0,
          }}
        >
          {swatches.map((s, idx) => {
            const swatchSpring = spring({
              frame: Math.max(0, frame - (16 + idx * 4)),
              fps,
              config: { damping: 11, stiffness: 220 },
            });
            const swatchScale = 0.6 + 0.4 * swatchSpring;
            const swatchOpacity = interpolate(swatchSpring, [0, 0.4], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  opacity: swatchOpacity,
                  transform: `scale(${swatchScale})`,
                }}
              >
                <div
                  style={{
                    width: isPortrait ? 52 : 64,
                    height: isPortrait ? 64 : 80,
                    borderRadius: 18,
                    backgroundColor: s.bg,
                    boxShadow: "0 8px 18px rgba(0, 0, 0, 0.12)",
                    border: "2px solid #FFFFFF",
                  }}
                />
                <span
                  style={{
                    fontFamily: interFont.fontFamily,
                    fontSize: 12,
                    fontWeight: 600,
                    color: COLORS.SECONDARY_TEXT,
                  }}
                >
                  {s.hex}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CARD 2: TK Media (Video & Content Production) */}
      <div
        style={{
          width: cardWidth,
          height: cardHeight,
          borderRadius: 40,
          backgroundColor: "#FFFFFF",
          boxShadow: "0 20px 50px rgba(13, 13, 13, 0.08), 0 4px 12px rgba(13, 13, 13, 0.03)",
          border: "2px solid rgba(251, 146, 60, 0.2)",
          padding: isPortrait ? "24px 28px" : "28px 36px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: isPortrait ? "column" : "row",
          alignItems: isPortrait ? "flex-start" : "center",
          justifyContent: "space-between",
          opacity: combinedOpacity2,
          filter: combinedBlur2 > 0.05 ? `blur(${combinedBlur2.toFixed(2)}px)` : "none",
          transform: `translateY(${interpolate(card2Spring, [0, 1], [30, 0])}px) scale(${0.92 + 0.08 * card2Spring})`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Left side text info */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#FFF7ED",
              padding: "4px 12px",
              borderRadius: 99,
              marginBottom: 12,
            }}
          >
            <Img
              src={staticFile("logos/media.svg")}
              style={{ width: 20, height: 20 }}
            />
            <span
              style={{
                fontFamily: interFont.fontFamily,
                fontSize: 14,
                fontWeight: 700,
                color: "#EA580C",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              02 • VIDEO & CONTENT
            </span>
          </div>

          <h3
            style={{
              fontFamily: interTightFont.fontFamily,
              fontSize: isPortrait ? 36 : 42,
              fontWeight: 700,
              color: COLORS.INK,
              margin: "0 0 6px 0",
              letterSpacing: "-0.02em",
            }}
          >
            {COPY.SHOWCASE1_TITLE_MEDIA}
          </h3>

          <p
            style={{
              fontFamily: interFont.fontFamily,
              fontSize: isPortrait ? 18 : 20,
              fontWeight: 500,
              color: COLORS.SECONDARY_TEXT,
              margin: 0,
              maxWidth: 420,
            }}
          >
            {COPY.SHOWCASE1_DESC_MEDIA}
          </p>
        </div>

        {/* Right side: Mini 4K Video Player with dancing audio waves */}
        <div
          style={{
            width: isPortrait ? "100%" : 280,
            height: isPortrait ? 130 : 160,
            borderRadius: 24,
            backgroundColor: "#18181B",
            padding: "16px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 10px 24px rgba(0, 0, 0, 0.2)",
            marginTop: isPortrait ? 16 : 0,
          }}
        >
          {/* Header row: REC blinking indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#EF4444",
                  opacity: Math.floor(frame / 6) % 2 === 0 ? 1 : 0.2,
                  boxShadow: "0 0 8px #EF4444",
                }}
              />
              <span
                style={{
                  fontFamily: interFont.fontFamily,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "0.06em",
                }}
              >
                REC 4K
              </span>
            </div>

            <span
              style={{
                fontFamily: interFont.fontFamily,
                fontSize: 12,
                fontWeight: 600,
                color: "#A1A1AA",
              }}
            >
              60 FPS
            </span>
          </div>

          {/* Center: Audio Wave Visualizer bouncing */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              height: 48,
            }}
          >
            {barHeights.map((maxH, i) => {
              const wave = Math.abs(Math.sin((frame * 0.25) + i * 0.7));
              const h = 10 + wave * (maxH * 0.4);
              return (
                <div
                  key={i}
                  style={{
                    width: 5,
                    height: h,
                    borderRadius: 99,
                    backgroundColor: i % 2 === 0 ? COLORS.PRIMARY_ORANGE : COLORS.LIGHT_ORANGE,
                    transition: "height 0.05s ease",
                  }}
                />
              );
            })}
          </div>

          {/* Bottom: Playhead scrubber line */}
          <div
            style={{
              width: "100%",
              height: 4,
              borderRadius: 2,
              backgroundColor: "#27272A",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${((frame % 60) / 60) * 100}%`,
                height: "100%",
                backgroundColor: COLORS.PRIMARY_ORANGE,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
