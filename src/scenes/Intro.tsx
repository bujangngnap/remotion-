import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Intro: React.FC<{ judul: string; subjudul: string; warna: string }> = ({
  judul,
  subjudul,
  warna,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();
  const isPortrait = height > width;

  const titleIn = spring({ frame, fps, config: { damping: 200 } });
  const subIn = spring({ frame: frame - 12, fps, config: { damping: 200 } });
  const lineW = spring({ frame: frame - 6, fps, config: { damping: 100 } });
  const fadeOut = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgRotate = interpolate(frame, [0, durationInFrames], [0, 40]);

  return (
    <AbsoluteFill
      style={{
        opacity: fadeOut,
        background: `radial-gradient(circle at 30% 20%, ${warna}55, transparent 55%), radial-gradient(circle at 80% 90%, #00d4ff33, transparent 50%), #0b0b12`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Inter, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          border: `2px solid ${warna}44`,
          transform: `rotate(${bgRotate}deg) scale(${0.8 + titleIn * 0.2})`,
        }}
      />
      <div style={{ textAlign: "center", padding: 60 }}>
        <h1
          style={{
            margin: 0,
            color: "white",
            fontSize: isPortrait ? 110 : 140,
            fontWeight: 800,
            letterSpacing: -3,
            transform: `translateY(${(1 - titleIn) * 80}px)`,
            opacity: titleIn,
          }}
        >
          {judul}
        </h1>
        <div
          style={{
            height: 8,
            width: 300 * lineW,
            margin: "30px auto",
            borderRadius: 4,
            background: `linear-gradient(90deg, ${warna}, #00d4ff)`,
          }}
        />
        <p
          style={{
            margin: 0,
            color: "#c9c9e0",
            fontSize: isPortrait ? 48 : 56,
            transform: `translateY(${(1 - subIn) * 40}px)`,
            opacity: subIn,
          }}
        >
          {subjudul}
        </p>
      </div>
    </AbsoluteFill>
  );
};
