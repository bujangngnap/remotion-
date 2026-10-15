import React from "react";
import {
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
} from "remotion";
import { COLORS, COPY, fredokaFont, interTightFont } from "../constants";
import { TextReveal } from "./TextReveal";

export interface BottomSheetProps {
  /** Relative frame within Scene 6 (0 = f175, duration = 36 frames) */
  relativeFrame: number;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ relativeFrame }) => {
  const { fps } = useVideoConfig();
  const frame = relativeFrame;

  // Scene 6 starts at 5.85s (relFrame 0).
  // 5.875s (relFrame 1): blurry blue rounded rect (#4C8DF5, ~500x170px) pops up at bottom
  // transforms into white sheet (#FDFDFE, radius 50px, soft shadow) at ~6.0s (relFrame 5)
  const popSpring = spring({
    frame: Math.max(0, frame - 1),
    fps,
    config: { damping: 13, stiffness: 180 },
  });

  // Morph from initial blue rect to full white sheet
  const morphProgress = interpolate(frame, [1, 5], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const sheetWidth = interpolate(morphProgress, [0, 1], [500, 740]);
  const sheetHeight = interpolate(morphProgress, [0, 1], [170, 310]);
  const sheetBg = morphProgress > 0.6 ? COLORS.SHEET_BG : COLORS.SHEET_INITIAL_BLUE;
  const sheetInitialBlur = interpolate(frame, [1, 5], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit at 6.55 - 7.00s (relFrame 21.5 - 35):
  // collapses to pill, blurs, and washes to white
  const isExit = frame >= 22;
  const exitProgress = interpolate(frame, [22, 34], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitBlur = interpolate(exitProgress, [0, 1], [0, 18]);
  const exitOpacity = interpolate(exitProgress, [0, 0.9], [1, 0]);
  const exitHeight = interpolate(exitProgress, [0, 1], [sheetHeight, 90]);
  const currentHeight = isExit ? exitHeight : sheetHeight;
  const currentBlur = Math.max(sheetInitialBlur, exitBlur);

  // Text wipe out during exit:
  // "Drinks" wipes first at 22, "in the West Village" lingers until 26
  let titleOpacity = 1;
  let titleText: string = COPY.SHEET_TITLE;
  if (frame >= 22 && frame < 26) {
    titleText = "in the West Village";
  } else if (frame >= 26) {
    titleOpacity = 0;
  }

  // 8:30pm enters at 6.35s (relFrame 15.5)
  const timeSpring = spring({
    frame: Math.max(0, frame - 15.5),
    fps,
    config: { damping: 12, stiffness: 220 },
  });

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1080,
        left: 0,
        top: 0,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: exitOpacity,
        filter: currentBlur > 0.05 ? `blur(${currentBlur.toFixed(2)}px)` : "none",
      }}
    >
      {/* Background Zoomed Map Card with #B7D1FA bezel */}
      <div
        style={{
          width: 832,
          height: 950,
          borderRadius: 80,
          overflow: "hidden",
          position: "relative",
          backgroundColor: COLORS.MAP_BASE,
          border: `14px solid ${COLORS.LIGHT_BLUE}`,
          boxSizing: "border-box",
          boxShadow: "0 28px 70px rgba(11, 18, 48, 0.18)",
        }}
      >
        {/* Zoomed & panned map preview */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            filter: "blur(7px) saturate(0.65)",
            transform: "scale(1.3) translateY(-140px)",
            transformOrigin: "center center",
            opacity: 0.85,
          }}
        >
          {/* Zoomed base graphic */}
          <svg viewBox="0 0 832 950" width="832" height="950">
            <rect width="832" height="950" fill={COLORS.MAP_BASE} />
            <path d="M 0 0 Q 80 280, 50 560 T 90 950 L 0 950 Z" fill={COLORS.MAP_WATER} />
            <g transform="rotate(29, 416, 475)">
              {Array.from({ length: 22 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="-300"
                  y1={-200 + i * 55}
                  x2="1200"
                  y2={-200 + i * 55}
                  stroke="#FFFFFF"
                  strokeWidth={6}
                />
              ))}
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={-300 + i * 44}
                  y1="-300"
                  x2={-300 + i * 44}
                  y2="1300"
                  stroke="#FFFFFF"
                  strokeWidth={5}
                />
              ))}
              <rect x="260" y="180" width="210" height="360" rx="24" fill={COLORS.MAP_PARK} />
            </g>
          </svg>
        </div>

        {/* Coffee pin sits near top-center */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 140,
            transform: "translate(-50%, -50%)",
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: COLORS.CIRCLE_COFFEE,
            border: "3px solid rgba(255, 255, 255, 0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(11, 18, 48, 0.25)",
            filter: "saturate(0.8)",
          }}
        >
          <Img
            src={staticFile("promo/emojis/coffee.svg")}
            style={{ width: 42, height: 42, objectFit: "contain" }}
          />
        </div>

        {/* White Bottom Sheet */}
        <div
          style={{
            position: "absolute",
            bottom: 45,
            left: "50%",
            transform: `translateX(-50%) scale(${0.88 + 0.12 * popSpring})`,
            transformOrigin: "center bottom",
            width: sheetWidth,
            height: currentHeight,
            borderRadius: 50,
            backgroundColor: sheetBg,
            boxShadow:
              "0 24px 60px rgba(11, 18, 48, 0.16), 0 4px 16px rgba(11, 18, 48, 0.06)",
            boxSizing: "border-box",
            padding: "30px 38px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            transition: "background-color 0.1s ease",
          }}
        >
          {morphProgress > 0.6 && (
            <>
              {/* Row 1: "Now" badge + "Drinks in the West Village" */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  opacity: titleOpacity,
                  flexWrap: "nowrap",
                }}
              >
                {/* Red "Now" bubble badge */}
                <span
                  style={{
                    fontFamily: fredokaFont.fontFamily,
                    fontSize: 38,
                    fontWeight: 700,
                    color: COLORS.SHEET_RED_BADGE,
                    WebkitTextStroke: "1.2px #FFFFFF",
                    textShadow: "0 1px 4px rgba(208, 31, 47, 0.3)",
                    letterSpacing: "-0.01em",
                    flexShrink: 0,
                  }}
                >
                  {COPY.SHEET_BADGE}
                </span>

                {/* "Drinks in the West Village" revealed with blue cursor 6.00-6.30s (relFrame 5 - 14) */}
                <TextReveal
                  text={titleText}
                  startFrame={5}
                  durationFrames={9}
                  fontSize={44}
                  fontWeight={600}
                  fontFamily={interTightFont.fontFamily}
                  color="#111827"
                  letterSpacing="-0.02em"
                  blockHeight={26}
                  blockColor={COLORS.WIPE_BLOCK_BLUE}
                  cursorHoldFrames={12}
                />
              </div>

              {/* Row 2: 3 Avatars + "30 going" + "8:30pm" */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  {/* 3 Overlapping illustrated sticker avatars */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {[1, 2, 3].map((num, i) => (
                      <div
                        key={num}
                        style={{
                          width: 74,
                          height: 74,
                          borderRadius: "50%",
                          marginLeft: i === 0 ? 0 : -20,
                          zIndex: i + 1,
                          boxShadow: "0 6px 16px rgba(11, 18, 48, 0.16)",
                          position: "relative",
                          overflow: "hidden",
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        <Img
                          src={staticFile(`promo/avatars/avatar${num}.svg`)}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* "30 going" revealed by blue block wipe at ~6.2s (relFrame 11) */}
                  <TextReveal
                    text={COPY.SHEET_ATTENDEES}
                    startFrame={11}
                    durationFrames={7}
                    fontSize={44}
                    fontWeight={500}
                    fontFamily={interTightFont.fontFamily}
                    color={COLORS.SHEET_ATTENDEE}
                    letterSpacing="-0.02em"
                    blockHeight={24}
                    blockColor={COLORS.WIPE_BLOCK_BLUE}
                    cursorHoldFrames={10}
                  />
                </div>

                {/* "8:30pm" pops in at 6.35s (relFrame 15.5) */}
                {frame >= 15.5 && (
                  <div
                    style={{
                      transform: `scale(${timeSpring.toFixed(3)})`,
                      transformOrigin: "right center",
                      backgroundColor: "#EEF2FA",
                      padding: "8px 18px",
                      borderRadius: 20,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: interTightFont.fontFamily,
                        fontSize: 34,
                        fontWeight: 600,
                        color: COLORS.TEXT_NAVY,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {COPY.SHEET_TIME}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
