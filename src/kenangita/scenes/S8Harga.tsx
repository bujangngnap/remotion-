import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Audio } from "remotion";
import { KenangitaProps } from "../config";
import { Sfx } from "../components/SceneShell";
import { C, fontSans, SFX } from "../theme";
import { Pill } from "../components/Pill";

export const S8Harga: React.FC<KenangitaProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVert = height > width;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      
      <div style={{ position: "absolute", top: 100, fontFamily: fontSans, fontSize: 60, fontWeight: 800, color: C.ink }}>
        Pilih Paketmu!
      </div>

      <div style={{ display: "flex", flexDirection: isVert ? "column" : "row", gap: isVert ? 30 : 50, marginTop: isVert ? -100 : 50 }}>
        {props.paket.map((p, i) => {
          const start = i * 20;
          const s = spring({ fps, frame: frame - start, config: { damping: 15, stiffness: 100 } });
          const rotateY = interpolate(s, [0, 1], [90, 0]);
          
          // Format price with dots
          const formatPrice = (num: number) => "Rp" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          
          // Counter roll logic
          const isCounting = frame - start < 45 && frame > start;
          const displayPrice = isCounting ? formatPrice(Math.floor(interpolate(frame - start, [0, 45], [0, p.price]))) : formatPrice(p.price);

          return (
            <Sequence key={i} from={start} layout="none">
              <Sfx src={SFX.pop} at={0} />
              <Sfx src={SFX.chaChing} at={45} />

              <div style={{
                position: "relative",
                width: isVert ? 550 : 450,
                backgroundColor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(20px)",
                borderRadius: 40,
                padding: isVert ? "40px 30px" : "60px 40px",
                border: p.isPopular ? `6px solid ${C.pinkDeep}` : `2px solid ${C.white}`,
                boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transform: `perspective(1000px) rotateY(${rotateY}deg)`
              }}>
                {p.isPopular && (
                  <Sequence from={start + 15} layout="none">
                    <Sfx src={SFX.pop} at={0} />
                    <div style={{
                      position: "absolute",
                      top: -30,
                      right: -30,
                      transform: `scale(${spring({ fps, frame: frame - (start + 15), config: { damping: 12 } })}) rotate(${frame * 2}deg)`
                    }}>
                      <svg width="100" height="100" viewBox="0 0 100 100">
                        <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill={C.yellow} />
                      </svg>
                      <div style={{
                        position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center",
                        fontFamily: fontSans, fontWeight: 900, fontSize: 16, color: C.ink, transform: `rotate(${-frame * 2}deg)`
                      }}>
                        POPULER
                      </div>
                    </div>
                  </Sequence>
                )}

                <h3 style={{ fontFamily: fontSans, fontSize: 40, fontWeight: 800, color: C.ink, marginBottom: 10 }}>
                  {p.name}
                </h3>
                <div style={{ fontFamily: fontSans, fontSize: 32, color: C.gray, marginBottom: 30 }}>
                  ({p.dur})
                </div>
                <div style={{ fontFamily: fontSans, fontSize: 60, fontWeight: 900, color: C.pinkDeep }}>
                  {displayPrice}
                </div>
              </div>
            </Sequence>
          );
        })}
      </div>





    </AbsoluteFill>
  );
};
