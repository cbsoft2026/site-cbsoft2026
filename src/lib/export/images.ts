import { rm, cp, readdir } from 'node:fs/promises';

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

import path from 'path';

const execFileAsync = promisify(execFile);

export async function convertWithDwebp(inputPath: string, outputPath: string): Promise<void> {
  await execFileAsync('dwebp', [inputPath, '-o', outputPath]);
}

export async function convertWithInkscape(inputPath: string, outputPath: string): Promise<void> {
  await execFileAsync('inkscape', [inputPath, '--export-filename', outputPath]);
}

async function copySpeakersImages(speakersDir: string, outputPath: string) {
  const speakerOutput = path.join(outputPath, 'speakers');
  await cp(speakersDir, speakerOutput, { recursive: true });
  const speakerFiles = await readdir(speakerOutput);

  const webpFiles = speakerFiles.filter((file) => file.toLowerCase().endsWith('.webp'));

  if (webpFiles.length === 0) return;

  for (const file of webpFiles) {
    const inputPath = path.join(speakerOutput, file);
    const fileWithoutExt = path.parse(file).name;
    const outputPath = path.join(speakerOutput, `${fileWithoutExt}.png`);
    await convertWithDwebp(inputPath, outputPath);
    await rm(inputPath);
  }
}

async function copyLogoFiles(logosDir: string, outputPath: string) {
  const logosOutput = path.join(outputPath, 'logos');
  await cp(logosDir, logosOutput, { recursive: true });
  const logosFiles = await readdir(logosOutput);

  const logoFile = logosFiles.filter((file) => file.toLowerCase().includes('cbsoft-logo-icon.svg'));

  if (logoFile.length === 0) return;

  for (const file of logoFile) {
    const inputPath = path.join(logosOutput, file);
    const fileWithoutExt = path.parse(file).name;
    const outputPath = path.join(logosOutput, `${fileWithoutExt}.pdf`);
    await convertWithInkscape(inputPath, outputPath);
    await rm(inputPath);
  }
}

export async function prepareExportAssets(speakersDir: string, logosDir: string, outputPath: string) {
  await copySpeakersImages(speakersDir, outputPath);
  await copyLogoFiles(logosDir, outputPath);
}
