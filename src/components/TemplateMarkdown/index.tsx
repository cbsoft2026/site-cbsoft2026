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
import ImagePopup from '../ImagePopup';

type Props = {
  children: string | null | undefined;
  className?: string;
  variables?: Record<string, any>;
  locale?: string;
};

export default function TemplateMarkdown({ children, className, variables, locale }: Props) {
  const content = typeof children === 'string' ? interpolate(children, variables ?? {}, locale) : '';

  return (
    <section className={`${styles['markdown-body']} ${className ? className : ''}`}>
      <ReactMarkdown
        skipHtml={false}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, remarkGfm, [rehypeHighlight, { languages: { latex } }], rehypeRaw]}
        components={{
          a: ({ node, ...props }) => {
            const href = props.href;

            const baseUrl = process.env.NEXT_PUBLIC_URL || '';

            const finalHref =
              typeof href != 'string' ||
              href.startsWith('http') ||
              href.startsWith('mailto:') ||
              href.startsWith('tel:')
                ? href
                : `${baseUrl}${href.startsWith('/') || baseUrl.endsWith('/') ? '' : '/'}${href}`;

            const isInternal = typeof finalHref === 'string' && finalHref.startsWith(baseUrl);

            if (props.href?.startsWith('#user-content-fn')) {
              return <a {...props}>{props.children}</a>;
            }
            return (
              <a
                {...props}
                href={finalHref}
                target={isInternal ? undefined : '_blank'}
                rel={isInternal ? undefined : 'noopener noreferrer'}
              >
                {props.children}
              </a>
            );
          },
          time: ({ node, ...props }) => (
            <div style={{ float: 'left' }}>
              <AddCalendar
                simplifiedMode={true}
                label={props.children?.toString()}
                text={props.children?.toString() ?? ''}
                dateStart={new Date(props.dateTime ?? '')}
                dateEnd={new Date(props.dateTime ?? '')}
                fullDay={true}
              />
            </div>
          ),
          sup: ({ node, ...props }) => (
            <sup style={{ fontSize: '0.8em', cursor: 'pointer', marginLeft: 4 }}>[{props.children}]</sup>
          ),
          img: ({ node, ...props }) => {
            const alt = props.alt || '';
            const src = props.src || '';

            const disablePopup = alt.startsWith('nopopup:');
            const cleanAlt = alt.replace(/^nopopup:\s*/, '');

            const baseUrl = process.env.NEXT_PUBLIC_URL || '';

            const finalSrc =
              typeof src != 'string' || src.startsWith('http') || src.startsWith('data:')
                ? src
                : `${baseUrl}images${src.startsWith('/') ? '' : '/'}${src}`;

            if (disablePopup) {
              return <img {...props} src={finalSrc} alt={cleanAlt} loading='lazy' />;
            }

            return <ImagePopup {...props} src={finalSrc} alt={cleanAlt} loading='lazy' />;
          },
          // table({ children }) {
          //   return (
          //     <div style={{ overflowX: "auto" }}>
          //       <table>
          //         {children}
          //       </table>
          //     </div>
          //   );
          // }
        }}
      >
        {content}
      </ReactMarkdown>
    </section>
  );
}
