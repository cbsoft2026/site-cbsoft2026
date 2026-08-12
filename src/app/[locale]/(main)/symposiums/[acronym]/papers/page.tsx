import Title from '@/components/Title';
import { getTranslations } from 'next-intl/server';
import EventsList, { getEvents } from '@/components/EventsList/EventsList';

type Props = {
  params: Promise<{ acronym: string; locale: string }>;
};

export default async function PapersPage({ params }: Props) {
  const { acronym, locale } = await params;

  const t = await getTranslations({ locale, namespace: 'components/menu' });
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const symposiumsT = await getTranslations({ locale, namespace: 'pages/symposiums' });

  const events = await getEvents(locale, (event) => event.type === 'artigo' && event.simposio === acronym);

  return (
    <>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`siglas.${acronym}`)} (${commonT(acronym)}) - ${t('artigos_aceitos')}`}></Title>
      </div>

      <EventsList events={events} locale={locale} emptyMessage={symposiumsT('emptyPapers')} />
    </>
  );
}
