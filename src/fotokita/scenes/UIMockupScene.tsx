import React from "react";
import { AbsoluteFill, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BOUNCY, bump, CLAMP, SNAPPY, springAt, wave } from "../animations";
import { BrowserWindow } from "../components/BrowserWindow";
import { PhotoStrip } from "../components/PhotoStrip";
import { Sfx } from "../components/SceneShell";
import { C, fontSans, PHOTO_LIST, SFX } from "../theme";

// ---- Timing (frame relatif scene) ----
const STEP_IN = [18, 28, 38];
const PEACE_DETECT = 60;
const CAPTURES = [96, 118, 140, 162];
const FRAME_PICK = 178;
const SAVE_CLICK = 194;

const STEPS = [
  { emoji: "✌️", label: "angkat pose peace" },
  { emoji: "📸", label: "4 kali cekrek otomatis" },
  { emoji: "🖼️", label: "Pilih bingkai & simpan!" },
];

const FRAME_COLORS = [C.white, C.pinkPale, C.lavenderPale, C.ink];

const PREVIEW_W = 640;
const PREVIEW_H = 480;

/** Scene 5 — Browser mockup: langkah di kiri, photobox UI di kanan */
export const UIMockupScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const win = springAt(frame, fps, 0, SNAPPY);
  const activeStep = frame < 92 ? 0 : frame < 172 ? 1 : 2;
  const shots = CAPTURES.filter((c) => frame >= c).length;
  const previewPhoto = PHOTO_LIST[Math.min(shots, 3)];

  const flash = CAPTURES.reduce((acc, c) => Math.max(acc, interpolate(frame, [c, c + 2, c + 10], [0, 0.95, 0], CLAMP)), 0);
  const press = CAPTURES.reduce((acc, c) => Math.max(acc, bump(frame, c - 2, 2, 8)), 0);
  const detect = springAt(frame, fps, PEACE_DETECT, BOUNCY);
  const detectOut = interpolate(frame, [CAPTURES[0] - 4, CAPTURES[0]], [1, 0], CLAMP);
  const done = springAt(frame, fps, CAPTURES[3] + 10, BOUNCY);

  const selected = frame >= FRAME_PICK ? 1 : 0;
  const stripBump = bump(frame, FRAME_PICK, 3, 10);
  const saveEnabled = interpolate(frame, [170, 176], [0.35, 1], CLAMP);
  const savePress = bump(frame, SAVE_CLICK - 2, 2, 8);
  const toast = springAt(frame, fps, SAVE_CLICK + 2, BOUNCY);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ transform: `translateY(${interpolate(win, [0, 1], [90, 0])}px) scale(${interpolate(win, [0, 1], [0.92, 1])})`, opacity: win }}>
        <BrowserWindow width={1660} height={900}>
          <div style={{ position: "absolute", inset: 0, padding: "52px 60px", display: "flex", gap: 56, alignItems: "center" }}>
            {/* ===== Kiri: daftar langkah ===== */}
            <div style={{ width: 580, display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "8px 20px",
                  borderRadius: 999,
                  background: C.pinkPale,
                  color: C.pink,
                  fontFamily: fontSans,
                  fontWeight: 700,
                  fontSize: 22,
                  letterSpacing: 1,
                }}
              >
                ✨ CARA PAKAI
              </div>
              <div style={{ marginTop: 20, fontFamily: fontSans, fontWeight: 800, fontSize: 66, lineHeight: 1.04, letterSpacing: -2, color: C.ink }}>
                3 langkah,
                <br />
                <span style={{ color: C.pink }}>langsung jadi.</span>
              </div>
              <div style={{ marginTop: 14, fontFamily: fontSans, fontWeight: 400, fontSize: 26, color: C.gray }}>Foto bareng temen tanpa ribet 💕</div>

              <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 18 }}>
                {STEPS.map((s, i) => {
                  const p = springAt(frame, fps, STEP_IN[i], SNAPPY);
                  const isActive = i === activeStep && frame >= 50;
                  const isDone = i < activeStep;
                  const act = springAt(frame, fps, i === 0 ? 50 : i === 1 ? 92 : 172, SNAPPY) * (isActive ? 1 : 0);
                  return (
                    <div
                      key={s.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 22,
                        padding: "18px 24px",
                        borderRadius: 26,
                        background: isActive ? C.blush : C.white,
                        border: `3px solid ${isActive ? C.pink : C.grayLight}`,
                        boxShadow: isActive ? "0 18px 40px rgba(255,64,129,0.2)" : "0 4px 12px rgba(23,19,28,0.04)",
                        transform: `translateX(${interpolate(p, [0, 1], [-80, 0]) + act * 14}px)`,
                        opacity: p,
                      }}
                    >
                      <div
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 22,
                          background: isActive ? C.pink : C.pinkPale,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 36,
                          transform: `rotate(${isActive ? wave(frame, 30, 8) : 0}deg)`,
                        }}
                      >
                        {s.emoji}
                      </div>
                      <div style={{ flex: 1, fontFamily: fontSans }}>
                        <div style={{ fontSize: 18, fontWeight: 600, color: C.gray, letterSpacing: 1 }}>LANGKAH {i + 1}</div>
                        <div style={{ fontSize: 30, fontWeight: 700, color: C.ink }}>{s.label}</div>
                      </div>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          background: isDone ? C.pink : "transparent",
                          border: `3px solid ${isDone ? C.pink : C.grayLight}`,
                          color: "#fff",
                          fontFamily: fontSans,
                          fontWeight: 800,
                          fontSize: 22,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {isDone ? "✓" : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===== Kanan: photobox UI ===== */}
            <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {/* Preview kamera */}
                <div style={{ width: PREVIEW_W, height: PREVIEW_H, borderRadius: 30, overflow: "hidden", position: "relative", background: C.ink, boxShadow: "0 24px 60px rgba(23,19,28,0.18)" }}>
                  <Img
                    src={previewPhoto}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.04 + wave(frame, 90, 0.02)}) translateX(${wave(frame, 120, 6)}px)` }}
                  />
                  <div style={{ position: "absolute", top: 20, left: 20, padding: "6px 16px", borderRadius: 999, background: "rgba(23,19,28,0.55)", color: "#fff", fontFamily: fontSans, fontWeight: 700, fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: C.pink, opacity: Math.floor(frame / 10) % 2 ? 0.4 : 1 }} />
                    LIVE
                  </div>
                  <div style={{ position: "absolute", top: 20, right: 20, padding: "6px 16px", borderRadius: 999, background: "rgba(255,255,255,0.9)", color: C.ink, fontFamily: fontSans, fontWeight: 700, fontSize: 18 }}>
                    📸 {shots}/4
                  </div>
                  {/* Badge peace terdeteksi */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: 26,
                      transform: `translateX(-50%) scale(${detect * detectOut})`,
                      padding: "12px 26px",
                      borderRadius: 999,
                      background: C.pink,
                      color: "#fff",
                      fontFamily: fontSans,
                      fontWeight: 700,
                      fontSize: 24,
                      whiteSpace: "nowrap",
                      boxShadow: "0 12px 30px rgba(255,64,129,0.45)",
                    }}
                  >
                    ✌️ peace terdeteksi! cekrek otomatis...
                  </div>
                  {/* Overlay selesai */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) scale(${done})`,
                      padding: "18px 34px",
                      borderRadius: 26,
                      background: "rgba(255,255,255,0.95)",
                      color: C.ink,
                      fontFamily: fontSans,
                      fontWeight: 800,
                      fontSize: 34,
                      whiteSpace: "nowrap",
                    }}
                  >
                    4/4 selesai! 🎉
                  </div>
                  <div style={{ position: "absolute", inset: 0, background: "#fff", opacity: flash }} />
                </div>

                {/* Kontrol */}
                <div style={{ height: 110, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", opacity: interpolate(frame, [168, 174], [0.45, 1], CLAMP) }}>
                    {FRAME_COLORS.map((c, i) => (
                      <div
                        key={c}
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: c,
                          border: `3px solid ${C.grayLight}`,
                          boxShadow: i === selected && frame >= 168 ? `0 0 0 4px #fff, 0 0 0 7px ${C.pink}` : undefined,
                          transform: `scale(${i === selected ? 1 + bump(frame, FRAME_PICK, 3, 8) * 0.25 : 1})`,
                        }}
                      />
                    ))}
                  </div>

                  <div
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      border: `6px solid ${C.pinkLight}`,
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: `scale(${1 - press * 0.14 + (frame < CAPTURES[0] ? wave(frame, 24, 0.04) : 0)})`,
                      boxShadow: "0 12px 30px rgba(255,64,129,0.3)",
                    }}
                  >
                    <div style={{ width: 70, height: 70, borderRadius: "50%", background: `linear-gradient(140deg, #FF6FA5, ${C.pink})` }} />
                  </div>

                  <div
                    style={{
                      padding: "18px 30px",
                      borderRadius: 999,
                      background: C.ink,
                      color: "#fff",
                      fontFamily: fontSans,
                      fontWeight: 700,
                      fontSize: 24,
                      opacity: saveEnabled,
                      transform: `scale(${1 - savePress * 0.1})`,
                    }}
                  >
                    Simpan ⬇
                  </div>
                </div>
              </div>

              {/* Strip yang terisi otomatis */}
              <div style={{ position: "relative", transform: `scale(${1 + stripBump * 0.05}) rotate(${wave(frame, 80, 1.5)}deg)` }}>
                <PhotoStrip width={200} paper={FRAME_COLORS[selected]} fillAt={CAPTURES.map((c) => c + 2)} />
                {/* Toast tersimpan */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: -36,
                    transform: `translateX(-50%) translateY(${interpolate(toast, [0, 1], [20, 0])}px) scale(${toast})`,
                    padding: "10px 20px",
                    borderRadius: 16,
                    background: C.ink,
                    color: "#fff",
                    fontFamily: fontSans,
                    fontWeight: 700,
                    fontSize: 20,
                    whiteSpace: "nowrap",
                  }}
                >
                  tersimpan! 💾
                </div>
              </div>
            </div>
          </div>
        </BrowserWindow>
      </div>

      <Sfx src={SFX.whoosh} at={0} volume={0.7} />
      {STEP_IN.map((s) => (
        <Sfx key={s} src={SFX.pop} at={s} volume={0.7} />
      ))}
      <Sfx src={SFX.chime} at={PEACE_DETECT} volume={0.6} />
      {CAPTURES.map((c) => (
        <Sfx key={c} src={SFX.shutter} at={c} />
      ))}
      <Sfx src={SFX.pop} at={FRAME_PICK} />
      <Sfx src={SFX.pop} at={SAVE_CLICK} />
      <Sfx src={SFX.chime} at={SAVE_CLICK + 2} volume={0.7} />
    </AbsoluteFill>
  );
};
