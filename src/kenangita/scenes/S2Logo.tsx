import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, Img, staticFile } from "remotion";
import { KenangitaProps } from "../config";
import { C, SFX } from "../theme";
import { Sfx } from "../components/SceneShell";
import { Pill } from "../components/Pill";

export const S2Logo: React.FC<KenangitaProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo spring
  const logoScale = spring({ fps, frame: frame - 15, config: { damping: 12, stiffness: 200 } });

  // Chip spring
  const chipScale = spring({ fps, frame: frame - 30, config: { damping: 12, stiffness: 200 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Sequence from={15} layout="none">
        <Sfx src={SFX.pop} at={0} />
        <div style={{ transform: `scale(${logoScale})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
          <Img src={staticFile("kenangita/logo.png")} style={{ width: 600, height: "auto" }} />
          
          <Sequence from={15} layout="none">
            <Sfx src={SFX.sparkle} at={0} />
            <div style={{ transform: `scale(${chipScale})` }}>
              <Pill
                text={props.chip}
                bgColor={C.pinkLight}
                textColor={C.pinkDeep}
                style={{ fontSize: 32, padding: "16px 32px" }}
              />
            </div>
          </Sequence>
        </div>
      </Sequence>

    </AbsoluteFill>
  );
};
