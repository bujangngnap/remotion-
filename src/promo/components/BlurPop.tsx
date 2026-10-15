import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface BlurPopProps {
  children: React.ReactNode;
  enterFrame?: number;
  enterDuration?: number;
  exitFrame?: number;
  exitDuration?: number;
  useSpringEnter?: boolean;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass?: number;
  };
  style?: React.CSSProperties;
  className?: string;
}

export const BlurPop: React.FC<BlurPopProps> = ({
  children,
  enterFrame = 0,
  enterDuration = 12,
  exitFrame,
  exitDuration = 10,
  useSpringEnter = false,
  springConfig = { damping: 12, stiffness: 180 },
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // If before enterFrame, do not display
  if (frame < enterFrame) {
    return (
      <div
        className={className}
        style={{
          opacity: 0,
          pointerEvents: "none",
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  // Calculate Enter
  let enterScale = 1;
  let enterY = 0;

  if (useSpringEnter) {
    const s = spring({
      frame: Math.max(0, frame - enterFrame),
      fps,
      config: springConfig,
    });
    enterScale = 0.92 + 0.08 * s;
    enterY = 20 * (1 - Math.min(1, s));
  } else {
    enterScale = interpolate(
      frame,
      [enterFrame, enterFrame + enterDuration],
      [0.92, 1],
      {
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
    enterY = interpolate(
      frame,
      [enterFrame, enterFrame + enterDuration],
      [20, 0],
      {
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
  }

  const enterOpacity = interpolate(
    frame,
    [enterFrame, enterFrame + Math.min(8, enterDuration)],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const enterBlur = interpolate(
    frame,
    [enterFrame, enterFrame + enterDuration],
    [14, 0],
    {
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Calculate Exit if exitFrame is provided
  let exitOpacity = 1;
  let exitBlur = 0;
  let exitScale = 1;

  if (exitFrame !== undefined && frame >= exitFrame) {
    exitOpacity = interpolate(
      frame,
      [exitFrame, exitFrame + exitDuration],
      [1, 0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
    exitBlur = interpolate(
      frame,
      [exitFrame, exitFrame + exitDuration],
      [0, 14],
      {
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
    exitScale = interpolate(
      frame,
      [exitFrame, exitFrame + exitDuration],
      [1, 0.96],
      {
        easing: Easing.bezier(0.22, 1, 0.36, 1),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
  }

  const finalOpacity = enterOpacity * exitOpacity;
  const finalBlur = Math.max(enterBlur, exitBlur);
  const finalScale = enterScale * exitScale;

  return (
    <div
      className={className}
      style={{
        opacity: finalOpacity,
        filter: finalBlur > 0.05 ? `blur(${finalBlur.toFixed(2)}px)` : "none",
        transform: `translateY(${enterY.toFixed(2)}px) scale(${finalScale.toFixed(3)})`,
        transformOrigin: "center center",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
