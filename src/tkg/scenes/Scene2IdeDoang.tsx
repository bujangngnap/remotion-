import React from "react";
import {
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, COPY, interTightFont } from "../constants";

export const Scene2IdeDoang: React.FC = () => {
  const frame = useCurrentFrame();
  const { width: canvasW, height: canvasH } = useVideoConfig();

  const isPortrait = canvasH > canvasW * 1.2;
  const fontSize = isPortrait ? 68 : 88;

  // Scene 2 is f60 - f135 (75 frames total).
  // Appears at relFrame 4 to 12:
  // blur: 14 -> 0, opacity: 0 -> 1, scale: 0.92 -> 1, translateY: 20 -> 0
  const enterProgress = interpolate(frame, [4, 12], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const enterBlur = interpolate(enterProgress, [0, 1], [14, 0]);
  const enterOpacity = interpolate(enterProgress, [0, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enterScale = interpolate(enterProgress, [0, 1], [0.92, 1]);
  const enterY = interpolate(enterProgress, [0, 1], [20, 0]);

  // Subtitle enters at relFrame 18 to 28
  const subProgress = interpolate(frame, [18, 28], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 0.85]);
  const subY = interpolate(subProgress, [0, 1], [14, 0]);

  // Hold: relFrame 12 to 56
  // Exit: relFrame 58 to 68 (blur: 0 -> 14, opacity: 1 -> 0, scale: 1 -> 0.96)
  const exitProgress = interpolate(frame, [58, 68], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitBlur = interpolate(exitProgress, [0, 1], [0, 14]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.96]);

  const currentOpacity = enterOpacity * exitOpacity;
  const currentBlur = Math.max(enterBlur, exitBlur);
  const currentScale = enterScale * exitScale;

  // At relFrame 54+: orange block appears bottom-left, ready for next reveal
  const showNextBlock = frame >= 54;
  const blockOpacity = interpolate(frame, [54, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        width: canvasW,
        height: canvasH,
        left: 0,
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      {/* Centered text container at y~50% */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: isPortrait ? "88%" : "82%",
        }}
      >
        <div
          style={{
            fontFamily: interTightFont.fontFamily,
            fontWeight: 700,
            fontSize,
            color: COLORS.INK,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            opacity: currentOpacity,
            filter: currentBlur > 0.05 ? `blur(${currentBlur.toFixed(2)}px)` : "none",
            transform: `translateY(${enterY}px) scale(${currentScale})`,
            transformOrigin: "center center",
          }}
        >
          {COPY.SCENE2_HEADLINE}
        </div>

        {/* Subtitle */}
        {frame >= 18 && (
          <div
            style={{
              fontFamily: interTightFont.fontFamily,
              fontWeight: 500,
              fontSize: isPortrait ? 22 : 28,
              color: COLORS.SECONDARY_TEXT,
              marginTop: 18,
              opacity: subOpacity * exitOpacity,
              transform: `translateY(${subY}px)`,
              letterSpacing: "-0.01em",
            }}
          >
            {COPY.SCENE2_SUB}
          </div>
        )}

        {/* Orange block appearing bottom-left of the text at relFrame 54+ */}
        {showNextBlock && (
          <div
            style={{
              position: "absolute",
              left: isPortrait ? 20 : 40,
              bottom: -10,
              width: 24,
              height: 28,
              borderRadius: 3,
              backgroundColor: COLORS.PRIMARY_ORANGE,
              boxShadow: `0 0 14px ${COLORS.PRIMARY_ORANGE}88`,
              opacity: blockOpacity,
            }}
          />
        )}
      </div>
    </div>
  );
};
