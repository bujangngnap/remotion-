import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

export const TkgAudio: React.FC = () => {
  return (
    <>
      {/* Background Music (Chill Out) */}
      <Audio
        src={staticFile("sfx/siarhei_korbut-chill-out-short-pixabay-316888.mp3")}
        volume={(f) => {
          if (f < 18) return (f / 18) * 0.32;
          if (f > 875) return Math.max(0, (1 - (f - 875) / 25) * 0.32);
          return 0.32;
        }}
      />

      {/* ============================================================== */}
      {/* SCENE 1: Seeds & Official Logo Reveal (f0 - f70)              */}
      {/* ============================================================== */}
      {/* Fast flying seeds whoosh */}
      <Sequence from={8} durationInFrames={18}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.28} />
      </Sequence>
      {/* Orange blob impact & Logo pop */}
      <Sequence from={22} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.42} />
      </Sequence>
      <Sequence from={24} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.45} />
      </Sequence>
      {/* Letter pops */}
      {[27, 30, 34, 38, 42, 44].map((f) => (
        <Sequence key={`s1-pop-${f}`} from={f} durationInFrames={12}>
          <Audio src={staticFile("sfx/pop.wav")} volume={0.28} />
        </Sequence>
      ))}
      {/* Shimmer on full wordmark */}
      <Sequence from={45} durationInFrames={25}>
        <Audio src={staticFile("sfx/sparkle.wav")} volume={0.32} />
      </Sequence>
      {/* Shrink to header whoosh */}
      <Sequence from={50} durationInFrames={18}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.34} />
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 2: "Ide doang nggak cukup." (f60 - f135)                 */}
      {/* ============================================================== */}
      {[64, 68, 72, 80].map((f) => (
        <Sequence key={`s2-tick-${f}`} from={f} durationInFrames={10}>
          <Audio src={staticFile("sfx/tick.wav")} volume={0.24} />
        </Sequence>
      ))}
      <Sequence from={78} durationInFrames={15}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.26} />
      </Sequence>
      <Sequence from={125} durationInFrames={18}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.35} />
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 3: "Saatnya tumbuh bareng." (f130 - f195)               */}
      {/* ============================================================== */}
      {[132, 136, 140, 144, 148].map((f) => (
        <Sequence key={`s3-tick-${f}`} from={f} durationInFrames={10}>
          <Audio src={staticFile("sfx/tick.wav")} volume={0.24} />
        </Sequence>
      ))}
      <Sequence from={150} durationInFrames={20}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.35} />
      </Sequence>
      <Sequence from={184} durationInFrames={18}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.35} />
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 4: 5 Subsidiary Circles (f190 - f265)                   */}
      {/* ============================================================== */}
      {[190, 193, 196, 204, 214].map((f, idx) => (
        <Sequence key={`s4-pop-${f}`} from={f} durationInFrames={15}>
          <Audio src={staticFile("sfx/pop.wav")} volume={0.36 + idx * 0.02} />
        </Sequence>
      ))}
      <Sequence from={224} durationInFrames={25}>
        <Audio src={staticFile("sfx/sparkle.wav")} volume={0.35} />
      </Sequence>
      <Sequence from={250} durationInFrames={18}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.36} />
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 5: TK Creative & TK Media Showcase (f255 - f375)         */}
      {/* ============================================================== */}
      <Sequence from={256} durationInFrames={16}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={268} durationInFrames={16}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.36} />
      </Sequence>
      <Sequence from={274} durationInFrames={20}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.38} />
      </Sequence>
      {[276, 280, 284, 288].map((f) => (
        <Sequence key={`s5-tick-${f}`} from={f} durationInFrames={8}>
          <Audio src={staticFile("sfx/tick.wav")} volume={0.25} />
        </Sequence>
      ))}
      <Sequence from={292} durationInFrames={25}>
        <Audio src={staticFile("sfx/sparkle.wav")} volume={0.3} />
      </Sequence>
      <Sequence from={364} durationInFrames={18}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.38} />
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 6: TK Digital & Kenangita Photobooth (f370 - f495)      */}
      {/* ============================================================== */}
      <Sequence from={371} durationInFrames={16}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.4} />
      </Sequence>
      {[376, 380, 384, 388, 396, 404, 412].map((f) => (
        <Sequence key={`s6-tick-${f}`} from={f} durationInFrames={8}>
          <Audio src={staticFile("sfx/tick.wav")} volume={0.22} />
        </Sequence>
      ))}
      <Sequence from={382} durationInFrames={16}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.36} />
      </Sequence>
      {/* Camera shutter snap */}
      <Sequence from={389} durationInFrames={20}>
        <Audio src={staticFile("sfx/shutter.wav")} volume={0.52} />
      </Sequence>
      <Sequence from={396} durationInFrames={20}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.36} />
      </Sequence>
      <Sequence from={480} durationInFrames={18}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.38} />
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 7: Magelang Interactive Map Card (f485 - f610)          */}
      {/* ============================================================== */}
      <Sequence from={487} durationInFrames={16}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.42} />
      </Sequence>
      <Sequence from={489} durationInFrames={25}>
        <Audio src={staticFile("sfx/sparkle.wav")} volume={0.42} />
      </Sequence>
      <Sequence from={493} durationInFrames={18}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.34} />
      </Sequence>
      {[505, 516].map((f) => (
        <Sequence key={`s7-pop-${f}`} from={f} durationInFrames={14}>
          <Audio src={staticFile("sfx/pop.wav")} volume={0.35} />
        </Sequence>
      ))}
      <Sequence from={528} durationInFrames={30}>
        <Audio src={staticFile("sfx/chime.wav")} volume={0.36} />
      </Sequence>
      <Sequence from={595} durationInFrames={18}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.38} />
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 8: Bottom Sheet All-in-One Engine (f600 - f715)         */}
      {/* ============================================================== */}
      <Sequence from={602} durationInFrames={18}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.44} />
      </Sequence>
      <Sequence from={612} durationInFrames={20}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.4} />
      </Sequence>
      {[618, 624, 630].map((f) => (
        <Sequence key={`s8-pop-${f}`} from={f} durationInFrames={12}>
          <Audio src={staticFile("sfx/pop.wav")} volume={0.32} />
        </Sequence>
      ))}
      <Sequence from={638} durationInFrames={25}>
        <Audio src={staticFile("sfx/sparkle.wav")} volume={0.36} />
      </Sequence>
      <Sequence from={700} durationInFrames={18}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.38} />
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 9: Growth Slider "Waktunya Tumbuh!" (f705 - f805)        */}
      {/* ============================================================== */}
      <Sequence from={706} durationInFrames={18}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.42} />
      </Sequence>
      <Sequence from={712} durationInFrames={16}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.45} />
      </Sequence>
      <Sequence from={718} durationInFrames={35}>
        <Audio src={staticFile("sfx/chime.wav")} volume={0.55} />
      </Sequence>
      <Sequence from={726} durationInFrames={25}>
        <Audio src={staticFile("sfx/sparkle.wav")} volume={0.4} />
      </Sequence>
      {/* Tension rise into Finale */}
      <Sequence from={776} durationInFrames={32}>
        <Audio src={staticFile("sfx/rise.wav")} volume={0.52} />
      </Sequence>

      {/* ============================================================== */}
      {/* SCENE 10: Grand Finale CTA (f795 - f900)                      */}
      {/* ============================================================== */}
      <Sequence from={796} durationInFrames={25}>
        <Audio src={staticFile("sfx/pop.wav")} volume={0.56} />
      </Sequence>
      <Sequence from={802} durationInFrames={35}>
        <Audio src={staticFile("sfx/chime.wav")} volume={0.45} />
      </Sequence>
      <Sequence from={814} durationInFrames={18}>
        <Audio src={staticFile("sfx/whoosh.wav")} volume={0.36} />
      </Sequence>
      {[820, 824, 828, 832].map((f) => (
        <Sequence key={`s10-tick-${f}`} from={f} durationInFrames={8}>
          <Audio src={staticFile("sfx/tick.wav")} volume={0.24} />
        </Sequence>
      ))}
      <Sequence from={838} durationInFrames={25}>
        <Audio src={staticFile("sfx/ding.wav")} volume={0.46} />
      </Sequence>
      <Sequence from={844} durationInFrames={30}>
        <Audio src={staticFile("sfx/sparkle.wav")} volume={0.38} />
      </Sequence>
    </>
  );
};
