'use client';

import { usePathname } from 'next/navigation';
import { HTMLAttributes, useCallback, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import appConfig from '@/app/app.config';
import useWindowDimensions from '@/hooks/useWindowDimentions';
import LinkLocale from '../LinkLocale';

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
  const locale = useLocale();

  return (
    <li
      className={`nav-item dropdown-slide ${styles['nav-item']} ${styles['dropdown-slide']} ${href && pathname.includes(href) ? styles.active : ''} ${className || ''}`}
    >
      {href && href.startsWith('https') ? (
        <a className={`nav-link ${styles['nav-link']}`} href={href} target='_blank' rel='noopener noreferrer'>
          {title}
        </a>
      ) : (
        <LinkLocale className={`nav-link ${styles['nav-link']}`} href={{ pathname: href }} locale={locale}>
          {title}
        </LinkLocale>
      )}
      {items && (
        <ul className={`dropdown-menu ${styles['dropdown-menu']}`}>
          {items?.map((item, i) => (
            <li key={i}>
              <LinkLocale
                className={`dropdown-item ${styles['dropdown-item']}`}
                href={{ pathname: item.href }}
                onClick={!item.items?.length ? onClick : undefined}
                locale={locale}
              >
                {`${item.title} ${item.items?.length ? '&raquo;' : ''}`}
              </LinkLocale>
              {item.items && (
                <ul className={`submenu ${styles['submenu']}`}>
                  {item.items.map((subItem, j) => (
                    <li key={j}>
                      <LinkLocale
                        className={`dropdown-item ${styles['dropdown-item']}`}
                        href={{ pathname: subItem.href }}
                        onClick={onClick}
                        locale={locale}
                      >
                        {subItem.title}
                      </LinkLocale>
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

  // const { width } = useWindowDimensions();
  const pathname = usePathname();
  const locale = useLocale();

  const t = useTranslations('components/menu');
  const commonT = useTranslations('common');

  const collapse = () => setCollapsed(true);
  // const link = useCallback((url: string) => (width == null || width > 768 ? url : '#'), [width]);

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
    <nav {...props} ref={div} className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <LinkLocale
        className={`navbar-brand ${styles['navbar-brand']}`}
        href={{ pathname: '/' }}
        locale={locale}
        onClick={collapse}
      >
        <picture>
          <img src='/images/logos/cbsoft-logo.svg' alt='logo' />
        </picture>
      </LinkLocale>

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
            <LinkLocale href={pathname} locale={locale === 'pt' ? 'en' : 'pt'} className={styles.flag}>
              <picture>
                <img src={`/images/icon/${locale === 'pt' ? 'pt' : 'en'}.png`} width='40' alt='' />
              </picture>
            </LinkLocale>
          </li>
        </ul>
        {/* {
          <LinkLocale href={{ pathname: '/registration' }} className={styles.ticket} onClick={collapse} locale={locale}>
            <span> {t('inscricoes')}</span>
          </LinkLocale>
        } */}
      </div>
    </nav>
  );
}
