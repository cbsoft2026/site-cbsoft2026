import { Event } from '@/types/event';
import EventComponent from '@/components/Event';
import { useLocale } from 'next-intl';
import { loadEvents } from '@/lib/api';
import { mapToObject } from '@/utils/mapToObject';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function EventsPage({ searchParams }: Props) {
  const locale = useLocale();
  const id = searchParams.id as string;

  const events = mapToObject(loadEvents(locale));

  if (!events) return;

  const event: Event = events[id || ''];

  return (
    <div style={{ paddingTop: '50px' }}>
      <EventComponent events={events} event={event} locale={locale} />
    </div>
  );
}
