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
  interTightFont,
} from "../constants";
import { UrlPill } from "../components/UrlPill";

export const Scene10GrandCta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width: canvasW, height: canvasH } = useVideoConfig();

  const isPortrait = canvasH > canvasW * 1.2;

  // Entrance: Logo & Header sharpens into place at relFrame 0 to 14
  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 180 },
  });

  const logoBlur = interpolate(frame, [0, 10], [14, 0], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoScale = 0.92 + 0.08 * logoSpring;
  const logoY = interpolate(logoSpring, [0, 1], [18, 0]);

  // Glow pulse
  const glowPulse = 0.7 + 0.3 * Math.sin(frame * 0.12);

  // Subtitle & WhatsApp CTA entrance at relFrame 18 to 28
  const actionSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const actionOpacity = interpolate(frame, [18, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const topCenterY = isPortrait ? canvasH * 0.28 : canvasH * 0.29;
  const urlPillY = isPortrait ? canvasH * 0.65 : canvasH * 0.64;
  const ctaActionY = isPortrait ? canvasH * 0.76 : canvasH * 0.78;

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
      {/* 1. Official TKG Logo + Wordmark at y~29% */}
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
            width: 360,
            height: 360,
            borderRadius: "50%",
            backgroundColor: COLORS.PRIMARY_ORANGE,
            opacity: 0.38 * glowPulse,
            filter: "blur(55px)",
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
              width: isPortrait ? 96 : 115,
              height: isPortrait ? 96 : 115,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              filter: `drop-shadow(0 12px 32px ${COLORS.PRIMARY_ORANGE}cc)`,
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile("logo.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                translate: "-5.9px -5.7px",
                scale: 1.546
              }}
            />
          </div>

          {/* Wordmark */}
          <span
            style={{
              fontFamily: bebasNeueFont.fontFamily,
              fontSize: isPortrait ? 76 : 94,
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

        {/* Tagline under Logo: "Tumbuh Kembang Group" */}
        <div
          style={{
            position: "relative",
            marginTop: 14,
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: interFont.fontFamily,
              fontSize: isPortrait ? 22 : 28,
              fontWeight: 600,
              color: COLORS.CTA_TAGLINE,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {COPY.BRAND_TAGLINE}
          </span>
        </div>

        {/* Value Proposition Subtitle */}
        <div
          style={{
            position: "relative",
            marginTop: 8,
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: interTightFont.fontFamily,
              fontSize: isPortrait ? 18 : 22,
              fontWeight: 500,
              color: "#9CA3AF",
              letterSpacing: "-0.01em",
            }}
          >
            {COPY.BRAND_TAGLINE_SUB}
          </span>
        </div>
      </div>

      {/* 2. URL Pill Search Bar at y~64% */}
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

      {/* 3. Action WhatsApp / DM Consultation Badge at y~78% */}
      <div
        style={{
          position: "absolute",
          left: canvasW * 0.5,
          top: ctaActionY,
          transform: `translate(-50%, -50%) scale(${0.88 + 0.12 * actionSpring})`,
          opacity: actionOpacity,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            backdropFilter: "blur(12px)",
            borderRadius: 99,
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Green Online Dot */}
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              boxShadow: "0 0 10px #22C55E",
            }}
          />

          <span
            style={{
              fontFamily: interFont.fontFamily,
              fontSize: isPortrait ? 16 : 20,
              fontWeight: 600,
              color: "#F3F4F6",
              letterSpacing: "-0.01em",
            }}
          >
            {COPY.CTA_ACTION}
          </span>
        </div>
      </div>
    </div>
  );
};
