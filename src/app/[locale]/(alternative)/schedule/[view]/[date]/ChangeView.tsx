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

  return (
    <div className={styles['grouped-icons']}>
      <LinkLocale
        href={{
          pathname: `/schedule/calender/${date}`,
        }}
        className={view === 'calender' ? styles.active : ''}
        locale={locale}
      >
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faCalendarDays} />
        </div>
      </LinkLocale>

      <LinkLocale
        href={{
          pathname: `/schedule/list/${date}`,
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
