import Title from '@/components/Title';
import appConfig from '@/app/app.config';
import styles from './styles.module.scss';
import { common } from '@/data';
import { formatDateRange } from '@/utils/dates';
import { getTObject } from '@/lib/getTObject';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CbsoftPage({ params }: Props) {
  const { locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const t = await getTObject(
    'pages/cbsoft/index',
    {
      ano: appConfig.year,
      edicao: commonT('edicao'),
      dataEvento: formatDateRange(common.dates.start, common.dates.end, locale),
      localEvento: commonT('localEvento'),
      edicoesSbes: commonT('edicoes.sbes'),
      siglasSbes: commonT('siglas.sbes'),
      edicoesSblp: commonT('edicoes.sblp'),
      siglasSblp: commonT('siglas.sblp'),
      edicoesSbcars: commonT('edicoes.sbcars'),
      siglasSbcars: commonT('siglas.sbcars'),
      edicoesSast: commonT('edicoes.sast'),
      siglasSast: commonT('siglas.sast'),
    },
    locale,
  );
  return (
    <div style={{ paddingTop: '50px' }}>
      <section className={styles.about}>
        <div className={`container ${styles.container}`}>
          <picture>
            <img className='img-fluid' src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/logos/cbsoft-logo-icon.svg`} alt='cbsoft-logo' />
          </picture>

          <div>
            <Title titulo={t('sobre')} />
            {t('descricao')}
          </div>
        </div>
      </section>
    </div>
  );
}
