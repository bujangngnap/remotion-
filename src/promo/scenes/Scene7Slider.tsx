import React from "react";
import { useCurrentFrame } from "remotion";
import { Slider } from "../components/Slider";

export const Scene7Slider: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 59 (f210 - 270)

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
      <Slider relativeFrame={frame} />
    </div>
  );
};
