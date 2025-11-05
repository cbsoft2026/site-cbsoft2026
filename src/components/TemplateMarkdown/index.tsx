import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import latex from 'highlight.js/lib/languages/latex';
import rehypeRaw from 'rehype-raw';
import styles from './styles.module.scss';

type Props = {
  children: string | null | undefined;
  className?: string;
};

export default function TemplateMarkdown({ children, className }: Props) {
  return (
    <section className={`${styles['markdown-body']} ${className}`}>
      <ReactMarkdown skipHtml={false} rehypePlugins={[[rehypeHighlight, { languages: { latex } }], rehypeRaw]}>
        {children}
      </ReactMarkdown>
    </section>
  );
}
