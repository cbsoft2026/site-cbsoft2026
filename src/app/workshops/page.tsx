import CallComponent from '@/components/Call';
import Title from '@/components/Title';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('common');
  return {
    title: t('siglas.workshops'),
    openGraph: {
      type: 'article',
      title: t('siglas.workshops'),
    },
  };
}

export default async function CallPage() {
  const commonT = await getTranslations('common');
  return (
    <article style={{ padding: '30px 60px 0' }}>
      <header className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`siglas.workshops`)}`}></Title>
      </header>
      <CallComponent className='container' acronym={'workshops'}></CallComponent>
    </article>
  );
}
