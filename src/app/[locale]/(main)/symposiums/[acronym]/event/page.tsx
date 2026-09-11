import { EventStructureType } from '@/app/config/event-structure';
import { getTranslations } from 'next-intl/server';
import EventsList, { getEvents } from '@/components/EventsList/EventsList';
import { createPageMetadata } from '@/lib/metadata';
import Heading from '@/components/Heading';

type Props = {
  params: Promise<{ acronym: EventStructureType; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { acronym, locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const menuT = await getTranslations({ locale, namespace: 'components/menu' });
  const title = `${commonT(acronym)} - ${menuT('events')}`;

  return createPageMetadata(title, [], params, import.meta.url);
}

export default async function EventsPage({ params }: Props) {
  const { acronym, locale } = await params;

  const commonT = await getTranslations({ locale, namespace: 'common' });
  const t = await getTranslations({ locale, namespace: 'components/menu' });
  const symposiumsT = await getTranslations({ locale, namespace: 'pages/symposiums' });

  const events = await getEvents(locale, (event) => event.simposio === acronym /*&& value.type != 'info'*/);

  const description = symposiumsT.has(`description.${acronym}`) ? symposiumsT(`description.${acronym}`) : undefined;

  return (
    <article style={{ padding: '30px 0 0' }}>
      <div className='container' style={{ marginBottom: 56 }}>
        <Heading as='title'>{`${commonT(`siglas.${acronym}`)} (${commonT(`${acronym}`)}) - ${t('events')}`}</Heading>
        {description && <p>{description}</p>}
      </div>
      <EventsList events={events} locale={locale} emptyMessage={symposiumsT('emptyEvents')} />
    </article>
  );
}
