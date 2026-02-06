import { loadCalls } from '@/lib/api';
import TemplateMarkdown from '../TemplateMarkdown';
import { dates } from '@/data';
import { dateOnlyFromISO, formatDate } from '@/utils/dates';


import styles from './styles.module.scss';
import AddCalendar from '../AddCalendar';
import { getTranslations } from 'next-intl/server';

type Props = {
  acronym: string;
  track?: string;
  className?: string;
  locale: string;
};

type DateKey = keyof typeof dates;

export default async function CallComponent({ acronym, track, className, locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'components/call' });

  const call = loadCalls(locale, [acronym], track ? [track] : []);

  const label = `${acronym}${track ? `_${track}` : ''}` as DateKey
  const date = dates[label]
  const sortedDate = Object.entries(date != undefined ? date : {})
  .sort(([, a], [, b]) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .reduce((obj: any, [key, value]) => {
    obj[key as keyof typeof obj] = value;
    return obj;
  }, {}); 

  const templateVariables = Object.fromEntries(Object.keys(sortedDate).map(key => {
    const value = sortedDate[key]
    return [key, dateOnlyFromISO(value.date)]
  }))
  
  return (<div 
    className={`${styles.call} ${className}`}
  >
    <TemplateMarkdown 
      className={styles.call__content}
      variables={templateVariables}
      locale={locale}
    >
      {Object.values(call)[0]}
    </TemplateMarkdown>
    <aside className={styles.call__sidebar}>
      {Object.keys(sortedDate).length > 0 ? ( <div className={styles.sidebar__list}>
        <header>
          <p>{t("important_dates")}</p>
        </header>
        <table>
          <tbody>
            {Object.keys(sortedDate).map((key) => {
              const value = sortedDate[key]
              let dateLabel = (value != undefined && value.hasOwnProperty("label")) ? value.label : ""
              if (typeof dateLabel !== 'string') {
                if (dateLabel.hasOwnProperty(locale)) {
                  dateLabel = dateLabel[locale as keyof typeof dateLabel]
                } else {
                  dateLabel = ""
                }
              }

              return (<tr key={value.date}>
                <td>
                  <AddCalendar
                    simplifiedMode={true}
                    label={`${formatDate(dateOnlyFromISO(value.date), locale)}\n${dateLabel}`}
                    text={`${formatDate(dateOnlyFromISO(value.date), locale)} - ${dateLabel}`}
                    dateStart={new Date(value.date ?? "")}
                    dateEnd={new Date(value.date ?? "")}
                    fullDay={true}
                  />
                </td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>) : (<></>)}
    </aside>
  </div>);
}
