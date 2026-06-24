'use client';

import { usePathname } from 'next/navigation';
import { HTMLAttributes, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import LinkLocale from '@/components/LinkLocale';
import Link from 'next/link';
import generatedCollection, { NavbarItemProps } from './menuCollection';
import useWindowDimensions from '@/hooks/useWindowDimentions';
import useNavbarVisibility from '@/hooks/useNavbarVisibility';
import { ClassNameDropdown, ClassNameLi, ClassNameUl, NavbarItem } from './NavbarItem';

const WIDTH_FLAG = 40;

function calculateMenuVisibility(
  items: NavbarItemProps[],
  refs: (HTMLLIElement | null)[],
  containerWidth: number,
  moreWidth: number,
  isMobile: boolean,
) {
  let used = moreWidth;

  const visible: NavbarItemProps[] = [];
  const hidden: NavbarItemProps[] = [];

  items.forEach((item, index) => {
    const width = refs[index]?.offsetWidth ?? 0;

    if (used + width > containerWidth) {
      if (isMobile) {
        visible.push(item);
      } else {
        hidden.push(item);
      }
      return;
    }

    used += width;
    visible.push(item);
  });

  return { visible, hidden };
}

export default function Menu(props: HTMLAttributes<HTMLDivElement>) {
  const [collapsed, setCollapsed] = useState(true);
  const [moreOpen, setMoreOpen] = useState(false);

  const pathname = usePathname();
  const locale = useLocale();

  const t = useTranslations('components/menu');
  const commonT = useTranslations('common');

  const collapse = () => {
    setCollapsed(true);
    setMoreOpen(false);
  };

  const visible = useNavbarVisibility();

  const div = useRef<HTMLDivElement | null>(null);

  const menuItemsCollection = useMemo(() => generatedCollection(t, commonT), [t, commonT]);

  const containerRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const moreRef = useRef<HTMLLIElement>(null);

  const [visibleItems, setVisibleItems] = useState<NavbarItemProps[]>(menuItemsCollection);
  const [hidden, setHidden] = useState<NavbarItemProps[]>([]);

  const { width: widthWindow } = useWindowDimensions();

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const calculate = () => {
      const containerWidth = (containerRef.current?.offsetWidth ?? 0) - 2 * WIDTH_FLAG;
      const moreWidth = moreRef.current?.offsetWidth ?? 0;

      const { visible, hidden } = calculateMenuVisibility(
        menuItemsCollection,
        itemRefs.current,
        containerWidth,
        moreWidth,
        widthWindow && widthWindow < 992 ? true : false,
      );

      setVisibleItems(visible);
      setHidden(hidden);
    };

    const ro = new ResizeObserver(calculate);
    ro.observe(el);

    calculate();

    return () => ro.disconnect();
  }, [collapsed]);

  return (
    <>
      <nav
        {...props}
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
      <nav {...props} ref={div} className={`navbar navbar-expand-lg ${styles.navbar} ${styles['navbar__stick']}`}>
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
          <ul className={`${ClassNameUl} ${styles.measurer}`}>
            {menuItemsCollection.map((item, i) => (
              <NavbarItem
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                {...item}
                key={i}
                onClick={collapse}
              />
            ))}
          </ul>
          <ul ref={containerRef} className={ClassNameUl} id='flags'>
            {visibleItems.map((menuItem, index) => (
              <NavbarItem {...menuItem} key={index} onClick={collapse} />
            ))}
            {hidden.length > 0 && (
              <li ref={moreRef} className={`${ClassNameLi} dropdown position-relative`}>
                <button
                  className='btn btn-link nav-link dropdown-toggle'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                  onClick={() => setMoreOpen(!moreOpen)}
                >
                  {t('more')}
                </button>

                <ul className={`${ClassNameDropdown} ${moreOpen ? 'show' : ''}`}>
                  {hidden.map((menuItem, index) => (
                    <NavbarItem
                      {...menuItem}
                      className={`dropdown-item ${styles['dropdown-item']}`}
                      key={index}
                      onClick={collapse}
                    />
                  ))}
                </ul>
              </li>
            )}
            <li className={ClassNameLi}>
              <LinkLocale href={pathname} locale={locale === 'pt' ? 'en' : 'pt'} className={styles.flag}>
                <picture>
                  <img
                    src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/icon/${locale === 'pt' ? 'en' : 'pt'}.png`}
                    width={WIDTH_FLAG}
                    alt={locale}
                    style={{ minWidth: `${WIDTH_FLAG}px` }}
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
