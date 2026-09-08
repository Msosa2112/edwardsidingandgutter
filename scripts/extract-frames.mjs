import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Configurable settings with CLI arguments fallback
const args = process.argv.slice(2).reduce((acc, arg) => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=');
    acc[key] = value !== undefined ? value : true;
  }
  return acc;
}, {});

const CONFIG = {
  desktopVideo: args.desktopVideo || "C:\\TRABAJO\\PRIME STONE BUILDERS\\videos para web\\horizontal para escritorio.mp4",
  mobileVideo: args.mobileVideo || "C:\\TRABAJO\\PRIME STONE BUILDERS\\videos para web\\vertical para mobile.mp4",
  fps: parseInt(args.fps || '12', 10),
  desktopMaxWidth: parseInt(args.desktopMaxWidth || '1920', 10),
  mobileMaxWidth: parseInt(args.mobileMaxWidth || '1080', 10),
  quality: parseInt(args.quality || '82', 10),
  compressionLevel: parseInt(args.compressionLevel || '4', 10),
  desktopOutDir: path.resolve(projectRoot, 'public/frames/desktop'),
  mobileOutDir: path.resolve(projectRoot, 'public/frames/mobile')
};

console.log('=== Prime Stone Builders Frame Extraction Config ===');
console.log(JSON.stringify(CONFIG, null, 2));

function runFfmpeg(commandArgs) {
  return new Promise((resolve, reject) => {
    console.log(`Executing: ffmpeg ${commandArgs.join(' ')}`);
    const proc = spawn('ffmpeg', commandArgs, { stdio: 'inherit' });
    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });
    proc.on('error', (err) => reject(err));
  });
}

function ensureCleanDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  } else {
    // Clean existing webp frames if any
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.webp'));
    for (const f of files) {
      fs.unlinkSync(path.join(dirPath, f));
    }
  }
}

async function extract() {
  try {
    // 1. Desktop extraction
    console.log('\n--> Extracting Desktop Frames...');
    ensureCleanDir(CONFIG.desktopOutDir);
    const desktopOutPattern = path.join(CONFIG.desktopOutDir, 'frame-%04d.webp');
    const desktopFilter = `fps=${CONFIG.fps},scale=${CONFIG.desktopMaxWidth}:-2:flags=lanczos`;
    
    await runFfmpeg([
      '-y',
      '-i', CONFIG.desktopVideo,
      '-vf', desktopFilter,
      '-c:v', 'libwebp',
      '-quality', String(CONFIG.quality),
      '-compression_level', String(CONFIG.compressionLevel),
      desktopOutPattern
    ]);

    const desktopFrames = fs.readdirSync(CONFIG.desktopOutDir).filter(f => f.endsWith('.webp'));
    console.log(`[OK] Desktop frames generated: ${desktopFrames.length}`);

    // 2. Mobile extraction
    console.log('\n--> Extracting Mobile Frames...');
    ensureCleanDir(CONFIG.mobileOutDir);
    const mobileOutPattern = path.join(CONFIG.mobileOutDir, 'frame-%04d.webp');
    const mobileFilter = `fps=${CONFIG.fps},scale=${CONFIG.mobileMaxWidth}:-2:flags=lanczos`;

    await runFfmpeg([
      '-y',
      '-i', CONFIG.mobileVideo,
      '-vf', mobileFilter,
      '-c:v', 'libwebp',
      '-quality', String(CONFIG.quality),
      '-compression_level', String(CONFIG.compressionLevel),
      mobileOutPattern
    ]);

    const mobileFrames = fs.readdirSync(CONFIG.mobileOutDir).filter(f => f.endsWith('.webp'));
    console.log(`[OK] Mobile frames generated: ${mobileFrames.length}`);

    console.log('\n=== Extraction Complete! ===');
  } catch (error) {
    console.error('[ERROR] Frame extraction failed:', error);
    process.exit(1);
  }
}

extract();
