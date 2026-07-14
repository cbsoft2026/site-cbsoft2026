import { Event } from '@/types/event';
import EventComponent from '@/components/Event';
import { useLocale } from 'next-intl';
import { loadEvents } from '@/lib/api';
import { mapToObject } from '@/utils/mapToObject';
import { createPageMetadata } from '@/lib/metadata';
import { locales } from '@/app/config/locales';
import { EventStructureType, programs } from '@/app/config/event-structure';
import { getTranslations } from 'next-intl/server';
import Title from '@/components/Title';

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

  const events = mapToObject(loadEvents(locale));

  if (!events) return;

  const commonT = await getTranslations({ locale, namespace: 'common' });
  const t = await getTranslations({ locale, namespace: 'components/menu' });
  const symposiumsT = await getTranslations({ locale, namespace: 'pages/symposiums' });

  const filteredObj: Record<string, Event> = {};
  const filtered = Object.entries(events).filter(([, value]) => {
    return value.simposio === program && value.type != 'info';
  });
  filtered
    .sort((a, b) => {
      return new Date(a[1].schedule?.start ?? '').getTime() - new Date(b[1].schedule?.start ?? '').getTime();
    })
    .forEach((event) => {
      filteredObj[event[0]] = event[1];
    });

  if (!filteredObj) return;

  return (
    <article style={{ padding: '30px 0 0' }}>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(program)} - ${t('events')}`}></Title>
      </div>
      {Object.keys(filteredObj).length > 0 ? (
        Object.keys(filteredObj).map((key) => (
          <div key={key} id={filteredObj[key].id} style={{ marginBottom: 56 }}>
            <EventComponent key={key} events={filteredObj} event={filteredObj[key]} locale={locale} />
          </div>
        ))
      ) : (
        <div className='container'>
          <p>{symposiumsT('emptyEvents')}</p>
        </div>
      )}
    </article>
  );
}
