import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const BoothMascot: React.FC<{ action?: "idle" | "surprised" | "happy" | "waving"; style?: React.CSSProperties }> = ({ action = "idle", style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bounce = interpolate(Math.sin(frame / 6), [-1, 1], [0, -10]);
  const rotation = action === "waving" ? interpolate(Math.sin(frame / 4), [-1, 1], [-15, 15]) : 0;
  
  // Blink logic
  const isBlinking = frame % 90 > 85;

  return (
    <div style={{ ...style, transform: `translateY(${bounce}px) rotate(${rotation}deg)` }}>
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        
        {/* Background App-like Squircle */}
        <rect x="10" y="10" width="180" height="180" rx="55" fill="#151419" />

        {/* Left Ear */}
        <g transform="translate(65, 75) rotate(-6)">
          <rect x="-13" y="-55" width="26" height="70" rx="13" fill="#FFFFFF" />
          <rect x="-7" y="-47" width="14" height="55" rx="7" fill="#FF8DA1" />
        </g>
        
        {/* Right Ear */}
        <g transform="translate(135, 75) rotate(6)">
          <rect x="-13" y="-55" width="26" height="70" rx="13" fill="#FFFFFF" />
          <rect x="-7" y="-47" width="14" height="55" rx="7" fill="#FF8DA1" />
        </g>

        {/* Head */}
        <circle cx="100" cy="120" r="70" fill="#282631" />

        {/* Cheeks */}
        <ellipse cx="46" cy="135" rx="16" ry="11" fill="#B33E56" />
        <ellipse cx="154" cy="135" rx="16" ry="11" fill="#B33E56" />

        {/* Eyes */}
        {!isBlinking && action !== "happy" ? (
          <>
            {/* Left Eye */}
            <circle cx="68" cy="112" r="24" fill="#FDD02B" />
            <circle cx="68" cy="112" r="13" fill="#151419" />
            <circle cx="73" cy="105" r="5" fill="#FFFFFF" />
            
            {/* Right Eye */}
            <circle cx="132" cy="112" r="24" fill="#FDD02B" />
            <circle cx="132" cy="112" r="13" fill="#151419" />
            <circle cx="137" cy="105" r="5" fill="#FFFFFF" />
          </>
        ) : action === "happy" ? (
          <>
            <path d="M 45 112 Q 68 90 91 112" fill="none" stroke="#FDD02B" strokeWidth="8" strokeLinecap="round" />
            <path d="M 109 112 Q 132 90 155 112" fill="none" stroke="#FDD02B" strokeWidth="8" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M 45 112 Q 68 125 91 112" fill="none" stroke="#FDD02B" strokeWidth="8" strokeLinecap="round" />
            <path d="M 109 112 Q 132 125 155 112" fill="none" stroke="#FDD02B" strokeWidth="8" strokeLinecap="round" />
          </>
        )}

        {/* Nose */}
        <path d="M 96 135 L 104 135 L 100 140 Z" fill="#FF8DA1" stroke="#FF8DA1" strokeWidth="2" strokeLinejoin="round" />

        {/* Mouth */}
        {action === "surprised" ? (
          <circle cx="100" cy="150" r="10" fill="#FF8DA1" />
        ) : action === "happy" ? (
          <path d="M 85 144 Q 100 167 115 144" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        ) : (
          <path d="M 85 145 Q 92.5 154 100 145 Q 107.5 154 115 145" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
};
