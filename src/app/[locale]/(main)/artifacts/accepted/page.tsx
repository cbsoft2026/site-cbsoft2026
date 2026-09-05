import Title from '@/components/Title';
import { getTranslations } from 'next-intl/server';
import { Event } from '@/types/event';
import CategoryEventsList from '@/components/EventsList/CategoryEventsList';
import { createPageMetadata } from '@/lib/metadata';
import { mapToObject } from '@/utils/mapToObject';
import { loadEvents } from '@/lib/api';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const program = 'artifacts';
  const { locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const menuT = await getTranslations({ locale, namespace: 'components/menu' });
  const title = `${commonT(program)} - ${menuT('artigos_aceitos')}`;

  return createPageMetadata(title);
}

export default async function PapersPage({ params }: Props) {
  const program = 'artifacts';
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'components/menu' });
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const symposiumsT = await getTranslations({ locale, namespace: 'pages/symposiums' });

  const events = mapToObject(loadEvents(locale));
  const filteredEvents = Object.entries(events)
    .filter(([, event]) => {
      return event.type === 'artigo' && event.simposio != program && (event.badges || []).length > 0;
    })
    .reduce<Record<string, Event>>((acc, [id, event]) => {
      acc[id] = {
        ...event,
        track: null,
        category: undefined,
        schedule: undefined,
      };

      return acc;
    }, {});

  return (
    <article style={{ padding: '30px 0 0' }}>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`siglas.${program}`)} - ${t('artefatos_aceitos')}`}></Title>
      </div>

      <CategoryEventsList events={filteredEvents} locale={locale} emptyMessage={symposiumsT('emptyPapers')} />
    </article>
  );
}
