import React from "react";
import {
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, COPY, interTightFont } from "../constants";
import { TextReveal } from "../components/TextReveal";

export const Scene3SaatnyaTumbuh: React.FC = () => {
  const frame = useCurrentFrame();
  const { width: canvasW, height: canvasH } = useVideoConfig();

  const isPortrait = canvasH > canvasW * 1.2;
  const fontSize = isPortrait ? 68 : 88;

  // Scene 3 runs for 65 frames (f130 to f195).
  // Reveal text with orange block: 0 to 14 frames, hold until relFrame 44
  // Subtitle enters at relFrame 18 to 28
  const subProgress = interpolate(frame, [18, 28], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 0.85]);
  const subY = interpolate(subProgress, [0, 1], [14, 0]);

  // At relFrame 44+: "Saatnya" goes light grey
  const isSaatnyaGrey = frame >= 44;
  const saatnyaColorProg = interpolate(frame, [44, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const saatnyaColor = saatnyaColorProg > 0.5 ? COLORS.SECONDARY_TEXT : COLORS.INK;

  // Everything blur-outs at relFrame 54 to 63
  const exitProgress = interpolate(frame, [54, 63], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitBlur = interpolate(exitProgress, [0, 1], [0, 14]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.96]);

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
        opacity: exitOpacity,
        filter: exitBlur > 0.05 ? `blur(${exitBlur.toFixed(2)}px)` : "none",
        transform: `scale(${exitScale})`,
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: isPortrait ? "88%" : "82%",
        }}
      >
        {frame < 44 ? (
          <TextReveal
            text={COPY.SCENE3_HEADLINE}
            startFrame={0}
            durationFrames={14}
            cursorHoldFrames={26}
            fontSize={fontSize}
            fontWeight={700}
            fontFamily={interTightFont.fontFamily}
            color={COLORS.INK}
            blockColor={COLORS.PRIMARY_ORANGE}
            blockHeight={30}
          />
        ) : (
          <div
            style={{
              fontFamily: interTightFont.fontFamily,
              fontWeight: 700,
              fontSize,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              display: "inline-flex",
              gap: 16,
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "nowrap",
            }}
          >
            <span style={{ color: saatnyaColor, transition: "none" }}>
              Saatnya
            </span>
            <span style={{ color: COLORS.INK }}>
              tumbuh bareng.
            </span>
          </div>
        )}

        {/* Subtitle */}
        {frame >= 18 && (
          <div
            style={{
              fontFamily: interTightFont.fontFamily,
              fontWeight: 500,
              fontSize: isPortrait ? 22 : 28,
              color: COLORS.SECONDARY_TEXT,
              marginTop: 18,
              opacity: subOpacity,
              transform: `translateY(${subY}px)`,
              letterSpacing: "-0.01em",
            }}
          >
            {COPY.SCENE3_SUB}
          </div>
        )}
      </div>
    </div>
  );
};
