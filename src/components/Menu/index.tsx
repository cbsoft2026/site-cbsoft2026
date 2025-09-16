'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLAttributes, useCallback, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';
import useWindowDimensions from '@/hooks/useWindowDimentions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTicket } from '@fortawesome/free-solid-svg-icons';
import appConfig from '@/app/app.config';
import { useLocaleContext } from '@/providers/LocaleProvider';

type NavbarItemProps = {
  title: string;
  title2?: string;
  href: string;
  items?: Array<NavbarItemProps>;
  className?: string;
  onClick?: () => any;
};

function NavbarItem(props: NavbarItemProps) {
  const { title, href, items, className, onClick } = props;
  const pathname = usePathname();

  return (
    <li
      className={`nav-item dropdown-slide ${styles['nav-item']} ${styles['dropdown-slide']} ${pathname.startsWith(href) ? styles.active : ''} ${className || ''}`}
    >
      {href.startsWith('https') ? (
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
  const { locale, switchLocale } = useLocaleContext();

  const collapse = () => setCollapsed(true);
  const link = useCallback((url: string) => (width == null || width > 768 ? url : '#'), [width]);

  const cbsoftMenuItem: NavbarItemProps = {
    title: t('cbsoft.titulo', { ano: appConfig.year }),
    href: '/about',
    items: [
      { title: t('cbsoft.organizacao'), href: '/about/organization' },
      { title: t('cbsoft.acomodacoes'), href: '/about/accommodation' },
      { title: t('cbsoft.local'), href: '/about/location' },
      { title: t('cbsoft.codigo_conduta'), href: '/about/code-of-conduct' },
      { title: t('cbsoft.edicoes_anteriores'), href: '/about/previous-editions' },
    ],
  };

  const sbesMenuItem: NavbarItemProps = {
    title: t('sbes.titulo'),
    href: '/sbes',
    items: [
      {
        title: t('sbes.pesquisa'),
        href: '/sbes/pesquisa',
        items: [
          { title: t('chamada_trabalhos'), href: '/sbes/pesquisa' },
          { title: t('artigos_aceitos'), href: '/sbes/pesquisa/artigos' },
        ],
      },
      {
        title: t('sbes.educacao'),
        href: '/sbes/educacao',
        items: [
          { title: t('chamada_trabalhos'), href: '/sbes/educacao' },
          { title: t('artigos_aceitos'), href: '/sbes/educacao/artigos' },
        ],
      },
      {
        title: t('sbes.ideias_inovadoras'),
        title2: t('sbes.ideias_inovadoras2'),
        href: '/sbes/ideias',
        items: [
          { title: t('chamada_trabalhos'), href: '/sbes/ideias' },
          { title: t('artigos_aceitos'), href: '/sbes/ideias/artigos' },
        ],
      },
      {
        title: t('sbes.ferramentas'),
        href: '/sbes/ferramentas',
        items: [
          { title: t('chamada_trabalhos'), href: '/sbes/ferramentas' },
          { title: t('artigos_aceitos'), href: '/sbes/ferramentas/artigos' },
        ],
      },
      {
        title: t('sbes.ctic'),
        href: link('/sbes/ctic'),
        items: [
          { title: t('chamada_trabalhos'), href: '/sbes/ctic' },
          { title: t('artigos_aceitos'), href: '/sbes/ctic/artigos' },
        ],
      },
      {
        title: t('sbes.ctd'),
        href: link('/sbes/ctd'),
        items: [
          { title: t('chamada_trabalhos'), href: '/sbes/ctd' },
          { title: t('artigos_aceitos'), href: '/sbes/ctd/artigos' },
        ],
      },
      {
        title: t('palestras'),
        href: '/sbes/palestras',
      },
      {
        title: t('painel'),
        href: '/sbes/painel',
      },
    ],
  };

  const sblpMenuItem: NavbarItemProps = {
    title: t('sblp'),
    href: '/sblp',
    items: [
      { title: t('chamada_trabalhos'), href: '/sblp' },
      { title: t('artigos_aceitos'), href: '/sblp/artigos' },
      { title: t('palestras'), href: '/sblp/palestras' },
      { title: t('tutorial'), href: '/sblp/tutorial' },
    ],
  };

  const sbcarsMenuItem: NavbarItemProps = {
    title: t('sbcars'),
    href: '/sbcars',
    items: [
      { title: t('chamada_trabalhos'), href: '/sbcars' },
      { title: t('artigos_aceitos'), href: '/sbcars/artigos' },
      { title: t('palestras'), href: '/sbcars/palestras' },
    ],
  };

  const sastMenuItem: NavbarItemProps = {
    title: t('sast'),
    href: '/sast',
    items: [
      { title: t('chamada_trabalhos'), href: '/sast' },
      { title: t('artigos_aceitos'), href: '/sast/artigos' },
      { title: t('palestras'), href: '/sast/palestras' },
    ],
  };

  const industriaMenuItem: NavbarItemProps = {
    title: t('trilha_industria'),
    href: '/trilha-industria',
    items: [
      { title: t('chamada_trabalhos'), href: '/trilha-industria' },
      { title: t('artigos_aceitos'), href: '/trilha-industria/artigos' },
    ],
  };

  const workshopsMenuItem: NavbarItemProps = {
    title: t('workshops.titulo'),
    href: '/workshops',
    items: [
      { title: t('workshops.chamada_workshops'), href: '/workshops' },
      { title: t('workshops.workshops_aceitos'), href: '/workshops/aceitos' },
      {
        title: 'VEM',
        href: 'https://vemworkshop.github.io/vem2025',
      },
      {
        title: 'MSSIS',
        href: 'https://ww2.inf.ufg.br/mssis',
      },
      {
        title: 'ISE',
        href: 'https://www.virtus.ufcg.edu.br/iseworkshop',
      },
      {
        title: 'AIWARE LatAm',
        href: 'https://aiware-latam.github.io',
      },
      {
        title: 'WBots',
        href: 'https://w-bots.github.io/wbots/2025/',
      },
      {
        title: 'SE4Games',
        href: 'https://se4games2025.vercel.app',
      },
      {
        title: 'SE4FP',
        href: 'https://se4fp.github.io/2025',
      },
      {
        title: 'SEDT',
        href: 'https://sedt-workshop.github.io',
      },
    ],
  };

  const schoolMenuItem: NavbarItemProps = {
    title: t('escola.titulo'),
    href: link('/escola'),
    items: [{ title: t('escola.call_for_participants'), href: '/escola' }],
  };

  const artifactsMenuItem: NavbarItemProps = {
    title: t('artifacts.titulo'),
    href: link('/artefatos'),
    items: [{ title: t('artifacts.call_for_artifacts'), href: '/artefatos' }],
  };

  const scheduleMenuItem: NavbarItemProps = {
    title: t('schedule.titulo'),
    href: link('/schedule/calender'),
  };

  const menuItemsCollection = [
    scheduleMenuItem,
    sbesMenuItem,
    sblpMenuItem,
    sbcarsMenuItem,
    sastMenuItem,
    industriaMenuItem,
    workshopsMenuItem,
    schoolMenuItem,
    artifactsMenuItem,
    cbsoftMenuItem,
  ];

  const div = useRef<HTMLDivElement | null>(null);

  return (
    <nav {...props} ref={div} className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <Link className={`navbar-brand ${styles['navbar-brand']}`} href={{ pathname: '/' }} onClick={collapse}>
        <picture>
          <img src='/images/logos/cbsoft-logo.svg' alt='logo' />
        </picture>
      </Link>

      <button className='navbar-toggler' aria-label='Toggle navigation' onClick={() => setCollapsed(!collapsed)}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`${collapsed ? 'collapse' : ''} navbar-collapse`} id='navbarNav'>
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
        {
          <Link href={{ pathname: '/registration' }} className={styles.ticket} onClick={collapse}>
            <FontAwesomeIcon icon={faTicket} size='lg' />
            <span> {t('inscricoes')}</span>
          </Link>
        }
      </div>
    </nav>
  );
}
