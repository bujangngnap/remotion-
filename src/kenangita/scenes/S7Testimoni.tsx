import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { Sfx } from "../components/SceneShell";
import { KenangitaProps } from "../config";
import { C, fontSans, SFX } from "../theme";

export const S7Testimoni: React.FC<KenangitaProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVert = height > width;

  // Countdown 20 to 0
  const countdownProgress = interpolate(frame, [0, 45], [20, 0], { extrapolateRight: "clamp" });
  const displayCount = Math.ceil(countdownProgress);



  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      
      {/* Top Countdown */}
      <div style={{ display: "flex", flexDirection: isVert ? "column" : "row", alignItems: "center", gap: isVert ? 15 : 30, marginTop: isVert ? -250 : -150 }}>
        <Sfx src={SFX.beep} at={0} />
        <Sfx src={SFX.beep} at={10} />
        <Sfx src={SFX.beep} at={20} />
        <Sfx src={SFX.beep} at={30} />
        <Sfx src={SFX.beep} at={40} />
        <Sfx src={SFX.ding} at={45} />
        
        <div style={{ fontSize: isVert ? 150 : 120, fontFamily: fontSans, fontWeight: 900, color: C.pinkDeep, width: isVert ? "auto" : 150, textAlign: isVert ? "center" : "right" }}>
          {displayCount}
        </div>
        <div style={{ fontSize: isVert ? 50 : 60, fontFamily: fontSans, fontWeight: 700, color: C.ink, textAlign: "center", maxWidth: isVert ? "80%" : "none" }}>
          detik, foto langsung jadi! 📸
        </div>
      </div>

      {/* Testimonial Bubbles */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        width: isVert ? "90%" : "80%",
        marginTop: 40
      }}>
        {props.testimoni.map((testi, index) => {
          const start = 30 + index * 20;
          const scale = spring({ fps, frame: frame - start, config: { damping: 12 } });
          const typeProgress = Math.floor(interpolate(frame, [start + 10, start + 40], [0, testi.quote.length], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }));
          const visibleQuote = testi.quote.slice(0, typeProgress);

          return (
            <Sequence key={index} from={start} layout="none">
              <div style={{
                width: "100%",
                backgroundColor: C.white,
                borderRadius: 40,
                padding: isVert ? 25 : 40,
                boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                transform: `scale(${scale})`,
                display: "flex",
                flexDirection: "column",
                gap: 15
              }}>
                {/* Stars */}
                <div style={{ display: "flex", gap: 5 }}>
                  {[0, 1, 2, 3, 4].map(i => (
                    <Sequence key={i} from={start + i * 3} layout="none">
                      <Sfx src={SFX.sparkle} at={0} />
                      <div style={{ fontSize: isVert ? 30 : 40, color: C.yellow, transform: `scale(${spring({ fps, frame: frame - start - i * 3 })})` }}>
                        ★
                      </div>
                    </Sequence>
                  ))}
                </div>

                <div style={{ fontSize: isVert ? 24 : 32, fontFamily: fontSans, fontStyle: "italic", color: C.inkSoft, minHeight: isVert ? 80 : 80 }}>
                  "{visibleQuote}"
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  <div style={{
                    width: isVert ? 50 : 60, height: isVert ? 50 : 60, borderRadius: 30, backgroundColor: C.pinkDeep,
                    display: "flex", justifyContent: "center", alignItems: "center",
                    fontSize: isVert ? 24 : 28, fontFamily: fontSans, fontWeight: "bold", color: "white"
                  }}>
                    {testi.name[0]}
                  </div>
                  <div style={{ fontSize: isVert ? 24 : 28, fontFamily: fontSans, fontWeight: 700, color: C.ink }}>
                    {testi.name}
                  </div>
                </div>
              </div>
            </Sequence>
          );
        })}
      </div>

    </AbsoluteFill>
  );
};
