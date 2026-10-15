import React from "react";
import { Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { SCENE_TIMINGS } from "./constants";
import { TkgBackground } from "./components/TkgBackground";
import { TkgAudio } from "./components/TkgAudio";
import { TkgWordmark } from "./components/TkgWordmark";
import { Scene2IdeDoang } from "./scenes/Scene2IdeDoang";
import { Scene3SaatnyaTumbuh } from "./scenes/Scene3SaatnyaTumbuh";
import { Scene4Subsidiaries } from "./scenes/Scene4Subsidiaries";
import { Scene5ShowcaseCreativeMedia } from "./scenes/Scene5ShowcaseCreativeMedia";
import { Scene6ShowcaseDigitalKenangita } from "./scenes/Scene6ShowcaseDigitalKenangita";
import { Scene5MapMagelang } from "./scenes/Scene5MapMagelang";
import { Scene6BottomSheet } from "./scenes/Scene6BottomSheet";
import { Scene7GrowthSlider } from "./scenes/Scene7GrowthSlider";
import { Scene10GrandCta } from "./scenes/Scene10GrandCta";

export const TkgPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        backgroundColor: "#FFFBF7",
      }}
    >
      {/* Dynamic Background Handling Across 900 Frames */}
      <TkgBackground frame={frame} />

      {/* Frame-Accurate Sound Design & BGM Across 900 Frames */}
      <TkgAudio />

      {/* Scene 1-3 Wordmark & Header:
          Starts with seeds & official logo reveal (f0-f45),
          shrinks to header at y~28% (f50-f61),
          persists cleanly through Scene 2 & 3,
          fades out before Scene 4 (f180-f190) */}
      <Sequence
        name="Scene 1 - Wordmark & Persistent Header"
        from={0}
        durationInFrames={192}
      >
        <TkgWordmark headerFadeOutFrame={180} />
      </Sequence>

      {/* Scene 2: "Ide doang nggak cukup." (f60 - f135) */}
      <Sequence
        name="Scene 2 - Ide Doang Nggak Cukup"
        from={SCENE_TIMINGS.SCENE_2.from}
        durationInFrames={SCENE_TIMINGS.SCENE_2.duration}
      >
        <Scene2IdeDoang />
      </Sequence>

      {/* Scene 3: "Saatnya tumbuh bareng." (f130 - f195) */}
      <Sequence
        name="Scene 3 - Saatnya Tumbuh Bareng"
        from={SCENE_TIMINGS.SCENE_3.from}
        durationInFrames={SCENE_TIMINGS.SCENE_3.duration}
      >
        <Scene3SaatnyaTumbuh />
      </Sequence>

      {/* Scene 4: Subsidiary circles + caption (f190 - f265) */}
      <Sequence
        name="Scene 4 - Subsidiary Circles"
        from={SCENE_TIMINGS.SCENE_4.from}
        durationInFrames={SCENE_TIMINGS.SCENE_4.duration}
      >
        <Scene4Subsidiaries />
      </Sequence>

      {/* Scene 5: Deep Dive 1: TK Creative & TK Media Showcase (f255 - f375) */}
      <Sequence
        name="Scene 5 - Showcase Creative & Media"
        from={SCENE_TIMINGS.SCENE_5.from}
        durationInFrames={SCENE_TIMINGS.SCENE_5.duration}
      >
        <Scene5ShowcaseCreativeMedia />
      </Sequence>

      {/* Scene 6: Deep Dive 2: TK Digital & Kenangita Photobooth (f370 - f495) */}
      <Sequence
        name="Scene 6 - Showcase Digital & Kenangita"
        from={SCENE_TIMINGS.SCENE_6.from}
        durationInFrames={SCENE_TIMINGS.SCENE_6.duration}
      >
        <Scene6ShowcaseDigitalKenangita />
      </Sequence>

      {/* Scene 7: Magelang Interactive Map Card (f485 - f610) */}
      <Sequence
        name="Scene 7 - Magelang Map Card"
        from={SCENE_TIMINGS.SCENE_7.from}
        durationInFrames={SCENE_TIMINGS.SCENE_7.duration}
      >
        <Scene5MapMagelang />
      </Sequence>

      {/* Scene 8: Bottom Sheet: All-in-One Offer Engine (f600 - f715) */}
      <Sequence
        name="Scene 8 - Bottom Sheet Offer"
        from={SCENE_TIMINGS.SCENE_8.from}
        durationInFrames={SCENE_TIMINGS.SCENE_8.duration}
      >
        <Scene6BottomSheet />
      </Sequence>

      {/* Scene 9: Growth Slider "Waktunya Tumbuh!" (f705 - f805) */}
      <Sequence
        name="Scene 9 - Growth Slider"
        from={SCENE_TIMINGS.SCENE_9.from}
        durationInFrames={SCENE_TIMINGS.SCENE_9.duration}
      >
        <Scene7GrowthSlider />
      </Sequence>

      {/* Scene 10: Grand CTA Finale End Card (f795 - f900) */}
      <Sequence
        name="Scene 10 - Grand CTA Finale"
        from={SCENE_TIMINGS.SCENE_10.from}
        durationInFrames={SCENE_TIMINGS.SCENE_10.duration}
      >
        <Scene10GrandCta />
      </Sequence>
    </div>
  );
};
