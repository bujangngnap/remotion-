// ── BatikEtiquette: root composition ────────────────────────────────────
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import {
  SCENES, CONTENT_SCENES, SCENE_OVERLAP, C,
} from './config';
import { Background } from './components/Background';
import { Ornaments } from './components/Ornaments';
import { IntroScene } from './scenes/IntroScene';
import { ContentScene } from './scenes/ContentScene';
import { OutroScene } from './scenes/OutroScene';

/**
 * Main composition for the Batik Etiquette theater etiquette video.
 * 1920×960, 30fps, 1130 frames (~37.7s).
 *
 * Structure:
 * - Persistent background layer (gradient + silk streaks)
 * - Intro scene (fan entrance)
 * - 7 content scenes (etiquette rules, each with icon + wave text)
 * - Outro scene (fan exit, loop-ready)
 * - Persistent ornaments layer (batik decorative frame)
 */
export const BatikEtiquette: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.cream }}>
      {/* ═══════════════════ BACKGROUND ═══════════════════ */}
      <Background />

      {/* ═══════════════════ INTRO ═══════════════════ */}
      <Sequence
        from={SCENES.intro.from}
        durationInFrames={SCENES.intro.dur}
        name="Intro"
      >
        <IntroScene />
      </Sequence>

      {/* ═══════════════════ CONTENT SCENES ═══════════════════ */}
      {CONTENT_SCENES.map((scene, i) => {
        const prevScene = i > 0 ? CONTENT_SCENES[i - 1] : undefined;

        return (
          <Sequence
            key={scene.id}
            from={scene.from}
            durationInFrames={scene.dur + SCENE_OVERLAP}
            name={scene.heading}
          >
            <ContentScene
              scene={{
                ...scene,
                // Adjust timing: scene content starts after the overlap
                dur: scene.dur + SCENE_OVERLAP,
              }}
              prevIconId={prevScene?.iconId}
            />
          </Sequence>
        );
      })}

      {/* ═══════════════════ OUTRO ═══════════════════ */}
      <Sequence
        from={SCENES.outro.from}
        durationInFrames={SCENES.outro.dur}
        name="Outro"
      >
        <OutroScene />
      </Sequence>

      {/* ═══════════════════ ORNAMENTS (persistent) ═══════════════════ */}
      <Ornaments />
    </AbsoluteFill>
  );
};
