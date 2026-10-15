const fs = require('fs');
const path = require('path');

function writeWav(filename, samples, sampleRate = 44100) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = samples.length * numChannels * (bitsPerSample / 8);
  const chunkSize = 36 + dataSize;

  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF chunk descriptor
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(chunkSize, 4);
  buffer.write('WAVE', 8);

  // fmt sub-chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);

  // data sub-chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    // Clamp sample to [-1, 1]
    let s = Math.max(-1, Math.min(1, samples[i]));
    // Scale to 16-bit integer
    let val = s < 0 ? s * 0x8000 : s * 0x7FFF;
    buffer.writeInt16LE(Math.round(val), offset);
    offset += 2;
  }

  fs.writeFileSync(filename, buffer);
  console.log(`Generated ${filename}`);
}

const SR = 44100;

function createSine(freq, duration, envelope = 'decay') {
  const samples = new Float32Array(Math.floor(SR * duration));
  for (let i = 0; i < samples.length; i++) {
    const t = i / SR;
    let amp = 1.0;
    if (envelope === 'decay') {
      amp = Math.exp(-t * 10);
    } else if (envelope === 'pop') {
      amp = Math.exp(-t * 30);
    }
    samples[i] = Math.sin(2 * Math.PI * freq * t) * amp;
  }
  return samples;
}

function createNoise(duration, envelope = 'decay') {
  const samples = new Float32Array(Math.floor(SR * duration));
  for (let i = 0; i < samples.length; i++) {
    const t = i / SR;
    let amp = 1.0;
    if (envelope === 'decay') {
      amp = Math.exp(-t * 10);
    } else if (envelope === 'shutter') {
      amp = t < 0.05 ? 1 : Math.exp(-(t - 0.05) * 50);
    } else if (envelope === 'whoosh') {
      amp = Math.sin(t / duration * Math.PI);
    }
    samples[i] = (Math.random() * 2 - 1) * amp;
  }
  return samples;
}

function createBeep(freqs, duration) {
  const samples = new Float32Array(Math.floor(SR * duration));
  for (let i = 0; i < samples.length; i++) {
    const t = i / SR;
    let v = 0;
    for(let f of freqs) {
      v += Math.sin(2 * Math.PI * f * t);
    }
    samples[i] = (v / freqs.length) * Math.exp(-t * 5);
  }
  return samples;
}

const outDir = path.join(__dirname, 'public', 'kenangita', 'audio', 'sfx');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Generate SFX (we will use .wav and update the code to load .wav)
writeWav(path.join(outDir, 'pop.wav'), createSine(600, 0.2, 'pop'));
writeWav(path.join(outDir, 'sad-trombone-short.wav'), createSine(200, 0.5, 'decay')); // simple low beep for now
writeWav(path.join(outDir, 'shutter-click.wav'), createNoise(0.2, 'shutter'));
writeWav(path.join(outDir, 'flash-fwip.wav'), createNoise(0.3, 'whoosh'));
writeWav(path.join(outDir, 'printer-buzz.wav'), createNoise(1.0, 'decay'));
writeWav(path.join(outDir, 'ding.wav'), createBeep([800, 1200], 0.5));
writeWav(path.join(outDir, 'whoosh.wav'), createNoise(0.4, 'whoosh'));
writeWav(path.join(outDir, 'countdown-beep.wav'), createSine(1000, 0.2, 'decay'));
writeWav(path.join(outDir, 'ta-da.wav'), createBeep([500, 600, 800], 0.6));
writeWav(path.join(outDir, 'coin-cha-ching.wav'), createBeep([1200, 1600], 0.4));
writeWav(path.join(outDir, 'sparkle.wav'), createSine(2000, 0.3, 'decay'));
writeWav(path.join(outDir, 'confetti-pop.wav'), createNoise(0.3, 'shutter'));
writeWav(path.join(outDir, 'party-horn.wav'), createSine(400, 0.8, 'decay'));

// Copy bgm
const bgmSrc = path.join(__dirname, 'public', 'musik', 'alexguz-funk-amp-breakbeat-upbeat-advertising-happy-cook-541097.mp3');
const bgmDest = path.join(__dirname, 'public', 'kenangita', 'audio', 'bgm.mp3');
if(fs.existsSync(bgmSrc)) {
    fs.copyFileSync(bgmSrc, bgmDest);
    console.log('Copied BGM');
}
