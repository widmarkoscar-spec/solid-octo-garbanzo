import sharp from "sharp";
import pngToIco from "png-to-ico";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const svgPath = join(root, "build", "icon.svg");
const icoPath = join(root, "build", "icon.ico");

console.log("📐 Läser SVG:", svgPath);
const svg = readFileSync(svgPath);

const sizes = [16, 32, 48, 64, 128, 256];
console.log(`🎨 Renderar ${sizes.join(", ")} px...`);

const pngs = await Promise.all(
  sizes.map((s) =>
    sharp(svg, { density: 300 })
      .resize(s, s)
      .png()
      .toBuffer()
  )
);

console.log("📦 Packar ICO-fil...");
const ico = await pngToIco(pngs);

mkdirSync(join(root, "build"), { recursive: true });
writeFileSync(icoPath, ico);

console.log("✅ Klar! Ikonfil sparad:", icoPath);
console.log(`   Storlek: ${(ico.length / 1024).toFixed(1)} KB`);
