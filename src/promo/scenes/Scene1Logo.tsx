import React from "react";
import { WordmarkPinned } from "../components/WordmarkPinned";

export const Scene1Logo: React.FC = () => {
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
      <WordmarkPinned />
    </div>
  );
};
