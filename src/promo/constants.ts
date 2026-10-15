import { loadFont as loadInterTight } from "@remotion/google-fonts/InterTight";
import { loadFont as loadFredoka } from "@remotion/google-fonts/Fredoka";

export const interTightFont = loadInterTight("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

export const fredokaFont = loadFredoka("normal", {
  weights: ["700"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});

export const CONFIG = {
  WIDTH: 1080,
  HEIGHT: 1080,
  FPS: 30,
  DURATION_IN_FRAMES: 270, // 9.0 seconds
} as const;

export const COLORS = {
  BG_CLEAN: "#FCFCFE",
  TEXT_NAVY: "#14224F",
  LOGO_NAVY: "#0B1230",
  PRIMARY_BLUE: "#1F5FE0",
  ACCENT_BLUE: "#2E6BE6",
  LIGHT_BLUE: "#B7D1FA",
  WIPE_BLOCK_BLUE: "#0B3FCC",
  
  // Gradients
  PERIWINKLE_START: "#DCE6FF",
  PERIWINKLE_END: "#C9D8FA",
  TEAL_GRADIENT_START: "#A8F0E8",
  TEAL_GRADIENT_END: "#BCD0FF",
  
  // Header / Secondary
  GREY_HEADER: "#6B7390",
  
  // Scene 4 Emoji Circle BGs
  CIRCLE_BEER: "#F8C766",
  CIRCLE_BURGER: "#F7AE7A",
  CIRCLE_COFFEE: "#5B4A45",
  CIRCLE_SOCCER: "#5E5E60",
  CIRCLE_PARTY: "#FFD23F",
  ORANGE_GLOW: "#FFB866",
  
  // Scene 5 Map Card
  MAP_BASE: "#F4F1EA",
  MAP_PARK: "#A9DB8A",
  MAP_WATER: "#8EC9F5",
  SPARK_ORANGE: "#FF8A3D",
  
  // Scene 6 Bottom Sheet
  SHEET_RED_BADGE: "#D01F2F",
  SHEET_BG: "#FDFDFE",
  SHEET_ATTENDEE: "#5A6A85",
  SHEET_INITIAL_BLUE: "#4C8DF5",
  
  // Scene 7 Slider
  PROGRESS_CYAN: "#7DF0F0",
  PROGRESS_BLUE: "#1F63E8",
  KNOB_BG: "#EEF2FB",
} as const;

export const COPY = {
  BRAND: "PiNNED",
  SCENE2_HEADLINE: "Stop Scrolling.",
  SCENE3_HEADLINE: "Start Showing up.",
  SCENE4_LINE1_PART1: "Spark",
  SCENE4_LINE1_PART2: "moments",
  SCENE4_LINE2: "instantly.",
  MAP_NAME: "Carter's",
  MAP_CITY: "New York",
  SHEET_BADGE: "Now",
  SHEET_TITLE: "Drinks in the West Village",
  SHEET_ATTENDEES: "30 going",
  SHEET_TIME: "8:30pm",
  SLIDER_LABEL: "Must try",
} as const;

export const SCENE_TIMINGS = {
  SCENE_1: { from: 0, duration: 55 },      // 0.00s - 1.83s (f0 - 55)
  SCENE_2: { from: 51, duration: 16 },     // 1.70s - 2.20s (f51 - 66)
  SCENE_3: { from: 66, duration: 20 },     // 2.20s - 2.85s (f66 - 85)
  SCENE_4: { from: 85, duration: 49 },     // 2.85s - 4.45s (f85 - 133)
  SCENE_5: { from: 133, duration: 43 },    // 4.45s - 5.85s (f133 - 175)
  SCENE_6: { from: 175, duration: 36 },    // 5.85s - 7.00s (f175 - 210)
  SCENE_7: { from: 210, duration: 60 },    // 7.00s - 9.00s (f210 - 270)
} as const;
