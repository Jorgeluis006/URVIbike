// Copy static assets (img folder and favicon.svg) into dist for Vercel deployments
// Works cross-platform using Node's fs APIs.

import fs from 'fs';
import path from 'path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const imgSrc = path.join(root, 'img');
const imgDest = path.join(distDir, 'img');
const faviconSrc = path.join(root, 'favicon.svg');
const faviconDest = path.join(distDir, 'favicon.svg');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

fs.mkdirSync(distDir, { recursive: true });

try {
  copyDir(imgSrc, imgDest);
  if (fs.existsSync(faviconSrc)) {
    fs.copyFileSync(faviconSrc, faviconDest);
  }
  console.log('[postbuild] Static assets copied to dist');
} catch (err) {
  console.warn('[postbuild] Failed to copy static assets:', err.message);
}
