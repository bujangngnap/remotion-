import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, COPY, interTightFont } from "../constants";
import { EmojiCircle } from "../components/EmojiCircle";
import { TextReveal } from "../components/TextReveal";

export const Scene4SparkMoments: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 48 (f85 - 133)
  const { fps } = useVideoConfig();

  // 1. Soft orange glow pulse (relFrame 0 - 6)
  const glowOpacity = interpolate(frame, [0, 3, 10], [0, 0.45, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 2. Stack recentering offset calculation:
  // Offset for 3 circles: -101.25px
  // Offset for 4 circles: -151.875px
  // Offset for 5 circles: -202.5px
  const shift4Spring = spring({
    frame: Math.max(0, frame - 16.5),
    fps,
    config: { damping: 13, stiffness: 180 },
  });
  const shift5Spring = spring({
    frame: Math.max(0, frame - 27),
    fps,
    config: { damping: 13, stiffness: 180 },
  });
  const currentCenterX =
    -101.25 - 50.625 * Math.min(1, shift4Spring) - 50.625 * Math.min(1, shift5Spring);

  // 3. Exit at 4.30 - 4.45s (relFrame 43.5 - 48):
  // text and other circles blur-out, coffee circle stays
  const exitBlur = interpolate(frame, [43.5, 48], [0, 14], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [43.5, 48], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 4. Text above the group (y ~ 28%)
  // "Spark" appears at 3.50s (relFrame 19.5)
  const showSpark = frame >= 19.5;
  const sparkSpring = spring({
    frame: Math.max(0, frame - 19.5),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // "instantly." on line 2 fades from grey to navy at 3.70 - 3.90s (relFrame 25.5 - 31.5)
  const instantlyColorProg = interpolate(frame, [25.5, 31.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const instantlyColor = instantlyColorProg > 0.5 ? COLORS.TEXT_NAVY : "#9CA3AF";

  // Individual circle springs & blur-pops
  const circleConfigs = [
    { id: "beer", emoji: "beer" as const, bg: COLORS.CIRCLE_BEER, startFrame: 0, zIndex: 1 },
    { id: "burger", emoji: "burger" as const, bg: COLORS.CIRCLE_BURGER, startFrame: 3, zIndex: 2 },
    { id: "coffee", emoji: "coffee" as const, bg: COLORS.CIRCLE_COFFEE, startFrame: 6, zIndex: 3, stays: true },
    { id: "soccer", emoji: "soccer" as const, bg: COLORS.CIRCLE_SOCCER, startFrame: 16.5, zIndex: 4 },
    { id: "party", emoji: "party" as const, bg: COLORS.CIRCLE_PARTY, startFrame: 27, zIndex: 5 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1080,
        left: 0,
        top: 0,
        pointerEvents: "none",
      }}
    >
      {/* Soft Orange Glow (#FFB866, blur 40px) pulsing in */}
      {glowOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 560,
            transform: "translate(-50%, -50%)",
            width: 480,
            height: 220,
            borderRadius: "50%",
            backgroundColor: COLORS.ORANGE_GLOW,
            filter: "blur(40px)",
            opacity: glowOpacity,
          }}
        />
      )}

      {/* Two-line Text above the group at y ~ 28% (top ~ 290px) */}
      <div
        style={{
          position: "absolute",
          top: 290,
          left: 0,
          width: 1080,
          textAlign: "center",
          opacity: exitOpacity,
          filter: exitBlur > 0.05 ? `blur(${exitBlur.toFixed(2)}px)` : "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        {/* Line 1: "Spark moments" */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            fontFamily: interTightFont.fontFamily,
            fontSize: 62,
            fontWeight: 700,
            color: COLORS.TEXT_NAVY,
            letterSpacing: "-0.03em",
            height: 70,
          }}
        >
          {showSpark && (
            <span
              style={{
                transform: `scale(${sparkSpring.toFixed(3)})`,
                display: "inline-block",
              }}
            >
              {COPY.SCENE4_LINE1_PART1}
            </span>
          )}

          {frame >= 22.5 && (
            <TextReveal
              text={COPY.SCENE4_LINE1_PART2}
              startFrame={22.5}
              durationFrames={4}
              fontSize={62}
              fontWeight={700}
              fontFamily={interTightFont.fontFamily}
              color={COLORS.TEXT_NAVY}
              letterSpacing="-0.03em"
              blockHeight={30}
              blockColor={COLORS.WIPE_BLOCK_BLUE}
              cursorHoldFrames={12}
            />
          )}
        </div>

        {/* Line 2: "instantly." fading from grey to navy */}
        {frame >= 25.5 && (
          <div
            style={{
              fontFamily: interTightFont.fontFamily,
              fontSize: 62,
              fontWeight: 700,
              color: instantlyColor,
              letterSpacing: "-0.03em",
              transition: "color 0.15s ease",
            }}
          >
            {COPY.SCENE4_LINE2}
          </div>
        )}
      </div>

      {/* Emoji Circles Stack at y ~ 52% (top ~ 560px) */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 560,
          transform: `translate(${currentCenterX}px, -50%)`,
          display: "flex",
          width: 0,
          height: 135,
        }}
      >
        {circleConfigs.map((c, idx) => {
          if (frame < c.startFrame) return null;

          const circleFrame = frame - c.startFrame;
          const pop = spring({
            frame: circleFrame,
            fps,
            config: { damping: 12, stiffness: 200 },
          });

          // Blur-pop enter
          const cEnterBlur = interpolate(circleFrame, [0, 5], [14, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Exit: all except coffee blur-out
          const cExitOpacity = c.stays ? 1 : exitOpacity;
          const cExitBlur = c.stays ? 0 : exitBlur;
          const cFinalBlur = Math.max(cEnterBlur, cExitBlur);

          const xPos = idx * 101.25;

          return (
            <div
              key={c.id}
              style={{
                position: "absolute",
                left: xPos,
                top: 0,
                zIndex: c.zIndex,
                transform: `scale(${pop.toFixed(3)})`,
                transformOrigin: "center center",
                opacity: cExitOpacity,
                filter: cFinalBlur > 0.05 ? `blur(${cFinalBlur.toFixed(2)}px)` : "none",
              }}
            >
              <EmojiCircle emoji={c.emoji} bgColor={c.bg} size={135} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
