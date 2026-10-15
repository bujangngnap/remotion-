import React from "react";
import { Sequence, useCurrentFrame } from "remotion";
import { SCENE_TIMINGS } from "./constants";
import { PromoBackground } from "./components/PromoBackground";
import { PromoAudio } from "./components/PromoAudio";
import { Scene1Logo } from "./scenes/Scene1Logo";
import { Scene2StopScrolling } from "./scenes/Scene2StopScrolling";
import { Scene3StartShowingUp } from "./scenes/Scene3StartShowingUp";
import { Scene4SparkMoments } from "./scenes/Scene4SparkMoments";
import { Scene5MapCard } from "./scenes/Scene5MapCard";
import { Scene6BottomSheet } from "./scenes/Scene6BottomSheet";
import { Scene7Slider } from "./scenes/Scene7Slider";

export const Promo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1080,
        overflow: "hidden",
      }}
    >
      {/* Dynamic Smooth Background */}
      <PromoBackground frame={frame} />

      {/* Audio & Sound Effects */}
      <PromoAudio />

      {/* Scene 1: Particles -> Logo (f0 - 55) */}
      <Sequence
        name="Scene 1 - Logo"
        from={SCENE_TIMINGS.SCENE_1.from}
        durationInFrames={SCENE_TIMINGS.SCENE_1.duration}
      >
        <Scene1Logo />
      </Sequence>

      {/* Scene 2: Stop Scrolling (f51 - 66) */}
      <Sequence
        name="Scene 2 - Stop Scrolling"
        from={SCENE_TIMINGS.SCENE_2.from}
        durationInFrames={SCENE_TIMINGS.SCENE_2.duration}
      >
        <Scene2StopScrolling />
      </Sequence>

      {/* Scene 3: Start Showing Up (f66 - 85) */}
      <Sequence
        name="Scene 3 - Start Showing Up"
        from={SCENE_TIMINGS.SCENE_3.from}
        durationInFrames={SCENE_TIMINGS.SCENE_3.duration}
      >
        <Scene3StartShowingUp />
      </Sequence>

      {/* Scene 4: Emoji Circles + Spark Moments (f85 - 133) */}
      <Sequence
        name="Scene 4 - Spark Moments"
        from={SCENE_TIMINGS.SCENE_4.from}
        durationInFrames={SCENE_TIMINGS.SCENE_4.duration}
      >
        <Scene4SparkMoments />
      </Sequence>

      {/* Scene 5: Map Card (f133 - 175) */}
      <Sequence
        name="Scene 5 - Map Card"
        from={SCENE_TIMINGS.SCENE_5.from}
        durationInFrames={SCENE_TIMINGS.SCENE_5.duration}
      >
        <Scene5MapCard />
      </Sequence>

      {/* Scene 6: Bottom Sheet (f175 - 210) */}
      <Sequence
        name="Scene 6 - Bottom Sheet"
        from={SCENE_TIMINGS.SCENE_6.from}
        durationInFrames={SCENE_TIMINGS.SCENE_6.duration}
      >
        <Scene6BottomSheet />
      </Sequence>

      {/* Scene 7: Must Try Slider (f210 - 270) */}
      <Sequence
        name="Scene 7 - Slider"
        from={SCENE_TIMINGS.SCENE_7.from}
        durationInFrames={SCENE_TIMINGS.SCENE_7.duration}
      >
        <Scene7Slider />
      </Sequence>
    </div>
  );
};
