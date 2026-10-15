import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { staticFile } from "remotion";

// ============================================================
//  Design tokens kenangita.space — clean, playful, pastel
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
  pink: "#FFB6C1", // Updated to softer pink
  pinkDeep: "#FF6B6B",
  pinkSoft: "#FFD1D1",
  pinkLight: "#FFE3E1",
  pinkPale: "#FFF0F0",
  blush: "#FFF5F9",
  purple: "#8B5CF6",
  lavender: "#D8BFD8",
  lavenderPale: "#F0EAFF",
  peach: "#FFD3C2",
  mint: "#C8F2E1",
  yellow: "#FFE66D",
  ink: "#17131C",
  inkSoft: "#2E2735",
  gray: "#6E6878",
  grayLight: "#ECE8EF",
  white: "#FFFFFF",
} as const;

/** Gradien pink → ungu untuk teks/aksen utama */
export const GRADIENT_BRAND = `linear-gradient(100deg, ${C.pinkDeep} 0%, ${C.pink} 45%, ${C.lavender} 100%)`;

export const PHOTOS = {
  p1: staticFile("kenangita/crime scene.JPG"),
  p2: staticFile("kenangita/prada.JPG"),
  p3: staticFile("kenangita/20260530_184237499.JPG"),
  p4: staticFile("kenangita/20260611_103418080.JPG"),
  p5: staticFile("kenangita/20260528_163305409.JPG"),
  p6: staticFile("kenangita/20260531_203502364.JPG"),
};

/** Urutan default frame di dalam photo strip */
export const PHOTO_LIST = [PHOTOS.p1, PHOTOS.p2, PHOTOS.p3, PHOTOS.p4, PHOTOS.p5, PHOTOS.p6];

export const SFX = {
  beep: staticFile("kenangita/audio/sfx/countdown-beep.wav"),
  shutter: staticFile("kenangita/audio/sfx/shutter-click.wav"),
  pop: staticFile("kenangita/audio/sfx/pop.wav"),
  whoosh: staticFile("kenangita/audio/sfx/whoosh.wav"),
  ding: staticFile("kenangita/audio/sfx/ding.wav"),
  fwip: staticFile("kenangita/audio/sfx/flash-fwip.wav"),
  printer: staticFile("kenangita/audio/sfx/printer-buzz.wav"),
  tada: staticFile("kenangita/audio/sfx/ta-da.wav"),
  sparkle: staticFile("kenangita/audio/sfx/sparkle.wav"),
  chaChing: staticFile("kenangita/audio/sfx/coin-cha-ching.wav"),
  confettiPop: staticFile("kenangita/audio/sfx/confetti-pop.wav"),
  partyHorn: staticFile("kenangita/audio/sfx/party-horn.wav"),
  mouseClick: staticFile("musik/matthewvakaliuk73627-mouse-click-290204.mp3"),
};
