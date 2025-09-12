'use client';

import Title from '@/components/Title';

import styles from './styles.module.scss';
import { useTObject } from '@/hooks/useTObject';
import appConfig from '../app.config';
import Image from 'next/image';

export default function RegistrationPage() {
  const t = useTObject('pages/registration', { year: appConfig.year });
  return (
    <section className='container'>
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
              Inscreva-se aqui
            </a>
          </div>
          <div>
            <span>&nbsp;</span>
          </div>
          <div>
            {t('informacoes.descricao')}
            {t('informacoes.inscricoes')}
            {t('informacoes.taxas')}
            <div>
              <h4>CBSoft store</h4>
              <Image
                src={`/images/cbsoft_tshirt.png`}
                alt='Camisa CBSoft'
                width={300}
                height={360}
                style={{ maxWidth: '100%', margin: '1rem 0' }}
              />
            </div>
            <div>
              <h4>{t('informacoes.adicional.titulo')}</h4>
              {t('informacoes.adicional.descricao')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
