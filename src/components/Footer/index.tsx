'use client';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

import styles from './styles.module.scss';
import { faBluesky, faFacebook, faLinkedin, faSquareInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const t = useTranslations('components/footer');

  return (
    <footer className={styles.footer}>
      <div className={`${styles['footer__wrapper']} container`}>
        <div>
          <p>
            &#169; <span className='fw-bold'>CBSoft 2023-2026</span> | <span className='fw-bold'>{t('copyright')}</span>
          </p>
        </div>
        <div></div>
        <div>
          <ul className={`list-inline ${styles.social}`}>
            <li className={`list-inline-item ${styles['list-inline-item']}`}>
              <a href='mailto:cbsoft2026@ime.usp.br'>
                <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '1.35rem' }} />
              </a>
            </li>
            <li className={`list-inline-item ${styles['list-inline-item']}`}>
              <a href='https://www.instagram.com/congresso.cbsoft' target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faSquareInstagram} style={{ fontSize: '1.35rem' }} />
              </a>
            </li>
            <li className={`list-inline-item ${styles['list-inline-item']}`}>
              <a href='https://www.facebook.com/congresso.cbsoft/' target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '1.35rem' }} />
              </a>
            </li>
            <li className={`list-inline-item ${styles['list-inline-item']}`}>
              <a href='https://x.com/congressocbsoft' target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faXTwitter} style={{ fontSize: '1.35rem' }} />
              </a>
            </li>
            <li className={`list-inline-item ${styles['list-inline-item']}`}>
              <a href='https://bsky.app/profile/cbsoft.bsky.social' target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faBluesky} style={{ fontSize: '1.2rem' }} />
              </a>
            </li>
            <li className={`list-inline-item ${styles['list-inline-item']}`}>
              <a href='https://linkedin.com/company/congressocbsoft' target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '1.35rem' }} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
