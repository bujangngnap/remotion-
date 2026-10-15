import { z } from "zod";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Durasi crossfade antar scene (frame). Scene lama "keluar" selama scene baru "masuk". */
export const OVERLAP = 12;

/** Timeline per scene dalam detik (mengikuti breakdown storyboard) */
export const TIMELINE = {
  countdown: { from: 0, dur: 2 }, //  00:00 - 00:02
  brand: { from: 2, dur: 2 }, //      00:02 - 00:04
  strips: { from: 4, dur: 6 }, //     00:04 - 00:10
  statement: { from: 10, dur: 5 }, // 00:10 - 00:15
  mockup: { from: 15, dur: 7 }, //    00:15 - 00:22
  carousel: { from: 22, dur: 6 }, //  00:22 - 00:28
  cta: { from: 28, dur: 4 }, //       00:28 - 00:32
  outro: { from: 32, dur: 3 }, //     00:32 - 00:35
} as const;

export const TOTAL_DETIK = 35;
export const DURATION_IN_FRAMES = TOTAL_DETIK * FPS; // 1050

export const fotokitaSchema = z.object({
  /** Path musik latar di folder public/, contoh: "musik/backsound.m4a". Kosongkan = tanpa musik */
  musik: z.string(),
  volumeMusik: z.number().min(0).max(1),
  /** Volume efek suara (beep, shutter, pop, whoosh) */
  volumeSfx: z.number().min(0).max(1),
  /** Angka di scene counter */
  jumlahFoto: z.number().min(0),
  teksCta: z.string(),
});

export type FotokitaProps = z.infer<typeof fotokitaSchema>;

export const defaultFotokitaProps: FotokitaProps = {
  musik: "musik/alexguz-funk-amp-breakbeat-upbeat-advertising-happy-cook-541097.mp3",
  volumeMusik: 0.35,
  volumeSfx: 0.7,
  jumlahFoto: 2750,
  teksCta: "Mulai Sesi Foto Now 🤍",
};
