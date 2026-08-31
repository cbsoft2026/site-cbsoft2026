import styles from './styles.module.scss';

import ImagePopup from '@/components/ImagePopup';
import Title from '@/components/Title';

import { getTObject } from '@/lib/getTObject';
import { createPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/happy-hour/index' });
  const title = t('titulo');

  return createPageMetadata(title);
}

export default async function HappyHourPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTObject('pages/cbsoft/happy-hour/index', {}, locale);
  return (
    <section className='container' style={{ paddingTop: '50px' }} data-pagefind-body>
      <Title titulo={t('titulo')} align='center' />
      {t('page')}
      <div className={styles['banners-wrapper-1']}>
        <ImagePopup src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/happy-hour/image--1.jpg`} loading={'lazy'} />
        <ImagePopup src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/happy-hour/image--2.jpg`} loading={'lazy'} />
        <ImagePopup src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/happy-hour/image--3.jpg`} loading={'lazy'} />
      </div>
      <div className={styles['banners-wrapper-2']}>
        <ImagePopup src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/happy-hour/image--4.jpg`} loading={'lazy'} />
        <ImagePopup src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/happy-hour/image--5.jpg`} loading={'lazy'} />
      </div>
    </section>
  );
}
