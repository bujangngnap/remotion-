import React from "react";
import { useCurrentFrame } from "remotion";
import { BottomSheet } from "../components/BottomSheet";

export const Scene6BottomSheet: React.FC = () => {
  const frame = useCurrentFrame(); // 0 to 35 (f175 - 210)

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
      <BottomSheet relativeFrame={frame} />
    </div>
  );
};
