import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Audio } from "remotion";
import { KenangitaProps } from "../config";
import { Sfx } from "../components/SceneShell";
import { C, fontSans, fontHand, SFX } from "../theme";
import { PhotoStrip } from "../components/PhotoStrip";
import { Pill } from "../components/Pill";

export const S5Langkah: React.FC<KenangitaProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVert = height > width;

  // Photo filling logic (shutter every 15 frames starting from 60)
  const p1 = frame > 60;
  const p2 = frame > 75;
  const p3 = frame > 90;
  const p4 = frame > 105;
  const progress = p1 ? (p2 ? (p3 ? (p4 ? 4 : 3) : 2) : 1) : 0;
  
  // Print strip animation
  const printSpring = spring({ fps, frame: frame - 120, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      
      <div style={{
        display: "flex",
        flexDirection: isVert ? "column" : "row",
        width: isVert ? "95%" : "90%",
        height: isVert ? "85%" : "70%",
        backgroundColor: C.white,
        borderRadius: 40,
        boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
        overflow: "hidden"
      }}>
        {/* LEFT SIDE: 3 Langkah */}
        <div style={{ flex: 1, padding: isVert ? 30 : 60, display: "flex", flexDirection: "column", justifyContent: "center", gap: isVert ? 15 : 30 }}>
          <h2 style={{ fontFamily: fontSans, fontSize: isVert ? 40 : 50, color: C.ink, marginBottom: 20 }}>
            3 langkah, langsung jadi.
          </h2>
          {props.langkah.map((l, i) => {
            const start = 15 + i * 15;
            const s = spring({ fps, frame: frame - start, config: { damping: 12 } });
            return (
              <Sequence key={i} from={start} layout="none">
                <Sfx src={SFX.tada} at={0} />
                <div style={{ display: "flex", alignItems: "center", gap: 20, transform: `translateX(${interpolate(s, [0, 1], [-50, 0])}px)`, opacity: s }}>
                  <div style={{ width: isVert ? 30 : 40, height: isVert ? 30 : 40, borderRadius: 20, backgroundColor: C.pinkDeep, display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontWeight: "bold", fontSize: isVert ? 14 : 16 }}>
                    ✓
                  </div>
                  <div style={{ fontFamily: fontSans, fontSize: isVert ? 24 : 32, color: C.inkSoft }}>
                    {l}
                  </div>
                </div>
              </Sequence>
            );
          })}
        </div>

        {/* RIGHT SIDE: Photobooth Screen + Strip */}
        <div style={{ flex: 1, backgroundColor: C.pinkPale, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
          
          <Sequence from={60}>

          </Sequence>

          {/* Dummy screen */}
          <div style={{
            position: "absolute",
            width: "70%",
            height: "80%",
            border: `10px solid ${C.pinkDeep}`,
            borderRadius: 20,
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <div style={{ fontSize: 100 }}>📸</div>
            
            {progress === 4 && (
              <Sequence from={110} layout="none">
                <Sfx src={SFX.ding} at={0} />
                <div style={{ position: "absolute", transform: `scale(${spring({ fps, frame: frame - 110 })})` }}>
                  <Pill text="4/4 selesai! 🎉" bgColor={C.yellow} textColor={C.ink} style={{ fontSize: 30 }} />
                </div>
              </Sequence>
            )}
          </div>

          {/* Strip printing */}
          <Sequence from={120}>
            <Sfx src={SFX.printer} at={0} />
            <div style={{
              position: "absolute",
              right: 20,
              top: 50,
              transform: `translateY(${interpolate(printSpring, [0, 1], [400, 0])}px) rotate(5deg) scale(${interpolate(printSpring, [0, 1], [0.8, 1])})`,
              zIndex: 10
            }}>
              <PhotoStrip progress={4} />
            </div>
          </Sequence>

        </div>
      </div>

    </AbsoluteFill>
  );
};
