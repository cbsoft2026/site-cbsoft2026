// Caminho relativo porque o script será executado fora do contexto do Next.js
import { locales } from '../types/locales';
import { requestMessagesNode as requestMessages } from '../i18n/requestNode';
import * as fs from 'fs';
import * as path from 'path';

const outputDir = path.join(process.cwd(), 'public', 'generated');

/**
 * Gera arquivos JSON contendo mensagens traduzidas para cada idioma
 * definido em `locales`, para uso em aplicações que necessitam de
 * internacionalização (i18n) **estática**.
 *
 * Para cada idioma:
 * 1. Busca as mensagens traduzidas usando `requestMessages`.
 *
 */
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
