import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string; acronym: string }>;
};

export default async function SymposiumsPage({ params }: Props) {
  const { locale, acronym } = await params;
  return redirect(`/${locale}/symposiums/${acronym}/call`);
}
