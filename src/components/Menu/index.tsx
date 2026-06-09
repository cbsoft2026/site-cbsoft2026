'use client';

import { usePathname } from 'next/navigation';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import LinkLocale from '@/components/LinkLocale';
import Link from 'next/link';
import generatedCollection, { NavbarItemProps } from './menuCollection';

function NavbarItem(props: NavbarItemProps) {
  const { title, href, items, className, onClick, dropdownActive } = props;
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
        <LinkLocale
          className={`nav-link ${styles['nav-link']}`}
          href={{ pathname: items || dropdownActive == true ? undefined : href }}
          locale={locale}
        >
          {title}
        </LinkLocale>
      )}
      {items && dropdownActive != false && (
        <ul className={`dropdown-menu ${styles['dropdown-menu']}`}>
          {items?.map((item, i) => (
            <li key={i}>
              <LinkLocale
                className={`dropdown-item ${styles['dropdown-item']}`}
                href={{ pathname: item.href }}
                onClick={!item.items?.length ? onClick : undefined}
                locale={locale}
              >
                {`${item.title} ${item.items?.length && item.dropdownActive != false ? '&raquo;' : ''}`}
              </LinkLocale>
              {item.items && item.dropdownActive != false && (
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

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const atTop = window.scrollY === 0;

      if (atTop && e.deltaY < 0) {
        setVisible(true);
      }

      if (e.deltaY > 0) {
        setVisible(false);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const div = useRef<HTMLDivElement | null>(null);

  const menuItemsCollection = generatedCollection(t, commonT);

  return (
    <>
      <nav
        {...props}
        ref={div}
        className={`navbar ${styles.navbar} ${styles['navbar__organized-by']} ${visible ? styles['organized-by--visible'] : ''}`}
      >
        <Link
          className={`navbar-brand ${styles['navbar-brand']}`}
          href={'http://www.sbc.org.br'}
          target='_blank'
          rel='noopener noreferrer'
        >
          Realização:
          <picture>
            <img src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/logos/sbc-logo.svg`} alt='sbc logo' />
          </picture>
        </Link>
      </nav>
      <nav {...props} ref={div} className={`navbar navbar-expand-xl ${styles.navbar} ${styles['navbar__stick']}`}>
        <LinkLocale
          className={`navbar-brand ${styles['navbar-brand']}`}
          href={{ pathname: '/' }}
          locale={locale}
          onClick={collapse}
        >
          <picture>
            <source
              srcSet={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/logos/cbsoft-logo-icon.svg`}
              media='(max-width: 576px)'
            />
            <source
              srcSet={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/logos/cbsoft-logo.svg`}
              media='(max-width: 1200px)'
            />
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
                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/icon/${locale === 'pt' ? 'en' : 'pt'}.png`}
                    width='40'
                    alt={locale}
                    style={{ minWidth: '40px' }}
                  />
                </picture>
              </LinkLocale>
            </li>
          </ul>
          <LinkLocale href={{ pathname: '/registration' }} className={styles.ticket} onClick={collapse} locale={locale}>
            <span> {t('inscricoes')}</span>
          </LinkLocale>
        </div>
      </nav>
    </>
  );
}
