'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { setLocale as setLocaleCookie } from '@/lib/locale';
import { MessagesContext } from './MessagesContext';

type LocaleContextType = {
  locale: string;
  switchLocale: (newLocale: 'pt' | 'en') => Promise<void>;
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

  async function switchLocale(newLocale: 'pt' | 'en') {
    setLocaleCookie(newLocale);
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;

    const res = await fetch(`/api/messages/${newLocale}`);
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
