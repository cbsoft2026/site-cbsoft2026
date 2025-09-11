/**
 * Cria um tipo baseado nos idiomas configurados no next.config.js
 */
export const locales = ['pt', 'en'];
export const defaultLang = 'pt';
export type Locale = (typeof locales)[number];
