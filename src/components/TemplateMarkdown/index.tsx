import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import latex from 'highlight.js/lib/languages/latex';
import rehypeRaw from 'rehype-raw';
import styles from './styles.module.scss';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

type Props = {
  children: string | null | undefined;
  className?: string;
};

export default function TemplateMarkdown({ children, className }: Props) {
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
        }}
      >
        {children}
      </ReactMarkdown>
    </section>
  );
}
