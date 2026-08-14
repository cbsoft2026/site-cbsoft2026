import Title from '@/components/Title';
import { getTranslations } from 'next-intl/server';
import CategoryEventsList, { getCategoryEvents } from '@/components/EventsList/CategoryEventsList';
import { locales } from '@/app/config/locales';
import { EventStructureType, programs } from '@/app/config/event-structure';
import { createPageMetadata } from '@/lib/metadata';

type Props = {
  params: Promise<{ program: EventStructureType; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { program, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  const title = t(program);

  return createPageMetadata(title);
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

export default async function PapersPage({ params }: Props) {
  const { program, locale } = await params;

  const t = await getTranslations({ locale, namespace: 'components/menu' });
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const symposiumsT = await getTranslations({ locale, namespace: 'pages/symposiums' });

  const events = await getCategoryEvents(locale, (event) => event.type === 'artigo' && event.simposio === program);

  return (
    <>
      <div className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`siglas.${program}`)} - ${t('artigos_aceitos')}`}></Title>
      </div>

      <CategoryEventsList events={events} locale={locale} emptyMessage={symposiumsT('emptyPapers')} />
    </>
  );
}
