import CallComponent from '@/components/Call';

type Props = {
  children: React.ReactNode;
  params: Promise<{ acronym: string }>;
};

export default async function CallPage({ params }: Props) {
  const { acronym } = await params;
  return <CallComponent acronym={acronym}></CallComponent>;
}
