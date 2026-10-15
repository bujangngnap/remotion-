import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";

export interface TextRevealProps {
  text: string;
  startFrame: number;
  durationFrames?: number;
  cursorHoldFrames?: number;
  initialText?: string;
  color?: string;
  fontSize?: number;
  fontWeight?: number | string;
  fontFamily?: string;
  letterSpacing?: string;
  blockColor?: string;
  blockHeight?: number;
  style?: React.CSSProperties;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  startFrame,
  durationFrames = 12,
  cursorHoldFrames = 15,
  initialText = "",
  color = COLORS.TEXT_NAVY,
  fontSize = 88,
  fontWeight = 700,
  fontFamily,
  letterSpacing = "-0.03em",
  blockColor = COLORS.WIPE_BLOCK_BLUE,
  blockHeight = 32,
  style,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame) {
    if (initialText) {
      return (
        <span
          style={{
            fontFamily,
            fontSize,
            fontWeight,
            color,
            letterSpacing,
            display: "inline-flex",
            alignItems: "center",
            position: "relative",
            ...style,
          }}
        >
          {initialText}
        </span>
      );
    }
    return null;
  }

  const typingProgress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const startLen = initialText.length;
  const remainingLen = text.length - startLen;
  const charsRevealed = Math.min(
    text.length,
    startLen + Math.floor(typingProgress * remainingLen)
  );

  const isDoneTyping = frame >= startFrame + durationFrames;
  const framesSinceDone = frame - (startFrame + durationFrames);

  // Block cursor behavior
  // During typing: solid wipe block (~24-28px wide)
  // After typing: shrinks to 12px, blinks for cursorHoldFrames, then vanishes
  let showBlock = true;
  let blockWidth = 24;

  if (isDoneTyping) {
    if (framesSinceDone > cursorHoldFrames) {
      showBlock = false;
    } else {
      // Shrinks
      blockWidth = interpolate(framesSinceDone, [0, 4], [24, 12], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      // Blinks every 4 frames
      const blink = Math.floor(framesSinceDone / 4) % 2 === 0;
      if (!blink) {
        showBlock = false;
      }
    }
  }

  const currentVisibleText = isDoneTyping
    ? text
    : text.slice(0, charsRevealed);

  return (
    <span
      style={{
        fontFamily,
        fontSize,
        fontWeight,
        color,
        letterSpacing,
        display: "inline-flex",
        alignItems: "center",
        position: "relative",
        lineHeight: 1.1,
        ...style,
      }}
    >
      <span>{currentVisibleText}</span>
      {showBlock && (
        <span
          style={{
            display: "inline-block",
            width: blockWidth,
            height: blockHeight || fontSize * 0.36,
            backgroundColor: blockColor,
            borderRadius: 3,
            marginLeft: 4,
            verticalAlign: "middle",
            boxShadow: `0 0 12px ${blockColor}66`,
            flexShrink: 0,
          }}
        />
      )}
    </span>
  );
};
