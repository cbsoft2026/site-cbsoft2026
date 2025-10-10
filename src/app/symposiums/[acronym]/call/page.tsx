'use client';

import CallComponent from '@/components/Call';
import Title from '@/components/Title';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function CallPage() {
  const { acronym }: { acronym: string } = useParams();
  const commonT = useTranslations('common');
  return (
    <>
      <div className='container' style={{ marginBottom: 56, paddingRight: 560 }}>
        <Title titulo={`${commonT(`siglas.${acronym}`)} (${commonT(`${acronym}`)})`}></Title>
      </div>
      <div className='container'>
        <CallComponent acronym={acronym}></CallComponent>
      </div>
    </>
  );
}
