import React from "react";
import {
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
} from "remotion";
import {
  COLORS,
  COPY,
  fredokaFont,
  interFont,
  interTightFont,
} from "../constants";
import { TextReveal } from "./TextReveal";

export interface BottomSheetProps {
  /** Relative frame within Scene */
  relativeFrame: number;
  /** Total duration for the bottom sheet scene */
  durationFrames?: number;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  relativeFrame,
  durationFrames = 115,
}) => {
  const { fps, width: canvasW, height: canvasH } = useVideoConfig();
  const frame = relativeFrame;

  // Blurry orange rounded rectangle pops up at start
  // transforms into white sheet by relFrame 6.5
  const popSpring = spring({
    frame: Math.max(0, frame - 1.5),
    fps,
    config: { damping: 13, stiffness: 180 },
  });

  const morphProgress = interpolate(frame, [1.5, 6.5], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const targetWidth = Math.min(760, canvasW * 0.78);
  const targetHeight = Math.min(340, canvasH * 0.34);

  const sheetWidth = interpolate(morphProgress, [0, 1], [480, targetWidth]);
  const sheetHeight = interpolate(morphProgress, [0, 1], [160, targetHeight]);
  const sheetBg = morphProgress > 0.6 ? COLORS.SHEET_BG : COLORS.SHEET_INITIAL_ORANGE;
  const sheetInitialBlur = interpolate(frame, [1.5, 6.5], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit at end of scene (durationFrames - 18 to durationFrames - 2)
  const exitStart = Math.max(20, durationFrames - 18);
  const exitEnd = durationFrames - 2;

  const isExit = frame >= exitStart;
  const exitProgress = interpolate(frame, [exitStart, exitEnd], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitBlur = interpolate(exitProgress, [0, 1], [0, 20]);
  const exitOpacity = interpolate(exitProgress, [0, 0.9], [1, 0]);
  const exitHeight = interpolate(exitProgress, [0, 1], [sheetHeight, 80]);
  const currentHeight = isExit ? exitHeight : sheetHeight;
  const currentBlur = Math.max(sheetInitialBlur, exitBlur);

  // Text wipe out during exit
  const textExitOpacity = interpolate(frame, [exitStart, exitStart + 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Avatars entrance spring at 8.35s (relFrame 12.5)
  const avatarsSpring = spring({
    frame: Math.max(0, frame - 12.5),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // "Gratis konsultasi" appears at 8.55s (relFrame 18.5)
  const consultSpring = spring({
    frame: Math.max(0, frame - 18.5),
    fps,
    config: { damping: 12, stiffness: 220 },
  });

  const consultOpacity = interpolate(frame, [18.5, 21], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sheetY = canvasH * (canvasH > 1200 ? 0.68 : 0.64);

  return (
    <div
      style={{
        position: "absolute",
        width: canvasW,
        height: canvasH,
        left: 0,
        top: 0,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: exitOpacity,
        filter: currentBlur > 0.05 ? `blur(${currentBlur.toFixed(2)}px)` : "none",
        zIndex: 50,
      }}
    >
      {/* The Bottom Sheet Container */}
      <div
        style={{
          position: "absolute",
          top: sheetY - currentHeight * 0.5,
          width: sheetWidth,
          height: currentHeight,
          borderRadius: 50,
          backgroundColor: sheetBg,
          boxShadow: "0 24px 60px rgba(13, 13, 13, 0.18), 0 6px 18px rgba(13, 13, 13, 0.08)",
          padding: "28px 36px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          transform: `scale(${0.9 + 0.1 * popSpring})`,
          border: "2px solid rgba(255, 255, 255, 0.8)",
        }}
      >
        {/* Only show rich content once morphed into white sheet */}
        {morphProgress > 0.5 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              opacity: textExitOpacity,
              width: "100%",
            }}
          >
            {/* Top Row: Tag "Baru" + Title */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "nowrap",
              }}
            >
              {/* Tag "Baru" */}
              <div
                style={{
                  backgroundColor: "#FFF2EA",
                  border: `2px solid ${COLORS.PRIMARY_ORANGE}`,
                  borderRadius: 99,
                  padding: "4px 14px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 6px rgba(232, 89, 12, 0.15)",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: fredokaFont.fontFamily,
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.TAG_ORANGE,
                    letterSpacing: "-0.01em",
                    lineHeight: 1,
                  }}
                >
                  {COPY.SHEET_BADGE}
                </span>
              </div>

              {/* Title typed with orange cursor (8.15 - 8.50s / relFrame 6.5 - 17) */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <TextReveal
                  text={COPY.SHEET_TITLE}
                  startFrame={6.5}
                  durationFrames={10}
                  cursorHoldFrames={14}
                  fontSize={canvasW > 1080 ? 38 : 34}
                  fontWeight={600}
                  fontFamily={interTightFont.fontFamily}
                  color={COLORS.INK}
                  blockColor={COLORS.PRIMARY_ORANGE}
                  blockHeight={24}
                />
              </div>
            </div>

            {/* Bottom Row: 3 cut-out team avatars + "Tim lengkap" + "Gratis konsultasi" */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
                width: "100%",
              }}
            >
              {/* Left group: Overlapping 3 team avatars + "Tim lengkap" */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                {/* Overlapping cut-out team avatars */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    transform: `scale(${0.7 + 0.3 * avatarsSpring})`,
                    transformOrigin: "left center",
                  }}
                >
                  {["avatar1.svg", "avatar2.svg", "avatar3.svg"].map(
                    (avatar, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: "50%",
                          border: "3px solid #FFFFFF",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                          overflow: "hidden",
                          marginLeft: idx === 0 ? 0 : -22,
                          backgroundColor: "#E2E8F0",
                          zIndex: 3 - idx,
                        }}
                      >
                        <Img
                          src={staticFile(`promo/avatars/${avatar}`)}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )
                  )}
                </div>

                {/* "Tim lengkap" revealed by orange block wipe at 8.35s (relFrame 12.5) */}
                <TextReveal
                  text={COPY.SHEET_TEAM}
                  startFrame={12.5}
                  durationFrames={7}
                  cursorHoldFrames={12}
                  fontSize={32}
                  fontWeight={600}
                  fontFamily={interFont.fontFamily}
                  color={COLORS.SECONDARY_TEXT}
                  blockColor={COLORS.PRIMARY_ORANGE}
                  blockHeight={22}
                />
              </div>

              {/* Right pill: "Gratis konsultasi" at 8.55s (relFrame 18.5) */}
              <div
                style={{
                  opacity: consultOpacity,
                  transform: `scale(${0.8 + 0.2 * consultSpring})`,
                  transformOrigin: "right center",
                  backgroundColor: "#ECFDF5",
                  border: "1.5px solid #10B981",
                  borderRadius: 99,
                  padding: "6px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#10B981",
                    boxShadow: "0 0 6px #10B981",
                  }}
                />
                <span
                  style={{
                    fontFamily: interFont.fontFamily,
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#065F46",
                  }}
                >
                  {COPY.SHEET_CONSULT}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
