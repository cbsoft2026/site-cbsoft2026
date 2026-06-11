import CallComponent from '@/components/Call';
import Title from '@/components/Title';
import { createPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, 'pages/cbsoft/volunteers', 'titulo');
}

export default async function CallPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/volunteers' });
  return (
    <article style={{ padding: '30px 0 0' }}>
      <header className='container' style={{ marginBottom: 56 }}>
        <Title titulo={t('titulo')}></Title>
      </header>
      <CallComponent className='container' acronym={'volunteers'} locale={locale}></CallComponent>
    </article>
  );
}
