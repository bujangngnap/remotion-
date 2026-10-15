import React from "react";
import { interpolate } from "remotion";
import { COLORS } from "../constants";

export interface PromoBackgroundProps {
  frame: number;
}

export const PromoBackground: React.FC<PromoBackgroundProps> = ({ frame }) => {
  // 1. Periwinkle gradient crossfade (f46 - f60)
  const periwinkleOpacity = interpolate(
    frame,
    [46, 55, 60, 64],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 2. Teal -> blue gradient (f61 - f75, peaking around f68)
  const tealOpacity = interpolate(
    frame,
    [61, 67, 71, 75],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1080,
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Base Clean #FCFCFE background with subtle radial lightening at center */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 50% 50%, #FFFFFF 20%, ${COLORS.BG_CLEAN} 100%)`,
        }}
      />

      {/* Periwinkle gradient overlay (#DCE6FF -> #C9D8FA) */}
      {periwinkleOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, ${COLORS.PERIWINKLE_START} 0%, ${COLORS.PERIWINKLE_END} 100%)`,
            opacity: periwinkleOpacity,
          }}
        />
      )}

      {/* Teal -> Blue gradient overlay (#A8F0E8 -> #BCD0FF) */}
      {tealOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `linear-gradient(135deg, ${COLORS.TEAL_GRADIENT_START} 0%, ${COLORS.TEAL_GRADIENT_END} 100%)`,
            opacity: tealOpacity,
          }}
        />
      )}
    </div>
  );
};
