import Image from 'next/image';

import { useTranslations } from 'next-intl';
import Title from '@/components/Title';

import styles from './styles.module.scss';

export default function LocationPage() {
  const t = useTranslations('pages/cbsoft/location');
  const indexT = useTranslations('pages/cbsoft/index');

  return (
    <section style={{ paddingTop: '50px' }}>
      <Title titulo={t('titulo')} align='center' />
      <div className='text-center mb-4'>
        <a href='https://www.marhotel.com.br' target='_blank' rel='noopener noreferrer'>
          <Image
            src={'/images/marhotel.png'}
            alt='Mar Hotel Convention'
            className='rounded-md mx-auto mb-4'
            width={400}
            height={400}
          />
        </a>
      </div>
      <div className={styles.local}>
        <div className={styles.descricao}>
          <div className='content'>{indexT('local.local')}</div>
          <div className={styles.subcontent}>{indexT('local.detalhes')}</div>
        </div>
      </div>
      <section className={styles.map}>
        <div className='container'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.7004039152275!2d-34.906957524991356!3d-8.131952491897847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab1fcb08ad1401%3A0xd24bd3d576e3012a!2sMar%20Hotel%20Conventions!5e0!3m2!1spt-BR!2sbr!4v1750358753899!5m2!1spt-BR!2sbr'
            height='450'
            style={{ border: 0 }}
            loading='lazy'
          ></iframe>
        </div>
      </section>
    </section>
  );
}
