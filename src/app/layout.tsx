import './styles/globals.scss';
import getRequestConfig from '@/i18n/request';
import ClientLayout from '@/providers/LocaleProvider';
import { LayoutProvider } from '@/providers/LayoutProvider';

import localFont from 'next/font/local';

const gothamBlack = localFont({
  src: '../../public/fonts/gotham-font/Gotham-Black.otf',
  variable: '--font-gotham-black',
  weight: '900',
  style: 'normal',
});

type Props = {
  children: React.ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  const { locale, messages } = await getRequestConfig({
    requestLocale: Promise.resolve('pt'),
  });

  return (
    <html lang={locale} className={gothamBlack.variable}>
      <body>
        <ClientLayout locale={locale} messages={messages}>
          <LayoutProvider>{children}</LayoutProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
