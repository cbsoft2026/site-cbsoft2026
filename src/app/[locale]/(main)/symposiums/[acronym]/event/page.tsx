import { Event } from '@/types/event';
import EventComponent from '@/components/Event';
import { loadEvents } from '@/lib/api';
import { mapToObject } from '@/utils/mapToObject';
import { createPageMetadata } from '@/lib/metadata';
import { locales } from '@/app/config/locales';
import { EventStructureType, symposiums } from '@/app/config/event-structure';
import { getTranslations } from 'next-intl/server';
import Title from '@/components/Title';
import EventsList, { getEvents } from '@/components/EventsList/EventsList';

type Props = {
  params: Promise<{ acronym: EventStructureType; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { acronym, locale } = await params;
  return createPageMetadata(locale, 'common', acronym);
}

export async function generateStaticParams() {
  const params = locales.flatMap((locale) =>
    symposiums.map((acronym) => ({
      locale: locale,
      program: acronym,
    })),
  );
  return params;
}

export default async function EventsPage({ params }: Props) {
  const { acronym, locale } = await params;

  const commonT = await getTranslations({ locale, namespace: 'common' });
  const t = await getTranslations({ locale, namespace: 'components/menu' });
  const symposiumsT = await getTranslations({ locale, namespace: 'pages/symposiums' });

  const events = await getEvents(locale, (event) => event.simposio === acronym /*&& value.type != 'info'*/);

  return (
    <article style={{ padding: '30px 0 0' }}>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`siglas.${acronym}`)} (${commonT(`${acronym}`)}) - ${t('events')}`}></Title>
      </div>
      <EventsList events={events} locale={locale} emptyMessage={symposiumsT('emptyEvents')} />
    </article>
  );
}
