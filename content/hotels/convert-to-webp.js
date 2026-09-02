const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../../public/images/temp');

async function convertImages() {
  if (!fs.existsSync(inputDir)) {
    console.error('Directory not found:', inputDir);
    return;
  }

  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    if (!/\.(jpg|jpeg)$/i.test(file)) continue;

    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(inputDir, file.replace(/\.(jpg|jpeg)$/i, '.webp'));

    try {
      await sharp(inputPath)
        .resize({
          width: 1600,
          withoutEnlargement: true,
        })
        .webp({
          quality: 65,
          effort: 6,
        })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(1);

      console.log(`Converted: ${file} → ${path.basename(outputPath)} (${sizeKB} KB)`);
    } catch (error) {
      console.error(`Failed: ${file}`, error.message);
    }
  }
}

convertImages();
