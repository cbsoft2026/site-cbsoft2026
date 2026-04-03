import CallComponent from '@/components/Call';
import Title from '@/components/Title';
import { createPageMetadata } from '@/lib/metadata';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, 'common', 'workshops_accepts');
}

export default async function AcceptsPage({ params }: Props) {
  const { locale } = await params;
  const commonT = await getTranslations({ locale, namespace: 'common' });
  return (
    <article style={{ padding: '30px 0 0' }}>
      <header className='container' style={{ marginBottom: 56 }}>
        <Title titulo={`${commonT(`workshops_accepts`)}`}></Title>
      </header>
      <section className='container'>
        <ul>
            <li>XIV Workshop on Software Visualization, Maintenance and Evolution (VEM)</li>
            <li>
                IV Brazilian Workshop on Intelligent Software Engineering (ISE)
                <ul>
                  <li>
                    <b>Site:</b> <a href='https://www.virtus.ufcg.edu.br/iseworkshop/' target='blank'>https://www.virtus.ufcg.edu.br/iseworkshop/</a>
                  </li>
                </ul>
            </li>
            <li>III Workshop sobre Bots na Engenharia de Software (WBOTS)</li>
            <li>
                II Workshop on Software Engineering for Functional Programming (SE4FP)
                <ul>
                  <li>
                    <b>Site:</b> <a href="https://se4fp.github.io/2026/" target='_blank'>https://se4fp.github.io/2026/</a>
                  </li>
                </ul>
            </li>
            <li>II Workshop on Software Engineering for Game Development (SE4Games)</li>
            <li>I Workshop on Software Engineering for Agentic Systems (SE4AS)</li>
            <li>I Brazilian Workshop on Quantum Software Engineering (WQSE)</li>
            <li>I Secure Software Development in the Age of AI (AISecDev)</li>
        </ul>
      </section>
    </article>
  );
}
