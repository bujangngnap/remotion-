import React from "react";
import { C, fontSans } from "../theme";

/** Kapsul label kecil, mis. "virtual photobox studio • v2.0" */
export const Pill: React.FC<{
  children: React.ReactNode;
  fontSize?: number;
  dotColor?: string;
  dotScale?: number;
  style?: React.CSSProperties;
}> = ({ children, fontSize = 30, dotColor = C.pink, dotScale = 1, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: fontSize * 0.5,
      padding: `${fontSize * 0.45}px ${fontSize * 0.95}px`,
      borderRadius: 999,
      background: "rgba(255,255,255,0.85)",
      border: `2px solid ${C.pinkLight}`,
      boxShadow: "0 10px 30px rgba(233,30,99,0.12)",
      fontFamily: fontSans,
      fontWeight: 500,
      fontSize,
      color: C.gray,
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
    {children}
  </div>
);
