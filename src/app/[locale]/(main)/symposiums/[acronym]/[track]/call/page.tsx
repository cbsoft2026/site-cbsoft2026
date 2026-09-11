import { EventStructureType } from '@/app/config/event-structure';
import CallComponent from '@/components/Call';
import Heading from '@/components/Heading';
import { createPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ acronym: EventStructureType; track: string; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { acronym, track, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  const title = t(`siglas.trilhas.${track}`);

  return createPageMetadata(title, [], params, import.meta.url);
}

export default async function CallPage({ params }: Props) {
  const { acronym, track, locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  return (
    <>
      <div className='container' style={{ marginBottom: 56 }} data-pagefind-body>
        <Heading as='title'>{commonT(`siglas.trilhas.${track}`)}</Heading>
      </div>
      <div className='container'>
        <CallComponent acronym={acronym} track={track} locale={locale}></CallComponent>
      </div>
    </>
  );
}
