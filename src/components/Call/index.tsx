'use client';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import latex from 'highlight.js/lib/languages/latex';
import rehypeRaw from 'rehype-raw';
import { useEffect, useState } from 'react';
import { useLocaleContext } from '@/providers/LocaleProvider';

type Props = {
  acronym: string;
  track?: string;
};

export default function CallComponent({ acronym, track }: Props) {
  const [call, setCall] = useState<string>();
  const { locale } = useLocaleContext();
  useEffect(() => {
    const url = `/generated/${acronym}${track ? `_${track}` : ''}_${locale}.md`;
    fetch(url)
      .then((res) => res.text())
      .then((text) => setCall(text));
  }, [setCall, locale, acronym, track]);

  return (
    <>
      <div className='row'>
        <ReactMarkdown skipHtml={false} rehypePlugins={[[rehypeHighlight, { languages: { latex } }], rehypeRaw]}>
          {call}
        </ReactMarkdown>
      </div>
    </>
  );
}
