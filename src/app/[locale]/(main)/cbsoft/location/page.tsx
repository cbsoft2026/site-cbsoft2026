import Title from '@/components/Title';

import styles from './styles.module.scss';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LocationPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/location' });
  const commonT = await getTranslations({ locale, namespace: 'common' });

  return (
    <section className='container' style={{ paddingTop: '50px' }}>
      <Title titulo={t('titulo')} align='center' />
      <div className={styles.local}>
        <div className={styles.descricao}>
          <div className='content'>{commonT('localEvento')}</div>
          <div className={styles.subcontent}>{commonT('localDetalhes')}</div>
        </div>
      </div>
      <section className={styles.map}>
        <div className='container'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.2516890350703!2d-46.734413124670006!3d-23.559402378801188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5614445ea63f%3A0x81bb971c3a8f0fcf!2sInstituto%20de%20Matem%C3%A1tica%20e%20Estat%C3%ADstica%20da%20Universidade%20de%20S%C3%A3o%20Paulo%20(IME-USP)!5e0!3m2!1spt-BR!2sbr!4v1758490852020!5m2!1spt-BR!2sbr'
            width='600'
            height='450'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </section>
      <div className={styles.local}>
        <div>
          <a href='https://www.ime.usp.br/localizacao/' target='_blank'>
            {t('comochegar')}
          </a>
        </div>
      </div>
    </section>
  );
}
