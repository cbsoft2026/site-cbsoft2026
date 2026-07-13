import styles from './styles.module.scss';
import { loadCommonEvents, loadEvents, EVENTS_LIST } from '@/lib/api';
import Content from './Content';

type Props = {
  params: Promise<{
    locale: string;
    view: string;
    date?: string;
  }>;
};

export function generateStaticParams() {
  const dates = new Set<string>();

  const events = loadEvents();
  events.forEach((event) => {
    if (!event.schedule?.start) return;

    const date = new Date(event.schedule.start);

    if (!isNaN(date.getTime())) {
      dates.add(date.toISOString().slice(0, 10));
    }
  });

  return ['calender', 'list'].flatMap((view) =>
    Array.from(dates)
      .sort()
      .map((date) => ({
        view,
        date,
      })),
  );
}

export default async function SchedulePage({ params }: Props) {
  const { locale, view, date } = await params;

  const commonEvents = loadCommonEvents(locale);
  const events = loadEvents(locale);

  return (
    <section className={styles.schedule}>
      <Content
        commonEvents={commonEvents}
        events={events}
        symposiums={EVENTS_LIST}
        locale={locale}
        view={view}
        date={date}
      />
    </section>
  );
}
