import styles from './styles.module.scss';
import { loadCommonEvents, loadEvents, EVENTS_LIST } from '@/lib/api';
import Content from './Content';

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ view: 'calender' }, { view: 'list' }];
}

export default async function SchedulePage({ params }: Props) {
  const { locale } = await params;

  const commonEvents = loadCommonEvents(locale);
  const events = loadEvents(locale);

  return (
    <section className={styles.schedule}>
      <Content commonEvents={commonEvents} events={events} symposiums={EVENTS_LIST} />
    </section>
  );
}
