import fs from 'fs';
import path from 'path';
import https from 'https';

const targetDir = path.resolve('public/sfx/showreel');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const downloads = [
  // ── WHOOSHES & TRANSITIONS (rse/soundfx) ──
  { name: 'whoosh-fast-1.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/whoosh1.mp3' },
  { name: 'whoosh-fast-2.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/whoosh2.mp3' },
  { name: 'whoosh-deep-3.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/whoosh3.mp3' },
  { name: 'whoosh-heavy-4.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/whoosh4.mp3' },
  { name: 'whoosh-air-5.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/whoosh5.mp3' },

  // ── PUNCHES, SLAMS & BASS IMPACTS (rse/soundfx + kenney) ──
  { name: 'impact-punch-1.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/punch1.mp3' },
  { name: 'impact-punch-2.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/punch2.mp3' },
  { name: 'impact-punch-3.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/punch3.mp3' },
  { name: 'impact-sub-cannon-1.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/cannon1.mp3' },
  { name: 'impact-sub-cannon-2.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/cannon2.mp3' },
  { name: 'impact-drop-1.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-interface-sounds/master/addons/kenney_interface_sounds/drop_001.wav' },
  { name: 'impact-drop-2.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-interface-sounds/master/addons/kenney_interface_sounds/drop_002.wav' },

  // ── GLITCHES & CYBER TECH (kenney + rse) ──
  { name: 'glitch-1.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-interface-sounds/master/addons/kenney_interface_sounds/glitch_001.wav' },
  { name: 'glitch-2.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-interface-sounds/master/addons/kenney_interface_sounds/glitch_002.wav' },
  { name: 'cyber-beep-1.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/beep1.mp3' },
  { name: 'cyber-beep-2.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/beep3.mp3' },

  // ── TACTILE UI, SWITCHES & CLICKS (kenney-interface-sounds & ui-audio) ──
  { name: 'ui-toggle-switch.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-interface-sounds/master/addons/kenney_interface_sounds/switch_001.wav' },
  { name: 'ui-switch-heavy.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-interface-sounds/master/addons/kenney_interface_sounds/switch_004.wav' },
  { name: 'ui-click-tactile.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-ui-audio/master/addons/kenney_ui_audio/click1.wav' },
  { name: 'ui-mouse-press.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-ui-audio/master/addons/kenney_ui_audio/mouseclick1.wav' },
  { name: 'ui-mouse-release.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-ui-audio/master/addons/kenney_ui_audio/mouserelease1.wav' },
  { name: 'ui-swipe-1.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-ui-audio/master/addons/kenney_ui_audio/rollover1.wav' },
  { name: 'ui-swipe-2.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-ui-audio/master/addons/kenney_ui_audio/rollover3.wav' },
  { name: 'ui-tick-crisp.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-interface-sounds/master/addons/kenney_interface_sounds/tick_001.wav' },
  { name: 'ui-tick-soft.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-interface-sounds/master/addons/kenney_interface_sounds/tick_002.wav' },

  // ── CONFIRMATION, BELLS & CHIMES ──
  { name: 'ui-confirm-bell.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-interface-sounds/master/addons/kenney_interface_sounds/confirmation_001.wav' },
  { name: 'ui-confirm-chime.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-interface-sounds/master/addons/kenney_interface_sounds/confirmation_002.wav' },
  { name: 'chime-crystal.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-interface-sounds/master/addons/kenney_interface_sounds/glass_001.wav' },
  { name: 'chime-harmonic.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/chime1.mp3' },
  { name: 'chime-finale.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/chime3.mp3' },

  // ── SPARKLES & GLITTER ──
  { name: 'sparkle-shimmer-1.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/bling1.mp3' },
  { name: 'sparkle-shimmer-2.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/bling3.mp3' },

  // ── RISER / TENSION SWELL & COLLAPSE ──
  { name: 'riser-swell-1.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/resonance1.mp3' },
  { name: 'riser-swell-2.mp3', url: 'https://raw.githubusercontent.com/rse/soundfx/master/soundfx.d/resonance2.mp3' },
  { name: 'riser-maximize.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-interface-sounds/master/addons/kenney_interface_sounds/maximize_004.wav' },
  { name: 'snap-collapse.wav', url: 'https://raw.githubusercontent.com/Calinou/kenney-interface-sounds/master/addons/kenney_interface_sounds/minimize_008.wav' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  console.log(`Starting download of ${downloads.length} sound effects...`);
  let success = 0;
  for (const item of downloads) {
    const dest = path.join(targetDir, item.name);
    try {
      await downloadFile(item.url, dest);
      const size = fs.statSync(dest).size;
      console.log(`✓ [${item.name}] (${size} bytes)`);
      success++;
    } catch (e) {
      console.error(`✗ Error downloading ${item.name}: ${e.message}`);
    }
  }
  console.log(`\nCompleted! Successfully downloaded ${success}/${downloads.length} sound effects to ${targetDir}`);
}

run();
