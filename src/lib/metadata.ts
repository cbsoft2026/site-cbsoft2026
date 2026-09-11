import type { Metadata } from 'next';

import appConfig from '@/app/app.config';
import { fileURLToPath } from 'url';
import path from 'path';
import { locales } from '@/app/config/locales';

type PageParams = Promise<Record<string, string | string[]>>;

function getRoutePath(dirname: string, params: Record<string, string | string[]>) {
  const appPath = path.join(process.cwd(), 'src', 'app');

  const relativePath = path.relative(appPath, dirname);

  const segments = relativePath
    .split(path.sep)
    .filter(Boolean)
    .filter((segment) => !segment.startsWith('('))
    .filter((segment) => segment !== '[locale]');

  if (segments.length > 0 && locales.includes(segments[0] as never)) {
    segments.shift();
  }

  return segments
    .map((segment) => {
      const match = segment.match(/^\[(?:\.\.\.)?(.+)\]$/);

      if (!match) {
        return segment;
      }

      const value = params[match[1]];

      if (value === undefined) {
        return '';
      }

      return Array.isArray(value) ? value.join('/') : value;
    })
    .filter(Boolean)
    .join('/');
}

export async function createPageMetadata(
  title: string | undefined = undefined,
  keywords: string[] = [],
  params?: PageParams,
  moduleUrl?: string,
): Promise<Metadata> {
  const metadata: Metadata = {
    title: title,
    keywords: [appConfig.organization, appConfig.conference, ...keywords],
    openGraph: {
      type: 'article',
      title: title,
      siteName: appConfig.organization,
    },
  };

  if (params && moduleUrl) {
    const resolvedParams = await params;

    const dirname = path.dirname(fileURLToPath(moduleUrl));

    const route = getRoutePath(dirname, resolvedParams);

    const pathSuffix = route ? `/${route}` : '';

    metadata.alternates = {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${resolvedParams.locale || ''}${pathSuffix}/`,
      languages: {
        ...Object.fromEntries(
          locales.map((locale) => [locale, `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}${pathSuffix}/`]),
        ),
        'x-default': `${process.env.NEXT_PUBLIC_SITE_URL}${pathSuffix}/`,
      },
    };
  }

  return metadata;
}
