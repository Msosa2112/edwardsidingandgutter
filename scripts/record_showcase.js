import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import path from 'path';
import shutil from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const FFMPEG_PATH = 'C:\\Users\\migue\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0-full_build\\bin\\ffmpeg.EXE';

// Fluid cubic easing
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutQuad(t) {
  return 1 - (1 - t) * (1 - t);
}

// Master recording function (cursor-free, high-dynamics)
async function recordSession({
  mode = 'desktop',
  outputPath,
  viewport,
  fps = 30,
  choreography
}) {
  console.log(`\n========================================`);
  console.log(`RECORDING: ${mode.toUpperCase()} (DYNAMIC // NO CURSOR)`);
  console.log(`Target Output: ${outputPath}`);
  console.log(`Viewport: ${viewport.width}x${viewport.height} (Scale: ${viewport.deviceScaleFactor || 1})`);
  console.log(`========================================`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      `--window-size=${viewport.width},${viewport.height}`,
      `--force-device-scale-factor=${viewport.deviceScaleFactor || 1}`,
      '--hide-scrollbars',
      '--autoplay-policy=no-user-gesture-required'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport(viewport);
  await page.goto('http://localhost:5180/', { waitUntil: 'networkidle2' });

  // Give assets a moment to settle
  await new Promise(r => setTimeout(r, 800));

  // Launch ffmpeg with high-quality fast encoding
  const ffmpegArgs = [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'mjpeg',
    '-framerate', String(fps),
    '-i', '-',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'fast',
    '-crf', '18',
    outputPath
  ];

  const ffmpeg = spawn(FFMPEG_PATH, ffmpegArgs);
  ffmpeg.stderr.on('data', () => {}); // silence

  const client = await page.target().createCDPSession();
  const screenWidth = Math.round(viewport.width * (viewport.deviceScaleFactor || 1));
  const screenHeight = Math.round(viewport.height * (viewport.deviceScaleFactor || 1));

  await client.send('Page.startScreencast', {
    format: 'jpeg',
    quality: 92,
    maxWidth: screenWidth,
    maxHeight: screenHeight
  });

  let firstTimestamp = null;
  let lastEmittedFrameIndex = -1;
  let lastBuffer = null;

  client.on('Page.screencastFrame', async ({ data, sessionId, metadata }) => {
    try {
      if (!firstTimestamp) firstTimestamp = metadata.timestamp;
      const elapsed = metadata.timestamp - firstTimestamp;
      const currentFrameIndex = Math.floor(elapsed * fps);
      const buffer = Buffer.from(data, 'base64');
      lastBuffer = buffer;

      if (lastEmittedFrameIndex === -1) {
        ffmpeg.stdin.write(buffer);
        lastEmittedFrameIndex = 0;
      } else {
        while (lastEmittedFrameIndex < currentFrameIndex) {
          ffmpeg.stdin.write(lastBuffer);
          lastEmittedFrameIndex++;
        }
      }
      await client.send('Page.screencastFrameAck', { sessionId });
    } catch (err) {}
  });

  const tStart = Date.now();

  // Execute choreography
  await choreography(page, {
    smoothScrollTo: async (fromY, toY, durationMs) => {
      const steps = Math.max(10, Math.floor(durationMs / 16));
      for (let s = 0; s <= steps; s++) {
        const progress = easeInOutCubic(s / steps);
        const curY = fromY + (toY - fromY) * progress;
        await page.evaluate((y) => {
          if (window.__lenis) {
            window.__lenis.scrollTo(y, { immediate: true });
          } else {
            window.scrollTo(0, y);
          }
        }, curY);
        await new Promise(r => setTimeout(r, durationMs / steps));
      }
    },
    clickElement: async (selector) => {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) el.click();
      }, selector);
      await new Promise(r => setTimeout(r, 150));
    },
    wait: async (ms) => new Promise(r => setTimeout(r, ms))
  });

  const totalDurationSec = (Date.now() - tStart) / 1000;
  const targetTotalFrames = Math.floor(totalDurationSec * fps);

  // Fill any remaining frames to the end of the duration
  while (lastEmittedFrameIndex < targetTotalFrames && lastBuffer) {
    ffmpeg.stdin.write(lastBuffer);
    lastEmittedFrameIndex++;
  }

  await client.send('Page.stopScreencast');
  ffmpeg.stdin.end();

  await new Promise(res => ffmpeg.on('close', res));
  await browser.close();

  console.log(`COMPLETED: ${mode.toUpperCase()}`);
  console.log(`Duration: ${totalDurationSec.toFixed(2)}s | Total Frames: ${lastEmittedFrameIndex} (Expected: ${targetTotalFrames})`);
  console.log(`Video saved to: ${outputPath}\n`);
}

