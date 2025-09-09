import ClientLayout from './layout/ClientLayout';
import requestConfig, { requestMessages } from '@/i18n/request';

import './styles/globals.scss';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

type Props = {
  children: React.ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  const config = await requestConfig({
    requestLocale: Promise.resolve(undefined),
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
