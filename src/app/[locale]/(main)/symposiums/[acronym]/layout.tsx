import styles from './styles.module.scss';
import React from 'react';
import { createPageMetadata } from '@/lib/metadata';
import { symposiums } from '@/app/config/event-structure';

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
    ...symposiums.map((symposium) => {
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
