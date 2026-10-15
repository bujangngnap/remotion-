import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Audio } from "remotion";
import { KenangitaProps } from "../config";
import { Sfx } from "../components/SceneShell";
import { C, fontSans, fontHand, SFX } from "../theme";
import { Pill } from "../components/Pill";

export const S4Subacara: React.FC<KenangitaProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVert = height > width;

  const words = props.subHeadline.split(" ");

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      
      {/* Subheadline */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: isVert ? "90%" : "70%",
        gap: "20px 15px",
        fontFamily: fontSans,
        fontSize: isVert ? 50 : 60,
        fontWeight: 700,
        color: C.ink,
        textAlign: "center"
      }}>
        {words.map((w, i) => {
          const delay = i * 5;
          const s = spring({ fps, frame: frame - delay, config: { damping: 12 } });
          const isHighlight = w.includes("lucu") || w.includes("aesthetic");
          
          return (
            <span key={i} style={{
              transform: `scale(${s})`,
              display: "inline-block",
              color: isHighlight ? C.pinkDeep : C.ink,
              position: "relative"
            }}>
              {isHighlight && (
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: -5,
                  right: -5,
                  height: "40%",
                  backgroundColor: C.yellow,
                  opacity: 0.4,
                  zIndex: -1,
                  transform: `scaleX(${spring({ fps, frame: frame - delay - 2 })})`,
                  transformOrigin: "left"
                }} />
              )}
              {w}
            </span>
          );
        })}
      </div>

      {/* Event Chips */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "80%",
        gap: 20,
        marginTop: 60
      }}>
        {props.acara.map((ac, i) => {
          const start = 40 + i * 5;
          const s = spring({ fps, frame: frame - start, config: { damping: 10 } });
          return (
            <Sequence key={i} from={start} layout="none">
              <Sfx src={SFX.pop} at={0} />
              <div style={{ transform: `scale(${s}) rotate(${interpolate(Math.sin(i), [-1, 1], [-5, 5])}deg)` }}>
                <Pill text={ac} bgColor={C.white} textColor={C.ink} style={{ fontSize: 32, border: `4px solid ${C.pinkSoft}`, padding: "12px 24px" }} />
              </div>
            </Sequence>
          );
        })}
      </div>

      {/* Note hand */}
      <Sequence from={80}>
        <div style={{
          position: "absolute",
          bottom: isVert ? "10%" : "15%",
          right: isVert ? "5%" : "15%",
          fontFamily: fontHand,
          fontSize: isVert ? 45 : 60,
          color: C.purple,
          transform: `scale(${spring({ fps, frame: frame - 80, config: { damping: 10 } })}) rotate(-10deg)`
        }}>
          kami yang datang ke acaramu!
        </div>
      </Sequence>

    </AbsoluteFill>
  );
};
