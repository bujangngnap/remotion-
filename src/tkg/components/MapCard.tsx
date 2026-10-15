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
  /** Relative frame within scene */
  relativeFrame: number;
  /** Total scene duration for scaling and transitions */
  durationFrames?: number;
  /** Whether rendering in Scene as background zoom */
  isZoomedBackground?: boolean;
  /** Bezel border thickness/color */
  showPeachBezel?: boolean;
}

export const MapCard: React.FC<MapCardProps> = ({
  relativeFrame,
  durationFrames = 120,
  isZoomedBackground = false,
  showPeachBezel = false,
}) => {
  const { fps, width: canvasW, height: canvasH } = useVideoConfig();
  const frame = relativeFrame;

  // Proportional sizing for 1080x1080 or 1080x1920
  const cardWidth = Math.round(canvasW * 0.77); // ~832px
  const cardHeight = Math.round(canvasH * (canvasH > 1200 ? 0.65 : 0.88)); // ~950px on square
  const cornerRadius = 80;

  // Enters blur-pop at start
  const enterSpring = spring({
    frame: Math.max(0, frame - 1.5),
    fps,
    config: { damping: 13, stiffness: 170 },
  });

  const enterBlur = interpolate(frame, [1.5, 9], [14, 0], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const enterOpacity = interpolate(frame, [1.5, 7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow scale 1.04 -> 0.96 throughout durationFrames
  const driftScale = interpolate(frame, [0, durationFrames], [1.04, 0.96], {
    easing: Easing.linear,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slight map drift
  const driftX = interpolate(frame, [0, durationFrames], [0, -20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const driftY = interpolate(frame, [0, durationFrames], [0, 16], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit blur & washout at the end of the scene
  const exitStart = Math.max(10, durationFrames - 12);
  const exitEnd = durationFrames - 2;

  const exitBlur = interpolate(frame, [exitStart, exitEnd], [0, 20], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const combinedOpacity = isZoomedBackground ? 1 : enterOpacity * exitOpacity;
  const combinedBlur = isZoomedBackground ? 12 : Math.max(enterBlur, exitBlur);
  const cardScale = isZoomedBackground
    ? 1.3
    : driftScale * (0.92 + 0.08 * enterSpring);

  // Spark burst radiating from center pin (relFrame 2 to 14)
  const sparks = [
    { angle: 25, dist: 46, color: COLORS.PRIMARY_ORANGE, len: 34 },
    { angle: 95, dist: 50, color: COLORS.LIGHT_ORANGE, len: 28 },
    { angle: 170, dist: 44, color: COLORS.INK, len: 32 },
    { angle: 240, dist: 52, color: COLORS.PRIMARY_ORANGE, len: 38 },
    { angle: 315, dist: 48, color: COLORS.LIGHT_ORANGE, len: 30 },
  ];
  const sparkProgress = interpolate(frame, [2, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pins configuration & spring pops (relFrame 3 - 12)
  const centerPinX = cardWidth * 0.5;
  const centerPinY = cardHeight * 0.5;

  const pins = [
    {
      id: "tk_center",
      name: "TKG Central",
      x: centerPinX,
      y: centerPinY,
      size: 65,
      bg: COLORS.MAP_PIN_CENTER,
      startFrame: 2,
      isCenter: true,
      logo: "logos/digital.svg",
    },
    {
      id: "creative",
      name: "TK Creative",
      x: centerPinX - cardWidth * 0.25,
      y: centerPinY - cardHeight * 0.16,
      size: 36,
      bg: COLORS.SUBSIDIARY_CREATIVE,
      startFrame: 4,
      logo: "logos/creative.svg",
    },
    {
      id: "media",
      name: "TK Media",
      x: centerPinX + cardWidth * 0.24,
      y: centerPinY - cardHeight * 0.18,
      size: 36,
      bg: COLORS.SUBSIDIARY_MEDIA,
      startFrame: 6,
      logo: "logos/media.svg",
    },
    {
      id: "digital",
      name: "TK Digital",
      x: centerPinX - cardWidth * 0.22,
      y: centerPinY + cardHeight * 0.18,
      size: 36,
      bg: COLORS.SUBSIDIARY_DIGITAL,
      startFrame: 8,
      logo: "logos/digital.svg",
    },
    {
      id: "kenangita",
      name: "Kenangita",
      x: centerPinX + cardWidth * 0.22,
      y: centerPinY + cardHeight * 0.16,
      size: 36,
      bg: COLORS.SUBSIDIARY_KENANGITA,
      startFrame: 10,
      logo: "logos/kenangita.svg",
    },
  ];

  // Orbiting orange line: starts at top-left at 6.35s (relFrame 6),
  // runs down left edge (6.45 - 6.95s / relFrame 9 - 24),
  // turns bottom-left, runs left->right along bottom (6.95 - 7.75s / relFrame 24 - 48).
  // Total perimeter path around the card.
  const lineLength = 180;
  const lineThickness = 10;
  const marginOffset = 14; // sits just outside card

  // Orbiting line animation progress:
  // Phase 1: Down the left edge: y goes from 0 to cardHeight - cornerRadius
  // Phase 2: Along bottom edge: x goes from 0 to cardWidth - cornerRadius
  let orbitLineX = -marginOffset;
  let orbitLineY = -marginOffset;
  let orbitLineWidth = lineThickness;
  let orbitLineHeight = lineLength;
  const phase1End = Math.floor(durationFrames * 0.45);
  const phase2End = Math.floor(durationFrames * 0.9);
  let showOrbitLine = frame >= 6 && frame <= phase2End && !isZoomedBackground;

  if (frame >= 6 && frame < phase1End) {
    // Going down left edge
    const downProgress = interpolate(frame, [6, phase1End], [0, 1], {
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    orbitLineY = interpolate(downProgress, [0, 1], [0, cardHeight - lineLength]);
    orbitLineX = -marginOffset;
    orbitLineWidth = lineThickness;
    orbitLineHeight = lineLength;
  } else if (frame >= phase1End && frame <= phase2End) {
    // Going along bottom edge
    const rightProgress = interpolate(frame, [phase1End, phase2End], [0, 1], {
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    orbitLineX = interpolate(rightProgress, [0, 1], [0, cardWidth - lineLength]);
    orbitLineY = cardHeight + marginOffset - lineThickness;
    orbitLineWidth = lineLength;
    orbitLineHeight = lineThickness;
  }

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
        opacity: combinedOpacity,
        filter: combinedBlur > 0.05 ? `blur(${combinedBlur.toFixed(2)}px)` : "none",
      }}
    >
      {/* Outer wrapper for card and orbiting line */}
      <div
        style={{
          position: "relative",
          width: cardWidth,
          height: cardHeight,
          transform: `scale(${cardScale}) translate(${isZoomedBackground ? "0px, -180px" : `${driftX}px, ${driftY}px`})`,
          transformOrigin: "center center",
          transition: "none",
        }}
      >
        {/* Orbiting orange progress line outside card */}
        {showOrbitLine && (
          <div
            style={{
              position: "absolute",
              left: orbitLineX,
              top: orbitLineY,
              width: orbitLineWidth,
              height: orbitLineHeight,
              borderRadius: 99,
              backgroundColor: COLORS.PRIMARY_ORANGE,
              boxShadow: `0 0 16px ${COLORS.PRIMARY_ORANGE}aa`,
              zIndex: 30,
            }}
          />
        )}

        {/* The Card Container */}
        <div
          style={{
            position: "relative",
            width: cardWidth,
            height: cardHeight,
            borderRadius: cornerRadius,
            overflow: "hidden",
            backgroundColor: COLORS.MAP_BASE,
            border: showPeachBezel
              ? `14px solid ${COLORS.BEZEL_PEACH}`
              : "1px solid rgba(0, 0, 0, 0.06)",
            boxShadow: showPeachBezel
              ? "0 24px 60px rgba(0, 0, 0, 0.12)"
              : "0 24px 50px rgba(13, 13, 13, 0.10), 0 4px 12px rgba(13, 13, 13, 0.04)",
            boxSizing: "border-box",
          }}
        >
          {/* Stylized SVG Map of Magelang */}
          <svg
            viewBox={`0 0 ${cardWidth} ${cardHeight}`}
            width={cardWidth}
            height={cardHeight}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <defs>
              <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#9ED0F2" />
                <stop offset="100%" stop-color="#7AC2F5" />
              </linearGradient>
              <linearGradient id="hillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#B5DDA0" />
                <stop offset="100%" stop-color="#9FD185" />
              </linearGradient>
            </defs>

            {/* Base beige map background */}
            <rect width={cardWidth} height={cardHeight} fill={COLORS.MAP_BASE} />

            {/* Diagonal Street Grid pattern */}
            <g stroke={COLORS.MAP_ROAD} strokeWidth="18" strokeLinecap="round">
              <line x1="-100" y1="200" x2={cardWidth + 100} y2={cardHeight * 0.3} />
              <line x1="-100" y1={cardHeight * 0.45} x2={cardWidth + 100} y2={cardHeight * 0.55} />
              <line x1="-100" y1={cardHeight * 0.72} x2={cardWidth + 100} y2={cardHeight * 0.85} />
              <line x1="180" y1="-50" x2="320" y2={cardHeight + 50} />
              <line x1={cardWidth * 0.52} y1="-50" x2={cardWidth * 0.62} y2={cardHeight + 50} />
              <line x1={cardWidth * 0.78} y1="-50" x2={cardWidth * 0.85} y2={cardHeight + 50} />
              {/* Diagonal crosses */}
              <line x1="50" y1="100" x2={cardWidth * 0.9} y2={cardHeight * 0.95} strokeWidth="10" />
              <line x1={cardWidth * 0.85} y1="80" x2="80" y2={cardHeight * 0.9} strokeWidth="10" />
            </g>

            {/* Minor inner white road centers */}
            <g stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.85">
              <line x1="-100" y1="200" x2={cardWidth + 100} y2={cardHeight * 0.3} />
              <line x1="-100" y1={cardHeight * 0.45} x2={cardWidth + 100} y2={cardHeight * 0.55} />
              <line x1="-100" y1={cardHeight * 0.72} x2={cardWidth + 100} y2={cardHeight * 0.85} />
              <line x1="180" y1="-50" x2="320" y2={cardHeight + 50} />
              <line x1={cardWidth * 0.52} y1="-50" x2={cardWidth * 0.62} y2={cardHeight + 50} />
              <line x1={cardWidth * 0.78} y1="-50" x2={cardWidth * 0.85} y2={cardHeight + 50} />
            </g>

            {/* Blue River (Kali Progo/Elo) curving along left edge and bottom-right */}
            <path
              d={`M -20,${cardHeight * 0.15} 
                  C ${cardWidth * 0.12},${cardHeight * 0.28} ${cardWidth * 0.05},${cardHeight * 0.48} ${cardWidth * 0.18},${cardHeight * 0.62} 
                  C ${cardWidth * 0.28},${cardHeight * 0.74} ${cardWidth * 0.45},${cardHeight * 0.82} ${cardWidth * 0.62},${cardHeight * 0.88}
                  C ${cardWidth * 0.78},${cardHeight * 0.92} ${cardWidth * 0.9},${cardHeight * 0.95} ${cardWidth + 30},${cardHeight * 0.92}`}
              fill="none"
              stroke="url(#riverGrad)"
              strokeWidth="42"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Lighter river core water line */}
            <path
              d={`M -20,${cardHeight * 0.15} 
                  C ${cardWidth * 0.12},${cardHeight * 0.28} ${cardWidth * 0.05},${cardHeight * 0.48} ${cardWidth * 0.18},${cardHeight * 0.62} 
                  C ${cardWidth * 0.28},${cardHeight * 0.74} ${cardWidth * 0.45},${cardHeight * 0.82} ${cardWidth * 0.62},${cardHeight * 0.88}
                  C ${cardWidth * 0.78},${cardHeight * 0.92} ${cardWidth * 0.9},${cardHeight * 0.95} ${cardWidth + 30},${cardHeight * 0.92}`}
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="12"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Green Hill polygon: Gunung Tidar in the center */}
            <path
              d={`M ${centerPinX - 110},${centerPinY - 10} 
                  C ${centerPinX - 120},${centerPinY - 70} ${centerPinX - 60},${centerPinY - 110} ${centerPinX},${centerPinY - 115} 
                  C ${centerPinX + 70},${centerPinY - 115} ${centerPinX + 120},${centerPinY - 70} ${centerPinX + 110},${centerPinY - 10} 
                  C ${centerPinX + 100},${centerPinY + 60} ${centerPinX + 50},${centerPinY + 90} ${centerPinX},${centerPinY + 95} 
                  C ${centerPinX - 60},${centerPinY + 90} ${centerPinX - 100},${centerPinY + 50} ${centerPinX - 110},${centerPinY - 10} Z`}
              fill="url(#hillGrad)"
              filter="drop-shadow(0 4px 10px rgba(0,0,0,0.06))"
            />

            {/* Gunung Tidar inner contour elevation layer */}
            <path
              d={`M ${centerPinX - 65},${centerPinY - 15} 
                  C ${centerPinX - 70},${centerPinY - 50} ${centerPinX - 35},${centerPinY - 75} ${centerPinX},${centerPinY - 78} 
                  C ${centerPinX + 45},${centerPinY - 75} ${centerPinX + 70},${centerPinY - 50} ${centerPinX + 65},${centerPinY - 15} 
                  C ${centerPinX + 60},${centerPinY + 35} ${centerPinX + 30},${centerPinY + 55} ${centerPinX},${centerPinY + 58} 
                  C ${centerPinX - 35},${centerPinY + 55} ${centerPinX - 60},${centerPinY + 30} ${centerPinX - 65},${centerPinY - 15} Z`}
              fill="#A2D68C"
              opacity="0.8"
            />

            {/* Small green square for Alun-alun Magelang */}
            <rect
              x={centerPinX + 130}
              y={centerPinY - 170}
              width="68"
              height="68"
              rx="8"
              fill={COLORS.MAP_ALUN_ALUN}
              stroke="#4ADE80"
              strokeWidth="2.5"
            />
            {/* Tree dots in park */}
            <circle cx={centerPinX + 146} cy={centerPinY - 154} r="5" fill="#16A34A" />
            <circle cx={centerPinX + 182} cy={centerPinY - 154} r="5" fill="#16A34A" />
            <circle cx={centerPinX + 146} cy={centerPinY - 118} r="5" fill="#16A34A" />
            <circle cx={centerPinX + 182} cy={centerPinY - 118} r="5" fill="#16A34A" />
            <circle cx={centerPinX + 164} cy={centerPinY - 136} r="4" fill="#38BDF8" />
          </svg>

          {/* Top-left labels: "Tumbuh Kembang" & "Magelang" */}
          <div
            style={{
              position: "absolute",
              left: 44,
              top: 40,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              zIndex: 20,
            }}
          >
            <span
              style={{
                fontFamily: interTightFont.fontFamily,
                fontWeight: 600,
                fontSize: 26,
                color: COLORS.INK,
                letterSpacing: "-0.01em",
              }}
            >
              {COPY.MAP_BRAND_LABEL}
            </span>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                backgroundColor: "rgba(13, 13, 13, 0.75)",
                backdropFilter: "blur(8px)",
                padding: "4px 14px",
                borderRadius: 99,
                width: "fit-content",
              }}
            >
              <span
                style={{
                  fontFamily: interTightFont.fontFamily,
                  fontWeight: 700,
                  fontSize: 34,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {COPY.MAP_CITY_LABEL}
              </span>
            </div>
          </div>

          {/* Spark Sticks bursting from center pin at relFrame 2-14 */}
          {frame >= 2 && frame <= 14 && (
            <div
              style={{
                position: "absolute",
                left: centerPinX,
                top: centerPinY,
                width: 0,
                height: 0,
                zIndex: 25,
              }}
            >
              {sparks.map((spark, idx) => {
                const sDist = sparkProgress * spark.dist;
                const rad = (spark.angle * Math.PI) / 180;
                const sx = Math.cos(rad) * sDist;
                const sy = Math.sin(rad) * sDist;
                const sOpacity = interpolate(
                  sparkProgress,
                  [0, 0.2, 0.8, 1],
                  [0, 1, 1, 0]
                );

                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      left: sx,
                      top: sy,
                      width: spark.len,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: spark.color,
                      opacity: sOpacity,
                      transform: `rotate(${spark.angle}deg)`,
                      transformOrigin: "center center",
                      boxShadow: `0 0 8px ${spark.color}aa`,
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* Map Pins */}
          {pins.map((pin) => {
            const hasStarted = frame >= pin.startFrame;
            if (!hasStarted) return null;

            const pinSpring = spring({
              frame: frame - pin.startFrame,
              fps,
              config: { damping: 11, stiffness: 200 },
            });

            const pScale = 0.6 + 0.4 * pinSpring;
            const pOpacity = interpolate(pinSpring, [0, 0.4], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={pin.id}
                style={{
                  position: "absolute",
                  left: pin.x,
                  top: pin.y,
                  transform: `translate(-50%, -50%) scale(${pScale})`,
                  opacity: pOpacity,
                  zIndex: pin.isCenter ? 26 : 22,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Pin Circle */}
                <div
                  style={{
                    width: pin.size,
                    height: pin.size,
                    borderRadius: "50%",
                    backgroundColor: pin.bg,
                    border: pin.isCenter
                      ? `4px solid ${COLORS.PRIMARY_ORANGE}`
                      : "2.5px solid #FFFFFF",
                    boxShadow: pin.isCenter
                      ? `0 10px 24px rgba(0, 0, 0, 0.28), 0 0 16px ${COLORS.PRIMARY_ORANGE}88`
                      : "0 6px 16px rgba(0, 0, 0, 0.16)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                  }}
                >
                  {pin.isCenter ? (
                    <Img
                      src={staticFile("logo.png")}
                      style={{
                        width: pin.size * 0.65,
                        height: pin.size * 0.65,
                        objectFit: "contain",
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  ) : (
                    <Img
                      src={staticFile(pin.logo)}
                      style={{
                        width: pin.size * 0.55,
                        height: pin.size * 0.55,
                        objectFit: "contain",
                      }}
                    />
                  )}
                </div>

                {/* Tiny orange dot under the pin */}
                <div
                  style={{
                    width: pin.isCenter ? 10 : 7,
                    height: pin.isCenter ? 10 : 7,
                    borderRadius: "50%",
                    backgroundColor: COLORS.PRIMARY_ORANGE,
                    marginTop: 4,
                    boxShadow: `0 0 8px ${COLORS.PRIMARY_ORANGE}`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
