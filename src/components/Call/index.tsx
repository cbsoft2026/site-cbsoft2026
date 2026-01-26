import { loadCalls } from '@/lib/api';
import TemplateMarkdown from '../TemplateMarkdown';
import dates from '@/data/shared/dates.json';
import { dateOnlyFromISO } from '@/utils/dates';

type Props = {
  acronym: string;
  track?: string;
  className?: string;
  locale: string;
};

type DateKey = keyof typeof dates;

export default async function CallComponent({ acronym, track, className, locale }: Props) {
  const call = loadCalls(locale, [acronym], track ? [track] : []);

  const label = `submission_${acronym}${track ? `_${track}` : ''}` as DateKey
  const submissionDate = dates[label] ? dateOnlyFromISO(dates[label]) : ""
  
  return (<TemplateMarkdown 
    className={className}
    variables={{submission_date: submissionDate}}
    locale={locale}
  >
    {Object.values(call)[0]}
  </TemplateMarkdown>);
}
