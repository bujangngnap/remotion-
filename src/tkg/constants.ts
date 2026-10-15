import { loadFont as loadInterTight } from "@remotion/google-fonts/InterTight";
import { loadFont as loadBebasNeue } from "@remotion/google-fonts/BebasNeue";
import { loadFont as loadFredoka } from "@remotion/google-fonts/Fredoka";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

export const interTightFont = loadInterTight("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

export const bebasNeueFont = loadBebasNeue("normal", {
  weights: ["400"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

export const fredokaFont = loadFredoka("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

export const interFont = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

export const CONFIG = {
  WIDTH: 1080,
  HEIGHT: 1080,
  FPS: 30,
  DURATION_IN_FRAMES: 900, // 30.0s @ 30fps (Dynamic Full Version)
} as const;

export const VERTICAL_CONFIG = {
  WIDTH: 1080,
  HEIGHT: 1920,
  FPS: 30,
  DURATION_IN_FRAMES: 900, // 30.0s @ 30fps
} as const;

export const COLORS = {
  // Light & Dark canvas backgrounds
  BG_LIGHT: "#FFFBF7",
  BG_DARK: "#0D0D0D",
  INK: "#0D0D0D",

  // Brand Oranges & Peaches
  PRIMARY_ORANGE: "#F97316",
  LIGHT_ORANGE: "#FDBA74",
  DEEP_ORANGE: "#EA580C",
  ACCENT_ORANGE: "#FB923C",
  PEACH_WASH: "#FFE4CC",
  PEACH_MID: "#FFD0A0",
  ORANGE_YELLOW_PEACH_START: "#FFC48A",
  ORANGE_YELLOW_PEACH_END: "#FFE9D2",

  // Neutrals & Secondary
  SECONDARY_TEXT: "#6B7280",
  WHITE: "#FFFFFF",
  CARD_BG: "#FFFFFF",

  // Scene 4 Subsidiary circle backgrounds
  SUBSIDIARY_CREATIVE: "#FDBA74",
  SUBSIDIARY_MEDIA: "#FB923C",
  SUBSIDIARY_DIGITAL: "#2B2B2E",
  SUBSIDIARY_KENANGITA: "#6B6B70",
  SUBSIDIARY_LEGAL: "#FFD23F",

  // Scene 5 Map colors
  MAP_BASE: "#F6F1EA",
  MAP_HILL: "#B5DDA0",
  MAP_RIVER: "#9ED0F2",
  MAP_ALUN_ALUN: "#86EFAC",
  MAP_PIN_CENTER: "#2B2B2E",
  MAP_ROAD: "#ECE5DB",
  MAP_ROAD_BORDER: "#E0D7C9",

  // Scene 6 Bottom Sheet
  SHEET_INITIAL_ORANGE: "#FB923C",
  SHEET_BG: "#FFFFFF",
  TAG_ORANGE: "#E8590C",
  BEZEL_PEACH: "#FFD0A0",

  // Scene 7 Slider
  KNOB_BG: "#FFF1E6",
  SPROUT_GREEN: "#22C55E",

  // Scene 8 CTA
  CTA_URL_BG: "#121214",
  CTA_TAGLINE: "#FDBA74",
} as const;

export const COPY = {
  BRAND_NAME: "TUMBUH KEMBANG",
  BRAND_FULL: "Tumbuh Kembang Group",
  BRAND_TAGLINE: "Tumbuh Kembang Group",
  BRAND_TAGLINE_SUB: "Partner Eksekusi Bisnis Terbaik di Magelang",

  // Scene 2: Pain Point
  SCENE2_HEADLINE: "Ide doang nggak cukup.",
  SCENE2_SUB: "Punya visi besar? Butuh eksekusi nyata.",

  // Scene 3: Solution
  SCENE3_HEADLINE: "Saatnya tumbuh bareng.",
  SCENE3_SUB: "Satu partner. Solusi bisnis terintegrasi.",

  // Scene 4: Ecosystem
  SCENE4_LINE1: "Satu grup.",
  SCENE4_LINE2_PART1: "Semua urusan",
  SCENE4_LINE2_PART2: "bisnis lu.",

  // Scene 5: Creative & Media Showcase
  SHOWCASE1_TITLE_CREATIVE: "TK Creative",
  SHOWCASE1_DESC_CREATIVE: "Brand Identity, Logo & Visual Guidelines",
  SHOWCASE1_TITLE_MEDIA: "TK Media",
  SHOWCASE1_DESC_MEDIA: "High-Impact Video Production & Reels",

  // Scene 6: Digital & Photobooth Showcase
  SHOWCASE2_TITLE_DIGITAL: "TK Digital",
  SHOWCASE2_DESC_DIGITAL: "High-Performance Website & Modern Apps",
  SHOWCASE2_TITLE_KENANGITA: "Kenangita",
  SHOWCASE2_DESC_KENANGITA: "Viral Event Photobooth & Instant Memories",

  // Scene 7: Map
  MAP_BRAND_LABEL: "Tumbuh Kembang",
  MAP_CITY_LABEL: "Magelang",
  MAP_STAT_CLIENTS: "100+ Bisnis Terbantu",
  MAP_STAT_UNITS: "5 Unit Bisnis",

  // Scene 8: Sheet Offer
  SHEET_BADGE: "Paket All-in-One",
  SHEET_TITLE: "Company Profile + Legalitas CV/PT",
  SHEET_TEAM: "Tim lengkap",
  SHEET_CONSULT: "Gratis konsultasi",

  // Scene 9: Growth Slider
  SLIDER_LABEL: "Waktunya Tumbuh!",

  // Scene 10: Grand CTA
  CTA_URL: "tumbuhkembanggroup.com",
  CTA_ACTION: "Konsultasi Sekarang via WhatsApp / DM",
} as const;

/**
 * 30-Second Motion Timeline Boundaries (@30fps, 900 frames total)
 */
export const SCENE_TIMINGS = {
  // Scene 1: Seeds -> Official Logo Reveal (0.00s - 2.33s)
  SCENE_1: { from: 0, duration: 70 },

  // Scene 2: Problem: "Ide doang nggak cukup." (2.00s - 4.50s)
  SCENE_2: { from: 60, duration: 75 },

  // Scene 3: Solution: "Saatnya tumbuh bareng." (4.33s - 6.50s)
  SCENE_3: { from: 130, duration: 65 },

  // Scene 4: Ecosystem: 5 Subsidiary Badges (6.33s - 8.83s)
  SCENE_4: { from: 190, duration: 75 },

  // Scene 5: Deep Dive 1: TK Creative & TK Media Showcase (8.50s - 12.50s)
  SCENE_5: { from: 255, duration: 120 },

  // Scene 6: Deep Dive 2: TK Digital & Kenangita Photobooth (12.33s - 16.50s)
  SCENE_6: { from: 370, duration: 125 },

  // Scene 7: Magelang Interactive Map Matrix (16.17s - 20.33s)
  SCENE_7: { from: 485, duration: 125 },

  // Scene 8: Bottom sheet: All-in-One Offer Engine (20.00s - 23.83s)
  SCENE_8: { from: 600, duration: 115 },

  // Scene 9: Growth slider: "Waktunya Tumbuh!" (23.50s - 26.83s)
  SCENE_9: { from: 705, duration: 100 },

  // Scene 10: Grand CTA Finale End Card (26.50s - 30.00s)
  SCENE_10: { from: 795, duration: 105 },
} as const;

export const SUBSIDIARIES = [
  {
    id: "creative",
    name: "TK Creative",
    tagline: "Branding & Design",
    service: "branding/design",
    bg: COLORS.SUBSIDIARY_CREATIVE,
    emoji: "🎨",
    logoPath: "logos/creative.svg",
  },
  {
    id: "media",
    name: "TK Media",
    tagline: "Video & Content",
    service: "content/video",
    bg: COLORS.SUBSIDIARY_MEDIA,
    emoji: "🎬",
    logoPath: "logos/media.svg",
  },
  {
    id: "digital",
    name: "TK Digital",
    tagline: "Web & Software",
    service: "web/dev",
    bg: COLORS.SUBSIDIARY_DIGITAL,
    emoji: "💻",
    logoPath: "logos/digital.svg",
  },
  {
    id: "kenangita",
    name: "Kenangita",
    tagline: "Event Photobooth",
    service: "photobooth",
    bg: COLORS.SUBSIDIARY_KENANGITA,
    emoji: "📸",
    logoPath: "logos/kenangita.svg",
  },
  {
    id: "legal",
    name: "Legal (CV/PT)",
    tagline: "Legal-Tech & Izin",
    service: "legal-tech",
    bg: COLORS.SUBSIDIARY_LEGAL,
    emoji: "⚖️",
    logoPath: "logos/legal.svg",
  },
] as const;
