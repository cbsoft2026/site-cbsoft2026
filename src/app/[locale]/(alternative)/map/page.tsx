import { createPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';
import MapWrapper from './MapWrapper';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'building' });
  const title = t('titulo');

  return createPageMetadata(title);
}

export default async function SchedulePage({ params }: Props) {
  const { locale } = await params;

  return <MapWrapper locale={locale} />;
}
