import { NextIntlClientProvider } from 'next-intl';
import Menu from '@/components/Menu';

import { getMessages } from 'next-intl/server';
import Footer from '@/components/Footer';
import appConfig from '@/app/app.config';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={appConfig.timezone}>
      <Menu data-pagefind-ignore='all' />
      <main>{children}</main>
      <Footer data-pagefind-ignore='all' />
    </NextIntlClientProvider>
  );
}
