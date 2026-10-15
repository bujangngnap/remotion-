import { z } from "zod";
import { zColor } from "@remotion/zod-types";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Intro } from "./scenes/Intro";
import { MainContent } from "./scenes/MainContent";
import { LowerThird } from "./scenes/LowerThird";
import { Outro } from "./scenes/Outro";

// Semua props ini bisa diedit langsung di panel kanan Remotion Studio
export const myVideoSchema = z.object({
  judul: z.string(),
  subjudul: z.string(),
  // Taruh file video di folder /public lalu isi nama file-nya, contoh: "klip.mp4"
  videoSrc: z.string(),
  namaLowerThird: z.string(),
  jabatanLowerThird: z.string(),
  warnaAksen: zColor(),
  teksPenutup: z.string(),
});

export type MyVideoProps = z.infer<typeof myVideoSchema>;

export const MyVideo: React.FC<MyVideoProps> = (props) => {
  const { durationInFrames, fps } = useVideoConfig();

  const introDur = 3 * fps; // 3 detik
  const outroDur = 2 * fps; // 2 detik
  const mainDur = durationInFrames - introDur - outroDur;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b12" }}>
      <Sequence durationInFrames={introDur} name="Intro">
        <Intro judul={props.judul} subjudul={props.subjudul} warna={props.warnaAksen} />
      </Sequence>

      <Sequence from={introDur} durationInFrames={mainDur} name="Video Utama">
        <MainContent videoSrc={props.videoSrc} warna={props.warnaAksen} />
      </Sequence>

      <Sequence from={introDur + fps} durationInFrames={4 * fps} name="Lower Third">
        <LowerThird
          nama={props.namaLowerThird}
          jabatan={props.jabatanLowerThird}
          warna={props.warnaAksen}
        />
      </Sequence>

      <Sequence from={introDur + mainDur} durationInFrames={outroDur} name="Outro">
        <Outro teks={props.teksPenutup} warna={props.warnaAksen} />
      </Sequence>
    </AbsoluteFill>
  );
};
