import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";

export const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

export const Heart: React.FC<{ size: number; color: string; style?: React.CSSProperties }> = ({
  size,
  color,
  style,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ overflow: "visible", ...style }}>
    <path d={HEART_PATH} fill={color} />
  </svg>
);

/** Partikel estetik: bokeh lembut, butiran cahaya emas, dan hati mini halus */
export const FloatingHearts: React.FC<{ color: string; jumlah?: number }> = ({ color, jumlah = 24 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {new Array(jumlah).fill(0).map((_, i) => {
        const tipe = i % 4; // 0: bokeh bulat, 1: sparkle bintang, 2: hati mini, 3: debu cahaya
        const seed = `p_${i}`;
        const speed = 0.8 + random(`${seed}_v`) * 1.4;
        const startX = random(`${seed}_x`) * width;
        const offset = random(`${seed}_o`) * (height + 200);
        const travel = height + 200;
        const y = height + 100 - ((frame * speed + offset) % travel);
        const sway = Math.sin((frame * 0.03) + i * 1.5) * (15 + (i % 3) * 10);
        const progress = (y + 100) / travel;
        // Fade in lembut di bawah, fade out lembut di atas
        const opacity = Math.sin(Math.PI * Math.min(Math.max(1 - progress, 0), 1));

        if (tipe === 0) {
          // Bokeh bulat lembut bercahaya
          const size = 30 + random(`${seed}_s`) * 90;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: startX + sway,
                top: y,
                width: size,
                height: size,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${color}99 0%, ${color}22 50%, transparent 70%)`,
                opacity: opacity * 0.45,
                filter: "blur(6px)",
              }}
            />
          );
        }

        if (tipe === 1) {
          // Sparkle bintang emas kecil
          const size = 10 + random(`${seed}_s`) * 14;
          const rotate = (frame * 1.5 + i * 40) % 360;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: startX + sway,
                top: y,
                width: size,
                height: size,
                opacity: opacity * 0.75,
                transform: `rotate(${rotate}deg)`,
                filter: `drop-shadow(0 0 6px #ffd6a5)`,
              }}
            >
              <svg viewBox="0 0 24 24" width={size} height={size}>
                <polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9" fill="#ffd6a5" />
              </svg>
            </div>
          );
        }

        if (tipe === 2) {
          // Hati mini halus
          const size = 16 + random(`${seed}_s`) * 18;
          return (
            <Heart
              key={i}
              size={size}
              color={color}
              style={{
                position: "absolute",
                left: startX + sway,
                top: y,
                opacity: opacity * 0.55,
                transform: `rotate(${Math.sin((frame + i * 15) * 0.05) * 15}deg)`,
                filter: `drop-shadow(0 0 8px ${color}aa)`,
              }}
            />
          );
        }

        // Debu cahaya hangat
        const size = 4 + random(`${seed}_s`) * 6;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: startX + sway,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: "#fff5f8",
              opacity: opacity * 0.8,
              boxShadow: `0 0 8px 2px ${color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
