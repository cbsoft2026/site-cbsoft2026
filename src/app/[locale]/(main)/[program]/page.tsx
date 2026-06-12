import { getTranslations } from 'next-intl/server';

import CallComponent from '@/components/Call';
import Title from '@/components/Title';
import { createPageMetadata } from '@/lib/metadata';
import { locales } from '@/types/locales';
import { EventStructureType, programs } from '@/app/config/event-structure';

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
      locale,
      program,
    })),
  );
  return params;
}

export default async function ProgramPage({ params }: Props) {
  const { program, locale } = await params;
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
