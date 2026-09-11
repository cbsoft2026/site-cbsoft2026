import Heading from '@/components/Heading';

import { getTObject } from '@/lib/getTObject';
import { createPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/women-lunch/index' });
  const title = t('titulo');

  return createPageMetadata(title, [], params, import.meta.url);
}

export default async function WomenLunchPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTObject('pages/cbsoft/women-lunch/index', {}, locale);
  return (
    <section className='container' style={{ paddingTop: '50px' }} data-pagefind-body>
      <Heading as='title' align='center'>
        {t('titulo')}
      </Heading>
      {t('page')}
    </section>
  );
}
