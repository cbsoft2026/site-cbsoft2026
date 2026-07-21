import { Event } from '@/types/event';
import EventComponent from '@/components/Event';
import Title from '@/components/Title';
import { getTranslations } from 'next-intl/server';
import { mapToObject } from '@/utils/mapToObject';
import { loadEvents } from '@/lib/api';

type Props = {
  params: Promise<{ acronym: string; track: string; locale: string }>;
};

export default async function EventsPage({ params }: Props) {
  const { acronym, track, locale } = await params;

  const commonT = await getTranslations({ locale, namespace: 'common' });
  const t = await getTranslations({ locale, namespace: 'components/menu' });
  const symposiumsT = await getTranslations({ locale, namespace: 'pages/symposiums' });

  const events = mapToObject(loadEvents(locale));

  const filteredObj: Record<string, Event> = {};
  const filtered = Object.entries(events).filter(([, value]) => {
    // NOTE: only in track
    return value.type === 'artigo' && value.simposio === acronym && value.track === track;
  });
  filtered.forEach((event) => {
    // NOTE: only in track
    event[1].track = null;
    filteredObj[event[0]] = event[1];
  });

  if (!filteredObj) return;

  type Item = (typeof filteredObj)[keyof typeof filteredObj];

  const DEFAULT_CATEGORY = '__uncategorized__';

  const grouped = Object.entries(filteredObj).reduce<Record<string, Record<string, Item>>>((acc, [id, item]) => {
    const key = item.category ?? DEFAULT_CATEGORY;

    (acc[key] ??= {})[id] = item;

    return acc;
  }, {});

  const orderedCategories = Object.keys(grouped).sort((a, b) => {
    if (a === DEFAULT_CATEGORY) return -1;
    if (b === DEFAULT_CATEGORY) return 1;
    return a.localeCompare(b);
  });

  return (
    <>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`siglas.${acronym}`)} (${commonT(`${acronym}`)})`}></Title>
      </div>
      <div className='container'>
        <h1>{t('artigos_aceitos')}</h1>
      </div>
      {Object.keys(filteredObj).length ? (
        orderedCategories.map((category) => {
          return (
            <>
              <div className='container'>
                {category != DEFAULT_CATEGORY && (
                  <h4>{category.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}</h4>
                )}
              </div>
              <EventComponent events={grouped[category]} locale={locale} />
            </>
          );
        })
      ) : (
        <div className='container'>
          <p>{symposiumsT('emptyPapers')}</p>
        </div>
      )}
    </>
  );
}
