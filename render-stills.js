const { execSync } = require("child_process");
const fs = require("fs");

if (!fs.existsSync("out/check-frames")) {
  fs.mkdirSync("out/check-frames", { recursive: true });
}

const frames = [
  { sec: "0.5s", frame: 15 },
  { sec: "1.5s", frame: 45 },
  { sec: "2.5s", frame: 75 },
  { sec: "3.5s", frame: 105 },
  { sec: "5.0s", frame: 150 },
  { sec: "7.0s", frame: 210 },
  { sec: "8.5s", frame: 255 },
  { sec: "10.0s", frame: 300 },
  { sec: "12.0s", frame: 360 },
];

console.log("Starting still frames rendering...");
for (const item of frames) {
  const outPath = `out/check-frames/frame-${item.frame}-${item.sec}.png`;
  console.log(`Rendering ${item.sec} (frame ${item.frame}) -> ${outPath}`);
  execSync(`npx remotion still TKGPromo "${outPath}" --frame=${item.frame}`, {
    stdio: "inherit",
  });
}
console.log("All check frames rendered successfully!");
