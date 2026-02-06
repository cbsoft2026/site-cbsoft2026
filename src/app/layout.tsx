import '@/app/styles/globals.scss';

import localFont from 'next/font/local';
import appConfig from '@/app/app.config';
import { Metadata } from 'next';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

const gothamBlack = localFont({
  src: '../../public/fonts/gotham-font/Gotham-Bold.otf',
  variable: '--font-gotham-bold',
  weight: '700',
  style: 'normal',
});

export const metadata: Metadata = {
  title: {
    default: `CBSoft ${appConfig.year}`,
    template: `%s | CBSoft ${appConfig.year}`,
  },
  openGraph: {
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    title: `CBSoft ${appConfig.year}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logos/cbsoft-logo.png`,
        width: 1200,
        height: 630,
        alt: 'logo',
        type: 'image/png',
      },
    ],
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_ASSET_PREFIX}/favicon.ico`,
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html className={gothamBlack.variable}>
      <body>{children}</body>
    </html>
  );
}
