import { useLocale } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import latex from 'highlight.js/lib/languages/latex';
import rehypeRaw from 'rehype-raw';
import styles from './styles.module.scss';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { interpolate } from '@/lib/getTObject';
import AddCalendar from '../AddCalendar';

type Props = {
  children: string | null | undefined;
  className?: string;
  variables?: Record<string, any>;
  locale?: string
};

export default function TemplateMarkdown({ children, className, variables, locale }: Props) {
  const content =
    typeof children === 'string'
      ? interpolate(children, variables ?? {}, locale)
      : '';

  return (
    <section className={`${styles['markdown-body']} ${className}`}>
      <ReactMarkdown
        skipHtml={false}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, remarkGfm, [rehypeHighlight, { languages: { latex } }], rehypeRaw]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target='_blank' rel='noopener noreferrer'>
              {props.children}
            </a>
          ),
          time: ({ node, ...props }) => (
            <div style={{float: 'left'}}>
              <AddCalendar
                simplifiedMode={true}
                label={props.children?.toString()}
                text={props.children?.toString() ?? ""}
                dateStart={new Date(props.dateTime ?? "")}
                dateEnd={new Date(props.dateTime ?? "")}
                fullDay={true}
              />
            </div>
          )   
        }}
      >
        {content}
      </ReactMarkdown>
    </section>
  );
}
