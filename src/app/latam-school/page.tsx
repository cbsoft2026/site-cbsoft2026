'use client';

import CallComponent from '@/components/Call';
import Title from '@/components/Title';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function CallPage() {
  const commonT = useTranslations('common');
  return (
    <div style={{padding: "30px 60px 0"}}>
      <div className='container' style={{ marginBottom: 56, paddingRight: 560 }}>
        <Title titulo={`${commonT(`siglas.latam-school`)}`}></Title>
      </div>
      <div className='container'>
        <CallComponent acronym={"latam-school"}></CallComponent>
      </div>
    </div>
  );
}
