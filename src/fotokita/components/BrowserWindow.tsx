import React from "react";
import { C, fontSans } from "../theme";

/** Jendela browser mockup dengan tab bar & URL "kenangita.id" */
export const BrowserWindow: React.FC<{
  width: number;
  height: number;
  url?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ width, height, url = "kenangita.id", children, style }) => {
  const BAR = 64;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 30,
        background: C.white,
        overflow: "hidden",
        boxShadow: "0 50px 120px rgba(233,30,99,0.22), 0 12px 30px rgba(23,19,28,0.08)",
        border: `2px solid ${C.grayLight}`,
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      <div
        style={{
          height: BAR,
          flexShrink: 0,
          background: "#FBF7FA",
          borderBottom: `2px solid ${C.grayLight}`,
          display: "flex",
          alignItems: "center",
          padding: "0 26px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {[C.pink, C.yellow, C.lavender].map((c) => (
            <div key={c} style={{ width: 18, height: 18, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            height: 40,
            padding: "0 28px",
            minWidth: 420,
            borderRadius: 999,
            background: C.white,
            border: `2px solid ${C.grayLight}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            fontFamily: fontSans,
            fontSize: 20,
            fontWeight: 500,
            color: C.gray,
          }}
        >
          <svg width={16} height={18} viewBox="0 0 16 18">
            <rect x={1} y={8} width={14} height={10} rx={3} fill={C.pink} />
            <path d="M4 8 V5.5 a4 4 0 0 1 8 0 V8" stroke={C.pink} strokeWidth={2.4} fill="none" />
          </svg>
          {url}
        </div>
      </div>
      <div style={{ flex: 1, position: "relative" }}>{children}</div>
    </div>
  );
};
