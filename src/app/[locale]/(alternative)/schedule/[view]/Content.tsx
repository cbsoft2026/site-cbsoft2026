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
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';
import { Event, EventType } from '@/types/event';
import { Rooms } from '@/types/rooms';
import useEventFilter, { EventFilter } from '@/hooks/useEventFilter';
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

function FilterCheckBox(
  index: number,
  value: string,
  label: string,
  checked: boolean,
  onChange: ChangeEventHandler<HTMLInputElement>,
) {
  return (
    <label key={`label-${index}`} className={styles['checkbox-control']}>
      <input type='checkbox' value={value} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

type PropsFilter = {
  filters: readonly string[];
  toggleFilter: (type: string) => void;
  eventFilters: string[];
};

function Filter(props: PropsFilter) {
  const { filters, toggleFilter, eventFilters } = props;

  const t = useTranslations('pages/schedule');
  const commonT = useTranslations('common');

  const [openFilter, setOpenFilter] = useState(true);
  const toggleOpenFilter = useCallback(() => setOpenFilter((prev) => !prev), []);

  return (
    <>
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
        <div className={styles['collapser__items']}>
          {filters.map((filter, index) =>
            filter != null
              ? FilterCheckBox(
                  index,
                  filter,
                  commonT.has(filter) ? commonT(filter) : filter.toUpperCase(),
                  eventFilters.includes(filter),
                  () => toggleFilter(filter),
                )
              : '',
          )}
        </div>
      )}
    </>
  );
}

type PropsSymposiumsFilter = {
  symposiums: readonly string[];
  toggleSymposiums: (symposiums: string) => void;
  eventSymposiums: string[];
};

function SymposiumsFilter(props: PropsSymposiumsFilter) {
  const { symposiums, toggleSymposiums, eventSymposiums } = props;

  const t = useTranslations('pages/schedule');
  const commonT = useTranslations('common');

  const [openSymposiums, setOpenSymposiums] = useState(true);
  const toggleOpenSymposiums = useCallback(() => setOpenSymposiums((prev) => !prev), []);

  return (
    <>
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
            symposium != null
              ? FilterCheckBox(
                  index,
                  symposium,
                  commonT.has(symposium) ? commonT(symposium) : symposium.toUpperCase(),
                  eventSymposiums.includes(symposium),
                  () => toggleSymposiums(symposium),
                )
              : '',
          )}
        </div>
      )}
    </>
  );
}

export default function Content({ loading = false, ...props }: Props) {
  const { commonEvents, events, symposiums, locale, view, date } = props;
  const { startsIn, finishIn, formattedDateLocale, backDate, nextDate } = useDayNavigation(
    new Date(commonEvents.startsInDate),
    locale,
    date ?? undefined,
  );

  const t = useTranslations('pages/schedule');

  const [typeView, setTypeView] = useState('day');

  const { width } = useWindowDimensions();

  const [openAsideBar, setOpenAsideBar] = useState<boolean | null>(null);
  useEffect(() => {
    setOpenAsideBar(width != null && width > 768);
  }, [width]);
  const toggleOpenAsideBar = useCallback(() => setOpenAsideBar((prev) => !prev), []);

  const filters: EventFilter[] = [
    {
      id: 'keynote',
      predicate: (event) => event.title.toLowerCase().includes('keynote'),
    },
    {
      id: 'english',
      predicate: (event) => event.lang === 'en',
    },
    {
      id: 'industry',
      predicate: (event) => event.track?.includes('industry') || false,
    },
  ];

  const { eventType, toggleType, eventSymposiums, toggleSymposiums, activeFilters, toggleFilter, filteredEvents } =
    useEventFilter(events, symposiums, filters);

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
            <Filter
              filters={filters.map((filter) => filter.id)}
              eventFilters={activeFilters}
              toggleFilter={toggleFilter}
            />
            <SymposiumsFilter
              symposiums={symposiums}
              eventSymposiums={eventSymposiums}
              toggleSymposiums={toggleSymposiums}
            />
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
