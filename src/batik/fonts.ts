// ── Google Fonts for BatikEtiquette ────────────────────────────────────
import { loadFont as loadMontserrat } from '@remotion/google-fonts/Montserrat';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';

const { fontFamily: montserratFamily } = loadMontserrat('normal', {
  weights: ['800'],
  subsets: ['latin'],
});

const { fontFamily: montserratItalicFamily } = loadMontserrat('italic', {
  weights: ['800'],
  subsets: ['latin'],
});

const { fontFamily: playfairFamily } = loadPlayfair('italic', {
  weights: ['700'],
  subsets: ['latin'],
});

export const FONTS = {
  heading: montserratFamily,
  headingItalic: montserratItalicFamily,
  subtitle: playfairFamily,
} as const;
