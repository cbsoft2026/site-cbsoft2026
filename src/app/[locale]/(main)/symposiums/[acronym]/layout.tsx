import styles from './styles.module.scss';
import React from 'react';
import { createPageMetadata } from '@/lib/metadata';
import { symposiums } from '@/app/config/event-structure';
import { getTranslations } from 'next-intl/server';

type Props = {
  children: React.ReactNode;
  params: Promise<{ acronym: string; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { acronym, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  const title = t(acronym);

  return createPageMetadata(title);
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
