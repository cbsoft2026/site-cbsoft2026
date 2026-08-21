import { usePathname } from 'next/navigation';
import { NavbarItemProps } from './menuCollection';
import { useLocale } from 'next-intl';

import LinkLocale from '@/components/LinkLocale';
import styles from './styles.module.scss';
import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

export const ClassNameUl = `navbar-nav ${styles['navbar-nav']}`;

export const ClassNameLi = `nav-item ${styles['nav-item']}`;

export const ClassNameA = `nav-link ${styles['nav-link']}`;

export const ClassNameDropdown = `dropdown-menu ${styles['dropdown-menu']} dropdown-menu-end`;

type SubitemProps = {
  item: NavbarItemProps;
  onClick?: () => any;
  locale: string;
  dropdown?: boolean;
};

function Subitem(props: SubitemProps) {
  const { item, onClick, locale, dropdown } = props;

  return (
    <li
      className={
        item.dropdown != false && dropdown != false
          ? `dropdown-item ${styles['dropdown-item']}`
          : styles['category-item']
      }
    >
      {item.href?.startsWith('https') ? (
        <a className={ClassNameA} href={item.href} target='_blank' rel='noopener noreferrer'>
          {item.title}
        </a>
      ) : (
        <LinkLocale
          className={ClassNameA}
          href={{ pathname: item.items && item.items?.length > 0 ? undefined : item.href }}
          onClick={!item.items?.length ? onClick : undefined}
          locale={locale}
        >
          {item.title}
          {item.items?.length && item.dropdown != false ? <FontAwesomeIcon icon={faAnglesRight} /> : ''}
        </LinkLocale>
      )}
      {item.items && (
        <ul className={item.dropdown != false ? `submenu dropdown-menu ${styles['submenu']}` : styles['category-menu']}>
          {item.items.map((subItem, j) => (
            // <li key={j} className={item.dropdown != false ? `dropdown-item ${styles['dropdown-item']}` : styles['category-item']}>
            //   <LinkLocale
            //     className={ClassNameA}
            //     href={{ pathname: subItem.href }}
            //     onClick={onClick}
            //     locale={locale}
            //   >
            //     {subItem.title}
            //   </LinkLocale>
            // </li>
            <Subitem key={j} item={subItem} locale={locale} onClick={onClick} dropdown={item.dropdown} />
          ))}
        </ul>
      )}
    </li>
  );
}

function NavbarItemComponent(props: NavbarItemProps, ref: React.Ref<HTMLLIElement>) {
  const { title, href, items, className, onClick } = props;

  const pathname = usePathname();
  const locale = useLocale();

  const isActive = href && pathname.includes(href);

  return (
    <li
      ref={ref}
      className={`
        ${ClassNameLi}
        dropdown-slide
        ${styles['dropdown-slide']}
        ${isActive ? styles.active : ''}
        ${className || ''}
        `}
    >
      {href?.startsWith('https') ? (
        <a className={ClassNameA} href={href} target='_blank' rel='noopener noreferrer'>
          {title}
        </a>
      ) : (
        <LinkLocale className={ClassNameA} href={{ pathname: items ? undefined : href }} locale={locale}>
          {title}
        </LinkLocale>
      )}
      {items && (
        <ul className={ClassNameDropdown}>
          {items?.map((item, i) => (
            <Subitem key={i} item={item} locale={locale} onClick={onClick} />
          ))}
        </ul>
      )}
    </li>
  );
}

export const NavbarItem = forwardRef(NavbarItemComponent);
NavbarItem.displayName = 'NavbarItem';
