import React from 'react';

type Props = {
  children: React.ReactNode;
  params: Promise<{ track: string }>;
};

export async function generateStaticParams() {
  return [{ track: 'ctd' }, { track: 'ctic' }];
}

export default async function AcronymLayout({ children }: Props) {
  return <>{children}</>;
}
