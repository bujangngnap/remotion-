import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedWords } from "../components/AnimatedWords";
import type { Momen } from "../schema";
import { fontScript, fontSans, WARNA } from "../theme";

const resolveSrc = (file: string) => (file.startsWith("http") ? file : staticFile(file));

export const MomentScene: React.FC<{ momen: Momen; index: number; warna: string }> = ({
  momen,
  index,
  warna,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const ganjil = index % 2 === 1;

  // Kamera Ken Burns yang terus bergerak mulus tanpa henti
  const kenBurns = interpolate(frame, [0, durationInFrames], [1.02, 1.12], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });
  const panX = interpolate(frame, [0, durationInFrames], ganjil ? [-15, 15] : [15, -15]);
  const panY = interpolate(frame, [0, durationInFrames], [0, -10]);

  // Efek masuk kartu yang sangat halus (ease-out)
  const cardProgress = interpolate(frame, [0, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const cardScale = interpolate(cardProgress, [0, 1], [0.93, 1]);
  const cardTranslateY = interpolate(cardProgress, [0, 1], [30, 0]);

  // Header dan judul masuk pelan-pelan
  const headerProgress = interpolate(frame, [2, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Kilau cahaya lembut (light leak) yang melintas di atas foto
  const lightLeakX = interpolate(frame, [0, durationInFrames], [-20, 120]);

  const adaFile = momen.file.trim() !== "";
  const isVideo = momen.tipe === "video";

  const media = !adaFile ? null : isVideo ? (
    <OffthreadVideo
      src={resolveSrc(momen.file)}
      trimBefore={Math.round(momen.potongAwalDetik * fps)}
      muted={momen.bisukan}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `scale(${kenBurns}) translate(${panX}px, ${panY}px)`,
      }}
    />
  ) : (
    <Img
      src={resolveSrc(momen.file)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `scale(${kenBurns}) translate(${panX}px, ${panY}px)`,
      }}
    />
  );

  return (
    <AbsoluteFill style={{ background: WARNA.bg, overflow: "hidden" }}>
      {/* Latar belakang: foto diblur secara dreamy, menyatu dengan warna tema */}
      {adaFile && !isVideo ? (
        <Img
          src={resolveSrc(momen.file)}
          style={{
            position: "absolute",
            inset: -40,
            width: "calc(100% + 80px)",
            height: "calc(100% + 80px)",
            objectFit: "cover",
            filter: "blur(50px) brightness(0.38) saturate(1.4)",
            transform: `scale(${interpolate(frame, [0, durationInFrames], [1.1, 1.16])})`,
          }}
        />
      ) : (
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at 50% 40%, ${warna}40 0%, ${WARNA.bg2} 60%, ${WARNA.bg} 100%)`,
          }}
        />
      )}

      {/* Vignette gelap di sekeliling layar */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 50%, rgba(10,5,15,0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Bagian Atas: Tag Momen & Tanggal + Judul Romantis */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: headerProgress,
          transform: `translateY(${interpolate(headerProgress, [0, 1], [-20, 0])}px)`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            fontFamily: fontSans,
            fontWeight: 500,
            fontSize: 24,
            letterSpacing: 6,
            color: WARNA.emas,
            padding: "8px 24px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(12px)",
            textTransform: "uppercase",
          }}
        >
          <span>MOMEN {String(index + 1).padStart(2, "0")}</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span style={{ color: WARNA.krem }}>{momen.tanggal}</span>
        </div>

        <div
          style={{
            fontFamily: fontScript,
            fontSize: 125,
            color: WARNA.krem,
            lineHeight: 1.1,
            marginTop: 12,
            textShadow: `0 0 35px ${warna}cc, 0 4px 15px rgba(0,0,0,0.7)`,
          }}
        >
          {momen.judul}
        </div>
      </div>

      {/* Frame Foto / Video Estetik Modern */}
      <div
        style={{
          position: "absolute",
          top: 410,
          left: 70,
          width: 940,
          height: 1140,
          borderRadius: 44,
          overflow: "hidden",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.22)",
          boxShadow: `0 35px 80px rgba(0,0,0,0.65), 0 0 50px ${warna}44`,
          transform: `translateY(${cardTranslateY}px) scale(${cardScale})`,
          opacity: cardProgress,
          willChange: "transform, opacity",
        }}
      >
        <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
          {media ?? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: `radial-gradient(circle at 50% 45%, ${warna}33, ${WARNA.bg2})`,
                fontFamily: fontSans,
                color: WARNA.krem,
                textAlign: "center",
                padding: 60,
              }}
            >
              <div style={{ fontSize: 130 }}>{isVideo ? "🎥" : "📷"}</div>
              <div style={{ fontSize: 44, fontWeight: 600, marginTop: 20 }}>
                {isVideo ? "Video kalian di sini" : "Foto kalian di sini"}
              </div>
              <div style={{ fontSize: 28, opacity: 0.7, marginTop: 14, maxWidth: 600 }}>
                Taruh file di public/{isVideo ? "video" : "foto"}/ lalu isi nama filenya
              </div>
            </div>
          )}

          {/* Gradasi lembut di bagian bawah frame agar terlihat sinematik */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 35%, rgba(0,0,0,0.3) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Kilau hangat yang melintas halus di atas foto */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: `${lightLeakX}%`,
              width: "45%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,214,165,0.18) 50%, transparent 100%)",
              transform: "skewX(-20deg)",
              pointerEvents: "none",
              mixBlendMode: "screen",
            }}
          />
        </div>
      </div>

      {/* Caption teks kata per kata di bawah (Spotify / Reels lyrics style) */}
      <div
        style={{
          position: "absolute",
          top: 1610,
          left: 60,
          right: 60,
          padding: "16px 30px",
          borderRadius: 24,
          background: "rgba(10,5,15,0.45)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <AnimatedWords
          text={momen.caption}
          delay={16}
          stagger={3}
          style={{
            fontFamily: fontSans,
            fontWeight: 400,
            fontSize: 44,
            color: WARNA.krem,
            textAlign: "center",
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
