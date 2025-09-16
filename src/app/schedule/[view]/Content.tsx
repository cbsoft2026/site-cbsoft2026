'use client';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import ChangeView from './ChangeView';
import Schedule from './Schedule';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Events, eventType as eventTypeConst } from '@/types/event';
import { Rooms } from '@/types/rooms';
import useEventFilter from '@/hooks/useEventFilter';
import useDayNavigation from '@/hooks/useDayNavigation';
import { useTranslations } from 'next-intl';
import useWindowDimensions from '@/hooks/useWindowDimentions';

type Props = {
  commonEvents: { salas: Rooms; startsInDate: string };
  events: Events;
};

const typeMapper = {
  artigo: 'Artigo',
  palestra: 'Palestra',
  chamada: 'Chamada',
  painel: 'Painel',
  tutorial: 'Tutorial',
  session: 'Sessão',
};

export default function SchedulePage({ commonEvents, events }: Props) {
  const t = useTranslations('pages/schedule');

  const { width } = useWindowDimensions();

  const [openAsideBar, setOpenAsideBar] = useState(width && width > 768);
  const toggleOpenAsideBar = useCallback(() => setOpenAsideBar((prev) => !prev), []);

  const [openFilter, setOpenFilter] = useState(true);
  const toggleOpenFilter = useCallback(() => setOpenFilter((prev) => !prev), []);

  const { eventType, toggleType, filteredEvents } = useEventFilter(events);
  const { startsIn, finishIn, formattedDateLocale, backParams, nextParams } = useDayNavigation(
    new Date(commonEvents.startsInDate),
  );

  return (
    <>
      {openAsideBar && (
        <aside>
          <header>
            <Link className={`${styles['aside-logo']}`} href={{ pathname: '/' }}>
              <picture>
                <img src='/images/logos/cbsoft-logo.svg' alt='logo' />
              </picture>
            </Link>
            {width && width <= 768 && (
              <div onClick={toggleOpenAsideBar} className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}>
                <FontAwesomeIcon icon={faClose} />
              </div>
            )}
          </header>
          <div className={styles['aside-filter']}>
            <div onClick={toggleOpenFilter} className={styles.collapser}>
              <h6>{t('filtros')}</h6>
              <div className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}>
                {openFilter ? (
                  <FontAwesomeIcon icon={faChevronDown} style={{ width: '8px' }} />
                ) : (
                  <FontAwesomeIcon icon={faChevronUp} style={{ width: '8px' }} />
                )}
              </div>
            </div>
            {openFilter && (
              <div>
                {eventTypeConst.map((type, index) =>
                  type != null && type !== 'info' ? (
                    <label key={`label-${index}`} className={styles['checkbox-control']}>
                      <input
                        type='checkbox'
                        value={type}
                        checked={eventType.includes(type)}
                        onChange={() => toggleType(type)}
                      />
                      {typeMapper[type]}
                    </label>
                  ) : (
                    ''
                  ),
                )}
              </div>
            )}
          </div>
        </aside>
      )}
      <main>
        <header>
          <div>
            <div onClick={toggleOpenAsideBar} className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <Link
              href={{ query: backParams.toString() }}
              className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}
            >
              <FontAwesomeIcon icon={faChevronLeft} width={8} style={{ width: '8px' }} />
            </Link>
            <Link
              href={{ query: nextParams.toString() }}
              className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}
            >
              <FontAwesomeIcon icon={faChevronRight} width={8} style={{ width: '8px' }} />
            </Link>
            <h5>{formattedDateLocale}</h5>
          </div>
          <div>{width && width > 768 && <ChangeView />}</div>
        </header>
        <div className={styles['grid-shedule__wrapper']}>
          <Schedule
            rooms={commonEvents.salas}
            events={filteredEvents}
            startsIn={startsIn.toUTCString()}
            finishIn={finishIn.toUTCString()}
          />
        </div>
      </main>
    </>
  );
}
