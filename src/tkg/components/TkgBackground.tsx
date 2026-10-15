import React from "react";
import { interpolate } from "remotion";
import { COLORS } from "../constants";

export interface TkgBackgroundProps {
  frame: number;
}

export const TkgBackground: React.FC<TkgBackgroundProps> = ({ frame }) => {
  // Phase 1: Scene 1 to 2 peach gradient (f50 - f90)
  const peachProg = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2: Scene 2 to 3 orange-yellow peach (f80 - f130)
  const orangePeachProg = interpolate(frame, [80, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Fades back to clean warm white (f130 - f160)
  const backToWhiteProg = interpolate(frame, [130, 160], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 4: Scene 6 dark code terminal background wash (f370 - f485)
  const codeDarkProg = interpolate(frame, [370, 390, 475, 495], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 5: Quick orange flash at f795
  const flashProg = interpolate(frame, [794, 796, 799], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 6: Deep luxury dark canvas for Grand Finale CTA (f795 - f900)
  const darkProg = interpolate(frame, [795, 808], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dynamic background style
  let backgroundStyle: string = `radial-gradient(circle at 50% 50%, #FFFFFF 0%, ${COLORS.BG_LIGHT} 70%)`;

  if (frame >= 50 && frame < 130) {
    if (orangePeachProg > 0.4) {
      backgroundStyle = `linear-gradient(135deg, ${COLORS.ORANGE_YELLOW_PEACH_START} 0%, ${COLORS.ORANGE_YELLOW_PEACH_END} 100%)`;
    } else if (peachProg > 0) {
      backgroundStyle = `linear-gradient(135deg, ${COLORS.PEACH_WASH} 0%, ${COLORS.PEACH_MID} 100%)`;
    }
  } else if (frame >= 130 && frame < 165) {
    if (backToWhiteProg < 1) {
      backgroundStyle = `linear-gradient(135deg, ${COLORS.PEACH_WASH} 0%, ${COLORS.BG_LIGHT} 100%)`;
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        background: backgroundStyle,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Code / Tech dark ambience during Scene 6 */}
      {codeDarkProg > 0.05 && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundColor: "#0F172A",
            opacity: codeDarkProg * 0.94,
          }}
        >
          {/* Subtle grid pattern */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage:
                "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>
      )}

      {/* Dark Scene Overlay at f795+ for Grand Finale CTA */}
      {darkProg > 0 && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundColor: COLORS.BG_DARK,
            opacity: darkProg,
          }}
        >
          {/* Ambient Orange Glow behind Logo */}
          <div
            style={{
              position: "absolute",
              width: 580,
              height: 580,
              left: "50%",
              top: "30%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS.PRIMARY_ORANGE}38 0%, transparent 70%)`,
              filter: "blur(50px)",
            }}
          />
        </div>
      )}

      {/* Quick orange flash at f795 */}
      {flashProg > 0.05 && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundColor: COLORS.PRIMARY_ORANGE,
            opacity: flashProg * 0.8,
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};
