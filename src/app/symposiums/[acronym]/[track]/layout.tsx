import { trackValues } from '@/types/papers';
import React from 'react';

type Props = {
  children: React.ReactNode;
  params: Promise<{ track: string }>;
};

export async function generateStaticParams() {
  return trackValues.map((track) => {
    return { track: track };
  });
}

export default async function AcronymLayout({ children }: Props) {
  return <>{children}</>;
}
