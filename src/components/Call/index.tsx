import { loadCalls } from '@/lib/api';
import TemplateMarkdown from '../TemplateMarkdown';
import { dates } from '@/data';
import { dateOnlyFromISO } from '@/utils/dates';

type Props = {
  acronym: string;
  track?: string;
  className?: string;
  locale: string;
};

type DateKey = keyof typeof dates["submission"];

export default async function CallComponent({ acronym, track, className, locale }: Props) {
  const call = loadCalls(locale, [acronym], track ? [track] : []);

  const label = `${acronym}${track ? `_${track}` : ''}` as DateKey
  const submissionDate = dates["submission"][label] ? dateOnlyFromISO(dates["submission"][label]) : ""
  
  return (<TemplateMarkdown 
    className={className}
    variables={{submission_date: submissionDate}}
    locale={locale}
  >
    {Object.values(call)[0]}
  </TemplateMarkdown>);
}
