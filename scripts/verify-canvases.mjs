import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const chromePaths = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
];

const executablePath = chromePaths.find((path) => {
  try {
    return existsSync(path);
  } catch {
    return false;
  }
});

const viewports = [
  { name: "desktop", width: 1440, height: 1100 },
  { name: "mobile", width: 390, height: 844 }
];

const routes = [
  { name: "landing", url: "http://127.0.0.1:3000/" },
  { name: "dashboard", url: "http://127.0.0.1:3000/dashboard" }
];

await mkdir("artifacts/visual", { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath,
  args: ["--ignore-gpu-blocklist", "--enable-webgl", "--disable-dev-shm-usage"]
});

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    for (const route of routes) {
      await page.goto(route.url, { waitUntil: "networkidle", timeout: 60_000 });
      await page.waitForTimeout(1800);
      await page.screenshot({
        path: `artifacts/visual/${route.name}-${viewport.name}.png`,
        fullPage: true
      });

      const canvases = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("canvas")).map((canvas, index) => {
          const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
          if (!gl) return { index, ok: false, reason: "missing-webgl-context" };

          const width = gl.drawingBufferWidth;
          const height = gl.drawingBufferHeight;
          const samples = new Uint8Array(4 * 25);
          let offset = 0;

          for (let y = 0; y < 5; y += 1) {
            for (let x = 0; x < 5; x += 1) {
              const sx = Math.max(0, Math.min(width - 1, Math.floor((x + 0.5) * width / 5)));
              const sy = Math.max(0, Math.min(height - 1, Math.floor((y + 0.5) * height / 5)));
              const pixel = new Uint8Array(4);
              gl.readPixels(sx, sy, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
              samples.set(pixel, offset);
              offset += 4;
            }
          }

          let lit = 0;
          for (let i = 0; i < samples.length; i += 4) {
            if (samples[i] + samples[i + 1] + samples[i + 2] > 20) lit += 1;
          }

          return {
            index,
            ok: width > 0 && height > 0 && lit >= 3,
            width,
            height,
            lit
          };
        });
      });

      const failed = canvases.filter((canvas) => !canvas.ok);
      if (!canvases.length || failed.length) {
        throw new Error(`${route.name}/${viewport.name} canvas check failed: ${JSON.stringify(canvases)}`);
      }

      console.log(`${route.name}/${viewport.name}: ${canvases.length} canvas checks passed`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}
