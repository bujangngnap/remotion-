import React from 'react';
import { C } from '../constants';

/**
 * Procedural & Vector Traditional Indonesian Patterns:
 * - Megamendung (Cirebon cloud swirls)
 * - Parang Rusak (Royal diagonal wave blades)
 * - Kawung (Four-petal cross geometry)
 * - Pucuak Rabuang (Minangkabau bamboo shoot triangle)
 * - Pa'tedong & Pa'barre Allo (Toraja sun and buffalo horn motifs)
 * - Songket & Tenun Ikat Diamond Weave
 */

/** Megamendung Cloud Swirl (Cirebon) */
export const MegamendungCloud: React.FC<{
	width?: number;
	height?: number;
	color?: string;
	accentColor?: string;
	opacity?: number;
	style?: React.CSSProperties;
}> = ({
	width = 320,
	height = 140,
	color = C.imperialGold,
	accentColor = C.warmAmber,
	opacity = 1,
	style,
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 320 140"
			fill="none"
			style={{ overflow: 'visible', opacity, ...style }}
		>
			<defs>
				<linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="50%">
					<stop offset="0%" stopColor={color} stopOpacity="0.9" />
					<stop offset="100%" stopColor={accentColor} stopOpacity="0.4" />
				</linearGradient>
			</defs>
			{/* Outer cloud tier */}
			<path
				d="M10,95 C15,55 60,40 100,50 C125,25 180,20 220,45 C255,20 305,45 310,80 C315,115 270,125 240,115 C200,135 140,130 110,115 C75,130 20,125 10,95 Z"
				stroke="url(#cloudGrad)"
				strokeWidth="2.5"
				fill={color}
				fillOpacity="0.08"
			/>
			{/* Mid cloud tier */}
			<path
				d="M40,90 C45,62 80,50 110,58 C130,40 170,36 200,55 C228,38 270,55 275,82 C280,105 245,115 220,108 C190,120 145,118 120,106 C90,118 50,112 40,90 Z"
				stroke={color}
				strokeWidth="1.8"
				strokeOpacity="0.75"
				fill="none"
			/>
			{/* Inner spiral nucleus */}
			<path
				d="M90,82 C100,68 130,62 155,72 C175,60 210,70 215,88 C218,102 195,108 175,102 C150,110 120,105 102,96 C92,94 88,88 90,82 Z"
				stroke={accentColor}
				strokeWidth="1.5"
				strokeOpacity="0.9"
				fill="none"
			/>
			<circle cx="155" cy="86" r="4" fill={color} />
		</svg>
	);
};

/** Batik Kawung Grid Lattice (Four-circle lotus geometry) */
export const BatikKawungUnit: React.FC<{
	size?: number;
	color?: string;
	coreColor?: string;
	strokeWidth?: number;
	style?: React.CSSProperties;
}> = ({
	size = 120,
	color = C.imperialGold,
	coreColor = C.warmAmber,
	strokeWidth = 2,
	style,
}) => {
	const half = size / 2;
	const r = size * 0.38;
	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			style={{ overflow: 'visible', ...style }}
		>
			{/* 4 Elliptical crossing petals */}
			<ellipse
				cx={half}
				cy={half - r * 0.6}
				rx={r * 0.45}
				ry={r * 0.75}
				fill="none"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
			<ellipse
				cx={half}
				cy={half + r * 0.6}
				rx={r * 0.45}
				ry={r * 0.75}
				fill="none"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
			<ellipse
				cx={half - r * 0.6}
				cy={half}
				rx={r * 0.75}
				ry={r * 0.45}
				fill="none"
				stroke={color}
				strokeWidth={strokeWidth}
			/>
			<ellipse
				cx={half + r * 0.6}
				cy={half}
				rx={r * 0.75}
				ry={r * 0.45}
				fill="none"
				stroke={color}
				strokeWidth={strokeWidth}
			/>

			{/* Center diamond & seed dots */}
			<rect
				x={half - 6}
				y={half - 6}
				width={12}
				height={12}
				fill={coreColor}
				transform={`rotate(45 ${half} ${half})`}
			/>
			<circle cx={half} cy={half - r * 0.55} r={3} fill={color} />
			<circle cx={half} cy={half + r * 0.55} r={3} fill={color} />
			<circle cx={half - r * 0.55} cy={half} r={3} fill={color} />
			<circle cx={half + r * 0.55} cy={half} r={3} fill={color} />
		</svg>
	);
};

