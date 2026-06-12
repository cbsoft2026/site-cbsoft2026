import { getTranslations } from 'next-intl/server';
import styles from './styles.module.scss';

import { dates } from '@/data';
import { loadCalls } from '@/lib/api';
import { dateOnlyFromISO, formatDate } from '@/utils/dates';

import AddCalendar from '@/components/AddCalendar';
import TemplateMarkdown from '@/components/TemplateMarkdown';

type Props = {
  acronym: string;
  track?: string;
  className?: string;
  locale: string;
};

type DateKey = keyof typeof dates;

export default async function CallComponent({ acronym, track, className, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'components/call' });
  const datesT = await getTranslations({ locale, namespace: 'pages/dates' });

  const { body, slug, track: realTrack } = loadCalls(locale, [acronym], track ? [track] : []);

  const label = `${slug}${realTrack ? `_${realTrack}` : ''}` as DateKey;
  const date = dates[label];
  const sortedDate = Object.entries(date != undefined ? date : {})
    .sort(([, a], [, b]) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .reduce((obj: any, [key, value]) => {
      obj[key as keyof typeof obj] = value;
      return obj;
    }, {});

  const templateVariables = Object.fromEntries(
    Object.keys(sortedDate).map((key) => {
      const value = sortedDate[key];
      return [key, dateOnlyFromISO(value.date)];
    }),
  );

  return (
    <div className={`${styles.call} ${className}`}>
      <TemplateMarkdown className={styles.call__content} variables={templateVariables} locale={locale}>
        {Object.values(body)[0]}
      </TemplateMarkdown>
      <aside className={styles.call__sidebar}>
        <div className={styles['sidebar-wrapper']}>
          {Object.keys(sortedDate).length > 0 ? (
            <div className={styles.sidebar__list}>
              <header>
                <p>{t('important_dates')}</p>
              </header>
              <table>
                <tbody>
                  {Object.keys(sortedDate).map((key) => {
                    const value = sortedDate[key];
                    let dateLabel = value != undefined && value.hasOwnProperty('label') ? value.label : '';
                    if (typeof dateLabel !== 'string') {
                      if (dateLabel.hasOwnProperty(locale)) {
                        dateLabel = dateLabel[locale as keyof typeof dateLabel];
                      } else {
                        dateLabel = '';
                      }
                    }
                    const previouslyWhen = 'history' in value ? value.history : [];

                    return (
                      <tr key={value.date}>
                        <td>
                          <AddCalendar
                            simplifiedMode={true}
                            label={`${formatDate(dateOnlyFromISO(value.date), locale)}\n${dateLabel}`}
                            text={dateLabel}
                            dateStart={new Date(dateOnlyFromISO(value.date) ?? '')}
                            dateEnd={new Date(dateOnlyFromISO(value.date) ?? '')}
                            fullDay={true}
                          />
                          {previouslyWhen.length ? (
                            <small className='small text-secondary'>
                              {datesT('previously')}:{' '}
                              {formatDate(dateOnlyFromISO(previouslyWhen[previouslyWhen.length - 1]), locale)}
                            </small>
                          ) : (
                            <></>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <></>
          )}
        </div>
      </aside>
    </div>
  );
}
