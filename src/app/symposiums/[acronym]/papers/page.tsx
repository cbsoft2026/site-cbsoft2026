'use client';

import { useLocaleContext } from '@/providers/LocaleProvider';
import { Event } from '@/types/event';
import { useEffect, useState } from 'react';
import EventComponent from '@/components/Event';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Title from '@/components/Title';

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
          return value.type === 'artigo' && value.simposio === acronym;
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
        <Title titulo={`${commonT(`siglas.${acronym}`)} (${commonT(`${acronym}`)}) - ${t('artigos_aceitos')}`}></Title>
      </div>
      {Object.keys(events).length ? (
        <EventComponent events={events} />
      ) : (
        <div className='container'>
          <p>{symposiumsT('emptyPapers')}</p>
        </div>
      )}
    </>
  );
}
