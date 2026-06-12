import fs from 'fs';
import path from 'path';
import { defaultLang } from '@/app/config/locales';

const src = path.join(process.cwd(), `out/${defaultLang}`);
const dest = path.join(process.cwd(), 'out');

async function copyRecursive(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });

  for (const file of fs.readdirSync(srcDir)) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);

    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(src, dest)
  .then(() => {
    console.log(`Rota de idioma padrão gerado com sucesso: ${defaultLang}`);
  })
  .catch((err) => {
    console.error('Erro ao gerar idioma padrão', err);
    process.exit(1);
  });
