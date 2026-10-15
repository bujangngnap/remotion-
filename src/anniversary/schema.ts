import { z } from "zod";
import { zColor } from "@remotion/zod-types";

// ============================================================
//  Semua isi video diatur dari sini (atau dari panel kanan Studio)
// ============================================================

export const momenSchema = z.object({
  /** "foto" atau "video" */
  tipe: z.enum(["foto", "video"]),
  /** Path file di dalam folder public/, contoh: "foto/foto1.jpg" atau "video/klip1.mp4". Kosongkan = placeholder */
  file: z.string(),
  /** Berapa detik momen ini tampil */
  durasiDetik: z.number().min(1).max(60),
  /** KHUSUS VIDEO: buang N detik pertama (potong bagian awal yang tidak perlu) */
  potongAwalDetik: z.number().min(0),
  /** KHUSUS VIDEO: matikan suara asli video (biar musik latar yang terdengar) */
  bisukan: z.boolean(),
  judul: z.string(),
  tanggal: z.string(),
  caption: z.string(),
  /** Transisi MENUJU momen ini: lembut | zoomMimpi | geserLembut | cahaya */
  transisi: z.enum(["lembut", "zoomMimpi", "geserLembut", "cahaya"]),
});

export const anniversarySchema = z.object({
  namaKamu: z.string(),
  namaDia: z.string(),
  angkaTahun: z.number().min(1),
  judulIntro: z.string(),
  tanggalJadian: z.string(),
  jumlahHari: z.number().min(0),
  judulOutro: z.string(),
  pesanPenutup: z.string(),
  /** Path musik di public/, contoh: "musik/lagu.mp3". Kosongkan = tanpa musik */
  musik: z.string(),
  /** Mulai lagu dari detik ke-N (lewati intro lagu) */
  musikMulaiDetik: z.number().min(0),
  volumeMusik: z.number().min(0).max(1),
  warnaUtama: zColor(),
  momen: z.array(momenSchema),
});

export type Momen = z.infer<typeof momenSchema>;
export type AnniversaryProps = z.infer<typeof anniversarySchema>;

// Durasi bagian tetap (dalam detik)
export const INTRO_DETIK = 4;
export const OUTRO_DETIK = 6;
export const TRANSISI_DETIK = 1.1;

export const defaultAnniversaryProps: AnniversaryProps = {
  namaKamu: "Aku",
  namaDia: "Kamu",
  angkaTahun: 2,
  judulIntro: "Tahun Bersamamu",
  tanggalJadian: "5 Oktober 2024",
  jumlahHari: 730,
  judulOutro: "Happy 2nd Anniversary",
  pesanPenutup: "Terima kasih sudah jadi rumah ternyaman. Ayo lanjut ke tahun-tahun berikutnya, bareng terus ya.",
  musik: "musik/backsound.m4a",
  musikMulaiDetik: 155,
  volumeMusik: 0.85,
  warnaUtama: "#ff6b9d",
  momen: [
    {
      tipe: "foto",
      file: "foto/foto1.jpg",
      durasiDetik: 4,
      potongAwalDetik: 0,
      bisukan: true,
      judul: "Pertama Ketemu",
      tanggal: "Oktober 2024",
      caption: "Siapa sangka secangkir kopi bisa jadi awal dari semuanya",
      transisi: "zoomMimpi",
    },
    {
      tipe: "foto",
      file: "foto/foto2.jpg",
      durasiDetik: 4,
      potongAwalDetik: 0,
      bisukan: true,
      judul: "Liburan Pertama",
      tanggal: "Maret 2025",
      caption: "Senja paling indah ternyata yang kita lihat berdua",
      transisi: "geserLembut",
    },
    {
      tipe: "foto",
      file: "foto/foto3.jpg",
      durasiDetik: 4,
      potongAwalDetik: 0,
      bisukan: true,
      judul: "Malam Itu",
      tanggal: "Desember 2025",
      caption: "Ribuan lampu kota, tapi yang paling terang tetap kamu",
      transisi: "cahaya",
    },
    {
      tipe: "foto",
      file: "foto/foto4.jpg",
      durasiDetik: 4,
      potongAwalDetik: 0,
      bisukan: true,
      judul: "Hari Ini",
      tanggal: "5 Oktober 2026",
      caption: "Dua tahun, dan aku masih memilih kamu setiap hari",
      transisi: "lembut",
    },
    {
      tipe: "video",
      file: "",
      durasiDetik: 5,
      potongAwalDetik: 0,
      bisukan: true,
      judul: "Momen Favorit",
      tanggal: "Kapan pun",
      caption: "Taruh video kalian di public/video lalu isi nama filenya",
      transisi: "cahaya",
    },
  ],
};
