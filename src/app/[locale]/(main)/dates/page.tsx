import AddCalendar from '@/components/AddCalendar';
import Title from '@/components/Title';
import { dates } from '@/data';
import { dateOnlyFromISO, formatDate } from '@/utils/dates';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DatesPage({ params }: Props) {
  const { locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const datesT = await getTranslations({ locale, namespace: 'pages/dates' });

  const datesList = Object.keys(dates).flatMap((nameKey) => {
    const activities = dates[nameKey as keyof typeof dates];
    const nameParts = nameKey.split('_');
    return Object.keys(activities).map((activityKey) => {
      const info = activities[activityKey as keyof typeof activities];
      let dateLabel = info != undefined && info.hasOwnProperty('label') ? info.label : '';
      if (typeof dateLabel !== 'string') {
        if (dateLabel.hasOwnProperty(locale)) {
          dateLabel = dateLabel[locale as keyof typeof dateLabel];
        } else {
          dateLabel = '';
        }
      }
      return {
        name: nameParts.length > 1 ? commonT(`siglas.trilhas.${nameParts[1]}`) : commonT(`${nameKey}`),
        when: info.date,
        what: dateLabel,
      };
    });
  });
  const sortedDatesList = datesList.sort((a, b) => new Date(a.when).getTime() - new Date(b.when).getTime());

  return (
    <article style={{ padding: '30px 0 0' }}>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={datesT('important_dates')} />
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>{datesT('when')}</th>
              <th>{datesT('name')}</th>
              <th>{datesT('what')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedDatesList.map((date) => {
              return (
                <tr key={`${date.what}_${date.name}`}>
                  <td>
                    <div style={{ width: 'fit-content' }}>
                      <AddCalendar
                        simplifiedMode={true}
                        label={formatDate(dateOnlyFromISO(date.when), locale)}
                        text={date.what}
                        dateStart={new Date(date.when ?? '')}
                        dateEnd={new Date(date.when ?? '')}
                        fullDay={true}
                      />
                    </div>
                  </td>
                  <td>{date.name}</td>
                  <td>{date.what}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </article>
  );
}