/** Batik Parang Rusak Blade Wave (Dynamic drawing support) */
export const BatikParangBlade: React.FC<{
	width?: number;
	height?: number;
	color?: string;
	strokeDashoffset?: number;
	strokeDasharray?: number;
	style?: React.CSSProperties;
}> = ({
	width = 240,
	height = 360,
	color = C.imperialGold,
	strokeDashoffset = 0,
	strokeDasharray = 1000,
	style,
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 240 360"
			fill="none"
			style={{ overflow: 'visible', ...style }}
		>
			{/* Main diagonal knife/wave curve (Mlinjon & Parang flame) */}
			<path
				d="M30,330 C70,290 120,230 150,170 C175,120 185,70 210,30"
				stroke={color}
				strokeWidth="4"
				strokeLinecap="round"
				strokeDasharray={strokeDasharray}
				strokeDashoffset={strokeDashoffset}
			/>
			{/* Hook tendrils */}
			<path
				d="M100,245 C80,225 65,240 70,260 C76,280 110,270 120,245"
				stroke={color}
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeDasharray={strokeDasharray}
				strokeDashoffset={strokeDashoffset}
			/>
			<path
				d="M145,160 C125,140 110,155 115,175 C121,195 155,185 165,160"
				stroke={color}
				strokeWidth="2.5"
				strokeLinecap="round"
				strokeDasharray={strokeDasharray}
				strokeDashoffset={strokeDashoffset}
			/>
			{/* Diamond accents along axis */}
			<polygon points="50,295 62,305 50,315 38,305" fill={color} opacity="0.8" />
			<polygon points="110,210 122,220 110,230 98,220" fill={color} opacity="0.8" />
			<polygon points="170,125 182,135 170,145 158,135" fill={color} opacity="0.8" />
		</svg>
	);
};

/** Minangkabau Pucuak Rabuang (Bamboo shoot pyramid motif) */
export const PucuakRabuang: React.FC<{
	size?: number;
	color?: string;
	style?: React.CSSProperties;
}> = ({ size = 120, color = C.imperialGold, style }) => {
	return (
		<svg
			width={size}
			height={size * 1.5}
			viewBox="0 0 100 150"
			fill="none"
			style={{ overflow: 'visible', ...style }}
		>
			{/* Triangular stepped shoot silhouette */}
			<polygon
				points="50,5 95,145 5,145"
				stroke={color}
				strokeWidth="3"
				fill={color}
				fillOpacity="0.12"
			/>
			{/* Inner chevron tiers */}
			<path d="M50,35 L80,135 L20,135 Z" stroke={color} strokeWidth="2" fill="none" />
			<path d="M50,65 L70,125 L30,125 Z" stroke={color} strokeWidth="2" fill="none" />
			<line x1="50" y1="5" x2="50" y2="145" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
			<circle cx="50" cy="5" r="4" fill={color} />
		</svg>
	);
};

/** Toraja Pa'tedong (Sacred buffalo head motif) & Pa'barre Allo (Sun burst) */
export const TorajaPaTedong: React.FC<{
	size?: number;
	color?: string;
	style?: React.CSSProperties;
}> = ({ size = 140, color = C.imperialGold, style }) => {
	const half = size / 2;
	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			fill="none"
			style={{ overflow: 'visible', ...style }}
		>
			{/* Outer sun burst rays */}
			{Array.from({ length: 12 }).map((_, i) => {
				const ang = (i * 30 * Math.PI) / 180;
				const x1 = half + Math.cos(ang) * (half * 0.72);
				const y1 = half + Math.sin(ang) * (half * 0.72);
				const x2 = half + Math.cos(ang) * (half * 0.95);
				const y2 = half + Math.sin(ang) * (half * 0.95);
				return (
					<line
						key={i}
						x1={x1}
						y1={y1}
						x2={x2}
						y2={y2}
						stroke={color}
						strokeWidth="2.5"
						strokeLinecap="round"
					/>
				);
			})}
			{/* Concentric rings */}
			<circle cx={half} cy={half} r={half * 0.68} stroke={color} strokeWidth="2" />
			<circle cx={half} cy={half} r={half * 0.52} stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />

			{/* Stylized Buffalo horns silhouette inside */}
			<path
				d={`M${half - 30},${half + 15} C${half - 35},${half - 20} ${half - 20},${half - 30} ${half},${half - 15} C${half + 20},${half - 30} ${half + 35},${half - 20} ${half + 30},${half + 15}`}
				stroke={color}
				strokeWidth="4"
				strokeLinecap="round"
				fill="none"
			/>
			{/* Face center diamond */}
			<polygon
				points={`${half},${half - 8} ${half + 10},${half + 10} ${half},${half + 24} ${half - 10},${half + 10}`}
				fill={color}
			/>
		</svg>
	);
};

