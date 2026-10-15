import React from "react";
import { C, fontSans } from "../theme";

/** Kapsul label kecil, mis. "virtual photobox studio • v2.0" */
export const Pill: React.FC<{
  children?: React.ReactNode;
  text?: string;
  fontSize?: number;
  dotColor?: string;
  dotScale?: number;
  bgColor?: string;
  textColor?: string;
  style?: React.CSSProperties;
}> = ({ children, text, fontSize = 30, dotColor = C.pink, dotScale = 1, bgColor = "rgba(255,255,255,0.85)", textColor = C.gray, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: fontSize * 0.5,
      padding: `${fontSize * 0.45}px ${fontSize * 0.95}px`,
      borderRadius: 999,
      background: bgColor,
      border: `2px solid ${C.pinkLight}`,
      boxShadow: "0 10px 30px rgba(233,30,99,0.12)",
      fontFamily: fontSans,
      fontWeight: 500,
      fontSize,
      color: textColor,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    <span
      style={{
        width: fontSize * 0.42,
        height: fontSize * 0.42,
        borderRadius: "50%",
        background: dotColor,
        transform: `scale(${dotScale})`,
        boxShadow: `0 0 0 ${fontSize * 0.18}px ${C.pinkPale}`,
      }}
    />
    {text || children}
  </div>
);
