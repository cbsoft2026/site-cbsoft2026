import { requestMessagesNode as requestMessages } from '../i18n/requestNode';
import * as fs from 'fs';
import * as path from 'path';

const locales = ['en', 'pt'];
const outputDir = path.join(process.cwd(), 'public', 'generated');

async function generate() {
  fs.mkdirSync(outputDir, { recursive: true });

  for (const locale of locales) {
    console.log(`Gerando mensagens para: ${locale}`);
    const messages = await requestMessages({ locale });
    const filePath = path.join(outputDir, `${locale}.json`);
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
  }

  console.log('Mensagens estáticas geradas com sucesso!');
}

generate().catch((err) => {
  console.error('Erro ao gerar mensagens:', err);
  process.exit(1);
});
