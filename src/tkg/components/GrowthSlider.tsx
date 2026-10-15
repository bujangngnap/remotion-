import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Trail } from "@remotion/motion-blur";
import { COLORS, COPY, fredokaFont } from "../constants";

export interface GrowthSliderProps {
  /** Relative frame within scene */
  relativeFrame: number;
  /** Total duration of scene */
  durationFrames?: number;
}

export const GrowthSlider: React.FC<GrowthSliderProps> = ({
  relativeFrame,
  durationFrames = 100,
}) => {
  const { fps, width: canvasW, height: canvasH } = useVideoConfig();
  const frame = relativeFrame;

  // 1. Bar enters from left edge fast:
  // ends at x ~ 44% (around 475px on 1080w) by relFrame 8
  const barProgress = interpolate(frame, [0, 8], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const targetBarEnd = canvasW * 0.44; // ~475px
  const currentBarWidth = interpolate(barProgress, [0, 1], [0, targetBarEnd]);

  // Motion blur / streak during fast entrance
  const barBlur = interpolate(frame, [0, 2, 8], [0, 6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Pale rounded knob (pill ~60x40px, #FFF1E6, soft shadow)
  // lands with spring overshoot at relFrame 8
  const knobSpring = spring({
    frame: Math.max(0, frame - 3),
    fps,
    config: { damping: 11, stiffness: 200 },
  });
  const knobScale = 0.85 + 0.15 * knobSpring;

  // Subtle float during hold
  const holdEnd = Math.max(20, durationFrames - 16);
  const isFloating = frame >= 12 && frame <= holdEnd;
  const floatOffset = isFloating ? Math.sin((frame - 12) * 0.22) * 2.5 : 0;

  // 3. Sprout grows out of top of knob at relFrame 14
  // Spring scale 0 -> 1 with rotation wobble
  const sproutSpring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 10, stiffness: 220 },
  });

  const sproutWobble = interpolate(
    sproutSpring,
    [0, 0.6, 0.85, 1],
    [0, 12, -6, 0]
  );
  const sproutScale = Math.min(1.2, Math.max(0, sproutSpring));

  // 4. Label "Waktunya Tumbuh!" above, centered at x~50%, y~40%
  // enters at relFrame 6 with rotation -10deg -> 0 and spring overshoot (wiggle)
  const labelSpring = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 10, stiffness: 200 },
  });
  const labelRotation = interpolate(labelSpring, [0, 1], [-10, 0]);
  const labelScale = 0.8 + 0.2 * labelSpring;
  const labelOpacity = interpolate(frame, [5, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 5. Three tiny orange dots (4-5px, varying opacity) twinkle under the bar
  const dot1Twinkle = 0.4 + 0.6 * Math.sin(frame * 0.25);
  const dot2Twinkle = 0.5 + 0.5 * Math.sin(frame * 0.35 + 1.2);
  const dot3Twinkle = 0.3 + 0.7 * Math.sin(frame * 0.28 + 2.4);

  // 6. Exit at end of scene: blur-out and fade into dark end card
  const exitStart = Math.max(20, durationFrames - 16);
  const exitEnd = durationFrames - 2;

  const exitBlur = interpolate(frame, [exitStart, exitEnd], [0, 18], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barY = canvasH * 0.52 + floatOffset;
  const labelY = canvasH * 0.40 + floatOffset * 0.5;
  const knobX = currentBarWidth - 30;
  const knobY = barY - 20;

  return (
    <div
      style={{
        position: "absolute",
        width: canvasW,
        height: canvasH,
        left: 0,
        top: 0,
        pointerEvents: "none",
        opacity: exitOpacity,
        filter: exitBlur > 0.05 ? `blur(${exitBlur.toFixed(2)}px)` : "none",
      }}
    >
      {/* 1. Sticker Label "Waktunya Tumbuh" centered above */}
      <div
        style={{
          position: "absolute",
          left: canvasW * 0.5,
          top: labelY,
          transform: `translate(-50%, -50%) rotate(${labelRotation}deg) scale(${labelScale})`,
          opacity: labelOpacity,
          zIndex: 30,
        }}
      >
        <span
          style={{
            fontFamily: fredokaFont.fontFamily,
            fontSize: 54,
            fontWeight: 700,
            color: COLORS.PRIMARY_ORANGE,
            letterSpacing: "-0.01em",
            display: "inline-block",
            whiteSpace: "nowrap",
            // Sticker look: thick white stroke + faint orange shadow
            paintOrder: "stroke fill",
            WebkitTextStroke: "7px #FFFFFF",
            filter: "drop-shadow(0 6px 16px rgba(249, 115, 22, 0.28))",
          }}
        >
          {COPY.SLIDER_LABEL}
        </span>
      </div>

      {/* 2. Horizontal Progress Bar entering from left edge */}
      <Trail layers={frame < 6 ? 3 : 1} lagInFrames={0.3} trailOpacity={0.4}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: barY - 6,
            width: currentBarWidth,
            height: 12,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            background: `linear-gradient(90deg, ${COLORS.LIGHT_ORANGE} 0%, ${COLORS.PRIMARY_ORANGE} 100%)`,
            boxShadow: `0 0 14px ${COLORS.PRIMARY_ORANGE}66`,
            filter: barBlur > 0.5 ? `blur(${barBlur.toFixed(1)}px)` : "none",
          }}
        />
      </Trail>

      {/* 3. Three tiny orange dots twinkling under the bar */}
      {frame >= 5 && (
        <>
          <div
            style={{
              position: "absolute",
              left: canvasW * 0.12,
              top: barY + 18,
              width: 5,
              height: 5,
              borderRadius: "50%",
              backgroundColor: COLORS.PRIMARY_ORANGE,
              opacity: dot1Twinkle,
              boxShadow: `0 0 6px ${COLORS.PRIMARY_ORANGE}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: canvasW * 0.26,
              top: barY + 16,
              width: 4,
              height: 4,
              borderRadius: "50%",
              backgroundColor: COLORS.PRIMARY_ORANGE,
              opacity: dot2Twinkle,
              boxShadow: `0 0 6px ${COLORS.PRIMARY_ORANGE}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: canvasW * 0.38,
              top: barY + 20,
              width: 5,
              height: 5,
              borderRadius: "50%",
              backgroundColor: COLORS.PRIMARY_ORANGE,
              opacity: dot3Twinkle,
              boxShadow: `0 0 6px ${COLORS.PRIMARY_ORANGE}`,
            }}
          />
        </>
      )}

      {/* 4. Pale rounded knob (pill ~60x40px, #FFF1E6) */}
      {frame >= 2 && (
        <div
          style={{
            position: "absolute",
            left: knobX,
            top: knobY,
            width: 60,
            height: 40,
            borderRadius: 20,
            backgroundColor: COLORS.KNOB_BG,
            boxShadow: "0 6px 18px rgba(249, 115, 22, 0.22), inset 0 1px 3px rgba(255, 255, 255, 0.8)",
            border: "2px solid #FFFFFF",
            transform: `scale(${knobScale})`,
            zIndex: 25,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Inner orange indicator pill dot */}
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: COLORS.PRIMARY_ORANGE,
              boxShadow: `0 0 8px ${COLORS.PRIMARY_ORANGE}aa`,
            }}
          />

          {/* 5. Small Green Sprout growing out of knob at 9.85s (relFrame 10.5) */}
          {frame >= 10 && (
            <div
              style={{
                position: "absolute",
                bottom: 34,
                left: 15,
                width: 30,
                height: 34,
                transform: `scale(${sproutScale}) rotate(${sproutWobble}deg)`,
                transformOrigin: "bottom center",
                zIndex: 35,
              }}
            >
              <svg viewBox="0 0 32 36" width="30" height="34">
                {/* Sprout stem */}
                <path
                  d="M16 34 C16 26 15 20 16 12"
                  stroke={COLORS.SPROUT_GREEN}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Left leaf */}
                <path
                  d="M16 20 C10 18 4 12 5 6 C12 6 15 14 16 19 Z"
                  fill={COLORS.SPROUT_GREEN}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                {/* Right leaf */}
                <path
                  d="M16 16 C22 14 28 8 27 2 C20 2 17 10 16 15 Z"
                  fill="#4ADE80"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
