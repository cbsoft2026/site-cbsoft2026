import Title from '@/components/Title';
import { Key } from 'react';

import styles from './styles.module.scss';
import { accommodations } from '@/data';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata } from '@/lib/metadata';
import { getTObject } from '@/lib/getTObject';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, 'pages/cbsoft/accommodation', 'titulo');
}

export default async function AccommodationPage({ params }: Props) {
  const { locale } = await params;
  // TODO: en translate accommodation
  const t = await getTObject('pages/cbsoft/accommodation', {});

  return (
    <section className={styles['local-acomodacoes']} style={{ paddingTop: '50px' }}>
      <Title titulo={t('titulo')} align='center' />
      <div className='container'>
        {t('description')}
        {t('hotels_list')}
        <br />
        {t('hotels_table')}
        <br />
        {t('lower_cost_options')}
        {t('public_transport_tips')}
        {t('agencia_parceira')}
      </div>
    </section>
  );
}
