import appConfig from '@/app/app.config';
import Heading from '@/components/Heading';
import { getTObject } from '@/lib/getTObject';
import { createPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/codeOfConduct' });
  const title = t('titulo');

  return createPageMetadata(title);
}

export default async function CodeOfConductPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTObject('pages/cbsoft/codeOfConduct', {}, locale);

  return (
    <article className='container' style={{ paddingTop: '50px' }} data-pagefind-body>
      <header>
        <Heading as='title'>{t('titulo')}</Heading>
      </header>
      <section>{t('descricao', { ano: appConfig.year })}</section>
    </article>
  );
}
