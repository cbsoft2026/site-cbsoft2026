import CallComponent from '@/components/Call';

type Props = {
  children: React.ReactNode;
  params: Promise<{ acronym: string; track: string }>;
};

export default async function CallPage({ params }: Props) {
  const { acronym, track } = await params;
  return (
    <div className='container'>
      <CallComponent acronym={acronym}></CallComponent>
    </div>
  )
}
