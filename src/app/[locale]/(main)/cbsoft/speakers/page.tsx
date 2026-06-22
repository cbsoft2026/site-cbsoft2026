import Image from 'next/image';
import { speakers } from '@/data';
import styles from './styles.module.scss';
import { withUTM } from '@/utils/utm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import Title from '@/components/Title';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata } from '@/lib/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, 'pages/cbsoft/speakers', 'titulo');
}

export default async function SpeakersPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/speakers' });

  const speakersFiltered = speakers.filter(
    (speaker) =>
      typeof speaker === 'object' && speaker !== null && !Array.isArray(speaker) && speaker.image && speaker.name,
  );

  return (
    <article style={{ padding: '30px 0 0' }}>
      <header className='container' style={{ marginBottom: 56 }}>
        <Title titulo={t('titulo')}></Title>
      </header>
      <div className='container'>
        {speakersFiltered &&
          speakersFiltered.map((speaker, index) => (
            <div id={speaker.id} key={index} className={styles['speaker-item']}>
              <div key={speaker.id} className={styles['content__image']}>
                <Image
                  className={styles[`image--${Math.floor(Math.random() * 2)}`]}
                  loading='lazy'
                  src={
                    speaker.image.startsWith('http')
                      ? speaker.image
                      : `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/speakers/${speaker.image || 'default.jpg'}`
                  }
                  width={240}
                  height={240}
                  alt={speaker.name}
                  title={speaker.name}
                />
              </div>
              <div className={styles['content__body']}>
                <div className={styles['content__paragraph']}>
                  <h1>{speaker.name}</h1>
                  <p className='text-secondary'>{speaker.institution}</p>
                  <p>{speaker.bio}</p>
                </div>
                <div className={styles['content__addons']}>
                  {speaker.webpage && (
                    <a title='website' href={withUTM(speaker.webpage)} target='_blank' rel='noopener noreferrer'>
                      <FontAwesomeIcon size='2x' icon={faGlobe} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </article>
  );
}
