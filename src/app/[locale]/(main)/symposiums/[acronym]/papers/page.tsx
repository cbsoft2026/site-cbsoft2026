import { Event } from '@/types/event';
import EventComponent from '@/components/Event';
import Title from '@/components/Title';
import { getTranslations } from 'next-intl/server';
import { mapToObject } from '@/utils/mapToObject';
import { loadEvents } from '@/lib/api';

type Props = {
  params: Promise<{ acronym: string; locale: string }>;
};

export default async function EventsPage({ params }: Props) {
  const { acronym, locale } = await params;

  const commonT = await getTranslations({ locale, namespace: 'common' });
  const t = await getTranslations({ locale, namespace: 'components/menu' });
  const symposiumsT = await getTranslations({ locale, namespace: 'pages/symposiums' });

  const events = mapToObject(loadEvents(locale));

  const filteredObj: Record<string, Event> = {};
  const filtered = Object.entries(events).filter(([, value]) => {
    return value.type === 'artigo' && value.simposio === acronym;
  });
  filtered.forEach((event) => {
    filteredObj[event[0]] = event[1];
  });

  if (!filteredObj) return;

  return (
    <>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`siglas.${acronym}`)} (${commonT(`${acronym}`)}) - ${t('artigos_aceitos')}`}></Title>
      </div>
      {Object.keys(events).length ? (
        <EventComponent events={events} locale={locale} />
      ) : (
        <div className='container'>
          <p>{symposiumsT('emptyPapers')}</p>
        </div>
      )}
    </>
  );
}