// ----------------------------------------------------------------------------
// DESKTOP DYNAMIC CHOREOGRAPHY (16:9 - 1920x1080)
// Total target duration: ~22 - 24 seconds (snappy, continuous rhythm, no dead pauses)
// ----------------------------------------------------------------------------
async function runDesktop() {
  const outputPath = path.resolve('public', 'prime_stone_showcase_desktop_16x9.mp4');

  await recordSession({
    mode: 'desktop',
    outputPath,
    viewport: { width: 1920, height: 1080, deviceScaleFactor: 1 },
    fps: 30,
    choreography: async (page, { smoothScrollTo, clickElement, wait }) => {
      // 1. Initial Hero Intro (0s - 0.4s) - crisp start
      console.log('Phase 1: Dynamic Hero 3D Sequence...');
      await wait(400);

      // 2. Continuous, kinetic scroll through 3D frame sequence (0.4s - 3.8s)
      // Smoothly builds the gutter extrusion and house framing into completion
      await smoothScrollTo(0, 2050, 3400);

      // Brief 0.4s hold on the finished 3D house structure (no dead pause!)
      await wait(400);

      // 3. Immediately transitions into House Anatomy Split Cards (4.2s - 7.6s)
      console.log('Phase 2: House Anatomy Split Cards...');
      // House cleaves open cleanly and reveals the 3 cards
      await smoothScrollTo(2050, 3250, 2000);
      // Appreciate the 3 disciplines fanned open
      await wait(1400);

      // 4. Flow straight into Aceternity 3D HeroParallax Gallery (7.6s - 14.8s)
      console.log('Phase 3: 3D HeroParallax Stream & Real Photo Lightbox...');
      // Parallax stream shifts into 3D perspective
      await smoothScrollTo(3250, 4800, 2200);
      await wait(400);

      // Continue glide into central rows
      await smoothScrollTo(4800, 5350, 1400);
      await wait(300);

      // Open Project Modal (Executive Residence Siding & Fascia)
      console.log('Popping project modal with real 2K photo...');
      await clickElement('div.group\\/product');
      // Hold on modal to showcase real photograph, location, and specs checklist (~1.6s)
      await wait(1600);

      // Close modal cleanly
      console.log('Closing modal...');
      await clickElement('button.transition-colors');
      await wait(400);

      // 5. Dynamic sweep through remaining parallax rows into Company Profile (14.8s - 18.5s)
      console.log('Phase 4: Company Profile & 4+ Years Experience...');
      await smoothScrollTo(5350, 6800, 2200);
      // Brief dynamic hold on the 4+ Years Experience badge and growth pillars
      await wait(1200);

      // 6. Dynamic glide into Direct Superintendent Contact & CTA (18.5s - 22.0s)
      console.log('Phase 5: Direct Superintendent Contact & CTA...');
      await smoothScrollTo(6800, 7800, 1800);
      // Final clean hold
      await wait(1000);
    }
  });
}

