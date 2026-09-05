import Title from '@/components/Title';
import { getTranslations } from 'next-intl/server';
import CategoryEventsList from '@/components/EventsList/CategoryEventsList';
import { createPageMetadata } from '@/lib/metadata';
import { loadEvents } from '@/lib/api';
import { mapToObject } from '@/utils/mapToObject';
import { Event } from '@/types/event';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const menuT = await getTranslations({ locale, namespace: 'components/menu' });
  const title = menuT('artigos_aceitos');

  return createPageMetadata(title);
}

const sortByTrack = (a: Event, b: Event) => {
  if (a.track == null && b.track != null) return 1;
  if (a.track != null && b.track == null) return -1;
  if (a.track == null && b.track == null) return 0;

  return String(a.track).localeCompare(String(b.track), undefined, { numeric: true });
};

const sortByCategory = (a: Event, b: Event) => {
  if (a.category == null && b.category != null) return 1;
  if (a.category != null && b.category == null) return -1;
  if (a.category == null && b.category == null) return 0;

  return String(a.category).localeCompare(String(b.category), undefined, { numeric: true });
};

export default async function PapersPage({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'components/menu' });
  const symposiumsT = await getTranslations({ locale, namespace: 'pages/symposiums' });

  const events = mapToObject(loadEvents(locale));

  const papers = Object.entries(events)
    .filter(([, event]) => event.type === 'artigo' && event.simposio != 'artifacts')
    .reduce<Record<string, Event>>((acc, [id, event]) => {
      acc[id] = {
        ...event,
      };

      return acc;
    }, {});

  return (
    <article style={{ padding: '30px 0 0' }}>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={t('artigos_aceitos')}></Title>
      </div>

      <CategoryEventsList
        events={papers}
        locale={locale}
        emptyMessage={symposiumsT('emptyPapers')}
        groupByCategory={false}
        sort={(a, b) => {
          return sortByTrack(a, b) || sortByCategory(a, b);
        }}
      />
    </article>
  );
}
