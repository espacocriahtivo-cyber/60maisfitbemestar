import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

// Simple valid uncompressed/deflated PNG generator using built-in zlib
function createPng(width, height, colorR, colorG, colorB) {
  const bytesPerPixel = 4;
  const rowSize = 1 + width * bytesPerPixel;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * bytesPerPixel;
      
      // Decorative border ring
      const dx = x - width / 2;
      const dy = y - height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const isRing = Math.abs(dist - width * 0.45) < 3;
      const isCenter = Math.abs(dx) < width * 0.28 && Math.abs(dy) < height * 0.18;

      if (isRing) {
        rawData[pxOffset] = 124;     // R (Lime)
        rawData[pxOffset + 1] = 224; // G
        rawData[pxOffset + 2] = 0;   // B
        rawData[pxOffset + 3] = 255; // Alpha
      } else if (isCenter && Math.abs(dy) < 4) {
        // Horizontal line
        rawData[pxOffset] = 124;
        rawData[pxOffset + 1] = 224;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 255;
      } else {
        rawData[pxOffset] = colorR;
        rawData[pxOffset + 1] = colorG;
        rawData[pxOffset + 2] = colorB;
        rawData[pxOffset + 3] = 255;
      }
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 6; // Color type: RGBA (6)
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace

  const ihdrChunk = createChunk('IHDR', ihdrData);
  const idatChunk = createChunk('IDAT', deflated);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);

  const crcPayload = Buffer.concat([typeBuf, data]);
  const crc = crc32(crcPayload);

  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc >>> 0, 0);

  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

// CRC32 implementation
function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    const byte = buf[i];
    crc ^= byte;
    for (let j = 0; j < 8; j++) {
      const mask = -(crc & 1);
      crc = (crc >>> 1) ^ (0xedb88320 & mask);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate compliant PNGs
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, 9, 19, 14));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, 9, 19, 14));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, 9, 19, 14));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, 9, 19, 14));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPng(32, 32, 9, 19, 14));

console.log('PNG icons created successfully in public/');
