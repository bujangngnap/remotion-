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
  bebasNeueFont,
  COLORS,
  COPY,
  interFont,
} from "../constants";
import { UrlPill } from "../components/UrlPill";

export const Scene8CtaEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width: canvasW, height: canvasH } = useVideoConfig();

  // 10.95 - 11.35s = relFrame 1.5 to 13.5:
  // Ghost TKG logo/wordmark at y~30% sharpens into place
  const logoSpring = spring({
    frame: Math.max(0, frame - 1.5),
    fps,
    config: { damping: 13, stiffness: 180 },
  });

  const logoBlur = interpolate(frame, [1.5, 13.5], [14, 0], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoOpacity = interpolate(frame, [1.5, 13.5], [0.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = 0.92 + 0.08 * logoSpring;
  const logoY = interpolate(logoSpring, [0, 1], [18, 0]);

  // Slow glow pulse on the logo after relFrame 21 (11.60s)
  const isGlowPulsing = frame >= 21;
  const glowPulse = isGlowPulsing
    ? 0.7 + 0.3 * Math.sin((frame - 21) * 0.12)
    : 0.6;

  // Tagline under the logo: "Tumbuh Kembang Group" (Inter, 28px, #FDBA74)
  const taglineSpring = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const taglineOpacity = interpolate(frame, [6, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(taglineSpring, [0, 1], [14, 0]);

  const topCenterY = canvasH * 0.30;
  const urlPillY = canvasH * 0.68;

  return (
    <div
      style={{
        position: "absolute",
        width: canvasW,
        height: canvasH,
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {/* 1. Ghost TKG Logo/Wordmark at y~30% */}
      <div
        style={{
          position: "absolute",
          left: canvasW * 0.5,
          top: topCenterY,
          transform: `translate(-50%, -50%) translateY(${logoY}px) scale(${logoScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: logoOpacity,
          filter: logoBlur > 0.05 ? `blur(${logoBlur.toFixed(2)}px)` : "none",
        }}
      >
        {/* Ambient Orange Glow behind Logo */}
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            backgroundColor: COLORS.PRIMARY_ORANGE,
            opacity: 0.35 * glowPulse,
            filter: "blur(50px)",
            zIndex: 1,
          }}
        />

        {/* TKG Official Logo + Wordmark */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 24,
            zIndex: 2,
          }}
        >
          {/* Official Logo Mark */}
          <div
            style={{
              width: 110,
              height: 110,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: `drop-shadow(0 10px 30px ${COLORS.PRIMARY_ORANGE}aa)`,
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile("logo.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Wordmark */}
          <span
            style={{
              fontFamily: bebasNeueFont.fontFamily,
              fontSize: 88,
              fontWeight: 400,
              color: "#FFFFFF",
              letterSpacing: "0.04em",
              lineHeight: 1,
              textShadow: "0 4px 24px rgba(0, 0, 0, 0.7)",
            }}
          >
            {COPY.BRAND_NAME}
          </span>
        </div>

        {/* Tagline under Logo: "Tumbuh Kembang Group" (Inter, 28px, #FDBA74) */}
        <div
          style={{
            position: "relative",
            marginTop: 14,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: interFont.fontFamily,
              fontSize: 28,
              fontWeight: 500,
              color: COLORS.CTA_TAGLINE,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {COPY.BRAND_TAGLINE}
          </span>
        </div>
      </div>

      {/* 2. URL Pill at y~68% */}
      <div
        style={{
          position: "absolute",
          left: canvasW * 0.5,
          top: urlPillY,
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UrlPill relativeFrame={frame} />
      </div>
    </div>
  );
};
