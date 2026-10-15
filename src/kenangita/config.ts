import { z } from "zod";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

/** Durasi crossfade antar scene (frame). Scene lama "keluar" selama scene baru "masuk". */
export const OVERLAP = 12;

/** Timeline per scene dalam frame (mengikuti breakdown storyboard, 1 beat = 15 frame) */
export const TIMELINE = {
  logo: { from: 0, dur: 105 },
  headline: { from: 105, dur: 120 },
  subacara: { from: 225, dur: 90 },
  langkah: { from: 315, dur: 180 },
  kenapa: { from: 495, dur: 180 },
  testimoni: { from: 675, dur: 90 },
  harga: { from: 765, dur: 180 },
  outro: { from: 945, dur: 150 },
} as const;

export const TOTAL_DETIK = 36.5;
export const DURATION_IN_FRAMES = 1095; // 36.5 detik * 30 fps

export const kenangitaSchema = z.object({
  musik: z.string(),
  volumeMusik: z.number().min(0).max(1),
  volumeSfx: z.number().min(0).max(1),
  
  brand: z.string(),
  chip: z.string(),
  tagline: z.string(),
  subHeadline: z.string(),
  acara: z.array(z.string()),
  langkah: z.array(z.string()),
  fitur: z.array(z.object({ title: z.string(), desc: z.string(), tag: z.string() })),
  paket: z.array(z.object({ name: z.string(), price: z.number(), dur: z.string(), isPopular: z.boolean().optional() })),
  tambahan: z.string(),
  testimoni: z.array(z.object({ quote: z.string(), name: z.string() })),
  cta: z.string(),
  whatsapp: z.string(),
  instagram: z.string(),
  tiktok: z.string(),
  website: z.string(),
  penutup: z.string(),
  
  colors: z.object({
    bg: z.string(),
    primary: z.string(), // dominan pink/lavender
    secondary: z.string(),
    accent: z.string(),
    text: z.string(),
    card: z.string(),
  }),
});

export type KenangitaProps = z.infer<typeof kenangitaSchema>;

export const defaultKenangitaProps: KenangitaProps = {
  musik: "musik/alexguz-funk-amp-breakbeat-upbeat-advertising-happy-cook-541097.mp3",
  volumeMusik: 0.35,
  volumeSfx: 0.7,
  
  brand: "kenangita",
  chip: "kenangita photobooth • Temanggung",
  tagline: "Abadikan Setiap Kenangan",
  subHeadline: "photobooth lucu & aesthetic buat semua momen.",
  acara: ["Wedding", "Ulang Tahun", "Wisuda", "Gathering", "Corporate Event", "Halal Bi Halal"],
  langkah: [
    "Chat & booking (WhatsApp / form)",
    "Kami datang & setup di lokasimu",
    "Pose, cetak 20 detik, bawa pulang"
  ],
  fitur: [
    { title: "Cetak Instan", desc: "20 detik", tag: "#cetak20detik" },
    { title: "2 Kru Profesional", desc: "operator & fotografer", tag: "#kru2orang" },
    { title: "Props & Tema Custom", desc: "lucu dan bebas pilih", tag: "#temacustom" },
    { title: "Galeri Online 1 Tahun", desc: "plus bonus GIF/boomerang", tag: "#galeri1tahun" },
  ],
  paket: [
    { name: "Kenangan Manis", price: 2750000, dur: "2 jam" },
    { name: "Cerita Bahagia", price: 3250000, dur: "3 jam", isPopular: true },
  ],
  tambahan: "+30 menit Rp400.000 | +60 menit Rp600.000 | semua file ke flashdisk Rp100.000",
  testimoni: [
    { quote: "Booth-nya jadi spot favorit pas acara wisuda. Propsnya lucu-lucu, foto langsung jadi!", name: "Dahlia F." },
    { quote: "Pas wedding, Kenangita jadi primadona!", name: "Sari D." }
  ],
  cta: "Yuk, Pesan Sekarang!",
  whatsapp: "0823-2511-2053",
  instagram: "@kenangita_photobooth",
  tiktok: "@kenangita_photobooth1",
  website: "kenangitaphotobooth.id",
  penutup: "foto bareng, bawa pulang kenangannya",

  // Adapted pastel palette
  colors: {
    bg: "#FAFAFA", // Offwhite / pastel bg
    primary: "#FFB6C1", // Light Pink
    secondary: "#D8BFD8", // Thistle / lavender
    accent: "#FFDAB9", // Peach puff
    text: "#2D3436", // Dark gray
    card: "#FFFFFF",
  }
};
