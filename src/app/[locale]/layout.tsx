import ClientLayout from '../layout/ClientLayout';
import requestConfig, { requestMessages } from '@/i18n/request';

import '../styles/globals.scss';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

type Params = Promise<{ locale: string }>;

type Props = {
  children: React.ReactNode;
  params: Params;
};

export const generateStaticParams = () => {
  return [{ locale: 'en' }, { locale: 'pt' }];
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  const config = await requestConfig({
    requestLocale: Promise.resolve(locale),
  });
  const messages = await requestMessages({ locale: config.locale });

  return (
    <html lang={config.locale}>
      <body>
        <ClientLayout locale={config.locale} messages={messages}>
          <Menu />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
