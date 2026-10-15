import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Audio, Img, staticFile } from "remotion";
import { KenangitaProps } from "../config";
import { Sfx } from "../components/SceneShell";
import { C, fontSans, fontHand, SFX } from "../theme";
import { Pill } from "../components/Pill";
import { PhotoStrip } from "../components/PhotoStrip";

// WhatsApp SVG Icon
const WaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" viewBox="0 0 16 16">
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
  </svg>
);

// PC Cursor SVG Icon
const CursorIcon = () => (
  <svg width="70" height="70" viewBox="0 0 32 32" style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.15))" }}>
    <path d="M5 5 L5 25 L10 20 L15 30 L18 28 L13 18 L20 18 Z" fill="white" stroke="#17131C" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

// Basic confetti logic
const Confetti: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%" }}>
      {new Array(30).fill(0).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const velocity = 20 + (i % 5) * 10;
        const t = frame / fps;
        const x = velocity * t * 30 * Math.cos(angle);
        const y = velocity * t * 30 * Math.sin(angle) + 0.5 * 800 * t * t;
        const colors = [C.pinkDeep, C.yellow, C.lavender, C.mint];
        
        return (
          <div key={i} style={{
            position: "absolute",
            width: 20, height: 20,
            backgroundColor: colors[i % 4],
            transform: `translate(${x}px, ${y}px) rotate(${frame * (i % 5)}deg)`,
            opacity: interpolate(frame, [0, 60], [1, 0])
          }} />
        );
      })}
    </div>
  );
};

export const S9Outro: React.FC<KenangitaProps> = (props) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVert = height > width;

  // CTA Button logic (0 to 60)
  const ctaScale = spring({ fps, frame, config: { damping: 12 } });
  const cursorX = interpolate(frame, [15, 30], [200, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const cursorY = interpolate(frame, [15, 30], [200, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const isClicked = frame >= 30;

  // End card appears at 60
  const endCardSpring = spring({ fps, frame: frame - 60, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      
      {/* INITIAL CTA BUTTON */}
      {frame < 60 && (
        <div style={{ position: "relative", transform: `scale(${ctaScale})` }}>
          <div style={{
            backgroundColor: isClicked ? "#25D366" : C.ink, // Turns WA green on click
            color: "white",
            padding: "30px 60px",
            borderRadius: 60,
            fontFamily: fontSans,
            fontSize: 60,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 20,
            transform: `scale(${isClicked ? 1.05 : 1})`,
            transition: "all 0.1s ease" // We use a tiny transition or just immediate
          }}>
            {isClicked ? (
              <>
                <WaIcon />
                <span>{props.whatsapp}</span>
              </>
            ) : (
              props.cta
            )}
          </div>
          
          {/* Cursor */}
          <div style={{
            position: "absolute",
            right: 20,
            bottom: -20,
            fontSize: 80,
            transform: `translate(${cursorX}px, ${cursorY}px) scale(${isClicked ? 0.9 : 1})`,
            zIndex: 10
          }}>
            <CursorIcon />
          </div>
          
          <Sfx src={SFX.mouseClick} at={30} />
        </div>
      )}

      {/* END CARD */}
      <Sequence from={60}>
        <Sfx src={SFX.confettiPop} at={0} />
        <Sfx src={SFX.partyHorn} at={0} />
        
        <Sequence layout="none"><Confetti /></Sequence>
        <Sequence from={15} layout="none"><Confetti /></Sequence>

        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: endCardSpring }}>
          
          {/* Strips bg */}
          <div style={{ position: "absolute", left: isVert ? -250 : -100, transform: "rotate(15deg) scale(0.8)", opacity: isVert ? 0.5 : 1 }}>
            <PhotoStrip progress={4} />
          </div>
          <div style={{ position: "absolute", right: isVert ? -250 : -100, transform: "rotate(-15deg) scale(0.8)", opacity: isVert ? 0.5 : 1 }}>
            <PhotoStrip progress={4} />
          </div>

          <Img src={staticFile("kenangita/logo.png")} style={{ width: isVert ? 500 : 700, height: "auto", marginBottom: 30 }} />
          
          <Pill text={props.chip} bgColor={C.pinkLight} textColor={C.pinkDeep} style={{ fontSize: isVert ? 24 : 30, marginBottom: 50 }} />

          {/* Social Media & Contact */}
          <div style={{ display: "flex", flexDirection: isVert ? "column" : "row", gap: isVert ? 15 : 30, fontFamily: fontSans, fontSize: isVert ? 26 : 32, fontWeight: 700, color: C.inkSoft, backgroundColor: C.white, padding: isVert ? "30px" : "20px 40px", borderRadius: 40, boxShadow: "0 10px 30px rgba(0,0,0,0.05)", textAlign: "center" }}>
            <div>IG: {props.instagram}</div>
            {!isVert && <div style={{ width: 4, height: 40, backgroundColor: C.grayLight }} />}
            <div>TikTok: {props.tiktok}</div>
            {!isVert && <div style={{ width: 4, height: 40, backgroundColor: C.grayLight }} />}
            <div>{props.website}</div>
          </div>

          <div style={{ fontFamily: fontHand, fontSize: isVert ? 40 : 60, color: C.purple, marginTop: 40, transform: "rotate(-5deg)", textAlign: "center" }}>
            {props.penutup}
          </div>

        </AbsoluteFill>
      </Sequence>

    </AbsoluteFill>
  );
};
