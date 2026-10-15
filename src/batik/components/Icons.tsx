// ── Icons: flat solid dark-brown glyphs for each scene ──────────────────
import React from 'react';
import { C } from '../config';

const FILL = C.darkBrown;

/**
 * Scene 1: Smartphone with orange speaker icon on screen.
 */
const PhoneIcon: React.FC = () => (
  <svg width="230" height="230" viewBox="0 0 230 230">
    {/* Phone body */}
    <rect
      x="56"
      y="15"
      width="118"
      height="200"
      rx="20"
      fill="none"
      stroke={FILL}
      strokeWidth="9"
    />
    {/* Screen */}
    <rect
      x="69"
      y="42"
      width="92"
      height="136"
      rx="6"
      fill={FILL}
      opacity={0.08}
    />
    {/* Earpiece slit */}
    <rect x="98" y="27" width="34" height="4" rx="2" fill={FILL} />
    {/* Home button */}
    <circle cx="115" cy="195" r="7.5" fill="none" stroke={FILL} strokeWidth="3.5" />

    {/* Speaker on screen */}
    <g transform="translate(86, 78)">
      {/* Speaker box */}
      <rect x="0" y="14" width="16" height="24" rx="3" fill={C.rustOrange} />
      {/* Speaker horn */}
      <polygon points="16,14 42,2 42,50 16,38" fill={C.rustOrange} />
      {/* Sound waves (orange) */}
      <path
        d="M48,15 Q59,26 48,37"
        fill="none"
        stroke={C.rustOrange}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M56,8 Q71,26 56,44"
        fill="none"
        stroke={C.copper}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

/**
 * Scene 2: Circle with silhouette of a face in profile, finger on lips (shush).
 */
const ShushIcon: React.FC = () => (
  <svg width="230" height="230" viewBox="0 0 230 230">
    {/* Outer circle */}
    <circle
      cx="115"
      cy="115"
      r="95"
      fill="none"
      stroke={FILL}
      strokeWidth="8"
    />

    {/* Human Head in Profile facing Left */}
    {/* Back of skull */}
    <circle cx="132" cy="105" r="42" fill={FILL} />
    {/* Forehead, nose, lips, chin, neck profile */}
    <path
      d="M132,63
         C110,63 96,72 88,85
         L70,98
         L86,106
         C88,110 84,114 82,118
         C86,122 84,126 80,130
         C86,138 98,146 114,148
         L120,165
         L144,165
         L140,147
         Z"
      fill={FILL}
    />

    {/* Shushing Hand: Index finger pointing straight up at lips */}
    <g transform="translate(68, 86)">
      <rect x="0" y="0" width="13" height="46" rx="6.5" fill={FILL} />
      <ellipse cx="6.5" cy="48" rx="12" ry="14" fill={FILL} />
    </g>
  </svg>
);

/**
 * Scene 3: Person sitting on chair, side view.
 */
const SeatIcon: React.FC = () => (
  <svg width="230" height="230" viewBox="0 0 230 230">
    {/* Theater chair backrest */}
    <rect x="136" y="70" width="10" height="110" rx="4" fill={FILL} />
    {/* Theater chair cushion / seat */}
    <rect x="68" y="165" width="80" height="11" rx="4" fill={FILL} />
    {/* Front leg */}
    <rect x="74" y="174" width="9" height="38" rx="3" fill={FILL} />
    {/* Back leg */}
    <rect x="136" y="174" width="9" height="38" rx="3" fill={FILL} />

    {/* Person's head */}
    <circle cx="102" cy="56" r="22" fill={FILL} />
    {/* Torso */}
    <path
      d="M88,82 C88,80 120,80 120,82 L116,140 C116,142 88,142 88,140 Z"
      fill={FILL}
    />
    {/* Arm resting naturally */}
    <path
      d="M102,92 L102,126 L86,138"
      fill="none"
      stroke={C.cream}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Upper leg / thigh */}
    <rect x="76" y="136" width="54" height="18" rx="7" fill={FILL} />
    {/* Lower leg */}
    <rect x="70" y="148" width="16" height="42" rx="6" fill={FILL} />
    {/* Foot */}
    <path d="M68,186 L94,186 C97,186 97,194 92,194 L68,194 Z" fill={FILL} />
  </svg>
);

