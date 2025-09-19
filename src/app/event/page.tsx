'use client';

import { useLocaleContext } from '@/providers/LocaleProvider';
import { Event } from '@/types/event';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import EventComponent from '@/components/Event';

export default function EventsPage() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<Record<string, Event>>();
  const { locale } = useLocaleContext();
  useEffect(() => {
    fetch(`/generated/events_${locale}.json`)
      .then((res) => res.json())
      .then((json) => setEvents(json));
  }, [setEvents, locale]);

  if (!events) return;

  const event: Event = events[searchParams.get('id') || ''];

  return (
    <div style={{ paddingTop: '50px' }}>
      <EventComponent events={events} event={event} />
    </div>
  );
}
