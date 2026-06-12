import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

import appConfig from '@/app/app.config';

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
    keywords: [appConfig.organization, appConfig.conference, ...keywords],
    openGraph: {
      type: 'article',
      title,
      siteName: appConfig.organization,
    },
  };
}
