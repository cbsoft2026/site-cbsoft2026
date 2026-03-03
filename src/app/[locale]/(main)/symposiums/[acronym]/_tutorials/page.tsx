import { Event } from '@/types/event';
import EventComponent from '@/components/Event';
import Title from '@/components/Title';
import { getTranslations } from 'next-intl/server';
import { loadEvents } from '@/lib/api';
import { mapToObject } from '@/utils/mapToObject';

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
    return value.type === 'tutorial' && value.simposio === acronym;
  });
  filtered.forEach((event) => {
    filteredObj[event[0]] = event[1];
  });

  if (!filteredObj) return;

  return (
    <>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`siglas.${acronym}`)} (${commonT(`${acronym}`)}) - ${t('tutorial')}`}></Title>
      </div>
      {Object.keys(filteredObj).length > 0 ? (
        Object.keys(filteredObj).map((key) => (
          <div key={key} style={{ marginBottom: 56 }}>
            <EventComponent key={key} events={filteredObj} event={filteredObj[key]} locale={locale} />
          </div>
        ))
      ) : (
        <div className='container'>
          <p>{symposiumsT('emptyTutorial')}</p>
        </div>
      )}
    </>
  );
}
