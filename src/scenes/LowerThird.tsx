import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const LowerThird: React.FC<{ nama: string; jabatan: string; warna: string }> = ({
  nama,
  jabatan,
  warna,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 18 } });
  const exit = spring({ frame: frame - (durationInFrames - 15), fps, config: { damping: 200 } });
  const progress = enter - exit;

  const x = interpolate(progress, [0, 1], [-700, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", padding: 100, fontFamily: "'Segoe UI', Inter, sans-serif" }}>
      <div style={{ display: "flex", transform: `translateX(${x}px)`, opacity: progress }}>
        <div style={{ width: 12, background: warna, borderRadius: 6, marginRight: 24 }} />
        <div
          style={{
            background: "rgba(10,10,20,0.65)",
            backdropFilter: "blur(12px)",
            padding: "24px 40px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <div style={{ color: "white", fontSize: 56, fontWeight: 700 }}>{nama}</div>
          <div style={{ color: warna, fontSize: 34, fontWeight: 500, marginTop: 4 }}>{jabatan}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
