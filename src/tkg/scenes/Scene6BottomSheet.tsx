import React from "react";
import { useCurrentFrame } from "remotion";
import { MapCard } from "../components/MapCard";
import { BottomSheet } from "../components/BottomSheet";

export const Scene6BottomSheet: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Zoomed Map Card with Peach Bezel #FFD0A0 */}
      <MapCard
        relativeFrame={frame}
        isZoomedBackground={true}
        showPeachBezel={true}
      />

      {/* Morphing Bottom Sheet */}
      <BottomSheet relativeFrame={frame} />
    </div>
  );
};
