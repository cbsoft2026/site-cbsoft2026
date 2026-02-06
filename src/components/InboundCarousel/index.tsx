'use client';

import { dates } from '@/data';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import LinkLocale from '../LinkLocale';
import AddCalendar from '../AddCalendar';
import { dateOnlyFromISO, formatDate } from '@/utils/dates';

const items = ['sbes', 'sblp', 'sbcars', 'sast'];

type DateKey = keyof typeof dates;

type DateItem = {
  date: string;
  label?: string | Record<string, string>;
};

type DateEntry = {
  key: string;
  value: DateItem;
};

type Slide = {
  pathname: string;
  title: string;
  button: string;
  dates: DateEntry[];
};

export default function InboundCarousel() {
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const commonT = useTranslations('common');
  const componentT = useTranslations('components/inboundCarousel');

  const slides = React.useMemo<Slide[]>(() => {
    return items.map((item) => {
      const label = item as DateKey;

      const filtered: DateEntry[] = Object.entries(dates)
        .filter(([key]) => key.startsWith(label))
        .flatMap(([key, value]) => {
          const rest = key.slice(label.length).replace(/^_/, '');

          return Object.entries(value).map(([innerKey, innerValue]) => ({
            key: rest || innerKey,
            value: innerValue,
          }));
        });

      const withUniqueKeys: DateEntry[] = filtered
        .map((entry, index, arr) => {
          const repeated = arr.findIndex((e) => e.key === entry.key) !== index;

          return {
            key: repeated ? `${entry.key}_${index}` : entry.key,
            value: entry.value,
          };
        })
        .sort((a, b) => new Date(a.value.date).getTime() - new Date(b.value.date).getTime())
        .slice(0, 4);

      return {
        pathname: `symposiums/${item}/call`,
        title: `${commonT(`siglas.${item}`)} (${commonT(`${item}`)})`,
        button: componentT("read_more"),
        dates: withUniqueKeys,
      };
    });
  }, [commonT]);

  const prev = () => setIndex((index - 1 + slides.length) % slides.length);
  const next = () => setIndex((index + 1) % slides.length);

  const slide = slides[index];

  return (
    <div className={styles.carousel}>
      <div className={styles.content}>
        <div className={styles.badge}>
          <h5>{componentT("symposiums")}</h5>
        </div>
        <div className={styles.empty_space}>{componentT("symposiums")}</div>

        <div>
          <h2>{slide.title}</h2>
          <LinkLocale className={styles.button} href={{ pathname: slide.pathname }} key={index} locale={locale}>
            <span>{slide.button}</span>
            <FontAwesomeIcon icon={faPlus} />
          </LinkLocale>
        </div>

        <div className={styles.controls}>
          <button className={`${styles.button} ${styles.icon}`} onClick={prev}>
            <FontAwesomeIcon icon={faChevronLeft} style={{ width: '8px' }} />
          </button>
          <button className={`${styles.button} ${styles.icon}`} onClick={next}>
            <FontAwesomeIcon icon={faChevronRight} style={{ width: '8px' }} />
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table>
          <tbody>
            {Object.keys(slide.dates).length > 0 ? (
              Object.keys(slide.dates).map((key) => {
                const dataEntry: DateEntry = slide.dates[key as keyof typeof slide.dates] as DateEntry;
                const value = dataEntry.value;
                let dateLabel = value != undefined && value.hasOwnProperty('label') ? value.label : '';
                if (typeof dateLabel !== 'string') {
                  if (dateLabel?.hasOwnProperty(locale)) {
                    dateLabel = dateLabel[locale as keyof typeof dateLabel];
                  } else {
                    dateLabel = '';
                  }
                }

                const commonTLabel = `siglas.trilhas.${dataEntry.key.split('_')[0]}`;
                const track = commonT.has(commonTLabel) ? `${commonT(commonTLabel)} - ` : '';

                return (
                  <tr key={key}>
                    <td>
                      <AddCalendar
                        simplifiedMode={true}
                        label={<>
                          <b>{formatDate(dateOnlyFromISO(value.date), locale)}</b><br/>{track}{dateLabel}
                        </>}
                        text={dateLabel as string}
                        dateStart={new Date(value.date ?? '')}
                        dateEnd={new Date(value.date ?? '')}
                        fullDay={true}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <LinkLocale href={'dates'} locale={locale}>
          <span>{componentT('all_important_dates')}</span>
        </LinkLocale>
      </div>
    </div>
  );
}
