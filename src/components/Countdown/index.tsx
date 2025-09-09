import { useCountdown } from '@/hooks/useCountdown';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { HTMLAttributes } from 'react';

import styles from './styles.module.scss';

function Countdown({ date, ...props }: { date: string | Date } & HTMLAttributes<HTMLDivElement>) {
  const t = useTranslations('components/countdown');

  const [days, hours, minutes, seconds] = useCountdown(new Date(date));

  return (
    <section {...props} className={`${props.className} ${styles.countdown}`}>
      <div>
        <span>{days}</span>
        <span>{t('days')}</span>
      </div>
      <div className={styles.separator}>:</div>
      <div>
        <span>{hours}</span>
        <span>{t('hours')}</span>
      </div>
      <div className={styles.separator}>:</div>
      <div>
        <span>{minutes}</span>
        <span>{t('minutes')}</span>
      </div>
      <div className={styles.separator}>:</div>
      <div>
        <span>{seconds}</span>
        <span>{t('seconds')}</span>
      </div>
    </section>
  );
}

export default dynamic(() => Promise.resolve(Countdown), { ssr: false });
