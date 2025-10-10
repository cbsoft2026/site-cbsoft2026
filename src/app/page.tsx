'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCalendarCheck, faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { common, sponsors } from '@/data';
import styles from './styles.module.scss';
import { Sponsor } from '@/types/sponsors';
import { groupSponsorsByTier } from '@/utils/sortSponsors';
import Countdown from '@/components/Countdown';
import { useTranslations } from 'next-intl';
import { useTObject } from '@/hooks/useTObject';
import appConfig from './app.config';
import { useEffect, useMemo, useState } from 'react';
import { Participants } from '@/types/participants';
import Image from 'next/image';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { formatDateRange } from '@/utils/dates';
import Link from 'next/link';
import InfiniteScroll from '@/components/InfiniteScroll';

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

  const year = appConfig.year.toString();
  const homeT = useTObject('pages/home', {
    year_two_places: year.slice(-2),
  });

  const [speakers, setSpeaker] = useState<Participants>([]);
  const { locale } = useLocaleContext();

  const speakersElement = useMemo(() => {
    return speakers
      .filter(
        (speaker) =>
          typeof speaker === 'object' && speaker !== null && !Array.isArray(speaker) && speaker.image && speaker.name,
      )
      .map(
        (speaker, index) =>
          speaker.image &&
          speaker.name && (
            <div key={index}>
              <div key={speaker.id}>
                <Image
                  className={styles[`image--${Math.floor(Math.random() * 2)}`]}
                  loading='lazy'
                  src={
                    speaker.image.startsWith('http')
                      ? speaker.image
                      : `/images/speakers/${speaker.image || 'default.jpg'}`
                  }
                  width={240}
                  height={240}
                  alt={speaker.name}
                  title={speaker.name}
                />
              </div>
              <h4>{speaker.name}</h4>
              <p className={styles.institution}>{speaker.institution}</p>
            </div>
          ),
      );
  }, [speakers]);

  useEffect(() => {
    fetch('/data/shared/speakers.json')
      .then((res) => res.json())
      .then((json) => setSpeaker(json));
  }, [setSpeaker]);

  return (
    <article>
      <section className={styles.hero}>
        <div className={styles['hero__background']}>
          <div className={styles['bottom-left']}>
            <Image width={115} height={115} src='/images/group--1.svg' alt='' />
          </div>
          <div className={styles['top-right']}>
            <Image width={232} height={232} src='/images/group--2.svg' alt='' />
          </div>
          <Link href='#first-section' className={`${styles['bottom-right']} ${styles['arrow-down']}`}>
            <div>
              <Image width={197} height={197} src='/images/group--3.svg' alt='' />
              <FontAwesomeIcon icon={faArrowDown} size='4x' />
            </div>
          </Link>
        </div>

        <div className={`${styles['hero__wrapper']}`}>
          <h1>{homeT('titulo')}</h1>
          <p>{homeT('descricao')}</p>

          <div className={styles.local}>
            <FontAwesomeIcon icon={faLocationDot} />
            <div className={styles.descricao}>
              <p>
                {commonT('localEvento')} - {commonT('localDetalhes')}
              </p>
            </div>
          </div>

          <div className={styles.date}>
            <FontAwesomeIcon icon={faCalendarCheck} />
            <div className={styles.descricao}>
              <p>{formatDateRange(common.dates.start, common.dates.end, locale)}</p>
            </div>
          </div>

          <div className={styles.contagem}>
            <Countdown date={common.dates.start} className={styles.countdown} />
          </div>
        </div>
      </section>

      <section id='first-section'>
        <div className={`${styles.content} ${styles.simposios} container`}>
          <h1 className={`text-center ${styles['content-title']}`}>{homeT('simposios')}</h1>
          <div className={styles['content__wrapper']}>
            {[commonT('siglas.sbes'), commonT('siglas.sblp'), commonT('siglas.sbcars'), commonT('siglas.sast')].map(
              (item, index) => (
                <Link href='#' key={index}>
                  <h4>{item}</h4>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <section>
        <div className={styles.content}>
          <h1 className={`text-center ${styles['content-title']}`}>{homeT('participantes')}</h1>
          <InfiniteScroll className={styles['content__images']} items={speakersElement} />
        </div>
      </section>

      <section className={styles.videoCBSoft}>
        <div className='container'>
          <iframe
            width='560'
            height='315'
            src='https://www.youtube.com/embed/L7Md62Cfq5k?si=Xw1Tq2Y7GVe7ZnEt&amp;controls=0'
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section id='org-apoio-patro' className={styles.sponsors}>
        <div className='container'>
          {Object.entries(sponsors).map(
            ([sectionTitle, list], index) =>
              list.length > 0 && (
                <SponsorSection
                  title={homeT(`sponsors.${sectionTitle}`) as unknown as string}
                  list={list}
                  key={index}
                />
              ),
          )}
        </div>
      </section>
    </article>
  );
}
