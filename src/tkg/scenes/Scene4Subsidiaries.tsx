import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  COLORS,
  COPY,
  interTightFont,
  SUBSIDIARIES,
} from "../constants";
import { CircleBadge } from "../components/CircleBadge";
import { TextReveal } from "../components/TextReveal";

export const Scene4Subsidiaries: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width: canvasW, height: canvasH } = useVideoConfig();

  const isPortrait = canvasH > canvasW * 1.2;
  const circleSize = isPortrait ? 118 : 135;
  const overlap = circleSize * 0.25; // ~25% overlap
  const stepX = circleSize - overlap; // ~101px

  // Scene 4 starts at f123 (64 frames, 0 to 63)
  // Glow pulses in at relFrame 0-5
  const glowOpacity = interpolate(frame, [0, 6, 28, 55], [0, 0.7, 0.4, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Circle timings:
  // Circle 1: relFrame 0 (f123)
  // Circle 2: relFrame 3 (f126)
  // Circle 3: relFrame 6 (f129)
  // Circle 4: relFrame 13.5 (4.55s / f136.5) with spring overshoot
  // Circle 5: relFrame 24 (4.90s / f147) with spring overshoot
  const circleTimings = [0, 3, 6, 13.5, 24];

  // Smooth re-centering offset:
  // Initial center with 3 circles: center is at index 1 (offset = stepX)
  // When 4th circle enters (relFrame 13.5-18): center shifts to index 1.5 (offset = 1.5 * stepX)
  // When 5th circle enters (relFrame 24-28): center shifts to index 2 (offset = 2 * stepX)
  const centerShift1 = interpolate(frame, [13.5, 18], [0, 0.5 * stepX], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const centerShift2 = interpolate(frame, [24, 28.5], [0, 0.5 * stepX], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentCenterShift = stepX + centerShift1 + centerShift2;

  // Caption above at y~28%, 62px, 2 lines
  // Line 1: "Satu grup." appears at 4.60s (relFrame 15)
  // "Semua urusan" types in at 4.75s (relFrame 19.5)
  // "bisnis lu." on line 2 goes from grey to ink at 4.90 - 5.15s (relFrame 24 - 31.5)
  const line1Spring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 12, stiffness: 180 },
  });
  const line1Opacity = interpolate(frame, [15, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line1Y = interpolate(line1Spring, [0, 1], [16, 0]);

  // Line 2 "bisnis lu." color transition from grey #6B7280 to ink #0D0D0D (relFrame 24-31.5)
  const line2ColorProg = interpolate(frame, [24, 31.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bisnisLuColor = line2ColorProg > 0.5 ? COLORS.INK : COLORS.SECONDARY_TEXT;

  // Blur-out exit at relFrame 65 to 73
  // All circles blur-out into Scene 5 showcase
  const exitProgress = interpolate(frame, [65, 73], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const generalExitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const generalExitBlur = interpolate(exitProgress, [0, 1], [0, 14]);

  const captionY = canvasH * 0.27;
  const circlesY = canvasH * 0.52;

  return (
    <div
      style={{
        position: "absolute",
        width: canvasW,
        height: canvasH,
        left: 0,
        top: 0,
        pointerEvents: "none",
      }}
    >
      {/* Soft orange glow pulsing in */}
      <div
        style={{
          position: "absolute",
          left: canvasW * 0.5,
          top: circlesY,
          transform: "translate(-50%, -50%)",
          width: 520,
          height: 220,
          borderRadius: "50%",
          backgroundColor: COLORS.LIGHT_ORANGE,
          opacity: glowOpacity,
          filter: "blur(40px)",
        }}
      />

      {/* Caption above (y~28%, ~62px, 2 lines, centered) */}
      <div
        style={{
          position: "absolute",
          left: canvasW * 0.5,
          top: captionY,
          transform: `translate(-50%, -50%) translateY(${line1Y}px)`,
          textAlign: "center",
          opacity: line1Opacity * generalExitOpacity,
          filter: generalExitBlur > 0.05 ? `blur(${generalExitBlur.toFixed(2)}px)` : "none",
          zIndex: 20,
          maxWidth: isPortrait ? "90%" : "84%",
        }}
      >
        {/* Line 1: "Satu grup. Semua urusan" */}
        {/* Line 1: "Satu grup." (appears at 4.60s / relFrame 15) */}
        <div
          style={{
            fontFamily: interTightFont.fontFamily,
            fontWeight: 700,
            fontSize: isPortrait ? 52 : 62,
            color: COLORS.INK,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            whiteSpace: "nowrap",
          }}
        >
          {COPY.SCENE4_LINE1}
        </div>

        {/* Line 2: "Semua urusan bisnis lu." */}
        <div
          style={{
            fontFamily: interTightFont.fontFamily,
            fontWeight: 700,
            fontSize: isPortrait ? 52 : 62,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginTop: 4,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            whiteSpace: "nowrap",
          }}
        >
          <TextReveal
            text={COPY.SCENE4_LINE2_PART1}
            startFrame={19.5}
            durationFrames={7}
            cursorHoldFrames={12}
            fontSize={isPortrait ? 52 : 62}
            fontWeight={700}
            fontFamily={interTightFont.fontFamily}
            color={COLORS.INK}
            blockColor={COLORS.PRIMARY_ORANGE}
            blockHeight={26}
          />
          <span
            style={{
              color: bisnisLuColor,
              transition: "none",
            }}
          >
            {COPY.SCENE4_LINE2_PART2}
          </span>
        </div>
      </div>

      {/* 5 Overlapping Circle Badges at y~52% */}
      <div
        style={{
          position: "absolute",
          left: canvasW * 0.5,
          top: circlesY,
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          zIndex: 15,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 0,
            height: circleSize,
          }}
        >
          {SUBSIDIARIES.map((sub, idx) => {
            const startF = circleTimings[idx];
            if (frame < startF) return null;

            const isCenterPin = sub.id === "digital"; // Circle 3 stays!
            const isOvershoot = idx >= 3;

            // Spring or Bezier entrance
            let enterScale = 1;
            let enterY = 0;
            let enterBlur = 0;
            let enterOpacity = 1;

            if (isOvershoot) {
              const sp = spring({
                frame: frame - startF,
                fps,
                config: { damping: 11, stiffness: 190 },
              });
              enterScale = 0.85 + 0.15 * sp;
              enterY = (1 - Math.min(1, sp)) * 24;
              enterBlur = interpolate(frame - startF, [0, 5], [14, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              enterOpacity = interpolate(frame - startF, [0, 3], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
            } else {
              const prog = interpolate(frame, [startF, startF + 7], [0, 1], {
                easing: Easing.bezier(0.22, 1, 0.36, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              enterScale = interpolate(prog, [0, 1], [0.92, 1]);
              enterY = interpolate(prog, [0, 1], [20, 0]);
              enterBlur = interpolate(prog, [0, 1], [14, 0]);
              enterOpacity = interpolate(prog, [0, 0.6], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
            }

            // Individual circle X relative to smoothed center
            const itemX = idx * stepX - currentCenterShift;

            // Exit behavior: all exit cleanly into Scene 5
            const itemExitOpacity = generalExitOpacity;
            const itemExitBlur = generalExitBlur;

            const finalOpacity = enterOpacity * itemExitOpacity;
            const finalBlur = Math.max(enterBlur, itemExitBlur);

            return (
              <div
                key={sub.id}
                style={{
                  position: "absolute",
                  left: itemX,
                  top: 0,
                  transform: `translateY(${enterY}px) scale(${enterScale})`,
                  transformOrigin: "center center",
                  opacity: finalOpacity,
                  filter: finalBlur > 0.05 ? `blur(${finalBlur.toFixed(2)}px)` : "none",
                  zIndex: idx + 1,
                }}
              >
                <CircleBadge
                  id={sub.id}
                  bgColor={sub.bg}
                  size={circleSize}
                  logoPath={sub.logoPath}
                  emoji={sub.emoji}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
