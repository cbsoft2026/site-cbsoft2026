'use client';

import { useEffect, useState } from 'react';
import { useLocaleContext } from '@/providers/LocaleProvider';
import TemplateMarkdown from '../TemplateMarkdown';

type Props = {
  acronym: string;
  track?: string;
  className?: string;
};

export default function CallComponent({ acronym, track, className }: Props) {
  const [call, setCall] = useState<string>();
  const { locale } = useLocaleContext();
  useEffect(() => {
    const url = `/generated/${acronym}${track ? `_${track}` : ''}_${locale}.md`;
    fetch(url)
      .then((res) => res.text())
      .then((text) => setCall(text));
  }, [setCall, locale, acronym, track]);

  return (<TemplateMarkdown className={className}>{call}</TemplateMarkdown>);
}
