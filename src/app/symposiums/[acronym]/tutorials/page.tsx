'use client';

import { useLocaleContext } from '@/providers/LocaleProvider';
import { Event } from '@/types/event';
import { useEffect, useState } from 'react';
import EventComponent from '@/components/Event';
import { useParams } from 'next/navigation';

export default function EventsPage() {
  const { acronym } = useParams();
  const [events, setEvents] = useState<Record<string, Event>>();
  const { locale } = useLocaleContext();
  useEffect(() => {
    fetch(`/generated/events_${locale}.json`)
      .then((res) => res.json())
      .then((json: Record<string, Event>) => {
        const filteredObj: Record<string, Event> = {};
        const filtered = Object.entries(json).filter(([key, value]) => {
          return value.type === 'tutorial' && value.simposio === acronym;
        });
        filtered.forEach((event) => {
          filteredObj[event[0]] = event[1];
        });
        setEvents(filteredObj);
      });
  }, [setEvents, locale, acronym]);

  if (!events) return;

  return (
    <>
      {Object.keys(events).map((key) => (
        <div key={key} style={{ marginBottom: 56 }}>
          <EventComponent key={key} events={events} event={events[key]} />
        </div>
      ))}
    </>
  );
}
