import React from "react";
import {
  Easing,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Trail } from "@remotion/motion-blur";
import { COLORS, fredokaFont } from "../constants";

export interface WordmarkPinnedProps {
  /** If true, stays at header position (shrinked) */
  isHeader?: boolean;
  headerFadeOutFrame?: number; // e.g. f72-f80 in scene 3
}

export const WordmarkPinned: React.FC<WordmarkPinnedProps> = ({
  headerFadeOutFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 12 Navy & Blue capsules/dots flying inward between f8 and f30
  const particles = Array.from({ length: 12 }).map((_, i) => {
    const seed = `p-${i}`;
    const startF = 8 + Math.floor(random(`${seed}-start`) * 8);
    const endF = startF + 12 + Math.floor(random(`${seed}-dur`) * 8);
    
    // Starting outside or near edges
    const angle = random(`${seed}-angle`) * Math.PI * 2;
    const startDist = 480 + random(`${seed}-dist`) * 200;
    const startX = 540 + Math.cos(angle) * startDist;
    const startY = 540 + Math.sin(angle) * startDist;

    // Drifting toward center
    const targetX = 540 + (random(`${seed}-tx`) - 0.5) * 160;
    const targetY = 540 + (random(`${seed}-ty`) - 0.5) * 120;

    const width = 12 + random(`${seed}-len`) * 14; // 12 - 26px
    const height = 6 + random(`${seed}-h`) * 4;   // 6 - 10px
    const isBlue = random(`${seed}-blue`) > 0.75;
    const color = isBlue ? COLORS.PRIMARY_BLUE : COLORS.LOGO_NAVY;

    return { id: i, startF, endF, startX, startY, targetX, targetY, width, height, color };
  });

  // Letter timing definitions (f22 - f42)
  const letterTimings = [
    { char: "P", start: 22, colorHold: COLORS.LOGO_NAVY },
    { char: "i", start: 27, colorHold: COLORS.LOGO_NAVY, isI: true },
    { char: "N", start: 30, colorHold: COLORS.LOGO_NAVY },
    { char: "N", start: 33, colorHold: COLORS.LOGO_NAVY },
    { char: "E", start: 36, colorHold: "#1B3A8A", finalDarkenFrame: 43 },
    { char: "D", start: 39, colorHold: COLORS.PRIMARY_BLUE, finalDarkenFrame: 45 },
  ];

  // Transition from full wordmark to small top header: f46 - f55
  const shrinkScale = interpolate(frame, [46, 55], [1, 0.40], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(frame, [46, 55], [0, -210], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const transitionBlur = interpolate(frame, [46, 50, 55], [0, 8, 0], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerOpacity = interpolate(frame, [46, 55], [1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out header in scene 3 if specified
  let fadeOut = 1;
  if (headerFadeOutFrame && frame >= headerFadeOutFrame) {
    fadeOut = interpolate(frame, [headerFadeOutFrame, headerFadeOutFrame + 10], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  const overallOpacity = headerOpacity * fadeOut;

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
      }}
    >
      {/* 1. Fast flying capsules/confetti particles (f8 - f30) with Trail motion blur */}
      {frame >= 8 && frame <= 32 && (
        <Trail layers={3} lagInFrames={0.4} trailOpacity={0.5}>
          <div style={{ position: "absolute", width: 1080, height: 1080 }}>
            {particles.map((p) => {
              if (frame < p.startF || frame > p.endF) return null;

              const prog = interpolate(frame, [p.startF, p.endF], [0, 1], {
                easing: Easing.bezier(0.22, 1, 0.36, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              const curX = interpolate(prog, [0, 1], [p.startX, p.targetX]);
              const curY = interpolate(prog, [0, 1], [p.startY, p.targetY]);
              const pOpacity = interpolate(prog, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

              return (
                <div
                  key={p.id}
                  style={{
                    position: "absolute",
                    left: curX,
                    top: curY,
                    width: p.width,
                    height: p.height,
                    borderRadius: 99,
                    backgroundColor: p.color,
                    opacity: pOpacity,
                    transform: `scaleX(2.2)`,
                    filter: "blur(1.5px)",
                  }}
                />
              );
            })}
          </div>
        </Trail>
      )}

      {/* 2. Blobby Wordmark "PiNNED" */}
      {frame >= 20 && overallOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            fontFamily: fredokaFont.fontFamily,
            fontSize: 160,
            fontWeight: 700,
            transform: `translateY(${translateY}px) scale(${shrinkScale})`,
            filter: transitionBlur > 0.1 ? `blur(${transitionBlur}px)` : "none",
            opacity: overallOpacity,
            letterSpacing: "-0.04em",
          }}
        >
          {letterTimings.map((item, idx) => {
            const hasStarted = frame >= item.start;
            if (!hasStarted) {
              return (
                <span
                  key={idx}
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    width: item.char === "i" ? 40 : 100,
                  }}
                >
                  {item.char}
                </span>
              );
            }

            // Spring / Bezier pop-in for the letter
            const letterFrame = frame - item.start;
            const popSpring = spring({
              frame: letterFrame,
              fps,
              config: { damping: 12, stiffness: 200 },
            });

            // Blob sharpens from blue to navy
            const blurAmount = interpolate(letterFrame, [0, 6], [16, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            // Color transition
            let letterColor: string = COLORS.PRIMARY_BLUE;
            if (item.finalDarkenFrame) {
              if (frame < item.finalDarkenFrame) {
                letterColor = item.colorHold;
              } else {
                const darkProg = interpolate(
                  frame,
                  [item.finalDarkenFrame, item.finalDarkenFrame + 5],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                letterColor = darkProg > 0.5 ? COLORS.LOGO_NAVY : item.colorHold;
              }
            } else {
              const darkProg = interpolate(letterFrame, [0, 6], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              letterColor = darkProg > 0.8 ? COLORS.LOGO_NAVY : COLORS.PRIMARY_BLUE;
            }

            // At shrink phase (f46+), turns grey #6B7390
            if (frame >= 46) {
              const greyProg = interpolate(frame, [46, 54], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              if (greyProg > 0.5) {
                letterColor = COLORS.GREY_HEADER;
              }
            }

            // Scale and Y overshoot
            const scale = 0.85 + 0.15 * popSpring;
            const yOffset = (1 - Math.min(1, popSpring)) * 14;

            // Special handling for "i": round blob dot!
            if (item.isI) {
              return (
                <span
                  key={idx}
                  style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    width: 48,
                    color: letterColor,
                    filter: blurAmount > 0.1 ? `blur(${blurAmount}px)` : "none",
                    transform: `translateY(${yOffset}px) scale(${scale})`,
                  }}
                >
                  {/* Round blob dot */}
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: letterColor,
                      marginBottom: 8,
                      display: "block",
                      transform: `scale(${0.7 + 0.3 * popSpring})`,
                    }}
                  />
                  {/* Stem of i */}
                  <span
                    style={{
                      width: 28,
                      height: 90,
                      borderRadius: 14,
                      backgroundColor: letterColor,
                      display: "block",
                    }}
                  />
                </span>
              );
            }

            return (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  color: letterColor,
                  filter: blurAmount > 0.1 ? `blur(${blurAmount}px)` : "none",
                  transform: `translateY(${yOffset}px) scale(${scale})`,
                  WebkitTextStroke: "2px currentColor",
                }}
              >
                {item.char}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
