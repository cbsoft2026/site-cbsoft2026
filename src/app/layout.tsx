import '@/app/styles/globals.scss';

import localFont from 'next/font/local';
import appConfig from '@/app/app.config';
import { Metadata } from 'next';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

const gothamBlack = localFont({
  src: '../../public/fonts/gotham-font/Gotham-Black.otf',
  variable: '--font-gotham-black',
  weight: '900',
  style: 'normal',
});

export const metadata: Metadata = {
  title: {
    default: `CBSoft ${appConfig.year}`,
    template: `%s | CBSoft ${appConfig.year}`,
  },
  icons: {
    icon: '/favicon.ico',
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
