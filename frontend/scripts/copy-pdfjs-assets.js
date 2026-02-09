import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function main() {
  const pdfjsRoot = path.join(projectRoot, 'node_modules', 'pdfjs-dist');
  const publicRoot = path.join(projectRoot, 'public', 'pdfjs');

  try {
    await copyDir(path.join(pdfjsRoot, 'cmaps'), path.join(publicRoot, 'cmaps'));
    await copyDir(path.join(pdfjsRoot, 'standard_fonts'), path.join(publicRoot, 'standard_fonts'));
    console.log('[pdfjs] Assets copied to public/pdfjs');
  } catch (err) {
    console.warn('[pdfjs] Unable to copy assets:', err?.message || err);
  }
}

main();
