import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Heart } from "../components/FloatingHearts";
import { fontScript, fontSans, WARNA } from "../theme";

export const IntroScene: React.FC<{
  angkaTahun: number;
  judul: string;
  namaKamu: string;
  namaDia: string;
  tanggalJadian: string;
  warna: string;
}> = ({ angkaTahun, judul, namaKamu, namaDia, tanggalJadian, warna }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Kamera terus bergerak lembut (smooth cinematic drift)
  const cameraZoom = interpolate(frame, [0, durationInFrames], [1, 1.05], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Animasi elemen masuk yang sangat halus (ease-out cubic)
  const badgeProgress = interpolate(frame, [4, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleProgress = interpolate(frame, [22, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const subtitleProgress = interpolate(frame, [44, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const dateProgress = interpolate(frame, [58, 88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Denyut ambient yang sangat halus (tanpa hentakan kasar)
  const pulse = 1 + Math.sin(frame * 0.04) * 0.02;
  const glowIntensity = 30 + Math.sin(frame * 0.05) * 12;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 40%, ${warna}40 0%, ${WARNA.bg2} 50%, ${WARNA.bg} 100%)`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        transform: `scale(${cameraZoom})`,
        willChange: "transform",
      }}
    >
      {/* Halo cahaya di belakang lambang */}
      <div
        style={{
          position: "absolute",
          width: 550,
          height: 550,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${warna}55 0%, transparent 70%)`,
          filter: "blur(40px)",
          opacity: badgeProgress,
          transform: `scale(${pulse})`,
        }}
      />

      {/* Emblem angka tahun */}
      <div
        style={{
          position: "relative",
          width: 320,
          height: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: badgeProgress,
          transform: `scale(${interpolate(badgeProgress, [0, 1], [0.85, 1]) * pulse})`,
          filter: `drop-shadow(0 10px ${glowIntensity}px ${warna}bb)`,
        }}
      >
        <Heart size={300} color={warna} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 24,
            fontFamily: fontSans,
            fontWeight: 700,
            fontSize: 160,
            color: WARNA.krem,
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          {angkaTahun}
        </div>
      </div>

      {/* Judul tulisan sambung estetik */}
      <div
        style={{
          fontFamily: fontScript,
          fontSize: 155,
          color: WARNA.krem,
          marginTop: 24,
          lineHeight: 1.15,
          textAlign: "center",
          padding: "0 40px",
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
          filter: titleProgress < 0.99 ? `blur(${interpolate(titleProgress, [0, 1], [14, 0])}px)` : "none",
          textShadow: `0 0 35px ${warna}bb, 0 4px 12px rgba(0,0,0,0.6)`,
        }}
      >
        {judul}
      </div>

      {/* Nama berdua */}
      <div
        style={{
          fontFamily: fontSans,
          fontWeight: 600,
          fontSize: 44,
          letterSpacing: 10,
          textTransform: "uppercase",
          color: WARNA.emas,
          marginTop: 36,
          opacity: subtitleProgress,
          transform: `translateY(${interpolate(subtitleProgress, [0, 1], [20, 0])}px)`,
          filter: subtitleProgress < 0.99 ? `blur(${interpolate(subtitleProgress, [0, 1], [8, 0])}px)` : "none",
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span>{namaKamu}</span>
        <span style={{ color: warna, fontSize: 32 }}>❤</span>
        <span>{namaDia}</span>
      </div>

      {/* Tanggal jadian */}
      <div
        style={{
          fontFamily: fontSans,
          fontWeight: 300,
          fontSize: 32,
          color: WARNA.krem,
          marginTop: 18,
          opacity: dateProgress * 0.85,
          letterSpacing: 4,
          transform: `translateY(${interpolate(dateProgress, [0, 1], [15, 0])}px)`,
        }}
      >
        sejak {tanggalJadian}
      </div>
    </AbsoluteFill>
  );
};
