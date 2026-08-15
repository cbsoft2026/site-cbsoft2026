import { readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

import path from 'path';

const execFileAsync = promisify(execFile);

export async function generatePDF(templatePath: string, outputDir: string, filename: string, content: string) {
  const template = await readFile(templatePath, 'utf8');

  const tex = template.replace('%% GENERATED_CONTENT %%', content);

  await mkdir(outputDir, { recursive: true });

  const texPath = path.join(outputDir, `${filename}.tex`);

  await writeFile(texPath, tex);

  await execFileAsync('lualatex', [
    '-shell-escape',
    '-interaction=nonstopmode',
    '-halt-on-error',
    '-output-directory',
    outputDir,
    texPath,
  ]);

  await Promise.all([
    rm(path.join(outputDir, `${filename}.aux`), { force: true }),
    rm(path.join(outputDir, `${filename}.log`), { force: true }),
  ]);
}
