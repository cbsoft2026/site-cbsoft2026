import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string; acronym: string }>;
};

export default async function SchedulePage({ params }: Props) {
  const { locale } = await params;
  return redirect(`/${locale}/schedule/calender`);
}
