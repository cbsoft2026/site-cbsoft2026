import CallComponent from '@/components/Call';

type Props = {
  children: React.ReactNode;
  params: Promise<{ acronym: string; track: string }>;
};

export default async function CallPage({ params }: Props) {
  const { acronym, track } = await params;
  return <CallComponent acronym={acronym} track={track}></CallComponent>;
}
