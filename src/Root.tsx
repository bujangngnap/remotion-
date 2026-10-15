import { Composition } from "remotion";
import { BatikEtiquette } from "./batik/BatikEtiquette";
import { FPS as BATIK_FPS, TOTAL_FRAMES as BATIK_FRAMES, WIDTH as BATIK_W, HEIGHT as BATIK_H } from "./batik/config";
import { MyVideo, myVideoSchema } from "./MyVideo";
import { Anniversary, calculateAnniversaryMetadata } from "./anniversary/Anniversary";
import { anniversarySchema, defaultAnniversaryProps } from "./anniversary/schema";
import { FotokitaPromo } from "./fotokita/FotokitaPromo";
import { defaultFotokitaProps, DURATION_IN_FRAMES, FPS, fotokitaSchema, HEIGHT, WIDTH } from "./fotokita/config";
import { KenangitaPromo } from "./kenangita/KenangitaPromo";
import { kenangitaSchema, defaultKenangitaProps, DURATION_IN_FRAMES as KENANGITA_FRAMES, FPS as KENANGITA_FPS } from "./kenangita/config";

import { KearifanLokal, KEARIFAN30_FPS, KEARIFAN30_FRAMES } from "./kearifan/KearifanLokal";

import { Promo } from "./promo/Promo";
import { CONFIG as PROMO_CONFIG } from "./promo/constants";
import { TkgPromo } from "./tkg/TkgPromo";
import { CONFIG as TKG_CONFIG, VERTICAL_CONFIG as TKG_VERTICAL_CONFIG } from "./tkg/constants";

import { ShowreelComposition } from "./showreel/ShowreelComposition";
import { FPS as SHOWREEL_FPS, TOTAL_FRAMES as SHOWREEL_FRAMES, WIDTH as SHOWREEL_W, HEIGHT as SHOWREEL_H } from "./showreel/constants";

import { KearifanComposition } from "./kearifan/KearifanComposition";
import { FPS as KEARIFAN_FPS, TOTAL_FRAMES as KEARIFAN_FRAMES, WIDTH as KEARIFAN_W, HEIGHT as KEARIFAN_H } from "./kearifan/constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 🇮🇩 Mengenal Kearifan Lokal Indonesia — 15s Cinematic Motion Graphic Showreel (16:9 1920×1080 @ 60fps) */}
      <Composition
        id="KearifanLokal"
        component={KearifanComposition}
        durationInFrames={KEARIFAN_FRAMES}
        fps={KEARIFAN_FPS}
        width={KEARIFAN_W}
        height={KEARIFAN_H}
      />

      {/* 🇮🇩 Kearifan Lokal — alternate 30 fps cut (16:9 1920×1080 @ 30fps, 15.0s) */}
      <Composition
        id="KearifanLokal30"
        component={KearifanLokal}
        durationInFrames={KEARIFAN30_FRAMES}
        fps={KEARIFAN30_FPS}
        width={KEARIFAN_W}
        height={KEARIFAN_H}
      />

      {/* 🎭 Batik Etiquette — Theater etiquette motion graphic (2:1 1920×960, ~37.7s, 30fps) */}
      <Composition
        id="BatikEtiquette"
        component={BatikEtiquette}
        durationInFrames={BATIK_FRAMES}
        fps={BATIK_FPS}
        width={BATIK_W}
        height={BATIK_H}
      />
      {/* 🎬 Motion Designer Showreel 2026 (16:9 1920×1080, 15.0s, 60fps) */}
      <Composition
        id="Showreel"
        component={ShowreelComposition}
        durationInFrames={SHOWREEL_FRAMES}
        fps={SHOWREEL_FPS}
        width={SHOWREEL_W}
        height={SHOWREEL_H}
      />

      {/* 🌿 Tumbuh Kembang Group (TKG) Kinetic Brand Motion (1:1 1080x1080, 13.0s, 30fps) */}
      <Composition
        id="TKGPromo"
        component={TkgPromo}
        durationInFrames={TKG_CONFIG.DURATION_IN_FRAMES}
        fps={TKG_CONFIG.FPS}
        width={TKG_CONFIG.WIDTH}
        height={TKG_CONFIG.HEIGHT}
      />

      {/* 🌿 Tumbuh Kembang Group (TKG) Vertical Variant (9:16 1080x1920, 13.0s, 30fps) */}
      <Composition
        id="TKGPromo-Vertical"
        component={TkgPromo}
        durationInFrames={TKG_VERTICAL_CONFIG.DURATION_IN_FRAMES}
        fps={TKG_VERTICAL_CONFIG.FPS}
        width={TKG_VERTICAL_CONFIG.WIDTH}
        height={TKG_VERTICAL_CONFIG.HEIGHT}
      />

      {/* 🚀 Kinetic Typography / App Promo (1:1 1080x1080, 9.0s, 30fps) */}
      <Composition
        id="Promo"
        component={Promo}
        durationInFrames={PROMO_CONFIG.DURATION_IN_FRAMES}
        fps={PROMO_CONFIG.FPS}
        width={PROMO_CONFIG.WIDTH}
        height={PROMO_CONFIG.HEIGHT}
      />

      {/* 📸 Iklan motion graphic fotokita.space (16:9, 35 detik) */}
      <Composition
        id="FotokitaPromo"
        component={FotokitaPromo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        schema={fotokitaSchema}
        defaultProps={defaultFotokitaProps}
      />

      {/* 💕 Video ucapan anniversary (vertikal 9:16). Durasi dihitung otomatis dari jumlah momen */}
      <Composition
        id="Anniversary"
        component={Anniversary}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
        schema={anniversarySchema}
        defaultProps={defaultAnniversaryProps}
        calculateMetadata={calculateAnniversaryMetadata}
      />

      {/* Landscape 16:9 (YouTube) */}
      <Composition
        id="MyVideo"
        component={MyVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={myVideoSchema}
        defaultProps={{
          judul: "Video Pertamaku",
          subjudul: "Dibuat dengan Remotion",
          videoSrc: "",
          namaLowerThird: "Nama Kamu",
          jabatanLowerThird: "Content Creator",
          warnaAksen: "#7c5cff",
          teksPenutup: "Terima kasih sudah menonton!",
        }}
      />

      {/* Portrait 9:16 (TikTok / Reels / Shorts) */}

      {/* Kenangita Promo Landscape 16:9 */}
      <Composition
        id="KenangitaPromo"
        component={KenangitaPromo}
        durationInFrames={KENANGITA_FRAMES}
        fps={KENANGITA_FPS}
        width={1920}
        height={1080}
        schema={kenangitaSchema}
        defaultProps={defaultKenangitaProps}
      />

      {/* Kenangita Promo Vertical 9:16 */}
      <Composition
        id="KenangitaPromo-Vertical"
        component={KenangitaPromo}
        durationInFrames={KENANGITA_FRAMES}
        fps={KENANGITA_FPS}
        width={1080}
        height={1920}
        schema={kenangitaSchema}
        defaultProps={defaultKenangitaProps}
      />
    </>
  );
};
