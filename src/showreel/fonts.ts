import { loadFont as loadInterTight } from '@remotion/google-fonts/InterTight';
import { loadFont as loadInstrumentSerif } from '@remotion/google-fonts/InstrumentSerif';
import { loadFont as loadJetBrainsMono } from '@remotion/google-fonts/JetBrainsMono';

const { fontFamily: heavy } = loadInterTight('normal', {
	weights: ['400', '700', '900'],
	subsets: ['latin'],
	ignoreTooManyRequestsWarning: true,
});
const { fontFamily: serif } = loadInstrumentSerif('italic', {
	weights: ['400'],
	subsets: ['latin'],
	ignoreTooManyRequestsWarning: true,
});
const { fontFamily: mono } = loadJetBrainsMono('normal', {
	weights: ['400', '500', '700'],
	subsets: ['latin'],
	ignoreTooManyRequestsWarning: true,
});

/** Ultra-bold grotesque sans (weight 900) */
export const FONT_HEAVY = heavy;

/** Elegant italic serif */
export const FONT_SERIF = serif;

/** Tiny uppercase tracked monospace */
export const FONT_MONO = mono;
