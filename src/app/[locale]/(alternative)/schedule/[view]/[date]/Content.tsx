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
import { useCallback, useEffect, useState } from 'react';
import { Event, eventType as eventTypeConst } from '@/types/event';
import { Rooms } from '@/types/rooms';
import useEventFilter from '@/hooks/useEventFilter';
import useDayNavigation from '@/hooks/useDayNavigation';
import { useTranslations } from 'next-intl';
import useWindowDimensions from '@/hooks/useWindowDimentions';
import LinkLocale from '@/components/LinkLocale';

type Props = {
  commonEvents: { salas: Rooms; startsInDate: string };
  events: Map<string, Event>;
  symposiums: readonly string[];
  locale: string;
  view: string;
  date?: string;
};

export default function SchedulePage(props: Props) {
  const { commonEvents, events, symposiums, locale, view, date } = props;

  const t = useTranslations('pages/schedule');
  const commonT = useTranslations('common');

  const [typeView, setTypeView] = useState('day');

  const { width } = useWindowDimensions();

  const [openAsideBar, setOpenAsideBar] = useState<boolean | null>(null);
  useEffect(() => {
    setOpenAsideBar(width != null && width > 768);
  }, [width]);
  const toggleOpenAsideBar = useCallback(() => setOpenAsideBar((prev) => !prev), []);

  const [openFilter, setOpenFilter] = useState(true);
  const toggleOpenFilter = useCallback(() => setOpenFilter((prev) => !prev), []);

  const [openSymposiums, setOpenSymposiums] = useState(true);
  const toggleOpenSymposiums = useCallback(() => setOpenSymposiums((prev) => !prev), []);

  const { eventType, toggleType, eventSymposiums, toggleSymposiums, filteredEvents } = useEventFilter(
    events,
    symposiums,
  );

  const { startsIn, finishIn, formattedDateLocale, backDate, nextDate } = useDayNavigation(
    new Date(commonEvents.startsInDate),
    locale,
    date,
  );

  return (
    <>
      <aside
        className={styles.aside}
        {...(openAsideBar !== null
          ? {
              style: {
                '--aside-display': openAsideBar ? 'block' : 'none',
              } as React.CSSProperties,
            }
          : {})}
      >
        <header>
          <LinkLocale className={`${styles['aside-logo']}`} href={{ pathname: '/' }} locale={locale}>
            <picture>
              <img src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/logos/cbsoft-logo.svg`} alt='logo' />
            </picture>
          </LinkLocale>
          {width && width <= 768 && (
            <div onClick={toggleOpenAsideBar} className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}>
              <FontAwesomeIcon icon={faClose} />
            </div>
          )}
        </header>
        <p>A programação ainda está sendo organizada e poderá sofrer alterações até a realização do evento.</p>
        <div className={styles['aside-filter']}>
          {/* <div onClick={toggleOpenFilter} className={styles.collapser}>
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
            <div className={styles['collapser__items']}>
              {eventTypeConst.map((type, index) =>
                type != null ? (
                  <label key={`label-${index}`} className={styles['checkbox-control']}>
                    <input
                      type='checkbox'
                      value={type}
                      checked={eventType.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    {commonT.has(`eventos.${type}`) ? commonT(`eventos.${type}`) : type}
                  </label>
                ) : (
                  ''
                ),
              )}
            </div>
          )} */}
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
      </aside>
      <main>
        <header>
          <div>
            <div onClick={toggleOpenAsideBar} className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}>
              <FontAwesomeIcon icon={openAsideBar ? faClose : faBars} />
            </div>
            {typeView === 'day' && (
              <>
                <LinkLocale
                  href={{
                    pathname: `/schedule/${view}/${backDate}`,
                  }}
                  className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}
                  locale={locale}
                >
                  <FontAwesomeIcon icon={faChevronLeft} width={8} style={{ width: '8px' }} />
                </LinkLocale>
                <LinkLocale
                  href={{
                    pathname: `/schedule/${view}/${nextDate}`,
                  }}
                  className={`${styles.icon} ${styles.less} ${styles['icon--small']}`}
                  locale={locale}
                >
                  <FontAwesomeIcon icon={faChevronRight} width={8} style={{ width: '8px' }} />
                </LinkLocale>
                <h5>{formattedDateLocale}</h5>
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
          <Schedule
            rooms={commonEvents.salas}
            events={filteredEvents}
            startsIn={startsIn.toUTCString()}
            finishIn={finishIn.toUTCString()}
            typeView={typeView}
            view={view}
          />
        </div>
      </main>
    </>
  );
}
