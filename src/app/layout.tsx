import './styles/globals.scss';
import getRequestConfig from '@/i18n/request';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';
import ClientLayout from '@/providers/LocaleProvider';

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
          <Menu />
          <main style={{ paddingTop: '48px', paddingBottom: '64px' }}>{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
