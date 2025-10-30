'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faCalendarCheck, faLocationDot, faPlus } from '@fortawesome/free-solid-svg-icons';

import { common, sponsors } from '@/data';
import styles from './styles.module.scss';
import { Sponsor } from '@/types/sponsors';
import { groupSponsorsByTier } from '@/utils/sortSponsors';
import Countdown from '@/components/Countdown';
import { useTranslations } from 'next-intl';
import { useTObject } from '@/hooks/useTObject';
import appConfig from './app.config';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Participants } from '@/types/participants';
import Image from 'next/image';
import { useLocaleContext } from '@/providers/LocaleProvider';
import { formatDateRange } from '@/utils/dates';
import Link from 'next/link';
import InfiniteScroll from '@/components/InfiniteScroll';
import React from 'react';
import BackgroundGeometric from '@/components/BackgroundGeometric';
import AddCalendar from '@/components/AddCalendar';

type SponsorSection = {
  title: string;
  list: Sponsor[];
};

function SponsorSection(props: SponsorSection) {
  const grouped = groupSponsorsByTier(props.list);

  return (
    <div>
      <div className={`col-12 text-center ${styles['sponsor-title']}`}>
        <h3>{props.title}</h3>
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
  const locationT = useTranslations('pages/cbsoft/location');

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
                  width={300}
                  height={300}
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

  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  });

  return (
    <article>
      <section className={`${styles.hero} container`}>
        <div className={`${styles['hero__wrapper']}`}>
          <h1>{homeT('titulo')}</h1>
          <p>{homeT('descricao')}</p>

          <div className={styles.local}>
            <FontAwesomeIcon icon={faLocationDot} />
            <div className={styles.descricao}>
              <p>
                {commonT('localEvento')} &ndash; {commonT('localDetalhes')}
              </p>
            </div>
          </div>

          <div className={styles.date}>
            <FontAwesomeIcon icon={faCalendarCheck} />
            <div className={styles.descricao}>
              <AddCalendar
                label={formatDateRange(common.dates.start, common.dates.end, locale)}
                text={`${commonT('edicao')} ${commonT('siglas.cbsoft')}`}
                dateStart={new Date(common.dates.start)}
                dateEnd={new Date(common.dates.end)}
                location={commonT('localDetalhes')}
                fullDay={true}
              />
            </div>
          </div>

          <div className={styles.contagem}>
            <Countdown date={common.dates.start} className={styles.countdown} />
          </div>
        </div>

        <div className={styles['hero__background']}>
          <BackgroundGeometric amount={9} />
        </div>
        <div className={styles['hero__background--mobile']}>
          <Link href='#first-section' className={`${styles['bottom-right']} ${styles['arrow-down']}`}>
            <div>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 52' className={styles['abstract-block']}>
                <path fill='#d5491d' d='M52 0v0 52 0H0v0z'></path>
              </svg>
              <FontAwesomeIcon icon={faArrowDown} size='3x' />
            </div>
          </Link>
        </div>
      </section>

      {/* TODO: 
        mostrar informacoes extras dos simposios, 
        como, quantidade de eventos, quantidade
        de artigos, ...
      */}
      <section id='first-section'>
        <div className={`${styles.content} ${styles.simposios} container`}>
          <h1 className={`text-center ${styles['content-title']}`}>{homeT('simposios')}</h1>
          <div className={styles['content__wrapper']}>
            {['sbes', 'sblp', 'sbcars', 'sast'].map((item, index) => (
              <Link href={{ pathname: `symposiums/${item}/call` }} key={index}>
                <h4>{commonT(`siglas.${item}`)}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles['section-style']}>
        <div className={styles.content}>
          <h1 className={`text-center ${styles['content-title']}`}>{homeT('participantes')}</h1>
          <InfiniteScroll className={styles['content__images']} items={speakersElement} />
        </div>
      </section>

      <section className={`${styles.location} ${styles['section-style']}`}>
        <div className='container'>
          <div className={styles['location__description']}>
            <span className={styles.chip}>
              <FontAwesomeIcon icon={faLocationDot} />
              {locationT('location')}
            </span>
            <h3>
              {commonT('localEvento')} &ndash; {commonT('localDetalhes')}
            </h3>
            <div className={styles['description_grid']}>
              <div>
                <p>{locationT('location_tips.1')}</p>
              </div>
              <div>
                <p>{locationT('location_tips.2')}</p>
              </div>
            </div>
            <Link href={'/cbsoft/location'} className={styles.button}>
              {locationT('more_informations')}
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
          <div className={styles['location__slides']}>
            <iframe
              src='https://www.youtube.com/embed/L7Md62Cfq5k?si=Xw1Tq2Y7GVe7ZnEt&amp;controls=0'
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <div ref={ref} className={`container ${styles['sponsors__above']} ${isVisible ? styles.show : ''}`}>
        <div></div>
        <div></div>
        <div>
          <div></div>
        </div>
        <div></div>
      </div>

      <section id='org-apoio-patro' className={styles.sponsors}>
        <div className={`container ${styles['sponsors__description']}`}>
          <p>Quem está contribuindo</p>
        </div>
        <div className={`container ${styles['sponsors__container']}`}>
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
