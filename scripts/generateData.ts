import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import { parse } from 'yaml';

const inputDir = path.join(process.cwd(), 'public', 'data');
const outputDir = path.join(process.cwd(), 'public', 'generated');

async function generate() {
  fs.mkdirSync(outputDir, { recursive: true });

  const files = glob.sync('**/*.yaml', { cwd: inputDir });

  for (const file of files) {
    const yamlPath = path.join(inputDir, file);
    const jsonPath = path.join(outputDir, file.replace(/\.ya?ml$/, '.json'));

    const content = fs.readFileSync(yamlPath, 'utf8');
    const data = parse(content);

    fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  }

  console.log(`Dados estáticos geradas com sucesso! ${files}`);
}

generate().catch((err) => {
  console.error('Erro ao gerar os dados:', err);
  process.exit(1);
});
