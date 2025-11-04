import CallComponent from '@/components/Call';
import Title from '@/components/Title';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('common');
  return {
    title: t('siglas.latam-school'),
    openGraph: {
      type: 'article',
      title: t('siglas.latam-school'),
    },
  };
}

export default async function CallPage() {
  const commonT = await getTranslations('common');
  return (
    <article style={{ padding: '30px 60px 0' }}>
      <header className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`siglas.latam-school`)}`}></Title>
      </header>
      <CallComponent className='container' acronym={'latam-school'}></CallComponent>
    </article>
  );
}
