import appConfig from '@/app/app.config';
import { NextIntlClientProvider } from 'next-intl';

import { getMessages } from 'next-intl/server';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={appConfig.timezone}>
      <main>{children}</main>
    </NextIntlClientProvider>
  );
}
