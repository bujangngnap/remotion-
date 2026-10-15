import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Audio } from "remotion";
import { KenangitaProps } from "../config";
import { Sfx } from "../components/SceneShell";
import { C, fontSans, SFX } from "../theme";
import { Pill } from "../components/Pill";

export const S6Kenapa: React.FC<KenangitaProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVert = height > width;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      
      <div style={{ position: "absolute", top: isVert ? 150 : 100, fontFamily: fontSans, fontSize: isVert ? 50 : 60, fontWeight: 800, color: C.ink }}>
        kenapa harus kenangita? 💖
      </div>

      <div style={{ display: "flex", flexWrap: isVert ? "wrap" : "nowrap", justifyContent: "center", gap: isVert ? 20 : 30, marginTop: isVert ? 200 : 100, padding: isVert ? "0 40px" : 0 }}>
        {props.fitur.map((f, i) => {
          const start = i * 20;
          const s = spring({ fps, frame: frame - start, config: { damping: 12 } });
          
          return (
            <Sequence key={i} from={start} layout="none">
              <Sfx src={SFX.pop} at={0} />
              {i === 3 && <Sfx src={SFX.tada} at={0} />}
              
              <div style={{
                width: isVert ? 420 : 350,
                height: isVert ? 400 : 500,
                backgroundColor: C.white,
                borderRadius: 30,
                padding: isVert ? 30 : 40,
                boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transform: `scale(${s}) translateY(${interpolate(s, [0, 1], [100, 0])}px)`
              }}>
                <div style={{ fontSize: isVert ? 60 : 80, marginBottom: isVert ? 10 : 20 }}>
                  {i === 0 && "⏱️"}
                  {i === 1 && "👯‍♂️"}
                  {i === 2 && "🎩"}
                  {i === 3 && "☁️"}
                </div>
                
                <h3 style={{ fontFamily: fontSans, fontSize: 36, color: C.ink, marginBottom: 10, lineHeight: 1.2 }}>
                  {f.title}
                </h3>
                <p style={{ fontFamily: fontSans, fontSize: 24, color: C.gray, flex: 1 }}>
                  {f.desc}
                </p>

                <Pill text={f.tag} bgColor={C.pinkLight} textColor={C.pinkDeep} style={{ fontSize: 20 }} />
              </div>
            </Sequence>
          );
        })}
      </div>

    </AbsoluteFill>
  );
};
