import React from "react";
import { Img, staticFile } from "remotion";

export interface EmojiCircleProps {
  emoji: "beer" | "burger" | "coffee" | "soccer" | "party";
  bgColor: string;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const EmojiCircle: React.FC<EmojiCircleProps> = ({
  emoji,
  bgColor,
  size = 135,
  style,
  className,
}) => {
  const iconSize = Math.round(size * 0.56);

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 10px 28px rgba(15, 24, 55, 0.14), inset 0 2px 4px rgba(255, 255, 255, 0.4)",
        border: "2.5px solid rgba(255, 255, 255, 0.55)",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <Img
        src={staticFile(`promo/emojis/${emoji}.svg`)}
        style={{
          width: iconSize,
          height: iconSize,
          objectFit: "contain",
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.1))",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
