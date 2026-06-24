import { usePathname } from 'next/navigation';
import { NavbarItemProps } from './menuCollection';
import { useLocale } from 'next-intl';

import LinkLocale from '@/components/LinkLocale';
import styles from './styles.module.scss';
import { forwardRef } from 'react';

export const ClassNameUl = `navbar-nav ${styles['navbar-nav']}`;

export const ClassNameLi = `nav-item ${styles['nav-item']}`;

export const ClassNameA = `nav-link ${styles['nav-link']}`;

export const ClassNameDropdown = `dropdown-menu ${styles['dropdown-menu']} dropdown-menu-end`;

function NavbarItemComponent(props: NavbarItemProps, ref: React.Ref<HTMLLIElement>) {
  const { title, href, items, className, onClick, dropdownActive } = props;

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
        <LinkLocale
          className={ClassNameA}
          href={{ pathname: items || dropdownActive == true ? undefined : href }}
          locale={locale}
        >
          {title}
        </LinkLocale>
      )}
      {items && dropdownActive != false && (
        <ul className={ClassNameDropdown}>
          {items?.map((item, i) => (
            <li key={i} className={`dropdown-item ${styles['dropdown-item']}`}>
              <LinkLocale
                className={`${ClassNameA}`}
                href={{ pathname: item.href }}
                onClick={!item.items?.length ? onClick : undefined}
                locale={locale}
              >
                {`${item.title} ${item.items?.length && item.dropdownActive != false ? '&raquo;' : ''}`}
              </LinkLocale>
              {item.items && item.dropdownActive != false && (
                <ul className={`submenu dropdown-menu ${styles['submenu']}`}>
                  {item.items.map((subItem, j) => (
                    <li key={j} className={`dropdown-item ${styles['dropdown-item']}`}>
                      <LinkLocale
                        className={ClassNameA}
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

export const NavbarItem = forwardRef(NavbarItemComponent);
NavbarItem.displayName = 'NavbarItem';
