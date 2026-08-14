import type { Metadata } from 'next';

import appConfig from '@/app/app.config';

export async function createPageMetadata(
  title: string | undefined = undefined,
  keywords: string[] = [],
): Promise<Metadata> {
  return {
    title: title,
    keywords: [appConfig.organization, appConfig.conference, ...keywords],
    openGraph: {
      type: 'article',
      title: title,
      siteName: appConfig.organization,
    },
  };
}
