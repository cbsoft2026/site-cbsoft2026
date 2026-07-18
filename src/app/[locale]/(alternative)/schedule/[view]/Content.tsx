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
import Image from 'next/image';
import ChangeView from './ChangeView';
import Schedule from './Schedule';
import { useCallback, useEffect, useState } from 'react';
import { Event } from '@/types/event';
import { Rooms } from '@/types/rooms';
import useEventFilter from '@/hooks/useEventFilter';
import { useTranslations } from 'next-intl';
import useWindowDimensions from '@/hooks/useWindowDimentions';
import LinkLocale from '@/components/LinkLocale';
import useDayNavigation from '@/hooks/useDayNavigation';
import { formatDate } from '@/utils/dates';

type Props = {
  commonEvents: { salas: Rooms; startsInDate: string };
  events: Map<string, Event>;
  symposiums: readonly string[];
  locale: string;
  view: string;
  date?: string;
  loading?: boolean;
};

export default function Content({ loading = false, ...props }: Props) {
  const { commonEvents, events, symposiums, locale, view, date } = props;
  const { startsIn, finishIn, formattedDateLocale, backDate, nextDate } = useDayNavigation(
    new Date(commonEvents.startsInDate),
    locale,
    date ?? undefined,
  );

  const t = useTranslations('pages/schedule');
  const commonT = useTranslations('common');

  const [typeView, setTypeView] = useState('day');

  const { width } = useWindowDimensions();

  const [openAsideBar, setOpenAsideBar] = useState<boolean | null>(null);
  useEffect(() => {
    setOpenAsideBar(width != null && width > 768);
  }, [width]);
  const toggleOpenAsideBar = useCallback(() => setOpenAsideBar((prev) => !prev), []);

  const [openSymposiums, setOpenSymposiums] = useState(true);
  const toggleOpenSymposiums = useCallback(() => setOpenSymposiums((prev) => !prev), []);

  const { eventType, toggleType, eventSymposiums, toggleSymposiums, filteredEvents } = useEventFilter(
    events,
    symposiums,
  );

  const lastUpdate = new Date(process.env.NEXT_PUBLIC_GIT_COMMIT_DATE_SCHEDULE!);

  return (
    <>
      <aside
        className={styles.aside}
        {...(openAsideBar !== null
          ? {
              style: {
                '--aside-display': openAsideBar ? 'flex' : 'none',
              } as React.CSSProperties,
            }
          : {})}
      >
        <div>
          <header>
            <LinkLocale className={`${styles['aside-logo']}`} href={{ pathname: '/' }} locale={locale}>
              <picture>
                <Image
                  src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/logos/cbsoft-logo.svg`}
                  alt='logo'
                  width={210}
                  height={47}
                  priority
                />
              </picture>
            </LinkLocale>
            {width && width <= 768 && (
              <div onClick={toggleOpenAsideBar} className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}>
                <FontAwesomeIcon icon={faClose} />
              </div>
            )}
          </header>
          <p>{t('wip')}</p>
          <div className={styles['aside-filter']}>
            <div onClick={toggleOpenSymposiums} className={styles.collapser}>
              <h6>{t('simposiosetrilha')}</h6>
              <div className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}>
                {openSymposiums ? (
                  <FontAwesomeIcon icon={faChevronDown} style={{ width: '8px' }} />
                ) : (
                  <FontAwesomeIcon icon={faChevronUp} style={{ width: '8px' }} />
                )}
              </div>
            </div>
            {openSymposiums && (
              <div className={styles['collapser__items']}>
                {symposiums.map((symposium, index) =>
                  symposium != null ? (
                    <label key={`label-${index}`} className={styles['checkbox-control']}>
                      <input
                        type='checkbox'
                        value={symposium}
                        checked={eventSymposiums.includes(symposium)}
                        onChange={() => toggleSymposiums(symposium)}
                      />
                      {commonT.has(symposium) ? commonT(symposium) : symposium.toUpperCase()}
                    </label>
                  ) : (
                    ''
                  ),
                )}
              </div>
            )}
          </div>
        </div>
        <div>
          <p>
            <small>{t('brasiliaTime')}</small>
          </p>

          <p>
            <small>
              {t('lastUpdate')}:{' '}
              {formatDate(lastUpdate, locale, {
                month: 'short',
                day: '2-digit',
              })}
            </small>
          </p>
        </div>
      </aside>
      <main>
        <header>
          <div>
            <div
              onClick={toggleOpenAsideBar}
              className={`${styles.icon} ${styles.less} ${styles['icon--small']} ${
                openAsideBar !== null ? (openAsideBar ? styles.open : styles.closed) : ''
              }`}
            >
              <FontAwesomeIcon icon={faClose} className={styles.closeIcon} />
              <FontAwesomeIcon icon={faBars} className={styles.barsIcon} />
            </div>
            {typeView === 'day' && (
              <>
                <LinkLocale
                  href={{
                    pathname: `/schedule/${view}`,
                    query: {
                      date: backDate,
                    },
                  }}
                  className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}
                  locale={locale}
                >
                  <FontAwesomeIcon icon={faChevronLeft} width={8} style={{ width: '8px' }} />
                </LinkLocale>
                <LinkLocale
                  href={{
                    pathname: `/schedule/${view}`,
                    query: {
                      date: nextDate,
                    },
                  }}
                  className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}
                  locale={locale}
                >
                  <FontAwesomeIcon icon={faChevronRight} width={8} style={{ width: '8px' }} />
                </LinkLocale>
                {!loading ? (
                  <h5>{formattedDateLocale}</h5>
                ) : (
                  <div className={`${styles.skeleton} ${styles.lineShort}`} />
                )}
              </>
            )}
          </div>

          <div>
            {(view === 'list' || (width && width < 768)) && (
              <select className={styles.select} onChange={(value) => setTypeView(value.target.value)}>
                <option value='day'>{t('dia')}</option>
                <option value='complete'>{t('completo')}</option>
              </select>
            )}
            <ChangeView />
          </div>
        </header>
        <div className={styles['grid-shedule__wrapper']}>
          {!loading ? (
            <Schedule
              rooms={commonEvents.salas}
              events={filteredEvents}
              startsIn={startsIn.toUTCString()}
              finishIn={finishIn.toUTCString()}
              typeView={typeView}
              view={view}
            />
          ) : (
            <Schedule
              rooms={commonEvents.salas}
              events={filteredEvents}
              // random date, fallback
              startsIn={new Date('1999-10-10').toUTCString()}
              finishIn={new Date('1999-10-10').toUTCString()}
              typeView={typeView}
              view={view}
            />
          )}
        </div>
      </main>
    </>
  );
}
