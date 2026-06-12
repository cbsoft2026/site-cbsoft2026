import { locales } from '@/app/config/locales';
import LangSetter from './LangSetter';

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
    <>
      <LangSetter lang={locale} />
      {children}
    </>
  );
}
