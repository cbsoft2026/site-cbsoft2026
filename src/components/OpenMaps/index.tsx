'use client';

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';

type Props = {
  label?: React.ReactNode;
  latitude: number;
  longitude: number;
};

export default function OpenMaps({ label, latitude, longitude }: Props) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const el = ref.current;

      if (!el || el.contains(event.target as Node)) {
        return;
      }

      setOpen(false);
    }

    window.addEventListener('click', handleClick, { capture: true });

    return () => {
      window.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);

  const googleMaps = new URLSearchParams({
    api: '1',
    query: `${latitude},${longitude}`,
  });

  const openStreetMap = new URLSearchParams({
    mlat: String(latitude),
    mlon: String(longitude),
  });

  return (
    <div className={styles['add-calendar']}>
      <div className={styles.collapser} ref={ref} onClick={() => setOpen((previous) => !previous)}>
        <h6>{label}</h6>

        <div className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}>
          <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} style={{ width: '8px' }} />
        </div>
      </div>

      <div className={styles['items__wrapper']}>
        {open && (
          <div className={styles['collapser__items']}>
            <a target='_blank' rel='noopener noreferrer' href={`https://www.google.com/maps/search/?${googleMaps}`}>
              Google Maps
            </a>

            <a
              target='_blank'
              rel='noopener noreferrer'
              href={`https://www.openstreetmap.org/?${openStreetMap}#map=19/${latitude}/${longitude}`}
            >
              OpenStreetMap
            </a>

            <a
              target='_blank'
              rel='noopener noreferrer'
              href={`https://www.bing.com/maps?cp=${latitude}~${longitude}&lvl=19`}
            >
              Bing Maps
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
