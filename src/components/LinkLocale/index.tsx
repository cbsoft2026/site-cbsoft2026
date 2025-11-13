'use client';

import { locales } from '@/types/locales';
import { useLocale } from 'next-intl';
import Link, { LinkProps } from 'next/link';
import { UrlObject } from 'url';

type HrefType = string | URL | UrlObject;

interface Props extends LinkProps {
  href: HrefType;
  children?: React.ReactNode;
  className?: string;
}

function hrefToString(href: HrefType): string | null | undefined {
  if (typeof href === 'string') return href;
  if (href instanceof URL) return href.pathname + href.search + href.hash;
  if ('pathname' in href && href.pathname != undefined) {
    let url = href.pathname;
    if (href.query) {
      const params = new URLSearchParams(href.query as any).toString();
      if (params) url += `?${params}`;
    }
    return url;
  }
  return undefined;
}

export default function LinkLocale({ href, locale, ...props }: Props) {
  const defaultLocale = useLocale();

  if (!locale) {
    locale = defaultLocale;
  }

  let path = hrefToString(href);
  if (path == undefined) {
    return <Link prefetch={false} href={href} {...props} />;
  }

  locales.forEach((locale) => {
    const prefixToRemove = `/${locale}`;
    if (path?.startsWith(prefixToRemove)) {
      path = path.slice(prefixToRemove.length);
    }
  });

  let localizedHref = `/${locale}`;
  if (path) {
    localizedHref += path?.startsWith('/') ? path : `/${path}`;
  }

  return <Link prefetch={false} href={localizedHref} {...props} />;
}
