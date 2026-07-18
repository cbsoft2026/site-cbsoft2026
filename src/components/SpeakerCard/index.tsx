'use client';

import Image from 'next/image';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withUTM } from '@/utils/utm';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Participant } from '@/types/participants';
import { useEffect, useState } from 'react';

type Props = {
  speaker: Participant;
  size: number;
  children?: React.ReactNode;
};

export default function SpeakerCard(props: Props) {
  const { speaker, size, children } = props;

  const [imageId, setImageId] = useState<number | null>(null);

  useEffect(() => {
    setImageId(Math.floor(Math.random() * 2));
  }, []);

  return (
    <div id={speaker.id} className={styles['speaker-item']}>
      <div
        key={speaker.id}
        className={styles['content__image']}
        style={{
          width: size,
          height: size,
          minHeight: size,
          minWidth: size,
        }}
      >
        <Image
          className={styles[`image--${imageId}`]}
          loading='lazy'
          src={
            speaker.image?.startsWith('http')
              ? speaker.image
              : `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/${speaker.image ? 'speakers/' + speaker.image : 'nonimage.png'}`
          }
          width={size}
          height={size}
          alt={speaker.name}
          title={speaker.name}
        />
      </div>
      <div className={styles['content__body']}>
        <div className={styles['content__paragraph']}>
          {children ? (
            children
          ) : (
            <>
              <h1>{speaker.name}</h1>
              <p className='text-secondary'>{speaker.institution}</p>
              <p>{speaker.bio}</p>
            </>
          )}
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
  );
}
