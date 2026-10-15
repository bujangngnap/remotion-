import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";
import { AbsoluteFill, interpolate } from "remotion";

// ============================================================
//  Transisi custom yang lembut: tidak ada potongan kasar,
//  scene baru muncul di atas scene lama dengan blur + zoom halus.
// ============================================================

export type JenisTransisi = "lembut" | "zoomMimpi" | "geserLembut" | "cahaya";

type Props = { jenis: JenisTransisi };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const SoftPresentation: React.FC<TransitionPresentationComponentProps<Props>> = ({
  children,
  presentationDirection,
  presentationProgress: p,
  passedProps,
}) => {
  const masuk = presentationDirection === "entering";
  const { jenis } = passedProps;
  let style: React.CSSProperties = {};

  switch (jenis) {
    case "lembut":
      style = masuk
        ? {
            opacity: p,
            filter: `blur(${interpolate(p, [0, 1], [18, 0])}px)`,
            transform: `scale(${interpolate(p, [0, 1], [1.06, 1])})`,
          }
        : {
            filter: `blur(${interpolate(p, [0, 1], [0, 12])}px)`,
            transform: `scale(${interpolate(p, [0, 1], [1, 1.04])})`,
          };
      break;

    case "zoomMimpi":
      style = masuk
        ? {
            opacity: interpolate(p, [0, 0.6], [0, 1], clamp),
            filter: `blur(${interpolate(p, [0, 1], [24, 0])}px) brightness(${interpolate(p, [0, 1], [1.5, 1])})`,
            transform: `scale(${interpolate(p, [0, 1], [1.25, 1])})`,
          }
        : {
            filter: `blur(${interpolate(p, [0, 1], [0, 16])}px) brightness(${interpolate(p, [0, 1], [1, 1.4])})`,
            transform: `scale(${interpolate(p, [0, 1], [1, 0.9])})`,
          };
      break;

    case "geserLembut":
      style = masuk
        ? {
            opacity: interpolate(p, [0, 0.5], [0, 1], clamp),
            filter: `blur(${interpolate(p, [0, 1], [20, 0])}px)`,
            transform: `translateX(${interpolate(p, [0, 1], [30, 0])}%)`,
          }
        : {
            filter: `blur(${interpolate(p, [0, 1], [0, 14])}px) brightness(${interpolate(p, [0, 1], [1, 0.6])})`,
            transform: `translateX(${interpolate(p, [0, 1], [0, -18])}%)`,
          };
      break;

    case "cahaya":
      // seperti kilau cahaya hangat (light leak)
      style = masuk
        ? {
            opacity: interpolate(p, [0.35, 0.75], [0, 1], clamp),
            filter: `brightness(${interpolate(p, [0.35, 1], [2.2, 1], clamp)}) saturate(${interpolate(p, [0.35, 1], [1.6, 1], clamp)})`,
          }
        : {
            filter: `brightness(${interpolate(p, [0, 0.6], [1, 2.2], clamp)}) saturate(${interpolate(p, [0, 0.6], [1, 1.6], clamp)}) blur(${interpolate(p, [0, 1], [0, 8])}px)`,
          };
      break;
  }

  return (
    <AbsoluteFill style={{ ...style, willChange: "transform, filter, opacity" }}>
      {children}
      {/* Kilau hangat di tengah transisi "cahaya" */}
      {jenis === "cahaya" && masuk && (
        <AbsoluteFill
          style={{
            background: "radial-gradient(circle at 70% 30%, rgba(255,214,165,0.9), rgba(255,107,157,0.4) 40%, transparent 75%)",
            opacity: interpolate(p, [0, 0.5, 1], [0, 0.9, 0]),
            mixBlendMode: "screen",
          }}
        />
      )}
    </AbsoluteFill>
  );
};

export const softTransition = (jenis: JenisTransisi): TransitionPresentation<Props> => ({
  component: SoftPresentation,
  props: { jenis },
});
