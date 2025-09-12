'use client';

import useWindowDimensions from '@/hooks/useWindowDimentions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Title from '@/components/Title';

import { sponsors } from '@/data';
import styles from './styles.module.scss';
import { Sponsor } from '@/types/sponsors';
import { groupSponsorsByTier } from '@/utils/sortSponsors';
import Countdown from '@/components/Countdown';
import { useTranslations } from 'next-intl';
import { useTObject } from '@/hooks/useTObject';
import appConfig from './app.config';

type SponsorSection = {
  title: string;
  list: Sponsor[];
};

function SponsorSection(props: SponsorSection) {
  const grouped = groupSponsorsByTier(props.list);

  return (
    <div className='row'>
      <div className={`col-12 text-center ${styles['sponsor-title']}`}>
        <h4>{props.title}</h4>
      </div>

      <div className={`col-12 block ${styles.block}`}>
        {grouped.map(({ tier, items }, idx) => (
          <ul key={idx} className={`${styles['sponsors-list']} ${styles['tier-' + tier]}`}>
            {items.map((sponsor, index) => (
              <li className={styles['sponsor-item']} key={index}>
                <a href={sponsor.href} target='_blank' rel='noreferrer' className={styles['image-block']}>
                  <picture>
                    <img
                      src={`/images/sponsors/${sponsor.image}`}
                      alt='sponsor-logo'
                      className='img-fluid'
                      loading='lazy'
                    />
                  </picture>
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
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
    <article>
      <section className={styles.about}>
        <div className={`container ${styles.container}`}>
          <picture>
            <img className='img-fluid' src='/images/logos/CBSoft-icon1.png' alt='' />
          </picture>

          <div className='row'>
            <div className='col-lg-8 col-md-6 align-self-center'>
              <Title titulo={t('sobre')} align={width == null || width > 768 ? 'left' : 'center'} />
              {t('descricao')}
            </div>

            <div className={`d-md-block col-lg-4 col-md-6 align-top ${styles.meta}`}>
              <div className={styles.info}>
                <div className={styles.date}>
                  <FontAwesomeIcon icon={faCalendarCheck} />
                  <div className={styles.descricao}>
                    <div className={styles.title}>{t('data.descricao')}:</div>
                    <div className={styles.content}>{t('data.periodo')}</div>
                  </div>
                </div>
                <div className={styles.contagem}>
                  <Countdown date={'2025-09-22T08:00:00.000-04:00'} className={styles.countdown} />
                </div>
                <div className={styles.local}>
                  <FontAwesomeIcon icon={faLocationDot} />
                  <div className={styles.descricao}>
                    <div className={styles.title}>{t('local.descricao')}</div>
                    <div className={styles.content}>{t('local.local')}</div>
                    <div className={styles.subcontent}>{t('local.detalhes')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.videoCBSoft}>
        <div className='container'>
          <iframe
            className={styles['responsive-iframe']}
            src='https://www.youtube.com/embed/FBHjBs1CF-M?si=KjAkC5UpjwHjaHZt'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* ===============================
          =            Sponsors         =
          =============================== */}

      <section id='org-apoio-patro' className={styles.sponsors}>
        <div className='container'>
          {Object.entries(sponsors).map(
            ([sectionTitle, list], index) =>
              list.length > 0 && (
                <SponsorSection title={t(`sponsors.${sectionTitle}`) as unknown as string} list={list} key={index} />
              ),
          )}
        </div>
      </section>
    </article>
  );
}
