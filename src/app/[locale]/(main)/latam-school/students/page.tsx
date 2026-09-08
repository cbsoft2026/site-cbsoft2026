import Title from '@/components/Title';
import { getTranslations } from 'next-intl/server';
import { createPageMetadata } from '@/lib/metadata';
import { getTObject } from '@/lib/getTObject';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const program = 'latam-school';
  const { locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const menuT = await getTranslations({ locale, namespace: 'components/menu' });
  const title = `${commonT(program)} - ${menuT('latam-school.students')}`;

  return createPageMetadata(title);
}

export default async function LatamSchoolStudentsPage({ params }: Props) {
  const program = 'latam-school';
  const { locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  const menuT = await getTranslations({ locale, namespace: 'components/menu' });
  const t = await getTObject('pages/latamschool-students', {}, locale);
  return (
    <section className='container' style={{ paddingTop: '50px' }} data-pagefind-body>
      <Title titulo={`${commonT(program)} - ${menuT('latam-school.students')}`} align='center' />
      {t('page')}
    </section>
  );
}
