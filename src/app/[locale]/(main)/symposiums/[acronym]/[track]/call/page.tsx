import { EventStructureType } from '@/app/config/event-structure';
import CallComponent from '@/components/Call';
import Title from '@/components/Title';
import { createPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ acronym: EventStructureType; track: string; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { acronym, track, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  const title = t(`siglas.trilhas.${track}`);

  return createPageMetadata(title);
}

export default async function CallPage({ params }: Props) {
  const { acronym, track, locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  return (
    <>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`siglas.trilhas.${track}`)}`}></Title>
      </div>
      <div className='container'>
        <CallComponent acronym={acronym} track={track} locale={locale}></CallComponent>
      </div>
    </>
  );
}
