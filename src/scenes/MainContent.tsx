import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const MainContent: React.FC<{ videoSrc: string; warna: string }> = ({ videoSrc, warna }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  // Efek zoom pelan (Ken Burns)
  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.08]);

  if (!videoSrc) {
    // Placeholder bila belum ada video di folder /public
    return (
      <AbsoluteFill
        style={{
          opacity: fadeIn,
          justifyContent: "center",
          alignItems: "center",
          background: `linear-gradient(135deg, #14142b, ${warna}33)`,
          fontFamily: "'Segoe UI', Inter, sans-serif",
          color: "white",
          textAlign: "center",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 120, transform: `scale(${zoom})` }}>🎬</div>
        <h2 style={{ fontSize: 64, margin: "20px 0" }}>Taruh video kamu di sini</h2>
        <p style={{ fontSize: 36, color: "#b0b0cc", maxWidth: 1200 }}>
          Copy file video ke folder <b style={{ color: warna }}>public/</b>, lalu isi prop{" "}
          <b style={{ color: warna }}>videoSrc</b> di panel kanan (contoh: <code>klip.mp4</code>)
        </p>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ opacity: fadeIn, overflow: "hidden" }}>
      <OffthreadVideo
        src={videoSrc.startsWith("http") ? videoSrc : staticFile(videoSrc)}
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` }}
      />
      {/* Vignette */}
      <AbsoluteFill
        style={{ background: "radial-gradient(circle, transparent 60%, rgba(0,0,0,0.5) 100%)" }}
      />
    </AbsoluteFill>
  );
};
