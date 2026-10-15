import { TransitionSeries, linearTiming } from "@remotion/transitions";
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  staticFile,
  useVideoConfig,
  type CalculateMetadataFunction,
} from "remotion";
import { FloatingHearts } from "./components/FloatingHearts";
import {
  INTRO_DETIK,
  OUTRO_DETIK,
  TRANSISI_DETIK,
  type AnniversaryProps,
} from "./schema";
import { IntroScene } from "./scenes/IntroScene";
import { MomentScene } from "./scenes/MomentScene";
import { OutroScene } from "./scenes/OutroScene";
import { WARNA } from "./theme";
import { softTransition } from "./transitions";

const FPS = 30;

// Durasi total = intro + semua momen + outro - overlap transisi
export const calculateAnniversaryMetadata: CalculateMetadataFunction<AnniversaryProps> = ({ props }) => {
  const totalMomen = props.momen.reduce((acc, m) => acc + Math.round(m.durasiDetik * FPS), 0);
  const jumlahTransisi = props.momen.length + 1;
  const durationInFrames =
    INTRO_DETIK * FPS + totalMomen + OUTRO_DETIK * FPS - jumlahTransisi * Math.round(TRANSISI_DETIK * FPS);
  return { durationInFrames: Math.max(durationInFrames, 1), fps: FPS };
};

export const Anniversary: React.FC<AnniversaryProps> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();
  // ease-in-out: pelan di awal, mulus di tengah, pelan di akhir
  const transisi = linearTiming({
    durationInFrames: Math.round(TRANSISI_DETIK * fps),
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: WARNA.bg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={INTRO_DETIK * fps} name="Intro">
          <IntroScene
            angkaTahun={props.angkaTahun}
            judul={props.judulIntro}
            namaKamu={props.namaKamu}
            namaDia={props.namaDia}
            tanggalJadian={props.tanggalJadian}
            warna={props.warnaUtama}
          />
        </TransitionSeries.Sequence>

        {props.momen.map((m, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Transition presentation={softTransition(m.transisi)} timing={transisi} />
            <TransitionSeries.Sequence durationInFrames={Math.round(m.durasiDetik * fps)} name={`Momen ${i + 1}: ${m.judul}`}>
              <MomentScene momen={m} index={i} warna={props.warnaUtama} />
            </TransitionSeries.Sequence>
          </React.Fragment>
        ))}

        <TransitionSeries.Transition presentation={softTransition("zoomMimpi")} timing={transisi} />
        <TransitionSeries.Sequence durationInFrames={OUTRO_DETIK * fps} name="Outro">
          <OutroScene
            jumlahHari={props.jumlahHari}
            judul={props.judulOutro}
            pesan={props.pesanPenutup}
            namaKamu={props.namaKamu}
            warna={props.warnaUtama}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Hati melayang di atas semua scene */}
      <FloatingHearts color={props.warnaUtama} />

      {/* Musik latar dengan fade in/out */}
      {props.musik.trim() !== "" && (
        <Audio
          src={props.musik.startsWith("http") ? props.musik : staticFile(props.musik)}
          trimBefore={Math.round(props.musikMulaiDetik * fps)}
          loop
          volume={(f) =>
            props.volumeMusik *
            interpolate(f, [0, fps, durationInFrames - 2 * fps, durationInFrames], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      )}
    </AbsoluteFill>
  );
};
