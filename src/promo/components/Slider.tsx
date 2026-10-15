import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Trail } from "@remotion/motion-blur";
import { COLORS, COPY, fredokaFont } from "../constants";

export interface SliderProps {
  /** Relative frame within Scene 7 (0 = f210, duration = 60 frames) */
  relativeFrame: number;
}

export const Slider: React.FC<SliderProps> = ({ relativeFrame }) => {
  const { fps } = useVideoConfig();
  const frame = relativeFrame;

  // 1. Progress Bar Enters from left edge at 7.00s (relFrame 0) fast:
  // ends at x ~ 44% (475px) around relFrame 6 (7.2s)
  const barProgress = interpolate(frame, [0, 6], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const barWidth = interpolate(barProgress, [0, 1], [0, 475]);

  // Motion blur / streak during fast entrance
  const barBlur = interpolate(frame, [0, 2, 6], [0, 6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Pale rounded knob (pill ~60x40px, #EEF2FB, soft shadow)
  // lands with slight spring overshoot at ~7.2s (relFrame 6)
  const knobSpring = spring({
    frame: Math.max(0, frame - 2),
    fps,
    config: { damping: 11, stiffness: 200 },
  });
  const knobScale = 0.85 + 0.15 * knobSpring;

  // Subtle float between 7.30 - 8.70s (relFrame 9 - 51)
  const isFloating = frame >= 9 && frame <= 51;
  const floatOffset = isFloating ? Math.sin((frame - 9) * 0.18) * 2 : 0;

  // 3. Label "Must try" above knob at y~41% (y: 442px)
  // enters at 7.12s (relFrame 3.6) with rotation -10deg -> 0 and spring overshoot (wiggle)
  const labelSpring = spring({
    frame: Math.max(0, frame - 3.6),
    fps,
    config: { damping: 10, stiffness: 220 },
  });
  const labelRotation = interpolate(labelSpring, [0, 1], [-10, 0]);
  const labelScale = 0.8 + 0.2 * labelSpring;
  const labelOpacity = interpolate(frame, [3.6, 5.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. Two tiny blue dots below bar at x~8% (86px) and x~26% (280px)
  const dot1Twinkle = 0.45 + 0.55 * Math.sin(frame * 0.25);
  const dot2Twinkle = 0.55 + 0.45 * Math.sin(frame * 0.3 + 1.2);

  // 5. Exit at 8.70 - 8.95s (relFrame 51 - 58):
  // blur-out and fade to clean white
  const exitBlur = interpolate(frame, [51, 58], [0, 16], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [51, 58], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame > 58.5) {
    return null; // clean white background
  }

  const knobX = barWidth - 30;
  const knobY = 540 - 20 + floatOffset;

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1080,
        left: 0,
        top: 0,
        pointerEvents: "none",
        opacity: exitOpacity,
        filter: exitBlur > 0.05 ? `blur(${exitBlur.toFixed(2)}px)` : "none",
      }}
    >
      {/* Horizontal Progress Bar entering from left edge */}
      <Trail layers={frame < 6 ? 3 : 1} lagInFrames={0.3} trailOpacity={0.4}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 540 - 6,
            width: barWidth,
            height: 12,
            borderRadius: 6,
            background: `linear-gradient(to right, ${COLORS.PROGRESS_CYAN}, ${COLORS.PROGRESS_BLUE})`,
            filter: barBlur > 0.1 ? `blur(${barBlur}px)` : "none",
            boxShadow: `0 0 16px ${COLORS.PROGRESS_BLUE}44`,
          }}
        />
      </Trail>

      {/* Two tiny blue dots below bar */}
      {frame >= 5 && (
        <>
          {/* Dot 1 at x ~ 8% (86px) */}
          <div
            style={{
              position: "absolute",
              left: 86,
              top: 556,
              width: 5,
              height: 5,
              borderRadius: "50%",
              backgroundColor: COLORS.LIGHT_BLUE,
              opacity: dot1Twinkle,
              transform: `scale(${0.8 + 0.4 * dot1Twinkle})`,
            }}
          />
          {/* Dot 2 at x ~ 26% (280px) */}
          <div
            style={{
              position: "absolute",
              left: 280,
              top: 556,
              width: 5,
              height: 5,
              borderRadius: "50%",
              backgroundColor: COLORS.PROGRESS_BLUE,
              opacity: dot2Twinkle,
              transform: `scale(${0.8 + 0.4 * dot2Twinkle})`,
              boxShadow: `0 0 6px ${COLORS.PROGRESS_BLUE}`,
            }}
          />
        </>
      )}

      {/* Pale Rounded Knob (pill ~60x40px, #EEF2FB) */}
      {barWidth > 40 && (
        <div
          style={{
            position: "absolute",
            left: knobX,
            top: knobY,
            width: 60,
            height: 40,
            borderRadius: 20,
            backgroundColor: COLORS.KNOB_BG,
            boxShadow: "0 8px 24px rgba(31, 99, 232, 0.24), 0 2px 6px rgba(31, 99, 232, 0.12)",
            transform: `scale(${knobScale.toFixed(3)})`,
            transformOrigin: "center center",
            border: "2px solid rgba(255, 255, 255, 0.9)",
          }}
        />
      )}

      {/* Label "Must try" above the knob */}
      {frame >= 3.6 && (
        <div
          style={{
            position: "absolute",
            left: 540,
            top: 442 + floatOffset,
            transform: `translateX(-50%) rotate(${labelRotation.toFixed(2)}deg) scale(${labelScale.toFixed(3)})`,
            transformOrigin: "center bottom",
            opacity: labelOpacity,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: fredokaFont.fontFamily,
              fontSize: 54,
              fontWeight: 700,
              color: COLORS.PROGRESS_BLUE,
              WebkitTextStroke: "4px #FFFFFF",
              paintOrder: "stroke fill",
              letterSpacing: "-0.01em",
              filter: `drop-shadow(0 0 1.5px ${COLORS.PROGRESS_BLUE}) drop-shadow(0 6px 16px rgba(31, 99, 232, 0.28))`,
            }}
          >
            {COPY.SLIDER_LABEL}
          </span>
        </div>
      )}
    </div>
  );
};
