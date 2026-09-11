import { getTranslations } from 'next-intl/server';
import CategoryEventsList, { getCategoryEvents } from '@/components/EventsList/CategoryEventsList';
import { createPageMetadata } from '@/lib/metadata';
import Heading from '@/components/Heading';

type Props = {
  params: Promise<{ acronym: string; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { acronym, locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const menuT = await getTranslations({ locale, namespace: 'components/menu' });
  const title = `${commonT(acronym)} - ${menuT('artigos_aceitos')}`;

  return createPageMetadata(title, [], params, import.meta.url);
}

export default async function PapersPage({ params }: Props) {
  const { acronym, locale } = await params;

  const t = await getTranslations({ locale, namespace: 'components/menu' });
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const symposiumsT = await getTranslations({ locale, namespace: 'pages/symposiums' });

  const events = await getCategoryEvents(locale, (event) => event.type === 'artigo' && event.simposio === acronym);

  return (
    <>
      <div className='container' style={{ marginBottom: 56 }}>
        <Heading as='title'>
          {`${commonT(`siglas.${acronym}`)} (${commonT(acronym)}) - ${t('artigos_aceitos')}`}
        </Heading>
      </div>

      <CategoryEventsList events={events} locale={locale} emptyMessage={symposiumsT('emptyPapers')} />
    </>
  );
}
