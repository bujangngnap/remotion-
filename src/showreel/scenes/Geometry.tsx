import React, { useRef, useEffect } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { C } from '../constants';
import { FONT_SERIF, FONT_MONO } from '../fonts';
import { createRng, easeOutCubic, progress as prog } from '../utils';

const COLS = 28;
const ROWS = 16;


/**
 * [4.0–6.0s] 02 / GEOMETRY
 * Dense dot grid → shape morphing (circle → rounded square → diamond) with wave ripple →
 * "Form." in mix-blend difference → swirl + zoom.
 */
export const Geometry: React.FC = () => {
	const f = useCurrentFrame(); // 0‥119
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const cvs = canvasRef.current;
		if (!cvs) return;
		const ctx = cvs.getContext('2d');
		if (!ctx) return;
		const W = 1920;
		const H = 1080;
		cvs.width = W;
		cvs.height = H;
		ctx.clearRect(0, 0, W, H);

		const cellW = W / COLS;
		const cellH = H / ROWS;
		const rng = createRng(42);

		// Global transforms: swirl + zoom at end
		const zoomT = prog(f, 80, 120);
		const zoom = 1 + easeOutCubic(zoomT) * 4;
		const swirlAngle = easeOutCubic(zoomT) * 0.4;

		ctx.save();
		ctx.translate(W / 2, H / 2);
		ctx.scale(zoom, zoom);
		ctx.rotate(swirlAngle);
		ctx.translate(-W / 2, -H / 2);

		const colors = [C.offWhite, '#aaaaaa', C.hotOrange, C.acidLime, C.periwinkle];

		for (let row = 0; row < ROWS; row++) {
			for (let col = 0; col < COLS; col++) {
				const cx = (col + 0.5) * cellW;
				const cy = (row + 0.5) * cellH;
				const color = colors[Math.floor(rng() * colors.length)];

				// Morph phase based on wave from top-left
				const dist = Math.sqrt((col / COLS) ** 2 + (row / ROWS) ** 2) * 1.4;
				const morphT = prog(f, 20 + dist * 30, 50 + dist * 30);

				// Pill stretch at end
				const pillT = prog(f, 70, 100);
				const stretchX = 1 + easeOutCubic(pillT) * 1.8;
				const stretchY = 1 - easeOutCubic(pillT) * 0.4;

				const radius = (Math.min(cellW, cellH) * 0.32);

				ctx.save();
				ctx.translate(cx, cy);

				// Wave rotation
				const waveRot = Math.sin(morphT * Math.PI) * 0.5;
				ctx.rotate(waveRot + easeOutCubic(morphT) * Math.PI / 4);
				ctx.scale(stretchX, stretchY);

				ctx.fillStyle = color;
				ctx.beginPath();

				if (morphT < 0.01) {
					// Circle
					ctx.arc(0, 0, radius, 0, Math.PI * 2);
				} else if (morphT < 0.5) {
					// Morphing to rounded square
					const cornerR = radius * (1 - morphT * 1.4);
					roundedRect(ctx, -radius, -radius, radius * 2, radius * 2, Math.max(2, cornerR));
				} else {
					// Diamond
					const s = radius;
					ctx.moveTo(0, -s);
					ctx.lineTo(s, 0);
					ctx.lineTo(0, s);
					ctx.lineTo(-s, 0);
					ctx.closePath();
				}

				ctx.fill();
				ctx.restore();
			}
		}

		ctx.restore();
	}, [f]);

	// ── "Form." overlay ──
	const textOp = interpolate(f, [40, 50, 75, 85], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{ backgroundColor: C.inkBlack }}>
			<canvas
				ref={canvasRef}
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
				}}
			/>

			{/* "Form." text with mix-blend-difference */}
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					fontFamily: FONT_SERIF,
					fontStyle: 'italic',
					fontSize: 140,
					color: C.offWhite,
					opacity: textOp,
					mixBlendMode: 'difference',
					lineHeight: 1,
					textAlign: 'center',
				}}
			>
				Form.
				<div
					style={{
						fontFamily: FONT_MONO,
						fontStyle: 'normal',
						fontSize: 10,
						letterSpacing: '0.2em',
						marginTop: 16,
						textTransform: 'uppercase',
					}}
				>
					FOLLOWS / FEELING
				</div>
			</div>
		</AbsoluteFill>
	);
};

function roundedRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number,
) {
	ctx.moveTo(x + r, y);
	ctx.lineTo(x + w - r, y);
	ctx.quadraticCurveTo(x + w, y, x + w, y + r);
	ctx.lineTo(x + w, y + h - r);
	ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
	ctx.lineTo(x + r, y + h);
	ctx.quadraticCurveTo(x, y + h, x, y + h - r);
	ctx.lineTo(x, y + r);
	ctx.quadraticCurveTo(x, y, x + r, y);
	ctx.closePath();
}
