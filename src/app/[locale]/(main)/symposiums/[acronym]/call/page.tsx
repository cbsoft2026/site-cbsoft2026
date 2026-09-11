import { EventStructureType } from '@/app/config/event-structure';
import CallComponent from '@/components/Call';
import Heading from '@/components/Heading';
import { createPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ acronym: EventStructureType; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { acronym, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  const title = t(acronym);

  return createPageMetadata(title, [], params, import.meta.url);
}

export default async function CallPage({ params }: Props) {
  const { acronym, locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  return (
    <article style={{ padding: '30px 0 0' }} data-pagefind-body>
      <div className='container' style={{ marginBottom: 56 }}>
        <Heading as='title'>{`${commonT(`siglas.${acronym}`)} (${commonT(`${acronym}`)})`}</Heading>
      </div>
      <CallComponent className='container' acronym={acronym} locale={locale}></CallComponent>
    </article>
  );
}
