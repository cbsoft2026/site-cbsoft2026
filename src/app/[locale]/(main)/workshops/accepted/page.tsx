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
            <li>
                XIV Workshop on Software Visualization, Maintenance and Evolution (VEM)
                <ul>
                  <li>
                    <b>Site: </b> <a href="https://vemworkshop.github.io/vem2026" target='_blank'>https://vemworkshop.github.io/vem2026</a>
                  </li>
                </ul>
            </li>
            <li>
                IV Brazilian Workshop on Intelligent Software Engineering (ISE)
                <ul>
                  <li>
                    <b>Site:</b> <a href='https://www.virtus.ufcg.edu.br/iseworkshop/' target='_blank'>https://www.virtus.ufcg.edu.br/iseworkshop/</a>
                  </li>
                </ul>
            </li>
            <li>
                III Workshop sobre Bots na Engenharia de Software (WBOTS)
                <ul>
                  <li>
                    <b>Site:</b> <a href='https://w-bots.github.io/wbots/2026/' target='_blank'>https://w-bots.github.io/wbots/2026/</a>
                  </li>
                </ul>
            </li>
            <li>
                II Workshop on Software Engineering for Functional Programming (SE4FP)
                <ul>
                  <li>
                    <b>Site:</b> <a href="https://se4fp.github.io/2026/" target='_blank'>https://se4fp.github.io/2026/</a>
                  </li>
                </ul>
            </li>
            <li>
                II Workshop on Software Engineering for Game Development (SE4Games)
                <ul>
                  <li>
                    <b>Site:</b> <a href="https://se4games.vercel.app/" target='_blank'>https://se4games.vercel.app/</a>
                  </li>
                </ul>
            </li>
            <li>
                I Workshop on Software Engineering for Agentic Systems (SE4AS)
                <ul>
                  <li>
                    <b>Site:</b> <a href="https://agents4good.github.io/se4as26-workshop/" target='_blank'>https://agents4good.github.io/se4as26-workshop/</a>
                  </li>
                </ul>
            </li>
            <li>
                I Brazilian Workshop on Quantum Software Engineering (WQSE)
                <ul>
                  <li>
                    <b>Site: </b> <a href='https://wqseworkshop.github.io/WQSE2026/' target='_blank'>https://wqseworkshop.github.io/WQSE2026/</a>
                  </li>
                </ul>
            </li>
            <li>
                I Secure Software Development in the Age of AI (AISecDev)
                <ul>
                  <li>
                    <b>Site:</b> <a href="https://sites.usp.br/icem/aisecdev-cbsoft-2026/" target="_blank">https://sites.usp.br/icem/aisecdev-cbsoft-2026/</a>
                  </li>
                </ul>
            </li>
        </ul>
      </section>
    </article>
  );
}
