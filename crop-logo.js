const fs = require('fs');
const zlib = require('zlib');

// Read source PNG
const buf = fs.readFileSync('public/logo.png');
let pos = 8;
const chunks = [];
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IDAT') chunks.push(buf.subarray(pos + 8, pos + 8 + len));
  pos += 12 + len;
}
const raw = zlib.inflateSync(Buffer.concat(chunks));
const srcW = 819;
const srcH = 1024;

// Bounds of the logo mark
const minX = 150;
const maxX = 626;
const minY = 240;
const maxY = 715;
const markW = maxX - minX + 1; // 477
const markH = maxY - minY + 1; // 476

// Desired square output size: 512x512 with margin 16
const outSize = 512;
const padding = 16;
const innerSize = outSize - padding * 2; // 480
const scale = innerSize / Math.max(markW, markH);

const offsetX = Math.round(padding + (innerSize - markW * scale) / 2);
const offsetY = Math.round(padding + (innerSize - markH * scale) / 2);

// Create raw uncompressed image buffer (filter byte + RGBA * outSize per row)
const outRaw = Buffer.alloc(outSize * (outSize * 4 + 1));

for (let y = 0; y < outSize; y++) {
  const rowStart = y * (outSize * 4 + 1);
  outRaw[rowStart] = 0; // Filter: None

  const srcYFloat = minY + (y - offsetY) / scale;
  const srcY = Math.floor(srcYFloat);

  if (srcY < minY || srcY > maxY) continue;

  for (let x = 0; x < outSize; x++) {
    const srcXFloat = minX + (x - offsetX) / scale;
    const srcX = Math.floor(srcXFloat);

    if (srcX < minX || srcX > maxX) continue;

    // Bilinear or nearest sample
    const srcIdx = srcY * (srcW * 4 + 1) + 1 + srcX * 4;
    const r = raw[srcIdx];
    const g = raw[srcIdx + 1];
    const b = raw[srcIdx + 2];
    const a = raw[srcIdx + 3];

    const outIdx = rowStart + 1 + x * 4;
    outRaw[outIdx] = r;
    outRaw[outIdx + 1] = g;
    outRaw[outIdx + 2] = b;
    outRaw[outIdx + 3] = a;
  }
}

// Compress IDAT
const compressed = zlib.deflateSync(outRaw);

// CRC helper
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

// Write PNG
const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(outSize, 0);
ihdrData.writeUInt32BE(outSize, 4);
ihdrData[8] = 8; // bit depth
ihdrData[9] = 6; // color type: RGBA
ihdrData[10] = 0; // compression
ihdrData[11] = 0; // filter
ihdrData[12] = 0; // interlace

const ihdrChunk = makeChunk('IHDR', ihdrData);
const idatChunk = makeChunk('IDAT', compressed);
const iendChunk = makeChunk('IEND', Buffer.alloc(0));

const finalPng = Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
fs.writeFileSync('public/logo.png', finalPng);
fs.writeFileSync('public/logos/tkg.png', finalPng);
console.log('Saved 512x512 cropped logo.png successfully, size:', finalPng.length);
