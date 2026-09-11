import CallComponent from '@/components/Call';
import Heading from '@/components/Heading';
import { createPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/special-activities' });
  const title = t('titulo');

  return createPageMetadata(title, [], params, import.meta.url);
}

export default async function CallPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/special-activities' });
  return (
    <article style={{ padding: '30px 0 0' }} data-pagefind-body>
      <header className='container' style={{ marginBottom: 56 }}>
        <Heading as='title'>{t('titulo')}</Heading>
      </header>
      <CallComponent className='container' acronym={'special-activities'} locale={locale}></CallComponent>
    </article>
  );
}
