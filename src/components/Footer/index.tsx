'use client';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

import styles from './styles.module.scss';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

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
              <a href='mailto:cbsoft2025@cin.ufpe.br'>
                <FontAwesomeIcon icon={faEnvelope} size='2x' />
              </a>
            </li>
            <li className={`list-inline-item ${styles['list-inline-item']}`}>
              <a href='https://x.com/congressocbsoft' target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faTwitter} size='2x' />
              </a>
            </li>
            <li className={`list-inline-item ${styles['list-inline-item']}`}>
              <a href='https://www.facebook.com/congresso.cbsoft/' target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faFacebook} size='2x' />
              </a>
            </li>
            <li className={`list-inline-item ${styles['list-inline-item']}`}>
              <a href='https://www.instagram.com/congresso.cbsoft/?hl=pt-br' target='_blank' rel='noreferrer'>
                <FontAwesomeIcon icon={faInstagram} size='2x' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
    // <footer {...props} className={`${props.className} bg-secondary ${styles.footer}`}>
    //   <div className={styles.top}>
    //     <div className='block text-center'>
    //       <picture>
    //         <img src='/images/logos/cbsoft-logo.svg' alt='logo' width='220px' height='34px' className='img-fluid' />
    //       </picture>
    //     </div>

    //     <span className={styles.separator}></span>

    //     <ul className={`list-inline ${styles['list-inline']}`}>
    //       <li className={`list-inline-item ${styles['list-inline-item']}`}>
    //         <a href='mailto:cbsoft2025@cin.ufpe.br'>
    //           <FontAwesomeIcon icon={faEnvelope} size='2x' />
    //         </a>
    //       </li>
    //       <li className={`list-inline-item ${styles['list-inline-item']}`}>
    //         <a href='https://x.com/congressocbsoft' target='_blank' rel='noreferrer'>
    //           <FontAwesomeIcon icon={faTwitter} size='2x' />
    //         </a>
    //       </li>
    //       <li className={`list-inline-item ${styles['list-inline-item']}`}>
    //         <a href='https://www.facebook.com/congresso.cbsoft/' target='_blank' rel='noreferrer'>
    //           <FontAwesomeIcon icon={faFacebook} size='2x' />
    //         </a>
    //       </li>
    //       <li className={`list-inline-item ${styles['list-inline-item']}`}>
    //         <a href='https://www.instagram.com/congresso.cbsoft/?hl=pt-br' target='_blank' rel='noreferrer'>
    //           <FontAwesomeIcon icon={faInstagram} size='2x' />
    //         </a>
    //       </li>
    //     </ul>
    //   </div>

    //   <div className={styles.bottom}>
    //     CBSoft &#169; 2023-2025 | <span>{t('copyright')}</span>
    //   </div>
    // </footer>
  );
}
