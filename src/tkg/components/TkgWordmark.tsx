import React from "react";
import {
  Easing,
  Img,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Trail } from "@remotion/motion-blur";
import {
  bebasNeueFont,
  COLORS,
  interTightFont,
} from "../constants";

export interface TkgWordmarkProps {
  /** If provided, fades out at this global frame (e.g. f95-f105 in Scene 3) */
  headerFadeOutFrame?: number;
}

export const TkgWordmark: React.FC<TkgWordmarkProps> = ({
  headerFadeOutFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps, width: canvasW, height: canvasH } = useVideoConfig();

  const isPortrait = canvasH > canvasW * 1.2;

  // 10-12 small "seed" shapes (capsules and dots, 8-24px; mostly #0D0D0D, a few #F97316)
  // flying across the frame at random angles with strong horizontal motion blur between f8 and f30
  const seeds = React.useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const seedKey = `tkg-seed-${i}`;
      const startF = 8 + Math.floor(random(`${seedKey}-s`) * 7);
      const endF = startF + 12 + Math.floor(random(`${seedKey}-d`) * 8);

      const angle = random(`${seedKey}-ang`) * Math.PI * 2;
      const startDist = 520 + random(`${seedKey}-dist`) * 220;
      const startX = canvasW * 0.5 + Math.cos(angle) * startDist;
      const startY = canvasH * 0.5 + Math.sin(angle) * startDist;

      const targetX = canvasW * 0.5 + (random(`${seedKey}-tx`) - 0.5) * 220;
      const targetY = canvasH * 0.5 + (random(`${seedKey}-ty`) - 0.5) * 160;

      const width = 10 + random(`${seedKey}-w`) * 14; // 10 - 24px
      const height = 6 + random(`${seedKey}-h`) * 4;  // 6 - 10px
      const isOrange = random(`${seedKey}-col`) > 0.7;
      const color = isOrange ? COLORS.PRIMARY_ORANGE : COLORS.INK;

      return {
        id: i,
        startF,
        endF,
        startX,
        startY,
        targetX,
        targetY,
        width,
        height,
        color,
      };
    });
  }, [canvasW, canvasH]);

  // Letters of "TUMBUH KEMBANG"
  const letters = [
    { char: "T", start: 27 },
    { char: "U", start: 28 },
    { char: "M", start: 30 },
    { char: "B", start: 31 },
    { char: "U", start: 33 },
    { char: "H", start: 34 },
    { char: " ", start: 35, isSpace: true },
    { char: "K", start: 36 },
    { char: "E", start: 38 },
    { char: "M", start: 39 },
    { char: "B", start: 41 },
    { char: "A", start: 42 },
    { char: "N", start: 43, holdOrangeUntil: 47 },
    { char: "G", start: 44, holdOrangeUntil: 49 },
  ];

  // First orange blob landing at center-left f22 - f27
  const blobSpring = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const blobScale = interpolate(blobSpring, [0, 1], [0.2, 1]);
  const blobOpacity = interpolate(frame, [22, 25, 27, 29], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Transition from full wordmark to small top header: f50 - f61
  const shrinkScale = interpolate(frame, [50, 61], [1, 0.40], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const targetTranslateY = -canvasH * 0.22;
  const translateY = interpolate(frame, [50, 61], [0, targetTranslateY], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const transitionBlur = interpolate(frame, [50, 55, 61], [0, 8, 0], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headerOpacity = interpolate(frame, [50, 61], [1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Header fade-out in Scene 3 (f95-f105)
  let fadeOut = 1;
  if (headerFadeOutFrame && frame >= headerFadeOutFrame) {
    fadeOut = interpolate(frame, [headerFadeOutFrame, headerFadeOutFrame + 10], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  }

  const overallOpacity = headerOpacity * fadeOut;

  // Font size adjusted to span ~75% width (around 780-810px)
  const baseFontSize = isPortrait ? 96 : 124;

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
      }}
    >
      {/* 1. Fast flying seeds (f8 - f30) with horizontal motion blur */}
      {frame >= 8 && frame <= 32 && (
        <Trail layers={3} lagInFrames={0.4} trailOpacity={0.5}>
          <div style={{ position: "absolute", width: canvasW, height: canvasH }}>
            {seeds.map((s) => {
              if (frame < s.startF || frame > s.endF) return null;

              const prog = interpolate(frame, [s.startF, s.endF], [0, 1], {
                easing: Easing.bezier(0.22, 1, 0.36, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              const curX = interpolate(prog, [0, 1], [s.startX, s.targetX]);
              const curY = interpolate(prog, [0, 1], [s.startY, s.targetY]);
              const sOpacity = interpolate(prog, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

              return (
                <div
                  key={s.id}
                  style={{
                    position: "absolute",
                    left: curX,
                    top: curY,
                    width: s.width,
                    height: s.height,
                    borderRadius: 99,
                    backgroundColor: s.color,
                    opacity: sOpacity,
                    transform: `scaleX(2.5)`,
                    filter: "blur(2px)",
                  }}
                />
              );
            })}
          </div>
        </Trail>
      )}

      {/* 2. Orange blob landing at center-left (f22 - f28) morphing into 'T' */}
      {frame >= 22 && frame <= 29 && (
        <div
          style={{
            position: "absolute",
            left: canvasW * 0.5 - 340,
            top: canvasH * 0.5 - 28,
            width: 56,
            height: 56,
            borderRadius: "50%",
            backgroundColor: COLORS.PRIMARY_ORANGE,
            opacity: blobOpacity,
            transform: `scale(${blobScale})`,
            filter: "blur(6px)",
            boxShadow: `0 0 20px ${COLORS.PRIMARY_ORANGE}`,
          }}
        />
      )}

      {/* 3. Wordmark "TUMBUH KEMBANG" letter by letter + Official Logo */}
      {frame >= 24 && overallOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: isPortrait ? 8 : 14,
            fontFamily: bebasNeueFont.fontFamily,
            fontSize: baseFontSize,
            letterSpacing: "0.04em",
            transform: `translateY(${translateY}px) scale(${shrinkScale})`,
            filter: transitionBlur > 0.1 ? `blur(${transitionBlur}px)` : "none",
            opacity: overallOpacity,
            whiteSpace: "nowrap",
          }}
        >
          {/* Official TKG Orange Logo Icon */}
          <div
            style={{
              width: isPortrait ? 68 : 86,
              height: isPortrait ? 68 : 86,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${interpolate(
                spring({
                  frame: Math.max(0, frame - 24),
                  fps,
                  config: { damping: 12, stiffness: 200 },
                }),
                [0, 1],
                [0.3, 1]
              )})`,
              opacity: interpolate(frame, [24, 27], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              filter: `drop-shadow(0 4px 16px ${COLORS.PRIMARY_ORANGE}66)`,
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile("logo.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {letters.map((item, idx) => {
            if (item.isSpace) {
              return (
                <span
                  key={idx}
                  style={{
                    display: "inline-block",
                    width: isPortrait ? 18 : 28,
                  }}
                />
              );
            }

            const hasStarted = frame >= item.start;
            if (!hasStarted) {
              return (
                <span
                  key={idx}
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    width: 44,
                  }}
                >
                  {item.char}
                </span>
              );
            }

            const letterFrame = frame - item.start;
            const popSpring = spring({
              frame: letterFrame,
              fps,
              config: { damping: 12, stiffness: 200 },
            });

            // Each letter starts as blurred orange blob, sharpens, settles to #0D0D0D
            const blurAmount = interpolate(letterFrame, [0, 5], [14, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            let letterColor: string = COLORS.PRIMARY_ORANGE;
            if (item.holdOrangeUntil) {
              if (frame < item.holdOrangeUntil) {
                letterColor = COLORS.PRIMARY_ORANGE;
              } else {
                const darkProg = interpolate(
                  frame,
                  [item.holdOrangeUntil, item.holdOrangeUntil + 4],
                  [0, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                letterColor = darkProg > 0.5 ? COLORS.INK : COLORS.PRIMARY_ORANGE;
              }
            } else {
              const darkProg = interpolate(letterFrame, [0, 5], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              letterColor = darkProg > 0.7 ? COLORS.INK : COLORS.PRIMARY_ORANGE;
            }

            // At shrink phase (f50+), turns grey #6B7280
            if (frame >= 50) {
              const greyProg = interpolate(frame, [50, 60], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              if (greyProg > 0.4) {
                letterColor = COLORS.SECONDARY_TEXT;
              }
            }

            const scale = 0.88 + 0.12 * popSpring;
            const yOffset = (1 - Math.min(1, popSpring)) * 14;

            return (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  color: letterColor,
                  filter: blurAmount > 0.1 ? `blur(${blurAmount}px)` : "none",
                  transform: `translateY(${yOffset}px) scale(${scale})`,
                  textShadow:
                    letterColor === COLORS.PRIMARY_ORANGE
                      ? `0 0 12px ${COLORS.PRIMARY_ORANGE}66`
                      : "none",
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