/** Sumba / Tenun Ikat Interlocking Diamond Weave Unit */
export const TenunIkatDiamond: React.FC<{
	width?: number;
	height?: number;
	color1?: string;
	color2?: string;
	color3?: string;
	style?: React.CSSProperties;
}> = ({
	width = 160,
	height = 240,
	color1 = C.imperialGold,
	color2 = C.terracotta,
	color3 = C.royalIndigo,
	style,
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 160 240"
			fill="none"
			style={{ overflow: 'visible', ...style }}
		>
			{/* Concentric stepped diamond ikat pattern */}
			<polygon points="80,10 150,120 80,230 10,120" stroke={color1} strokeWidth="3" fill="none" />
			<polygon points="80,35 130,120 80,205 30,120" stroke={color2} strokeWidth="3" fill="none" />
			<polygon points="80,60 110,120 80,180 50,120" stroke={color3} strokeWidth="3" fill="none" />
			<polygon points="80,85 92,120 80,155 68,120" fill={color1} />

			{/* Stepped fret serrations characteristic of Tenun Ikat */}
			{[-30, 0, 30].map((dy, i) => (
				<g key={i}>
					<line x1="8" y1={120 + dy} x2="20" y2={120 + dy} stroke={color1} strokeWidth="2" />
					<line x1="140" y1={120 + dy} x2="152" y2={120 + dy} stroke={color1} strokeWidth="2" />
				</g>
			))}
		</svg>
	);
};

/** Canting Pen Vector (for stroke-by-stroke animation) */
export const CantingPen: React.FC<{
	style?: React.CSSProperties;
}> = ({ style }) => {
	return (
		<svg
			width="140"
			height="140"
			viewBox="0 0 140 140"
			fill="none"
			style={{ overflow: 'visible', ...style }}
		>
			<defs>
				<radialGradient id="moltenGlow" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor="#FFF3B0" />
					<stop offset="50%" stopColor={C.imperialGold} />
					<stop offset="100%" stopColor={C.warmAmber} />
				</radialGradient>
				<filter id="waxGlow" x="-50%" y="-50%" width="200%" height="200%">
					<feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={C.imperialGold} floodOpacity="0.8" />
				</filter>
			</defs>
			{/* Wooden bamboo handle */}
			<line x1="130" y1="10" x2="65" y2="75" stroke="#7A4B2A" strokeWidth="8" strokeLinecap="round" />
			<line x1="130" y1="10" x2="65" y2="75" stroke="#A66838" strokeWidth="3" strokeLinecap="round" />

			{/* Copper wax bowl (nyamplung) */}
			<ellipse
				cx="62"
				cy="78"
				rx="18"
				ry="14"
				fill="#D47A3A"
				stroke="#B55B1F"
				strokeWidth="2.5"
				transform="rotate(-25 62 78)"
			/>
			{/* Molten wax inside bowl */}
			<ellipse
				cx="60"
				cy="76"
				rx="12"
				ry="8"
				fill="url(#moltenGlow)"
				transform="rotate(-25 60 76)"
				filter="url(#waxGlow)"
			/>

			{/* Curved copper spout (cucuk) leading to tip (0, 140) */}
			<path
				d="M48,84 Q30,95 20,120"
				stroke="#D47A3A"
				strokeWidth="4"
				strokeLinecap="round"
				fill="none"
			/>
			<path
				d="M48,84 Q30,95 20,120"
				stroke="#FFD54F"
				strokeWidth="1.5"
				strokeLinecap="round"
				fill="none"
			/>

			{/* Glowing molten wax droplet at the spout tip */}
			<circle cx="20" cy="120" r="5" fill="url(#moltenGlow)" filter="url(#waxGlow)" />
			<circle cx="20" cy="120" r="2" fill="#FFFFFF" />
		</svg>
	);
};
