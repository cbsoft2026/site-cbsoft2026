import Title from '@/components/Title';
import { previousEditions } from '@/data';

import styles from './styles.module.scss';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata } from '@/lib/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, 'pages/cbsoft/previousEditions', 'titulo');
}

function Edicao(props: { year: string; url: string; local: string; className?: string }) {
  return (
    <a className={styles.edicao} href={props.url} target='_blank' rel='noreferrer'>
      <div className={styles.image}>
        <picture>
          <img
            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/edicoes-anteriores/cbsoft${props.year}.png`}
            alt='edition'
            className='img-fluid'
          />
        </picture>
      </div>
      <div className={styles.content}>
        <span>CBSoft {props.year}</span>
        <span style={{ fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: props.local }}></span>
      </div>
    </a>
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
            {previousEditions.map((edicao, index) => (
              <Edicao {...edicao} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
