import { Jimp } from "jimp";
import path from "path";

async function removeBackground(imagePath, outputPath) {
  try {
    const image = await Jimp.read(imagePath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    // We assume the top-left pixel is the background color since we asked for solid magenta.
    const bgColor = image.getPixelColor(0, 0);

    const { r: bgR, g: bgG, b: bgB } = Jimp.intToRGBA(bgColor);

    const threshold = 180; // Allow some variation due to anti-aliasing/rendering noise

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const color = image.getPixelColor(x, y);
        const { r, g, b, a } = Jimp.intToRGBA(color);

        // Calculate distance from background color
        const diff = Math.sqrt(
            Math.pow(r - bgR, 2) + 
            Math.pow(g - bgG, 2) + 
            Math.pow(b - bgB, 2)
        );

        if (diff < threshold) {
             // If the color is close to background, make it transparent
             const newAlpha = Math.max(0, (diff / threshold) * 255);
             image.setPixelColor(Jimp.rgbaToInt(r, g, b, newAlpha), x, y);
        }
      }
    }

    await image.write(outputPath);
    console.log("Background removed successfully:", outputPath);
  } catch (err) {
    console.error("Error removing background:", err);
  }
}

// Ensure the paths are correct
removeBackground(
    "C:\\Users\\rehan\\.gemini\\antigravity\\brain\\4d9a4787-2629-4c4d-a656-5bd025153bb6\\memoji_magenta_bg_1773491757379.png", 
    "C:\\Users\\rehan\\OneDrive\\Desktop\\html\\cv\\public\\memoji_cutout.png"
);