/**
 * Scene 4: Camera flash with diagonal strike-through.
 */
const NoFlashIcon: React.FC = () => (
  <svg width="230" height="230" viewBox="0 0 230 230">
    {/* Camera top bump */}
    <path d="M90,75 L102,62 L128,62 L140,75 Z" fill={FILL} />
    {/* Camera body */}
    <rect
      x="44"
      y="74"
      width="142"
      height="102"
      rx="16"
      fill="none"
      stroke={FILL}
      strokeWidth="8"
    />
    {/* Camera lens outer */}
    <circle cx="115" cy="125" r="32" fill="none" stroke={FILL} strokeWidth="7" />
    <circle cx="115" cy="125" r="16" fill={FILL} opacity={0.25} />
    {/* Flash burst bolt */}
    <polygon
      points="106,30 124,30 116,56 130,56 98,90 108,64 92,64"
      fill={C.rustOrange}
    />
    {/* Diagonal prohibition strike */}
    <line
      x1="34"
      y1="196"
      x2="196"
      y2="34"
      stroke={FILL}
      strokeWidth="9"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Scene 5: Circle with person sleeping in bed with "z z", prohibition slash.
 */
const NoSleepIcon: React.FC = () => (
  <svg width="230" height="230" viewBox="0 0 230 230">
    {/* Outer circle */}
    <circle
      cx="115"
      cy="115"
      r="95"
      fill="none"
      stroke={FILL}
      strokeWidth="8"
    />
    {/* Bed frame */}
    <rect x="48" y="132" width="134" height="9" rx="3" fill={FILL} />
    {/* Bed legs */}
    <rect x="52" y="140" width="7" height="18" rx="2" fill={FILL} />
    <rect x="171" y="140" width="7" height="18" rx="2" fill={FILL} />
    {/* Headboard */}
    <rect x="48" y="104" width="8" height="30" rx="3" fill={FILL} />

    {/* Pillow */}
    <rect x="58" y="118" width="32" height="16" rx="6" fill={FILL} opacity={0.5} />
    {/* Person's sleeping head */}
    <circle cx="76" cy="108" r="15" fill={FILL} />
    {/* Blanket covering body */}
    <path
      d="M88,118 Q125,110 168,122 L168,133 L88,133 Z"
      fill={FILL}
      opacity={0.35}
    />

    {/* Floating "z z z" */}
    <text
      x="122"
      y="90"
      fontSize="24"
      fontWeight="900"
      fill={C.rustOrange}
      fontFamily="Montserrat, sans-serif"
    >
      z
    </text>
    <text
      x="142"
      y="74"
      fontSize="19"
      fontWeight="900"
      fill={C.rustOrange}
      fontFamily="Montserrat, sans-serif"
      opacity={0.8}
    >
      z
    </text>
    <text
      x="158"
      y="60"
      fontSize="15"
      fontWeight="900"
      fill={C.rustOrange}
      fontFamily="Montserrat, sans-serif"
      opacity={0.6}
    >
      z
    </text>

    {/* Prohibition slash */}
    <line
      x1="48"
      y1="182"
      x2="182"
      y2="48"
      stroke={FILL}
      strokeWidth="8"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Scene 6: Performer standing on top of audience silhouettes, pointing out.
 */
const RespectIcon: React.FC = () => (
  <svg width="230" height="230" viewBox="0 0 230 230">
    {/* Stage line / platform */}
    <rect x="28" y="152" width="174" height="7" rx="3" fill={FILL} />

    {/* Performer head */}
    <circle cx="115" cy="84" r="18" fill={FILL} />
    {/* Performer body */}
    <rect x="105" y="103" width="20" height="42" rx="6" fill={FILL} />
    {/* Performer arms gesturing / pointing outwards */}
    <line
      x1="106"
      y1="112"
      x2="70"
      y2="98"
      stroke={FILL}
      strokeWidth="6"
      strokeLinecap="round"
    />
    <line
      x1="124"
      y1="112"
      x2="160"
      y2="98"
      stroke={FILL}
      strokeWidth="6"
      strokeLinecap="round"
    />
    {/* Performer legs */}
    <line
      x1="110"
      y1="145"
      x2="102"
      y2="175"
      stroke={FILL}
      strokeWidth="6"
      strokeLinecap="round"
    />
    <line
      x1="120"
      y1="145"
      x2="128"
      y2="175"
      stroke={FILL}
      strokeWidth="6"
      strokeLinecap="round"
    />

    {/* Audience silhouettes below the stage */}
    {[46, 80, 115, 150, 184].map((x, i) => (
      <g key={x} opacity={i === 2 ? 0.35 : 0.5}>
        <circle cx={x} cy={182} r={10} fill={FILL} />
        <path
          d={`M${x - 12},202 C${x - 12},193 ${x + 12},193 ${x + 12},202 Z`}
          fill={FILL}
        />
      </g>
    ))}
  </svg>
);

/**
 * Scene 7: Person with both arms up, sparkles + confetti ribbons flying around head.
 * Confetti drifts up slowly with frame.
 */
const ClosingIcon: React.FC<{ frame?: number }> = ({ frame = 0 }) => {
  // Drifting confetti
  const drift = frame * 0.4;

  return (
    <svg width="230" height="230" viewBox="0 0 230 230">
      {/* Person head */}
      <circle cx="115" cy="85" r="20" fill={FILL} />
      {/* Person body */}
      <rect x="105" y="106" width="20" height="44" rx="6" fill={FILL} />
      {/* Arms up in applause / celebration */}
      <line
        x1="106"
        y1="114"
        x2="68"
        y2="72"
        stroke={FILL}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="124"
        y1="114"
        x2="162"
        y2="72"
        stroke={FILL}
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Legs */}
      <line
        x1="110"
        y1="148"
        x2="96"
        y2="188"
        stroke={FILL}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="120"
        y1="148"
        x2="134"
        y2="188"
        stroke={FILL}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Sparkles around head (4-point star sparkles) */}
      {[
        [60, 48, 1],
        [82, 32, 0.8],
        [148, 32, 0.8],
        [170, 48, 1],
        [50, 78, 0.7],
        [180, 78, 0.7],
        [115, 24, 0.9],
      ].map(([x, y, scale], i) => {
        const floatY = -((drift * 0.8 + i * 5) % 24);
        return (
          <g
            key={`s-${i}`}
            transform={`translate(${x}, ${Number(y) + floatY}) scale(${scale})`}
          >
            <polygon
              points="0,-7 2,-2 7,0 2,2 0,7 -2,2 -7,0 -2,-2"
              fill={C.rustOrange}
            />
          </g>
        );
      })}

      {/* Confetti ribbons fluttering up */}
      {[
        { x: 55, y: 65, w: 5, h: 14, color: C.copper, rot: 25 },
        { x: 92, y: 44, w: 4, h: 12, color: C.rustOrange, rot: -40 },
        { x: 138, y: 44, w: 4, h: 12, color: C.copper, rot: 35 },
        { x: 175, y: 65, w: 5, h: 14, color: C.rustOrange, rot: -20 },
        { x: 74, y: 88, w: 4, h: 10, color: C.rustOrange, rot: 50 },
        { x: 156, y: 88, w: 4, h: 10, color: C.copper, rot: -50 },
      ].map((c, i) => {
        const cY = c.y - ((drift + i * 8) % 36);
        const spin = c.rot + drift * 3;
        return (
          <rect
            key={`c-${i}`}
            x={c.x - c.w / 2}
            y={cY - c.h / 2}
            width={c.w}
            height={c.h}
            rx={2}
            fill={c.color}
            opacity={0.8}
            transform={`rotate(${spin} ${c.x} ${cY})`}
          />
        );
      })}
    </svg>
  );
};

// ── Icon Registry ────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.FC<{ frame?: number }>> = {
  phone: PhoneIcon,
  shush: ShushIcon,
  seat: SeatIcon,
  noFlash: NoFlashIcon,
  noSleep: NoSleepIcon,
  respect: RespectIcon,
  closing: ClosingIcon,
};

export const SceneIcon: React.FC<{
  iconId: string;
  frame?: number;
}> = ({ iconId, frame }) => {
  const Icon = ICON_MAP[iconId];
  if (!Icon) {
    return (
      <div
        style={{
          width: 230,
          height: 230,
          border: `4px dashed ${FILL}`,
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: FILL,
          fontSize: 14,
          fontFamily: 'sans-serif',
        }}
      >
        TODO: {iconId}
      </div>
    );
  }
  return <Icon frame={frame} />;
};
