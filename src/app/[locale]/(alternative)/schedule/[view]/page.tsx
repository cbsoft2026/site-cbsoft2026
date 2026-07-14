import styles from './styles.module.scss';
import { loadCommonEvents, loadEvents, EVENTS_LIST } from '@/lib/api';
import Content from './Content';
import { Suspense } from 'react';
import ScheduleWrapper from './ScheduleWrapper';

type Props = {
  params: Promise<{
    locale: string;
    view: string;
  }>;
};

export function generateStaticParams() {
  return [{ view: 'calender' }, { view: 'list' }];
}

export default async function SchedulePage({ params }: Props) {
  const { locale, view } = await params;

  const commonEvents = loadCommonEvents(locale);
  const events = loadEvents(locale);

  return (
    <section className={styles.schedule}>
      <Suspense
        fallback={
          <Content
            commonEvents={commonEvents}
            events={events}
            symposiums={EVENTS_LIST}
            locale={locale}
            view={view}
            date={undefined}
            loading={true}
          />
        }
      >
        <ScheduleWrapper
          commonEvents={commonEvents}
          events={events}
          symposiums={EVENTS_LIST}
          locale={locale}
          view={view}
        />
      </Suspense>
    </section>
  );
}
