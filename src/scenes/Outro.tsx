import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Outro: React.FC<{ teks: string; warna: string }> = ({ teks, warna }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12 } });
  const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeOut,
        justifyContent: "center",
        alignItems: "center",
        background: `radial-gradient(circle, ${warna}44, #0b0b12 70%)`,
        fontFamily: "'Segoe UI', Inter, sans-serif",
      }}
    >
      <h2
        style={{
          color: "white",
          fontSize: 90,
          fontWeight: 800,
          textAlign: "center",
          padding: 60,
          transform: `scale(${scale})`,
        }}
      >
        {teks}
      </h2>
    </AbsoluteFill>
  );
};
