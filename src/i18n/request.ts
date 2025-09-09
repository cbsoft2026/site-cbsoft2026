import fs from 'fs';
import path from 'path';

const SEPARATOR_FOLDER = '/';
const EXT = 'json';

import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async (_params) => {
  const store = await cookies();
  const locale = store.get('locale')?.value || 'en';

  return {
    locale,
    defaultLocale: 'en',
  };
});

export type LoadMessagesParams = { locale: string };

export async function requestMessages({ locale }: LoadMessagesParams) {
  const basePath = path.join(process.cwd(), 'locales', locale);

  function readDirRecursive(dirPath: string, parentKey = ''): Record<string, any> {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    let messages: Record<string, any> = {};

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        const key = parentKey ? `${parentKey}${SEPARATOR_FOLDER}${entry.name}` : entry.name;
        messages = { ...messages, ...readDirRecursive(fullPath, key) };
      } else if (entry.isFile() && entry.name.endsWith(`.${EXT}`)) {
        const key = parentKey
          ? `${parentKey}${SEPARATOR_FOLDER}${entry.name.replace(`.${EXT}`, '')}`
          : entry.name.replace(`.${EXT}`, '');
        const fileMessages = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        messages[key] = fileMessages;
      }
    }

    return messages;
  }

  return readDirRecursive(basePath);
}
