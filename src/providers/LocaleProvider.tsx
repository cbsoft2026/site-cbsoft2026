'use client';

import { ReactNode, createContext, useContext } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { useLocale } from '@/hooks/useLocale';
import { Locale } from '@/types/locales';

type LocaleContextType = {
  locale: string;
  messages: any;
  switchLocale: (newLocale: Locale) => Promise<void>;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function useLocaleContext() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocaleContext must be used inside ClientLayout');
  return ctx;
}

type Props = {
  children: ReactNode;
  locale: string;
  messages: any;
};

export default function ClientLayout({ children, locale: initialLocale, messages: initialMessages }: Props) {
  const { locale, messages, switchLocale } = useLocale(initialLocale);

  if (!messages || Object.keys(messages).length === 0) return <></>;

  return (
    <LocaleContext.Provider value={{ locale, messages, switchLocale }}>
      <NextIntlClientProvider key={locale} locale={locale} messages={messages} timeZone='America/Sao_Paulo'>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
