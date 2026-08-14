import EventComponent from '@/components/Event';
import { Event } from '@/types/event';
import { loadEvents } from '@/lib/api';
import { mapToObject } from '@/utils/mapToObject';

type Props = {
  events: Record<string, Event>;
  locale: string;
  emptyMessage: string;
};

export async function getEvents(locale: string, filter: (event: Event) => boolean) {
  const events = mapToObject(loadEvents(locale));

  return Object.entries(events)
    .filter(([, event]) => filter(event))
    .reduce<Record<string, Event>>((acc, [id, event]) => {
      acc[id] = {
        ...event,
      };

      return acc;
    }, {});
}

export default async function EventsList(props: Props) {
  const { events, locale, emptyMessage } = props;

  const filteredObj: Record<string, Event> = {};

  Object.entries(events)
    .sort((a, b) => {
      return new Date(a[1].schedule?.start ?? '').getTime() - new Date(b[1].schedule?.start ?? '').getTime();
    })
    .forEach((event) => {
      filteredObj[event[0]] = event[1];
    });

  const eventsObject = Object.keys(filteredObj);

  if (!eventsObject.length) {
    return (
      <div className='container'>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      {eventsObject.map((key) => {
        if (filteredObj[key].type != 'artigo') {
          return (
            <div key={key} id={filteredObj[key].id} style={{ marginBottom: 56 }}>
              <EventComponent key={key} events={filteredObj} event={filteredObj[key]} locale={locale} />
            </div>
          );
        }
      })}
    </>
  );
}
