import { defaultLang, locales } from '@/types/locales';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: locales,
  defaultLocale: defaultLang,
  localePrefix: 'always',
  alternateLinks: true,
});
