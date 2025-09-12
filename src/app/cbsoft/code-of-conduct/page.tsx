'use client';

import appConfig from '@/app/app.config';
import Title from '@/components/Title';
import { useTObject } from '@/hooks/useTObject';

export default function CodeOfConductPage() {
  const t = useTObject('pages/cbsoft/codeOfConduct');

  return (
    <section className='container'>
      <div className='row'>
        <div className='col-lg-8 col-md-6 align-self-center'>
          <Title titulo={t('titulo')} />
          {t('descricao', { ano: appConfig.year })}
        </div>
      </div>
    </section>
  );
}
