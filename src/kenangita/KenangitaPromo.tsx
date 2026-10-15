import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useVideoConfig } from "remotion";
import { CLAMP } from "./animations";
import { PastelBackground } from "./components/PastelBackground";
import { type EnterType, type ExitType, SceneShell, SfxVolumeContext } from "./components/SceneShell";
import { OVERLAP, TIMELINE, type KenangitaProps } from "./config";
import { S2Logo } from "./scenes/S2Logo";
import { S3Headline } from "./scenes/S3Headline";
import { S4Subacara } from "./scenes/S4Subacara";
import { S5Langkah } from "./scenes/S5Langkah";
import { S6Kenapa } from "./scenes/S6Kenapa";
import { S7Testimoni } from "./scenes/S7Testimoni";
import { S8Harga } from "./scenes/S8Harga";
import { S9Outro } from "./scenes/S9Outro";

type SceneDef = {
  key: keyof typeof TIMELINE;
  name: string;
  enter: EnterType;
  exit: ExitType;
  render: (p: KenangitaProps) => React.ReactNode;
};

const SCENES: SceneDef[] = [
  { key: "logo", name: "1. Logo Reveal", enter: "none", exit: "slideLeft", render: (p) => <S2Logo {...p} /> },
  { key: "headline", name: "2. Headline Kinetik", enter: "slideLeft", exit: "zoomOut", render: (p) => <S3Headline {...p} /> },
  { key: "subacara", name: "3. Sub & Acara", enter: "zoomIn", exit: "slideLeft", render: (p) => <S4Subacara {...p} /> },
  { key: "langkah", name: "4. Tiga Langkah", enter: "rise", exit: "zoomOut", render: (p) => <S5Langkah {...p} /> },
  { key: "kenapa", name: "5. Kenapa Kenangita", enter: "zoomIn", exit: "slideLeft", render: (p) => <S6Kenapa {...p} /> },
  { key: "testimoni", name: "6. Counter & Testimoni", enter: "slideLeft", exit: "zoomThrough", render: (p) => <S7Testimoni {...p} /> },
  { key: "harga", name: "7. Paket Harga", enter: "zoomIn", exit: "slideLeft", render: (p) => <S8Harga {...p} /> },
  { key: "outro", name: "8. Outro & CTA", enter: "slideLeft", exit: "none", render: (p) => <S9Outro {...p} /> },
];

export const KenangitaPromo: React.FC<KenangitaProps> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <SfxVolumeContext.Provider value={props.volumeSfx}>
      <AbsoluteFill>
        <PastelBackground />

        {SCENES.map((s, i) => {
          const t = TIMELINE[s.key];
          const isLast = i === SCENES.length - 1;
          const from = t.from;
          // Sequence diperpanjang OVERLAP frame agar bisa crossfade dengan scene berikutnya
          const duration = t.dur + (isLast ? 0 : OVERLAP);
          
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
