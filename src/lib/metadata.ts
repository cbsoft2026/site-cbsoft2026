import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function createPageMetadata(locale: string, namespace: string, key: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  const title = t(key);

  return {
    title,
    openGraph: {
      type: 'article',
      title,
    },
  };
}
