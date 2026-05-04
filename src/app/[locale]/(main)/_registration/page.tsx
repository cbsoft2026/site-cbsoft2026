import Title from '@/components/Title';

import styles from './styles.module.scss';
import appConfig from '@/app/app.config';
import Image from 'next/image';
import { getTObject } from '@/lib/getTObject';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RegistrationPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTObject('pages/registration', { year: appConfig.year }, locale);
  return (
    <section className='container' style={{ paddingTop: '50px' }}>
      <div className='row'>
        <div className='col-lg-12 align-self-center'>
          <Title titulo={t('titulo')} align='center' />
          <div className={styles['button-container']}>
            <a
              className={styles['button']}
              href='https://centraldesistemas.sbc.org.br/ecos/cbsoft2025'
              target='_blank'
              rel='noopener noreferrer'
            >
              {t('action')}
            </a>
          </div>
          <div>
            <span>&nbsp;</span>
          </div>
          <div>
            {t('informacoes.descricao')}
            {t('informacoes.inscricoes')}
            {t('informacoes.taxas')}
          </div>
        </div>
      </div>
    </section>
  );
}
