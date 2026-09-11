import { createPageMetadata } from '@/lib/metadata';
import { locales } from '@/app/config/locales';
import { EventStructureType, programs } from '@/app/config/event-structure';
import { getTranslations } from 'next-intl/server';
import EventsList, { getEvents } from '@/components/EventsList/EventsList';
import Heading from '@/components/Heading';

type Props = {
  params: Promise<{ program: EventStructureType; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { program, locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const menuT = await getTranslations({ locale, namespace: 'components/menu' });
  const title = `${commonT(program)} - ${menuT('events')}`;

  return createPageMetadata(title, [], params, import.meta.url);
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
        <Heading as='title'>{`${commonT(`siglas.${program}`)} - ${t('events')}`}</Heading>
        {description && <p data-pagefind-body>{description}</p>}
      </div>
      <EventsList events={events} locale={locale} emptyMessage={symposiumsT('emptyEvents')} />
    </article>
  );
}
