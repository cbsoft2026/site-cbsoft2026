import Title from '@/components/Title';

import { getTObject } from '@/lib/getTObject';
import { createPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/faqAuthors/index' });
  const title = t('titulo');

  return createPageMetadata(title);
}

export default async function FaqAuthorsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTObject('pages/cbsoft/faqAuthors/index', {}, locale);
  return (
    <section className='container' style={{ paddingTop: '50px' }}>
      <Title titulo={t('titulo')} align='center' />
      {t('page')}
    </section>
  );
}
