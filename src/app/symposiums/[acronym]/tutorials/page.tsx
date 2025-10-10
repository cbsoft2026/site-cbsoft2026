'use client';

import { useLocaleContext } from '@/providers/LocaleProvider';
import { Event } from '@/types/event';
import { useEffect, useState } from 'react';
import EventComponent from '@/components/Event';
import { useParams } from 'next/navigation';
import Title from '@/components/Title';
import { useTranslations } from 'next-intl';

export default function EventsPage() {
  const { acronym } = useParams();
  const [events, setEvents] = useState<Record<string, Event>>();
  const { locale } = useLocaleContext();
  const commonT = useTranslations('common');
  const t = useTranslations('components/menu');
  const symposiumsT = useTranslations('pages/symposiums');
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
      <div className='container' style={{ marginBottom: 56, paddingRight: 560 }}>
        <Title titulo={`${commonT(`siglas.${acronym}`)} (${commonT(`${acronym}`)}) - ${t('tutorial')}`}></Title>
      </div>
      {Object.keys(events).length > 0 ? (
        Object.keys(events).map((key) => (
          <div key={key} style={{ marginBottom: 56 }}>
            <EventComponent key={key} events={events} event={events[key]} />
          </div>
        ))
      ) : (
        <div className='container'>
          <p>{symposiumsT('emptyTutorial')}</p>
        </div>
      )}
    </>
  );
}
