'use client';

import { ReactNode } from 'react';
import LocaleProvider from '@/providers/LocaleProvider';

type Props = {
  children: ReactNode;
  locale: string;
  messages: any;
};

export default function ClientLayout({ children, locale: initialLocale, messages: initialMessages }: Props) {
  return (
    <LocaleProvider locale={initialLocale} messages={initialMessages}>
      {children}
    </LocaleProvider>
  );
}
