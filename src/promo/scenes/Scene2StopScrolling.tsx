import React from "react";
import {
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { COLORS, COPY, fredokaFont, interTightFont } from "../constants";
import { TextReveal } from "../components/TextReveal";

export const Scene2StopScrolling: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 15 (f51 - 66)

  // Header "PiNNED" at y ~ 30% (stays from scene 1)
  const headerOpacity = 0.6;

  // Text container enter blur-pop: relFrame 0 to 4
  const enterBlur = interpolate(frame, [0, 4], [14, 0], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enterScale = interpolate(frame, [0, 4], [0.92, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const enterOpacity = interpolate(frame, [0, 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sharp hold at ~2.0s (relFrame 9)
  // Exit blur-out at 2.10 - 2.20s (relFrame 12 - 15)
  const exitBlur = interpolate(frame, [12, 15], [0, 14], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [12, 15], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalBlur = Math.max(enterBlur, exitBlur);
  const finalOpacity = enterOpacity * exitOpacity;

  // Blue block appears bottom-left of the text at 2.10-2.20s (relFrame 12-15)
  // as the next reveal begins
  const showNextBlock = frame >= 12;
  const nextBlockOpacity = interpolate(frame, [12, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      {/* Small grey header "PiNNED" at y ~ 30% */}
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

      {/* "Stop Scrolling." at y ~ 50% */}
      <div
        style={{
          position: "absolute",
          top: 540,
          transform: `translateY(-50%) scale(${enterScale})`,
          opacity: finalOpacity,
          filter: finalBlur > 0.05 ? `blur(${finalBlur.toFixed(2)}px)` : "none",
          textAlign: "center",
        }}
      >
        <TextReveal
          text={COPY.SCENE2_HEADLINE}
          initialText="Stop Scroll"
          startFrame={0}
          durationFrames={5}
          fontSize={88}
          fontWeight={700}
          fontFamily={interTightFont.fontFamily}
          color={COLORS.TEXT_NAVY}
          letterSpacing="-0.03em"
          blockColor={COLORS.WIPE_BLOCK_BLUE}
          blockHeight={32}
          cursorHoldFrames={6}
        />
      </div>

      {/* Blue block bottom-left preparing for Scene 3 */}
      {showNextBlock && (
        <div
          style={{
            position: "absolute",
            left: 200,
            top: 560,
            width: 28,
            height: 32,
            backgroundColor: COLORS.WIPE_BLOCK_BLUE,
            borderRadius: 3,
            opacity: nextBlockOpacity,
            boxShadow: `0 0 14px ${COLORS.WIPE_BLOCK_BLUE}88`,
          }}
        />
      )}
    </div>
  );
};
