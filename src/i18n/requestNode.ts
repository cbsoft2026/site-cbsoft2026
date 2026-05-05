import * as fs from 'fs';
import * as path from 'path';

/**
 * Separador usado para gerar chaves hierárquicas a partir das pastas.
 */
const SEPARATOR_FOLDER = '/';

const EXT_JSON = 'json';
const EXT_MD = 'md';

export type LoadMessagesParamsNode = { locale: string };

function ensureObject(messages: Record<string, any>, key: string) {
  if (!messages[key]) {
    messages[key] = {};
  }
}

/**
 * Carregar todas as mensagens de um determinado idioma a partir da pasta
 * `locales/<locale>`.
 *
 * A função percorre recursivamente subpastas e arquivos JSON, gerando um objeto
 * aninhado de mensagens. As chaves correspondem à estrutura de pastas.
 *
 * @param locale Idioma a ser carregado (ex: 'pt', 'en')
 * @returns Objeto contendo todas as mensagens do idioma, estruturadas por chave
 */
export async function requestMessagesNode({ locale }: LoadMessagesParamsNode) {
  const basePath = path.join(process.cwd(), 'locales', locale);

  function readDirRecursive(dirPath: string, parentKey = ''): Record<string, any> {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    let messages: Record<string, any> = {};

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        const key = parentKey ? `${parentKey}${SEPARATOR_FOLDER}${entry.name}` : entry.name;
        messages = { ...messages, ...readDirRecursive(fullPath, key) };
      } else if (entry.isFile() && entry.name.endsWith(`.${EXT_JSON}`)) {
        const key = parentKey
          ? `${parentKey}${SEPARATOR_FOLDER}${entry.name.replace(`.${EXT_JSON}`, '')}`
          : entry.name.replace(`.${EXT_JSON}`, '');

        const fileMessages = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));

        ensureObject(messages, key);

        messages[key] = {
          ...messages[key],
          ...fileMessages,
        };
      } else if (entry.isFile() && entry.name.endsWith(`.${EXT_MD}`)) {
        const key = parentKey
          ? `${parentKey}${SEPARATOR_FOLDER}${entry.name.replace(`.${EXT_MD}`, '')}`
          : entry.name.replace(`.${EXT_MD}`, '');

        const fileContent = fs.readFileSync(fullPath, 'utf-8');

        ensureObject(messages, key);

        messages[key] = {
          ...messages[key],
          page: {
            tipo: 'markdown',
            conteudo: fileContent.split('\n'),
          },
        };
      }
    }

    return messages;
  }

  return readDirRecursive(basePath);
}
