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
    <NextIntlClientProvider locale={locale} messages={messages} timeZone='America/Sao_Paulo'>
      <main>{children}</main>
    </NextIntlClientProvider>
  );
}
