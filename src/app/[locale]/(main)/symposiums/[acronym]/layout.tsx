import { SYMPOSIUMS } from '@/lib/api';
import styles from './styles.module.scss';
import React from 'react';
import { createPageMetadata } from '@/lib/metadata';

type Props = {
  children: React.ReactNode;
  params: Promise<{ acronym: string; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { acronym, locale } = await params;
  return createPageMetadata(locale, 'common', `${acronym}`);
}

export async function generateStaticParams() {
  const params = [];
  params.push(
    ...SYMPOSIUMS.map((symposium) => {
      return { acronym: symposium };
    }),
  );
  return params;
}

export default async function AcronymLayout({ children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
