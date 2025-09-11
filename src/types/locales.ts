import nextConfig from '../../next.config';

/**
 * Cria um tipo baseado nos idiomas configurados no next.config.js
 */
export const locales = nextConfig.i18n?.locales ?? ['pt'];
export const defaultLang = nextConfig.i18n?.defaultLocale ?? 'pt';
export type Locale = (typeof locales)[number];
