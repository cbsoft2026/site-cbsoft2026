'use client';

export function setLocale(locale: 'pt' | 'en') {
  document.cookie = `locale=${locale}; path=/; max-age=31536000`;
}
