import React, { createContext, useContext } from "react";
import { AbsoluteFill, Audio, Easing, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { CLAMP, SNAPPY, springAt } from "../animations";

// ============================================================
//  SFX — volume master diatur dari komposisi utama via context
// ============================================================

export const SfxVolumeContext = createContext(0.7);

/** Mainkan efek suara pada frame `at` (relatif terhadap scene) */
export const Sfx: React.FC<{ src: string; at: number; volume?: number }> = ({ src, at, volume = 1 }) => {
  const master = useContext(SfxVolumeContext);
  if (master <= 0) return null;
  return (
    <Sequence from={at} durationInFrames={30} layout="none" name="SFX">
      <Audio src={src} volume={volume * master} />
    </Sequence>
  );
};

// ============================================================
//  SceneShell — animasi masuk/keluar tiap scene
// ============================================================

export type EnterType = "none" | "fade" | "zoomIn" | "slideLeft" | "rise";
export type ExitType = "none" | "fade" | "zoomOut" | "zoomThrough" | "slideLeft";

type SceneShellProps = {
  children: React.ReactNode;
  /** Panjang sequence (frame) — dipakai untuk menghitung kapan exit dimulai */
  duration: number;
  enter?: EnterType;
  exit?: ExitType;
  exitDuration?: number;
};

export const SceneShell: React.FC<SceneShellProps> = ({
  children,
  duration,
  enter = "fade",
  exit = "fade",
  exitDuration = 12,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const inP = enter === "none" ? 1 : springAt(frame, fps, 0, SNAPPY, 18);
  const outP =
    exit === "none" || exitDuration <= 0
      ? 0
      : interpolate(frame, [duration - exitDuration, duration], [0, 1], {
          ...CLAMP,
          easing: Easing.inOut(Easing.cubic),
        });

  let scale = 1;
  let tx = 0;
  let ty = 0;
  let blur = 0;
  let opacity = 1;

  // --- Masuk ---
  if (enter === "fade") opacity *= inP;
  if (enter === "zoomIn") {
    scale *= interpolate(inP, [0, 1], [1.25, 1]);
    blur += interpolate(inP, [0, 1], [14, 0]);
    opacity *= inP;
  }
  if (enter === "slideLeft") {
    tx += interpolate(inP, [0, 1], [1920 * 0.6, 0]);
    opacity *= Math.min(1, inP * 2);
  }
  if (enter === "rise") {
    ty += interpolate(inP, [0, 1], [140, 0]);
    opacity *= inP;
  }

  // --- Keluar ---
  if (exit === "fade") opacity *= 1 - outP;
  if (exit === "zoomOut") {
    scale *= interpolate(outP, [0, 1], [1, 0.78]);
    opacity *= 1 - outP;
  }
  if (exit === "zoomThrough") {
    scale *= interpolate(outP, [0, 1], [1, 1.3]);
    blur += outP * 14;
    opacity *= 1 - outP;
  }
  if (exit === "slideLeft") {
    tx += interpolate(outP, [0, 1], [0, -1920 * 0.5]);
    opacity *= 1 - outP;
  }

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
        filter: blur > 0.1 ? `blur(${blur}px)` : undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
