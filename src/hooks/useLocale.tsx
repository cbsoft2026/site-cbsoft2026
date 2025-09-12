'use client';

import { Locale } from '@/types/locales';
import { useState, useCallback, useLayoutEffect, useMemo } from 'react';

export function useLocale(defaultLocale: Locale = 'pt') {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Record<string, any> | null>(null);

  const loadMessages = useCallback(async (loc: Locale) => {
    try {
      const res = await fetch(`/generated/${loc}.json`);
      if (!res.ok) throw new Error(`Falha ao carregar ${loc}.json`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Erro ao carregar mensagens:', err);
    }
  }, []);

  useLayoutEffect(() => {
    const stored = localStorage.getItem('locale');
    let initialLocale: Locale = defaultLocale;

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.locale) initialLocale = parsed.locale;
      } catch {}
    } else {
      localStorage.setItem('locale', JSON.stringify({ locale: initialLocale }));
    }

    setLocale(initialLocale);
    loadMessages(initialLocale);
  }, [defaultLocale, loadMessages]);

  const switchLocale = useCallback(
    async (newLocale: Locale) => {
      if (newLocale === locale) return;
      await loadMessages(newLocale);
      setLocale(newLocale);
      localStorage.setItem('locale', JSON.stringify({ locale: newLocale }));
    },
    [locale, loadMessages],
  );

  const memoizedMessages = useMemo(() => messages ?? {}, [messages]);

  return { locale, messages: memoizedMessages, switchLocale };
}
