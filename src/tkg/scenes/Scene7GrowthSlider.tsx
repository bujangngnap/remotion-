import React from "react";
import { useCurrentFrame } from "remotion";
import { GrowthSlider } from "../components/GrowthSlider";

export const Scene7GrowthSlider: React.FC = () => {
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
      <GrowthSlider relativeFrame={frame} />
    </div>
  );
};
