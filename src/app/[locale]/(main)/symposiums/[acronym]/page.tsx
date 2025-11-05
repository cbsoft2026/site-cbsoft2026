import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: Promise<{ acronym: string }>;
};

export default async function SymposiumsPage({ params }: Props) {
  const { acronym } = await params;
  return redirect(`/symposiums/${acronym}/call`);
}
