import Title from '@/components/Title';
import { previousEditions } from '@/data';

import styles from './styles.module.scss';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata } from '@/lib/metadata';
import { PreviousEdition } from '@/types/previousEditions';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, 'pages/cbsoft/previousEditions', 'titulo');
}

type TimelineItemProps = {
  edition: PreviousEdition;
  locale: string;
  isLast?: boolean;
};

export async function TimelineItem({ edition, locale, isLast }: TimelineItemProps) {
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/previousEditions' });

  return (
    <article className={styles['timeline-item']}>
      <div className={styles['timeline-year']}>
        <h3>{edition.year}</h3>
      </div>

      <div className={styles['timeline-marker']}>
        <div className={styles['timeline-marker-dot']} />

        {!isLast && <div className={styles['timeline-marker-line']} />}
      </div>

      <div className={styles['timeline-entry']}>
        <div className={styles['timeline-entry-logo']}>
          <picture>
            <img
              src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/edicoes-anteriores/cbsoft${edition.year}.png`}
              alt={`CBSoft ${edition.year}`}
              className={`img-fluid ${styles['timeline-logo']}`}
            />
          </picture>
        </div>

        <div className={styles['timeline-entry-content']}>
          <h3 className={styles['timeline-entry-title']}>CBSoft {edition.year}</h3>

          <p className={styles['timeline-entry-location']}>{edition.local}</p>

          <div className={styles['timeline-entry-links']}>
            {edition.url && <a href={edition.url}>{t('edition_website')}</a>}
            {edition.proceedings && <a href={edition.proceedings}>{t('proceedings')}</a>}
          </div>
        </div>

        <div className={styles['timeline-chips__grouped']}>
          {edition.online ? (
            <span className={styles.chip}>
              <small>Online</small>
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </article>
  );
}

export default async function PreviousEditionsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/previousEditions' });

  return (
    <section className={`speakers overlay-lighter about`} style={{ paddingTop: '50px' }}>
      <div className='container'>
        <div className='col-12'>
          <Title titulo={t('titulo')} align='center' />
          <div className={styles.description}>
            {previousEditions.map((edition) => (
              <TimelineItem edition={edition} locale={locale} key={edition.year} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
