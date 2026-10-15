import { Easing, interpolate, useCurrentFrame } from "remotion";

/** Teks animasi lirik/caption yang muncul kata per kata dengan sangat halus */
export const AnimatedWords: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, stagger = 3, duration = 16, style }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ").filter(Boolean);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        lineHeight: 1.5,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const start = delay + i * stagger;
        const progress = interpolate(frame, [start, start + duration], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1), // ultra-smooth ease-out
        });

        const translateY = interpolate(progress, [0, 1], [18, 0]);
        const blur = interpolate(progress, [0, 1], [8, 0]);
        const scale = interpolate(progress, [0, 1], [0.96, 1]);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              opacity: progress,
              transform: `translateY(${translateY}px) scale(${scale})`,
              filter: blur > 0.1 ? `blur(${blur}px)` : "none",
              willChange: "transform, opacity, filter",
            }}
          >
            {w}
          </span>
        );
      })}
    </div>
  );
};
