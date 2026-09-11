import { locales } from '@/app/config/locales';
import { alegreyaSansUltraBold } from '@/app/layout';

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale: locale,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    htmlLang: locale,
    lang: locale,
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  return (
    <html className={alegreyaSansUltraBold.variable} lang={locale}>
      <body>{children}</body>
    </html>
  );
}
