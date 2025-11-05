import appConfig from '@/app/app.config';
import Title from '@/components/Title';
import { getTObject } from '@/lib/getTObject';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CodeOfConductPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTObject('pages/cbsoft/codeOfConduct', {}, locale);

  return (
    <article className='container' style={{ paddingTop: '50px' }}>
      <header>
        <Title titulo={t('titulo')} />
      </header>
      <section>{t('descricao', { ano: appConfig.year })}</section>
    </article>
  );
}
