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

export const ShowcaseDigitalKenangita: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width: canvasW, height: canvasH } = useVideoConfig();

  const isPortrait = canvasH > canvasW * 1.2;

  // Scene 6 duration = 125 frames (relFrame 0 to 124)
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

  // Camera flash effect for Kenangita polaroid entrance around relFrame 18-24
  const flashOpacity = interpolate(frame, [18, 19, 23], [0, 0.75, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit at relFrame 110 - 122:
  const exitProgress = interpolate(frame, [110, 122], [0, 1], {
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

  // Terminal code typing progress:
  const codeProgress = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      {/* Camera Flash overlay for Kenangita */}
      {flashOpacity > 0.02 && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#FFFFFF",
            opacity: flashOpacity,
            zIndex: 40,
          }}
        />
      )}

      {/* CARD 1: TK Digital (Web & Software Development) */}
      <div
        style={{
          width: cardWidth,
          height: cardHeight,
          borderRadius: 40,
          backgroundColor: "#FFFFFF",
          boxShadow: "0 20px 50px rgba(13, 13, 13, 0.08), 0 4px 12px rgba(13, 13, 13, 0.03)",
          border: "2px solid rgba(43, 43, 46, 0.15)",
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
              backgroundColor: "#F4F4F5",
              padding: "4px 12px",
              borderRadius: 99,
              marginBottom: 12,
            }}
          >
            <Img
              src={staticFile("logos/digital.svg")}
              style={{ width: 20, height: 20 }}
            />
            <span
              style={{
                fontFamily: interFont.fontFamily,
                fontSize: 14,
                fontWeight: 700,
                color: "#27272A",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              03 • WEB & SOFTWARE
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
            {COPY.SHOWCASE2_TITLE_DIGITAL}
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
            {COPY.SHOWCASE2_DESC_DIGITAL}
          </p>
        </div>

        {/* Right side: Modern Dark Glass Code Terminal */}
        <div
          style={{
            width: isPortrait ? "100%" : 320,
            height: isPortrait ? 140 : 180,
            borderRadius: 22,
            backgroundColor: "#18181B",
            padding: "16px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 14px 30px rgba(0, 0, 0, 0.25)",
            fontFamily: "monospace",
            marginTop: isPortrait ? 16 : 0,
          }}
        >
          {/* Terminal Title Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#EF4444" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#EAB308" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#22C55E" }} />
            </div>
            <span style={{ fontSize: 11, color: "#71717A" }}>app.deploy.ts</span>
          </div>

          {/* Code Typing Content */}
          <div style={{ fontSize: 13, lineHeight: 1.5, color: "#E4E4E7", marginTop: 8 }}>
            <div>
              <span style={{ color: "#F43F5E" }}>import</span>{" "}
              <span style={{ color: "#38BDF8" }}>{"{ scale }"}</span>{" "}
              <span style={{ color: "#F43F5E" }}>from</span>{" "}
              <span style={{ color: "#A3E635" }}>'@tkg/core'</span>;
            </div>
            {codeProgress > 0.4 && (
              <div>
                <span style={{ color: "#F43F5E" }}>await</span>{" "}
                <span style={{ color: "#F59E0B" }}>launch</span>
                <span style={{ color: "#38BDF8" }}>{"({ status: 'live' })"}</span>;
              </div>
            )}
          </div>

          {/* Status Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: "rgba(34, 197, 94, 0.15)",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              borderRadius: 6,
              padding: "2px 8px",
              width: "fit-content",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#22C55E", boxShadow: "0 0 6px #22C55E" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#4ADE80" }}>100% ONLINE • 0.3s LATENCY</span>
          </div>
        </div>
      </div>

      {/* CARD 2: Kenangita (Photobooth & Experiences) */}
      <div
        style={{
          width: cardWidth,
          height: cardHeight,
          borderRadius: 40,
          backgroundColor: "#FFFFFF",
          boxShadow: "0 20px 50px rgba(13, 13, 13, 0.08), 0 4px 12px rgba(13, 13, 13, 0.03)",
          border: "2px solid rgba(107, 107, 112, 0.2)",
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
              backgroundColor: "#F3F4F6",
              padding: "4px 12px",
              borderRadius: 99,
              marginBottom: 12,
            }}
          >
            <Img
              src={staticFile("logos/kenangita.svg")}
              style={{ width: 20, height: 20 }}
            />
            <span
              style={{
                fontFamily: interFont.fontFamily,
                fontSize: 14,
                fontWeight: 700,
                color: "#4B5563",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              04 • PHOTOBOOTH & EVENT
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
            {COPY.SHOWCASE2_TITLE_KENANGITA}
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
            {COPY.SHOWCASE2_DESC_KENANGITA}
          </p>
        </div>

        {/* Right side: Cute Polaroid Photo Strip sliding in */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: isPortrait ? 16 : 0,
          }}
        >
          {/* Polaroid Strip Card */}
          <div
            style={{
              width: 140,
              height: 190,
              backgroundColor: "#FFFFFF",
              borderRadius: 14,
              boxShadow: "0 12px 28px rgba(0, 0, 0, 0.16)",
              border: "1px solid #E5E7EB",
              padding: "10px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `rotate(-4deg) translateY(${interpolate(card2Spring, [0, 1], [-20, 0])}px)`,
            }}
          >
            {/* Photo frame */}
            <div
              style={{
                width: 120,
                height: 130,
                borderRadius: 8,
                backgroundColor: "#FEF3C7",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Img
                src={staticFile("promo/avatars/avatar1.svg")}
                style={{ width: "90%", height: "90%", objectFit: "cover" }}
              />
              {/* Cute heart sticker */}
              <div
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  backgroundColor: "#F43F5E",
                  color: "#FFFFFF",
                  fontSize: 12,
                  padding: "2px 6px",
                  borderRadius: 99,
                  fontWeight: 700,
                }}
              >
                ♥
              </div>
            </div>

            <span
              style={{
                fontFamily: interFont.fontFamily,
                fontSize: 11,
                fontWeight: 700,
                color: "#6B7280",
                letterSpacing: "0.06em",
              }}
            >
              kenangita • booth
            </span>
          </div>

          {/* 2nd Polaroid Strip slightly offset */}
          <div
            style={{
              width: 130,
              height: 180,
              backgroundColor: "#FFFFFF",
              borderRadius: 14,
              boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
              border: "1px solid #E5E7EB",
              padding: "10px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              transform: "rotate(6deg)",
              opacity: 0.9,
            }}
          >
            <div
              style={{
                width: 110,
                height: 120,
                borderRadius: 8,
                backgroundColor: "#E0F2FE",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Img
                src={staticFile("promo/avatars/avatar2.svg")}
                style={{ width: "90%", height: "90%", objectFit: "cover" }}
              />
            </div>
            <span
              style={{
                fontFamily: interFont.fontFamily,
                fontSize: 11,
                fontWeight: 700,
                color: "#6B7280",
                letterSpacing: "0.06em",
              }}
            >
              instant print
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
