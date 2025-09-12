'use client';

import styles from './Title.module.scss';

import { JSX, ReactNode } from 'react';

type AlignTypes = 'left' | 'center' | 'right';

export default function Title(props: {
  titulo: string | ReactNode | ReactNode[];
  className?: string;
  align?: AlignTypes;
}): JSX.Element {
  return (
    <h2 className={`${styles.title} ${props.className} text-${props.align || 'left'} ${styles[props.align || 'left']}`}>
      {typeof props.titulo === 'string' ? (
        <div
          className={`text-${props.align || 'left'} ${styles[props.align || 'left']}`}
          dangerouslySetInnerHTML={{ __html: props.titulo }}
        ></div>
      ) : (
        <div className={`text-${props.align || 'left'} ${styles[props.align || 'left']}`}>{props.titulo}</div>
      )}
    </h2>
  );
}
