import { loadFont as loadAnton } from '@remotion/google-fonts/Anton';
import { loadFont as loadInstrumentSerif } from '@remotion/google-fonts/InstrumentSerif';
import { loadFont as loadInterTight } from '@remotion/google-fonts/InterTight';
import { loadFont as loadJetBrainsMono } from '@remotion/google-fonts/JetBrainsMono';

const { fontFamily: display } = loadAnton('normal', {
	weights: ['400'],
	subsets: ['latin'],
	ignoreTooManyRequestsWarning: true,
});

const { fontFamily: serif } = loadInstrumentSerif('italic', {
	weights: ['400'],
	subsets: ['latin'],
	ignoreTooManyRequestsWarning: true,
});

const { fontFamily: ui } = loadInterTight('normal', {
	weights: ['500', '700', '800'],
	subsets: ['latin'],
	ignoreTooManyRequestsWarning: true,
});

const { fontFamily: mono } = loadJetBrainsMono('normal', {
	weights: ['400', '500', '700'],
	subsets: ['latin'],
	ignoreTooManyRequestsWarning: true,
});

/** Ultra-bold condensed display face — headlines. */
export const FONT_DISPLAY = display;

/** Big-title face (alias of FONT_DISPLAY). */
export const FONT_TITLE = display;

/** Elegant italic serif — poetic subtitles. */
export const FONT_SERIF = serif;

/** Grotesque sans — labels, chips, coordinates. */
export const FONT_UI = ui;

/** Tiny uppercase tracked monospace — timecode & technical labels. */
export const FONT_MONO = mono;
