'use client';

import styles from './styles.module.scss';

import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import useWindowDimensions from '@/hooks/useWindowDimentions';
import LinkLocale from '@/components/LinkLocale';

import { ReactElement, ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

type LayoutContextType = {
  openAsideBar: boolean | null;
  toggleOpenAsideBar: () => void;
  width: number | null;
};

const LayoutContext = createContext<LayoutContextType | null>(null);

function useLayout() {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('Layout components must be used inside <Layout>');
  }

  return context;
}

type SidebarProps = {
  footnote?: ReactNode;
  children?: ReactNode;
  locale: string;
};

type HeaderProps = {
  title?: ReactNode;
  children?: ReactNode;
  locale: string;
};

type PanelProps = {
  children?: ReactNode;
  locale: string;
};

type LayoutProps = {
  children: ReactElement[];
  locale: string;
};

function Layout(props: LayoutProps) {
  const { children } = props;

  const [sidebar, header, panel] = children;
  const { width } = useWindowDimensions();
  const [openAsideBar, setOpenAsideBar] = useState<boolean | null>(null);

  useEffect(() => {
    setOpenAsideBar(width != null && width > 768);
  }, [width]);

  const toggleOpenAsideBar = useCallback(() => {
    setOpenAsideBar((prev) => !prev);
  }, []);

  return (
    <LayoutContext.Provider value={{ openAsideBar, toggleOpenAsideBar, width }}>
      {sidebar}
      <main>
        {header}
        {panel}
      </main>
    </LayoutContext.Provider>
  );
}

Layout.Panel = function Panel(props: PanelProps) {
  const { children } = props;

  return <div className={styles['layout__wrapper']}>{children}</div>;
};

Layout.Header = function Header(props: HeaderProps) {
  const { title, children } = props;

  const { openAsideBar, toggleOpenAsideBar } = useLayout();

  return (
    <header>
      <div>
        <div
          onClick={toggleOpenAsideBar}
          className={`
            ${styles.icon}
            ${styles.less}
            ${styles['icon--small']}
            ${openAsideBar !== null ? (openAsideBar ? styles.open : styles.closed) : ''}
          `}
        >
          <FontAwesomeIcon icon={faClose} className={styles.closeIcon} />
          <FontAwesomeIcon icon={faBars} className={styles.barsIcon} />
        </div>
        {title}
      </div>
      {children}
    </header>
  );
};

Layout.Sidebar = function Sidebar(props: SidebarProps) {
  const { footnote, children, locale } = props;

  const { openAsideBar, toggleOpenAsideBar, width } = useLayout();

  return (
    <aside
      className={styles.aside}
      {...(openAsideBar !== null
        ? {
            style: {
              '--aside-display': openAsideBar ? 'flex' : 'none',
            } as React.CSSProperties,
          }
        : {})}
    >
      <div>
        <header>
          <LinkLocale className={styles['aside-logo']} href={{ pathname: '/' }} locale={locale}>
            <picture>
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSET_PREFIX}/images/logos/cbsoft-logo.svg`}
                alt='logo'
                width={210}
                height={47}
                priority
              />
            </picture>
          </LinkLocale>
          {width && width <= 768 && (
            <div onClick={toggleOpenAsideBar} className={`${styles.icon} ${styles.less} ${styles['icon--small']} `}>
              <FontAwesomeIcon icon={faClose} />
            </div>
          )}
        </header>
        {children}
      </div>
      <div>{footnote}</div>
    </aside>
  );
};

export default Layout;
