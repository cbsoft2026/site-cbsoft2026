import { cp, mkdir, readdir } from 'node:fs/promises';

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

async function copyFiles(
  inputPath: string,
  outputPath: string,
  extension: string,
  filter: (file: string) => boolean,
  callback: (input: string, output: string) => Promise<void>,
) {
  const figuresOutput = path.join(outputPath, 'figures');
  const figuresFiles = (await readdir(inputPath)).map((file) => {
    return path.join(inputPath, file);
  });

  const filteredFiles = figuresFiles.filter(filter);

  if (filteredFiles.length === 0) return;

  for (const file of filteredFiles) {
    const fileWithoutExt = path.parse(file).name;
    const outputFile = path.join(figuresOutput, `${fileWithoutExt}.${extension}`);
    await callback(file, outputFile);
  }
}

export async function prepareExportAssets(paths: Record<string, string>) {
  await mkdir(path.join(paths.output, 'figures'), { recursive: true });

  await copyFiles(
    paths.speakers,
    paths.output,
    'png',
    (file) => file.toLowerCase().endsWith('.webp'),
    convertWithDwebp,
  );
  await copyFiles(
    paths.logos,
    paths.output,
    'pdf',
    (file) => file.toLowerCase().includes('cbsoft-logo-icon.svg'),
    convertWithInkscape,
  );
  await copyFiles(
    paths.images,
    paths.output,
    'png',
    (file) => file.toLowerCase().includes('qrcode.png'),
    async (input, output) => {
      await cp(input, output, { recursive: true });
    },
  );
}
