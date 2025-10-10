import CallComponent from '@/components/Call';

import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode;
  params: Promise<{ acronym: string }>;
};

export default async function CallPage({ params }: Props) {
  const { acronym } = await params;
  return (
    <div className='container'>
      <CallComponent acronym={acronym}></CallComponent>
    </div>
  );
}
