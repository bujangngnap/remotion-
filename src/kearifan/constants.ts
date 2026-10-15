export const FPS = 30;
export const DURATION_IN_SECONDS = 45;
export const TOTAL_FRAMES = FPS * DURATION_IN_SECONDS; // 1350 frames @ 30fps = 45.0s
export const WIDTH = 1920;
export const HEIGHT = 1080;

// ── Color Palette: Rich Indonesian Cultural Heritage ─────────────────────
export const C = {
	// Deep voids & midnight ocean
	obsidian: '#05070B',
	ink: '#0B0E17',
	midnightNavy: '#0A1120',
	royalIndigo: '#141E38',
	deepIndigo: '#111832',
	indigo: '#1B2450',

	// Sacred Goldsmithing & Canting Wax
	imperialGold: '#FFC837',
	warmAmber: '#E69526',
	glowYellow: '#FFE57F',
	moltenWax: '#FFB300',
	gold: '#E9B44C',
	goldBright: '#F7D98A',
	goldPale: '#FFF3C9',

	// Natural Heritage Earth & Architecture
	terracotta: '#C85A32',
	deepTerracotta: '#873318',
	terracottaDeep: '#A34A26',
	terracottaDark: '#7E3618',
	soganBatik: '#4A2A1E',
	darkCoffee: '#23140E',

	// Tropical Harmony & Subak
	emeraldGreen: '#0D7B54',
	emerald: '#2F8F6B',
	emeraldDeep: '#12452F',
	lushJade: '#129D6E',
	subakWater: '#27D9A4',
	paleMint: '#D0F7E9',

	// Pristine accents
	moriSilk: '#FBF9F4',
	cream: '#F3E9D2',
	offWhite: '#EBE6DC',
	pureWhite: '#FFFFFF',
	white: '#FFFFFF',
	crimsonAccent: '#C92A2A',
} as const;

// ── 5 Storyboard Scenes Timing (Frames @ 30fps, 45 seconds total) ────────
export const SCENES = {
	// 0.0s – 9.0s (f0 – f270): THE MAGIC OF INDONESIA
	scene1: {
		from: 0,
		dur: 270,
		title: 'THE MAGIC OF INDONESIA',
		subtitle: 'A LIVING WISDOM',
	},
	// 9.0s – 18.0s (f270 – f540): TRADITIONS THAT TELL STORIES
	scene2: {
		from: 270,
		dur: 270,
		title: 'TRADITIONS THAT TELL STORIES',
		subtitle: 'BALI • BATIK • TENUN IKAT',
	},
	// 18.0s – 27.0s (f540 – f810): WISDOM IN EVERYDAY LIFE
	scene3: {
		from: 540,
		dur: 270,
		title: 'WISDOM IN EVERYDAY LIFE',
		subtitle: 'SUBAK • GOTONG ROYONG • HARMONY',
	},
	// 27.0s – 36.0s (f810 – f1080): A MOSAIC OF DIVERSITY
	scene4: {
		from: 810,
		dur: 270,
		title: 'A MOSAIC OF DIVERSITY',
		subtitle: 'WEST SUMATRA • SOUTH SULAWESI',
	},
	// 36.0s – 45.0s (f1080 – f1350): THE FUTURE OF OUR HERITAGE
	scene5: {
		from: 1080,
		dur: 270,
		title: 'THE FUTURE OF OUR HERITAGE',
		subtitle: 'MENGENAL KEARIFAN LOKAL INDONESIA',
	},
} as const;

export const S = SCENES;

/** Hard cut frames — used for chromatic glitch & flash transitions */
export const CUTS = [270, 540, 810, 1080] as const;

// ── Geographic Coordinates & Metadata ─────────────────────────────────────
export const GEO_DATA = {
	nusantaraCoordinates: "0°47'19.5\"S 113°55'17.4\"E",
	jakartaCoordinates: "6°12'18.8\"S 106°49'38.3\"E",
	baliCoordinates: "8°20'27.6\"S 115°13'08.4\"E",
	torajaCoordinates: "3°02'21.1\"S 119°53'14.6\"E",
	minangCoordinates: "0°58'33.2\"S 100°21'43.9\"E",
	islandCount: "17,508",
	ethnicGroups: "1,340+",
	nationalMotto: "BHINNEKA TUNGGAL IKA",
	nationalTitleID: "MENGENAL KEARIFAN LOKAL INDONESIA",
	nationalTitleEN: "DISCOVERING INDONESIA'S LOCAL WISDOM",
	heritageSubtext: "PRESERVE THE LEGACY • INSPIRE THE FUTURE",
} as const;

// ── Image Assets ─────────────────────────────────────────────────────────
export const IMG = {
	archipelago: 'kearifan/archipelago.jpg',
	ceremony: 'kearifan/bali_ceremony.jpg',
	subak: 'kearifan/subak_terrace.jpg',
} as const;
