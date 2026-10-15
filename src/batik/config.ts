// ── BatikEtiquette — Central Configuration ────────────────────────────
// All frame numbers, copy text, and design tokens in one file.

export const FPS = 30;
export const TOTAL_FRAMES = 1130; // ~37.7s
export const WIDTH = 1920;
export const HEIGHT = 960;

// ── Color Palette ──────────────────────────────────────────────────────
export const C = {
  cream: '#F6E7D6',
  peach: '#EBCDAF',
  darkBrown: '#5A3A2E',
  rustOrange: '#C2542D',
  copper: '#C8702F',
  blackBrown: '#2B1A14',
  white: '#FFFFFF',
} as const;

// ── Scene Timing (frames @ 30fps) ─────────────────────────────────────
export const SCENE_OVERLAP = 10; // frames of cross-dissolve overlap

export const SCENES = {
  intro: { from: 0, dur: 120 },     // 0:00 – 4:00
  scene1: { from: 120, dur: 150 },   // 4:00 – 9:00
  scene2: { from: 270, dur: 120 },   // 9:00 – 13:00
  scene3: { from: 390, dur: 120 },   // 13:00 – 17:00
  scene4: { from: 510, dur: 120 },   // 17:00 – 21:00
  scene5: { from: 630, dur: 150 },   // 21:00 – 26:00
  scene6: { from: 780, dur: 120 },   // 26:00 – 30:00
  scene7: { from: 900, dur: 90 },     // 30:00 – 33:00
  outro: { from: 990, dur: 140 },    // 33:00 – 37:45
} as const;

// ── Content Scene Data ─────────────────────────────────────────────────
export interface SceneData {
  id: string;
  from: number;
  dur: number;
  heading: string;
  subtitle: string;
  iconId: string;
  /** Higher icon position (icon ~38% instead of ~42%) */
  highIcon?: boolean;
}

export const CONTENT_SCENES: SceneData[] = [
  {
    id: 'scene1',
    from: 120,
    dur: 150,
    heading: 'YOUR PHONE CAN WAIT',
    subtitle: 'Turn on silent mode',
    iconId: 'phone',
    highIcon: false,
  },
  {
    id: 'scene2',
    from: 270,
    dur: 120,
    heading: 'KEEP IT DOWN',
    subtitle: 'Let the stage do the talking',
    iconId: 'shush',
    highIcon: true,
  },
  {
    id: 'scene3',
    from: 390,
    dur: 120,
    heading: "DON'T BE THE BLOCKING VIEW",
    subtitle: 'Stay in your seat',
    iconId: 'seat',
    highIcon: false,
  },
  {
    id: 'scene4',
    from: 510,
    dur: 120,
    heading: 'NO FLASH',
    subtitle: 'Let the stage lights shine',
    iconId: 'noFlash',
    highIcon: true,
  },
  {
    id: 'scene5',
    from: 630,
    dur: 150,
    heading: "DON'T SLEEP",
    subtitle: 'You might miss something',
    iconId: 'noSleep',
    highIcon: true,
  },
  {
    id: 'scene6',
    from: 780,
    dur: 120,
    heading: 'RESPECT',
    subtitle: 'Every performance deserves\nyour attention',
    iconId: 'respect',
    highIcon: true,
  },
  {
    id: 'scene7',
    from: 900,
    dur: 90,
    heading: 'CLOSING',
    subtitle: 'Cheer and give your best applause',
    iconId: 'closing',
    highIcon: true,
  },
];

// ── Typography ─────────────────────────────────────────────────────────
export const TYPE = {
  headingSize: 60,
  subtitleSize: 46,
  headingLetterSpacing: 1,
  /** Heading baseline at % of frame height */
  headingY: 0.61,
  /** Subtitle offset below heading */
  subtitleGap: 0.07,
  /** Icon center at % of frame height */
  iconY: 0.42,
  iconYHigh: 0.38,
  iconSize: 230,
} as const;

// ── Animation Tokens ───────────────────────────────────────────────────
export const ANIM = {
  /** Stagger between letters (frames) */
  letterStagger: 1.5,
  /** Duration per letter animation (frames) */
  letterDur: 14,
  /** Icon pop-in delay after scene start (frames) */
  iconDelay: 6,
  /** Heading starts after icon delay + this (frames) */
  headingDelay: 12,
  /** Subtitle starts after heading + this (frames) */
  subtitleDelay: 8,
  /** Exit duration (frames) */
  exitDur: 20,
  /** Spring for icon pop */
  iconSpring: { damping: 14, stiffness: 120, mass: 1 },
  /** Spring for letter wave */
  letterSpring: { damping: 14, stiffness: 120, mass: 1 },
  /** Ornament breathe cycle (frames) */
  ornamentBreathe: 120, // 4s at 30fps
} as const;
