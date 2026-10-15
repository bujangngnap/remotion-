import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedWords } from "../components/AnimatedWords";
import { Heart } from "../components/FloatingHearts";
import { fontScript, fontSans, WARNA } from "../theme";

export const OutroScene: React.FC<{
  jumlahHari: number;
  judul: string;
  pesan: string;
  namaKamu: string;
  warna: string;
}> = ({ jumlahHari, judul, pesan, namaKamu, warna }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Kamera drift pelan
  const cameraZoom = interpolate(frame, [0, durationInFrames], [1, 1.04], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  // Hitungan hari naik dengan kurva ease-out yang sangat mulus
  const countProgress = interpolate(frame, [10, 10 + 2.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const hari = Math.round(jumlahHari * countProgress);

  const labelProgress = interpolate(frame, [4, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleProgress = interpolate(frame, [35, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const signProgress = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: fadeOut,
        background: `radial-gradient(circle at 50% 42%, ${warna}44 0%, ${WARNA.bg2} 55%, ${WARNA.bg} 100%)`,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 70px",
        textAlign: "center",
        transform: `scale(${cameraZoom})`,
        willChange: "transform, opacity",
      }}
    >
      {/* Label atas */}
      <div
        style={{
          fontFamily: fontSans,
          fontWeight: 400,
          fontSize: 30,
          letterSpacing: 10,
          color: WARNA.emas,
          opacity: labelProgress,
          textTransform: "uppercase",
          transform: `translateY(${interpolate(labelProgress, [0, 1], [-15, 0])}px)`,
        }}
      >
        Sudah Melewati
      </div>

      {/* Angka hari besar bergradasi emas & glowing */}
      <div
        style={{
          fontFamily: fontSans,
          fontWeight: 700,
          fontSize: 240,
          lineHeight: 1,
          margin: "16px 0 10px 0",
          background: `linear-gradient(180deg, #ffffff 0%, ${WARNA.emas} 60%, ${warna} 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          filter: `drop-shadow(0 0 35px ${warna}aa)`,
          letterSpacing: -2,
        }}
      >
        {hari}
      </div>

      <div
        style={{
          fontFamily: fontSans,
          fontWeight: 600,
          fontSize: 38,
          letterSpacing: 12,
          color: WARNA.krem,
          opacity: labelProgress,
          textTransform: "uppercase",
        }}
      >
        Hari Bersama
      </div>

      {/* Judul Outro */}
      <div
        style={{
          fontFamily: fontScript,
          fontSize: 135,
          color: WARNA.krem,
          lineHeight: 1.15,
          marginTop: 60,
          opacity: titleProgress,
          transform: `translateY(${interpolate(titleProgress, [0, 1], [25, 0])}px)`,
          filter: titleProgress < 0.99 ? `blur(${interpolate(titleProgress, [0, 1], [10, 0])}px)` : "none",
          textShadow: `0 0 40px ${warna}cc, 0 4px 15px rgba(0,0,0,0.6)`,
        }}
      >
        {judul}
      </div>

      {/* Pesan romantis */}
      <div style={{ marginTop: 30, maxWidth: 900 }}>
        <AnimatedWords
          text={pesan}
          delay={45}
          stagger={3}
          style={{
            fontFamily: fontSans,
            fontWeight: 300,
            fontSize: 38,
            lineHeight: 1.5,
            color: WARNA.krem,
            textShadow: "0 2px 12px rgba(0,0,0,0.7)",
          }}
        />
      </div>

      {/* Tanda tangan penutup */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 50,
          opacity: signProgress,
          transform: `translateY(${interpolate(signProgress, [0, 1], [20, 0])}px)`,
        }}
      >
        <span style={{ fontFamily: fontScript, fontSize: 75, color: WARNA.emas }}>
          With love, {namaKamu}
        </span>
        <Heart
          size={50}
          color={warna}
          style={{
            transform: `scale(${1 + Math.sin(frame * 0.08) * 0.08})`,
            filter: `drop-shadow(0 0 10px ${warna})`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
