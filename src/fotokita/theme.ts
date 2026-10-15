import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { staticFile } from "remotion";

// ============================================================
//  Design tokens fotokita.space — clean, playful, pastel
// ============================================================

export const { fontFamily: fontSans } = loadOutfit("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const { fontFamily: fontHand } = loadCaveat("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});

export const C = {
  pink: "#FF4081",
  pinkDeep: "#E91E63",
  pinkSoft: "#FF8FB8",
  pinkLight: "#FFC6DA",
  pinkPale: "#FFE6EF",
  blush: "#FFF5F9",
  purple: "#8B5CF6",
  lavender: "#C9B6FF",
  lavenderPale: "#F0EAFF",
  peach: "#FFD3C2",
  mint: "#C8F2E1",
  yellow: "#FFD233",
  ink: "#17131C",
  inkSoft: "#2E2735",
  gray: "#6E6878",
  grayLight: "#ECE8EF",
  white: "#FFFFFF",
} as const;

/** Gradien pink → ungu untuk teks/aksen utama */
export const GRADIENT_BRAND = `linear-gradient(100deg, ${C.pink} 0%, #FF6FA5 45%, ${C.purple} 100%)`;

export const PHOTOS = {
  peace: staticFile("fotokita/peace.jpg"),
  heart: staticFile("fotokita/heart.jpg"),
  silly: staticFile("fotokita/silly.jpg"),
  smile: staticFile("fotokita/smile.jpg"),
};

/** Urutan default 4 frame di dalam photo strip */
export const PHOTO_LIST = [PHOTOS.peace, PHOTOS.heart, PHOTOS.silly, PHOTOS.smile];

export const SFX = {
  beep: staticFile("fotokita/sfx/beep.wav"),
  beepHigh: staticFile("fotokita/sfx/beep-high.wav"),
  shutter: staticFile("fotokita/sfx/shutter.wav"),
  pop: staticFile("fotokita/sfx/pop.wav"),
  whoosh: staticFile("fotokita/sfx/whoosh.wav"),
  chime: staticFile("fotokita/sfx/chime.wav"),
  click: staticFile("musik/matthewvakaliuk73627-mouse-click-290204.mp3"),
};
