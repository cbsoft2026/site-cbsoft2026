import CallComponent from '@/components/Call';
import Title from '@/components/Title';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ acronym: string; track: string; locale: string }>;
};

export default async function CallPage({ params }: Props) {
  const { acronym, track, locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  return (
    <>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`siglas.${acronym}`)} (${commonT(`${acronym}`)})`}></Title>
      </div>
      <div className='container'>
        <CallComponent acronym={acronym} track={track} locale={locale}></CallComponent>
      </div>
    </>
  );
}
