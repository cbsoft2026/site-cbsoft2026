import Title from '@/components/Title';
import styles from './styles.module.scss';

import { getTObject } from '@/lib/getTObject';
import { createPageMetadata } from '@/lib/metadata';
import { withUTM } from '@/utils/utm';
import ImagePopup from '@/components/ImagePopup';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, 'pages/cbsoft/dinner/index', 'titulo');
}

export default async function FaqAuthorsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTObject('pages/cbsoft/dinner/index', {}, locale);
  return (
    <section className='container' style={{ paddingTop: '50px' }}>
      <Title titulo={t('titulo')} align='center' />
      {t('page')}
      <h3>{t('galeria')}</h3>
      <div className={styles['banners-wrapper']}>
        <ImagePopup src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/dinner/banner-1.webp`} loading={'lazy'} />
        <ImagePopup src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/dinner/banner-2.webp`} loading={'lazy'} />
        <ImagePopup src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/dinner/banner-3.webp`} loading={'lazy'} />
      </div>
      <h3>{t('cardapio')}</h3>
      {t('entradas')}
      <h4>{t('pratos')}</h4>
      <section className={styles['menu-gallery']}>
        <a
          className={styles['menu-gallery__item']}
          target='_blank'
          rel='noopener noreferrer'
          href={withUTM('https://www.outback.com.br/nossosprodutos/kookaburra-wings')}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/dinner/kookaburra-wings.webp`}
            alt='Kookaburra Wings'
          />
          <h6>Kookaburra Wings</h6>
        </a>

        <a
          className={styles['menu-gallery__item']}
          target='_blank'
          rel='noopener noreferrer'
          href={withUTM('https://www.outback.com.br/nossosprodutos/aussie-cheese-fries')}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/dinner/aussie-cheese-fries.webp`}
            alt='Aussie Cheese Fries'
          />
          <h6>Aussie Cheese Fries</h6>
        </a>

        <a
          className={styles['menu-gallery__item']}
          target='_blank'
          rel='noopener noreferrer'
          href={withUTM('https://www.outback.com.br/nossosprodutos/ribs-barbie')}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/dinner/ribs-barbie.webp`}
            alt='Ribs on the Barbie'
          />
          <h6>Ribs on the Barbie</h6>
        </a>

        <a
          className={styles['menu-gallery__item']}
          target='_blank'
          rel='noopener noreferrer'
          href={withUTM('https://www.outback.com.br/nossosprodutos/bloomin-onion')}
        >
          <img src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/dinner/bloomin-onion.webp`} alt="Bloomin' Onion" />
          <h6>Bloomin&apos; Onion</h6>
        </a>

        <a
          className={styles['menu-gallery__item']}
          target='_blank'
          rel='noopener noreferrer'
          href={withUTM('https://www.outback.com.br/nossosprodutos/royal-plant-barbecue')}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/dinner/royal-plant-barbecue.webp`}
            alt='Royal Plant Barbecue'
          />
          <h6>Royal Plant Barbecue</h6>
        </a>
      </section>
      {t('sobremesas')}
      {t('bebidas')}
      {t('footer')}
    </section>
  );
}
