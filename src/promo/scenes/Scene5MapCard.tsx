import React from "react";
import { useCurrentFrame } from "remotion";
import { MapCard } from "../components/MapCard";

export const Scene5MapCard: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 42 (f133 - 175)

  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1080,
        left: 0,
        top: 0,
      }}
    >
      <MapCard relativeFrame={frame} />
    </div>
  );
};
