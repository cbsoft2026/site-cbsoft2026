import { loadCalls, loadEvents, loadTracks, SYMPOSIUMS } from '@/lib/api';
import Link from 'next/link';
import styles from './styles.module.scss';
import getRequestConfig from '@/i18n/request';
import React from 'react';
import { Event } from '@/types/event';
import { Metadata } from 'next';

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
  const tracks = [];
  if (track) tracks.push(track);
  const call = loadCalls(locale, [acronym], tracks);

  const href = track ? `/symposiums/${acronym}/${track}/call` : `/symposiums/${acronym}/call`;

  return Object.keys(call).length > 0 ? (
    <li>
      <Link href={{ pathname: href }}>Chamadas de trabalho</Link>
    </li>
  ) : (
    ''
  );
}

function getAmountByEvent(events: Record<string, Event>, acronym: string, type: string) {
  return Object.entries(events).filter(([key, value]) => {
    return value.type === type && value.simposio === acronym;
  }).length;
}

export default async function AcronymLayout({ children, params }: Props) {
  const { locale, messages } = await getRequestConfig({
    requestLocale: Promise.resolve('pt'),
  });

  const { acronym } = await params;
  const tracks = loadTracks(acronym);
  const events = Object.fromEntries(loadEvents(locale));
  const amountPapers = getAmountByEvent(events, acronym, 'artigo');
  const amountPainel = getAmountByEvent(events, acronym, 'painel');
  const amountTalks = getAmountByEvent(events, acronym, 'palestra');
  const amountTutorial = getAmountByEvent(events, acronym, 'tutorial');

  return (
    <div className={styles.container}>
      {/* <aside className={styles.sidebar}>
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
          {amountPapers > 0
            ? (<li>
                <Link href={{ pathname: `/symposiums/${acronym}/papers` }}>Artigos aceitos</Link>
              </li>)
            : (<></>)}
          {amountPainel > 0
            ? (<li>
                <Link href={{ pathname: `/symposiums/${acronym}/painel` }}>Painel</Link>
              </li>)
            : (<></>)}
          {amountTalks > 0
            ? (<li>
                <Link href={{ pathname: `/symposiums/${acronym}/talks` }}>Palestras</Link>
              </li>)
            : (<></>)}
          {amountTutorial > 0
              ? (<li>
                  <Link href={{ pathname: `/symposiums/${acronym}/tutorials` }}>Tutoriais</Link>
                </li>)
              : (<></>)}
        </ul>
      </aside> */}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
