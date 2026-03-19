import '@/app/styles/globals.scss';

import localFont from 'next/font/local';
import appConfig from '@/app/app.config';
import { Metadata } from 'next';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

const alegreyaSansUltraBold = localFont({
  src: '../../public/fonts/alegreya-sans/AlegreyaSans-ExtraBold.ttf',
  variable: '--font-alegreya-sans-ultra-bold',
  weight: '800',
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
    <html className={alegreyaSansUltraBold.variable}>
      <body>{children}</body>
    </html>
  );
}
