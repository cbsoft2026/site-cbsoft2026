'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { MessagesContext } from './MessagesContext';
import { Locale } from '@/types/locales';

type LocaleContextType = {
  locale: string;
  switchLocale: (newLocale: Locale) => Promise<void>;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside ClientLayout');
  return ctx;
}

type Props = {
  children: ReactNode;
  locale: string;
  messages: any;
};

export default function ClientLayout({ children, locale: initialLocale, messages: initialMessages }: Props) {
  const [locale, setLocale] = useState(initialLocale);
  const [messages, setMessages] = useState(initialMessages);

  /**
   * Função para trocar o idioma.
   *
   * @param newLocale Novo idioma
   */
  async function switchLocale(newLocale: Locale) {
    const res = await fetch(`/generated/${newLocale}.json`);
    const newMessages = await res.json();

    setLocale(newLocale);
    setMessages(newMessages);
  }

  return (
    <LocaleContext.Provider value={{ locale, switchLocale }}>
      <NextIntlClientProvider timeZone='America/Sao_Paulo' locale={locale} messages={messages}>
        <MessagesContext.Provider value={messages}>{children}</MessagesContext.Provider>
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
