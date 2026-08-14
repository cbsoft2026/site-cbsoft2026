import { Event } from '@/types/event';
import EventComponent from '@/components/Event';
import { loadEvents } from '@/lib/api';
import { mapToObject } from '@/utils/mapToObject';
import { createPageMetadata } from '@/lib/metadata';
import { locales } from '@/app/config/locales';
import { EventStructureType, programs } from '@/app/config/event-structure';
import { getTranslations } from 'next-intl/server';
import Title from '@/components/Title';
import EventsList, { getEvents } from '@/components/EventsList/EventsList';

type Props = {
  params: Promise<{ program: EventStructureType; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { program, locale } = await params;
  return createPageMetadata(locale, 'common', program);
}

export async function generateStaticParams() {
  const params = locales.flatMap((locale) =>
    programs.map((program) => ({
      locale: locale,
      program: program.slug,
    })),
  );
  return params;
}

export default async function EventsPage({ params }: Props) {
  const { program, locale } = await params;

  const commonT = await getTranslations({ locale, namespace: 'common' });
  const t = await getTranslations({ locale, namespace: 'components/menu' });
  const symposiumsT = await getTranslations({ locale, namespace: 'pages/symposiums' });

  const events = await getEvents(locale, (event) => event.simposio === program);

  const description = symposiumsT.has(`description.${program}`) ? symposiumsT(`description.${program}`) : undefined;

  return (
    <article style={{ padding: '30px 0 0' }}>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(program)} - ${t('events')}`}></Title>
        {description && <p>{description}</p>}
      </div>
      <EventsList events={events} locale={locale} emptyMessage={symposiumsT('emptyEvents')} />
    </article>
  );
}
