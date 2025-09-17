import styles from './styles.module.scss';
import { loadCommonEvents, loadEvents, SIMPOSIOS } from '@/lib/api';
import Content from './Content';

export function generateStaticParams() {
  return [{ view: 'calender' }, { view: 'list' }];
}

export default async function SchedulePage() {
  const commonEvents = loadCommonEvents();
  const events = loadEvents();

  return (
    <section className={styles.schedule}>
      <Content commonEvents={commonEvents} events={events} symposiums={SIMPOSIOS} />
    </section>
  );
}
