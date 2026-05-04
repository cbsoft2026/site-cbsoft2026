import CallComponent from '@/components/Call';
import Title from '@/components/Title';
import { createPageMetadata } from '@/lib/metadata';
import { withUTM } from '@/utils/utm';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return createPageMetadata(locale, 'common', 'workshops_accepts');
}

type WorkshopsLinks = {
  name: string;
  link: string;
};

const workshops: WorkshopsLinks[] = [
  {
    name: 'XIV Workshop on Software Visualization, Maintenance and Evolution (VEM)',
    link: 'https://vemworkshop.github.io/vem2026',
  },
  {
    name: 'IV Brazilian Workshop on Intelligent Software Engineering (ISE)',
    link: 'https://www.virtus.ufcg.edu.br/iseworkshop/',
  },
  {
    name: 'III Workshop sobre Bots na Engenharia de Software (WBOTS)',
    link: 'https://w-bots.github.io/wbots/2026/',
  },
  {
    name: 'II Workshop on Software Engineering for Functional Programming (SE4FP)',
    link: 'https://se4fp.github.io/2026/',
  },
  {
    name: 'II Workshop on Software Engineering for Game Development (SE4Games)',
    link: 'https://se4games.vercel.app/',
  },
  {
    name: 'I Workshop on Software Engineering for Agentic Systems (SE4AS)',
    link: 'https://agents4good.github.io/se4as26-workshop/',
  },
  {
    name: 'I Brazilian Workshop on Quantum Software Engineering (WQSE)',
    link: 'https://wqseworkshop.github.io/WQSE2026/',
  },
  {
    name: 'I Secure Software Development in the Age of AI (AISecDev)',
    link: 'https://sites.usp.br/icem/aisecdev-cbsoft-2026/',
  },
];

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
          {workshops.map((workshop) => (
            <li key={workshop.link}>
              {workshop.name}
              <ul>
                <li>
                  <b>Site: </b>
                  <a href={withUTM(workshop.link)} target='_blank' rel='noopener noreferrer'>
                    {workshop.link}
                  </a>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
