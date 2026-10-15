import React from "react";
import { Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";

export const PromoAudio: React.FC = () => {
  const frame = useCurrentFrame();

  // BGM volume: gentle fade in at start, fade out at end
  const bgmVolume = interpolate(
    frame,
    [0, 15, 255, 270],
    [0, 0.16, 0.16, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Exact frames for sound effects
  const letterPops = [22, 27, 30, 33, 36, 39];
  const circlePops = [85, 88, 91, 102, 112];
  const typingTicks = [51, 52, 53, 54, 66, 68, 70, 72, 107, 109, 111, 180, 182, 184, 186, 188];
  const whooshes = [46, 63, 132, 174, 210];
  const sparkles = [135];
  const chimes = [216];

  return (
    <>
      {/* Background Music */}
      <Audio
        src={staticFile("promo/audio/bgm.mp3")}
        volume={bgmVolume}
        startFrom={0}
      />

      {/* Wordmark Letter Pops */}
      {letterPops.map((f, i) => (
        <Sequence key={`lpop-${i}`} from={f} durationInFrames={10}>
          <Audio src={staticFile("promo/audio/pop.wav")} volume={0.35} />
        </Sequence>
      ))}

      {/* Circle Pops */}
      {circlePops.map((f, i) => (
        <Sequence key={`cpop-${i}`} from={f} durationInFrames={10}>
          <Audio src={staticFile("promo/audio/pop.wav")} volume={0.4} />
        </Sequence>
      ))}

      {/* Typing Ticks */}
      {typingTicks.map((f, i) => (
        <Sequence key={`tick-${i}`} from={f} durationInFrames={5}>
          <Audio src={staticFile("promo/audio/tick.wav")} volume={0.25} />
        </Sequence>
      ))}

      {/* Transition Whooshes */}
      {whooshes.map((f, i) => (
        <Sequence key={`whoosh-${i}`} from={f} durationInFrames={15}>
          <Audio src={staticFile("promo/audio/whoosh.wav")} volume={0.25} />
        </Sequence>
      ))}

      {/* Map Burst Sparkle */}
      {sparkles.map((f, i) => (
        <Sequence key={`spark-${i}`} from={f} durationInFrames={20}>
          <Audio src={staticFile("promo/audio/sparkle.wav")} volume={0.35} />
        </Sequence>
      ))}

      {/* "Must try" Landing Chime */}
      {chimes.map((f, i) => (
        <Sequence key={`chime-${i}`} from={f} durationInFrames={25}>
          <Audio src={staticFile("promo/audio/chime.wav")} volume={0.45} />
        </Sequence>
      ))}
    </>
  );
};
