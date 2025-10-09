import * as fs from 'fs';
import * as path from 'path';
import { loadCalls, loadEvents } from '../lib/api';
import { locales } from '../types/locales';

const outputDir = path.join(process.cwd(), 'public', 'generated');

async function generate() {
  fs.mkdirSync(outputDir, { recursive: true });

  for (const locale of locales) {
    const events = loadEvents(locale);
    const filePath = path.join(outputDir, `events_${locale}.json`);
    const json = JSON.stringify(Object.fromEntries(Array.from(events.entries()).map(([k, set]) => [k, set])), null, 2);
    fs.writeFileSync(filePath, json);

    const calls = loadCalls(locale);
    Object.keys(calls).map((key) => {
      const value = calls[key];
      const filePath = path.join(outputDir, `${key}.md`);
      fs.writeFileSync(filePath, value);
    });
  }

  console.log('Eventos estáticos geradas com sucesso!');
}

generate().catch((err) => {
  console.error('Erro ao gerar mensagens:', err);
  process.exit(1);
});
