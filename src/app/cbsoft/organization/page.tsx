'use client';

import { OrganizadorGrupo } from '@/components/Organizers';
import Title from '@/components/Title';
import { organizers } from '@/data';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

export default function OrganizationPage() {
  const t = useTranslations('pages/cbsoft/organization');
  const commonT = useTranslations('common');

  const groups = Object.groupBy(organizers, (record) => {
    return record.category + (record.subcategory ? '-' + record.subcategory : '');
  });

  return (
    <section>
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
