import { loadCalls } from '@/lib/api';
import TemplateMarkdown from '../TemplateMarkdown';

type Props = {
  acronym: string;
  track?: string;
  className?: string;
  locale: string;
};

export default async function CallComponent({ acronym, track, className, locale }: Props) {
  const call = loadCalls(locale, [acronym], track ? [track] : []);

  return <TemplateMarkdown className={className}>{Object.values(call)[0]}</TemplateMarkdown>;
}
