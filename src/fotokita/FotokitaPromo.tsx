import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useVideoConfig } from "remotion";
import { CLAMP } from "./animations";
import { PastelBackground } from "./components/PastelBackground";
import { type EnterType, type ExitType, SceneShell, SfxVolumeContext } from "./components/SceneShell";
import { OVERLAP, TIMELINE, type FotokitaProps } from "./config";
import { BrandRevealScene } from "./scenes/BrandRevealScene";
import { CounterCTAScene } from "./scenes/CounterCTAScene";
import { CountdownScene } from "./scenes/CountdownScene";
import { FeatureCarouselScene } from "./scenes/FeatureCarouselScene";
import { FeatureStatementScene } from "./scenes/FeatureStatementScene";
import { OutroScene } from "./scenes/OutroScene";
import { PhotoStripsScene } from "./scenes/PhotoStripsScene";
import { UIMockupScene } from "./scenes/UIMockupScene";

type SceneDef = {
  key: keyof typeof TIMELINE;
  name: string;
  enter: EnterType;
  exit: ExitType;
  render: (p: FotokitaProps) => React.ReactNode;
};

/** Urutan scene + jenis transisi masuk/keluar */
const SCENES: SceneDef[] = [
  { key: "countdown", name: "1. Countdown", enter: "none", exit: "fade", render: () => <CountdownScene /> },
  { key: "brand", name: "2. Brand Reveal", enter: "fade", exit: "zoomThrough", render: () => <BrandRevealScene /> },
  { key: "strips", name: "3. Photo Strips", enter: "slideLeft", exit: "zoomOut", render: () => <PhotoStripsScene /> },
  { key: "statement", name: "4. Feature Statement", enter: "zoomIn", exit: "slideLeft", render: () => <FeatureStatementScene /> },
  { key: "mockup", name: "5. UI Mockup", enter: "rise", exit: "zoomOut", render: () => <UIMockupScene /> },
  { key: "carousel", name: "6. Feature Carousel", enter: "zoomIn", exit: "slideLeft", render: () => <FeatureCarouselScene /> },
  {
    key: "cta",
    name: "7. Counter & CTA",
    enter: "slideLeft",
    exit: "zoomThrough",
    render: (p) => <CounterCTAScene jumlahFoto={p.jumlahFoto} teksCta={p.teksCta} />,
  },
  { key: "outro", name: "8. Outro", enter: "zoomIn", exit: "none", render: () => <OutroScene /> },
];

/** Komposisi utama: iklan motion graphic fotokita.space (16:9, 30fps, 35 detik) */
export const FotokitaPromo: React.FC<FotokitaProps> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <SfxVolumeContext.Provider value={props.volumeSfx}>
      <AbsoluteFill>
        <PastelBackground />

        {SCENES.map((s, i) => {
          const t = TIMELINE[s.key];
          const isLast = i === SCENES.length - 1;
          const from = Math.round(t.from * fps);
          // Sequence diperpanjang OVERLAP frame agar bisa crossfade dengan scene berikutnya
          const duration = Math.round(t.dur * fps) + (isLast ? 0 : OVERLAP);
          return (
            <Sequence key={s.key} from={from} durationInFrames={duration} name={s.name}>
              <SceneShell duration={duration} enter={s.enter} exit={s.exit} exitDuration={isLast ? 0 : OVERLAP}>
                {s.render(props)}
              </SceneShell>
            </Sequence>
          );
        })}

        {props.musik.trim() !== "" && (
          <Audio
            src={props.musik.startsWith("http") ? props.musik : staticFile(props.musik)}
            loop
            volume={(f) => props.volumeMusik * interpolate(f, [0, fps, durationInFrames - fps * 1.5, durationInFrames], [0, 1, 1, 0], CLAMP)}
          />
        )}
      </AbsoluteFill>
    </SfxVolumeContext.Provider>
  );
};
