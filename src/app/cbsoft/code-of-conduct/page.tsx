'use client';

import appConfig from '@/app/app.config';
import Title from '@/components/Title';
import { useTObject } from '@/hooks/useTObject';

export default function CodeOfConductPage() {
  const t = useTObject('pages/cbsoft/codeOfConduct');

  return (
    <section className='container' style={{ paddingTop: '50px' }}>
      <div>
        <Title titulo={t('titulo')} />
        {t('descricao', { ano: appConfig.year })}
      </div>
    </section>
  );
}
