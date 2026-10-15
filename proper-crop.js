const fs = require('fs');
const zlib = require('zlib');

const srcBuf = fs.readFileSync('C:/Users/masam/.gemini/antigravity-ide/brain/29cdbcd1-633a-476d-bcf5-2644f7622941/.user_uploaded/media_1791702758809.png');

let pos = 8;
const chunks = [];
while (pos < srcBuf.length) {
  const len = srcBuf.readUInt32BE(pos);
  const type = srcBuf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IDAT') chunks.push(srcBuf.subarray(pos + 8, pos + 8 + len));
  pos += 12 + len;
}
const compressed = Buffer.concat(chunks);
const raw = zlib.inflateSync(compressed);

const width = 819;
const height = 1024;
const bpp = 4; // RGBA
const rowBytes = width * bpp;

// Defilter PNG
const pixels = Buffer.alloc(width * height * 4);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

let srcOffset = 0;
for (let y = 0; y < height; y++) {
  const filter = raw[srcOffset++];
  const prevRowOffset = (y - 1) * rowBytes;
  const currRowOffset = y * rowBytes;

  for (let x = 0; x < rowBytes; x++) {
    const orig = raw[srcOffset++];
    const a = x >= bpp ? pixels[currRowOffset + x - bpp] : 0;
    const b = y > 0 ? pixels[prevRowOffset + x] : 0;
    const c = y > 0 && x >= bpp ? pixels[prevRowOffset + x - bpp] : 0;

    let val = 0;
    if (filter === 0) val = orig;
    else if (filter === 1) val = (orig + a) & 0xff;
    else if (filter === 2) val = (orig + b) & 0xff;
    else if (filter === 3) val = (orig + Math.floor((a + b) / 2)) & 0xff;
    else if (filter === 4) val = (orig + paeth(a, b, c)) & 0xff;

    pixels[currRowOffset + x] = val;
  }
}

// Bounds
const minX = 150, maxX = 626, minY = 240, maxY = 715;
const markW = maxX - minX + 1;
const markH = maxY - minY + 1;

const outSize = 512;
const padding = 16;
const innerSize = outSize - padding * 2;
const scale = innerSize / Math.max(markW, markH);
const offsetX = Math.round(padding + (innerSize - markW * scale) / 2);
const offsetY = Math.round(padding + (innerSize - markH * scale) / 2);

const outPixels = Buffer.alloc(outSize * (outSize * 4 + 1));

for (let y = 0; y < outSize; y++) {
  const outRowStart = y * (outSize * 4 + 1);
  outPixels[outRowStart] = 0; // Filter None

  const srcY = Math.round(minY + (y - offsetY) / scale);
  if (srcY < minY || srcY > maxY) continue;

  for (let x = 0; x < outSize; x++) {
    const srcX = Math.round(minX + (x - offsetX) / scale);
    if (srcX < minX || srcX > maxX) continue;

    const srcIdx = (srcY * width + srcX) * 4;
    const outIdx = outRowStart + 1 + x * 4;

    outPixels[outIdx] = pixels[srcIdx];
    outPixels[outIdx + 1] = pixels[srcIdx + 1];
    outPixels[outIdx + 2] = pixels[srcIdx + 2];
    outPixels[outIdx + 3] = pixels[srcIdx + 3];
  }
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const chunk = Buffer.alloc(12 + data.length);
  chunk.writeUInt32BE(data.length, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + data.length);
  return chunk;
}

const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(outSize, 0);
ihdrData.writeUInt32BE(outSize, 4);
ihdrData[8] = 8;
ihdrData[9] = 6;

const outPng = Buffer.concat([
  sig,
  makeChunk('IHDR', ihdrData),
  makeChunk('IDAT', zlib.deflateSync(outPixels)),
  makeChunk('IEND', Buffer.alloc(0))
]);

fs.writeFileSync('public/logo.png', outPng);
fs.writeFileSync('public/logos/tkg.png', outPng);
console.log('Properly defiltered & cropped logo.png written successfully! Size:', outPng.length);
