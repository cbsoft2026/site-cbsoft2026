import { loadCalls, loadTracks, SYMPOSIUMS } from '@/lib/api';
import Link from 'next/link';
import styles from './styles.module.scss';
import getRequestConfig from '@/i18n/request';
import React from 'react';

type Props = {
  children: React.ReactNode;
  params: Promise<{ acronym: string }>;
};

export async function generateStaticParams() {
  const params = [];
  params.push(
    ...SYMPOSIUMS.map((symposium) => {
      return { acronym: symposium };
    }),
  );
  return params;
}

function createTree(acronym: string, locale: string, track?: string) {
  const call = loadCalls(locale, [acronym], []);

  const href = track ? `/symposiums/${acronym}/${track}/call` : `/symposiums/${acronym}/call`;

  return Object.keys(call).length > 0 ? (
    <li>
      <Link href={{ pathname: href }}>Chamadas de trabalho</Link>
    </li>
  ) : (
    ''
  );
}

export default async function AcronymLayout({ children, params }: Props) {
  const { locale, messages } = await getRequestConfig({
    requestLocale: Promise.resolve('pt'),
  });

  const { acronym } = await params;
  const tracks = loadTracks(acronym);

  return (
    <section className={styles.container}>
      <aside className={styles.sidebar}>
        <ul>
          {Array.isArray(tracks) && tracks.length > 0
            ? tracks.map((track) => {
                return (
                  <React.Fragment key={track}>
                    <li>{messages?.common.siglas.trilhas[track]}</li>
                    <ul>{createTree(acronym, locale, track)}</ul>
                  </React.Fragment>
                );
              })
            : createTree(acronym, locale)}
          <li>
            <Link href={{ pathname: `/symposiums/${acronym}/papers` }}>Artigos aceitos</Link>
          </li>
          <li>
            <Link href={{ pathname: `/symposiums/${acronym}/painel` }}>Painel</Link>
          </li>
          <li>
            <Link href={{ pathname: `/symposiums/${acronym}/talks` }}>Palestras</Link>
          </li>
          <li>
            <Link href={{ pathname: `/symposiums/${acronym}/tutorials` }}>Tutoriais</Link>
          </li>
        </ul>
      </aside>
      <main className={styles.content}>{children}</main>
    </section>
  );
}
