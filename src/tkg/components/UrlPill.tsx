import React from "react";
import {
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
} from "remotion";
import { COLORS, COPY, interFont } from "../constants";

export interface UrlPillProps {
  /** Relative frame within Scene 8 (0 to 63) */
  relativeFrame: number;
}

export const UrlPill: React.FC<UrlPillProps> = ({ relativeFrame }) => {
  const { fps, width: canvasW } = useVideoConfig();
  const frame = relativeFrame;

  // 11.15s = relFrame 7.5: Two offset bars slide in from left & right
  // orange (#F97316) from left, peach (#FFE4CC) from right
  const slideProgress = interpolate(frame, [7.5, 16], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Snap spring at relFrame 16 (11.45s)
  const snapSpring = spring({
    frame: Math.max(0, frame - 16),
    fps,
    config: { damping: 12, stiffness: 220 },
  });

  const isSnapped = frame >= 16;

  // Typing text between relFrame 18 and 30
  const typingProgress = interpolate(frame, [18, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fullUrl = COPY.CTA_URL;
  const charsRevealed = Math.min(
    fullUrl.length,
    Math.floor(typingProgress * fullUrl.length)
  );
  const visibleUrl = frame >= 30 ? fullUrl : fullUrl.slice(0, charsRevealed);

  // Gentle breathing scale (1.00 -> 1.015) after 11.60s (relFrame 21)
  const isBreathing = frame >= 21;
  const breathScale = isBreathing
    ? 1.0 + 0.015 * Math.sin((frame - 21) * 0.14)
    : 1.0;

  const pillWidth = Math.min(740, canvasW * 0.72);
  const pillHeight = 76;

  // Offset positions during slide-in
  const orangeOffset = interpolate(slideProgress, [0, 1], [-canvasW * 0.6, 0]);
  const peachOffset = interpolate(slideProgress, [0, 1], [canvasW * 0.6, 0]);

  if (frame < 7.5) {
    return null;
  }

  return (
    <div
      style={{
        position: "relative",
        width: pillWidth,
        height: pillHeight,
        transform: `scale(${breathScale * (0.94 + 0.06 * snapSpring)})`,
        transformOrigin: "center center",
      }}
    >
      {/* Chromatic Offset Background Bars (Orange & Peach) that stay as 6px offset shadow */}
      <div
        style={{
          position: "absolute",
          left: -6 + (isSnapped ? 0 : orangeOffset),
          top: -4,
          width: pillWidth,
          height: pillHeight,
          borderRadius: 99,
          backgroundColor: COLORS.PRIMARY_ORANGE,
          opacity: 0.85,
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 6 + (isSnapped ? 0 : peachOffset),
          top: 6,
          width: pillWidth,
          height: pillHeight,
          borderRadius: 99,
          backgroundColor: COLORS.PEACH_WASH,
          opacity: 0.75,
          zIndex: 2,
        }}
      />

      {/* Main Snap Pill Container */}
      <div
        style={{
          position: "relative",
          width: pillWidth,
          height: pillHeight,
          borderRadius: 99,
          backgroundColor: "#FFFFFF",
          padding: "5px",
          boxSizing: "border-box",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.45)",
          zIndex: 5,
          opacity: isSnapped ? 1 : slideProgress,
        }}
      >
        {/* Inner black field (like a search bar) */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 99,
            backgroundColor: COLORS.CTA_URL_BG,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 22px",
            boxSizing: "border-box",
          }}
        >
          {/* Left: Magnifier Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flex: 1,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="#9CA3AF"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            {/* URL text */}
            <span
              style={{
                fontFamily: interFont.fontFamily,
                fontSize: 34,
                fontWeight: 600,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <span>{visibleUrl}</span>
              {frame >= 18 && frame < 36 && (
                <span
                  style={{
                    display: "inline-block",
                    width: 3,
                    height: 28,
                    backgroundColor: COLORS.PRIMARY_ORANGE,
                    marginLeft: 4,
                    opacity: Math.floor((frame - 18) / 3) % 2 === 0 ? 1 : 0,
                  }}
                />
              )}
            </span>
          </div>

          {/* Right end: official TK logo mark badge */}
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              backgroundColor: COLORS.PRIMARY_ORANGE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 10px ${COLORS.PRIMARY_ORANGE}88`,
              flexShrink: 0,
              padding: 6,
              boxSizing: "border-box",
              overflow: "hidden",
            }}
          >
            <Img
              src={staticFile("logo.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
