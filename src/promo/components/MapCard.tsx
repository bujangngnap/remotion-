import React from "react";
import {
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useVideoConfig,
} from "remotion";
import { COLORS, COPY, interTightFont } from "../constants";

export interface MapCardProps {
  /** Relative frame within Scene 5 (0 = f133, duration = 43 frames) */
  relativeFrame: number;
}

export const MapCard: React.FC<MapCardProps> = ({ relativeFrame }) => {
  const { fps } = useVideoConfig();
  const frame = relativeFrame;

  // Scene 5 timing: enters blur-pop at 4.5s (rel frame 2)
  const enterSpring = spring({
    frame: Math.max(0, frame - 2),
    fps,
    config: { damping: 13, stiffness: 170 },
  });

  const enterBlur = interpolate(frame, [2, 10], [14, 0], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const enterOpacity = interpolate(frame, [2, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow scale 1.04 -> 0.96 throughout
  const driftScale = interpolate(frame, [0, 42], [1.04, 0.96], {
    easing: Easing.linear,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slight map drift
  const driftX = interpolate(frame, [0, 42], [0, -16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const driftY = interpolate(frame, [0, 42], [0, 12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 5.70 - 5.85s: blur and wash out to white (rel frame 37 to 42)
  const exitBlur = interpolate(frame, [37, 42], [0, 20], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [37, 42], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const combinedOpacity = enterOpacity * exitOpacity;
  const combinedBlur = Math.max(enterBlur, exitBlur);
  const cardScale = driftScale * (0.92 + 0.08 * enterSpring);

  // Spark burst radiating from coffee pin (rel frame 2 to 14)
  const sparks = [
    { angle: 28, dist: 38, color: COLORS.SPARK_ORANGE, len: 32 },
    { angle: 95, dist: 42, color: "#FFD23F", len: 26 },
    { angle: 165, dist: 36, color: COLORS.TEXT_NAVY, len: 30 },
    { angle: 235, dist: 44, color: COLORS.SPARK_ORANGE, len: 35 },
    { angle: 310, dist: 40, color: "#FFD23F", len: 28 },
  ];
  const sparkProgress = interpolate(frame, [2, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pins configuration & spring pops
  // Big center coffee pin + 4 smaller ones
  const pins = [
    {
      id: "coffee",
      emoji: "coffee",
      x: 416,
      y: 475,
      size: 65,
      bg: COLORS.CIRCLE_COFFEE,
      startFrame: 2,
      isCenter: true,
    },
    {
      id: "burger",
      emoji: "burger",
      x: 210,
      y: 270,
      size: 36,
      bg: COLORS.CIRCLE_BURGER,
      startFrame: 4,
    },
    {
      id: "soccer",
      emoji: "soccer",
      x: 590,
      y: 290,
      size: 36,
      bg: COLORS.CIRCLE_SOCCER,
      startFrame: 6,
    },
    {
      id: "party",
      emoji: "party",
      x: 680,
      y: 190,
      size: 36,
      bg: COLORS.CIRCLE_PARTY,
      startFrame: 8,
    },
    {
      id: "beer",
      emoji: "beer",
      x: 230,
      y: 690,
      size: 36,
      bg: COLORS.CIRCLE_BEER,
      startFrame: 10,
    },
  ];

  // Orbiting blue line:
  // Starts top-left corner at 4.60s (rel frame 4.5)
  // Runs down left edge (4.70 - 5.10s, rel frame 7.5 - 19.5)
  // Turns corner and runs left->right along bottom (5.10 - 5.75s, rel frame 19.5 - 39)
  // Total path around card boundary:
  // Left edge: x = 112 (outside card border 124 - 12), y from 145 down to 935
  // Bottom edge: y = 1027 (outside card bottom 1015 + 12), x from 145 to 850
  let lineX1 = 112;
  let lineY1 = 145;
  let lineX2 = 112;
  let lineY2 = 145;
  let showLine = false;

  if (frame >= 4.5 && frame < 40) {
    showLine = true;
    if (frame < 19.5) {
      // Running down left edge
      const p = interpolate(frame, [4.5, 19.5], [0, 1], {
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const headY = interpolate(p, [0, 1], [145, 935]);
      lineX1 = 112;
      lineX2 = 112;
      lineY2 = headY;
      lineY1 = Math.max(145, headY - 180);
    } else {
      // Bottom edge left -> right
      const p = interpolate(frame, [19.5, 39], [0, 1], {
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const headX = interpolate(p, [0, 1], [145, 840]);
      lineX2 = headX;
      lineY2 = 1027;
      lineX1 = Math.max(145, headX - 180);
      lineY1 = 1027;
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1080,
        left: 0,
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: combinedOpacity,
        filter: combinedBlur > 0.05 ? `blur(${combinedBlur.toFixed(2)}px)` : "none",
        pointerEvents: "none",
      }}
    >
      {/* Orbiting blue progress line */}
      {showLine && (
        <svg
          style={{
            position: "absolute",
            width: 1080,
            height: 1080,
            left: 0,
            top: 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <line
            x1={lineX1}
            y1={lineY1}
            x2={lineX2}
            y2={lineY2}
            stroke={COLORS.PRIMARY_BLUE}
            strokeWidth={10}
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Main Map Card */}
      <div
        style={{
          width: 832,
          height: 950,
          borderRadius: 80,
          overflow: "hidden",
          position: "relative",
          backgroundColor: COLORS.MAP_BASE,
          boxShadow: "0 28px 70px rgba(11, 18, 48, 0.18), 0 8px 24px rgba(11, 18, 48, 0.08)",
          transform: `scale(${cardScale.toFixed(3)})`,
          transformOrigin: "center center",
        }}
      >
        {/* SVG Map Base Graphic */}
        <svg
          viewBox="0 0 832 950"
          width="832"
          height="950"
          style={{
            position: "absolute",
            left: driftX,
            top: driftY,
            width: 832,
            height: 950,
          }}
        >
          {/* Base fill */}
          <rect width="832" height="950" fill={COLORS.MAP_BASE} />

          {/* Left River (Hudson style) */}
          <path
            d="M 0 0 Q 80 280, 50 560 T 90 950 L 0 950 Z"
            fill={COLORS.MAP_WATER}
          />
          {/* Bottom-right River (East River style) */}
          <path
            d="M 680 950 Q 720 740, 832 660 L 832 950 Z"
            fill={COLORS.MAP_WATER}
          />

          {/* Manhattan Diagonal Street Grid (~29 degrees rotated) */}
          <g transform="rotate(29, 416, 475)">
            {/* Horizontal Avenues */}
            {Array.from({ length: 28 }).map((_, i) => {
              const y = -300 + i * 55;
              const isMain = i % 4 === 0;
              return (
                <line
                  key={`h-${i}`}
                  x1="-400"
                  y1={y}
                  x2="1300"
                  y2={y}
                  stroke={isMain ? "#FFFFFF" : "#EBE7DF"}
                  strokeWidth={isMain ? 8 : 4.5}
                />
              );
            })}

            {/* Vertical Cross Streets */}
            {Array.from({ length: 32 }).map((_, i) => {
              const x = -350 + i * 44;
              const isMain = i % 5 === 0;
              return (
                <line
                  key={`v-${i}`}
                  x1={x}
                  y1="-400"
                  x2={x}
                  y2="1400"
                  stroke={isMain ? "#FFFFFF" : "#EBE7DF"}
                  strokeWidth={isMain ? 7 : 4}
                />
              );
            })}

            {/* Broadway diagonal cutting across */}
            <line
              x1="-100"
              y1="-200"
              x2="900"
              y2="1100"
              stroke="#FFFFFF"
              strokeWidth={9}
            />

            {/* Green Park Polygon (#A9DB8A) */}
            <rect
              x="260"
              y="180"
              width="210"
              height="360"
              rx="24"
              fill={COLORS.MAP_PARK}
            />

            {/* Small Blue Lake (#8EC9F5) inside park */}
            <ellipse
              cx="365"
              cy="280"
              rx="55"
              ry="32"
              fill={COLORS.MAP_WATER}
            />
          </g>
        </svg>

        {/* Labels Top-Left */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 54,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            zIndex: 5,
          }}
        >
          <span
            style={{
              fontFamily: interTightFont.fontFamily,
              fontSize: 26,
              fontWeight: 600,
              color: COLORS.TEXT_NAVY,
              letterSpacing: "-0.01em",
            }}
          >
            {COPY.MAP_NAME}
          </span>
          <span
            style={{
              fontFamily: interTightFont.fontFamily,
              fontSize: 34,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              textShadow: "0 2px 10px rgba(11, 18, 48, 0.4)",
            }}
          >
            {COPY.MAP_CITY}
          </span>
        </div>

        {/* Map Pins */}
        {pins.map((pin) => {
          const pinFrame = frame - pin.startFrame;
          if (pinFrame < 0) return null;

          const pop = spring({
            frame: pinFrame,
            fps,
            config: { damping: 12, stiffness: 210 },
          });

          return (
            <div
              key={pin.id}
              style={{
                position: "absolute",
                left: pin.x - pin.size / 2,
                top: pin.y - pin.size / 2,
                zIndex: pin.isCenter ? 8 : 6,
                transform: `scale(${pop.toFixed(3)})`,
                transformOrigin: "center bottom",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Badge Circle */}
              <div
                style={{
                  width: pin.size,
                  height: pin.size,
                  borderRadius: "50%",
                  backgroundColor: pin.bg,
                  border: pin.isCenter
                    ? "2.5px solid rgba(255, 255, 255, 0.85)"
                    : "2px solid rgba(255, 255, 255, 0.75)",
                  boxShadow: "0 6px 18px rgba(11, 18, 48, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Img
                  src={staticFile(`promo/emojis/${pin.emoji}.svg`)}
                  style={{
                    width: Math.round(pin.size * 0.58),
                    height: Math.round(pin.size * 0.58),
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Tiny Blue Dot underneath */}
              <div
                style={{
                  width: pin.isCenter ? 8 : 6,
                  height: pin.isCenter ? 8 : 6,
                  borderRadius: "50%",
                  backgroundColor: COLORS.PRIMARY_BLUE,
                  marginTop: 3,
                  boxShadow: `0 0 8px ${COLORS.PRIMARY_BLUE}`,
                }}
              />
            </div>
          );
        })}

        {/* Spark burst sticks radiating from center coffee pin */}
        {frame >= 2 && frame <= 14 && (
          <div
            style={{
              position: "absolute",
              left: 416,
              top: 475,
              pointerEvents: "none",
              zIndex: 9,
            }}
          >
            {sparks.map((spark, idx) => {
              const currentDist = spark.dist * sparkProgress;
              const sparkOpacity = interpolate(sparkProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
              const rad = (spark.angle * Math.PI) / 180;
              const sx = Math.cos(rad) * currentDist;
              const sy = Math.sin(rad) * currentDist;

              return (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    left: sx,
                    top: sy,
                    width: spark.len,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: spark.color,
                    opacity: sparkOpacity,
                    transform: `rotate(${spark.angle}deg)`,
                    transformOrigin: "left center",
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
