import React from "react";
import {
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { COLORS, COPY, fredokaFont, interTightFont } from "../constants";

export const Scene3StartShowingUp: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 19 (f66 - 85)

  // Header "PiNNED" fades out by 2.5s (relFrame 9)
  const headerOpacity = interpolate(frame, [0, 8], [0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Typewriter reveal from relFrame 0 to 6
  const typingProgress = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fullText = COPY.SCENE3_HEADLINE;
  const numChars = Math.min(fullText.length, Math.floor(typingProgress * fullText.length));

  // Small blue square lingers at the end like a cursor until relFrame 15
  const isDoneTyping = frame >= 6;
  const showCursor = frame < 15;

  // 2.70 - 2.85s (relFrame 15 to 19):
  // "Start" fades to light grey first at relFrame 15
  const startFaded = frame >= 15;
  const startColor = startFaded ? "#9CA3AF" : COLORS.TEXT_NAVY;

  // Blur-out at relFrame 16 to 19
  const exitBlur = interpolate(frame, [16, 19], [0, 14], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [16, 19], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Split visible text into "Start" and " Showing up." for the color fade
  const currentChars = isDoneTyping ? fullText : fullText.slice(0, numChars);
  let startPart = "";
  let restPart = "";
  if (currentChars.length <= 5) {
    startPart = currentChars;
  } else {
    startPart = currentChars.slice(0, 5);
    restPart = currentChars.slice(5);
  }

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1080,
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Header "PiNNED" fading out */}
      {headerOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            top: 330,
            fontFamily: fredokaFont.fontFamily,
            fontSize: 64,
            fontWeight: 700,
            color: COLORS.GREY_HEADER,
            opacity: headerOpacity,
            letterSpacing: "-0.03em",
          }}
        >
          {COPY.BRAND}
        </div>
      )}

      {/* "Start Showing up." at y ~ 50% */}
      <div
        style={{
          position: "absolute",
          top: 540,
          transform: "translateY(-50%)",
          opacity: exitOpacity,
          filter: exitBlur > 0.05 ? `blur(${exitBlur.toFixed(2)}px)` : "none",
          fontFamily: interTightFont.fontFamily,
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "pre",
        }}
      >
        <span style={{ color: startColor }}>
          {startPart}
        </span>
        <span style={{ color: COLORS.TEXT_NAVY }}>
          {restPart.length > 0 ? `\u00A0${restPart.trimStart()}` : ""}
        </span>

        {/* Lingering blue cursor */}
        {showCursor && (
          <span
            style={{
              display: "inline-block",
              width: isDoneTyping ? 14 : 26,
              height: 32,
              backgroundColor: COLORS.WIPE_BLOCK_BLUE,
              borderRadius: 3,
              marginLeft: 4,
              boxShadow: `0 0 12px ${COLORS.WIPE_BLOCK_BLUE}66`,
              flexShrink: 0,
            }}
          />
        )}
      </div>
    </div>
  );
};
