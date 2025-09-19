'use client';

import Title from '@/components/Title';
import { useTObject } from '@/hooks/useTObject';
import useWindowDimensions from '@/hooks/useWindowDimentions';
import appConfig from '../app.config';
import { useTranslations } from 'next-intl';
import styles from './styles.module.scss';

export default function CbsoftPage() {
  const commonT = useTranslations('common');
  const t = useTObject('pages/cbsoft/index', {
    ano: appConfig.year,
    edicao: commonT('edicao'),
    dataEvento: commonT('dataEvento'),
    localEvento: commonT('localEvento'),
    edicoesSbes: commonT('edicoes.sbes'),
    siglasSbes: commonT('siglas.sbes'),
    edicoesSblp: commonT('edicoes.sblp'),
    siglasSblp: commonT('siglas.sblp'),
    edicoesSbcars: commonT('edicoes.sbcars'),
    siglasSbcars: commonT('siglas.sbcars'),
    edicoesSast: commonT('edicoes.sast'),
    siglasSast: commonT('siglas.sast'),
  });
  const { width } = useWindowDimensions();
  return (
    <article style={{ paddingTop: '50px' }}>
      <section className={styles.about}>
        <div className={`container ${styles.container}`}>
          <picture>
            <img className='img-fluid' src='/images/logos/cbsoft-logo-icon.svg' alt='cbsoft-logo' />
          </picture>

          <div className='row'>
            <Title titulo={t('sobre')} align={width == null || width > 768 ? 'left' : 'center'} />
            {t('descricao')}
          </div>
        </div>
      </section>
    </article>
  );
}
