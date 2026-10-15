const fs = require('fs');
const pngBase64 = fs.readFileSync('public/logo.png').toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${pngBase64}" width="512" height="512" />
</svg>`;
fs.writeFileSync('public/logo.svg', svg);
console.log('public/logo.svg updated with user logo!');
