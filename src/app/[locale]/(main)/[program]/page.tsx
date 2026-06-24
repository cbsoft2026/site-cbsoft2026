import { getTranslations } from 'next-intl/server';

import CallComponent from '@/components/Call';
import Title from '@/components/Title';
import { createPageMetadata } from '@/lib/metadata';
import { locales } from '@/app/config/locales';
import { EventStructureType, programs } from '@/app/config/event-structure';
import { redirect } from 'next/navigation';
import { withUTM } from '@/utils/utm';

type Props = {
  params: Promise<{ program: EventStructureType; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { program, locale } = await params;
  return createPageMetadata(locale, 'common', program);
}

export async function generateStaticParams() {
  const params = locales.flatMap((locale) =>
    programs.map((program) => ({
      locale: locale,
      program: program.slug,
    })),
  );
  return params;
}

export default async function ProgramPage({ params }: Props) {
  const { program, locale } = await params;
  const programScheme = programs.find((programItem) => programItem.slug == program);

  if (programScheme?.type === 'external') {
    redirect(withUTM(programScheme?.url));
  }

  const commonT = await getTranslations({ locale, namespace: 'common' });
  return (
    <article style={{ padding: '30px 0 0' }}>
      <header className='container' style={{ marginBottom: 56 }}>
        <Title titulo={commonT(program)}></Title>
      </header>
      <CallComponent className='container' acronym={program} locale={locale}></CallComponent>
    </article>
  );
}
