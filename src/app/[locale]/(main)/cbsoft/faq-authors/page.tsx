import Title from '@/components/Title';

import { getTObject } from '@/lib/getTObject';
import { createPageMetadata } from '@/lib/metadata';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, 'pages/cbsoft/faqAuthors/index', 'titulo');
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
