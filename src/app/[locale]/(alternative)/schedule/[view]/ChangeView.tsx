'use client';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faListUl } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'next/navigation';
import LinkLocale from '@/components/LinkLocale';
import { useLocale } from 'next-intl';

export default function ChangeView() {
  const { view, date } = useParams<{
    view: string;
    date: string;
  }>();

  const locale = useLocale();

  const query = date ? { date } : undefined;

  return (
    <div className={styles['grouped-icons']}>
      <LinkLocale
        href={{
          pathname: `/schedule/calendar`,
          ...(query && { query }),
        }}
        className={view === 'calendar' ? styles.active : ''}
        locale={locale}
      >
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faCalendarDays} />
        </div>
      </LinkLocale>

      <LinkLocale
        href={{
          pathname: `/schedule/list`,
          ...(query && { query }),
        }}
        className={view === 'list' ? styles.active : ''}
        locale={locale}
      >
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faListUl} />
        </div>
      </LinkLocale>
    </div>
  );
}
