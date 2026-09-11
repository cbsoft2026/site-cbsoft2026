import styles from './Heading.module.scss';

import { AnchorHTMLAttributes, JSX } from 'react';

type AlignTypes = 'left' | 'center' | 'right';
type TypographyType = 'title' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: TypographyType;
  align?: AlignTypes;
  anchor?: string;
  hint?: string;
  id?: string;
};

export type HeadingAttributes = Omit<Props, 'children'> & {
  children?: Props['children'];
};

export function isStringNode(node: React.ReactNode): node is string {
  return typeof node === 'string';
}

export default function Heading(props: Props): JSX.Element {
  const { children, className: parentClassName, as: Tag = 'h1', align = 'left', anchor, hint, id } = props;

  const anchorTagProps: AnchorHTMLAttributes<HTMLAnchorElement> = {};

  if (anchor) anchorTagProps['href'] = `#${anchor}`;

  if (hint) anchorTagProps['title'] = hint;

  if (!hint && isStringNode(children)) anchorTagProps['title'] = children;

  if (id) anchorTagProps['id'] = id;

  const className = [];
  if (parentClassName) className.push(parentClassName);
  className.push(`text-${align}`);
  className.push(styles[`heading-${align}`]);

  if (Tag == 'title') {
    className.push(styles['heading--title']);

    return <h1 className={className.join(' ')}>{children}</h1>;
  } else {
    return (
      <Tag className={className.join(' ')}>
        {children}
        {anchor && (
          <a className={styles['heading__link']} {...anchorTagProps}>
            ¶
          </a>
        )}
      </Tag>
    );
  }
}
