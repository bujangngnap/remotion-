import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Audio } from "remotion";
import { KenangitaProps } from "../config";
import { C, fontSans, SFX } from "../theme";
import { Sfx } from "../components/SceneShell";

export const S1Opening: React.FC<KenangitaProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const count = frame < 30 ? 3 : frame < 60 ? 2 : frame < 90 ? 1 : 0;
  const countScale = count > 0 ? spring({ fps, frame: frame % 30, config: { damping: 10, stiffness: 200 } }) : 0;
  
  // Flash effect at the end
  const flash = interpolate(frame, [90, 95, 105], [0, 1, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      
      {/* UI Layar Photobooth */}
      <div style={{
        position: "absolute",
        width: "80%",
        height: "70%",
        border: `12px solid ${C.pinkDeep}`,
        borderRadius: 40,
        backgroundColor: "rgba(255,255,255,0.4)",
        boxShadow: "0 0 50px rgba(0,0,0,0.05)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}>
        {/* REC Indicator */}
        <div style={{ position: "absolute", top: 30, left: 40, display: "flex", alignItems: "center", gap: 15 }}>
          <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "red", opacity: Math.sin(frame / 5) > 0 ? 1 : 0 }} />
          <div style={{ fontFamily: fontSans, fontSize: 32, fontWeight: 700, color: "red" }}>REC</div>
        </div>
        
        {/* 4 SHOTS */}
        <div style={{ position: "absolute", top: 30, right: 40, fontFamily: fontSans, fontSize: 32, fontWeight: 700, color: C.ink }}>
          4 SHOTS
        </div>

        {/* Text bottom */}
        <div style={{ position: "absolute", bottom: 40, fontFamily: fontSans, fontSize: 40, fontWeight: 700, color: C.inkSoft }}>
          angkat pose peace ✌️
        </div>

        {/* Big Countdown */}
        {count > 0 && (
          <Sequence from={0} durationInFrames={90} layout="none">
            <Sfx src={SFX.beep} at={0} />
            <Sfx src={SFX.beep} at={30} />
            <Sfx src={SFX.beep} at={60} />
            <div style={{
              fontSize: 250,
              fontFamily: fontSans,
              fontWeight: 900,
              color: C.pinkDeep,
              transform: `scale(${countScale})`,
              textShadow: "4px 4px 0 white"
            }}>
              {count}
            </div>
          </Sequence>
        )}
      </div>

      {/* Flash */}
      {frame >= 90 && (
        <Sequence from={90}>
          <Sfx src={SFX.fwip} at={90} />
          <AbsoluteFill style={{ backgroundColor: "white", opacity: flash, zIndex: 999 }} />
        </Sequence>
      )}

    </AbsoluteFill>
  );
};