// ----------------------------------------------------------------------------
// MOBILE DYNAMIC CHOREOGRAPHY (9:16 - 1080x1920)
// Total target duration: ~19 - 22 seconds
// ----------------------------------------------------------------------------
async function runMobile() {
  const outputPath = path.resolve('public', 'prime_stone_showcase_mobile_9x16.mp4');

  await recordSession({
    mode: 'mobile',
    outputPath,
    viewport: {
      width: 540,
      height: 960,
      deviceScaleFactor: 2, // 1080x1920 vertical Full HD
      isMobile: true,
      hasTouch: true
    },
    fps: 30,
    choreography: async (page, { smoothScrollTo, clickElement, wait }) => {
      // 1. Initial Entrance (0s - 0.4s)
      console.log('Phase 1: Mobile Dynamic 3D Sequence...');
      await wait(400);

      // 2. Mobile 3D Sequence Scroll (0.4s - 3.4s)
      await smoothScrollTo(0, 1600, 3000);
      // Brief 0.4s hold on the completed mobile structure
      await wait(400);

      // 3. Immediately transitions into Mobile House Anatomy Cards (3.8s - 7.0s)
      console.log('Phase 2: Mobile House Anatomy Cards...');
      await smoothScrollTo(1600, 2450, 1800);
      await wait(1200);

      // 4. Flow straight into Mobile HeroParallax Gallery (7.0s - 14.0s)
      console.log('Phase 3: Mobile HeroParallax Gallery & Lightbox...');
      await smoothScrollTo(2450, 3450, 2000);
      await wait(400);

      // Open mobile project modal
      console.log('Opening mobile project modal...');
      await clickElement('div.group\\/product');
      // Hold on modal to showcase real photo & specs checklist
      await wait(1600);

      // Close modal
      console.log('Closing mobile modal...');
      await clickElement('button.transition-colors');
      await wait(400);

      // 5. Sweep through Company Profile & 4+ Years Experience (14.0s - 17.5s)
      console.log('Phase 4: Mobile Company Profile & 4+ Years...');
      await smoothScrollTo(3450, 4400, 2000);
      await wait(1200);

      // 6. Direct Superintendent Contact Form & Free Estimate (17.5s - 21.0s)
      console.log('Phase 5: Mobile Contact & CTA...');
      await smoothScrollTo(4400, 5200, 1800);
      await wait(1000);
    }
  });
}

async function copyToDestinations() {
  console.log('Copying finalized dynamic videos to local disk destinations...');
  const { copyFileSync, mkdirSync } = await import('fs');

  const srcDesktop = path.resolve('public', 'prime_stone_showcase_desktop_16x9.mp4');
  const srcMobile = path.resolve('public', 'prime_stone_showcase_mobile_9x16.mp4');

  const destFolders = [
    'C:\\TRABAJO\\PRIME STONE BUILDERS\\videos para web',
    'C:\\TRABAJO\\PRIME STONE BUILDERS\\videos redes'
  ];

  for (const folder of destFolders) {
    mkdirSync(folder, { recursive: true });
    copyFileSync(srcDesktop, path.join(folder, 'prime_stone_showcase_desktop_16x9.mp4'));
    copyFileSync(srcMobile, path.join(folder, 'prime_stone_showcase_mobile_9x16.mp4'));
  }

  // Also update the friendly names in 'videos para web'
  copyFileSync(srcDesktop, 'C:\\TRABAJO\\PRIME STONE BUILDERS\\videos para web\\horizontal para escritorio (nuevo interactivo).mp4');
  copyFileSync(srcMobile, 'C:\\TRABAJO\\PRIME STONE BUILDERS\\videos para web\\vertical para mobile (nuevo interactivo).mp4');

  console.log('All files updated on disk successfully!');
}

async function main() {
  const arg = process.argv[2];
  if (arg === 'mobile') {
    await runMobile();
    await copyToDestinations();
  } else if (arg === 'desktop') {
    await runDesktop();
    await copyToDestinations();
  } else {
    // Run both
    await runDesktop();
    await runMobile();
    await copyToDestinations();
  }
}

main().catch((err) => {
  console.error('Fatal recording error:', err);
  process.exit(1);
});
