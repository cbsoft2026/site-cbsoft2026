'use client';

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';

/**
 * @param datesStart YYYYMMDDToHHMMSSZ
 * @param dateEnd YYYYMMDDToHHMMSSZ
 */
type Props = {
  label?: string;
  text: string;
  description?: string;
  dateStart: Date;
  dateEnd: Date;
  location?: string;
  fullDay?: boolean;
  simplifiedMode?: boolean;
};

export function formatGoogleCalenderLocal(date: Date, fullDay: boolean) {
  const pad = (n: number) => String(n).padStart(2, '0');
  let dateFormatted = '';
  dateFormatted += date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate());
  if (!fullDay) {
    dateFormatted += 'T' + pad(date.getHours()) + pad(date.getMinutes()) + pad(date.getSeconds());
  }
  return dateFormatted;
}

export default function AddCalendar({
  label,
  text,
  description,
  dateStart,
  dateEnd,
  location,
  fullDay = false,
  simplifiedMode = false
}: Props) {
  const [openFilter, setOpenFilter] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const el = ref?.current;

      if (!el || el.contains(event.target as Node)) {
        setOpenFilter((prev) => !prev);
        return;
      }

      setOpenFilter(false);
    }

    window?.addEventListener('click', handleClick, { capture: true });
    return () => {
      window?.removeEventListener('click', handleClick, { capture: true });
    };
  }, [ref]);

  const dateStartConvert = new Date(dateStart.toDateString());
  const dateEndConvert = new Date(dateEnd.toDateString());

  const googleCalendar = new URLSearchParams({
    action: 'TEMPLATE',
    text: text,
    dates: `${formatGoogleCalenderLocal(dateStartConvert, fullDay)}/${formatGoogleCalenderLocal(dateEndConvert, fullDay)}`,
    sprop: `website:${process.env.NEXT_PUBLIC_SITE_URL}`,
    ctz: 'America/Sao_Paulo',
    trp: 'false',
  });
  if (description) googleCalendar.append('details', description);
  if (location) googleCalendar.append('location', location);

  const outlok365 = new URLSearchParams({
    rrv: 'addevent',
    startdt: dateStartConvert.toJSON(),
    enddt: dateEndConvert.toJSON(),
    subject: text,
  });
  if (description) outlok365.append('body', description);
  if (location) outlok365.append('location', location);

  return (
    <>
      <div className={`${styles['add-calender']} ${simplifiedMode ? styles['simplified'] : ""}`}>
        <div className={styles.collapser} ref={ref}>
          {
            simplifiedMode
              ? <p>{label}</p>
              : <h6>{label}</h6>
          }
          <div 
            className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}
          >
            {!openFilter ? (
              <FontAwesomeIcon icon={faChevronDown} style={{ width: '8px' }} />
            ) : (
              <FontAwesomeIcon icon={faChevronUp} style={{ width: '8px' }} />
            )}
          </div>
        </div>
        <div className={styles['items__wrapper']}>
          {openFilter && (
            <div className={styles['collapser__items']}>
              <a target='_blank' href={`http://www.google.com/calendar/event?${googleCalendar}`}>
                Google Calendar
              </a>
              <a target='_blank' href={`https://outlook.office.com/owa/?path=/calendar/action/compose&${outlok365}`}>
                Outlook 356
              </a>
              <a target='_blank' href={`https://outlook.live.com/owa/?path=/calendar/action/compose&${outlok365}`}>
                Outlook Live
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
