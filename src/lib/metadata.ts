import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function createPageMetadata(
  locale: string,
  namespace: string,
  key: string,
  keywords: string[] = [],
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });

  const title = t(key);

  return {
    title,
    keywords: ['SBC', 'CBSoft', ...keywords],
    openGraph: {
      type: 'article',
      title,
      siteName: 'SBC',
    },
  };
}
