'use client';

import appConfig from '@/app/app.config';
import Title from '@/components/Title';
import { useTObject } from '@/hooks/useTObject';

export default function CodeOfConductPage() {
  const t = useTObject('pages/cbsoft/codeOfConduct');

  return (
    <article className='container' style={{ paddingTop: '50px' }}>
      <header>
        <Title titulo={t('titulo')} />
      </header>
      <section>
        {t('descricao', { ano: appConfig.year })}
      </section>
    </article>
  );
}
