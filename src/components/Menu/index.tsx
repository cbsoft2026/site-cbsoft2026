'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLAttributes, useCallback, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';
// import useWindowDimensions from '@/hooks/useWindowDimentions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import appConfig from '@/app/app.config';
import { useLocaleContext } from '@/providers/LocaleProvider';
import useWindowDimensions from '@/hooks/useWindowDimentions';

type NavbarItemProps = {
  title: string;
  title2?: string;
  href?: string;
  items?: Array<NavbarItemProps>;
  className?: string;
  onClick?: () => any;
};

function NavbarItem(props: NavbarItemProps) {
  const { title, href, items, className, onClick } = props;
  const pathname = usePathname();

  return (
    <li
      className={`nav-item dropdown-slide ${styles['nav-item']} ${styles['dropdown-slide']} ${href && pathname.startsWith(href) ? styles.active : ''} ${className || ''}`}
    >
      {href && href.startsWith('https') ? (
        <a className={`nav-link ${styles['nav-link']}`} href={href} target='_blank' rel='noopener noreferrer'>
          {title}
        </a>
      ) : (
        <Link className={`nav-link ${styles['nav-link']}`} href={{ pathname: href }}>
          {title}
        </Link>
      )}
      {items && (
        <ul className={`dropdown-menu ${styles['dropdown-menu']}`}>
          {items?.map((item, i) => (
            <li key={i}>
              <Link
                className={`dropdown-item ${styles['dropdown-item']}`}
                href={{ pathname: item.href }}
                onClick={!item.items?.length ? onClick : undefined}
              >
                {item.title} {item.items?.length && <>&raquo;</>}
              </Link>
              {item.items && (
                <ul className={`submenu ${styles['submenu']}`}>
                  {item.items.map((subItem, j) => (
                    <li key={j}>
                      <Link
                        className={`dropdown-item ${styles['dropdown-item']}`}
                        href={{ pathname: subItem.href }}
                        onClick={onClick}
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Menu(props: HTMLAttributes<HTMLDivElement>) {
  const [collapsed, setCollapsed] = useState(true);

  const { width } = useWindowDimensions();

  const t = useTranslations('components/menu');
  const commonT = useTranslations('common');
  const { locale, switchLocale } = useLocaleContext();

  const collapse = () => setCollapsed(true);
  const link = useCallback((url: string) => (width == null || width > 768 ? url : '#'), [width]);

  const cbsoftMenuItem: NavbarItemProps = {
    title: t('cbsoft.titulo', { ano: appConfig.year }),
    items: [
      { title: t('cbsoft.sobre'), href: '/cbsoft' },
      { title: t('cbsoft.organizacao'), href: '/cbsoft/organization' },
      // { title: t('cbsoft.acomodacoes'), href: '/cbsoft/accommodation' },
      // { title: t('schedule.titulo'), href: '/schedule/calender' },
      { title: t('cbsoft.local'), href: '/cbsoft/location' },
      { title: t('cbsoft.codigo_conduta'), href: '/cbsoft/code-of-conduct' },
      { title: t('cbsoft.edicoes_anteriores'), href: '/cbsoft/previous-editions' },
    ],
  };

  const symposiumsMenuItem: NavbarItemProps = {
    title: t('symposiums.title'),
    items: ['sbes', 'sblp', 'sbcars', 'sast'].map((symposiums) => {
      return { title: commonT(symposiums), href: `/symposiums/${symposiums}/call` };
    }),
  };

  const workshopsMenuItem: NavbarItemProps = {
    title: t('workshops.titulo'),
    href: '/workshops',
    // items: [
    // { title: t('workshops.chamada_workshops'), href: '/workshops' },
    // { title: t('workshops.workshops_aceitos'), href: '/workshops/aceitos' },
    // {
    //   title: 'VEM',
    //   href: 'https://vemworkshop.github.io/vem2025',
    // },
    // {
    //   title: 'MSSIS',
    //   href: 'https://ww2.inf.ufg.br/mssis',
    // },
    // {
    //   title: 'ISE',
    //   href: 'https://www.virtus.ufcg.edu.br/iseworkshop',
    // },
    // {
    //   title: 'AIWARE LatAm',
    //   href: 'https://aiware-latam.github.io',
    // },
    // {
    //   title: 'WBots',
    //   href: 'https://w-bots.github.io/wbots/2025/',
    // },
    // {
    //   title: 'SE4Games',
    //   href: 'https://se4games2025.vercel.app',
    // },
    // {
    //   title: 'SE4FP',
    //   href: 'https://se4fp.github.io/2025',
    // },
    // {
    //   title: 'SEDT',
    //   href: 'https://sedt-workshop.github.io',
    // },
    // ],
  };

  const schoolMenuItem: NavbarItemProps = {
    title: t('escola.titulo'),
    href: '/latam-school',
    // items: [{ title: t('escola.call_for_participants'), href: '/latam-school' }],
  };

  const artifactsMenuItem: NavbarItemProps = {
    title: t('artifacts.titulo'),
    href: '/artifacts',
  };

  const menuItemsCollection = [
    // sbesMenuItem,
    // sblpMenuItem,
    // sbcarsMenuItem,
    // sastMenuItem,
    cbsoftMenuItem,
    symposiumsMenuItem,
    workshopsMenuItem,
    artifactsMenuItem,
    schoolMenuItem,
  ];

  const div = useRef<HTMLDivElement | null>(null);

  return (
    <header>
      <nav {...props} ref={div} className={`navbar navbar-expand-lg ${styles.navbar}`}>
        <Link className={`navbar-brand ${styles['navbar-brand']}`} href={{ pathname: '/' }} onClick={collapse}>
          <picture>
            <img src='/images/logos/cbsoft-logo.svg' alt='logo' />
          </picture>
        </Link>

        <button
          className={`navbar-toggler ${styles['navbar-toggler']}`}
          aria-label='Toggle navigation'
          onClick={() => setCollapsed(!collapsed)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div
          className={`${collapsed ? `collapse ${styles['collapse']}` : ''} navbar-collapse ${styles['navbar-collapse']}`}
          id='navbarNav'
        >
          <ul className={`navbar-nav ${styles['navbar-nav']}`} id='flags'>
            {menuItemsCollection.map((menuItem, index) => (
              <NavbarItem {...menuItem} key={index} onClick={collapse} />
            ))}

            <li className={`nav-item ${styles['nav-item']}`}>
              <button className={styles.flag} onClick={() => switchLocale(locale === 'pt' ? 'en' : 'pt')}>
                <picture>
                  <img src={`/images/icon/${locale === 'pt' ? 'pt' : 'en'}.png`} width='40' alt='' />
                </picture>
              </button>
            </li>
          </ul>
          {/* {
            <Link href={{ pathname: '/registration' }} className={styles.ticket} onClick={collapse}>
              <span> {t('inscricoes')}</span>
            </Link>
          } */}
        </div>
      </nav>
    </header>
  );
}
