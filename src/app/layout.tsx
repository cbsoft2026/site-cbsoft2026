import './styles/globals.scss';
import getRequestConfig from '@/i18n/request';
import ClientLayout from '@/providers/LocaleProvider';
import { LayoutProvider } from '@/providers/LayoutProvider';

type Props = {
  children: React.ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  const { locale, messages } = await getRequestConfig({
    requestLocale: Promise.resolve('pt'),
  });

  return (
    <html lang={locale}>
      <body>
        <ClientLayout locale={locale} messages={messages}>
          <LayoutProvider>{children}</LayoutProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
