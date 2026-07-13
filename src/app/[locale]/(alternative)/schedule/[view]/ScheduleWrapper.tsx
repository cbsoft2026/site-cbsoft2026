'use client';

import { useSearchParams } from 'next/navigation';
import useDayNavigation from '@/hooks/useDayNavigation';
import { Rooms } from '@/types/rooms';
import Content from './Content';
import { Event } from '@/types/event';

type Props = {
  commonEvents: { salas: Rooms; startsInDate: string };
  events: Map<string, Event>;
  symposiums: readonly string[];
  locale: string;
  view: string;
  date?: string;
};

export default function ScheduleWrapper(props: Props) {
  const searchParams = useSearchParams();

  const { commonEvents, events, symposiums, locale, view } = props;

  const date = searchParams.get('date') ?? undefined;

  return (
    <Content
      commonEvents={commonEvents}
      events={events}
      symposiums={symposiums}
      locale={locale}
      view={view}
      date={date}
    />
  );
}
