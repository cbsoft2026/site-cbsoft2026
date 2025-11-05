import LangSetter from './LangSetter';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pt' }];
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
