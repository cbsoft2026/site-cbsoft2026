import CallComponent from '@/components/Call';
import Title from '@/components/Title';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  return {
    title: t('siglas.workshops'),
    openGraph: {
      type: 'article',
      title: t('siglas.workshops'),
    },
  };
}

export default async function CallPage({ params }: Props) {
  const { locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  return (
    <article style={{ padding: '30px 60px 0' }}>
      <header className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`siglas.workshops`)}`}></Title>
      </header>
      <CallComponent className='container' acronym={'workshops'} locale={locale}></CallComponent>
    </article>
  );
}
