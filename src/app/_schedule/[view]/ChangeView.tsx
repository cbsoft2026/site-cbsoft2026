'use client';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faListUl } from '@fortawesome/free-solid-svg-icons';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ChangeView() {
  const { view } = useParams();
  const searchParams = useSearchParams();

  return (
    <div className={styles['grouped-icons']}>
      <Link
        href={{ pathname: '/schedule/calender', query: searchParams.toString() }}
        className={view === 'calender' ? styles.active : ''}
      >
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faCalendarDays} />
        </div>
      </Link>
      <Link
        href={{ pathname: '/schedule/list', query: searchParams.toString() }}
        className={view === 'list' ? styles.active : ''}
      >
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faListUl} />
        </div>
      </Link>
    </div>
  );
}
