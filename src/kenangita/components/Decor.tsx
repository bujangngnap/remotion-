import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BOUNCY, springAt, wave } from "../animations";
import { C } from "../theme";

const SPARKLE_PATH = "M50 0 C54 34 66 46 100 50 C66 54 54 66 50 100 C46 66 34 54 0 50 C34 46 46 34 50 0Z";

type DecorProps = {
  x: number;
  y: number;
  size: number;
  delay?: number;
  /** Fase gerakan agar tiap dekor tidak sinkron */
  phase?: number;
};

/** Bintang 4 sudut yang pop-in lalu berkelip & berputar pelan */
export const Sparkle: React.FC<DecorProps & { color?: string }> = ({ x, y, size, delay = 0, phase = 0, color = C.pink }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = springAt(frame, fps, delay, BOUNCY);
  const twinkle = 1 + wave(frame, 36, 0.18, phase);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        transform: `scale(${pop * twinkle}) rotate(${interpolate(pop, [0, 1], [-90, 0]) + frame * 0.6}deg)`,
        overflow: "visible",
      }}
    >
      <path d={SPARKLE_PATH} fill={color} />
    </svg>
  );
};

/** Stiker emoji yang pop-in dan memantul lembut */
export const Sticker: React.FC<DecorProps & { emoji: string; rotate?: number }> = ({
  x,
  y,
  size,
  delay = 0,
  phase = 0,
  emoji,
  rotate = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = springAt(frame, fps, delay, BOUNCY);
  const bounce = Math.abs(Math.sin(frame / 14 + phase)) * -size * 0.18;

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        fontSize: size * 0.8,
        lineHeight: `${size}px`,
        textAlign: "center",
        transform: `translateY(${bounce}px) scale(${pop}) rotate(${rotate + wave(frame, 50, 8, phase)}deg)`,
        filter: "drop-shadow(0 8px 14px rgba(233,30,99,0.25))",
      }}
    >
      {emoji}
    </div>
  );
};
