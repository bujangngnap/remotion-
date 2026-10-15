import React from "react";
import { useCurrentFrame } from "remotion";
import { MapCard } from "../components/MapCard";

export const Scene5MapMagelang: React.FC = () => {
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
      <MapCard relativeFrame={frame} durationFrames={125} />
    </div>
  );
};
