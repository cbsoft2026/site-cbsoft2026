'use client';

import { usePathname } from 'next/navigation';
import { HTMLAttributes, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import appConfig from '@/app/app.config';
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

  const pathname = usePathname();
  const locale = useLocale();

  const t = useTranslations('components/menu');
  const commonT = useTranslations('common');

  const collapse = () => setCollapsed(true);

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

  const sbesMenuItem: NavbarItemProps = {
    title: commonT('sbes'),
    items: [
      { title: commonT('siglas.trilhas.special'), href: '/symposiums/sbes/special/call' },
      { title: commonT('siglas.trilhas.pesquisa'), href: '/symposiums/sbes/pesquisa/call' },
      { title: commonT('siglas.trilhas.educacao'), href: '/symposiums/sbes/educacao/call' },
      { title: commonT('siglas.trilhas.ideias'), href: '/symposiums/sbes/ideias/call' },
      { title: commonT('siglas.trilhas.tools'), href: '/symposiums/sbes/tools/call' },
      { title: commonT('siglas.trilhas.industry'), href: '/symposiums/sbes/industry/call' },
      { title: commonT('siglas.trilhas.ctic'), href: '/symposiums/sbes/ctic/call' },
      { title: commonT('siglas.trilhas.ctd'), href: '/symposiums/sbes/ctd/call' },
    ],
  };

  const sblpMenuItem: NavbarItemProps = {
    title: commonT('sblp'),
    href: '/symposiums/sblp/call',
  };

  const sbcarsMenuItem: NavbarItemProps = {
    title: commonT('sbcars'),
    href: '/symposiums/sbcars/call',
  };

  const sastMenuItem: NavbarItemProps = {
    title: commonT('sast'),
    href: '/symposiums/sast/call',
  };

  const workshopsMenuItem: NavbarItemProps = {
    title: commonT('siglas.workshops'),
    href: '/workshops',
  };

  const schoolMenuItem: NavbarItemProps = {
    title: commonT('latam-school'),
    href: '/latam-school',
  };

  const artifactsMenuItem: NavbarItemProps = {
    title: commonT('siglas.artifacts'),
    href: '/artifacts',
  };

  const menuItemsCollection = [
    cbsoftMenuItem,
    sbesMenuItem,
    sblpMenuItem,
    sbcarsMenuItem,
    sastMenuItem,
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
          <img src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/logos/cbsoft-logo.svg`} alt='logo' />
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
                <img
                  src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/icon/${locale === 'pt' ? 'pt' : 'en'}.png`}
                  width='40'
                  alt=''
                />
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
