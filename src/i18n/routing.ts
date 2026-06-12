import { defaultLang, locales } from '@/app/config/locales';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: locales,
  defaultLocale: defaultLang,
  localePrefix: 'always',
  alternateLinks: true,
});
