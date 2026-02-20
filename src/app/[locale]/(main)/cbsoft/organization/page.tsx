import { OrganizadorGrupo } from '@/components/Organizers';
import Title from '@/components/Title';
import { organizers } from '@/data';
import { createPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';
import { JSX } from 'react';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, 'pages/cbsoft/organization', 'titulo');
}

export default async function OrganizationPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages/cbsoft/organization' });
  const commonT = await getTranslations({ locale, namespace: 'common' });

  const groups = Object.groupBy(organizers, (record) => {
    return record.category + (record.subcategory ? '-' + record.subcategory : '');
  });

  return (
    <section style={{ paddingTop: '50px' }}>
      <Title titulo={t('titulo')} align='center' />
      {Object.entries(groups).reduce((components, [group, data]) => {
        const [groupName] = group.split('-');
        const title = t.has(groupName) ? t(groupName) : groupName.toUpperCase();

        return components.concat(
          data?.map(({ subcategory, chairs }, index) => {
            return (
              <OrganizadorGrupo
                title={subcategory ? `${title} - ${commonT(`siglas.trilhas.${subcategory}`)}` : title}
                chairs={chairs}
                key={`${group}-${index}`}
              />
            );
          }) || [],
        );
      }, Array<JSX.Element>())}
    </section>
  );
}
