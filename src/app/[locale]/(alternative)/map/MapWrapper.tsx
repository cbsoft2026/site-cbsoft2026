'use client';

import dynamic from 'next/dynamic';

const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
});

type Props = {
  locale: string;
};

export default function Page(props: Props) {
  const { locale } = props;

  return <MapContent locale={locale} />;
}
