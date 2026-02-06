import CallComponent from '@/components/Call';
import Title from '@/components/Title';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ acronym: string; locale: string }>;
};

export default async function CallPage({ params }: Props) {
  const { acronym, locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  return (
    <article style={{ padding: '30px 0 0' }}>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`siglas.${acronym}`)} (${commonT(`${acronym}`)})`}></Title>
      </div>
      <CallComponent className='container' acronym={acronym} locale={locale}></CallComponent>
    </article>
  );
}
