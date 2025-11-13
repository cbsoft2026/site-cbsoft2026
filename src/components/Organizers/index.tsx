import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import { Chair } from '../../types/organizers';
import styles from './styles.module.scss';

function OrganizadorCard(props: Chair) {
  const { email, image, link, name, university } = props;

  return (
    <div className={styles['group__card']}>
      <div className={styles['card__image']}>
        <Image
          width={200}
          height={200}
          src={image?.startsWith('http') ? image : `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/organizadores/${image || 'default.jpg'}`}
          alt={'perfil'}
        />
      </div>
      <div className={styles['card__info']}>
        <span className={styles['info__name']}>{name}</span>
        <span className={styles['info__affiliation']}>{university}</span>

        <div className={styles['info__contact']}>
          <a href={link} target='_blank' rel='noreferrer'>
            {link &&
              (link.includes('lattes') ? (
                <picture>
                  <img src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/icon/lattes.svg`} alt='' />
                </picture>
              ) : (
                <FontAwesomeIcon icon={faGlobe} />
              ))}
          </a>
          {email && (
            <a href={`mailto:${email}`} target='_blank' rel='noreferrer'>
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function OrganizadorGrupo(props: { title: string; chairs: Chair[] }) {
  return (
    <div>
      <div className={styles['group__title']}>{props.title}</div>
      <div className={styles['group__content']}>
        {[...props.chairs].map((gc, index) => (
          <OrganizadorCard {...gc} key={index} />
        ))}
      </div>
    </div>
  );
}
