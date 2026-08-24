'use client';

import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

type Props = {
  placeholder?: string;
};

let pagefindPromise: Promise<void> | null = null;

const basepath = `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/pagefind`;

function loadPagefind(locale: string) {
  if (pagefindPromise) {
    return pagefindPromise;
  }

  pagefindPromise = new Promise((resolve, reject) => {
    if (!document.querySelector('link[data-pagefind-component-ui]')) {
      const link = document.createElement('link');

      link.rel = 'stylesheet';
      link.href = `${basepath}/${locale}/pagefind-component-ui.css`;
      link.dataset.pagefindComponentUi = 'true';

      document.head.appendChild(link);
    }

    if (customElements.get('pagefind-modal')) {
      resolve();
      return;
    }

    const script = document.createElement('script');

    script.src = `${basepath}/${locale}/pagefind-component-ui.js`;
    script.async = true;
    script.dataset.pagefindComponentUi = 'true';

    script.onload = () => resolve();

    script.onerror = () => {
      pagefindPromise = null;
      reject(new Error('Failed to load Pagefind Component UI'));
    };

    document.body.appendChild(script);
  });

  return pagefindPromise;
}

export default function Search({ placeholder }: Props) {
  const [loaded, setLoaded] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    loadPagefind(locale)
      .then(() => {
        setLoaded(true);
      })
      .catch(console.error);
  }, [locale]);

  useEffect(() => {
    if (!loaded) return;

    const trigger = document.querySelector('pagefind-modal-trigger');

    const text = trigger?.querySelector('.pf-trigger-text');

    if (text) {
      text.textContent = placeholder ?? 'Search';
    }
  }, [loaded, placeholder]);

  if (!loaded) {
    return null;
  }

  return (
    <div className={styles.searchContainer}>
      <pagefind-config
        lang={locale}
        bundle-path={`${basepath}/${locale}/`}
        base-url={`${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/`}
        highlight-param={'highlight'}
      ></pagefind-config>
      <pagefind-modal-trigger />

      <pagefind-modal />
    </div>
  );
}
