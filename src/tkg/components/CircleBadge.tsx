import React from "react";
import { Img, staticFile } from "remotion";

export interface CircleBadgeProps {
  id: "creative" | "media" | "digital" | "kenangita" | "legal";
  bgColor: string;
  size?: number;
  logoPath?: string;
  emoji?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const CircleBadge: React.FC<CircleBadgeProps> = ({
  id,
  bgColor,
  size = 135,
  logoPath,
  emoji,
  style,
  className,
}) => {
  const iconSize = Math.round(size * 0.54);

  // If logoPath exists in public/logos/..., Img will load it
  const actualLogoPath = logoPath || `logos/${id}.svg`;

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
        boxShadow: "0 12px 30px rgba(13, 13, 13, 0.18), inset 0 2px 4px rgba(255, 255, 255, 0.4)",
        border: "2.5px solid rgba(255, 255, 255, 0.5)",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        ...style,
      }}
    >
      <Img
        src={staticFile(actualLogoPath)}
        style={{
          width: iconSize,
          height: iconSize,
          objectFit: "contain",
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))",
          pointerEvents: "none",
        }}
        onError={() => {
          // Handled gracefully if image fails
        }}
      />
    </div>
  );
};
