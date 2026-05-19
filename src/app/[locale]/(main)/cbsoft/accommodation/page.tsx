import Title from '@/components/Title';

import styles from './styles.module.scss';
import { createPageMetadata } from '@/lib/metadata';
import { getTObject } from '@/lib/getTObject';
import ImagePopup from '@/components/ImagePopup';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, 'pages/cbsoft/accommodation', 'titulo');
}

export default async function AccommodationPage({ params }: Props) {
  // TODO: en translate accommodation
  const t = await getTObject('pages/cbsoft/accommodation', {});

  return (
    <section className={styles['local-acomodacoes']} style={{ paddingTop: '50px' }}>
      <Title titulo={t('titulo')} align='center' />
      <div className='container'>
        {t('description')}
        <div className={styles['banners-wrapper']}>
          <ImagePopup
            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/accommodation/banner-radisson-pinheiros.jpeg`}
            alt='banner-radisson-pinheiros'
          />
          <ImagePopup
            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/accommodation/banner-quality-faria-lima.jpeg`}
            alt='banner-quality-faria-lima'
          />
          <ImagePopup
            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/accommodation/banner-fit-villa-lobos.jpeg`}
            alt='banner-fit-villa-lobos'
          />
        </div>
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
