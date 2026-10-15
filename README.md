# 🎬 Remotion Motion Graphics & Video Suite

A modern, high-production motion design and programmatic video generation suite built with **[Remotion](https://www.remotion.dev/)**, **React 19**, and **TypeScript**.

---

## 🌟 Featured Compositions

### 1. 🇮🇩 Mengenal Kearifan Lokal Indonesia (Discovering Indonesia's Local Wisdom)
- **ID**: `KearifanLokal`
- **Format**: 16:9 Landscape (1920×1080) @ 30 fps
- **Duration**: 45.0 seconds (1,350 frames)
- **Overview**: A cinematic cultural tourism motion design showreel celebrating Indonesia's living heritage across 5 micro-acts:
  1. *The Magic of Indonesia* — Archipelago satellite emergence with glowing tracer lines & kinetic typography.
  2. *Traditions That Tell Stories* — Balinese Candi Bentar split gates, molten-wax Batik Canting drawing, and Sumba Tenun Ikat.
  3. *Wisdom in Everyday Life* — Subak Bali terraced irrigation networks and Gotong Royong community synergy.
  4. *A Mosaic of Diversity* — West Sumatra Rumah Gadang, South Sulawesi Tongkonan Toraja, and dynamic 4-slat mosaic typography.
  5. *The Future of Our Heritage* — Kaleidoscopic cultural mandala bloom and grand national title reveal.

### 2. 🎬 Motion Designer Showreel 2026
- **ID**: `Showreel`
- **Format**: 16:9 Landscape (1920×1080) @ 60 fps
- **Duration**: 15.0 seconds (900 frames)

### 3. 🎭 Batik Etiquette
- **ID**: `BatikEtiquette`
- **Format**: 2:1 Cinema (1920×960) @ 30 fps

### 4. 🌿 Tumbuh Kembang Group (TKG) Promo
- **ID**: `TKGPromo` (1:1 Square) & `TKGPromo-Vertical` (9:16 Vertical)

### 5. 📸 Fotokita & Kenangita Promos
- Dynamic promotional video suites for photo studio & memory booking platforms.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
npm install
```

### Development (Remotion Studio)
Launch the interactive Remotion Studio player in your browser:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to preview, scrub, and inspect all compositions in real-time.

---

## 🎥 Rendering Videos

Render any composition to production MP4:

```bash
# Render Kearifan Lokal Indonesia (45s, 30fps)
npm run render:kearifan

# Render Motion Designer Showreel 2026
npm run render:showreel

# Render Batik Etiquette
npm run render:batik

# Render Fotokita Promo
npm run render:fotokita
```

All rendered videos are output to the `out/` folder.

---

## 🛠 Tech Stack
- **Engine**: [Remotion 4.0](https://www.remotion.dev/)
- **Core**: React 19, TypeScript
- **Styling**: Vanilla CSS, SVG vector art, WebGL/Canvas shaders
- **Audio**: Custom multi-track sound design & spatial cues
